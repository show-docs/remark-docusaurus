// eslint-disable-next-line import/no-unresolved
import test from 'ava';

import { docCardList } from '../lib/index.mjs';

import { ErrorSnapshots, transform } from './helper/lib.mjs';

test('validate', ErrorSnapshots, [
  () => docCardList({ placeholder: true }),
  () => docCardList({ placeholder: '12345' }),
]);

async function TransformMacro(t, input, options) {
  const output = await transform(input, docCardList, options);
  t.snapshot(output);
}

test(
  'default placeholder',
  TransformMacro,
  `
# heading

:docusaurus-doc-card-list

foo bar
`,
);

test(
  'custom placeholder',
  TransformMacro,
  `
# heading

:doc-card-list

foo bar
`,
  { placeholder: ':doc-card-list' },
);

test(
  'ignore placeholder as child',
  TransformMacro,
  '-   :docusaurus-doc-card-list',
);
