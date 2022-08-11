// eslint-disable-next-line import/no-unresolved
import test from 'ava';

import { docCardList } from '../lib/index.mjs';

import { getUtils, transform } from './helper/lib.mjs';

test('validate', (t) => {
  t.throws(() => transform('', docCardList, { placeholder: true }), {
    instanceOf: TypeError,
    message: '`placeholder` should be string',
  });

  t.throws(() => transform('', docCardList, { placeholder: '12345' }), {
    instanceOf: TypeError,
    message: '`placeholder` should be longer than 5 characters',
  });
});

const expected = `
import DocCardList from '@theme/DocCardList';

import { useCurrentSidebarCategory } from '@docusaurus/theme-common';

# heading

<DocCardList items={useCurrentSidebarCategory().items} />

foo bar
`;

test('default placeholder', async (t) => {
  const input = `
# heading

:docusaurus-doc-card-list

foo bar
`;

  const output = await transform(input, docCardList);

  getUtils(t).sameText(expected, output);
});

test('custom placeholder', async (t) => {
  const input = `
# heading

:doc-card-list

foo bar
`;

  const output = await transform(input, docCardList, {
    placeholder: ':doc-card-list',
  });

  getUtils(t).sameText(expected, output);
});

test('ignore child', async (t) => {
  const input = '-   :docusaurus-doc-card-list';

  const output = await transform(input, docCardList);

  getUtils(t).sameText(input, output);
});
