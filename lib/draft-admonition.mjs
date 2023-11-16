import { strict as assert } from 'node:assert';

const _meta = { draftSAdmonition: true };

export function draftSAdmonition({
  text = '',
  type = '_meta',
  title = 'Drafted',
  version = 2,
} = {}) {
  assert(typeof title === 'string', new TypeError('`title` should be string'));
  assert(typeof type === 'string', new TypeError('`type` should be string'));
  assert(typeof text === 'string', new TypeError('`text` should be string'));
  assert([2, 3].includes(version), new TypeError('`version` should be 2 or 3'));

  return (tree, file) => {
    if (
      text &&
      (version === 2 || file.data.frontMatter?.draft) &&
      !tree.children.some((node) => node._meta?.draftSAdmonition)
    ) {
      const index =
        tree.children.findIndex(
          (node) => node.type === 'heading' && node.depth === 1,
        ) || 0;

      const context = {
        type: 'paragraph',
        children: [{ type: 'text', value: text }],
      };

      if (version === 2) {
        tree.children.splice(
          index + 1,
          0,
          {
            _meta,
            type: 'jsx',
            value: '<div hidden={!frontMatter.draft}>',
          },
          {
            _meta,
            type: 'admonitionHTML',
            data: {
              hName: 'admonition',
              hProperties: { title, type },
            },
            children: [context],
          },
          {
            _meta,
            type: 'jsx',
            value: '</div>',
          },
        );
      } else {
        tree.children.splice(index + 1, 0, {
          type: 'containerDirective',
          name: type,
          children: [
            {
              type: 'paragraph',
              data: {
                directiveLabel: true,
              },
              children: [
                {
                  type: 'text',
                  value: title,
                },
              ],
            },
            context,
          ],
        });
      }
    }
  };
}
