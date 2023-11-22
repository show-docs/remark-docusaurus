import test from 'ava';

import { docCardList } from '../lib/index.mjs';

import { TransformSnapshot } from './helper/lib.mjs';

async function TransformMacro(t, input, options) {
  return TransformSnapshot(t, input, docCardList, options);
}

test(
  'default',
  TransformMacro,
  `
# heading

:docusaurus-doc-card-list

foo bar
`,
);

test(
  'ignore placeholder as child',
  TransformMacro,
  '-   :docusaurus-doc-card-list',
);
