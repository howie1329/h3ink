import { EditorContent, useEditor } from '@tiptap/react'
import { useEffect } from 'react'
import {
  CodeIcon,
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Button } from '@/components/ui/button'
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
    shouldRerenderOnTransaction: true,
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

  const isBold = Boolean(editor?.isActive('bold'))
  const isItalic = Boolean(editor?.isActive('italic'))
  const isUnderline = Boolean(editor?.isActive('underline'))
  const isCode = Boolean(editor?.isActive('code'))

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      <div className="shrink-0 py-1">
        <div className="flex w-full justify-center">
          <div className="inline-flex items-center gap-0.5 rounded-md border border-border bg-background/70 px-1 py-0.5">
            <Button
              type="button"
              size="icon-xs"
              variant={isBold ? 'outline' : 'ghost'}
              aria-label="Bold"
              aria-pressed={isBold}
              disabled={!editor}
              onClick={() => editor?.chain().focus().toggleBold().run()}
            >
              <HugeiconsIcon icon={TextBoldIcon} strokeWidth={2} />
            </Button>
            <Button
              type="button"
              size="icon-xs"
              variant={isItalic ? 'outline' : 'ghost'}
              aria-label="Italic"
              aria-pressed={isItalic}
              disabled={!editor}
              onClick={() => editor?.chain().focus().toggleItalic().run()}
            >
              <HugeiconsIcon icon={TextItalicIcon} strokeWidth={2} />
            </Button>
            <Button
              type="button"
              size="icon-xs"
              variant={isUnderline ? 'outline' : 'ghost'}
              aria-label="Underline"
              aria-pressed={isUnderline}
              disabled={!editor}
              onClick={() => editor?.chain().focus().toggleUnderline().run()}
            >
              <HugeiconsIcon icon={TextUnderlineIcon} strokeWidth={2} />
            </Button>
            <Button
              type="button"
              size="icon-xs"
              variant={isCode ? 'outline' : 'ghost'}
              aria-label="Inline code"
              aria-pressed={isCode}
              disabled={!editor}
              onClick={() => editor?.chain().focus().toggleCode().run()}
            >
              <HugeiconsIcon icon={CodeIcon} strokeWidth={2} />
            </Button>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
