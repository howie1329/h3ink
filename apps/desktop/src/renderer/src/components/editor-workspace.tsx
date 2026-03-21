import { FolderOpenIcon, SaveIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { MarkdownEditor } from '@/components/markdown-editor'
import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useDocumentSession } from '@/hooks/use-document-session'

export function EditorWorkspace(): React.JSX.Element {
  const { document, errorMessage, hydrateEditorState, updateContent, openFile, saveNow } =
    useDocumentSession()

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="flex min-h-9 shrink-0 items-center justify-between gap-3 border-b border-border px-3 py-1.5 md:px-4">
        <p className="min-w-0 truncate text-xs font-medium text-foreground">{document.title}</p>
        <div className="flex shrink-0 items-center gap-1.5">
          {!document.filePath ? (
            <Button type="button" size="xs" onClick={() => void saveNow()}>
              <HugeiconsIcon icon={SaveIcon} data-icon="inline-start" strokeWidth={1.5} />
              Save
            </Button>
          ) : null}
          <Button type="button" variant="outline" size="xs" onClick={() => void openFile()}>
            <HugeiconsIcon icon={FolderOpenIcon} data-icon="inline-start" strokeWidth={1.5} />
            Open
          </Button>
          <SidebarTrigger className="text-foreground/78 md:hidden" />
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-3 px-4 py-3 md:px-6 md:py-4">
        <MarkdownEditor
          key={document.sessionKey}
          value={document.content}
          onHydrate={hydrateEditorState}
          onChange={updateContent}
        />

        {errorMessage ? (
          <div className="shrink-0 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {errorMessage}
          </div>
        ) : null}
      </div>
    </div>
  )
}
