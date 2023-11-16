import test from 'ava';

import { docCardList } from '../lib/index.mjs';

import { ErrorSnapshot, TransformSnapshot } from './helper/lib.mjs';

test('validate', ErrorSnapshot, [() => docCardList({ version: 4 })]);

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
