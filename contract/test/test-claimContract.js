// @ts-check
/* global assert */
/* eslint-disable import/order -- https://github.com/endojs/endo/issues/1235 */
import { describe } from './prepare-riteway.js';
import { test } from './prepare-test-env-ava.js';
import path from 'path';
import bundleSource from '@endo/bundle-source';
import { E } from '@endo/eventual-send';
import buildManualTimer from '@agoric/zoe/tools/manualTimer.js';
import { M, makeKindHandle, makeScalarSetStore } from '@agoric/vat-data';
import { AmountMath, AssetKind } from '@agoric/ertp';
import { Far } from '@endo/marshal';
import { createIdentifier, initContract } from './helpers.js';
import { wallets as testWallets } from './data/2kwallets.js';
import CONSTANTS from '../src/helpers/messages.js';

const wallets = testWallets.map((x) => x.pubkey);

const getLength = ({ length }) => length;

const addNewKeyToMap = (map, val) => {
  console.log('map::', map);
  map.add(Far(val));
  map.has(Far(val));
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

// Commenting out old code used for testing
//
// const checkSet = (set, key) => set.has(Far(key));
// function* arrayToGen(array) {
//   let nextIndex = 0;
//   while (nextIndex < array.length) {
//     yield array[nextIndex++];
//   }
// }

// test('WeakMap storage fn', async (t) => {
//   const testStore = makeScalarSetStore('Eligible_Accounts', {
//     keyShape: M.remotable(),
//   });
//   const pubkeyIterator = arrayToGen(wallets);
//   let currentPubkey = await pubkeyIterator.next();
//   while (!currentPubkey.done) {
//     await testStore.add(Far(createIdentifier(currentPubkey.value)));
//   }
// });

test('WeakMap storage', async (t) => {
  const testStore = makeScalarSetStore('Eligible_Accounts', {
    keyShape: M.remotable(),
  });

  const testData = await wallets.map((x) => Far(createIdentifier(x)));
  await testStore.addAll(testData);
  testData.reduce((acc, val) => {
    // t.log('lookup for val', val);
    t.deepEqual(
      testStore.has(val),
      true,
      'test store give .has(' + val + ') should return true',
    );
  });
});

// test.beforeEach(async (t) => {
//   const rootContractRefs = await initContract(
//     t,
//     rootContractPath,
//     'b1-airdrop-mint',
//     claimContractPath,
//      wallets.map((x) =>
//   Far(createIdentifier(x), {
//     getKey() {
//       return x;
//     },
//     claimed: () => false,
//   }),
// ),
//     buildManualTimer(timerLogger),
//   );
//   const {
//     zoe,
//     installation,
//     vatAdminState,
//     vatAdminSvc,
//     bundle,
//     airdropInstance,
//   } = rootContractRefs;

//   console.log('before adding to context', { context: t.context });

//   t.context = {
//     zoe: rootContractRefs.zoe,
//     rootContractRefs: { ...rootContractRefs },
//     claimContractInstance: airdropInstance,
//   };
//   console.log('after adding to context', { context: t.context });

//   // t.log('Contract context::', t.context);
// });

const handleCorrectGuess = async (t, claimFacet) => {
  t.log('checking claim facet');
  assert(
    claimFacet.makeClaimAirdropInvitation,
    'Airdrop Claim Facet should expose an invitation make',
  );
};

// test('eligibleAccountsStore operations', async (t) => {
//   const {
//     // @ts-ignore
//     claimContractInstance: { creatorFacet },
//   } = t.context;
//   const store = await E(creatorFacet).getEligibleWalletsStore();

//   t.log('store::', store);

//   t.deepEqual(
//     store.has(Far(wallets[20])),
//     true,
//     'store.has should return true on keys that are present.',
//   );

//   t.deepEqual(
//     store.has('cosmosooooohhhmygoooddd!!!!!!!!') === false,
//     true,
//     'store.has should throw on keys that do not exist.',
//   );

//   t.deepEqual(store.has(Far(wallets[10])), true);
// });

test('claim airdrop flow - ineligible user', async (t) => {
  const rootContractRefs = await initContract(
    t,
    rootContractPath,
    'b1-airdrop-mint',
    claimContractPath,
    wallets.map((x) =>
      Far(createIdentifier(x), {
        getKey() {
          return x;
        },
        claimed: () => false,
      }),
    ),
    buildManualTimer(timerLogger),
  );
  const {
    zoe,
    installation,
    vatAdminState,
    vatAdminSvc,
    bundle,
    airdropInstance,
    startAirdrop,
  } = rootContractRefs;

  const {
    airdropInstance: { publicFacet },
  } = await startAirdrop();

  const claimInvitation = await E(publicFacet).makeClaimAirdropInvitation();
  const claimerSeat = await E(zoe).offer(
    claimInvitation,
    {},
    {},
    { pubkey: Far(createIdentifier('abcdefghijk')) },
  );

  await t.throwsAsync(() => E(claimerSeat).getOfferResult(), {
    message: 'Wallet associated with this public key is not eligible for claim',
  });
});
const createRemotableForValue = (value) => Far(createIdentifier(value));

test('airdrop :: creator facet # mint tokens', async (t) => {
  const rootContractRefs = await initContract(
    t,
    rootContractPath,
    'b1-airdrop-mint',
    claimContractPath,
    wallets.map((x) =>
      Far(createIdentifier(x), {
        getKey() {
          return x;
        },
        claimed: () => false,
      }),
    ),
    buildManualTimer(timerLogger),
  );
  const {
    zoe,
    memeCoinsBrand,
    memeCoinsIssuer,
    installation,
    vatAdminState,
    vatAdminSvc,
    bundle,
    airdropInstance,
    startAirdrop,
  } = rootContractRefs;

  const {
    airdropInstance: { creatorFacet },
  } = await startAirdrop();

  const issuerDetails = await E(creatorFacet).getIssuerDetails();

  t.deepEqual(
    await issuerDetails,
    {
      brand: memeCoinsBrand,
      issuer: memeCoinsIssuer,
    },
    'getIssuerDetails should return an object containng the correct issuer and brand.',
  );
  const airdropAdminMintInvitation = await E(
    creatorFacet,
  ).makeMintTokensInvitation();

  const airdropAdminSeat = await E(zoe).offer(
    airdropAdminMintInvitation,
    {},
    {},
    { targetMintAmount: AmountMath.make(memeCoinsBrand, 10_000_000n) },
  );

  t.deepEqual(
    await E(airdropAdminSeat).getOfferResult(),
    `Mint success! 10000000 tokens have been minted and added to the internal contract seat.`,
  );
});

test('airdrop :: creator facet # addEligibleAccounts', async (t) => {
  const rootContractRefs = await initContract(
    t,
    rootContractPath,
    'b1-airdrop-mint',
    claimContractPath,
    wallets.map((x) =>
      Far(createIdentifier(x), {
        getKey() {
          return x;
        },
        claimed: () => false,
      }),
    ),
    buildManualTimer(timerLogger),
  );
  const {
    zoe,
    memeCoinsBrand,
    memeCoinsIssuer,
    installation,
    vatAdminState,
    vatAdminSvc,
    bundle,
    airdropInstance,
    startAirdrop,
    keyPrefix,
  } = rootContractRefs;

  const {
    airdropInstance: { creatorFacet },
  } = await startAirdrop();

  const issuerDetails = await E(creatorFacet).getIssuerDetails();

  t.deepEqual(
    await issuerDetails,
    {
      brand: memeCoinsBrand,
      issuer: memeCoinsIssuer,
    },
    'getIssuerDetails should return an object containng the correct issuer and brand.',
  );

  const testAccounts = wallets.map((x) => Far(`${keyPrefix}${x}`));
  const addAccountsReference = await E(creatorFacet).addEligibleAccounts(
    testAccounts,
  );

  t.deepEqual(
    await addAccountsReference,
    'Successfully added 2000 eligible accounts. The store now contains 2000 values.',
  );
});

test('claim airdrop flow - happy path', async (t) => {
  const rootContractRefs = await initContract(
    t,
    rootContractPath,
    'b1-airdrop-mint',
    claimContractPath,
    wallets,
    buildManualTimer(timerLogger),
  );
  const {
    zoe,
    installation,
    vatAdminState,
    vatAdminSvc,
    bundle,
    airdropInstance,
    startAirdrop,
    memeCoinsBrand,
    memeCoinsIssuer,
    keyPrefix,
  } = rootContractRefs;

  const {
    airdropInstance: { publicFacet, creatorFacet },
  } = await startAirdrop();

  const testAccounts = wallets.map((x) => Far(`${keyPrefix}${x}`));
  const addAccountsReference = await E(creatorFacet).addEligibleAccounts(
    testAccounts,
  );

  await timer.tick('inaugural timer tick');

  //wallets.sort());

  const claimInvitation = await E(publicFacet).makeClaimAirdropInvitation();

  const {
    customDetails: { claimFacet },
  } = await E(zoe).getInvitationDetails(claimInvitation);

  t.truthy(!claimFacet === false);

  const baseAmount = await E(claimFacet).getBaseAmount();

  t.deepEqual(baseAmount, AmountMath.make(memeCoinsBrand, 1000n));

  const getAmount = (payment) => E(memeCoinsIssuer).getAmountOf(payment);

  const claimerSeat = await E(zoe).offer(
    claimInvitation,
    {},
    {},
    harden({
      pubkey: keyPrefix.concat(
        '037c236e9cbfd739e0d9e62d1af95179a6bb8d8c7939f112093c8823b270234f97',
      ),
    }),
  );

  t.deepEqual(
    await E(claimerSeat).getOfferResult(),
    CONSTANTS.CLAIM.OFFER_SUCCESS,
  );

  const payout = await E(claimerSeat).getPayout('Airdrop');
  const checkAMount = await E(memeCoinsIssuer).getAmountOf(payout);
  await t.deepEqual(checkAMount, AmountMath.make(memeCoinsBrand, 1000n));

  // const claimAirdropActions = async (
  //   t,
  //   invitation,
  //   pubkey,
  //   issuer,
  //   paymentKeyword,
  //   expectedPayment,
  // ) => {
  //   t.log('pubkey::', pubkey);

  //   const claimerSeat = await E(zoe).offer(
  //     invitation,
  //     {},
  //     {},
  //     harden({ pubkey }),
  //   );
  //   t.deepEqual(
  //     await E(claimerSeat).getOfferResult(),
  //     'Successfully claimed 1000 tokens.',
  //     'claimAirdrop offer result should return the correct success message.',
  //   );
  //   const payout = await E(claimerSeat).getPayout(paymentKeyword);
  //   t.deepEqual(await getAmount(payout), expectedPayment);
  // };

  // await claimAirdropActions(
  //   t,
  //   claimInvitation,
  //   Far(createIdentifier(wallets[50])),
  //   issuer,
  //   'Airdrop',
  //   AmountMath.make(brand, 1000n),
  // );
});

// test('airdrop multiplier logic', async (t) => {
//   const ctx = t.context;
//   const {
//     // @ts-ignore
//     zoe,
//     // @ts-ignore
//     claimContractInstance: { publicFacet, creatorFacet },
//   } = ctx;

//   /**
//    * TODO: Airdrop Multiplier
//    *
//    * Configure makeTokenMultiplier to update its 'multiplier' value dynamically over time. Below are 2 examples demonstrating distribution schedules for 10 Million tokens over 4 weeks time.
//    *
//    * Distribution Schedule 1:
//    * 1. First 24 hours: 10,000 tokens
//    * 2. Day 2 to Day 7: 7,500 tokens
//    * 3. Day 7 to Day 14: 5,000 tokens
//    * 4. Day 14 to Day 21: 3,500 tokens
//    * 5. Day 21 to Day 28: 2,000 tokens
//    *
//    *
//    * Distribution Schedule 2:
//    * 1. First 48 hours: 10,000 tokens
//    * 2. Day 3 to Day 10: 7,000 tokens
//    * 3. Day 10 to Day 17: 5,000 tokens
//    * 4. Day 17 to Day 24: 3,000 tokens
//    * 5. Day 24 to Day 31: 1,000 tokens
//    *
//    */
//   const makeTokenMultiplier = () => {
//     const tiers = {
//       FIRST: 10_000n,
//       SECOND: 7_500n,
//       THIRD: 3_500n,
//       FOURTH: 2000n,
//     };
//     let count = 0;
//     return Far('Time-based Claim Multiplier', {
//       getMultiplier() {
//         return tiers.FIRST;
//       },
//       wake(t) {
//         console.log('current timestamp::', t);
//         console.log('previous count::', count);
//         count += 1;
//         console.log('updated count::', count);
//       },
//     });
//   };

//   const airdropClaimMultiplier = makeTokenMultiplier();
//   await E(timer).setWakeup(0n, makeTokenMultiplier());
//   await timer.tickN(10);
//   const repeater = E(timer).makeRepeater(7n, 1500n);

//   const scheduledRepeater = E(repeater).schedule(airdropClaimMultiplier);
//   // TODO
//   // [] demonstrate notifier is working properly
//   t.deepEqual(
//     await E(timer)
//       .getCurrentTimestamp()
//       .then((t) => [t, airdropClaimMultiplier.getMultiplier()]),
//     {},
//   );
// });
