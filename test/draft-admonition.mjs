// eslint-disable-next-line import/no-unresolved
import test from 'ava';

import { draftSAdmonition } from '../lib/index.mjs';

import { ErrorSnapshots, getAst } from './helper/lib.mjs';

test('validate', ErrorSnapshots, [
  () => draftSAdmonition({ title: 0 }),
  () => draftSAdmonition({ title: '', type: [] }),
  () => draftSAdmonition({ title: '', text: {} }),
]);

async function TransformMacro(t, options = {}) {
  const ast = await getAst('# 55');

  const tree = draftSAdmonition(options)(ast);

  t.snapshot(tree);
}

test('default', TransformMacro, {});

test('custom', TransformMacro, {
  title: 'example',
  type: 'success',
  text: '56565656',
});
