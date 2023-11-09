import test from 'ava';

import { draftSAdmonition } from '../lib/index.mjs';

import { ErrorSnapshot, TransformSnapshot } from './helper/lib.mjs';

test('validate', ErrorSnapshot, [
  () => draftSAdmonition({ title: 0 }),
  () => draftSAdmonition({ title: '', type: [] }),
  () => draftSAdmonition({ title: '', text: {} }),
]);

async function TransformMacro(t, options = {}) {
  return TransformSnapshot(t, '# 55', draftSAdmonition, options, false);
}

test('default', TransformMacro);

test('custom', TransformMacro, {
  title: 'example',
  type: 'success',
  text: '56565656',
});
