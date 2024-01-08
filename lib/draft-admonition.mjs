import { strict as assert } from 'node:assert';

const _meta = { draftSAdmonition: true };

export function draftSAdmonition({
  text = '',
  type = '_meta',
  title = 'Drafted',
} = {}) {
  assert(typeof title === 'string', new TypeError('`title` should be string'));
  assert(typeof type === 'string', new TypeError('`type` should be string'));
  assert(typeof text === 'string', new TypeError('`text` should be string'));

  return (tree, file) => {
    if (
      text &&
      file.data?.frontMatter &&
      (file.data.frontMatter.draft || file.data.frontMatter.isDraft) &&
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

      tree.children.splice(index + 1, 0, {
        type: 'containerDirective',
        name: type,
        _meta,
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
  };
}
