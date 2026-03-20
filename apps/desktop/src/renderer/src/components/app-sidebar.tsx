import { Add01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import appLogo from '../../../../resources/icon-light.png'
import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
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
}

export function AppSidebar({
  isDarkMode,
  onToggleTheme,
  onGoHome,
  onOpenSettings,
  onNavigateToEditor
}: AppSidebarProps): React.JSX.Element {
  const { document, recentFiles, saveLabel, createNewNote, loadRecentFile } = useDocumentSession()

  return (
    <Sidebar
      collapsible="offcanvas"
      className="border-r border-sidebar-border bg-sidebar"
    >
      <SidebarHeader className="gap-2 px-3 pb-2 pt-3">
        <Button
          type="button"
          onClick={onGoHome}
          variant="ghost"
          size="compact"
          className="h-8 w-full justify-start gap-2 px-3 text-foreground/80 hover:text-foreground"
        >
          <img src={appLogo} alt="H3 Ink logo" className="size-6 shrink-0 rounded-md object-cover" />
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
            <SidebarMenu className="mt-2 gap-0">
              {recentFiles.length === 0 ? (
                <SidebarMenuItem>
                  <div className="px-3 py-2 text-sm text-muted-foreground">No saved notes yet.</div>
                </SidebarMenuItem>
              ) : (
                recentFiles.map((note) => (
                  <SidebarMenuItem key={note.path}>
                    <SidebarMenuButton
                      isActive={document.filePath === note.path}
                      onClick={async () => {
                        const loaded = await loadRecentFile(note.path)
                        if (loaded) {
                          onNavigateToEditor()
                        }
                      }}
                      size="compact"
                      className="h-auto min-h-8 items-start py-2 font-normal text-muted-foreground data-[active=true]:font-medium"
                    >
                      <div className="min-w-0">
                        <div className="truncate text-sm">{note.title}</div>
                        <div className="truncate text-xs text-muted-foreground">{note.path}</div>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
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
