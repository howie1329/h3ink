import {
  Add01Icon,
  ArrowDown01Icon,
  ArrowRight01Icon,
  FolderOpenIcon,
  SaveIcon,
  SaveEnergy01Icon
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import appLogo from '../../../resources/icon-light.png'
import { useState } from 'react'
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

function SidebarSectionToggle({
  title,
  open,
  onToggle
}: {
  title: string
  open: boolean
  onToggle: () => void
}): React.JSX.Element {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center gap-2 px-3 pt-3 text-left text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-foreground/80"
    >
      <HugeiconsIcon
        icon={open ? ArrowDown01Icon : ArrowRight01Icon}
        className="size-3 shrink-0"
        strokeWidth={2}
      />
      <span>{title}</span>
    </button>
  )
}

function App(): React.JSX.Element {
  const [pinnedOpen, setPinnedOpen] = useState(true)
  const [notesOpen, setNotesOpen] = useState(true)
  const [recentOpen, setRecentOpen] = useState(true)
  const {
    document,
    recentFiles,
    desktopNotes,
    defaultNotesPath,
    ready,
    errorMessage,
    saveLabel,
    createNewNote,
    updateContent,
    openFile,
    loadRecentFile,
    saveNow,
    saveAs
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
                  <SidebarSectionToggle
                    title="Pinned"
                    open={pinnedOpen}
                    onToggle={() => setPinnedOpen((current) => !current)}
                  />
                  {pinnedOpen ? (
                    <SidebarMenu className="mt-2 gap-0">
                      <SidebarMenuItem>
                        <div className="px-3 py-2 text-sm text-muted-foreground">
                          No pinned notes yet.
                        </div>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  ) : null}

                  <SidebarSectionToggle
                    title="Notes"
                    open={notesOpen}
                    onToggle={() => setNotesOpen((current) => !current)}
                  />
                  {notesOpen ? (
                    <SidebarMenu className="mt-2 gap-0">
                      {desktopNotes.length === 0 ? (
                        <SidebarMenuItem>
                          <div className="px-3 py-2 text-sm text-muted-foreground">
                            No notes in h3inknotes yet.
                          </div>
                        </SidebarMenuItem>
                      ) : (
                        desktopNotes.map((note) => (
                          <SidebarMenuItem key={note.path}>
                            <SidebarMenuButton
                              isActive={document.filePath === note.path}
                              onClick={() => void loadRecentFile(note.path)}
                              size="compact"
                              className="h-auto min-h-8 items-start py-2 font-normal text-foreground/78 hover:bg-accent/50 hover:text-foreground data-[active=true]:bg-accent data-[active=true]:font-medium data-[active=true]:text-foreground"
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
                  ) : null}

                  <SidebarSectionToggle
                    title="Recent Files"
                    open={recentOpen}
                    onToggle={() => setRecentOpen((current) => !current)}
                  />
                  {recentOpen ? (
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
                  ) : null}
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
                <Button type="button" variant="outline" size="compact" onClick={() => void openFile()}>
                  <HugeiconsIcon icon={FolderOpenIcon} data-icon="inline-start" strokeWidth={1.8} />
                  Open
                </Button>
                <Button type="button" variant="outline" size="compact" onClick={() => void saveAs()}>
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
                <SidebarTrigger className="text-foreground/78 md:hidden" />
              </div>
            </header>

            <div className="flex h-full flex-1 flex-col px-4 py-4 md:px-6">
              <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px]">
                <div className="rounded-2xl border border-border/70 bg-card/50 p-3">
                  <textarea
                    value={document.content}
                    onChange={(event) => updateContent(event.target.value)}
                    placeholder="Start writing. The first edit will create a Markdown file in ~/Desktop/h3inknotes."
                    className="h-[calc(100vh-12rem)] min-h-80 w-full resize-none rounded-xl border border-input/70 bg-background/80 px-4 py-3 font-mono text-sm text-foreground outline-none transition focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <div className="rounded-2xl border border-border/70 bg-card/40 p-4">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                      Persistence
                    </p>
                    <div className="mt-3 flex flex-col gap-2 text-sm text-foreground/84">
                      <p>Status: {ready ? saveLabel : 'Loading'}</p>
                      <p>Origin: {document.origin}</p>
                      <p>Dirty: {document.isDirty ? 'Yes' : 'No'}</p>
                      <p>Last saved: {document.lastSavedAt ? new Date(document.lastSavedAt).toLocaleString() : 'Not yet'}</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border/70 bg-card/40 p-4">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                      Paths
                    </p>
                    <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
                      <p className="break-all">Default folder: {defaultNotesPath || 'Loading...'}</p>
                      <p className="break-all">Current file: {document.filePath ?? 'No file yet'}</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border/70 bg-card/40 p-4">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                      Notes
                    </p>
                    <p className="mt-3 text-sm text-muted-foreground">
                      This phase only covers create, open, save, autosave, and recent-file behavior.
                    </p>
                  </div>
                </div>
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
