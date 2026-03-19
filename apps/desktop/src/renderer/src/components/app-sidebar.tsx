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
import type { H3RecentFile } from '../../../shared/file-gateway'

type AppSidebarProps = {
  activeFilePath: string | null
  isDarkMode: boolean
  recentFiles: H3RecentFile[]
  saveLabel: string
  onCreateNote: () => void
  onGoHome: () => void
  onOpenSettings: () => void
  onSelectRecent: (path: string) => void
  onToggleTheme: () => void
}

export function AppSidebar({
  activeFilePath,
  isDarkMode,
  recentFiles,
  saveLabel,
  onCreateNote,
  onGoHome,
  onOpenSettings,
  onSelectRecent,
  onToggleTheme
}: AppSidebarProps): React.JSX.Element {
  return (
    <Sidebar
      collapsible="offcanvas"
      className="border-r border-sidebar-border/70 bg-sidebar/95 backdrop-blur-xl"
    >
      <SidebarHeader className="gap-2 px-3 pb-2 pt-3">
        <Button
          type="button"
          onClick={onGoHome}
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
              onClick={onCreateNote}
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
                  <div className="px-3 py-2 text-sm text-muted-foreground">No saved notes yet.</div>
                </SidebarMenuItem>
              ) : (
                recentFiles.map((note) => (
                  <SidebarMenuItem key={note.path}>
                    <SidebarMenuButton
                      isActive={activeFilePath === note.path}
                      onClick={() => onSelectRecent(note.path)}
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

      <SidebarFooter className="mt-auto px-2 pb-3 pt-2">
        <Button
          type="button"
          variant="ghost"
          size="compact"
          onClick={onOpenSettings}
          className="w-full justify-start px-3 text-foreground/76 hover:text-foreground"
        >
          Settings
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="compact"
          onClick={onToggleTheme}
          className="w-full justify-start px-3 text-foreground/76 hover:text-foreground"
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
