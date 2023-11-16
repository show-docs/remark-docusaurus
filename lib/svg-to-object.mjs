import { strict as assert } from 'node:assert';

import { visit } from 'unist-util-visit';

function isV2Target({ type, value = '' }) {
  return (
    type === 'jsx' &&
    value.startsWith('<img ') &&
    value.includes('src={') &&
    value.includes('.svg").default}')
  );
}

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

export function svgToObject({ version = 2 } = {}) {
  assert([2, 3].includes(version), new TypeError('`version` should be 2 or 3'));

  if (version === 2) {
    return (tree) => {
      /* eslint-disable no-param-reassign */
      visit(tree, isV2Target, (node) => {
        const { value } = node;

        const src = value.match(/src={([^{}]+)}/);

        const alt = value.match(/alt={([^{}]+)}/) || [0, '""'];

        if (src) {
          node.value = `
<object
  className="svg-object"
  data={${src[1]}}
  type="image/svg+xml"
  title={${alt[1]}}
/>
`;
        }
      });
    };
  }

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
