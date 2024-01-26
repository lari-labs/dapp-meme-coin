import { M } from '@endo/patterns';
import { makeScalarBigSetStore } from '@agoric/vat-data';
import { prepareExoClassKit, provide } from '@agoric/vat-data';
import {
  IssuerShape,
  PaymentShape,
  BrandShape,
  PurseShape,
  AmountMath,
} from '@agoric/ertp';
import { makeTracer } from '@agoric/internal';
import { provideAll } from '@agoric/zoe/src/contractSupport/index.js';
import { AIRDROP_ADMIN_MESSAGES, CLAIM_MESSAGES } from './helpers/messages.js';
import { E } from '@endo/eventual-send';

const tracer = makeTracer('Airdrop airdropCampaign');
/** @type {airdropCampaignMeta} */
export const meta = {
  upgradability: 'canUpgrade',
  terms: {
    proofHolderFacet: M.remotable('proofHolder Powers'),
  },
  privateArgsShape: M.splitRecord({
    tokenIssuer: IssuerShape,
    tokenBrand: BrandShape,
    powers: {
      marshaller: M.remotable('Marshaller'),
      storageNode: M.remotable('storageNode'),
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

const initState = (zcf) => (baggage) =>
  harden({
    airdropNotifier: baggage.get('airdropNotifier'),
    treeRoot: baggage.get('treeRoot'),
    eligibleUsersStore: baggage.get('eligibleUsersStore'),
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
      issuer: baggage.get('tokenIssuer'),
      brand: baggage.get('airdropBrand'),
    },
    airdropPurse: baggage.get('airdropPurse'),
  });

export const start = async (zcf, privateArgs, baggage) => {
  // TODO handle fail cases?
  tracer('inside prepareAirdropKit');
  handleFirstIncarnation(baggage, 'airdropCampaignVersion');

  tracer('privateArgs:', privateArgs);

  const { proofHolderFacet: phFacet } = zcf.getTerms();

  console.log({ phFacet });
  const {
    airdropNotifier,
    treeRoot,
    eligibleUsersStore,
    claimPeriodEndTime,
    tokenIssuer,
    airdropBrand,
    airdropPurse,
    marshaller,
    storageNode,
  } = await provideAll(baggage, {
    airdropNotifier: () =>
      E(privateArgs.powers.timerService).makeNotifier(0n, 10_000n),
    treeRoot: () => E(phFacet).getRoot(),
    eligibleUsersStore: () =>
      makeScalarBigSetStore('eligible users', {
        durable: true,
      }),
    claimPeriodEndTime: () =>
      !privateArgs.claimPeriodEndTime ? null : privateArgs.claimPeriodEndTime,
    tokenIssuer: () => privateArgs.tokenIssuer,
    airdropBrand: () => privateArgs.tokenBrand,
    airdropPurse: () => E(privateArgs.tokenIssuer).makeEmptyPurse(),
    marshaller: () => privateArgs.powers.marshaller,
    storageNode: () => privateArgs.powers.storageNode,
  });
  const claimFn = (address) =>
    E(zcf.getTerms().proofHolderFacet).hashFn(address);

  /**
   * @typedef {object} AirdropIssuerDetails
   * @prop {Issuer} issuer
   * @prop {Brand} brand
   */
  const makeAirdrop = prepareExoClassKit(
    baggage,
    'Airdrop Campaign Kit',
    {
      creator: M.interface('Creator Facet', {
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
        createPurse: M.call().returns(PurseShape),
      }),
    },
    initState(zcf),
    {
      helpers: {
        createPurse() {
          return this.state.issuer.makeEmptyPurse();
        },
      },
      creator: {
        getPurse() {
          return this.state.airdropPurse;
        },
        async depositToPurse(payment) {
          const depositFacet = await E(
            this.state.airdropPurse,
          ).getDepositFacet();
          await E(depositFacet).receive(payment);
          return 'Deposit success!';
        },
        addEligibleUsers(list) {
          const { eligibleUsersStore: store } = this.state;
          store.addAll(list);
          return AIRDROP_ADMIN_MESSAGES.ADD_ACCOUNTS_SUCCESS(list);
        },
        async depositAirdropPayment(payment) {
          assert(
            await E(this.state.airdropIssuerDetails.issuer).isLive(payment),
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
          return this.state.treeRoot;
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
          console.log('state:::', this.state.airdropNotifier);
          // 1. lookup for key
          assert(
            this.state.eligibleUsersStore.has(userProof),
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
            .then((response) => E(purse).deposit(response));

          // console.log('payment::::', { payout });
          // console.log('---------------------------');
          // // log below should print 2_000n (the value of the payment we are depositing into it)
          // console.log('purse amount :::', await E(purse).getCurrentAmount());
          // console.groupEnd();
          // deposit from purse into a purse made for the user.
          // ---------------------
          // LOGIC GOES HERE
          // ---------------------

          await this.state.eligibleUsersStore.delete(userProof);
          console.log(
            'lookup logic ::: after delete',
            this.state.eligibleUsersStore.has(userProof),
          );

          return { message: 'Token claim success.', payout: purse };
        },
        /** @returns {AirdropIssuerDetails} */
        getAirdropTokenDetails() {
          return this.state.airdropIssuerDetails;
        },
      },
    },
  );

  const airdropCampaign = await provide(baggage, 'Airdrop Instance', () =>
    makeAirdrop(baggage),
  );
  return harden({
    creatorFacet: airdropCampaign.creator,
    publicFacet: airdropCampaign.public,
  });
};
harden(start);
