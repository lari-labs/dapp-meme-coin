import { AssetKind } from '@agoric/ertp';
import {
  M,
  makeScalarBigWeakSetStore as makeScalarBigSetStore,
  makeScalarSetStore,
} from '@agoric/vat-data';
import buildManualTimer from '@agoric/zoe/tools/manualTimer.js';
import { setUpZoeForTest } from '@agoric/zoe/tools/setup-zoe.js';
import bundleSource from '@endo/bundle-source';
import { E } from '@endo/eventual-send';
import { withAmountUtils } from './amountUtils.js';

const createIdentifier = (key) => `account:${key}`;

const createRemotable = (object) => Far(object);

const formatKeysForStorage = (array) =>
  array.map((x) => createRemotable(createIdentifier(x)));

const initContract = async (
  t,
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

  const memeCoinUtils = withAmountUtils({
    mint: memeCoinzMint,
    issuer: memeCoinsIssuer,
    brand: memeCoinsBrand,
  });

  vatAdminState.installBundle('b1-airdrop', await bundleSource(airdropBundle));
  const airdropInstallation = await E(zoe).installBundleID('b1-airdrop');

  const eligibleAccountsStore = await makeScalarSetStore('Eligible_Accounts', {
    keyShape: M.remotable(),
    durable: true,
  });

  await eligibleAccountsStore.addAll(addressData);

  // [TG]
  // Commenting code out below due to impact is has on text execution speed. UNCOMMENT TO INSPECT RESULTS
  //
  // addressData.reduce(
  //   (acc, val) =>
  //     t.deepEqual(
  //       eligibleAccountsStore.has(val),
  //       true,
  //       `eligibleAccountStore given .has(${val})) shold return true`,
  //     ),
  //   [],
  // );

  const airdropInstance = await E(zoe).startInstance(
    airdropInstallation,
    {
      AirdropTokens: memeCoinsIssuer,
    },
    {},
    {
      mint: memeCoinzMint,
      brand: memeCoinsBrand,
      issuer: memeCoinsIssuer,
      eligibleAccountsStore,
      timerService: timer,
    },
  );
  return {
    memeCoinUtils,
    memeCoinsBrand,
    memeCoinsIssuer,
    memeCoinzMint,
    installation,
    vatAdminSvc,
    vatAdminState,
    feeMintAccess: await feeMintAccessP,
    zoe,
    bundle,
    airdropInstance,
    async startAirdrop() {
      const airdropInstance = await E(zoe).startInstance(
        airdropInstallation,
        {
          AirdropTokens: memeCoinsIssuer,
        },
        {},
        {
          mint: memeCoinzMint,
          brand: memeCoinsBrand,
          issuer: memeCoinsIssuer,
          eligibleAccountsStore,
          timerService: timer,
        },
      );
      await airdropInstance;
      return {
        airdropInstance,
        installation: airdropInstallation,
        airdropBundle,
      };
    },
    bundleName,
  };
};

const contractFiles = {
  Faucet: '../src/faucet.js',
  Claim: '../src/claimContract.js',
};

export { contractFiles, createIdentifier, initContract };
