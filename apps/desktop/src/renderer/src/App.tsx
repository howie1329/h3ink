import { Add01Icon, FolderOpenIcon, SaveEnergy01Icon, SaveIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import appLogo from '../../../resources/icon-light.png'
import { MarkdownEditor } from '@/components/markdown-editor'
import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import { useDocumentSession } from '@/hooks/use-document-session'

function App(): React.JSX.Element {
  const {
    document,
    recentFiles,
    defaultNotesPath,
    ready,
    errorMessage,
    saveLabel,
    createNewNote,
    hydrateEditorState,
    updateContent,
    openFile,
    loadRecentFile,
    saveNow,
    saveAs,
    deleteCurrentNote
  } = useDocumentSession()

  return (
    <div className="min-h-[100dvh] bg-transparent text-foreground dark">
      <SidebarProvider defaultOpen>
        <div className="flex min-h-[100dvh] w-full bg-transparent">
          <Sidebar
            collapsible="offcanvas"
            className="border-r border-sidebar-border/70 bg-sidebar/95 backdrop-blur-xl"
          >
            <SidebarHeader className="gap-2 px-3 pb-2 pt-3">
              <Button
                type="button"
                onClick={() => void createNewNote()}
                variant="ghost"
                size="compact"
                className="h-8 w-full justify-start gap-2 px-2 text-foreground/80 hover:text-foreground"
              >
                <img src={appLogo} alt="H3 Ink logo" className="size-6 rounded-md object-cover" />
                <div className="min-w-0">
                  <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    H3 Ink
                  </p>
                  <p className="truncate text-[0.88rem] text-foreground/78">{saveLabel}</p>
                </div>
              </Button>
            </SidebarHeader>

            <SidebarContent className="px-2 py-1.5">
              <SidebarGroup>
                <SidebarGroupContent>
                  <Button
                    type="button"
                    onClick={() => void createNewNote()}
                    variant="ghost"
                    size="compact"
                    className="mb-2 w-full justify-start gap-2 px-3 text-foreground/76 hover:text-foreground"
                  >
                    <HugeiconsIcon icon={Add01Icon} className="size-4 shrink-0" strokeWidth={1.8} />
                    <span>New Note</span>
                  </Button>

                  <p className="px-3 pt-3 text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    Recent Files
                  </p>
                  <SidebarMenu className="mt-2 gap-0">
                    {recentFiles.length === 0 ? (
                      <SidebarMenuItem>
                        <div className="px-3 py-2 text-sm text-muted-foreground">
                          No saved notes yet.
                        </div>
                      </SidebarMenuItem>
                    ) : (
                      recentFiles.map((note) => (
                        <SidebarMenuItem key={note.path}>
                          <SidebarMenuButton
                            isActive={document.filePath === note.path}
                            onClick={() => void loadRecentFile(note.path)}
                            size="compact"
                            className="h-auto min-h-8 items-start py-2 font-normal text-muted-foreground hover:bg-accent/50 hover:text-foreground data-[active=true]:bg-accent data-[active=true]:font-medium data-[active=true]:text-foreground"
                          >
                            <div className="min-w-0">
                              <div className="truncate">{note.title}</div>
                              <div className="truncate text-[0.72rem] text-muted-foreground">
                                {note.path}
                              </div>
                            </div>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))
                    )}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          <SidebarInset className="bg-background/70">
            <header className="flex items-center justify-between border-b border-border/70 px-4 py-2.5 md:px-6">
              <div className="min-w-0">
                <p className="truncate text-[0.82rem] text-foreground/88">{document.title}</p>
                <p className="truncate text-[0.72rem] text-muted-foreground">
                  {document.filePath ?? defaultNotesPath ?? 'Draft note'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="compact"
                  onClick={() => void openFile()}
                >
                  <HugeiconsIcon icon={FolderOpenIcon} data-icon="inline-start" strokeWidth={1.8} />
                  Open
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="compact"
                  onClick={() => void saveAs()}
                >
                  <HugeiconsIcon
                    icon={SaveEnergy01Icon}
                    data-icon="inline-start"
                    strokeWidth={1.8}
                  />
                  Save As
                </Button>
                <Button type="button" size="compact" onClick={() => void saveNow()}>
                  <HugeiconsIcon icon={SaveIcon} data-icon="inline-start" strokeWidth={1.8} />
                  Save
                </Button>
                {document.filePath ? (
                  <Button
                    type="button"
                    variant="destructive"
                    size="compact"
                    onClick={() => void deleteCurrentNote()}
                  >
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
                  {document.lastSavedAt
                    ? new Date(document.lastSavedAt).toLocaleString()
                    : 'Not yet'}
                </span>
              </div>

              <MarkdownEditor
                key={document.sessionKey}
                value={document.content}
                onHydrate={hydrateEditorState}
                onChange={updateContent}
              />

              <div className="mt-3 rounded-2xl border border-border/60 bg-card/35 px-4 py-3 text-sm text-muted-foreground">
                H3 Ink edits supported Markdown in TipTap and saves back to `.md`. Drafts stay in
                memory until `Save As`.
              </div>

              {errorMessage ? (
                <div className="mt-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {errorMessage}
                </div>
              ) : null}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default App
