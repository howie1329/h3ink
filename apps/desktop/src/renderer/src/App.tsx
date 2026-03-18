import {
  ArrowDown01Icon,
  ArrowRight01Icon,
  Moon02Icon,
  Sun03Icon
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useState } from 'react'
import appLogo from '../../../resources/icon-light.png'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
import { cn } from '@/lib/utils'

const pinnedNotes = ['Welcome to H3 Ink']

const recentNotes = ['Launch checklist', 'Markdown ideas', 'Release notes', 'Writing cues']

function SectionToggle({
  title,
  open,
  onToggle,
  isDark
}: {
  title: string
  open: boolean
  onToggle: () => void
  isDark: boolean
}): React.JSX.Element {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        'flex w-full items-center gap-2 px-3 py-2 text-left text-[0.72rem] font-semibold uppercase tracking-[0.2em] transition-colors',
        isDark ? 'text-white/42 hover:text-white/62' : 'text-black/38 hover:text-black/58'
      )}
    >
      <HugeiconsIcon
        icon={open ? ArrowDown01Icon : ArrowRight01Icon}
        className="size-3.5 shrink-0"
        strokeWidth={2}
      />
      <span>{title}</span>
    </button>
  )
}

function App(): React.JSX.Element {
  const [isDark, setIsDark] = useState(true)
  const [pinnedOpen, setPinnedOpen] = useState(true)
  const [recentOpen, setRecentOpen] = useState(true)

  return (
    <div className={cn('min-h-[100dvh] bg-transparent text-foreground', isDark && 'dark')}>
      <SidebarProvider defaultOpen>
        <div className="flex min-h-[100dvh] w-full bg-transparent">
          <Sidebar
            collapsible="offcanvas"
            className="border-r border-sidebar-border/70 bg-sidebar/95 backdrop-blur-xl"
          >
            <SidebarHeader className="gap-3 px-4 pb-3 pt-4">
              <button
                type="button"
                className="flex h-10 w-full items-center gap-2.5 rounded-lg px-2.5 text-left transition-colors hover:bg-accent/50"
              >
                <img src={appLogo} alt="H3 Ink logo" className="size-7 rounded-lg object-cover" />
                <div className="min-w-0">
                  <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    H3 Ink
                  </p>
                  <p className="mt-0.5 text-[0.92rem] text-foreground/80">Notes</p>
                </div>
              </button>
            </SidebarHeader>

            <SidebarContent className="px-2 py-2">
              <SidebarGroup>
                <SidebarGroupContent>
                  <SectionToggle
                    title="Pinned"
                    open={pinnedOpen}
                    isDark={isDark}
                    onToggle={() => setPinnedOpen((current) => !current)}
                  />
                  {pinnedOpen ? (
                    <SidebarMenu className="mt-1 gap-0.5">
                      {pinnedNotes.map((note) => (
                        <SidebarMenuItem key={note}>
                          <SidebarMenuButton
                            isActive={note === 'Welcome to H3 Ink'}
                            className="h-8 rounded-lg px-5 text-sm font-normal text-foreground/78 hover:bg-accent/50 hover:text-foreground data-[active=true]:bg-accent data-[active=true]:text-foreground"
                          >
                            <span className="truncate">{note}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  ) : null}

                  <div className="mt-4">
                    <SectionToggle
                      title="Recent"
                      open={recentOpen}
                      isDark={isDark}
                      onToggle={() => setRecentOpen((current) => !current)}
                    />
                    {recentOpen ? (
                      <SidebarMenu className="mt-1 gap-0.5">
                        {recentNotes.map((note) => (
                          <SidebarMenuItem key={note}>
                            <SidebarMenuButton className="h-8 rounded-lg px-5 text-sm font-normal text-muted-foreground hover:bg-accent/50 hover:text-foreground">
                              <span className="truncate">{note}</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    ) : null}
                  </div>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="mt-auto px-4 pb-4 pt-2">
              <button
                type="button"
                onClick={() => setIsDark((current) => !current)}
                className="flex h-9 w-full items-center gap-3 rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"
              >
                <HugeiconsIcon
                  icon={isDark ? Sun03Icon : Moon02Icon}
                  className="size-4 shrink-0"
                  strokeWidth={1.8}
                />
                <span>{isDark ? 'Light mode' : 'Dark mode'}</span>
              </button>
            </SidebarFooter>
          </Sidebar>

          <SidebarInset className="bg-background/70">
            <header className="flex items-center justify-between border-b border-border/70 px-4 py-3 md:px-6">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Desktop app
                </p>
                <p className="mt-1 text-sm text-foreground/72">Landing shell</p>
              </div>
              <SidebarTrigger className="text-foreground/78 md:hidden" />
            </header>

            <div className="flex flex-1 items-center justify-center px-6 py-10">
              <div className="flex flex-col items-center justify-center gap-5 text-center">
                <div className="flex size-18 items-center justify-center rounded-2xl border border-border bg-card/40">
                  <img src={appLogo} alt="H3 Ink mark" className="size-10 object-contain" />
                </div>
                <div className="space-y-2">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    Coming soon
                  </p>
                  <h2 className="text-2xl font-medium tracking-[-0.04em] text-foreground/88 md:text-3xl">
                    Writing surface
                  </h2>
                </div>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default App
