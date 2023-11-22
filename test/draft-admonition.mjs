import test from 'ava';

import { draftSAdmonition } from '../lib/index.mjs';

import { ErrorSnapshot, TransformSnapshot } from './helper/lib.mjs';

test('validate', ErrorSnapshot, [
  () => draftSAdmonition({ title: 0 }),
  () => draftSAdmonition({ title: '', type: [] }),
  () => draftSAdmonition({ title: '', text: {} }),
]);

async function TransformMacro(t, input) {
  return TransformSnapshot(t, input, draftSAdmonition, {
    title: 'example',
    type: 'success',
    text: '56565656',
  });
}

test(
  'none',
  TransformMacro,
  `
# 55

32131
`,
);

test(
  'default',
  TransformMacro,
  `
---
  draft:   true
---

# 55

32131
`,
);
