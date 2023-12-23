// @ts-check

/* eslint-disable import/order -- https://github.com/endojs/endo/issues/1235 */
import { describe } from './prepare-riteway.js';
import path from 'path';

import bundleSource from '@endo/bundle-source';

import { E } from '@endo/eventual-send';
import {
  makeZoeForTest,
  makeZoeKitForTest,
} from '@agoric/zoe/tools/setup-zoe.js';
import buildManualTimer from '@agoric/zoe/tools/manualTimer.js';
import { makeScalarMapStore } from '@agoric/store';
import { AmountMath, AssetKind } from '@agoric/ertp';
import { isRemotable } from '@endo/marshal';
import fakeVatAdmin, {
  makeFakeVatAdmin,
} from '@agoric/zoe/tools/fakeVatAdmin.js';

const filename = new URL(import.meta.url).pathname;
const dirname = path.dirname(filename);
const rootContractPath = `${dirname}/../src/contract.js`;
const claimContractPath = `${dirname}/../src/claimContract.js`;

const createTimerLogger = (logger) => {
  let i = 0;
  return (value) => {
    i += 1;
    logger('timer logger:::', { iter: i, value });
    return value;
  };
};
const makeStoreFromArray = (store) => (array) =>
  array.reduce((acc, val) => {
    acc.init(val.phrase, {
      supply: val.supply,
      isClaimed: false,
    });
    return acc;
  }, store);

const timerLogger = createTimerLogger(console.log);

describe('timerLogger', async (assert) => {
  await assert({
    given: 'console.log',
    should: 'return a function for logging values',
    actual: timerLogger({ updateCount: 1, value: 1632163863000n }),
    expected: { updateCount: 1, value: 1632163863000n },
  });
});

const timer = buildManualTimer(timerLogger);

const initContract = async (
  contractPath = rootContractPath,
  bundleName = 'b1-default-bundle-name',
) => {
  const bundle = await bundleSource(contractPath);
  const { admin: fakeVatAdmin, vatAdminState } = makeFakeVatAdmin();
  const zoe = makeZoeForTest(fakeVatAdmin);
  vatAdminState.installBundle(bundleName, bundle);
  const installation = await E(zoe).installBundleID(bundleName);

  return { installation, fakeVatAdmin, vatAdminState, zoe, bundle };
};
const airdropMap = makeStoreFromArray(
  makeScalarMapStore('airdrop answers map'),
)([
  { phrase: 'yankee-doodles', supply: 100n },
  { phrase: 'password', supply: 100n },
  { phrase: 'awesome123', supply: 100n },
]); //?

const makeAirdropCreator = async (timer) => {
  const { zoe, installation, vatAdminState, fakeVatAdmin } = await initContract(
    rootContractPath,
    'b1-airdrop-mint',
  );

  const { creatorFacet, instance } = await E(zoe).startInstance(installation);

  const memeCoinzMint = await creatorFacet.makeTokenMint([
    'MEMECOINZ',
    AssetKind.NAT,
  ]);

  // const run

  const { issuer: MEMECOINZIssuer } = memeCoinzMint.getIssuerRecord();
  return {
    memeCoinzMint,
    zoe,
    installClaimCode: async () => {
      const bundle = await bundleSource(claimContractPath);
      // install the contract
      vatAdminState.installBundle('b1-claim-contract', bundle);
      const claimInstallation = E(zoe).installBundleID('b1-claim-contract');

      const claimInstance = await E(zoe).startInstance(
        claimInstallation,
        {
          COINS: MEMECOINZIssuer,
        },
        harden({
          timeAuthority: timer,
          airdropMap,
        }),
        harden({ mint: memeCoinzMint }),
      );
      return claimInstance;
    },
  };
};
describe('makeTokenMint', async (assert) => {
  const actual = (await makeAirdropCreator(timer)).memeCoinzMint;
  const issuerRecord = actual.getIssuerRecord();
  assert({
    given: 'a valid options argment',
    should: 'create a mint object containing an issuer record.',
    actual: !issuerRecord === false,
    expected: true,
  });

  assert({
    given: 'a valid options argment',
    should:
      'return an issuerRecord containing a brand and its corresponding issuer.',
    actual:
      !(await issuerRecord.brand.isMyIssuer(issuerRecord.issuer)) === false,
    expected: true,
  });
});

describe('claimTokensContract:: publicFacet.makeSecretPhraseGuess', async (assert) => {
  const { installClaimCode, zoe } = await makeAirdropCreator(timer);
  const {
    publicFacet: { makeSecretPhraseGuess, getInvitationIssuer },
  } = await installClaimCode();

  const invitationIssuer = getInvitationIssuer();

  const alicesGuess = makeSecretPhraseGuess('hello');
  assert({
    given: 'a key that does not exists in the airdropMap',
    should: 'return a string indicating incorrect guess.',
    actual: (await alicesGuess) === 'Incorrect guess!',
    expected: true,
  });
  const bobsGuess = makeSecretPhraseGuess('password');

  assert({
    given: 'a key that exists in the airdropMap',
    should: 'return a live invitation payment',
    actual: await invitationIssuer.isLive(await bobsGuess),
    expected: true,
  });

  const bobSeat = await E(zoe).offer(bobsGuess);
  assert({
    given: 'a call to E(zoe).offer(liveInvitation)',
    should: 'provide a payout of the correct amount',
    actual: await bobSeat.getPayouts(),
    expected: [{ COINS: AmountMath.make(invitationIssuer.getBrand(), 100n) }],
  });
});
