import cloneDeep from 'lodash/cloneDeep.js';
import { format } from 'prettier';
import { remark } from 'remark';
import remarkDirective from 'remark-directive';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdx from 'remark-mdx';
import { removePosition } from 'unist-util-remove-position';
import { parse } from 'yaml';

function removePST(ast) {
  const io = cloneDeep(ast);

  removePosition(io, { force: true });

  return io.children;
}

function setMatter() {
  return (tree, file) => {
    if (tree.children[0]?.type === 'yaml') {
      file.data.frontMatter = parse(tree.children[0].value);
    }
  };
}

export async function TransformSnapshot(t, input, plugin, option = {}) {
  t.snapshot(input);

  const instance = remark()
    .use(setMatter)
    .use(remarkFrontmatter, ['yaml'])

    .use(remarkMdx)
    .use(remarkDirective)
    .use(plugin, option);

  const ast = instance.parse(input.trimStart());

  t.snapshot(removePST(ast));

  const tree = await instance.run(ast);

  t.snapshot(removePST(tree));

  const output = await instance
    .process(input.trimStart())
    .then((file) => file.toString())
    .then((file) => format(file, { parser: 'mdx', singleQuote: true }));

  t.snapshot(output);
}

export function ErrorSnapshot(t, funcs) {
  for (const func of funcs) {
    const error = t.throws(
      () => {
        func();
      },
      {
        instanceOf: TypeError,
        name: 'TypeError',
      },
    );

    t.snapshot(error);
  }
}
