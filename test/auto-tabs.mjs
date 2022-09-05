// eslint-disable-next-line import/no-unresolved
import test from 'ava';

import { autoTabs } from '../lib/index.mjs';

import { ErrorSnapshots, transform } from './helper/lib.mjs';

test('validate', ErrorSnapshots, [
  () => autoTabs({ labels: '' }),
  () => autoTabs({ labels: [] }),
  () => autoTabs({ labels: null }),
]);

async function TransformMacro(t, input, options) {
  const output = await transform(input, autoTabs, options);
  t.snapshot(output);
}

test(
  'default',
  TransformMacro,
  `
\`\`\`js tab
\`\`\`

\`\`\`ts tab
\`\`\`
`,
);

test(
  'lang',
  TransformMacro,
  `
## rre

\`\`\`any tab
\`\`\`
`,
);

test(
  'custom',
  TransformMacro,
  `
\`\`\`js tab="54654 E pd"
\`\`\`

## fds

\`\`\`js tab=ppp
\`\`\`
`,
);

test(
  'child',
  TransformMacro,
  `
-  \`\`\`js
    \`\`\`
`,
);
