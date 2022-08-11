import { strict as assert } from 'assert';

import { visit } from 'unist-util-visit';

function needImport(nodes, text) {
  return !nodes.some(
    ({ type, value }) => type === 'import' && value.includes(text),
  );
}

function importStatement(value) {
  return { type: 'import', value };
}

function isDirective(placeholder) {
  return ({ type, children: [line] = [] }) => {
    return (
      type === 'paragraph' &&
      line?.type === 'text' &&
      line?.value === placeholder
    );
  };
}

/* eslint-disable no-param-reassign */
export function docCardList({
  placeholder = ':docusaurus-doc-card-list',
} = {}) {
  assert(
    typeof placeholder === 'string',
    new TypeError('`placeholder` should be string'),
  );

  assert(
    placeholder.length > 5,
    new TypeError('`placeholder` should be longer than 5 characters'),
  );

  return (tree) => {
    let haveDirective = false;

    visit(tree, isDirective(placeholder), (_, index, parent) => {
      if (!haveDirective) {
        haveDirective = true;
      }

      parent.children[index] = {
        type: 'jsx',
        value: '<DocCardList items={useCurrentSidebarCategory().items} />',
      };
    });

    if (
      haveDirective &&
      needImport(tree.children, 'useCurrentSidebarCategory')
    ) {
      tree.children.unshift(
        importStatement(
          "import { useCurrentSidebarCategory } from '@docusaurus/theme-common';",
        ),
      );
    }

    if (haveDirective && needImport(tree.children, '@theme/DocCardList')) {
      tree.children.unshift(
        importStatement("import DocCardList from '@theme/DocCardList';"),
      );
    }
  };
}
