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

```mjs
// docusaurus.config.mjs
import {
  autoTabs,
  docCardList,
  draftSAdmonition,
  svgToObject
} from 'remark-docusaurus';

export default {
  presets: [
    [
      'classic',
      {
        docs: {
          beforeDefaultRemarkPlugins: [
            autoTabs,
            docCardList,
            draftSAdmonition,
            svgToObject
          ]
        }
      }
    ]
  ]
};
```

### DocCardList

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

This plugin only compatible with `docusaurus@3/remark@^13+/mdx@3+`.

## Related

- [markdown-code-block-meta](https://github.com/nice-move/markdown-code-block-meta)
- [rehype-extended-table](https://github.com/nice-move/rehype-extended-table)
- [remark-code-example](https://github.com/nice-move/remark-code-example)
- [remark-kroki](https://github.com/nice-move/remark-kroki)
