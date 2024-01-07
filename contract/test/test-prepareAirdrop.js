// @ts-check
/* global assert */
/* eslint-disable import/order -- https://github.com/endojs/endo/issues/1235 */
import { test } from './prepare-test-env-ava.js';
import path from 'path';
import bundleSource from '@endo/bundle-source';
import { E } from '@endo/eventual-send';
import buildManualTimer from '@agoric/zoe/tools/manualTimer.js';
import { AmountMath, makeIssuerKit } from '@agoric/ertp';
import { Far } from '@endo/marshal';
import { wallets as testWallets } from './data/2kwallets.js';
import { setUpZoeForTest } from '@agoric/zoe/tools/setup-zoe.js';
import { makeFakeMarshaller } from '@agoric/notifier/tools/testSupports.js';
import { makeFakeStorageKit } from '@agoric/internal/src/storage-test-utils.js';
import { AIRDROP_ADMIN_MESSAGES } from '../src/helpers/messages.js';

const makePrivatePowers = (o = {}) => ({
  marshaller: Far('fake marshaller', { ...makeFakeMarshaller() }),
  storageNode: makeFakeStorageKit('governedPsmTest').rootNode,
  ...o,
});

const wallets = testWallets.map((x) => x.pubkey);

const filename = new URL(import.meta.url).pathname;
const dirname = path.dirname(filename);

const sourcePath = (file) => dirname.concat(file);

const rootContractPath = `${dirname}/../src/contract.js`;
const prepareAirdrop = `${dirname}/../src/prepareAirdropKit.js`;

const createTimerLogger = (logger) => {
  let i = 0;
  return (value) => {
    i += 1;
    logger('timer logger:::', { iter: i, value });
    return value;
  };
};

const timerLogger = createTimerLogger(console.log);

const timer = buildManualTimer(timerLogger);

const setupPurseNotifier = async (purse) => {
  const notifier = await E(purse).getCurrentAmountNotifier();
  let nextUpdate = E(notifier).getUpdateSince();
  return {
    nextUpdate,
    notifier,
    async checkNotifier() {
      const { value: balance, updateCount } = await nextUpdate;
      console.log('checking notiifer:::', { updateCount, balance });
      nextUpdate = await E(notifier).getUpdateSince(updateCount);
    },
  };
};

test('prepareAirdrop', async (t) => {
  const { zoe, vatAdminState } = await setUpZoeForTest();
  const [mintBundle, airdropBundle] = await Promise.all([
    bundleSource(prepareAirdrop),
    bundleSource(prepareAirdrop),
  ]);

  const airdropInstallation = await E(zoe).install(airdropBundle);

  vatAdminState.installBundle('b1-airdrop-kit', airdropBundle);

  const issuerKit = makeIssuerKit('Airdroplets');

  const airdropInstance = await E(zoe).startInstance(
    airdropInstallation,
    {},
    {
      /** used tokenName in code with mint creation baked in
      tokenName: 'Airdroplets',
      */
    },
    {
      claimPeriodEndTime: 60_000 * 60 * 24 * 7 * 4, // 4 Weeks
      tokenBrand: issuerKit.brand,
      tokenIssuer: issuerKit.issuer,
      timerService: timer,
      powers: makePrivatePowers({ timerService: timer }),
    },
  );

  const { creatorFacet, publicFacet } = airdropInstance;

  const walletData = wallets;
  const getLength = ({ length }) => length;

  t.deepEqual(getLength(walletData) === 2000, true);
  t.deepEqual(
    await E(creatorFacet).addEligibleUsers(walletData.slice(0, 50)),
    AIRDROP_ADMIN_MESSAGES.ADD_ACCOUNTS_SUCCESS(walletData.slice(0, 50)),
  );

  const issuer = await E(publicFacet).getAirdropIssuer();

  const details = await E(publicFacet).getAirdropTokenDetails();
  const { brand: airdropBrand } = details;

  const airdroplets = (x = 0n) => AmountMath.make(airdropBrand, x);
  const twoThousandAirdroplets = airdroplets(2000n);
  const handleMint = (mint) => (amount) => mint.mintPayment(amount);
  const mintAirdropTokenPayment = handleMint(issuerKit.mint);

  const initialDeposit = mintAirdropTokenPayment(twoThousandAirdroplets);
  console.log('TEST EXECUTION :::', { details, issuer });

  t.deepEqual(
    await details.issuer.getAmountOf(initialDeposit),
    twoThousandAirdroplets,
  );

  t.deepEqual(
    await E(creatorFacet).depositAirdropPayment(initialDeposit),
    'Deposit success!',
  );

  const adminPurse = await E(creatorFacet).getPurse();

  const purseNotifier = await setupPurseNotifier(adminPurse);
  t.deepEqual(adminPurse.getCurrentAmount(), twoThousandAirdroplets);

  const { nextUpdate } = await purseNotifier;

  t.deepEqual(await nextUpdate, {
    updateCount: 1n,
    value: twoThousandAirdroplets,
  });

  const twentyMillionAirdroplets = airdroplets(20_000_000n);

  const twentyMillionAirdropletsPayment = mintAirdropTokenPayment(
    twentyMillionAirdroplets,
  );
  await E(creatorFacet).depositAirdropPayment(twentyMillionAirdropletsPayment);

  t.deepEqual(
    await E(adminPurse).getCurrentAmount(),
    AmountMath.add(twentyMillionAirdroplets, twoThousandAirdroplets),
  );

  const claimSeat = await E(publicFacet).claim(walletData[20]);

  // Need to finish implementing
  t.deepEqual(claimSeat === 'Token claim success.', true);
});

test.todo('claim seat -- invalid user address');
