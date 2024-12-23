# Snapshot report for `test/auto-tabs.mjs`

The actual snapshot is saved in `auto-tabs.mjs.snap`.

Generated by [AVA](https://avajs.dev).

## validate

> Snapshot 1

    TypeError {
      message: '`labels` should be object',
    }

> Snapshot 2

    TypeError {
      message: '`labels` should be object',
    }

> Snapshot 3

    TypeError {
      message: '`labels` should be object',
    }

## default

> Snapshot 1

    `␊
    \`\`\`js tab␊
    \`\`\`␊
    ␊
    \`\`\`ts tab␊
    \`\`\`␊
    ␊
    ---␊
    ␊
    \`\`\`css tab␊
    \`\`\`␊
    `

> Snapshot 2

    [
      {
        lang: 'js',
        meta: 'tab',
        type: 'code',
        value: '',
      },
      {
        lang: 'ts',
        meta: 'tab',
        type: 'code',
        value: '',
      },
      {
        type: 'thematicBreak',
      },
      {
        lang: 'css',
        meta: 'tab',
        type: 'code',
        value: '',
      },
    ]

> Snapshot 3

    [
      {
        data: {
          estree: {
            body: [
              {
                source: {
                  raw: '\'@theme/TabItem\'',
                  type: 'Literal',
                  value: '@theme/TabItem',
                },
                specifiers: [
                  {
                    local: {
                      name: 'TabItem',
                      type: 'Identifier',
                    },
                    type: 'ImportDefaultSpecifier',
                  },
                ],
                type: 'ImportDeclaration',
              },
            ],
            sourceType: 'module',
            type: 'Program',
          },
        },
        type: 'mdxjsEsm',
        value: 'import TabItem from \'@theme/TabItem\';',
      },
      {
        data: {
          estree: {
            body: [
              {
                source: {
                  raw: '\'@theme/Tabs\'',
                  type: 'Literal',
                  value: '@theme/Tabs',
                },
                specifiers: [
                  {
                    local: {
                      name: 'Tabs',
                      type: 'Identifier',
                    },
                    type: 'ImportDefaultSpecifier',
                  },
                ],
                type: 'ImportDeclaration',
              },
            ],
            comments: [],
            sourceType: 'module',
            type: 'Program',
          },
        },
        type: 'mdxjsEsm',
        value: 'import Tabs from \'@theme/Tabs\';',
      },
      {
        children: [
          {
            attributes: [
              {
                name: 'label',
                type: 'mdxJsxAttribute',
                value: 'JavaScript',
              },
              {
                name: 'value',
                type: 'mdxJsxAttribute',
                value: 'tab-JavaScript-js',
              },
            ],
            children: [
              {
                type: 'text',
                value: '',
              },
              {
                lang: 'js',
                meta: '',
                type: 'code',
                value: '',
              },
              {
                type: 'text',
                value: '',
              },
            ],
            is: 'TabItem-tag',
            isStartTag: true,
            name: 'TabItem',
            type: 'mdxJsxFlowElement',
          },
          {
            attributes: [
              {
                name: 'label',
                type: 'mdxJsxAttribute',
                value: 'TypeScript',
              },
              {
                name: 'value',
                type: 'mdxJsxAttribute',
                value: 'tab-TypeScript-ts',
              },
            ],
            children: [
              {
                type: 'text',
                value: '',
              },
              {
                lang: 'ts',
                meta: '',
                type: 'code',
                value: '',
              },
              {
                type: 'text',
                value: '',
              },
            ],
            is: 'TabItem-tag',
            isEndTag: true,
            name: 'TabItem',
            type: 'mdxJsxFlowElement',
          },
        ],
        is: 'Tabs-tag',
        name: 'Tabs',
        type: 'mdxJsxFlowElement',
      },
      {
        type: 'thematicBreak',
      },
      {
        children: [
          {
            attributes: [
              {
                name: 'label',
                type: 'mdxJsxAttribute',
                value: 'CSS',
              },
              {
                name: 'value',
                type: 'mdxJsxAttribute',
                value: 'tab-CSS-css',
              },
            ],
            children: [
              {
                type: 'text',
                value: '',
              },
              {
                lang: 'css',
                meta: '',
                type: 'code',
                value: '',
              },
              {
                type: 'text',
                value: '',
              },
            ],
            is: 'TabItem-tag',
            isEndTag: true,
            isStartTag: true,
            name: 'TabItem',
            type: 'mdxJsxFlowElement',
          },
        ],
        is: 'Tabs-tag',
        name: 'Tabs',
        type: 'mdxJsxFlowElement',
      },
    ]

> Snapshot 4

    `import TabItem from '@theme/TabItem';␊
    ␊
    import Tabs from '@theme/Tabs';␊
    ␊
    <Tabs>␊
      <TabItem label="JavaScript" value="tab-JavaScript-js">␊
    ␊
        \`\`\`js␊
        \`\`\`␊
    ␊
      </TabItem>␊
    ␊
      <TabItem label="TypeScript" value="tab-TypeScript-ts">␊
    ␊
        \`\`\`ts␊
        \`\`\`␊
    ␊
      </TabItem>␊
    </Tabs>␊
    ␊
    ---␊
    ␊
    <Tabs>␊
      <TabItem label="CSS" value="tab-CSS-css">␊
    ␊
        \`\`\`css␊
        \`\`\`␊
    ␊
      </TabItem>␊
    </Tabs>␊
    `

## custom

> Snapshot 1

    `␊
    \`\`\`js tab="54654 E pd"␊
    \`\`\`␊
    ␊
    ␊
    \`\`\`any tab␊
    \`\`\`␊
    `

> Snapshot 2

    [
      {
        lang: 'js',
        meta: 'tab="54654 E pd"',
        type: 'code',
        value: '',
      },
      {
        lang: 'any',
        meta: 'tab',
        type: 'code',
        value: '',
      },
    ]

> Snapshot 3

    [
      {
        data: {
          estree: {
            body: [
              {
                source: {
                  raw: '\'@theme/TabItem\'',
                  type: 'Literal',
                  value: '@theme/TabItem',
                },
                specifiers: [
                  {
                    local: {
                      name: 'TabItem',
                      type: 'Identifier',
                    },
                    type: 'ImportDefaultSpecifier',
                  },
                ],
                type: 'ImportDeclaration',
              },
            ],
            sourceType: 'module',
            type: 'Program',
          },
        },
        type: 'mdxjsEsm',
        value: 'import TabItem from \'@theme/TabItem\';',
      },
      {
        data: {
          estree: {
            body: [
              {
                source: {
                  raw: '\'@theme/Tabs\'',
                  type: 'Literal',
                  value: '@theme/Tabs',
                },
                specifiers: [
                  {
                    local: {
                      name: 'Tabs',
                      type: 'Identifier',
                    },
                    type: 'ImportDefaultSpecifier',
                  },
                ],
                type: 'ImportDeclaration',
              },
            ],
            comments: [],
            sourceType: 'module',
            type: 'Program',
          },
        },
        type: 'mdxjsEsm',
        value: 'import Tabs from \'@theme/Tabs\';',
      },
      {
        children: [
          {
            attributes: [
              {
                name: 'label',
                type: 'mdxJsxAttribute',
                value: '54654 E pd',
              },
              {
                name: 'value',
                type: 'mdxJsxAttribute',
                value: 'tab-54654 E pd-js',
              },
            ],
            children: [
              {
                type: 'text',
                value: '',
              },
              {
                lang: 'js',
                meta: '',
                type: 'code',
                value: '',
              },
              {
                type: 'text',
                value: '',
              },
            ],
            is: 'TabItem-tag',
            isStartTag: true,
            name: 'TabItem',
            type: 'mdxJsxFlowElement',
          },
          {
            attributes: [
              {
                name: 'label',
                type: 'mdxJsxAttribute',
                value: 'Any',
              },
              {
                name: 'value',
                type: 'mdxJsxAttribute',
                value: 'tab-Any-any',
              },
            ],
            children: [
              {
                type: 'text',
                value: '',
              },
              {
                lang: 'any',
                meta: '',
                type: 'code',
                value: '',
              },
              {
                type: 'text',
                value: '',
              },
            ],
            is: 'TabItem-tag',
            isEndTag: true,
            name: 'TabItem',
            type: 'mdxJsxFlowElement',
          },
        ],
        is: 'Tabs-tag',
        name: 'Tabs',
        type: 'mdxJsxFlowElement',
      },
    ]

> Snapshot 4

    `import TabItem from '@theme/TabItem';␊
    ␊
    import Tabs from '@theme/Tabs';␊
    ␊
    <Tabs>␊
      <TabItem label="54654 E pd" value="tab-54654 E pd-js">␊
    ␊
        \`\`\`js␊
        \`\`\`␊
    ␊
      </TabItem>␊
    ␊
      <TabItem label="Any" value="tab-Any-any">␊
    ␊
        \`\`\`any␊
        \`\`\`␊
    ␊
      </TabItem>␊
    </Tabs>␊
    `

## ignore child

> Snapshot 1

    `␊
    -  \`\`\`js tab␊
        \`\`\`␊
    `

> Snapshot 2

    [
      {
        children: [
          {
            checked: null,
            children: [
              {
                lang: 'js',
                meta: 'tab',
                type: 'code',
                value: '',
              },
            ],
            spread: false,
            type: 'listItem',
          },
        ],
        ordered: false,
        spread: false,
        start: null,
        type: 'list',
      },
    ]

> Snapshot 3

    [
      {
        children: [
          {
            checked: null,
            children: [
              {
                lang: 'js',
                meta: 'tab',
                type: 'code',
                value: '',
              },
            ],
            spread: false,
            type: 'listItem',
          },
        ],
        ordered: false,
        spread: false,
        start: null,
        type: 'list',
      },
    ]

> Snapshot 4

    `- \`\`\`js tab␊
    ␊
      \`\`\`␊
    `

## directive

> Snapshot 1

    `␊
    :::TabItem[asads]{value="as da"}␊
    fdsfsd␊
    :::␊
    ␊
    :::TabItem␊
    111111111111111␊
    :::␊
    ␊
    `

> Snapshot 2

    [
      {
        attributes: {
          value: 'as da',
        },
        children: [
          {
            children: [
              {
                type: 'text',
                value: 'asads',
              },
            ],
            data: {
              directiveLabel: true,
            },
            type: 'paragraph',
          },
          {
            children: [
              {
                type: 'text',
                value: 'fdsfsd',
              },
            ],
            type: 'paragraph',
          },
        ],
        name: 'TabItem',
        type: 'containerDirective',
      },
      {
        attributes: {},
        children: [
          {
            children: [
              {
                type: 'text',
                value: '111111111111111',
              },
            ],
            type: 'paragraph',
          },
        ],
        name: 'TabItem',
        type: 'containerDirective',
      },
    ]

> Snapshot 3

    [
      {
        data: {
          estree: {
            body: [
              {
                source: {
                  raw: '\'@theme/TabItem\'',
                  type: 'Literal',
                  value: '@theme/TabItem',
                },
                specifiers: [
                  {
                    local: {
                      name: 'TabItem',
                      type: 'Identifier',
                    },
                    type: 'ImportDefaultSpecifier',
                  },
                ],
                type: 'ImportDeclaration',
              },
            ],
            sourceType: 'module',
            type: 'Program',
          },
        },
        type: 'mdxjsEsm',
        value: 'import TabItem from \'@theme/TabItem\';',
      },
      {
        data: {
          estree: {
            body: [
              {
                source: {
                  raw: '\'@theme/Tabs\'',
                  type: 'Literal',
                  value: '@theme/Tabs',
                },
                specifiers: [
                  {
                    local: {
                      name: 'Tabs',
                      type: 'Identifier',
                    },
                    type: 'ImportDefaultSpecifier',
                  },
                ],
                type: 'ImportDeclaration',
              },
            ],
            comments: [],
            sourceType: 'module',
            type: 'Program',
          },
        },
        type: 'mdxjsEsm',
        value: 'import Tabs from \'@theme/Tabs\';',
      },
      {
        children: [
          {
            attributes: [
              {
                name: 'value',
                type: 'mdxJsxAttribute',
                value: 'as da',
              },
              {
                name: 'label',
                type: 'mdxJsxAttribute',
                value: 'asads',
              },
            ],
            children: [
              {
                children: [
                  {
                    type: 'text',
                    value: 'fdsfsd',
                  },
                ],
                type: 'paragraph',
              },
            ],
            is: 'TabItem-tag',
            isStartTag: true,
            name: 'TabItem',
            type: 'mdxJsxFlowElement',
          },
          {
            attributes: [],
            children: [
              {
                children: [
                  {
                    type: 'text',
                    value: '111111111111111',
                  },
                ],
                type: 'paragraph',
              },
            ],
            is: 'TabItem-tag',
            isEndTag: true,
            name: 'TabItem',
            type: 'mdxJsxFlowElement',
          },
        ],
        is: 'Tabs-tag',
        name: 'Tabs',
        type: 'mdxJsxFlowElement',
      },
    ]

> Snapshot 4

    `import TabItem from '@theme/TabItem';␊
    ␊
    import Tabs from '@theme/Tabs';␊
    ␊
    <Tabs>␊
      <TabItem value="as da" label="asads">␊
        fdsfsd␊
      </TabItem>␊
    ␊
      <TabItem>␊
        111111111111111␊
      </TabItem>␊
    </Tabs>␊
    `
