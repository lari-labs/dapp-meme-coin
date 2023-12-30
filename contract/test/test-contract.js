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
import { Far, isRemotable } from '@endo/marshal';
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
    makeScalarMapStore('eligible wallets'),
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
  const eligibleWalletsStore = wallets.reduce(
    addNewKeyToMap,
    makeScalarMapStore('eligible wallets'),
  );

  const { issuer: MEMECOINZIssuer } = await E(memeCoinzMint).getIssuerRecord();
  console.log({ eligibleWalletsStore });
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
    zoe: rootContractRefs.zoe,
    rootContractRefs: { ...rootContractRefs },
    claimContractInstance,
  };

  t.log('Contract context::', t.context);
});

const handleCorrectGuess = async (t, claimFacet) => {
  t.log('checking claim facet');
  assert(
    claimFacet.makeClaimAirdropInvitation,
    'Airdrop Claim Facet should expose an invitation make',
  );
};

test('eligible user story', async (t) => {
  const ctx = t.context;

  console.log({ ctx });
  const {
    zoe,
    claimContractInstance: { publicFacet, creatorFacet },
  } = ctx;

  const issuer = await E(publicFacet).getIssuer();
  const brand = await E(issuer).getBrand();
  const store = await E(creatorFacet).getEligibleWalletsStore();

  await timer.tick('inaugural timer tick');

  t.deepEqual(
    store.getSize(),
    2000,
    'eligibleAddressStore should contain the correct number of values.',
  );

  t.deepEqual(
    store.has('cosmos1lhnqdghgwy0gjz74pvsjh6v0mu0ua6ec33e7ul'),
    true,
    'store.has should return true on keys that are present.',
  );

  t.deepEqual(
    store.has('cosmosooooohhhmygoooddd!!!!!!!!') === false,
    true,
    'store.has should throw on keys that do not exist.',
  );

  t.deepEqual(store.has(wallets[10]), true);
  //wallets.sort());

  const bobsGuess = await E(publicFacet).makeClaimAirdropInvitation();

  const x = await E(zoe).offer(bobsGuess, {}, {}, { address: '01' });

  const getAmount = (payment) => E(issuer).getAmountOf(payment);

  const payout = await E(x).getPayout('Airdrop');

  t.deepEqual(await getAmount(payout), AmountMath.make(brand, 1000n));

  t.deepEqual(await E(x).getOfferResult(), await E(x).getPayouts());

  const notifier = await E(creatorFacet).getNotifier();

  // TODO
  // [] demonstrate notifier is working properly
  t.deepEqual(await notifier, {});
});

test('airdrop multiplier logic', async (t) => {
  const ctx = t.context;

  console.log({ ctx });
  const {
    zoe,
    claimContractInstance: { publicFacet, creatorFacet },
  } = ctx;
  // 100_000_000n tokens / 100_000 wallets = 1_000n base tokens
  /**
   * [TG]
   * We should probably brainstorm on some sort of method, some sort of formal method for thi time-based multiplier. Multiplier equals X when Y is the total claimed at point of claim.
   *
   * Tiers
   *
   * Examples to come.....
   *
   *
   */
  const makeTokenMultiplier = () => {
    let count = 0;
    return Far('Time-based Claim Multiplier', {
      getCount() {
        return count;
      },
      wake(_t) {
        count += 1;
      },
    });
  };

  const multiplier = makeTokenMultiplier();
  const issuer = await E(publicFacet).getIssuer();
  const store = await E(creatorFacet).getNotifier();

  await timer.tick('inaugural timer tick');
});

// [] Write internal contract logic for time-based multiplier.
