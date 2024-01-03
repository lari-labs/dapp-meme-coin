// @ts-check
import { AmountMath } from '@agoric/ertp';
import {
  atomicRearrange,
  atomicTransfer,
  fromOnly,
  toOnly,
} from '@agoric/zoe/src/contractSupport';
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

const mintTokens = (zcfMint) => async (keyword, amount) => {
  console.log('inside mint:::', { keyword, amount, zcfMint });
  const newTokensSeat = await zcfMint.mintGains({ [keyword]: amount });
  return newTokensSeat;
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
  // [] pull this out into its own module (?)
  //    \\
  //      \\
  //
  // [] seperate minting from public facing contract
  const { eligibleAccountsStore, timerService, mint, issuer, brand } =
    privateArgs;

  const tokenMint = mintTokens(mint);

  const makeAirdropAmount = (x = 1000n) => AmountMath.make(brand, x);

  // console.log({ baseAmount, brand, issuer });

  const airdropMultiplierNotifier = await makeNotifierFromTimer(timerService);

  const creatorFacet = Far('creator facet', {
    getNotifier: () => airdropMultiplierNotifier,
    getEligibleWalletsStore: () => E(eligibleAccountsStore),
    checkEligibility: (key) => eligibleAccountsStore.has(key),
  });

  const makeClaimAirdropInvitation = (set) => {
    console.log('inside makeClaimAirdropInvitation:::::', { set });
    return () => {
      const baseAmount = makeAirdropAmount(1000n);
      /** @type {OfferHandler} */
      const claimTokensHook = async (claimerSeat, claimerOfferArgs) => {
        console.log({ claimerOfferArgs });
        assert(
          // @ts-ignore
          await E(set).has(claimerOfferArgs.pubkey),
          CONSTANTS.CLAIM.INELIGIBLE_ACCOUNT_ERROR,
        );

        const airdropSeat = await tokenMint('Airdrop', baseAmount);
        console.log({
          airdropSeat: {
            hasExited: airdropSeat.hasExited(),
            allocations: airdropSeat.getCurrentAllocation(),
          },
          claimerSeat: {
            hasExited: claimerSeat.hasExited(),
            allocations: claimerSeat.getCurrentAllocation(),
          },
        });
        atomicTransfer(zcf, airdropSeat, claimerSeat, { Airdrop: baseAmount });
        // logic for verifying public key against signature.
        return CONSTANTS.CLAIM.OFFER_SUCCESS(baseAmount);
      };
      return zcf.makeInvitation(
        claimTokensHook,
        'claim airdrop',
        harden({
          claimFacet: Far('claim invitation details', {
            getBaseAmount: () => baseAmount,
            pubkeyCheck: (key) => E(eligibleAccountsStore).has(key),
          }),
        }),
      );
    };
  };

  /** @type {PublicFacet} */
  const publicFacet = Far('public facet', {
    getIssuer: () => issuer,
    getInvitationIssuer: () => zcf.getInvitationIssuer(),
    makeClaimAirdropInvitation: makeClaimAirdropInvitation(
      eligibleAccountsStore,
    ),
  });

  return harden({ creatorFacet, publicFacet });
};

harden(start);

export { start };
