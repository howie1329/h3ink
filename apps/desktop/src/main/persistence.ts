import { access, mkdir, readFile, readdir, stat, unlink, writeFile } from 'node:fs/promises'
import { constants as fsConstants } from 'node:fs'
import { basename, extname, join } from 'node:path'
import { app, dialog, BrowserWindow } from 'electron'
import type {
  H3LaunchState,
  H3DeleteResult,
  H3MarkdownDocument,
  H3MissingRecentFile,
  H3RecentFile,
  H3SaveAsResult,
  H3SaveResult
} from '../shared/file-gateway'

type PersistedSettings = {
  recentFiles: H3RecentFile[]
  lastActiveFilePath: string | null
}

const NOTES_FOLDER_NAME = 'h3inknotes'
const SETTINGS_FILE_NAME = 'settings.json'
const MARKDOWN_EXTENSION = '.md'

function getDefaultNotesPath(): string {
  return join(app.getPath('desktop'), NOTES_FOLDER_NAME)
}

function getSettingsPath(): string {
  return join(app.getPath('userData'), SETTINGS_FILE_NAME)
}

async function pathExists(path: string): Promise<boolean> {
  try {
    await access(path, fsConstants.F_OK)
    return true
  } catch {
    return false
  }
}

function normalizeTitle(title: string): string {
  const trimmed = title.trim()
  return trimmed.length > 0 ? trimmed : 'Untitled'
}

function titleFromPath(path: string): string {
  return normalizeTitle(basename(path, extname(path)))
}

function slugifyTitle(title: string): string {
  const cleaned = title
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()

  return cleaned || 'untitled'
}

function getTimestampLabel(date = new Date()): string {
  const parts = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
    String(date.getHours()).padStart(2, '0'),
    String(date.getMinutes()).padStart(2, '0'),
    String(date.getSeconds()).padStart(2, '0')
  ]

  return `${parts[0]}-${parts[1]}-${parts[2]}-${parts[3]}${parts[4]}${parts[5]}`
}

function getFileStemFromTitle(title: string): string {
  if (title.toLowerCase() === 'untitled') {
    return `untitled-${getTimestampLabel()}`
  }

  return slugifyTitle(title)
}

function deriveTitleFromContent(content: string): string {
  const lines = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  const heading = lines.find((line) => line.startsWith('#'))
  if (heading) {
    return normalizeTitle(heading.replace(/^#+\s*/, ''))
  }

  if (lines[0]) {
    return normalizeTitle(lines[0])
  }

  return 'Untitled'
}

async function getUniqueMarkdownPath(baseDirectory: string, requestedTitle: string): Promise<string> {
  const baseName = getFileStemFromTitle(requestedTitle)
  let attempt = 0

  while (true) {
    const suffix = attempt === 0 ? '' : `-${attempt + 1}`
    const candidatePath = join(baseDirectory, `${baseName}${suffix}${MARKDOWN_EXTENSION}`)

    if (!(await pathExists(candidatePath))) {
      return candidatePath
    }

    attempt += 1
  }
}

class RecentFilesStore {
  async read(): Promise<PersistedSettings> {
    try {
      const raw = await readFile(getSettingsPath(), 'utf8')
      const parsed = JSON.parse(raw) as Partial<PersistedSettings>

      return {
        recentFiles: Array.isArray(parsed.recentFiles)
          ? parsed.recentFiles.filter((entry): entry is H3RecentFile => {
              return (
                typeof entry?.path === 'string' &&
                typeof entry?.title === 'string' &&
                typeof entry?.lastOpenedAt === 'string'
              )
            })
          : [],
        lastActiveFilePath:
          typeof parsed.lastActiveFilePath === 'string' ? parsed.lastActiveFilePath : null
      }
    } catch {
      return { recentFiles: [], lastActiveFilePath: null }
    }
  }

  async write(settings: PersistedSettings): Promise<void> {
    await mkdir(app.getPath('userData'), { recursive: true })
    await writeFile(getSettingsPath(), JSON.stringify(settings, null, 2), 'utf8')
  }

  async addRecentFile(file: { path: string; title: string }): Promise<void> {
    const settings = await this.read()
    const nextEntry: H3RecentFile = {
      path: file.path,
      title: normalizeTitle(file.title),
      lastOpenedAt: new Date().toISOString()
    }

    const recentFiles = settings.recentFiles.filter((entry) => entry.path !== file.path)
    recentFiles.unshift(nextEntry)

    await this.write({
      recentFiles: recentFiles.slice(0, 25),
      lastActiveFilePath: file.path
    })
  }

  async setLastActiveFilePath(path: string | null): Promise<void> {
    const settings = await this.read()

    await this.write({
      recentFiles: settings.recentFiles,
      lastActiveFilePath: path
    })
  }

  async pruneMissingFiles(): Promise<PersistedSettings> {
    const settings = await this.read()
    const existingEntries: H3RecentFile[] = []

    for (const entry of settings.recentFiles) {
      if (await pathExists(entry.path)) {
        existingEntries.push(entry)
      }
    }

    const nextLastActivePath =
      settings.lastActiveFilePath && (await pathExists(settings.lastActiveFilePath))
        ? settings.lastActiveFilePath
        : null

    const nextSettings = {
      recentFiles: existingEntries,
      lastActiveFilePath: nextLastActivePath
    }

    await this.write(nextSettings)

    return nextSettings
  }

  async removePath(path: string): Promise<void> {
    const settings = await this.read()
    await this.write({
      recentFiles: settings.recentFiles.filter((entry) => entry.path !== path),
      lastActiveFilePath: settings.lastActiveFilePath === path ? null : settings.lastActiveFilePath
    })
  }
}

const recentFilesStore = new RecentFilesStore()

export async function ensureDefaultNotesDirectory(): Promise<{ path: string }> {
  const path = getDefaultNotesPath()
  await mkdir(path, { recursive: true })
  return { path }
}

export async function listDesktopNotes(): Promise<H3RecentFile[]> {
  const { path: defaultNotesPath } = await ensureDefaultNotesDirectory()
  const entries = await readdir(defaultNotesPath)
  const markdownEntries = entries.filter((entry) => extname(entry).toLowerCase() === MARKDOWN_EXTENSION)

  const notes = await Promise.all(
    markdownEntries.map(async (entry) => {
      const path = join(defaultNotesPath, entry)
      const metadata = await stat(path)

      return {
        path,
        title: titleFromPath(path),
        lastOpenedAt: metadata.mtime.toISOString()
      }
    })
  )

  notes.sort((left, right) => right.lastOpenedAt.localeCompare(left.lastOpenedAt))

  return notes
}

async function readMarkdownDocument(path: string): Promise<H3MarkdownDocument> {
  const content = await readFile(path, 'utf8')

  return {
    path,
    title: titleFromPath(path),
    content
  }
}

function getWindow(): BrowserWindow | undefined {
  return BrowserWindow.getFocusedWindow() ?? BrowserWindow.getAllWindows()[0]
}

export async function createDesktopNote(input: {
  content: string
  suggestedTitle?: string
}): Promise<H3MarkdownDocument> {
  const { path: defaultNotesPath } = await ensureDefaultNotesDirectory()
  const title = normalizeTitle(input.suggestedTitle || deriveTitleFromContent(input.content))
  const uniquePath = await getUniqueMarkdownPath(defaultNotesPath, title)

  await writeFile(uniquePath, input.content, 'utf8')
  await recentFilesStore.addRecentFile({ path: uniquePath, title })

  return {
    path: uniquePath,
    title,
    content: input.content
  }
}

export async function openMarkdownFile(): Promise<H3MarkdownDocument | null> {
  const defaultNotes = await ensureDefaultNotesDirectory()
  const window = getWindow()
  const result = window
    ? await dialog.showOpenDialog(window, {
        properties: ['openFile'],
        defaultPath: defaultNotes.path,
        filters: [{ name: 'Markdown', extensions: ['md', 'markdown'] }]
      })
    : await dialog.showOpenDialog({
    properties: ['openFile'],
    defaultPath: defaultNotes.path,
    filters: [{ name: 'Markdown', extensions: ['md', 'markdown'] }]
      })

  if (result.canceled || result.filePaths.length === 0) {
    return null
  }

  const document = await readMarkdownDocument(result.filePaths[0])
  await recentFilesStore.addRecentFile(document)

  return document
}

export async function openRecentFile(input: { path: string }): Promise<H3MarkdownDocument | H3MissingRecentFile> {
  if (!(await pathExists(input.path))) {
    await recentFilesStore.removePath(input.path)
    return { missing: true, path: input.path }
  }

  const document = await readMarkdownDocument(input.path)
  await recentFilesStore.addRecentFile(document)

  return document
}

export async function saveMarkdownFile(input: {
  path: string
  content: string
}): Promise<H3SaveResult> {
  await writeFile(input.path, input.content, 'utf8')
  await recentFilesStore.addRecentFile({
    path: input.path,
    title: titleFromPath(input.path)
  })

  return {
    path: input.path,
    savedAt: new Date().toISOString()
  }
}

export async function saveMarkdownFileAs(input: {
  content: string
  suggestedName?: string
}): Promise<H3SaveAsResult | null> {
  const defaultNotes = await ensureDefaultNotesDirectory()
  const defaultFileName = `${getFileStemFromTitle(
    normalizeTitle(input.suggestedName || deriveTitleFromContent(input.content))
  )}${MARKDOWN_EXTENSION}`
  const window = getWindow()
  const result = window
    ? await dialog.showSaveDialog(window, {
        defaultPath: join(defaultNotes.path, defaultFileName),
        filters: [{ name: 'Markdown', extensions: ['md'] }]
      })
    : await dialog.showSaveDialog({
        defaultPath: join(defaultNotes.path, defaultFileName),
        filters: [{ name: 'Markdown', extensions: ['md'] }]
      })

  if (result.canceled || !result.filePath) {
    return null
  }

  const filePath = result.filePath.endsWith(MARKDOWN_EXTENSION)
    ? result.filePath
    : `${result.filePath}${MARKDOWN_EXTENSION}`

  await writeFile(filePath, input.content, 'utf8')

  const saved = {
    path: filePath,
    title: titleFromPath(filePath),
    savedAt: new Date().toISOString()
  }

  await recentFilesStore.addRecentFile(saved)

  return saved
}

export async function deleteMarkdownFile(input: { path: string }): Promise<H3DeleteResult> {
  if (await pathExists(input.path)) {
    await unlink(input.path)
  }

  await recentFilesStore.removePath(input.path)

  return { path: input.path }
}

export async function listRecentFiles(): Promise<H3RecentFile[]> {
  const settings = await recentFilesStore.pruneMissingFiles()
  return settings.recentFiles
}

export async function getLaunchState(): Promise<H3LaunchState> {
  const defaultNotes = await ensureDefaultNotesDirectory()
  const settings = await recentFilesStore.pruneMissingFiles()

  return {
    defaultNotesPath: defaultNotes.path,
    lastActiveFilePath: settings.lastActiveFilePath,
    recentFiles: settings.recentFiles
  }
}

export async function setLastActiveFilePath(input: { path: string | null }): Promise<void> {
  await recentFilesStore.setLastActiveFilePath(input.path)
}
