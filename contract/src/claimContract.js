// @ts-check
import { AmountMath } from '@agoric/ertp';
import { fromOnly, toOnly } from '@agoric/zoe/src/contractSupport';
import { E } from '@endo/eventual-send';
import { Far } from '@endo/marshal';
import '@agoric/zoe/exported.js';
import CONSTANTS from './helpers/messages';

/**
 * @param {import('../../../../../agoric-sdk/packages/SwingSet/src/vats/timer/vat-timer').TimerService} timerService
 * @param {BigInt} delay
 * @param {BigInt} interval
 * @returns {Promise<Notifier<import('../../../../../agoric-sdk/packages/SwingSet/tools/manual-timer').Timestamp>>}
 */
const makeNotifierFromTimer = (
  timerService,
  delay = 5_000,
  interval = 60_000,
) => E(timerService).makeNotifier(delay, interval);

const zoeSeatHelpers = {
  getAmountAllocated: (keyword, brand, seat) =>
    seat.getAmountAllocated(keyword, brand),
};

/**
 *
 * @typedef {{
 *    publicKey: string
 * }} OfferArgs
 *
 * @typedef {{
 *    getIssuer: () => Issuer<AssetKind>;
 *    makeClaimAirdropInvitation: () => Promise<Invitation<string, OfferArgs>>;
 * }} PublicFacet
 */

/**
 * @type {ContractStartFn}
 * @returns {ContractStartFnResult<{getIssuer,makeClaimAirdropInvitation}>}
 */
const start = async (zcf, privateArgs) => {
  console.log('PRIVATE_ARGS::', privateArgs);
  console.log('ZCF.getTerms() ===>', await zcf.getTerms());
  // TODO
  // pull this out into its own module (?)
  // seperate minting from public facing contract
  /** @type {ZCFMint} */
  const { mint: zcfMint, issuer, brand } = await privateArgs;

  // const baseAmount = AmountMath.make(brand, 1000n);

  // console.log({ baseAmount, brand, issuer });

  const { timeAuthority, eligibleWalletsStore } = await zcf.getTerms();

  const airdropMultiplierNotifier = await makeNotifierFromTimer(timeAuthority);

  const creatorFacet = Far('creator facet', {
    getNotifier: () => airdropMultiplierNotifier,
    getEligibleWalletsStore: () => eligibleWalletsStore,
    checkEligibility: (key) => eligibleWalletsStore.has(key),
  });

  const makeClaimAirdropInvitation = () => {
    /** @type {OfferHandler} */
    const claimTokensHook = async (claimerSeat, claimerOfferArgs) => {
      assert(
        // @ts-ignore
        await E(eligibleWalletsStore).has(claimerOfferArgs.pubkey),
        CONSTANTS.CLAIM.INELIGIBLE_ACCOUNT_ERROR,
      );

      zcfMint.mintGains({ Airdrop: baseAmount }, claimerSeat);
      claimerSeat.exit();
      // logic for verifying public key against signature.
      return CONSTANTS.CLAIM.OFFER_SUCCESS(baseAmount);
    };
    return zcf.makeInvitation(
      claimTokensHook,
      'claim airdrop',
      harden({ baseQuantity: baseAmount }),
    );
  };

  /** @type {PublicFacet} */
  const publicFacet = Far('public facet', {
    getIssuer: () => issuer,
    getInvitationIssuer: () => zcf.getInvitationIssuer(),
    makeClaimAirdropInvitation,
  });

  return harden({ creatorFacet, publicFacet });
};

harden(start);

export { start };
