/**
 * @file Test using bundleSource() on the contract.
 */
// @ts-check

/* eslint-disable import/order -- https://github.com/endojs/endo/issues/1235 */
import { test as anyTest } from './airdropData/prepare-test-env-ava.js';

import { createRequire } from 'module';
import bundleSource from '@endo/bundle-source';
import { E, Far, passStyleOf } from '@endo/far';
import { makeZoeKitForTest } from '@agoric/zoe/tools/setup-zoe.js';
import { fixHub } from '../src/fixHub.js';
import { unsafeMakeBundleCache } from '../../../agoric-sdk/packages/SwingSet/tools/bundleTool.js';
import buildManualTimer from '@agoric/zoe/tools/manualTimer.js';
import { makeNameHubKit, makePromiseSpace } from '@agoric/vats';
import { makeWellKnownSpaces } from '@agoric/vats/src/core/utils.js';
import { makeFakeStorageKit } from '../../../agoric-sdk/packages/internal/src/storage-test-utils.js';
import { makeFakeBoard } from '@agoric/vats/tools/board-utils.js';
import { makeStableFaucet } from './power-tools/mintStable.js';
import { makeBundleCache } from '@endo/bundle-source/cache.js';
import { makeClientMarshaller } from '../src/marshalTables.js';
import { documentStorageSchema } from './airdropData/storageDoc.js';
import {
  installContractStarter,
  startContractStarter,
} from '../src/start-contractStarter.js';
import {
  bootAndInstallBundles,
  getBundleId,
  makeBundleCacheContext,
} from './boot-tools.js';
import { makeWalletFactory, mockWalletFactory } from './wallet-tools.js';
import { receiverRose, senderContract, starterSam } from './market-actors.js';
import { AmountMath } from '/Users/tgreco/agoric-sdk/packages/ERTP';
import { AssetKind } from '@agoric/ertp';
import { makeIssuerKit } from '/Users/tgreco/agoric-sdk/packages/ERTP/src/issuerKit.js';

const DAY = 24 * 60 * 60 * 1000;
const UNIT6 = 1_000_000n;

// const { entries } = Object;
// const { Fail } = assert;

// /** @type {<T>(x: T | null | undefined) => T} */
// const NonNullish = x => {
//   if (x === null || x === undefined) {
//     throw Error('null/undefined');
//   }
//   return x;
// };

// /** @type {import('ava').TestFn<Awaited<ReturnType<makeTestContext>>>} */
// const test = anyTest;

// const myRequire = createRequire(import.meta.url);
// const asset = specifier => myRequire.resolve(specifier);
// test.before(async t => (t.context = await makeBundleCache(t)));

// const makeTestContext = async t => {
//   const bundleCache = await unsafeMakeBundleCache('bundles/');

//   const bundle = await bundleCache.load(
//     asset('../../../../src/contracts/gimix/gimix.js'),
//     'gimix',
//   );
//   const centralSupplyBundle = await bundleCache.load(
//     asset('@agoric/vats/src/centralSupply.js'),
//     'centralSupply',
//   );

//   const eventLoopIteration = () => new Promise(setImmediate);

//   const manualTimer = buildManualTimer(
//     t.log,
//     BigInt((2020 - 1970) * 365.25 * DAY),
//     {
//       timeStep: BigInt(DAY),
//       eventLoopIteration,
//     },
//   );

//   const bootstrap = async () => {
//     const { zoeService, feeMintAccess } = makeZoeKitForTest();

//     // mock installBundleID
//     const installBundleID = bid => {
//       assert.equal(bid, `b1-${bundle.endoZipBase64Sha512}`);
//       return zoeService.install(bundle);
//     };

//     const zoe = Far('ZoeService', {
//       getFeeIssuer: () => zoeService.getFeeIssuer(),
//       getInvitationIssuer: () => zoeService.getInvitationIssuer(),
//       installBundleID,
//       // @ts-expect-error mock / spread
//       startInstance: (...args) => zoeService.startInstance(...args),
//       // @ts-expect-error mock / spread
//       getTerms: (...args) => zoeService.getTerms(...args),
//       // @ts-expect-error mock / spread
//       getPublicFacet: (...args) => zoeService.getPublicFacet(...args),
//       // @ts-expect-error mock / spread
//       offer: (...args) => zoeService.offer(...args),
//     });
//     const { nameHub: namesByAddress, nameAdmin: namesByAddressAdmin } =
//       makeNameHubKit();

//     const invitationIssuer = await E(zoe).getInvitationIssuer();
//     const invitationBrand = await E(invitationIssuer).getBrand();

//     const istIssuer = await E(zoe).getFeeIssuer();
//     const istBrand = await E(istIssuer).getBrand();
//     const centralSupply = await E(zoeService).install(centralSupplyBundle);

//     /** @type {import('@agoric/time/src/types').TimerService} */
//     const chainTimerService = manualTimer;
//     const timerBrand = await E(chainTimerService).getTimerBrand();

//     const { nameHub: agoricNames, nameAdmin: agoricNamesAdmin } =
//       makeNameHubKit();

//     console.log({ agoricNames, agoricNamesAdmin });
//     const spaces = await makeWellKnownSpaces(agoricNamesAdmin, t.log, [
//       'issuer',
//       'brand',
//       'installation',
//       'instance',
//     ]);
//     spaces.issuer.produce.IST.resolve(istIssuer);
//     spaces.issuer.produce.Invitation.resolve(invitationIssuer);
//     spaces.brand.produce.IST.resolve(istBrand);
//     spaces.brand.produce.Invitation.resolve(invitationBrand);
//     spaces.brand.produce.timer.resolve(timerBrand);
//     spaces.installation.produce.centralSupply.resolve(centralSupply);

//     const board = makeFakeBoard();
//     const { rootNode, data: _todo } = makeFakeStorageKit('published');

//     const { produce, consume } = makePromiseSpace();
//     produce.agoricNames.resolve(agoricNames);
//     produce.board.resolve(board);
//     produce.chainTimerService.resolve(chainTimerService);
//     produce.chainStorage.resolve(rootNode);
//     produce.feeMintAccess.resolve(feeMintAccess);
//     produce.namesByAddress.resolve(namesByAddress);
//     produce.namesByAddressAdmin.resolve(namesByAddressAdmin);
//     produce.zoe.resolve(zoe);

//     /**
//      * @type {BootstrapPowers}}
//      */
//     // @ts-expect-error mock
//     const powers = { produce, consume, ...spaces };
//     return powers;
//   };

//   const powers = await bootstrap();

//   /** @param {bigint} value */
//   const faucet = async value =>
//     makeStableFaucet(value, {
//       centralSupply: powers.installation.consume.centralSupply,
//       feeMintAccess: powers.consume.feeMintAccess,
//       zoe: powers.consume.zoe,
//     });

//   return { bundle, faucet, manualTimer, powers };
// };
const nodeRequire = createRequire(import.meta.url);

const contractName = 'airdropCampaign';
const bundleRoots = {
  postalSvc: nodeRequire.resolve('../src/postalSvc.js'),
  [contractName]: nodeRequire.resolve('../src/airdropCampaign.js'),
  contractStarter: nodeRequire.resolve('../src/contractStarter.js'),
};
/** @type {import('ava').TestFn<Awaited<ReturnType<makeBundleCacheContext>>>} */
const test = anyTest;
const Airdroplets = makeIssuerKit('Airdroplets');

test.before(async t => (t.context = await makeBundleCacheContext(t)));

test.serial('boot, walletFactory, contractStarter', async t => {
  const bootKit = await bootAndInstallBundles(t, bundleRoots);

  const { powers, bundles } = bootKit;

  const Airdroplets = makeIssuerKit('Airdroplets');

  const nameAdmin = powers.produce.agoricNamesAdmin;

  const { IST } = powers.issuer.consume;
  const walletFactory = await makeWalletFactory(powers.consume, { IST });
  const bundleID = getBundleId(bundles.contractStarter);

  await installContractStarter(powers, {
    options: { contractStarter: { bundleID } },
  });
  await startContractStarter(powers, {});

  const starterInstance = await powers.instance.consume.contractStarter;

  t.is(typeof starterInstance, 'object');
  Object.assign(t.context.shared, { ...bootKit, walletFactory }); // XXX untyped
  return { context: t.context };
});

test('use contractStarter to start postalSvc', async t => {
  const {
    powers: powers0,
    bundles,
    boardAux,
    ...x
  } = await bootAndInstallBundles(t, bundleRoots);

  console.log({ boardAux, rest: x });
  const id = {
    contractStarter: { bundleID: getBundleId(bundles.contractStarter) },
    postalSvc: { bundleID: getBundleId(bundles.postalSvc) },
  };
  /** @type { typeof powers0 & ContractStarterPowers} */
  // @ts-expect-error bootstrap powers evolve with BLD staker governance
  const powers = powers0;

  await installContractStarter(powers, {
    options: { contractStarter: id.contractStarter },
  });
  const startContractResult = await startContractStarter(powers, {});
  console.log({ startContractResult, brand: powers.brand });
  const brand = {
    Invitation: await powers.brand.consume.Invitation,
  };

  /**
   * @type {import('./market-actors.js').WellKnown &
   *  import('./market-actors.js').WellKnownKinds &
   *  import('./market-actors.js').BoardAux}
   */
  const wellKnown = {
    installation: powers.installation.consume,
    instance: powers.instance.consume,
    issuer: powers.issuer.consume,
    brand: powers.brand.consume,
    assetKind: new Map(
      /** @type {[Brand, AssetKind][]} */ ([[brand.Invitation, AssetKind.SET]]),
    ),
    boardAux,
  };

  const { zoe, namesByAddressAdmin, chainStorage, feeMintAccess } =
    powers.consume;
  const walletFactory = mockWalletFactory(
    { zoe, namesByAddressAdmin, chainStorage },
    {
      Invitation: await wellKnown.issuer.Invitation,
      IST: wellKnown.issuer.IST,
      Airdroplets: Airdroplets.issuer,
    },
  );

  const shared = { destAddr: 'agoric1receiverRoseStart' };
  const wallet = {
    sam: await walletFactory.makeSmartWallet('agoric1senderSamStart'),
    rose: await walletFactory.makeSmartWallet(shared.destAddr),
  };

  t.is(Object.keys(wallet), Object.values(wallet));
  const { bundleCache } = t.context;
  const { mintBrandedPayment } = makeStableFaucet({
    bundleCache,
    feeMintAccess,
    zoe,
  });

  await E(wallet.sam.deposit).receive(
    await mintBrandedPayment(100n * 1_000_000n),
  );
  const toSend = { ToDoEmpty: AmountMath.make(brand.Invitation, harden([])) };
  const sam = starterSam(t, { wallet: wallet.sam, ...id.postalSvc }, wellKnown);
  await Promise.all([
    E(sam)
      .getPostalSvcTerms()
      .then(customTerms => {
        console.log('AFTER startSam ::::', { customTerms });

        return E(sam)
          .installAndStart({
            instanceLabel: 'postalSvc',
            ...id.postalSvc,
            customTerms,
          })
          .then(({ instance: postalSvc }) => {
            const terms = { postalSvc, destAddr: shared.destAddr };
            senderContract(t, { zoe, terms });
          });
      }),
    receiverRose(t, { wallet: wallet.rose }, wellKnown, { toSend }),
  ]);

  const m = makeClientMarshaller();
  const storage = await powers.consume.chainStorage;
  const note = `Terms of contractStarter and the contracts it starts are published under boardAux`;
  await documentStorageSchema(t, storage, { note, marshaller: m });
});

test('nameHub - basic user story ', async t => {
  const { powers, bundles } = t.context;

  /**
   * Given a list of wallet addresses,
   * ask them a question.
   * If an address exists within the list of name then it will:
   *   1. gets added to the name hub.
   *   2. be sent an invitation to claim a prize.
   */
});
// test('nameHub', async t => {
//   /**
//    * namehub is used to send an invitation.
//    *
//    * Example
//    *
//    * Given a list of wallet addresses,
//    * ask them a question.
//    * If they are correct:
//    *   1. their name gets added to the name hub.
//    *   2. they are sent an invitation to claim a prize.
//    *
//    *
//    *
//    *
//    */

// });
