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
        class: 'h3ink-editor min-h-[calc(100vh-13.75rem)] w-full outline-none',
        'data-placeholder': 'Start writing. Save As when you want to create a Markdown file.'
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
    <div className="rounded-[1.75rem] border border-border/70 bg-card/50 p-3 shadow-[0_10px_40px_rgba(0,0,0,0.14)]">
      <div className="rounded-[1.3rem] border border-border/70 bg-background/85 px-5 py-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
