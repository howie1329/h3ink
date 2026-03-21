import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode
} from 'react'
import type {
  H3MarkdownDocument,
  H3MissingRecentFile,
  H3RecentFile
} from '../../../shared/file-gateway'
import {
  AUTOSAVE_DELAY_MS,
  createEmptyDocument,
  createLoadedDocument,
  deriveSuggestedTitle,
  fileNameFromPath,
  getSaveLabel,
  inferOrigin,
  type DocumentState
} from '@/lib/document-session'

type SaveIntent = 'manual' | 'autosave'

type SessionState = {
  document: DocumentState
  recentFiles: H3RecentFile[]
  defaultNotesPath: string
  ready: boolean
  errorMessage: string | null
}

type SessionAction =
  | { type: 'launchLoaded'; defaultNotesPath: string; recentFiles: H3RecentFile[] }
  | { type: 'setReady' }
  | { type: 'setRecentFiles'; recentFiles: H3RecentFile[] }
  | { type: 'loadDocument'; document: H3MarkdownDocument; defaultNotesPath: string }
  | { type: 'resetDraft' }
  | { type: 'hydrateEditor'; markdown: string }
  | { type: 'updateContent'; markdown: string }
  | { type: 'markSaving' }
  | { type: 'cancelSaving' }
  | { type: 'markSaved'; savedAt: string; savedContent: string }
  | {
      type: 'saveAsSucceeded'
      path: string
      title: string
      savedAt: string
      savedContent: string
      defaultNotesPath: string
    }
  | { type: 'setError'; message: string | null }
  | { type: 'markError'; message: string }

export type UseDocumentSessionResult = {
  document: DocumentState
  recentFiles: H3RecentFile[]
  defaultNotesPath: string
  ready: boolean
  errorMessage: string | null
  saveLabel: string
  createNewNote: () => Promise<boolean>
  hydrateEditorState: (markdown: string) => void
  updateContent: (markdown: string) => void
  openFile: () => Promise<boolean>
  loadRecentFile: (path: string) => Promise<boolean>
  saveNow: () => Promise<void>
  saveAs: () => Promise<void>
  deleteCurrentNote: () => Promise<boolean>
  deleteNoteByPath: (path: string) => Promise<boolean>
}

const DocumentSessionContext = createContext<UseDocumentSessionResult | null>(null)

export function DocumentSessionProvider({ children }: { children: ReactNode }): React.JSX.Element {
  const value = useDocumentSessionState()
  return createElement(DocumentSessionContext.Provider, { value }, children)
}

export function useDocumentSession(): UseDocumentSessionResult {
  const value = useContext(DocumentSessionContext)
  if (!value) {
    throw new Error('useDocumentSession must be used within a DocumentSessionProvider')
  }
  return value
}

const initialState: SessionState = {
  document: createEmptyDocument(),
  recentFiles: [],
  defaultNotesPath: '',
  ready: false,
  errorMessage: null
}

function isMissingRecentFile(
  result: H3MarkdownDocument | H3MissingRecentFile
): result is H3MissingRecentFile {
  return 'missing' in result
}

function sessionReducer(state: SessionState, action: SessionAction): SessionState {
  switch (action.type) {
    case 'launchLoaded':
      return {
        ...state,
        defaultNotesPath: action.defaultNotesPath,
        recentFiles: action.recentFiles
      }
    case 'setReady':
      return {
        ...state,
        ready: true
      }
    case 'setRecentFiles':
      return {
        ...state,
        recentFiles: action.recentFiles
      }
    case 'loadDocument':
      return {
        ...state,
        document: createLoadedDocument(action.document, action.defaultNotesPath),
        errorMessage: null
      }
    case 'resetDraft':
      return {
        ...state,
        document: createEmptyDocument(),
        errorMessage: null
      }
    case 'hydrateEditor':
      return {
        ...state,
        document: {
          ...state.document,
          content: action.markdown,
          title: state.document.filePath
            ? state.document.title
            : deriveSuggestedTitle(action.markdown, state.document.title)
        }
      }
    case 'updateContent':
      return {
        ...state,
        document: {
          ...state.document,
          content: action.markdown,
          title: state.document.filePath
            ? state.document.title
            : deriveSuggestedTitle(action.markdown, state.document.title),
          isDirty: true,
          saveStatus: state.document.saveStatus === 'error' ? 'error' : 'idle'
        }
      }
    case 'markSaving':
      return {
        ...state,
        document: {
          ...state.document,
          saveStatus: 'saving'
        },
        errorMessage: null
      }
    case 'cancelSaving':
      return {
        ...state,
        document: {
          ...state.document,
          saveStatus: state.document.isDirty
            ? 'idle'
            : state.document.saveStatus === 'error'
              ? 'error'
              : 'idle'
        }
      }
    case 'markSaved':
      return {
        ...state,
        document: {
          ...state.document,
          isDirty: state.document.content !== action.savedContent,
          saveStatus: 'saved',
          lastSavedAt: action.savedAt
        }
      }
    case 'saveAsSucceeded':
      return {
        ...state,
        document: {
          ...state.document,
          filePath: action.path,
          title: action.title,
          isDirty: state.document.content !== action.savedContent,
          saveStatus: 'saved',
          origin: inferOrigin(action.path, action.defaultNotesPath),
          lastSavedAt: action.savedAt
        },
        errorMessage: null
      }
    case 'setError':
      return {
        ...state,
        errorMessage: action.message
      }
    case 'markError':
      return {
        ...state,
        document: {
          ...state.document,
          saveStatus: 'error'
        },
        errorMessage: action.message
      }
    default:
      return state
  }
}

function useDocumentSessionState(): UseDocumentSessionResult {
  const [state, dispatch] = useReducer(sessionReducer, initialState)
  const saveInFlightRef = useRef(false)
  const documentRef = useRef(state.document)

  useEffect(() => {
    documentRef.current = state.document
  }, [state.document])

  const refreshRecents = useCallback(async (): Promise<void> => {
    const files = await window.api.listRecentFiles()
    dispatch({ type: 'setRecentFiles', recentFiles: files })
  }, [])

  const loadRecentFile = useCallback(
    async (path: string): Promise<boolean> => {
      try {
        const result = await window.api.openRecentFile({ path })

        if (isMissingRecentFile(result)) {
          dispatch({ type: 'resetDraft' })
          dispatch({ type: 'setError', message: 'That recent file could not be found.' })
          await window.api.setLastActiveFilePath({ path: null })
          await refreshRecents()
          return false
        }

        dispatch({
          type: 'loadDocument',
          document: result,
          defaultNotesPath: state.defaultNotesPath
        })
        await refreshRecents()
        return true
      } catch (error) {
        dispatch({
          type: 'setError',
          message: error instanceof Error ? error.message : 'Could not open the file.'
        })
        return false
      }
    },
    [refreshRecents, state.defaultNotesPath]
  )

  useEffect(() => {
    let cancelled = false

    const load = async (): Promise<void> => {
      try {
        const launchState = await window.api.getLaunchState()
        if (cancelled) {
          return
        }

        dispatch({
          type: 'launchLoaded',
          defaultNotesPath: launchState.defaultNotesPath,
          recentFiles: launchState.recentFiles
        })

        if (launchState.lastActiveFilePath) {
          await window.api.setLastActiveFilePath({ path: null })
        }
      } catch (error) {
        if (!cancelled) {
          dispatch({
            type: 'setError',
            message: error instanceof Error ? error.message : 'Could not load H3 Ink.'
          })
        }
      } finally {
        if (!cancelled) {
          dispatch({ type: 'setReady' })
        }
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!state.ready || !state.document.filePath) {
      return
    }

    void window.api.setLastActiveFilePath({ path: state.document.filePath })
  }, [state.document.filePath, state.ready])

  const persistWithSaveAs = useCallback(
    async (content: string, currentTitle: string, currentPath: string | null): Promise<boolean> => {
      const result = await window.api.saveMarkdownFileAs({
        content,
        suggestedName: deriveSuggestedTitle(content, currentTitle) || fileNameFromPath(currentPath)
      })

      if (!result) {
        dispatch({ type: 'cancelSaving' })
        return false
      }

      dispatch({
        type: 'saveAsSucceeded',
        path: result.path,
        title: result.title,
        savedAt: result.savedAt,
        savedContent: content,
        defaultNotesPath: state.defaultNotesPath
      })
      await refreshRecents()
      return true
    },
    [refreshRecents, state.defaultNotesPath]
  )

  const saveDocument = useCallback(
    async (intent: SaveIntent): Promise<void> => {
      if (saveInFlightRef.current) {
        return
      }

      const currentDocument = documentRef.current
      const contentToSave = currentDocument.content
      if (contentToSave.trim().length === 0) {
        return
      }

      if (!currentDocument.filePath && intent === 'autosave') {
        return
      }

      saveInFlightRef.current = true
      dispatch({ type: 'markSaving' })

      try {
        if (!currentDocument.filePath) {
          const saved = await persistWithSaveAs(
            contentToSave,
            currentDocument.title,
            currentDocument.filePath
          )
          if (!saved) {
            dispatch({ type: 'setError', message: null })
          }
        } else {
          const saved = await window.api.saveMarkdownFile({
            path: currentDocument.filePath,
            content: contentToSave
          })

          dispatch({
            type: 'markSaved',
            savedAt: saved.savedAt,
            savedContent: contentToSave
          })
          await refreshRecents()
        }
      } catch (error) {
        dispatch({
          type: 'markError',
          message:
            intent === 'autosave'
              ? 'Autosave failed. Your draft is still in memory.'
              : error instanceof Error
                ? error.message
                : 'Save failed.'
        })
      } finally {
        saveInFlightRef.current = false
      }
    },
    [persistWithSaveAs, refreshRecents]
  )

  useEffect(() => {
    if (!state.ready || !state.document.isDirty || !state.document.filePath) {
      return
    }

    const timeout = window.setTimeout(() => {
      void saveDocument('autosave')
    }, AUTOSAVE_DELAY_MS)

    return () => window.clearTimeout(timeout)
  }, [
    saveDocument,
    state.document.content,
    state.document.filePath,
    state.document.isDirty,
    state.ready
  ])

  const hydrateEditorState = useCallback((markdown: string): void => {
    dispatch({ type: 'hydrateEditor', markdown })
  }, [])

  const updateContent = useCallback((markdown: string): void => {
    dispatch({ type: 'updateContent', markdown })
  }, [])

  const createNewNote = useCallback(async (): Promise<boolean> => {
    dispatch({ type: 'resetDraft' })
    await window.api.setLastActiveFilePath({ path: null })
    return true
  }, [])

  const openFile = useCallback(async (): Promise<boolean> => {
    try {
      const result = await window.api.openMarkdownFile()
      if (!result) {
        return false
      }

      dispatch({
        type: 'loadDocument',
        document: result,
        defaultNotesPath: state.defaultNotesPath
      })
      await refreshRecents()
      return true
    } catch (error) {
      dispatch({
        type: 'setError',
        message: error instanceof Error ? error.message : 'Could not open the file.'
      })
      return false
    }
  }, [refreshRecents, state.defaultNotesPath])

  const saveNow = useCallback(async (): Promise<void> => {
    await saveDocument('manual')
  }, [saveDocument])

  const saveAs = useCallback(async (): Promise<void> => {
    try {
      const currentDocument = documentRef.current
      const contentToSave = currentDocument.content
      if (contentToSave.trim().length === 0) {
        return
      }

      dispatch({ type: 'markSaving' })
      const saved = await persistWithSaveAs(
        contentToSave,
        currentDocument.title,
        currentDocument.filePath
      )
      if (!saved) {
        dispatch({ type: 'setError', message: null })
      }
    } catch (error) {
      dispatch({
        type: 'markError',
        message: error instanceof Error ? error.message : 'Save As failed.'
      })
    }
  }, [persistWithSaveAs])

  const deleteNoteByPath = useCallback(
    async (path: string): Promise<boolean> => {
      const confirmed = window.confirm(`Delete this note?\n\n${path}`)
      if (!confirmed) {
        return false
      }

      try {
        await window.api.deleteMarkdownFile({ path })
        if (documentRef.current.filePath === path) {
          dispatch({ type: 'resetDraft' })
          await window.api.setLastActiveFilePath({ path: null })
        }
        await refreshRecents()
        return true
      } catch (error) {
        dispatch({
          type: 'setError',
          message: error instanceof Error ? error.message : 'Delete failed.'
        })
        return false
      }
    },
    [refreshRecents]
  )

  const deleteCurrentNote = useCallback(async (): Promise<boolean> => {
    const currentPath = documentRef.current.filePath
    if (!currentPath) {
      return false
    }

    return deleteNoteByPath(currentPath)
  }, [deleteNoteByPath])

  const saveLabel = useMemo(() => {
    return getSaveLabel(state.document)
  }, [state.document])

  return {
    document: state.document,
    recentFiles: state.recentFiles,
    defaultNotesPath: state.defaultNotesPath,
    ready: state.ready,
    errorMessage: state.errorMessage,
    saveLabel,
    createNewNote,
    hydrateEditorState,
    updateContent,
    openFile,
    loadRecentFile,
    saveNow,
    saveAs,
    deleteCurrentNote,
    deleteNoteByPath
  }
}
