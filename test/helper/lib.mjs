import remark from 'remark';
import remarkMdx from 'remark-mdx';
import { removePosition } from 'unist-util-remove-position';

function removePST(ast) {
  removePosition(ast, { force: true });

  return ast.children;
}

export async function TransformSnapshot(
  t,
  input,
  plugin,
  option = {},
  show = true,
) {
  const instance = remark().use(remarkMdx).use(plugin, option);

  const ast = instance.parse(input);

  t.snapshot(input);
  t.snapshot(removePST(ast));

  const tree = removePST(await instance.run(ast));

  t.snapshot(tree);

  if (show) {
    const output = await instance
      .process(input)
      .then((file) => file.toString().trim());
    t.snapshot(output);
  }
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
