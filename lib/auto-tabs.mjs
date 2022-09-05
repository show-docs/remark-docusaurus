import { strict as assert } from 'assert';

import { getValue, parse, stringify } from 'markdown-code-block-meta';
import titleize from 'titleize';
import { visit } from 'unist-util-visit';

function isTab({ type, meta }, _, parent) {
  return (
    parent?.type === 'root' && type === 'code' && meta && parse(meta).has('tab')
  );
}

function needImport(nodes, text) {
  return !nodes.some(
    ({ type, value }) => type === 'import' && value.includes(text),
  );
}

function importStatement(value) {
  return { type: 'import', value };
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
  plantuml: 'PlantUML',
  'plantuml-code': 'PlantUML Code',
  bytefield: 'ByteField',
  'bytefield-code': 'ByteField Code',
  wavedrom: 'WaveDrom',
  'wavedrom-code': 'WaveDrom Code',
  vegalite: 'Vega-Lite',
  'vegalite-code': 'Vega-Lite Code',
  packetdiag: 'PacketDiag',
  'packetdiag-code': 'PacketDiag Code',
};

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

  const prev = parent.children[index + 1];

  return (
    node.is === 'TabItem-end-tag' &&
    (prev
      ? prev.is !== 'TabItem-begin-tag' && prev.is !== 'Tabs-end-tag'
      : true)
  );
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
    });

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

    if (haveTabs && needImport(tree.children, '@theme/Tabs')) {
      tree.children.unshift(importStatement("import Tabs from '@theme/Tabs'"));
    }

    if (haveTabItem && needImport(tree.children, '@theme/TabItem')) {
      tree.children.unshift(
        importStatement("import TabItem from '@theme/TabItem';"),
      );
    }
  };
}
