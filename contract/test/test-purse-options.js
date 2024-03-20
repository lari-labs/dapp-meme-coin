// @ts-check
import { test as anyTest } from './airdropData/prepare-test-env-ava.js';
import { createRequire } from 'module';

import { E } from '@endo/far';
import { makeWalletFactory } from './wallet-tools.js';
import { AmountMath, AssetKind } from '@agoric/ertp/src/amountMath.js';
import { makeIssuerKit } from '@agoric/ertp';
import { makeFan, launcherLarry, starterSam } from './market-actors.js';
import {
  makeBundleCacheContext,
  bootAndInstallBundles,
  getBundleId,
} from './boot-tools.js';
import {
  installContractStarter,
  startContractStarter,
} from '../src/start-contractStarter.js';
import { makeStableFaucet } from './power-tools/mintStable.js';
import { makeClientMarshaller } from '../src/marshalTables.js';
import { documentStorageSchema } from './airdropData/storageDoc.js';
import { List } from '../immutable-ext.js';
import { Fn, FnT, Reducer, State, StateT } from '../src/airdrop/adts/monads.js';

const nodeRequire = createRequire(import.meta.url);
const isEmpty = (string = '') => (string === ' ' ? true : false);

const contractName = 'launchIt';
const bundleRoots = {
  [contractName]: nodeRequire.resolve('../src/launchIt.js'),
  contractStarter: nodeRequire.resolve('../src/contractStarter.js'),
};

/** @type {import('ava').TestFn<Awaited<ReturnType<makeBundleCacheContext>>>} */
const test = anyTest;

test.before(async t => (t.context = await makeBundleCacheContext(t)));

const derives = {
  map(f) {
    return f(this.value);
  },
};

const PurseOps = {
  deposit(payment) {
    this.purse.deposit(payment);
    return this;
  },
};

const withConstructor = constructor => o => ({
  // create the delegate [[Prototype]]
  __proto__: {
      // add the constructor prop to the new [[Prototype]]
      constructor
  },
  // mix all o's props into the new object
  ...o
});

const helpersFacet = {
  logThis() {
      console.log('logging context :::', this, this.constructor);
      return this
  },
  logConstructor() {
      console.log('logging .constructor property :::', this.constructor);
      return this.constructor
  }
}
const statusStrings = {
  ACTIVE: 'ACTIVE',
  INELIGIBLE: 'INELIGIBLE',
  CLAIMING: 'CLAIMING',
  CLAIMED: 'CLAIMED',

}

const accountStateMachine = {
  state: statusStrings.INELIGIBLE,
  transitions: {
      INELIGIBLE: {
          enable() {
              this.state = statusStrings.ACTIVE;
              return this.state
          }
      },
      active: {
          disable() {
              this.state = statusStrings.INELIGIBLE
              return this.state

          },
          liquidate() {
              this.state = statusStrings.LIQUIDATING
          }
      }
  }
}

const withAccount = o => {
  let balance = 0;
  return {
      ...o,
      ...helpersFacet,
      stateMachine: ({
          ...accountStateMachine,
          state: accountStateMachine.transitions.INELIGIBLE.enable()
      }),
      balance,
      setName(newName) {
          console.log(this)
          return this.name = newName
      },
      getBalance() {
          return this.balance
      }
  }
}

const makeDistribuableAccountObject = (obj = {}) => compose(
  withConstructor(makeDistribuableAccountObject),
  withAccount
)({ ...obj })
const PurseI = issuer => ({
  issuer,
  deposit: payment => PurseI()
  concat: other => Purse()
})
const ertpObjectMaker =
  (base = {}) =>
  factory =>
  id =>
    Object.assign({}, base, factory(id));
const PurseMaker = ertpObjectMaker(PurseOps);

test('ertpObjectMaker', async t => {});

/** @param {IssuerKit} kit */
const IKit = kit => ({
  deposit: (x = 0n, purse = kit.issuer.makeEmptyPurse()) => {},
  makeEmptyPurse: other => Purse(kit.mint.mintPayment(other.value)),
});

test('deposit facet', async t => {
  console.log(t.context);

  const str = "The quick red fox jumped over the lazy dog's back.";

  const iterator = str[Symbol.iterator]();
  // let theChar = iterator.next();

  const reducer = () =>
    [...iterator].reduce((acc, val) => {
      console.log({ acc, spread: [acc], val });
      return {
        chars: !acc.chars ? [val] : [].concat(acc.chars, val),
        currentVal: val,
      };
    });

  t.deepEqual(reducer(), {});
});
