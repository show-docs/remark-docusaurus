import remark from 'remark';
import remarkMdx from 'remark-mdx';

export function transform(input, plugin, option = {}) {
  return remark()
    .use(remarkMdx)
    .use(plugin, option)
    .process(input)
    .then((file) => file.toString());
}
