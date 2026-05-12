# H3 Ink Rewrite MVP

## Product Definition

H3 Ink is a local-first writing workspace for serious Markdown writing. Users open a local folder as a workspace, write in plain `.md` files, and keep full ownership of their content.

The rewrite should move H3 Ink from a single-file Markdown editor toward a calm desktop workspace for a body of writing. Local Markdown files remain canonical. The app may add optional `.h3ink/` metadata for workspace preferences, pinned files, recents, and view state, but deleting that metadata must never destroy user content.

## Core Product Decisions

- Local Markdown files are the source of truth.
- The primary unit of work is a local folder/workspace.
- Any folder can be opened; H3 Ink preserves existing Markdown structure.
- Optional `.h3ink/` metadata is allowed for app-specific state.
- The main UI is a minimal sidebar plus editor canvas.
- The default editor is rendered/structured writing.
- Raw Markdown mode is available as an escape hatch.
- GitHub-flavored Markdown is the compatibility target.
- Optional split preview exists, off by default.
- The first rewrite is fully local: no Convex, accounts, sync, or cloud database.
- Privacy promise: local by default; cloud and AI features only run by explicit opt-in.
- The first AI feature is selected-text inline editing; sidebar assistant can follow later.

## MVP Scope

### 1. Workspace Opening

Users can open a local folder as a workspace. H3 Ink scans Markdown files and folders, shows them in a quiet sidebar, and stores recent workspace metadata locally.

### 2. Sidebar Navigation

The sidebar includes:

- Workspace name and workspace actions
- Pinned files
- Recent files
- Filename search
- Real file tree

The sidebar should stay calm and lightweight. It should not become a dashboard or full Finder replacement.

### 3. File Lifecycle

Users can:

- Create an in-memory draft
- Save a draft into the workspace
- Open existing Markdown files
- Create folders
- Rename files and folders
- Delete files and folders with confirmation
- Reveal files and folders in Finder

New notes remain in memory until explicitly saved and named.

### 4. Editor

The default editor is a rendered/structured Markdown editor. Raw Markdown mode is available and should be treated as a first-class escape hatch for users who want direct syntax control.

Both modes save Markdown to disk.

The GFM baseline should include:

- Headings
- Paragraphs
- Emphasis
- Strikethrough
- Links
- Images
- Ordered and unordered lists
- Task lists
- Blockquotes
- Fenced code blocks
- Tables
- Hard breaks

### 5. Saving

Existing files autosave after a short debounce. New drafts remain in memory until explicitly saved and named.

The app must not silently overwrite user edits when the active file changes outside H3 Ink.

### 6. File Watching

H3 Ink watches the workspace folder.

- If unopened files are added, removed, renamed, or changed, the sidebar updates.
- If the active file changes externally and the editor is clean, the app can reload or prompt subtly.
- If the active file changes externally and the editor is dirty, the app warns and does not overwrite local edits.

### 7. Filename Search

MVP search filters by filename only.

Full-text search, semantic search, content indexing, and cloud-backed search are out of scope for the first rewrite.

### 8. Preview

An optional split preview panel can be opened when needed, especially from raw Markdown mode. It is off by default.

### 9. AI Inline Editing

Users can select text and invoke an AI edit command.

The app sends only the selected text plus the user's prompt to the configured provider. It returns a proposed replacement, shows a diff, and lets the user accept or reject the change.

AI must never run on document content without explicit user action.

### 10. AI Provider Settings

Users can bring their own provider, API key, and model.

Initial provider support can target OpenRouter or Vercel AI Gateway, but the implementation should stay small:

- Provider URL
- API key
- Model name
- Selected-text edit request

Do not introduce a heavy agent framework in the MVP.

## Non-Goals

- Convex
- Cloud sync
- Accounts
- Collaboration
- Full-text search
- Semantic search
- Workspace-wide AI agent
- AI reading multiple files
- Plugin system
- Mobile app
- Browser-based app
- Complex file explorer behavior
- Version history or snapshots

## Linear Issue Title Backlog

- Define rewrite architecture and app shell target
- Create new isolated rewrite app package
- Implement workspace open flow
- Add workspace metadata storage under `.h3ink/`
- Build minimal sidebar layout
- Render workspace file tree
- Add pinned files section
- Add recent files section
- Implement filename search filter
- Implement file watcher for workspace changes
- Implement open Markdown file flow
- Implement in-memory draft flow
- Implement save draft into workspace
- Implement debounced autosave for existing files
- Add external file change detection for active document
- Add conflict warning for dirty active file
- Add create folder action
- Add rename file and folder action
- Add delete file and folder confirmation
- Add reveal in Finder action
- Evaluate editor options for rendered Markdown editing
- Implement rendered editor mode
- Implement raw Markdown editor mode
- Add editor mode toggle
- Persist editor mode preference per workspace
- Add GFM support baseline
- Add optional split preview panel
- Add Markdown preview renderer
- Add AI provider settings screen
- Add local secure storage for user API keys
- Implement selected-text AI edit command
- Add AI prompt popover for selected text
- Add AI replacement diff view
- Add accept/reject flow for AI edits
- Add provider abstraction for AI requests
- Add OpenRouter provider support
- Add Vercel AI Gateway provider support
- Add privacy copy for AI opt-in behavior
- Add workspace empty state
- Add no-file-selected editor state
- Add basic keyboard shortcuts
- Add command palette shell
- Add manual QA checklist for local file safety
- Add Markdown compatibility smoke tests
- Add autosave and conflict behavior tests
- Polish desktop packaging metadata
- Decide Electron vs Zero Native after rewrite spike
