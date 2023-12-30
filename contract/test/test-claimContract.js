// @ts-check
/* global assert */
/* eslint-disable import/order -- https://github.com/endojs/endo/issues/1235 */
import { describe } from './prepare-riteway.js';
import { test } from './prepare-test-env-ava.js';
import path from 'path';
import bundleSource from '@endo/bundle-source';
import { E } from '@endo/eventual-send';
import buildManualTimer from '@agoric/zoe/tools/manualTimer.js';
import { makeScalarMapStore } from '@agoric/store';
import { AmountMath, AssetKind } from '@agoric/ertp';
import { Far } from '@endo/marshal';
import { initContract } from './helpers.js';
import { wallets as testWallets } from './data/2kwallets.js';

const wallets = testWallets.map((x) => x.pubkey);
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

  const { issuer: MEMECOINZIssuer } = await E(memeCoinzMint).getIssuerRecord();
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
          eligibleWalletsStore: wallets.reduce(
            addNewKeyToMap,
            makeScalarMapStore('eligible wallets'),
          ),
        }),
        harden({ mint: memeCoinzMint }),
      );
      return claimInstance;
    },
  };
};

test.before(async (t) => {
  const rootContractRefs = await makeAirdropCreator(timer);
  const claimContractInstance = await rootContractRefs.installClaimCode();
  t.context = {
    zoe: rootContractRefs.zoe,
    rootContractRefs: { ...rootContractRefs },
    claimContractInstance,
  };
  // t.log('Contract context::', t.context);
});

const handleCorrectGuess = async (t, claimFacet) => {
  t.log('checking claim facet');
  assert(
    claimFacet.makeClaimAirdropInvitation,
    'Airdrop Claim Facet should expose an invitation make',
  );
};

test('eligibleAccountsStore operations', async (t) => {
  const {
    // @ts-ignore
    claimContractInstance: { creatorFacet },
  } = t.context;
  const store = await E(creatorFacet).getEligibleWalletsStore();

  t.deepEqual(
    store.getSize(),
    2000,
    'eligibleAddressStore should contain the correct number of values.',
  );

  t.deepEqual(
    store.has(wallets[20]),
    true,
    'store.has should return true on keys that are present.',
  );

  t.deepEqual(
    store.has('cosmosooooohhhmygoooddd!!!!!!!!') === false,
    true,
    'store.has should throw on keys that do not exist.',
  );

  t.deepEqual(store.has(wallets[10]), true);
});

test('claim airdrop flow - ineligible user', async (t) => {
  const {
    claimContractInstance: { publicFacet },
    zoe,
  } = t.context;

  const claimInvitation = await E(publicFacet).makeClaimAirdropInvitation();
  const claimerSeat = await E(zoe).offer(
    claimInvitation,
    {},
    {},
    { pubkey: 'abcdefghijk' },
  );

  await t.throwsAsync(() => E(claimerSeat).getOfferResult(), {
    message: 'Wallet associated with this public key is not eligible for claim',
  });
});

test('claim airdrop flow - happy path', async (t) => {
  const ctx = t.context;

  const {
    // @ts-ignore
    zoe,
    // @ts-ignore
    claimContractInstance: { publicFacet, creatorFacet },
  } = ctx;

  const issuer = await E(publicFacet).getIssuer();
  const brand = await E(issuer).getBrand();

  await timer.tick('inaugural timer tick');

  //wallets.sort());

  const claimInvitation = await E(publicFacet).makeClaimAirdropInvitation();

  const claimAirdropActions = async (
    t,
    invitation,
    pubkey,
    issuer,
    paymentKeyword,
    expectedPayment,
  ) => {
    const getAmount = (payment) => E(issuer).getAmountOf(payment);

    const claimerSeat = await E(zoe).offer(invitation, {}, {}, { pubkey });
    t.deepEqual(
      await E(claimerSeat).getOfferResult(),
      'Successfully claimed 1000 tokens.',
      'claimAirdrop offer result should return the correct success message.',
    );
    const payout = await E(claimerSeat).getPayout(paymentKeyword);
    t.deepEqual(await getAmount(payout), expectedPayment);
  };

  await claimAirdropActions(
    t,
    claimInvitation,
    wallets[50],
    issuer,
    'Airdrop',
    AmountMath.make(brand, 1000n),
  );
});

test('airdrop multiplier logic', async (t) => {
  const ctx = t.context;
  const {
    // @ts-ignore
    zoe,
    // @ts-ignore
    claimContractInstance: { publicFacet, creatorFacet },
  } = ctx;

  /**
   * TODO: Airdrop Multiplier
   *
   * Configure makeTokenMultiplier to update its 'multiplier' value dynamically over time. Below are 2 examples demonstrating distribution schedules for 10 Million tokens over 4 weeks time.
   *
   * Distribution Schedule 1:
   * 1. First 24 hours: 10,000 tokens
   * 2. Day 2 to Day 7: 7,500 tokens
   * 3. Day 7 to Day 14: 5,000 tokens
   * 4. Day 14 to Day 21: 3,500 tokens
   * 5. Day 21 to Day 28: 2,000 tokens
   *
   *
   * Distribution Schedule 2:
   * 1. First 48 hours: 10,000 tokens
   * 2. Day 3 to Day 10: 7,000 tokens
   * 3. Day 10 to Day 17: 5,000 tokens
   * 4. Day 17 to Day 24: 3,000 tokens
   * 5. Day 24 to Day 31: 1,000 tokens
   *
   */
  const makeTokenMultiplier = () => {
    const tiers = {
      FIRST: 10_000n,
      SECOND: 7_500n,
      THIRD: 3_500n,
      FOURTH: 2000n,
    };
    let count = 0;
    return Far('Time-based Claim Multiplier', {
      getMultiplier() {
        return tiers.FIRST;
      },
      wake(t) {
        console.log('current timestamp::', t);
        console.log('previous count::', count);
        count += 1;
        console.log('updated count::', count);
      },
    });
  };

  const airdropClaimMultiplier = makeTokenMultiplier();
  await E(timer).setWakeup(0n, makeTokenMultiplier());
  await timer.tickN(10);
  const repeater = E(timer).makeRepeater(7n, 1500n);

  const scheduledRepeater = E(repeater).schedule(airdropClaimMultiplier);

  // TODO
  // [] demonstrate notifier is working properly
  t.deepEqual(
    await E(timer)
      .getCurrentTimestamp()
      .then((t) => [t, airdropClaimMultiplier.getMultiplier()]),
    {},
  );
});
