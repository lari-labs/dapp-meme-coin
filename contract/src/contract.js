// @ts-check
/* global harden */
import '@agoric/zoe/exported.js';
import { AmountMath, AssetKind } from '@agoric/ertp';
import { Far } from '@endo/marshal';
import { start as startClaimContract } from './claimContract.js';
const defaultOptions = ['MEMES', AssetKind.NAT, { decimalPlaces: 6 }];

const makeZCFMintFunction = async (zcf, options = defaultOptions) => {
  const mint = await zcf.makeZCFMint(...options);

  const { issuer } = mint.getIssuerRecord();
  return { mint, issuer, brand: issuer.getBrand() };
};
/**
 * @type {ContractStartFn}
 */
const start = async (zcf) => {
  // Create the internal token mint for a fungible digital asset. Note
  // that 'Tokens' is both the keyword and the allegedName.
  const [zcfMint] = await Promise.all([zcf.makeZCFMint('Tokens')]);

  // AWAIT

  // Now that ZCF has saved the issuer, brand, and local amountMath, they
  // can be accessed synchronously.
  const { issuer, brand } = zcfMint.getIssuerRecord();

  /** @type {OfferHandler} */
  const mintMaxSupply = (seat) => {
    const amount = AmountMath.make(brand, 1000n);
    // Synchronously mint and allocate amount to seat.
    zcfMint.mintGains(harden({ Token: amount }), seat);
    // Exit the seat so that the user gets a payout.
    seat.exit();
    // Since the user is getting the payout through Zoe, we can
    // return anything here. Let's return some helpful instructions.
    return 'Offer completed. You should receive a payment from Zoe';
  };

  const creatorFacet = Far('creatorFacet', {
    // The creator of the instance can send invitations to anyone
    // they wish to.
    startClaimContract,
    makeTokenMint: async (options = defaultOptions) =>
      await makeZCFMintFunction(zcf, options),
    makeInvitation: () => zcf.makeInvitation(mintMaxSupply, 'mint a payment'),
    getTokenIssuer: () => issuer,
  });

  const publicFacet = Far('publicFacet', {
    // Make the token issuer public. Note that only the mint can
    // make new digital assets. The issuer is ok to make public.
    getTokenIssuer: () => issuer,
  });

  // Return the creatorFacet to the creator, so they can make
  // invitations for others to get payments of tokens. Publish the
  // publicFacet.
  return harden({ creatorFacet, publicFacet });
};

harden(start);
export { start };
