import { ArrowDown01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useState } from 'react'
import appLogo from '../../../resources/icon-light.png'
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

const pinnedNotes = ['Welcome to H3 Ink']

const recentNotes = ['Launch checklist', 'Markdown ideas', 'Release notes', 'Writing cues']

function SectionToggle({
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
      className="flex w-full items-center gap-2 px-3 py-2 text-left text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white/42 transition-colors hover:text-white/62"
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
  const [pinnedOpen, setPinnedOpen] = useState(true)
  const [recentOpen, setRecentOpen] = useState(true)

  return (
    <div className="dark min-h-[100dvh] bg-transparent text-foreground">
      <SidebarProvider defaultOpen>
        <div className="flex min-h-[100dvh] w-full bg-transparent">
          <Sidebar
            collapsible="offcanvas"
            className="border-r border-sidebar-border/70 bg-sidebar/95 backdrop-blur-xl"
          >
            <SidebarHeader className="gap-3 px-5 pb-4 pt-5">
              <div className="flex items-center gap-3">
                <img src={appLogo} alt="H3 Ink logo" className="size-9 rounded-xl object-cover" />
                <div className="min-w-0">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-white/45">
                    H3 Ink
                  </p>
                  <p className="mt-1 text-sm text-white/72">Notes</p>
                </div>
              </div>
            </SidebarHeader>

            <SidebarContent className="px-2 py-2">
              <SidebarGroup>
                <SidebarGroupContent>
                  <SectionToggle
                    title="Pinned"
                    open={pinnedOpen}
                    onToggle={() => setPinnedOpen((current) => !current)}
                  />
                  {pinnedOpen ? (
                    <SidebarMenu className="mt-1 gap-0.5">
                      {pinnedNotes.map((note) => (
                        <SidebarMenuItem key={note}>
                          <SidebarMenuButton
                            isActive={note === 'Welcome to H3 Ink'}
                            className="h-9 rounded-lg px-6 text-sm font-normal text-white/72 hover:bg-white/[0.04] hover:text-white/92 data-[active=true]:bg-white/[0.05] data-[active=true]:text-white/96"
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
                      onToggle={() => setRecentOpen((current) => !current)}
                    />
                    {recentOpen ? (
                      <SidebarMenu className="mt-1 gap-0.5">
                        {recentNotes.map((note) => (
                          <SidebarMenuItem key={note}>
                            <SidebarMenuButton className="h-9 rounded-lg px-6 text-sm font-normal text-white/64 hover:bg-white/[0.04] hover:text-white/88">
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
          </Sidebar>

          <SidebarInset className="bg-transparent">
            <header className="flex items-center justify-between border-b border-white/8 px-4 py-3 md:px-6">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/38">
                  Desktop app
                </p>
                <p className="mt-1 text-sm text-white/62">Landing shell</p>
              </div>
              <SidebarTrigger className="text-white/78 md:hidden" />
            </header>

            <div className="flex flex-1 items-center justify-center px-6 py-10">
              <div className="flex flex-col items-center justify-center gap-5 text-center">
                <div className="flex size-18 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.03]">
                  <img src={appLogo} alt="H3 Ink mark" className="size-10 object-contain" />
                </div>
                <div className="space-y-2">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/36">
                    Coming soon
                  </p>
                  <h2 className="text-2xl font-medium tracking-[-0.04em] text-white/88 md:text-3xl">
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
