import { FolderOpenIcon, SaveIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { MarkdownEditor } from '@/components/markdown-editor'
import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useDocumentSession } from '@/hooks/use-document-session'

export function EditorWorkspace(): React.JSX.Element {
  const {
    document,
    errorMessage,
    ready,
    saveLabel,
    hydrateEditorState,
    updateContent,
    openFile,
    saveNow
  } = useDocumentSession()

  return (
    <>
      <header className="flex min-h-9 items-center justify-between gap-3 border-b border-border px-3 py-1.5 md:px-4">
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

      <div className="flex h-full flex-1 flex-col px-4 py-4 md:px-6">
        <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
          <span>Status: {ready ? saveLabel : 'Loading'}</span>
          {import.meta.env.DEV ? (
            <>
              <span>Origin: {document.origin}</span>
              <span>Dirty: {document.isDirty ? 'Yes' : 'No'}</span>
              <span>
                Last saved:{' '}
                {document.lastSavedAt ? new Date(document.lastSavedAt).toLocaleString() : 'Not yet'}
              </span>
            </>
          ) : null}
        </div>

        <MarkdownEditor
          key={document.sessionKey}
          value={document.content}
          onHydrate={hydrateEditorState}
          onChange={updateContent}
        />

        <div className="mt-3 rounded-lg border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
          H3 Ink edits supported Markdown in TipTap and saves back to `.md`. Drafts stay in memory
          until `Save As`.
        </div>

        {errorMessage ? (
          <div className="mt-3 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {errorMessage}
          </div>
        ) : null}
      </div>
    </>
  )
}
