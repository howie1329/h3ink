import type { JSONContent } from '@tiptap/core'
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
  editorContent: JSONContent | null
  filePath: string | null
  title: string
  isDirty: boolean
  saveStatus: SaveStatus
  origin: DocumentOrigin
  lastSavedAt: string | null
  sessionKey: number
}

type EditorSnapshot = {
  markdown: string
  json: JSONContent
}

type UseDocumentSessionResult = {
  document: DocumentState
  recentFiles: H3RecentFile[]
  defaultNotesPath: string
  ready: boolean
  errorMessage: string | null
  saveLabel: string
  createNewNote: () => Promise<boolean>
  hydrateEditorState: (snapshot: EditorSnapshot) => void
  updateContent: (snapshot: EditorSnapshot) => void
  openFile: () => Promise<boolean>
  loadRecentFile: (path: string) => Promise<boolean>
  saveNow: () => Promise<void>
  saveAs: () => Promise<void>
  deleteCurrentNote: () => Promise<void>
}

const EMPTY_TITLE = 'Untitled'
const AUTOSAVE_DELAY_MS = 700
const UNTITLED_FILE_PREFIX = 'untitled'

function createEmptyDocument(): DocumentState {
  return {
    content: '',
    editorContent: null,
    filePath: null,
    title: EMPTY_TITLE,
    isDirty: false,
    saveStatus: 'idle',
    origin: 'draft',
    lastSavedAt: null,
    sessionKey: Date.now()
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

export function useDocumentSession(): UseDocumentSessionResult {
  const [document, setDocument] = useState<DocumentState>(createEmptyDocument)
  const [recentFiles, setRecentFiles] = useState<H3RecentFile[]>([])
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

  const applyDocument = useCallback(
    (nextDocument: H3MarkdownDocument): void => {
      setDocument({
        content: nextDocument.content,
        editorContent: null,
        filePath: nextDocument.path,
        title: nextDocument.title,
        isDirty: false,
        saveStatus: 'saved',
        origin: inferOrigin(nextDocument.path, defaultNotesPath),
        lastSavedAt: new Date().toISOString(),
        sessionKey: Date.now()
      })
      setErrorMessage(null)
    },
    [defaultNotesPath]
  )

  const loadRecentFile = useCallback(
    async (path: string): Promise<boolean> => {
      try {
        const result = await window.api.openRecentFile({ path })

        if (isMissingRecentFile(result)) {
          setErrorMessage('That recent file could not be found.')
          setDocument(createEmptyDocument())
          await window.api.setLastActiveFilePath({ path: null })
          await refreshRecents()
          return false
        }

        applyDocument(result)
        await refreshRecents()
        return true
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Could not open the file.')
        return false
      }
    },
    [applyDocument, refreshRecents]
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

        if (launchState.lastActiveFilePath) {
          await window.api.setLastActiveFilePath({ path: null })
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

  const persistWithSaveAs = useCallback(
    async (content: string, currentTitle: string, currentPath: string | null): Promise<boolean> => {
      const result = await window.api.saveMarkdownFileAs({
        content,
        suggestedName: deriveSuggestedTitle(content, currentTitle) || fileNameFromPath(currentPath)
      })

      if (!result) {
        setDocument((current) => ({ ...current, saveStatus: 'idle' }))
        return false
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
      return true
    },
    [defaultNotesPath, refreshRecents]
  )

  const saveDocument = useCallback(
    async (intent: SaveIntent): Promise<void> => {
      if (saveInFlightRef.current) {
        return
      }

      const contentToSave = contentRef.current
      if (contentToSave.trim().length === 0) {
        return
      }

      if (!document.filePath && intent === 'autosave') {
        return
      }

      saveInFlightRef.current = true
      setDocument((current) => ({ ...current, saveStatus: 'saving' }))
      setErrorMessage(null)

      try {
        if (!document.filePath) {
          await persistWithSaveAs(contentToSave, document.title, document.filePath)
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
          await refreshRecents()
        }
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
    [document.filePath, document.title, persistWithSaveAs, refreshRecents]
  )

  useEffect(() => {
    if (!ready || !document.isDirty || !document.filePath) {
      return
    }

    const timeout = window.setTimeout(() => {
      void saveDocument('autosave')
    }, AUTOSAVE_DELAY_MS)

    return () => window.clearTimeout(timeout)
  }, [document.content, document.filePath, document.isDirty, ready, saveDocument])

  const hydrateEditorState = useCallback((snapshot: EditorSnapshot): void => {
    setDocument((current) => ({
      ...current,
      content: snapshot.markdown,
      editorContent: snapshot.json,
      title: current.filePath
        ? current.title
        : deriveSuggestedTitle(snapshot.markdown, current.title)
    }))
  }, [])

  const updateContent = useCallback((snapshot: EditorSnapshot): void => {
    setDocument((current) => ({
      ...current,
      content: snapshot.markdown,
      editorContent: snapshot.json,
      title: current.filePath
        ? current.title
        : deriveSuggestedTitle(snapshot.markdown, current.title),
      isDirty: true,
      saveStatus: current.saveStatus === 'error' ? 'error' : 'idle'
    }))
  }, [])

  const createNewNote = useCallback(async (): Promise<boolean> => {
    setDocument(createEmptyDocument())
    setErrorMessage(null)
    await window.api.setLastActiveFilePath({ path: null })
    return true
  }, [])

  const openFile = useCallback(async (): Promise<boolean> => {
    try {
      const result = await window.api.openMarkdownFile()
      if (!result) {
        return false
      }

      applyDocument(result)
      await refreshRecents()
      return true
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Could not open the file.')
      return false
    }
  }, [applyDocument, refreshRecents])

  const saveNow = useCallback(async (): Promise<void> => {
    await saveDocument('manual')
  }, [saveDocument])

  const saveAs = useCallback(async (): Promise<void> => {
    try {
      const contentToSave = contentRef.current
      if (contentToSave.trim().length === 0) {
        return
      }

      setDocument((current) => ({ ...current, saveStatus: 'saving' }))
      await persistWithSaveAs(contentToSave, document.title, document.filePath)
    } catch (error) {
      setDocument((current) => ({ ...current, saveStatus: 'error' }))
      setErrorMessage(error instanceof Error ? error.message : 'Save As failed.')
    }
  }, [document.filePath, document.title, persistWithSaveAs])

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
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Delete failed.')
    }
  }, [document.filePath, refreshRecents])

  const saveLabel = useMemo(() => {
    if (!document.filePath) {
      return document.isDirty ? 'Unsaved draft' : 'Draft'
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
  }
}
