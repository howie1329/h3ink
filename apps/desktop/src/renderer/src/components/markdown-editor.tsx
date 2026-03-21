import { EditorContent, useEditor } from '@tiptap/react'
import { useEffect } from 'react'
import { h3InkEditorExtensions } from '@/lib/tiptap'

type MarkdownEditorProps = {
  value: string
  onHydrate: (markdown: string) => void
  onChange: (markdown: string) => void
}

export function MarkdownEditor({
  value,
  onHydrate,
  onChange
}: MarkdownEditorProps): React.JSX.Element {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: h3InkEditorExtensions,
    content: value,
    contentType: 'markdown',
    editorProps: {
      attributes: {
        class: 'h3ink-editor min-h-full w-full min-w-0 outline-none',
        'data-placeholder': 'Start writing. Save from the sidebar or header when ready.'
      }
    },
    onCreate: ({ editor }) => {
      onHydrate(editor.getMarkdown())
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getMarkdown())
    }
  })

  useEffect(() => {
    if (!editor || value === editor.getMarkdown()) {
      return
    }

    editor.commands.setContent(value, {
      contentType: 'markdown',
      emitUpdate: false
    })
    onHydrate(editor.getMarkdown())
  }, [editor, onHydrate, value])

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
