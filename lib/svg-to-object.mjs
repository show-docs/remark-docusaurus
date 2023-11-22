import { visit } from 'unist-util-visit';

function isV3Target({ type, name, attributes = [] }) {
  return (
    (type === 'mdxJsxTextElement' || type === 'mdxJsxFlowElement') &&
    name === 'img' &&
    attributes.some(
      (attr) =>
        attr.type === 'mdxJsxAttribute' &&
        attr.name === 'src' &&
        attr.value?.value &&
        attr.value.value.includes('.svg").default'),
    )
  );
}

export function svgToObject() {
  return (tree) => {
    /* eslint-disable no-param-reassign */
    visit(tree, isV3Target, (node) => {
      node.type = 'mdxJsxFlowElement';
      node.name = 'object';
      node.attributes = [
        {
          type: 'mdxJsxAttribute',
          name: 'className',
          value: 'svg-object',
        },
        {
          type: 'mdxJsxAttribute',
          name: 'type',
          value: 'image/svg+xml',
        },
        {
          type: 'mdxJsxAttribute',
          name: 'data',
          value: node.attributes.find(
            ({ name, type }) => type === 'mdxJsxAttribute' && name === 'src',
          ).value,
        },
        {
          type: 'mdxJsxAttribute',
          name: 'title',
          value: node.attributes.find(
            ({ name, type }) => type === 'mdxJsxAttribute' && name === 'alt',
          )?.value,
        },
      ].filter((item) => item.value);
    });
  };
}
