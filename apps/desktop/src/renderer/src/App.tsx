import { AppSidebar } from '@/components/app-sidebar'
import { EditorWorkspace } from '@/components/editor-workspace'
import { HomeWorkspace } from '@/components/home-workspace'
import { SettingsWorkspace } from '@/components/settings-workspace'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { DocumentSessionProvider, useDocumentSession } from '@/hooks/use-document-session'
import { useState } from 'react'

type AppScreen = 'home' | 'editor' | 'settings'

function AppShell(): React.JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [screen, setScreen] = useState<AppScreen>('home')
  const { errorMessage, createNewNote, openFile } = useDocumentSession()

  async function handleCreateNewNote(): Promise<void> {
    const created = await createNewNote()
    if (created) {
      setScreen('editor')
    }
  }

  async function handleOpenFile(): Promise<void> {
    const opened = await openFile()
    if (opened) {
      setScreen('editor')
    }
  }

  function renderScreen(): React.JSX.Element {
    if (screen === 'settings') {
      return <SettingsWorkspace onBack={() => setScreen('home')} />
    }

    if (screen === 'home') {
      return (
        <div className="flex h-full flex-1 flex-col px-4 py-4 md:px-6">
          <HomeWorkspace
            onCreateNote={() => void handleCreateNewNote()}
            onOpenFile={() => void handleOpenFile()}
          />
          {errorMessage ? (
            <div className="mt-3 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {errorMessage}
            </div>
          ) : null}
        </div>
      )
    }

    return <EditorWorkspace onNavigateHome={() => setScreen('home')} />
  }

  return (
    <div className={`min-h-[100dvh] bg-background text-foreground ${isDarkMode ? 'dark' : ''}`}>
      <SidebarProvider defaultOpen>
        <div className="flex min-h-[100dvh] w-full bg-background">
          <AppSidebar
            isDarkMode={isDarkMode}
            onGoHome={() => setScreen('home')}
            onNavigateToEditor={() => setScreen('editor')}
            onOpenSettings={() => setScreen('settings')}
            onToggleTheme={() => setIsDarkMode((current) => !current)}
          />

          <SidebarInset className="bg-background">{renderScreen()}</SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}

function App(): React.JSX.Element {
  return (
    <DocumentSessionProvider>
      <AppShell />
    </DocumentSessionProvider>
  )
}

export default App
