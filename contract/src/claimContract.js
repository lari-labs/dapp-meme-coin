// @ts-check
import { AmountMath } from '@agoric/ertp';
import { fromOnly, toOnly } from '@agoric/zoe/src/contractSupport';
import { E } from '@endo/eventual-send';
import { Far } from '@endo/marshal';
import '@agoric/zoe/exported.js';
import { M } from '@agoric/store';

/**
 * @param {TimerService} timerService
 * @param {BigInt} delay
 * @param {BigInt} interval
 * @returns {Promise<Notifier<Timestamp>>}
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
// https://docs.agoric.com/reference/zoe-api/zoe.html#e-zoe-getinstallationforinstance-instance

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
  // TODO
  // pull this out into its own module (?)
  // seperate minting from public facing contract
  /** @type {ZCFMint} */
  const zcfMint = await zcf.makeZCFMint('MEMECOINZ');

  // const { mint } = await privateArgs;

  const { brand, issuer } = zcfMint.getIssuerRecord();

  // add minimumTokensClaimable
  const baseAmount = AmountMath.make(brand, 1000n);

  console.log({ baseAmount, brand, issuer });

  const { timeAuthority, eligibleWalletsStore } = await zcf.getTerms();

  const airdropMultiplierNotifier = await makeNotifierFromTimer(timeAuthority);

  console.log('airdropMultiplierNotifier:::', airdropMultiplierNotifier);

  const creatorFacet = Far('creator facet', {
    getNotifier: () => airdropMultiplierNotifier,
    getEligibleWalletsStore: () => eligibleWalletsStore,
    checkEligibility: (key) => eligibleWalletsStore.has(key),
  });

  const makeClaimAirdropInvitation = () => {
    /** @type {OfferHandler} */
    const claimTokensHook = async (claimerSeat, claimerOfferArgs) => {
      console.log({ claimerSeat, claimerOfferArgs, eligibleWalletsStore });

      zcfMint.mintGains({ Airdrop: baseAmount }, claimerSeat);
      claimerSeat.exit();
      // logic for verifying public key against signature.
      return `success ${baseAmount.value}`;
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
