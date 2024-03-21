import { M } from '@endo/patterns';
import {
  makeScalarBigSetStore,
  prepareExoClassKit,
  provide,
} from '@agoric/vat-data';
import {
  IssuerShape,
  PaymentShape,
  BrandShape,
  PurseShape,
  AmountMath,
  DepositFacetShape,
} from '@agoric/ertp';
import {
  assertIssuerKeywords,
  provideAll,
} from '@agoric/zoe/src/contractSupport/index.js';
import { E, Far } from '@endo/far';
import { makePromiseKit } from '@endo/promise-kit';
import { AIRDROP_ADMIN_MESSAGES, CLAIM_MESSAGES } from './helpers/messages.js';
import '../../types.js';

const makeTracer = label => value => {
  console.log(label.toUpperCase(), '::::', value);
  return value;
};

const tracer = makeTracer('Airdrop airdropCampaign');
/** @type {airdropCampaignMeta} */
export const meta = {
  upgradability: 'canUpgrade',
  terms: {
    proofHolderFacet: M.remotable('proofHolder Powers'),
  },
  privateArgsShape: M.splitRecord({
    powers: {
      timerService: M.eref(M.remotable('TimerService')),
    },
  }),
};

harden(meta);

const handleFirstIncarnation = (baggage, key) =>
  !baggage.has(key)
    ? baggage.init(key, 1)
    : baggage.set(key, baggage.get(key) + 1);

const AirdropIssuerDetailsShape = harden({
  brand: BrandShape,
  issuer: IssuerShape,
});

const initState = zcf => baggage =>
  harden({
    treeRoot: baggage.get('treeRoot'),
    claimedUsersStore: baggage.get('claimedUsersStore'),
    adminSeat: zcf.makeEmptySeatKit().zcfSeat,
    marshaller: baggage.get('marshaller'),
    storageNode: baggage.get('storageNode'),
    claimPeriodDetails: {
      isActive: false,
      claimPeriodEndTime: !baggage.has('claimPeriodEndTime')
        ? null
        : baggage.get('claimPeriodEndTime'),
    },
    airdropIssuerDetails: {
      issuer: zcf.getTerms().issuers.Airdrop,
      brand: zcf.getTerms().brands.Airdrop,
    },
    airdropPurse: baggage.get('airdropPurse'),
  });

const finalMetrics = (promise, purse) =>
  promise.resolve({
    remainingTokens: purse.getCurrentAmount(),
  });
const startupAssertion = (arg, keyName) =>
  assert(
    arg,
    `Contract has been started without required property: ${keyName}.`,
  );
const makeWaker = (name, func) => {
  return Far(name, {
    wake: timestamp => func(timestamp),
  });
};
export const start = async (zcf, privateArgs, baggage) => {
  // assertIssuerKeywords(zcf, harden(['Airdroplets']));

  const { issuers, rootHash: merkleRoot, claimWindowLength } = zcf.getTerms();

  const { Airdroplets } = zcf.getTerms().issuers;

  console.log('PEELING OFF FROM TERMS.ISSUERs', { Airdroplets });
  // TODO handle fail cases?
  tracer('inside prepareAirdropKit');

  console.log(zcf.getTerms(), { privateArgs });
  handleFirstIncarnation(baggage, 'airdropCampaignVersion');

  startupAssertion(privateArgs.purse, 'privateArgs.purse');
  startupAssertion(privateArgs.timer, 'privateArgs.purse');

  startupAssertion(merkleRoot, 'terms.rootHash');
  startupAssertion(claimWindowLength, 'terms.claimWindowLength');
  tracer('privateArgs:', privateArgs);

  const terms = zcf.getTerms();

  console.log('TERMS', terms);
  const {
    issuers: { AirdropIssuer },
  } = terms;
  const {
    rootHash,
    claimedUsersStore,
    claimWindowTimeframe,
    airdropPurse,
    claimWindowTimer,
  } = await provideAll(baggage, {
    rootHash: () => merkleRoot,
    claimedUsersStore: () =>
      makeScalarBigSetStore('eligible users', {
        durable: true,
      }),
    claimWindowTimeframe: () => claimWindowLength,
    airdropPurse: () => privateArgs.purse,
    claimWindowTimer: () => privateArgs.timer,
  });

  const claimFn = address => E(zcf.getTerms().proofHolderFacet).hashFn(address);
  const openClaimingWindowHandler = async creatorSeat => {};
  /**
   * @typedef {object} AirdropIssuerDetails
   * @property {Issuer} issuer
   * @property {Brand} brand
   * @property
   */
  const makeAirdrop = prepareExoClassKit(
    baggage,
    'Airdrop Campaign Kit',
    {
      creator: M.interface('Creator Facet', {
        makeOpenClaimingWindow: M.call().returns(M.promise()),
        getPurse: M.call().returns(PurseShape),
        depositToPurse: M.call(PaymentShape).returns(M.promise()),
        depositAirdropPayment: M.call(PaymentShape).returns(M.promise()),
        addEligibleUsers: M.call(M.arrayOf(M.string())).returns(M.string()),
      }),
      public: M.interface('Public Facet', {
        getTreeRoot: M.call().returns(M.string()),

        claimInclusion: M.call(M.string(), M.arrayOf(M.string())).returns(
          M.any(),
        ),
        // getAirdropIssuer: M.call().returns(IssuerShape),
        getAirdropTokenDetails: M.call().returns(AirdropIssuerDetailsShape),
        claim: M.call(M.string()).returns(M.any()),
      }),
      helpers: M.interface('Helper Facet', {
        getClaimPeriodP: M.call().returns(M.promise()),

        getInternalDepositFacet: M.call().returns(DepositFacetShape),
        createPurse: M.call().returns(PurseShape),
        setAirdropWaker: M.call().returns(M.promise()),
      }),
    },
    (claimWindow, hash, claimeeStore, internalPurse, timer) => ({
      claimWindowTimeframe: claimWindow,
      rootHash: hash,
      claimedUsersStore: claimeeStore,
      internalPurse,
      timer,
    }),
    {
      helpers: {
        createPurse() {
          return this.state.issuer.makeEmptyPurse();
        },
        getInternalDepositFacet() {
          return this.state.internalPurse.getDepositFacet();
        },
        async setAirdropWaker() {
          const claimWindowPk = makePromiseKit();
          const currentTime = await E(this.state.timer).getCurrentTimestamp();

          console.log('INSIDE SET AIRDROP WAKER ::::', {
            currentTime,
            claimWindowPk,
          });
          await E(this.state.timer).setWakeup(
            claimWindowTimeframe,
            makeWaker('airdropWaker', timestamp => {
              console.log('time has resolved!!!', { timestamp });

              // zcf.shutdown('Airdrop claim window has expired.');
              claimWindowPk.resolve({
                message: 'claim period has ended',
                timestamp,
              });

              this.facets.helpers.getClaimPeriodP();
            }),
          );
        },
        async getClaimPeriodP(p) {
          return Far('claimPeriodPromise', {
            getClaimPeriodP: () => p,
          });
        },
      },
      creator: {
        makeOpenClaimingWindow() {
          console.group('---------- inside makeOpenClaimingWindow----------');
          console.log('------------------------');
          console.log('this.state::', this.state);
          console.log('------------------------');
          console.log('::');
          console.log('------------------------');
          console.groupEnd();
          /** @param {ZCFSeat} creator */
          const startAirdropHandler = async (seat, offerArgs) => {
            console.log('inside startAirdropHandler', { offerArgs });
            this.state.internalPurse.deposit(
              airdropPurse.withdraw(airdropPurse.getCurrentAmount()),
            );

            console.log(
              'Internal Depsoit Facet has current amount',
              this.state.internalPurse.getCurrentAmount(),
            );
            void this.facets.helpers.setAirdropWaker();
            return 'successfully opened claiming window';
          };

          return zcf.makeInvitation(startAirdropHandler, 'startAirdropHandler');
        },
        getPurse() {
          return airdropPurse;
        },
        async depositToPurse(payment) {
          const depositFacet = await E(airdropPurse).getDepositFacet();
          await E(depositFacet).receive(payment);
          return 'Deposit success!';
        },
        addEligibleUsers(list) {
          const { claimedUsersStore: store } = this.state;
          store.addAll(list);
          return AIRDROP_ADMIN_MESSAGES.ADD_ACCOUNTS_SUCCESS(list);
        },
        async depositAirdropPayment(payment) {
          assert(
            await E(Airdroplets).isLive(payment),
            AIRDROP_ADMIN_MESSAGES.DEPOSIT_TOKENS_ERROR,
          );

          try {
            return this.facets.creator.depositToPurse(payment);
          } catch (error) {
            return 'Error depositing payment.';
          }
        },
      },

      public: {
        getTreeRoot() {
          return this.state.rootHash;
        },
        async claimInclusion(address, proof) {
          console.log('------------ claiming inclusion ------------');
          console.log('####### address', {
            address,
            claimFn: await claimFn(address),
          });
          console.log('-----------------------');
          console.log('###proof', proof);
          console.log('-----------------------');
        },
        async claim(userProof) {
          // 1. lookup for key
          assert(
            this.state.claimedUsersStore.has(userProof),
            CLAIM_MESSAGES.INELIGIBLE_ACCOUNT_ERROR,
          );
          const { issuer, brand } = this.state.airdropIssuerDetails;

          const purse = await E(issuer).makeEmptyPurse();
          // console.group('### inside claim method ###');
          // console.log('---------------------------');
          // console.log('purse:::', { purse });
          // console.log('---------------------------');
          await E(airdropPurse)
            .withdraw(AmountMath.make(brand, 2_000n))
            .then(response => E(purse).deposit(response));

          // console.log('payment::::', { payout });
          // console.log('---------------------------');
          // // log below should print 2_000n (the value of the payment we are depositing into it)
          // console.log('purse amount :::', await E(purse).getCurrentAmount());
          // console.groupEnd();
          // deposit from purse into a purse made for the user.
          // ---------------------
          // LOGIC GOES HERE
          // ---------------------

          await this.state.claimedUsersStore.delete(userProof);
          console.log(
            'lookup logic ::: after delete',
            this.state.claimedUsersStore.has(userProof),
          );

          return { message: 'Token claim success.', payout: purse };
        },
        /** @returns {AirdropIssuerDetails} */
        getAirdropTokenDetails() {
          return AirdropIssuer;
        },
      },
    },
  );

  const airdropCampaign = await provide(baggage, 'Airdrop Instance', () =>
    makeAirdrop(
      claimWindowTimeframe,
      rootHash,
      claimedUsersStore,
      terms.emptyPurse,
      claimWindowTimer,
    ),
  );
  return harden({
    creatorFacet: airdropCampaign.creator,
    publicFacet: airdropCampaign.public,
  });
};
harden(start);
