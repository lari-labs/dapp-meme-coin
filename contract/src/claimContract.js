import { AmountMath } from '@agoric/ertp';
import { fromOnly, toOnly } from '@agoric/zoe/src/contractSupport';
import { E } from '@endo/eventual-send';
import { Far } from '@endo/marshal';

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

/** @type {ContractStartFn} */
const start = async (zcf, privateArgs) => {
  const { mint } = privateArgs;

  const { brand, issuer } = mint.getIssuerRecord();

  console.log({ issuer });
  await zcf.saveIssuer(issuer, 'MEMECOIN');

  const { timeAuthority, airdropMap, eligibleWalletsStore } = zcf.getTerms();

  const airdropMultiplierNotifier = await makeNotifierFromTimer(timeAuthority);

  console.log('airdropMultiplierNotifier:::', airdropMultiplierNotifier);

  const creatorFacet = Far('creator facet', {
    getNotifier: () => airdropMultiplierNotifier,
    getEligibleWalletStore: () => eligibleWalletsStore,
  });

  const mintPrizeTokens = (attempt) => (userSeat) => {
    const { supply } = airdropMap.get(attempt);

    const paymentKeywordRecord = { COINS: AmountMath.make(brand, supply) };

    // console.log('inside mintPrizetokens::', {
    //   paymentKeywordRecord,
    //   userSeat,
    //   mint,
    //   mintGains: mint.mintGains,
    // });
    const mintSeat = mint.mintGains(paymentKeywordRecord);
    const transferParts = [[mintSeat, userSeat, paymentKeywordRecord]];
    zcf.atomicRearrange(harden(transferParts));
    // console.log(
    //   'user amount allocated',
    //   userSeat.getAmountAllocated('COINS', brand),
    //   'zcfSeat allocated',
    //   mintSeat.getAmountAllocated('COINS', brand),
    // );

    // userSeat.exit();
  };

  const makeClaimAirdropInvitation = () => {
    /** @param {ZCFSeat} claimerSeat */
    const claimTokensHook = async (seat) => {
      const {
        want: { Coins: memeCoinsAmount },
      } = seat.getProposal();
      memeTokenMint.mintGains(harden({ Coins: memeCoinsAmount }), seat);
      seat.exit();
      return `success ${memeCoinsAmount.value}`;
    };
    return zcf.makeInvitation(claimTokensHook, 'claim airdrop');
  };

  const makeClaimPriceInvitation = () => {
    /** @param {ZCFSeat} claimerSeat */
    const claimTokensHook = async (seat) => {
      const {
        want: { Coins: memeCoinsAmount },
      } = seat.getProposal();
      memeTokenMint.mintGains(harden({ Coins: memeCoinsAmount }), seat);
      seat.exit();
      return `success ${memeCoinsAmount.value}`;
    };
    return zcf.makeInvitation(claimTokensHook, 'claim airdrop');
  };

  const prizeWinnerFacet = Far('Prize Winner Facet', {
    makeAmount: (x = 100n) => AmountMath.make(brand, x),
    makeClaimPriceInvitation,
  });
  const publicFacet = Far('public facet', {
    getIssuer: () => issuer,
    getInvitationIssuer: () => zcf.getInvitationIssuer(),
    makeClaimAirdropInvitation,
    makeSecretPhraseGuess: (attempt) =>
      airdropMap.has(attempt) ? prizeWinnerFacet : 'Incorrect guess!',
  });

  return harden({ creatorFacet, publicFacet });
};

harden(start);

export { start };
