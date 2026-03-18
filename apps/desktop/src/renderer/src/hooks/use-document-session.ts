import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type {
  H3MarkdownDocument,
  H3MissingRecentFile,
  H3RecentFile
} from '../../../shared/file-gateway'

type SaveIntent = 'manual' | 'autosave'
type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'
type DocumentOrigin = 'draft' | 'desktop' | 'external'

type DocumentState = {
  content: string
  filePath: string | null
  title: string
  isDirty: boolean
  saveStatus: SaveStatus
  origin: DocumentOrigin
  lastSavedAt: string | null
}

const EMPTY_TITLE = 'Untitled'
const AUTOSAVE_DELAY_MS = 700
const UNTITLED_FILE_PREFIX = 'untitled'

function createEmptyDocument(): DocumentState {
  return {
    content: '',
    filePath: null,
    title: EMPTY_TITLE,
    isDirty: false,
    saveStatus: 'idle',
    origin: 'draft',
    lastSavedAt: null
  }
}

function inferOrigin(filePath: string, defaultNotesPath: string): DocumentOrigin {
  return filePath.startsWith(defaultNotesPath) ? 'desktop' : 'external'
}

function deriveSuggestedTitle(content: string, currentTitle: string): string {
  const lines = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  const heading = lines.find((line) => line.startsWith('#'))
  if (heading) {
    return heading.replace(/^#+\s*/, '').trim() || currentTitle || EMPTY_TITLE
  }

  if (lines[0]) {
    return lines[0]
  }

  return currentTitle || EMPTY_TITLE
}

function fileNameFromPath(path: string | null): string {
  if (!path) {
    return UNTITLED_FILE_PREFIX
  }

  const segments = path.split(/[\\/]/)
  const fileName = segments[segments.length - 1] || UNTITLED_FILE_PREFIX
  return fileName.replace(/\.md$/i, '') || UNTITLED_FILE_PREFIX
}

function isMissingRecentFile(
  result: H3MarkdownDocument | H3MissingRecentFile
): result is H3MissingRecentFile {
  return 'missing' in result
}

export function useDocumentSession() {
  const [document, setDocument] = useState<DocumentState>(createEmptyDocument)
  const [recentFiles, setRecentFiles] = useState<H3RecentFile[]>([])
  const [desktopNotes, setDesktopNotes] = useState<H3RecentFile[]>([])
  const [defaultNotesPath, setDefaultNotesPath] = useState('')
  const [ready, setReady] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const saveInFlightRef = useRef(false)
  const contentRef = useRef(document.content)

  useEffect(() => {
    contentRef.current = document.content
  }, [document.content])

  const refreshRecents = useCallback(async (): Promise<void> => {
    const files = await window.api.listRecentFiles()
    setRecentFiles(files)
  }, [])

  const refreshDesktopNotes = useCallback(async (): Promise<void> => {
    const files = await window.api.listDesktopNotes()
    setDesktopNotes(files)
  }, [])

  const applyDocument = useCallback(
    (nextDocument: H3MarkdownDocument): void => {
      setDocument({
        content: nextDocument.content,
        filePath: nextDocument.path,
        title: nextDocument.title,
        isDirty: false,
        saveStatus: 'saved',
        origin: inferOrigin(nextDocument.path, defaultNotesPath),
        lastSavedAt: new Date().toISOString()
      })
      setErrorMessage(null)
    },
    [defaultNotesPath]
  )

  const loadRecentFile = useCallback(
    async (path: string): Promise<void> => {
      try {
        const result = await window.api.openRecentFile({ path })

        if (isMissingRecentFile(result)) {
          setErrorMessage('That recent file could not be found.')
          setDocument(createEmptyDocument())
          await window.api.setLastActiveFilePath({ path: null })
          await refreshRecents()
          await refreshDesktopNotes()
          return
        }

        const document = result
        applyDocument(document)
        await refreshRecents()
        await refreshDesktopNotes()
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Could not open the file.')
      }
    },
    [applyDocument, refreshDesktopNotes, refreshRecents]
  )

  useEffect(() => {
    let cancelled = false

    const load = async (): Promise<void> => {
      try {
        const launchState = await window.api.getLaunchState()
        if (cancelled) {
          return
        }

        setDefaultNotesPath(launchState.defaultNotesPath)
        setRecentFiles(launchState.recentFiles)
        setDesktopNotes(await window.api.listDesktopNotes())

        if (launchState.lastActiveFilePath) {
          const result = await window.api.openRecentFile({ path: launchState.lastActiveFilePath })
          if (cancelled) {
            return
          }

          if (isMissingRecentFile(result)) {
            await window.api.setLastActiveFilePath({ path: null })
            setDocument(createEmptyDocument())
            setErrorMessage('Your last active file is missing. Starting with an empty draft.')
            setRecentFiles(await window.api.listRecentFiles())
            setDesktopNotes(await window.api.listDesktopNotes())
          } else {
            const document = result
            setDocument({
              content: document.content,
              filePath: document.path,
              title: document.title,
              isDirty: false,
              saveStatus: 'saved',
              origin: inferOrigin(document.path, launchState.defaultNotesPath),
              lastSavedAt: new Date().toISOString()
            })
          }
        }
      } catch (error) {
        if (!cancelled) {
          setErrorMessage(error instanceof Error ? error.message : 'Could not load H3 Ink.')
        }
      } finally {
        if (!cancelled) {
          setReady(true)
        }
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!ready || !document.filePath) {
      return
    }

    void window.api.setLastActiveFilePath({ path: document.filePath })
  }, [document.filePath, ready])

  const saveDocument = useCallback(
    async (intent: SaveIntent): Promise<void> => {
      if (saveInFlightRef.current) {
        return
      }

      const contentToSave = contentRef.current
      const hasPath = Boolean(document.filePath)
      const hasMeaningfulDraftContent = contentToSave.trim().length > 0

      if (!hasPath && !hasMeaningfulDraftContent) {
        return
      }

      saveInFlightRef.current = true
      setDocument((current) => ({ ...current, saveStatus: 'saving' }))
      setErrorMessage(null)

      try {
        if (!document.filePath) {
          const created = await window.api.createDesktopNote({
            content: contentToSave,
            suggestedTitle: deriveSuggestedTitle(contentToSave, document.title)
          })

          setDocument((current) => ({
            ...current,
            filePath: created.path,
            title: created.title,
            origin: inferOrigin(created.path, defaultNotesPath),
            isDirty: current.content !== contentToSave,
            saveStatus: 'saved',
            lastSavedAt: new Date().toISOString()
          }))
        } else {
          const saved = await window.api.saveMarkdownFile({
            path: document.filePath,
            content: contentToSave
          })

          setDocument((current) => ({
            ...current,
            isDirty: current.content !== contentToSave,
            saveStatus: 'saved',
            lastSavedAt: saved.savedAt
          }))
        }

        await refreshRecents()
        await refreshDesktopNotes()
      } catch (error) {
        setDocument((current) => ({ ...current, saveStatus: 'error' }))
        setErrorMessage(
          intent === 'autosave'
            ? 'Autosave failed. Your draft is still in memory.'
            : error instanceof Error
              ? error.message
              : 'Save failed.'
        )
      } finally {
        saveInFlightRef.current = false
      }
    },
    [defaultNotesPath, document.filePath, document.title, refreshDesktopNotes, refreshRecents]
  )

  useEffect(() => {
    if (!ready || !document.isDirty) {
      return
    }

    if (!document.filePath && document.content.trim().length === 0) {
      return
    }

    const timeout = window.setTimeout(() => {
      void saveDocument('autosave')
    }, AUTOSAVE_DELAY_MS)

    return () => window.clearTimeout(timeout)
  }, [document.content, document.filePath, document.isDirty, ready, saveDocument])

  const updateContent = useCallback((content: string): void => {
    setDocument((current) => ({
      ...current,
      content,
      title: current.filePath ? current.title : deriveSuggestedTitle(content, current.title),
      isDirty: true,
      saveStatus: current.saveStatus === 'error' ? 'error' : 'idle'
    }))
  }, [])

  const createNewNote = useCallback(async (): Promise<void> => {
    setDocument(createEmptyDocument())
    setErrorMessage(null)
    await window.api.setLastActiveFilePath({ path: null })
  }, [])

  const openFile = useCallback(async (): Promise<void> => {
    try {
      const result = await window.api.openMarkdownFile()
      if (!result) {
        return
      }

      applyDocument(result)
      await refreshRecents()
      await refreshDesktopNotes()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Could not open the file.')
    }
  }, [applyDocument, refreshDesktopNotes, refreshRecents])

  const saveNow = useCallback(async (): Promise<void> => {
    await saveDocument('manual')
  }, [saveDocument])

  const saveAs = useCallback(async (): Promise<void> => {
    try {
      const result = await window.api.saveMarkdownFileAs({
        content: contentRef.current,
        suggestedName:
          deriveSuggestedTitle(contentRef.current, document.title) || fileNameFromPath(document.filePath)
      })

      if (!result) {
        return
      }

      setDocument((current) => ({
        ...current,
        filePath: result.path,
        title: result.title,
        isDirty: false,
        saveStatus: 'saved',
        origin: inferOrigin(result.path, defaultNotesPath),
        lastSavedAt: result.savedAt
      }))
      setErrorMessage(null)
      await refreshRecents()
      await refreshDesktopNotes()
    } catch (error) {
      setDocument((current) => ({ ...current, saveStatus: 'error' }))
      setErrorMessage(error instanceof Error ? error.message : 'Save As failed.')
    }
  }, [defaultNotesPath, document.filePath, document.title, refreshDesktopNotes, refreshRecents])

  const deleteCurrentNote = useCallback(async (): Promise<void> => {
    if (!document.filePath) {
      return
    }

    const confirmed = window.confirm(`Delete this note?\n\n${document.filePath}`)
    if (!confirmed) {
      return
    }

    try {
      await window.api.deleteMarkdownFile({ path: document.filePath })
      setDocument(createEmptyDocument())
      setErrorMessage(null)
      await window.api.setLastActiveFilePath({ path: null })
      await refreshRecents()
      await refreshDesktopNotes()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Delete failed.')
    }
  }, [document.filePath, refreshDesktopNotes, refreshRecents])

  const saveLabel = useMemo(() => {
    if (!document.filePath) {
      return 'Draft'
    }

    if (document.saveStatus === 'saving') {
      return 'Saving'
    }

    if (document.saveStatus === 'error') {
      return 'Save failed'
    }

    if (document.isDirty) {
      return 'Unsaved changes'
    }

    return 'Saved'
  }, [document.filePath, document.isDirty, document.saveStatus])

  return {
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
    saveAs,
    deleteCurrentNote
  }
}
