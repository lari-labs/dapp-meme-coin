// @ts-check
/* global assert */
/* eslint-disable import/order -- https://github.com/endojs/endo/issues/1235 */
import { describe } from './prepare-riteway.js';
import { test } from './prepare-test-env-ava.js';
import path from 'path';

import bundleSource from '@endo/bundle-source';

import { E } from '@endo/eventual-send';
import {
  makeZoeForTest,
  makeZoeKitForTest,
} from '@agoric/zoe/tools/setup-zoe.js';
import buildManualTimer from '@agoric/zoe/tools/manualTimer.js';
import { makeScalarMapStore } from '@agoric/store';
import { makeScalarBigWeakMapStore } from '@agoric/vat-data';
import { AmountMath, AssetKind } from '@agoric/ertp';
import { isRemotable } from '@endo/marshal';
import fakeVatAdmin, {
  makeFakeVatAdmin,
} from '@agoric/zoe/tools/fakeVatAdmin.js';
import { makeAssert } from '@agoric/assert';
import { initContract } from './helpers.js';
import { wallets } from './data/2kwallets.js';

const addNewKeyToMap = (map, val) => {
  map.init(
    val,
    harden({
      claimed: false,
    }),
  );
  return map;
};
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

const airdropMap = makeStoreFromArray(
  makeScalarMapStore('airdrop answers map'),
)([
  { phrase: 'yankee-doodles', supply: 100n },
  { phrase: 'password', supply: 100n },
  { phrase: 'awesome123', supply: 100n },
]); //?

const getTestObjects = ({
  zoe,
  installation,
  vatAdminState,
  vatAdminSvc,
  bundle,
}) => ({
  zoe,
  installation,
  vatAdminState,
  vatAdminSvc,
  bundle,
});

test('WeakMap storage setup', async (t) => {
  const walletStore = wallets.reduce(
    addNewKeyToMap,
    makeScalarBigWeakMapStore('eligible wallets'),
  ); //?
  t.deepEqual(walletStore.has(wallets[10]), true);
});

const makeAirdropCreator = async (timer) => {
  const { zoe, installation, vatAdminState, vatAdminSvc, bundle } =
    await initContract(rootContractPath, 'b1-airdrop-mint');

  const { creatorFacet, instance } = await E(zoe).startInstance(installation);

  const memeCoinzMint = await E(creatorFacet).makeTokenMint([
    'MEMECOINZ',
    AssetKind.NAT,
  ]);
  const eligibleWalletsStore = await wallets.reduce(
    addNewKeyToMap,
    makeScalarBigWeakMapStore('eligible wallets'),
  );

  const { issuer: MEMECOINZIssuer } = await E(memeCoinzMint).getIssuerRecord();
  console.log({ MEMECOINZIssuer });
  return {
    MEMECOINZIssuer,
    MEMECOINZBrand: await E(MEMECOINZIssuer).getBrand(),
    memeCoinzMint,
    zoe,
    invitationIssuer: await E(zoe).getInvitationIssuer(),
    installClaimCode: async () => {
      const bundle = await bundleSource(claimContractPath);
      // @ts-ignore
      vatAdminState.installBundle('b1-claim-contract', bundle);
      const claimInstallation = E(zoe).installBundleID('b1-claim-contract');

      const claimInstance = await E(zoe).startInstance(
        claimInstallation,
        {
          COINS: MEMECOINZIssuer,
        },
        // @ts-ignore
        harden({
          timeAuthority: timer,
          airdropMap,
          eligibleWalletsStore: eligibleWalletsStore,
        }),
        harden({ mint: memeCoinzMint }),
      );
      return claimInstance;
    },
  };
};

test.before(async (t) => {
  const rootContractRefs = await makeAirdropCreator(timer);
  console.log({ rootContractRefs });
  const claimContractInstance = await rootContractRefs.installClaimCode();
  console.log({ claimContractInstance });
  t.context = {
    rootContractRefs,
    claimContractInstance,
  };

  t.log('Contract context::', t.context);
});

const handleCorrectGuess = async (t, claimFacet) => {
  t.log('checking claim facet');
  assert(
    claimFacet.makeClaimPriceInvitation,
    'Airdrop Claim Facet should expose an invitation makeClaimPriceInvitation',
  );
};

test('eligible user story', async (t) => {
  const {
    claimContractInstance: { publicFacet },
  } = t.context;

  const bobsGuess = await E(publicFacet).makeSecretPhraseGuess('password');

  await handleCorrectGuess(t, bobsGuess);

  t.is(2, 3);
});

test('claimTokensContract:: publicFacet.makeSecretPhraseGuess', async (t) => {
  const { rootContractRefs, claimContractInstance } = t.context;
  const { installClaimCode, zoe, MEMECOINZBrand, MEMECOINZIssuer } =
    rootContractRefs;
});

// describe('claimTokensContract:: publicFacet.makeSecretPhraseGuess', async (assert) => {
//   const { installClaimCode, zoe, MEMECOINZBrand, MEMECOINZIssuer } =
//     await
//   const {
//     publicFacet: { makeSecretPhraseGuess, getInvitationIssuer },
//   } = await installClaimCode();

//   const memeCoinsAmount = (x) => AmountMath.make(MEMECOINZBrand, x);

//   const invitationIssuer = getInvitationIssuer();

//   const alicesGuess = makeSecretPhraseGuess('hello');
//   assert({
//     given: 'a key that does not exists in the airdropMap',
//     should: 'return a string indicating incorrect guess.',
//     actual: (await alicesGuess) === 'Incorrect guess!',
//     expected: true,
//   });
//   const bobsGuess = await makeSecretPhraseGuess('password');

//   assert({
//     given: 'a key that exists in the airdropMap',
//     should: 'return a live invitation payment',
//     actual: bobsGuess,
//     expected: true,
//   });

//   const bobSeat = await E(zoe).offer(bobsGuess, {
//     want: { COINS: memeCoinsAmount(100n) },
//     give: {},
//   });

//   const bobSeatPayout = await E(bobSeat).getPayout('COINS');

//   const checkPayout = (payout) => E(MEMECOINZIssuer).getAmountOf(payout);
//   assert({
//     given: 'a call to E(zoe).offer(liveInvitation)',
//     should: 'provide a payout of the correct amount',
//     actual: await checkPayout(bobSeatPayout),
//     expected: [{ COINS: AmountMath.make(invitationIssuer.getBrand(), 100n) }],
//   });
// });
