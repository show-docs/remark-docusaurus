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
export function docCardList() {
  return (tree) => {
    let haveDirective = false;

    visit(tree, isDirective, (_, index, parent) => {
      if (!haveDirective) {
        haveDirective = true;
      }

      parent.children[index] = {
        type: 'mdxJsxFlowElement',
        name: 'DocCardList',
      };
    });

    if (
      haveDirective &&
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
  };
}
