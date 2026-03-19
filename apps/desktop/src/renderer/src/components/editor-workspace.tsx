import { FolderOpenIcon, SaveEnergy01Icon, SaveIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { MarkdownEditor, type EditorSnapshot } from '@/components/markdown-editor'
import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import type { DocumentState } from '@/lib/document-session'

type EditorWorkspaceProps = {
  defaultNotesPath: string
  document: DocumentState
  errorMessage: string | null
  ready: boolean
  saveLabel: string
  onDelete: () => void
  onHydrate: (snapshot: EditorSnapshot) => void
  onOpenFile: () => void
  onSave: () => void
  onSaveAs: () => void
  onUpdate: (snapshot: EditorSnapshot) => void
}

export function EditorWorkspace({
  defaultNotesPath,
  document,
  errorMessage,
  ready,
  saveLabel,
  onDelete,
  onHydrate,
  onOpenFile,
  onSave,
  onSaveAs,
  onUpdate
}: EditorWorkspaceProps): React.JSX.Element {
  return (
    <>
      <header className="flex items-center justify-between border-b border-border/70 px-4 py-2.5 md:px-6">
        <div className="min-w-0">
          <p className="truncate text-[0.82rem] text-foreground/88">{document.title}</p>
          <p className="truncate text-[0.72rem] text-muted-foreground">
            {document.filePath ?? defaultNotesPath ?? 'Draft note'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" size="compact" onClick={onOpenFile}>
            <HugeiconsIcon icon={FolderOpenIcon} data-icon="inline-start" strokeWidth={1.8} />
            Open
          </Button>
          <Button type="button" variant="outline" size="compact" onClick={onSaveAs}>
            <HugeiconsIcon icon={SaveEnergy01Icon} data-icon="inline-start" strokeWidth={1.8} />
            Save As
          </Button>
          <Button type="button" size="compact" onClick={onSave}>
            <HugeiconsIcon icon={SaveIcon} data-icon="inline-start" strokeWidth={1.8} />
            Save
          </Button>
          {document.filePath ? (
            <Button type="button" variant="destructive" size="compact" onClick={onDelete}>
              Delete
            </Button>
          ) : null}
          <SidebarTrigger className="text-foreground/78 md:hidden" />
        </div>
      </header>

      <div className="flex h-full flex-1 flex-col px-4 py-4 md:px-6">
        <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-border/60 bg-card/35 px-4 py-3 text-sm text-muted-foreground">
          <span>Status: {ready ? saveLabel : 'Loading'}</span>
          <span>Origin: {document.origin}</span>
          <span>Dirty: {document.isDirty ? 'Yes' : 'No'}</span>
          <span>
            Last saved:{' '}
            {document.lastSavedAt ? new Date(document.lastSavedAt).toLocaleString() : 'Not yet'}
          </span>
        </div>

        <MarkdownEditor
          key={document.sessionKey}
          value={document.content}
          onHydrate={onHydrate}
          onChange={onUpdate}
        />

        <div className="mt-3 rounded-2xl border border-border/60 bg-card/35 px-4 py-3 text-sm text-muted-foreground">
          H3 Ink edits supported Markdown in TipTap and saves back to `.md`. Drafts stay in memory
          until `Save As`.
        </div>

        {errorMessage ? (
          <div className="mt-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {errorMessage}
          </div>
        ) : null}
      </div>
    </>
  )
}
