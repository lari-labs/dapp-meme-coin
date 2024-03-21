import { makeFakeVatAdmin } from '@agoric/zoe/tools/fakeVatAdmin.js';
import { setUpZoeForTest } from '@agoric/zoe/tools/setup-zoe.js';
import bundleSource from '@endo/bundle-source';
import { E } from '@endo/eventual-send';

const initContract = async (
  contractPath = rootContractPath,
  bundleName = 'b1-default-bundle-name',
) => {
  const bundle = await bundleSource(contractPath);
  const { zoe, feeMintAccessP, vatAdminState, vatAdminSvc } =
    await setUpZoeForTest();
  vatAdminState.installBundle(bundleName, bundle);
  const installation = await E(zoe).installBundleID(bundleName);

  return {
    installation,
    vatAdminSvc,
    vatAdminState,
    feeMintAccess: await feeMintAccessP,
    zoe,
    bundle,
    bundleName,
  };
};

const contractFiles = {
  Faucet: '../src/faucet.js',
  Claim: '../src/claimContract.js',
};

export { contractFiles, initContract };
