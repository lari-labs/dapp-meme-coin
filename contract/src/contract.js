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
  const creatorFacet = Far('creatorFacet', {
    // The creator of the instance can send invitations to anyone
    // they wish to.
    makeTokenMint: async (options = defaultOptions) =>
      await makeZCFMintFunction(zcf, options),
  });

  // @ts-ignore
  return harden({ creatorFacet });
};

harden(start);
export { start };
