import appLogo from '../../../resources/icon-light.png'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger
} from '@/components/ui/sidebar'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from '@/components/ui/empty'

const notes = [
  { title: 'Welcome to H3 Ink', meta: 'Pinned', active: true },
  { title: 'Launch checklist', meta: 'Draft', active: false },
  { title: 'Markdown ideas', meta: 'Yesterday', active: false }
]

const recents = [
  { title: 'Release notes', meta: 'Last opened 2h ago' },
  { title: 'Writing cues', meta: 'Last opened yesterday' }
]

function App(): React.JSX.Element {
  return (
    <div className="dark min-h-[100dvh] bg-transparent text-foreground">
      <SidebarProvider defaultOpen>
        <div className="flex min-h-[100dvh] w-full bg-transparent">
          <Sidebar
            collapsible="offcanvas"
            className="border-r border-sidebar-border/70 bg-sidebar/95 backdrop-blur-xl"
          >
            <SidebarHeader className="gap-5 px-4 py-4">
              <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/4 px-3 py-3">
                <img src={appLogo} alt="H3 Ink logo" className="size-10 rounded-xl object-cover" />
                <div className="min-w-0">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/45">
                    H3 Ink
                  </p>
                  <h1 className="mt-1 text-sm font-medium tracking-[-0.02em] text-white/92">
                    Local-first notes
                  </h1>
                </div>
              </div>
              <p className="px-1 text-xs leading-5 text-white/44">
                A calm desktop home for markdown notes, recent context, and what comes next.
              </p>
            </SidebarHeader>

            <SidebarSeparator className="mx-4" />

            <SidebarContent className="px-2 py-3">
              <SidebarGroup>
                <SidebarGroupLabel className="px-3 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/42">
                  Notes
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="gap-1.5">
                    {notes.map((note) => (
                      <SidebarMenuItem key={note.title}>
                        <SidebarMenuButton
                          isActive={note.active}
                          className="h-auto rounded-2xl border border-transparent px-3 py-3 data-[active=true]:border-white/8 data-[active=true]:bg-white/7 hover:border-white/6 hover:bg-white/5"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium tracking-[-0.02em] text-white/92">
                              {note.title}
                            </p>
                            <p className="mt-1 truncate text-[0.68rem] uppercase tracking-[0.18em] text-white/40">
                              {note.meta}
                            </p>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup className="mt-4">
                <SidebarGroupLabel className="px-3 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/42">
                  Recent
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="gap-1">
                    {recents.map((note) => (
                      <SidebarMenuItem key={note.title}>
                        <SidebarMenuButton className="h-auto rounded-2xl px-3 py-2.5 hover:bg-white/5">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-white/78">
                              {note.title}
                            </p>
                            <p className="mt-1 truncate text-[0.7rem] text-white/38">{note.meta}</p>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="px-4 pb-4 pt-3">
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-3">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/38">
                  MVP shell
                </p>
                <p className="mt-2 text-xs leading-5 text-white/52">
                  The editor and live preview land next. This home screen keeps recent note context
                  close without turning into a library view.
                </p>
              </div>
            </SidebarFooter>
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
              <Empty className="max-w-3xl rounded-[2rem] border border-white/8 bg-white/[0.03] px-8 py-12 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] md:px-14 md:py-16">
                <EmptyMedia className="mb-4">
                  <div className="flex size-24 items-center justify-center rounded-[1.75rem] border border-white/10 bg-white/[0.045] shadow-[0_1px_0_rgba(255,255,255,0.04)_inset]">
                    <img src={appLogo} alt="H3 Ink mark" className="size-14 object-contain" />
                  </div>
                </EmptyMedia>
                <EmptyHeader className="gap-3">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-white/42">
                    Coming soon
                  </p>
                  <EmptyTitle className="text-3xl font-medium tracking-[-0.04em] text-white/94 md:text-4xl">
                    The writing surface starts here.
                  </EmptyTitle>
                  <EmptyDescription className="max-w-xl text-sm leading-7 text-white/54 md:text-[0.95rem]">
                    H3 Ink will open into a focused markdown workspace with a plain editor, live
                    preview, and recent files that stay close at hand.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent className="mt-5 max-w-2xl flex-row flex-wrap justify-center gap-3 text-[0.7rem] uppercase tracking-[0.18em] text-white/34">
                  <span className="rounded-full border border-white/8 px-3 py-1.5">
                    Plain .md files
                  </span>
                  <span className="rounded-full border border-white/8 px-3 py-1.5">
                    Live preview
                  </span>
                  <span className="rounded-full border border-white/8 px-3 py-1.5">
                    Recent notes
                  </span>
                </EmptyContent>
              </Empty>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default App
