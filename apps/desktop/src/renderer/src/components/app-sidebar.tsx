import { Add01Icon, MoreHorizontalIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import appLogo from '../../../../resources/icon-light.png'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { useDocumentSession } from '@/hooks/use-document-session'

type AppSidebarProps = {
  isDarkMode: boolean
  onToggleTheme: () => void
  onGoHome: () => void
  onOpenSettings: () => void
  onNavigateToEditor: () => void
  onDeletedActiveNote?: () => void
}

export function AppSidebar({
  isDarkMode,
  onToggleTheme,
  onGoHome,
  onOpenSettings,
  onNavigateToEditor,
  onDeletedActiveNote
}: AppSidebarProps): React.JSX.Element {
  const {
    document,
    recentFiles,
    saveLabel,
    createNewNote,
    loadRecentFile,
    saveNow,
    saveAs,
    deleteNoteByPath
  } = useDocumentSession()

  return (
    <Sidebar collapsible="offcanvas" className="border-r border-sidebar-border bg-sidebar">
      <SidebarHeader className="gap-2 px-3 pb-2 pt-3">
        <Button
          type="button"
          onClick={onGoHome}
          variant="ghost"
          size="compact"
          className="h-8 w-full justify-start gap-2 px-3 text-foreground/80 hover:text-foreground"
        >
          <img
            src={appLogo}
            alt="H3 Ink logo"
            className="size-6 shrink-0 rounded-md object-cover"
          />
          <div className="min-w-0">
            <p className="text-2xs font-medium tracking-widest text-muted-foreground uppercase">
              H3 Ink
            </p>
            <p className="truncate text-sm text-foreground/80">{saveLabel}</p>
          </div>
        </Button>
      </SidebarHeader>

      <SidebarContent className="px-2 py-1.5">
        <SidebarGroup>
          <SidebarGroupContent>
            <Button
              type="button"
              onClick={async () => {
                const created = await createNewNote()
                if (created) {
                  onNavigateToEditor()
                }
              }}
              variant="ghost"
              size="compact"
              className="mb-2 w-full justify-start gap-1.5 px-3 text-foreground/80 hover:text-foreground"
            >
              <HugeiconsIcon icon={Add01Icon} className="size-4 shrink-0" strokeWidth={1.5} />
              <span>New Note</span>
            </Button>

            <p className="px-3 pt-3 text-2xs font-medium tracking-widest text-muted-foreground uppercase">
              Recent Files
            </p>
            <SidebarMenu className="mt-1.5 gap-0">
              {recentFiles.length === 0 ? (
                <SidebarMenuItem>
                  <div className="px-3 py-1.5 text-xs text-muted-foreground">
                    No saved notes yet.
                  </div>
                </SidebarMenuItem>
              ) : (
                recentFiles.map((note) => {
                  const isActive = document.filePath === note.path

                  return (
                    <SidebarMenuItem key={note.path}>
                      <DropdownMenu>
                        <SidebarMenuButton
                          isActive={isActive}
                          onClick={async () => {
                            const loaded = await loadRecentFile(note.path)
                            if (loaded) {
                              onNavigateToEditor()
                            }
                          }}
                          size="sm"
                          className="h-7 min-h-7 py-0 pr-8 font-normal text-muted-foreground data-[active=true]:font-medium"
                        >
                          <span className="truncate text-xs">{note.title}</span>
                        </SidebarMenuButton>

                        <SidebarMenuAction asChild>
                          <DropdownMenuTrigger
                            type="button"
                            aria-label={`Options for ${note.title}`}
                            className="top-1 h-5 w-5 [&>svg]:size-3.5"
                            onClick={(e) => e.stopPropagation()}
                            onPointerDown={(e) => e.stopPropagation()}
                          >
                            <HugeiconsIcon icon={MoreHorizontalIcon} strokeWidth={1.75} />
                          </DropdownMenuTrigger>
                        </SidebarMenuAction>

                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem
                            disabled={!isActive}
                            onSelect={() => {
                              void saveNow()
                            }}
                          >
                            Save
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            disabled={!isActive}
                            onSelect={() => {
                              void saveAs()
                            }}
                          >
                            Save As…
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            variant="destructive"
                            onSelect={() => {
                              void (async () => {
                                const wasActive = document.filePath === note.path
                                const ok = await deleteNoteByPath(note.path)
                                if (ok && wasActive) {
                                  onDeletedActiveNote?.()
                                }
                              })()
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </SidebarMenuItem>
                  )
                })
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="mt-auto px-2 pb-3 pt-2">
        <Button
          type="button"
          variant="ghost"
          size="compact"
          onClick={onOpenSettings}
          className="w-full justify-start px-3 text-foreground/80 hover:text-foreground"
        >
          Settings
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="compact"
          onClick={onToggleTheme}
          className="w-full justify-start px-3 text-foreground/80 hover:text-foreground"
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
