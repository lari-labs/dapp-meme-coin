import { AssetKind } from '@agoric/ertp';
import { makeScalarBigSetStore } from '@agoric/vat-data';
import { makeFakeVatAdmin } from '@agoric/zoe/tools/fakeVatAdmin.js';
import buildManualTimer from '@agoric/zoe/tools/manualTimer.js';
import {
  makeZoeForTest,
  setUpZoeForTest,
} from '@agoric/zoe/tools/setup-zoe.js';
import bundleSource from '@endo/bundle-source';
import { E } from '@endo/eventual-send';
function* gen(data) {
  for (let i of data) {
    yield i;
  }
}

const handleIt = (data) => {
  let v = gen(data); //?
  let mySet = makeScalarBigSetStore();
  for (let i of v) {
    mySet.add(i);
  }
  return mySet;
};

// const initializeAirdrop = (contractSource, bundleName = 'b1-token-airdrop', startConfig = {
//   issuerKeywordRecord: {},
//   customTerms: {},
//   privateArgs: {}
// }) => {
//   const
// }

const initContract = async (
  contractPath = rootContractPath,
  bundleName = 'b1-default-bundle-name',
  airdropBundle = {},
  addressData = [],
  timer = buildManualTimer(console.log, 0n, 10_000n),
) => {
  const bundle = await bundleSource(contractPath);
  const { zoe, feeMintAccessP, vatAdminState, vatAdminSvc } =
    await setUpZoeForTest();
  vatAdminState.installBundle(bundleName, bundle);
  const installation = await E(zoe).installBundleID(bundleName);
  const { creatorFacet, instance } = await E(zoe).startInstance(installation);

  const {
    mint: memeCoinzMint,
    issuer: memeCoinsIssuer,
    brand: memeCoinsBrand,
  } = await E(creatorFacet).makeTokenMint(['MEMECOINZ', AssetKind.NAT]);
  console.log({ memeCoinzMint });

  vatAdminState.installBundle('b1-airdrop', await bundleSource(airdropBundle));
  const airdropInstallation = await E(zoe).installBundleID('b1-airdrop');

  const eligibleAccountsStore = handleIt(addressData);

  const airdropInstance = await E(zoe).startInstance(
    airdropInstallation,
    {
      AirdropTokens: memeCoinsIssuer,
    },
    {},
    { mint: memeCoinzMint, eligibleAccountsStore, timerService: timer },
  );
  return {
    installation,
    vatAdminSvc,
    vatAdminState,
    feeMintAccess: await feeMintAccessP,
    zoe,
    bundle,
    airdropInstance,
    bundleName,
  };
};

const contractFiles = {
  Faucet: '../src/faucet.js',
  Claim: '../src/claimContract.js',
};

export { contractFiles, initContract };
