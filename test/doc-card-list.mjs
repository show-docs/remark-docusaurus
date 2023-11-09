import test from 'ava';

import { docCardList } from '../lib/index.mjs';

import { ErrorSnapshot, TransformSnapshot } from './helper/lib.mjs';

test('validate', ErrorSnapshot, [
  () => docCardList({ placeholder: true }),
  () => docCardList({ placeholder: '12345' }),
]);

async function TransformMacro(t, input, options) {
  return TransformSnapshot(t, input, docCardList, options);
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
