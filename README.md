# remark-docusaurus

Remark plugin for docusaurus features.

[![npm][npm-badge]][npm-url]
[![github][github-badge]][github-url]
![node][node-badge]

[npm-url]: https://www.npmjs.com/package/remark-docusaurus
[npm-badge]: https://img.shields.io/npm/v/remark-docusaurus.svg?style=flat-square&logo=npm
[github-url]: https://github.com/nice-move/remark-docusaurus
[github-badge]: https://img.shields.io/npm/l/remark-docusaurus.svg?style=flat-square&colorB=blue&logo=github
[node-badge]: https://img.shields.io/node/v/remark-docusaurus.svg?style=flat-square&colorB=green&logo=node.js

## Installation

```bash
npm install remark-docusaurus --save-dev
```

## Usage

```cjs
// docusaurus.config.cjs
module.exports = async () => {
  const { autoTabs, docCardList } = await import('remark-docusaurus');

  return {
    presets: [
      [
        'classic',
        {
          docs: {
            beforeDefaultRemarkPlugins: [autoTabs, docCardList]
          }
        }
      ]
    ]
  };
};
```

### DocCardList

#### Options.version

- type: `integer`
- enum: [2, 3]
- default: 2
- description: Docusaurus version

Turn:

```markdown
# heading

:docusaurus-doc-card-list

foo bar
```

Into:

```markdown
import DocCardList from '@theme/DocCardList';

# heading

<DocCardList />

foo bar
```

### AutoTabs

#### Options.labels

- type: `object`
- default: {}
- description: Will merge with default presets

#### Options.version

- type: `integer`
- enum: [2, 3]
- default: 2
- description: Docusaurus version

Turn:

````markdown
```js tab

```
````

Into:

````md
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem label="JavaScript">
  ```js tab
  ```
  </TabItem>
</Tabs>
````

## Tips

This plugin only compatible with `docusaurus@2/remark@^12/mdx@1` and `docusaurus@3/remark@^13+/mdx@3+`.

## Related

- [markdown-code-block-meta](https://github.com/nice-move/markdown-code-block-meta)
- [remark-code-example](https://github.com/nice-move/remark-code-example)
- [remark-kroki](https://github.com/nice-move/remark-kroki)
