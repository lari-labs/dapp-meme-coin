import { AmountMath } from '@agoric/ertp';
import { toOnly } from '@agoric/zoe/src/contractSupport';
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

// https://docs.agoric.com/reference/zoe-api/zoe.html#e-zoe-getinstallationforinstance-instance

/** @type {ContractStartFn} */
const start = async (zcf, privateArgs) => {
  const { mint } = privateArgs;

  const { brand } = mint.getIssuerRecord();
  const { timeAuthority, airdropMap } = zcf.getTerms();

  const airdropMultiplierNotifier = await makeNotifierFromTimer(timeAuthority);

  console.log('airdropMultiplierNotifier:::', airdropMultiplierNotifier);

  const creatorFacet = Far('creator facet', {
    getNotifier: () => airdropMultiplierNotifier,
  });

  const mintPrizeTokens = (attempt) => (userSeat) => {
    const { supply } = airdropMap.get(attempt);

    const paymentKeywordRecord = { COINS: AmountMath.make(brand, supply) };
    const mintSeat = mint.mintGains(paymentKeywordRecord);
    userSeat.incrementBy({ COINS: mintSeat.decrementBy(paymentKeywordRecord) });
    console.log(
      'user amount allocated',
      userSeat.getAmountAllocated('COINS', brand),
    );
    zcf.reallocate(mintSeat, userSeat);
    userSeat.exit();
  };
  const publicFacet = Far('public facet', {
    getInvitationIssuer: () => zcf.getInvitationIssuer(),
    makeSecretPhraseGuess: (attempt) => {
      return airdropMap.has(attempt)
        ? zcf.makeInvitation(mintPrizeTokens(attempt), 'mint tokens invitation')
        : 'Incorrect guess!';
    },
  });

  return harden({ creatorFacet, publicFacet });
};

harden(start);

export { start };
