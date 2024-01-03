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

const mintTokens = (zcfMint) => (keyword, amount) => {
  //  console.log('inside mint:::', { keyword, amount, zcfMint });
  const adminSeat = zcfMint.mintGains({ [keyword]: amount });
  return adminSeat;
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

  const adminSeat = zcf.makeEmptySeatKit().zcfSeat;

  const tokenMint = mintTokens(mint);

  const makeAirdropAmount = (x = 1000n) => AmountMath.make(brand, x);

  // console.log({ baseAmount, brand, issuer });

  const airdropMultiplierNotifier = await makeNotifierFromTimer(timerService);
  const makeMintTokensInvitation = () => {
    const mintHook = async (_seat, offerArgs) => {
      const { targetMintAmount } = offerArgs;

      console.log({ adminSeat, targetMintAmount });
      assert(
        targetMintAmount,
        'Invitation must contain a targetMintAmount argument.',
      );

      const tempSeat = mint.mintGains({ Airdrop: targetMintAmount });
      // console.log(
      //   'inside mintHook:: issuerSeat.getStagedAllocation :: BEFORE',
      //   adminSeat.getStagedAllocation(),
      // );
      adminSeat.incrementBy(
        tempSeat.decrementBy({ Airdrop: targetMintAmount }),
      );
      ('Mint success! 1_000_000n tokens have been minted and added to the internal contract seat.');
      // console.log(
      //   'inside mintHook:: issuerSeat.getCurrentAllocation :: AFRER',
      //   adminSeat.getStagedAllocation(),
      // );
      return CONSTANTS.TOKEN_ISSUANCE.MINT_SUCCESS(targetMintAmount);
    };

    return zcf.makeInvitation(mintHook, 'mint tokens invitation');
  };
  const creatorFacet = Far('creator facet', {
    makeMintTokensInvitation,
    getIssuerDetails: () => ({
      issuer,
      brand,
    }),
    getNotifier: () => airdropMultiplierNotifier,
    getEligibleWalletsStore: () => E(eligibleAccountsStore),
    checkEligibility: (key) => eligibleAccountsStore.has(key),
  });

  const makeClaimAirdropInvitation = () => {
    const baseAmount = makeAirdropAmount(1000n);
    /** @type {OfferHandler} */
    const claimTokensHook = async (claimerSeat, claimerOfferArgs) => {
      assert(
        // @ts-ignore
        E(eligibleAccountsStore).has(claimerOfferArgs.pubkey),
        CONSTANTS.CLAIM.INELIGIBLE_ACCOUNT_ERROR,
      );
      console.log({
        claimerSeatBefore: {
          hasExited: claimerSeat.hasExited(),
          allocations: claimerSeat.getCurrentAllocation(),
        },
      });
      /** @type {ZCFSeat} */
      const adminSeat = tokenMint('Airdrop', baseAmount);
      claimerSeat.incrementBy(adminSeat.decrementBy({ Airdrop: baseAmount }));
      zcf.reallocate(adminSeat, claimerSeat);
      console.log({
        claimerSeat: {
          hasExited: claimerSeat.hasExited(),
          allocations: claimerSeat.getCurrentAllocation(),
        },
      });
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
