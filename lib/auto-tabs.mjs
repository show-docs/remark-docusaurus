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

function needImport(nodes, target) {
  return !nodes.some(
    ({ type, value }) => type === 'mdxjsEsm' && matchStatement(value, target),
  );
}

function importStatement(value, data) {
  return { type: 'mdxjsEsm', value, data };
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

function isDirective(node) {
  return node.type === 'containerDirective' && node.name === 'TabItem';
}

function findGroups(nodes) {
  const groups = [];
  let currentGroup = false;

  for (const item of nodes) {
    const isStart = item.is === 'TabItem-tag' && item.isStartTag;
    const isEnd = item.is === 'TabItem-tag' && item.isEndTag;

    if (isStart) {
      currentGroup = { items: [item], start: nodes.indexOf(item) };
    } else if (currentGroup) {
      currentGroup.items.push(item);
    }

    if (isEnd && currentGroup) {
      groups.push(currentGroup);
      currentGroup = false;
    }
  }

  return groups.reverse();
}

/* eslint-disable no-param-reassign */
export function autoTabs({ labels = {} } = {}) {
  assert(
    labels && typeof labels === 'object' && !Array.isArray(labels),
    new TypeError('`labels` should be object'),
  );

  const allLabels = { ...presets, ...labels };

  return (tree) => {
    let haveTabs = false;
    let haveTabItem = false;

    visit(tree, isDirective, (node) => {
      haveTabItem = true;

      const label = node.children.find(({ data }) => data?.directiveLabel);

      Object.assign(node, {
        is: 'TabItem-tag',
        name: 'TabItem',
        type: 'mdxJsxFlowElement',
        attributes: Object.entries(
          label
            ? {
                ...node.attributes,
                label: label.children?.[0]?.value,
              }
            : node.attributes,
        ).map(([name, value]) => ({
          type: 'mdxJsxAttribute',
          name,
          value,
        })),
        children: node.children.filter(({ data }) => !data?.directiveLabel),
      });
    });

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
    });

    visit(tree, isEndItem, (node, endIndex) => {
      haveTabs = true;

      node.isEndTag = true;

      visit(tree, isFirstItem(endIndex), (_) => {
        _.isStartTag = true;
      });
    });

    const io = findGroups(tree.children);

    for (const { items, start } of io) {
      if (items.length > 0) {
        tree.children.splice(start, items.length, {
          type: 'mdxJsxFlowElement',
          name: 'Tabs',
          is: 'Tabs-tag',
          children: items,
        });
      }
    }

    if (haveTabs && needImport(tree.children, '@theme/Tabs')) {
      tree.children.unshift(
        importStatement("import Tabs from '@theme/Tabs';", {
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

    if (haveTabItem && needImport(tree.children, '@theme/TabItem')) {
      tree.children.unshift(
        importStatement("import TabItem from '@theme/TabItem';", {
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
