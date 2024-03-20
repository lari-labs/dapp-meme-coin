// @ts-check
/* global harden */
import '@agoric/zoe/exported.js';
import { provideAll } from '@agoric/zoe/src/contractSupport/durability.js';
import { M } from '@endo/patterns';
import { prepareExoClass, provide } from '@agoric/vat-data';
import {makeIssuerRecord} from '@agoric/zoe/src/issuerRecord.js'
  
/**
 * @type {ContractMeta}
 */
export const meta = {
  upgradability: 'canUpgrade',
  privateArgsShape: M.splitRecord({
    claimWindowTime: M.eref(M.remotable('TimerService')),
    powers: {
      storageNode: M.remotable('StorageNode'),
      marshaller: M.remotable('Marshaller'),
    },
  }),
};
/**
 * @param {import('@agoric/vat-data').Baggage} zcfBaggage
 * @param {{ (keyword: string, issuerRecord: IssuerRecord): void }} recordIssuer
 * @param {GetAssetKindByBrand} getAssetKindByBrand
 * @param {(exit?: undefined) => { zcfSeat: any; userSeat: Promise<UserSeat> }} makeEmptySeatKit
 * @param {ZcfMintReallocator} reallocator
 */
export const prepareZcMint = (
  zcfBaggage,
  recordIssuer,
  getAssetKindByBrand,
  makeEmptySeatKit,
  reallocator,
) => {
  const makeZcMintInternal = prepareExoClass(
    zcfBaggage,
    'zcfMint',
    {},
    /**
     * @template {AssetKind} [K=AssetKind]
     * @param {string} keyword
     * @param {ZoeMint<K>} zoeMint
     * @param {Required<IssuerRecord<K>>} issuerRecord
     */
    (keyword, zoeMint, issuerRecord) => {
      const {
        brand: mintyBrand,
        issuer: mintyIssuer,
        displayInfo: mintyDisplayInfo,
      } = issuerRecord;

      const mintyIssuerRecord = makeIssuerRecord(
        mintyBrand,
        mintyIssuer,
        mintyDisplayInfo,
      );
      recordIssuer(keyword, mintyIssuerRecord);

      return { keyword, zoeMint, mintyIssuerRecord };
    },
    {
      getIssuerRecord() {
        return this.state.mintyIssuerRecord;
      }})
const start = async (zcf, _, baggage) => {
  const { tokenName } = zcf.getTerms();
  assert(tokenName, 'Contract must be given a tokenName property.');

  const { memeTokenMint } = await provideAll(baggage, {
    memeTokenMint: () => zcf.makeZCFMint(tokenName),
  });

  const { issuer } = memeTokenMint.getIssuerRecord();
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
