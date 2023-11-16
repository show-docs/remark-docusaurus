import { strict as assert } from 'node:assert';

import { getValue, parse, stringify } from 'markdown-code-block-meta';
import titleize from 'titleize';
import { visit } from 'unist-util-visit';

function isTab({ type, meta }, _, parent) {
  return (
    parent?.type === 'root' && type === 'code' && meta && parse(meta).has('tab')
  );
}

function matchStatement(value, target) {
  return value === target || value === target.replaceAll("'", '"');
}

function needImport(version, nodes, target) {
  return !nodes.some(
    ({ type, value }) =>
      (version === 2 ? type === 'import' : type === 'mdxjsEsm') &&
      matchStatement(value, target),
  );
}

function importStatement(version, value, data) {
  return version === 2
    ? { type: 'import', value }
    : { type: 'mdxjsEsm', value, data };
}

const presets = {
  js: 'JavaScript',
  ts: 'TypeScript',
  md: 'Markdown',
  mdx: 'MDX',
  json: 'JSON',
  yaml: 'YAML',
  yml: 'YAML',
  toml: 'TOML',
  css: 'CSS',
};

function isEndItem(node, index, parent) {
  if (
    parent?.type !== 'root' ||
    parent?.is === 'Tabs-tag' ||
    node.is !== 'TabItem-tag'
  ) {
    return false;
  }

  const next = parent.children[index + 1];

  return !next || next.is !== 'TabItem-tag';
}

function isFirstItem(endIndex) {
  return (node, index, parent) => {
    if (
      index > endIndex ||
      parent?.type !== 'root' ||
      parent?.is === 'Tabs-tag' ||
      node.is !== 'TabItem-tag'
    ) {
      return false;
    }

    const prev = parent.children[index - 1];

    return !prev || prev.is !== 'TabItem-tag';
  };
}

function isFirst(node, index, parent) {
  if (parent?.type !== 'root') {
    return false;
  }

  const prev = parent.children[index - 1];

  return (
    node.is === 'TabItem-begin-tag' &&
    (prev
      ? prev.is !== 'TabItem-end-tag' && prev.is !== 'Tabs-begin-tag'
      : true)
  );
}

function isLast(node, index, parent) {
  if (parent?.type !== 'root') {
    return false;
  }

  const next = parent.children[index + 1];

  return (
    node.is === 'TabItem-end-tag' &&
    (!next || (next.is !== 'TabItem-begin-tag' && next.is !== 'Tabs-end-tag'))
  );
}

/* eslint-disable no-param-reassign */
export function autoTabs({ labels = {}, version = 2 } = {}) {
  assert(
    labels && typeof labels === 'object' && !Array.isArray(labels),
    new TypeError('`labels` should be object'),
  );
  assert([2, 3].includes(version), new TypeError('`version` should be 2 or 3'));

  const allLabels = { ...presets, ...labels };

  return (tree) => {
    let haveTabs = false;
    let haveTabItem = false;

    visit(tree, isTab, (node, index, parent) => {
      haveTabItem = true;

      const meta = parse(node.meta);

      const tab = getValue(meta.get('tab'));

      const { lang } = node;

      const label =
        allLabels[tab] ||
        tab ||
        allLabels[lang] ||
        titleize(lang).replace('-', ' ');

      meta.delete('tab');

      node.meta = stringify(meta);

      if (version === 2) {
        parent.children.splice(index + 1, 0, {
          type: 'jsx',
          is: 'TabItem-end-tag',
          value: '</TabItem>',
        });

        parent.children.splice(index, 0, {
          type: 'jsx',
          is: 'TabItem-begin-tag',
          value: `<TabItem label="${label}" value="${label}-${lang}">`,
        });
      } else {
        parent.children[index] = {
          type: 'mdxJsxFlowElement',
          name: 'TabItem',
          is: 'TabItem-tag',
          attributes: [
            {
              type: 'mdxJsxAttribute',
              name: 'label',
              value: label,
            },
            {
              type: 'mdxJsxAttribute',
              name: 'value',
              value: `tab-${label}-${lang}`,
            },
          ],
          children: [
            { type: 'text', value: '' },
            node,
            { type: 'text', value: '' },
          ],
        };
      }
    });

    if (version === 2) {
      visit(tree, isFirst, (node, index, parent) => {
        haveTabs = true;
        parent.children.splice(index, 0, {
          type: 'jsx',
          is: 'Tabs-begin-tag',
          value: '<Tabs>',
        });
      });

      visit(tree, isLast, (node, index, parent) => {
        parent.children.splice(index + 1, 0, {
          type: 'jsx',
          is: 'Tabs-end-tag',
          value: '</Tabs>',
        });
      });
    } else {
      visit(tree, isEndItem, (node, endIndex, parent) => {
        haveTabs = true;

        visit(tree, isFirstItem(endIndex), (_, startIndex) => {
          const io = parent.children.splice(
            startIndex,
            endIndex - startIndex + 1,
          );

          parent.children.splice(startIndex, 0, {
            type: 'mdxJsxFlowElement',
            name: 'Tabs',
            is: 'Tabs-tag',
            children: io,
          });
        });
      });
    }

    if (haveTabs && needImport(version, tree.children, '@theme/Tabs')) {
      tree.children.unshift(
        importStatement(version, "import Tabs from '@theme/Tabs';", {
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
                      name: 'Tabs',
                    },
                  },
                ],
                source: {
                  type: 'Literal',
                  value: '@theme/Tabs',
                  raw: "'@theme/Tabs'",
                },
              },
            ],
            sourceType: 'module',
            comments: [],
          },
        }),
      );
    }

    if (haveTabItem && needImport(version, tree.children, '@theme/TabItem')) {
      tree.children.unshift(
        importStatement(version, "import TabItem from '@theme/TabItem';", {
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
                      name: 'TabItem',
                    },
                  },
                ],
                source: {
                  type: 'Literal',
                  value: '@theme/TabItem',
                  raw: "'@theme/TabItem'",
                },
              },
            ],
            sourceType: 'module',
          },
        }),
      );
    }
  };
}
