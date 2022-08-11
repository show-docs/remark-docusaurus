import remark from 'remark';
import remarkMdx from 'remark-mdx';

export function transform(input, plugin, option = {}) {
  return remark()
    .use(remarkMdx)
    .use(plugin, option)
    .process(input)
    .then((file) => file.toString());
}

export function getUtils(t) {
  return {
    sameText(expected, result) {
      t.is(expected.trim(), result.trim());
    },
  };
}
