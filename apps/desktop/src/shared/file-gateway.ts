export type H3MarkdownDocument = {
  path: string
  title: string
  content: string
}

export type H3MissingRecentFile = {
  missing: true
  path: string
}

export type H3SaveResult = {
  path: string
  savedAt: string
}

export type H3SaveAsResult = {
  path: string
  title: string
  savedAt: string
}

export type H3DeleteResult = {
  path: string
}

export type H3RecentFile = {
  path: string
  title: string
  lastOpenedAt: string
}

export type H3LaunchState = {
  defaultNotesPath: string
  lastActiveFilePath: string | null
  recentFiles: H3RecentFile[]
}

export interface FileGateway {
  ensureDefaultNotesDirectory: () => Promise<{ path: string }>
  listDesktopNotes: () => Promise<H3RecentFile[]>
  createDesktopNote: (input: {
    content: string
    suggestedTitle?: string
  }) => Promise<H3MarkdownDocument>
  openMarkdownFile: () => Promise<H3MarkdownDocument | null>
  openRecentFile: (input: { path: string }) => Promise<H3MarkdownDocument | H3MissingRecentFile>
  saveMarkdownFile: (input: { path: string; content: string }) => Promise<H3SaveResult>
  saveMarkdownFileAs: (input: {
    content: string
    suggestedName?: string
  }) => Promise<H3SaveAsResult | null>
  deleteMarkdownFile: (input: { path: string }) => Promise<H3DeleteResult>
  listRecentFiles: () => Promise<H3RecentFile[]>
  getLaunchState: () => Promise<H3LaunchState>
  setLastActiveFilePath: (input: { path: string | null }) => Promise<void>
}
