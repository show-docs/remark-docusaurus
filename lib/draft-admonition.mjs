import { strict as assert } from 'assert';

export function draftSAdmonition({
  text = '',
  type = 'info',
  title = 'Drafted',
} = {}) {
  assert(typeof title === 'string', new TypeError('`title` should be string'));
  assert(typeof type === 'string', new TypeError('`type` should be string'));
  assert(typeof text === 'string', new TypeError('`text` should be string'));

  return (tree) => {
    if (!tree.children.some((node) => node.meta?.draftSAdmonition)) {
      const index =
        tree.children.findIndex(
          (node) => node.type === 'heading' && node.depth === 1,
        ) || 0;

      tree.children.splice(
        index + 1,
        0,
        {
          type: 'jsx',
          meta: { draftSAdmonition: true },
          value: '<div hidden={!frontMatter.draft}>',
        },
        {
          type: 'admonitionHTML',
          meta: { draftSAdmonition: true },
          data: {
            hName: 'admonition',
            hProperties: { title, type },
          },
          ...(text
            ? {
                children: [
                  {
                    type: 'paragraph',
                    children: [{ type: 'text', value: text }],
                  },
                ],
              }
            : undefined),
        },
        {
          type: 'jsx',
          meta: { draftSAdmonition: true },
          value: '</div>',
        },
      );
    }
  };
}
