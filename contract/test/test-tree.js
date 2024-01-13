import { test } from './prepare-test-env-ava.js';
import {
  makeScalarBigMapStore,
  makeScalarBigWeakMapStore,
} from '@agoric/vat-data';
import TestWallets from './data/walletData.js';
import { createMerkleTree, generateProof, verifyProof } from './merkleTree.js';
import crypto from 'crypto';
const { twofifty: data } = TestWallets;
const createBuffer = (value) => Buffer.from(value);
function createTree(data) {
  if (data.length === 0) {
    return [null, []];
  }

  if (data.length === 1) {
    return [data[0], [data]];
  }

  const hashes = data.map((d) =>
    crypto.createHash('sha256').update(d).digest('hex'),
  );
  const newLevel = [];
  const newLevelMap = [];

  for (let i = 0; i < hashes.length; i += 2) {
    const hash1 = hashes[i];
    const hash2 = i + 1 < hashes.length ? hashes[i + 1] : '';
    const combinedHash = hash1 + hash2;
    const newHash = crypto
      .createHash('sha256')
      .update(combinedHash)
      .digest('hex');
    newLevel.push(newHash);
    newLevelMap.push([hash1, hash2]);
  }
  const [x, ...xs] = createTree(newLevel);
  return [x, [newLevelMap, ...xs]];
}

function generateMerkleProof(item, data, [rootHash, levels]) {
  const itemHash = crypto.createHash('sha256').update(item).digest('hex');
  let currentHash = itemHash;
  const proof = [];

  console.log({ proof, currentHash, item, levels });
  for (const level of levels) {
    console.log('level:::', level, { levels, length: levels.length });
    const indexInLevel = level.findIndex(
      ([hash1, hash2]) => hash1 === currentHash || hash2 === currentHash,
    );
    console.log({ indexInLevel, h: level[indexInLevel] });
    if (indexInLevel === -1) {
      return null; // Item not found in tree
    }

    const [hash1, hash2] = level[indexInLevel];
    proof.push(hash1 === currentHash ? hash2 : hash1);

    currentHash = crypto
      .createHash('sha256')
      .update(hash1 + hash2)
      .digest('hex');
  }

  return proof;
}
const compose =
  (...fns) =>
  (initialValue) =>
    fns.reduceRight((acc, val) => val(acc), initialValue);
test('compose', async (t) => {
  const getPublicKey = ({ pubkey }) => pubkey;
  const getAddress = ({ address }) => address;
  const formatAddress = compose(createBuffer, getAddress);
  const testData = data.slice(0, 50).map((x) => Buffer.from(x.address));
  //   t.is(tree[tre
  const tree = createMerkleTree(testData);
  const [tr, ...xs] = tree;
  // t.is(tr, tr[0].toString('hex'));
  const [treeRoot, levels] = createTree(testData);

  console.log({ treeRoot, tr });
  console.log('Root hash:', { tr: tree[0], treeRoot });
  t.is(
    generateMerkleProof(
      'cosmos1p00xhl9ysacadcduxglhavstr8yvh9hfzk6z6w',
      testData,
      [treeRoot, levels],
    ),
    false,
  );

  t.deepEqual(tree, proof, 'should return the correct output');
});
const prepareAddress = (array) => array.map();
const { twofifty } = TestWallets;

const addNewKeyToMap = (map, val) => {
  map.init(
    val.address,
    harden({
      claimed: false,
    }),
    7,
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
