import remark from 'remark';
import remarkMdx from 'remark-mdx';
import { removePosition } from 'unist-util-remove-position';

export function transform(input, plugin, options = {}) {
  return remark()
    .use(remarkMdx)
    .use(plugin, options)
    .process(input)
    .then((file) => file.toString());
}

export async function getAst(input) {
  const tree = await remark().use(remarkMdx).parse(input);

  removePosition(tree, true);

  return tree;
}

export function ErrorSnapshots(t, funcs) {
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
