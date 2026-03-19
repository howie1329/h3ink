import type { H3MarkdownDocument } from '../../../shared/file-gateway'

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'
export type DocumentOrigin = 'draft' | 'desktop' | 'external'

export type DocumentState = {
  content: string
  filePath: string | null
  title: string
  isDirty: boolean
  saveStatus: SaveStatus
  origin: DocumentOrigin
  lastSavedAt: string | null
  sessionKey: number
}

const EMPTY_TITLE = 'Untitled'
const UNTITLED_FILE_PREFIX = 'untitled'

export const AUTOSAVE_DELAY_MS = 700

export function createSessionKey(): number {
  return Date.now()
}

export function createEmptyDocument(): DocumentState {
  return {
    content: '',
    filePath: null,
    title: EMPTY_TITLE,
    isDirty: false,
    saveStatus: 'idle',
    origin: 'draft',
    lastSavedAt: null,
    sessionKey: createSessionKey()
  }
}

export function inferOrigin(filePath: string, defaultNotesPath: string): DocumentOrigin {
  return filePath.startsWith(defaultNotesPath) ? 'desktop' : 'external'
}

export function deriveSuggestedTitle(content: string, currentTitle: string): string {
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

export function fileNameFromPath(path: string | null): string {
  if (!path) {
    return UNTITLED_FILE_PREFIX
  }

  const segments = path.split(/[\\/]/)
  const fileName = segments[segments.length - 1] || UNTITLED_FILE_PREFIX
  return fileName.replace(/\.md$/i, '') || UNTITLED_FILE_PREFIX
}

export function getSaveLabel(document: DocumentState): string {
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
}

export function createLoadedDocument(
  nextDocument: H3MarkdownDocument,
  defaultNotesPath: string
): DocumentState {
  return {
    content: nextDocument.content,
    filePath: nextDocument.path,
    title: nextDocument.title,
    isDirty: false,
    saveStatus: 'saved',
    origin: inferOrigin(nextDocument.path, defaultNotesPath),
    lastSavedAt: new Date().toISOString(),
    sessionKey: createSessionKey()
  }
}
