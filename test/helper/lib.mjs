import cloneDeep from 'lodash/cloneDeep.js';
import { format } from 'prettier';
import { remark } from 'remark';
import remark12 from 'remark-12';
import remarkDirective from 'remark-directive';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdx from 'remark-mdx';
import remarkMdx1 from 'remark-mdx-1';
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

export async function TransformSnapshot(
  t,
  input,
  plugin,
  option = {},
  show = true,
) {
  t.snapshot(input);

  async function runner(version) {
    const instance =
      version === 2
        ? remark12()
            .use(remarkMdx1)
            .use(plugin, { ...option, version })
        : remark()
            .use(setMatter)
            .use(remarkFrontmatter, ['yaml'])

            .use(remarkMdx)
            .use(remarkDirective)
            .use(plugin, { ...option, version });

    const ast = instance.parse(input.trimStart());

    t.snapshot(removePST(ast));

    const tree = await instance.run(ast);

    t.snapshot(removePST(tree));

    if (show) {
      const output = await instance
        .process(input.trimStart())
        .then((file) => file.toString())
        .then((file) => format(file, { parser: 'mdx', singleQuote: true }));

      t.snapshot(output);
    }
  }

  await runner(2);

  await runner(3);
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
