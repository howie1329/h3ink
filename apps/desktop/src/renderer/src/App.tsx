import { AppSidebar } from '@/components/app-sidebar'
import { EditorWorkspace } from '@/components/editor-workspace'
import { HomeWorkspace } from '@/components/home-workspace'
import { SettingsWorkspace } from '@/components/settings-workspace'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { useDocumentSession } from '@/hooks/use-document-session'
import { useCallback, useState } from 'react'

type AppScreen = 'home' | 'editor' | 'settings'

function App(): React.JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [screen, setScreen] = useState<AppScreen>('home')
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

  const showEditor = useCallback(() => {
    setScreen('editor')
  }, [])

  const showHome = useCallback(() => {
    setScreen('home')
  }, [])

  const showSettings = useCallback(() => {
    setScreen('settings')
  }, [])

  async function handleCreateNewNote(): Promise<void> {
    const created = await createNewNote()
    if (created) {
      showEditor()
    }
  }

  async function handleOpenFile(): Promise<void> {
    const opened = await openFile()
    if (opened) {
      showEditor()
    }
  }

  async function handleLoadRecentFile(path: string): Promise<void> {
    const loaded = await loadRecentFile(path)
    if (loaded) {
      showEditor()
    }
  }

  async function handleDeleteCurrentNote(): Promise<void> {
    const deleted = await deleteCurrentNote()
    if (deleted) {
      showHome()
    }
  }

  function renderScreen(): React.JSX.Element {
    if (screen === 'settings') {
      return <SettingsWorkspace onBack={showHome} />
    }

    if (screen === 'home') {
      return (
        <div className="flex h-full flex-1 flex-col px-4 py-4 md:px-6">
          <HomeWorkspace
            onCreateNote={() => void handleCreateNewNote()}
            onOpenFile={() => void handleOpenFile()}
          />
          {errorMessage ? (
            <div className="mt-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {errorMessage}
            </div>
          ) : null}
        </div>
      )
    }

    return (
      <EditorWorkspace
        defaultNotesPath={defaultNotesPath}
        document={document}
        errorMessage={errorMessage}
        ready={ready}
        saveLabel={saveLabel}
        onDelete={() => void handleDeleteCurrentNote()}
        onHydrate={hydrateEditorState}
        onOpenFile={() => void handleOpenFile()}
        onSave={() => void saveNow()}
        onSaveAs={() => void saveAs()}
        onUpdate={updateContent}
      />
    )
  }

  return (
    <div className={`min-h-[100dvh] bg-transparent text-foreground ${isDarkMode ? 'dark' : ''}`}>
      <SidebarProvider defaultOpen>
        <div className="flex min-h-[100dvh] w-full bg-transparent">
          <AppSidebar
            activeFilePath={document.filePath}
            isDarkMode={isDarkMode}
            recentFiles={recentFiles}
            saveLabel={saveLabel}
            onCreateNote={() => void handleCreateNewNote()}
            onGoHome={showHome}
            onOpenSettings={showSettings}
            onSelectRecent={(path) => void handleLoadRecentFile(path)}
            onToggleTheme={() => setIsDarkMode((current) => !current)}
          />

          <SidebarInset className="bg-background/70">{renderScreen()}</SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default App
