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
    <div
      className={cn(
        'min-h-[100dvh] bg-transparent',
        isDark ? 'dark text-foreground' : 'text-[#2f3438]'
      )}
    >
      <SidebarProvider defaultOpen>
        <div className="flex min-h-[100dvh] w-full bg-transparent">
          <Sidebar
            collapsible="offcanvas"
            className={cn(
              'backdrop-blur-xl',
              isDark
                ? 'border-r border-sidebar-border/70 bg-sidebar/95'
                : 'border-r border-black/8 bg-[#f5f2ec]'
            )}
          >
            <SidebarHeader className="gap-3 px-5 pb-4 pt-5">
              <div className="flex items-center gap-3">
                <img src={appLogo} alt="H3 Ink logo" className="size-9 rounded-xl object-cover" />
                <div className="min-w-0">
                  <p
                    className={cn(
                      'text-[0.7rem] font-semibold uppercase tracking-[0.24em]',
                      isDark ? 'text-white/45' : 'text-black/40'
                    )}
                  >
                    H3 Ink
                  </p>
                  <p className={cn('mt-1 text-sm', isDark ? 'text-white/72' : 'text-black/66')}>
                    Notes
                  </p>
                </div>
              </div>
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
                            className={cn(
                              'h-9 rounded-lg px-6 text-sm font-normal',
                              isDark
                                ? 'text-white/72 hover:bg-white/[0.04] hover:text-white/92 data-[active=true]:bg-white/[0.05] data-[active=true]:text-white/96'
                                : 'text-black/68 hover:bg-black/[0.04] hover:text-black/86 data-[active=true]:bg-black/[0.05] data-[active=true]:text-black/92'
                            )}
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
                            <SidebarMenuButton
                              className={cn(
                                'h-9 rounded-lg px-6 text-sm font-normal',
                                isDark
                                  ? 'text-white/64 hover:bg-white/[0.04] hover:text-white/88'
                                  : 'text-black/58 hover:bg-black/[0.04] hover:text-black/82'
                              )}
                            >
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
                className={cn(
                  'flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm transition-colors',
                  isDark
                    ? 'text-white/68 hover:bg-white/[0.04] hover:text-white/90'
                    : 'text-black/64 hover:bg-black/[0.04] hover:text-black/86'
                )}
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

          <SidebarInset className={cn(isDark ? 'bg-transparent' : 'bg-[#fbf9f5]')}>
            <header
              className={cn(
                'flex items-center justify-between px-4 py-3 md:px-6',
                isDark ? 'border-b border-white/8' : 'border-b border-black/7'
              )}
            >
              <div>
                <p
                  className={cn(
                    'text-[0.68rem] font-semibold uppercase tracking-[0.22em]',
                    isDark ? 'text-white/38' : 'text-black/32'
                  )}
                >
                  Desktop app
                </p>
                <p className={cn('mt-1 text-sm', isDark ? 'text-white/62' : 'text-black/56')}>
                  Landing shell
                </p>
              </div>
              <SidebarTrigger
                className={cn(isDark ? 'text-white/78' : 'text-black/68', 'md:hidden')}
              />
            </header>

            <div className="flex flex-1 items-center justify-center px-6 py-10">
              <div className="flex flex-col items-center justify-center gap-5 text-center">
                <div
                  className={cn(
                    'flex size-18 items-center justify-center rounded-2xl',
                    isDark
                      ? 'border border-white/8 bg-white/[0.03]'
                      : 'border border-black/8 bg-black/[0.03]'
                  )}
                >
                  <img src={appLogo} alt="H3 Ink mark" className="size-10 object-contain" />
                </div>
                <div className="space-y-2">
                  <p
                    className={cn(
                      'text-[0.68rem] font-semibold uppercase tracking-[0.24em]',
                      isDark ? 'text-white/36' : 'text-black/34'
                    )}
                  >
                    Coming soon
                  </p>
                  <h2
                    className={cn(
                      'text-2xl font-medium tracking-[-0.04em] md:text-3xl',
                      isDark ? 'text-white/88' : 'text-black/84'
                    )}
                  >
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
