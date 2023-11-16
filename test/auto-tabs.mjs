import test from 'ava';

import { autoTabs } from '../lib/index.mjs';

import { ErrorSnapshot, TransformSnapshot } from './helper/lib.mjs';

test('validate', ErrorSnapshot, [
  () => autoTabs({ labels: '' }),
  () => autoTabs({ labels: [] }),
  () => autoTabs({ labels: null }),
  () => autoTabs({ version: null }),
]);

async function TransformMacro(t, input, options) {
  return TransformSnapshot(t, input, autoTabs, options);
}

test(
  'default',
  TransformMacro,
  `
\`\`\`js tab
\`\`\`

\`\`\`ts tab
\`\`\`

---

\`\`\`css tab
\`\`\`
`,
);

test(
  'custom',
  TransformMacro,
  `
\`\`\`js tab="54654 E pd"
\`\`\`


\`\`\`any tab
\`\`\`
`,
);

test(
  'ignore child',
  TransformMacro,
  `
-  \`\`\`js tab
    \`\`\`
`,
);
