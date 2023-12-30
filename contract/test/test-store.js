import { test } from './prepare-test-env-ava.js';
import {
  makeScalarBigMapStore,
  makeScalarBigWeakMapStore,
} from '@agoric/vat-data';
import TestWallets from './data/walletData.js';
const { twofifty } = TestWallets;

const addNewKeyToMap = (map, val) => {
  map.init(
    val.address,
    harden({
      claimed: false,
    }),
  );
  return map;
};

test('WeakMap storage setup', async (t) => {
  const walletStore = makeScalarBigWeakMapStore('Eligible Wallets');

  const actual = twofifty.reduce(
    addNewKeyToMap,
    makeScalarBigWeakMapStore('eligible wallets'),
  ); //?
  t.deepEqual(actual.has(twofifty[10].address), true);
});
