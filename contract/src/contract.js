// @ts-check
/* global harden */
import '@agoric/zoe/exported.js';
import { AmountMath, AssetKind } from '@agoric/ertp';
import { Far } from '@endo/marshal';
import { provideAll } from '@agoric/zoe/src/contractSupport/durability.js';
import { start as startClaimContract } from './claimContract.js';
import { M } from '@endo/patterns';
import { prepareExoClass, provide } from '@agoric/vat-data';
const defaultOptions = ['MEMES', AssetKind.NAT, { decimalPlaces: 6 }];

const makeZCFMintFunction = async (zcf, options = defaultOptions) =>
  await zcf.makeZCFMint(...options);

const handleIncarnation = (baggage, key) =>
  !baggage.has(key) ? baggage.init(key, 0) : baggage.set(baggage.get(key) + 1);

/**
 * @type {ContractMeta}
 */
export const meta = {
  upgradability: 'canUpgrade',
  privateArgsShape: M.splitRecord({
    timerService: M.eref(M.remotable('TimerService')),
    powers: {
      storageNode: M.remotable('StorageNode'),
      marshaller: M.remotable('Marshaller'),
    },
  }),
};

const start = async (zcf, _, baggage) => {
  const { tokenName } = zcf.getTerms();
  assert(tokenName, 'Contract must be given a tokenName property.');

  const { zcfMint } = await provideAll(baggage, {
    zcfMint: () => zcf.makeZCFMint(tokenName),
  });

  const { issuer, brand } = zcfMint.getIssuerRecord();
  // const creatorFacet = Far('creatorFacet', {
  //   makeTokenMint: async (options = defaultOptions) =>
  //     await makeZCFMintFunction(zcf, options),
  // });

  prepareExoClass(
    baggage,
    'ZCF Token Mint',
    undefined,
    () => ({
      tokenName,
    }),
    {
      getIssuer() {
        return issuer;
      },
    },
  );
  const creatorFacet = provide(baggage, 'ERTP Mint', () =>
    zcf.makeZCFMint(zcf.getTerms().tokenName),
  );
  return harden({ creatorFacet });
};

harden(start);
export { start };
