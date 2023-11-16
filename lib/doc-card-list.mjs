import { strict as assert } from 'node:assert';

import { visit } from 'unist-util-visit';

const placeholder = 'docusaurus-doc-card-list';

function isDirective({ type, children: [line] = [] }, _, parent) {
  return (
    parent?.type === 'root' &&
    type === 'paragraph' &&
    line &&
    ((line.type === 'textDirective' && line.name === placeholder) ||
      (line.type === 'text' && line.value === `:${placeholder}`))
  );
}

const importStatement = "import DocCardList from '@theme/DocCardList';";

function matchStatement(value) {
  return (
    value === importStatement || value === importStatement.replaceAll("'", '"')
  );
}

/* eslint-disable no-param-reassign */
export function docCardList({ version = 2 } = {}) {
  assert([2, 3].includes(version), new TypeError('`version` should be 2 or 3'));

  return (tree) => {
    let haveDirective = false;

    visit(tree, isDirective, (_, index, parent) => {
      if (!haveDirective) {
        haveDirective = true;
      }

      parent.children[index] = {
        ...(version === 2
          ? { type: 'jsx', value: '<DocCardList />' }
          : { type: 'mdxJsxFlowElement', name: 'DocCardList' }),
      };
    });

    if (haveDirective) {
      if (
        version === 2 &&
        !tree.children.some(
          ({ type, value }) => type === 'import' && matchStatement(value),
        )
      ) {
        tree.children.unshift({
          type: 'import',
          value: importStatement,
        });
      }

      if (
        version === 3 &&
        !tree.children.some(
          ({ type, value }) => type === 'mdxjsEsm' && matchStatement(value),
        )
      ) {
        tree.children.unshift({
          type: 'mdxjsEsm',
          value: importStatement,
          data: {
            estree: {
              type: 'Program',
              body: [
                {
                  type: 'ImportDeclaration',
                  specifiers: [
                    {
                      type: 'ImportDefaultSpecifier',
                      local: {
                        type: 'Identifier',
                        name: 'DocCardList',
                      },
                    },
                  ],
                  source: {
                    type: 'Literal',
                    value: '@theme/DocCardList',
                    raw: "'@theme/DocCardList'",
                  },
                },
              ],
              sourceType: 'module',
            },
          },
        });
      }
    }
  };
}
