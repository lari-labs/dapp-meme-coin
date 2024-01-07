import { M } from '@endo/patterns';
import { makeScalarBigSetStore } from '@agoric/vat-data';
import { prepareExoClassKit, provide } from '@agoric/vat-data';
import { PaymentShape } from '@agoric/ertp';
import { makeTracer } from '@agoric/internal';
import { provideAll } from '@agoric/zoe/src/contractSupport/index.js';
import { AIRDROP_ADMIN_MESSAGES } from './helpers/messages.js';
import { E } from '@endo/eventual-send';

const tracer = makeTracer('Airdrop airdropCampaign');
/** @type {airdropCampaignMeta} */
export const meta = {
  upgradability: 'canUpgrade',
  // privateArgsShape: M.splitRecord({
  //   timerService: M.eref(M.remotable('TimerService')),
  //     marshaller: M.remotable('Marshaller'),
  // }),
};

harden(meta);

const handleFirstIncarnation = (baggage, key) =>
  !baggage.has(key)
    ? baggage.init(key, 1)
    : baggage.set(key, baggage.get(key) + 1);

export const start = async (zcf, privateArgs, baggage) => {
  // TODO handle fail cases?
  tracer('inside prepareAirdropKit');
  handleFirstIncarnation(baggage, 'airdropCampaignVersion');

  // const terms = zcf.getTerms();
  // tracer('terms:', terms);
  tracer('privateArgs:', privateArgs);

  const {
    claimPeriodEndTime,
    eligibleUsersStore,
    tokenIssuer,
    airdropBrand,
    airdropPurse,
    marshaller,
    storageNode,
  } = await provideAll(baggage, {
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

  console.log({ tokenIssuer });
  const PublicI = M.interface(
    'Public Facet',
    {
      // getAirdropIssuer: M.call().returns(IssuerShape),
      claim: M.call(M.string()).returns(M.any()),
      makeClaimTokenInvitation: M.call(M.string()).returns(M.promise()),
    },
    { sloppy: true },
  );

  const ClaimPowersI = M.interface(
    'Claim Powers',
    {
      // getAirdropIssuer: M.call().returns(IssuerShape),
      claim: M.call(M.any()).returns(M.string()),
    },
    { sloppy: true },
  );
  const AdminI = M.interface(
    'Airdrop Creator',
    {
      depositAirdropPayment: M.call(PaymentShape).returns(M.promise()),
      addEligibleUsers: M.call(M.arrayOf(M.string())).returns(M.string()),
    },
    { sloppy: true },
  );

  const initState = (baggage) =>
    harden({
      claimPeriodDetails: {
        isActive: false,
        claimPeriodEndTime,
      },
      airdropIssuerDetails: {
        issuer: tokenIssuer,
        brand: airdropBrand,
      },
      airdropPurse,
    });

  const makeAirdrop = prepareExoClassKit(
    baggage,
    'Airdrop Campaign',
    { creator: AdminI, public: PublicI, claim_powers: ClaimPowersI },
    (baggage) => ({
      eligibleUsersStore,
      adminSeat: zcf.makeEmptySeatKit().zcfSeat,
      tokenIssuer: baggage.get('tokenIssuer'),
      marshaller: baggage.get('marshaller'),
      storageNode: baggage.get('storageNode'),
      ...initState(baggage),
    }),
    {
      creator: {
        getPurse() {
          return this.state.airdropPurse;
        },
        async depositToPurse(payment) {
          const depositFacet = await E(
            this.state.airdropPurse,
          ).getDepositFacet();
          await E(depositFacet).receive(payment);
        },
        addEligibleUsers(list) {
          const { eligibleUsersStore: store } = this.state;
          store.addAll(list);
          return AIRDROP_ADMIN_MESSAGES.ADD_ACCOUNTS_SUCCESS(list);
        },
        async depositAirdropPayment(payment) {
          const {
            airdropIssuerDetails: { issuer },
          } = this.state;

          assert(
            await E(issuer).isLive(payment),
            `Payment has failed liveliness check. This is either because it has been used already, or it is from the wrong issuer. Please check these details and try again`,
          );

          try {
            await this.facets.creator.depositToPurse(payment);
            return 'Deposit success!';
          } catch (error) {
            return 'Error depositing payment.';
          }
        },
        createPurse() {
          return this.state.issuer.makeEmptyPurse();
        },
      },
      claim_powers: {
        claim(userProof) {
          // 1. lookup for key
          assert(
            this.state.eligibleUsersStore.has(userProof),
            'Claim failed. Signature does not correspond to an address on Airdrop allowlist..',
          );

          // deposit from purse into a purse made for the user.
          // ---------------------
          // LOGIC GOES HERE
          // ---------------------

          this.state.eligibleUsersStore.delete(userProof);
          // checkAfter -- this.state.eligibleUsersStore.has(userProof);

          return 'Token claim success.';
        },
      },
      public: {
        claim(x) {
          // lookup can occur here before calling elsewhere.
          // this could be an offerHandler for zcf.makeInvitation(claimHook)
          return this.facets.claim_powers.claim(x);
        },
        getAirdropTokenDetails() {
          return this.state.airdropIssuerDetails;
        },
        getAirdropIssuer() {
          return this.state.airdropIssuerDetails.issuer;
        },
        makeClaimTokenInvitation() {
          /** @type {OfferHandler} */
          const claimTokensHook = async (claimerSeat, claimerOfferArgs) => {
            assert(
              // @ts-ignore
              await E(eligibleWalletsStore).has(claimerOfferArgs.pubkey),
              CONSTANTS.CLAIM_MESSAGES.INELIGIBLE_ACCOUNT_ERROR,
            );

            zcfMint.mintGains({ Airdrop: baseAmount }, claimerSeat);
            claimerSeat.exit();
            // logic for verifying public key against signature.
            return CONSTANTS.CLAIM_MESSAGES.OFFER_SUCCESS(baseAmount);
          };
          return zcf.makeInvitation(
            claimTokensHook,
            'claim airdrop',
            harden({ baseQuantity: baseAmount }),
          );
        },
      },
    },
  );

  const airdropCampaign = await provide(baggage, 'probe', () =>
    makeAirdrop(baggage),
  );
  return harden({
    creatorFacet: airdropCampaign.creator,
    publicFacet: airdropCampaign.public,
  });
};
harden(start);
