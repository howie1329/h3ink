import Link from '@tiptap/extension-link'
import { Markdown } from '@tiptap/markdown'
import StarterKit from '@tiptap/starter-kit'

export const h3InkEditorExtensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3]
    },
    horizontalRule: false,
    strike: false
  }),
  Link.configure({
    autolink: true,
    defaultProtocol: 'https',
    openOnClick: false
  }),
  Markdown
]
