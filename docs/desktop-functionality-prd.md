# H3 Ink Desktop Functionality PRD

## 1. Purpose

Define the core desktop behaviors required for the H3 Ink MVP so users can create, open, edit, preview, save, and resume plain Markdown documents on macOS with minimal friction.

## 2. Product Goal

Deliver a fast, local-first Markdown desktop app that works directly with `.md` files, provides immediate visual feedback, and avoids the complexity of note libraries, cloud sync, or advanced editing systems.

## 3. Target Users

- Writers maintaining notes in plain text
- Developers editing Markdown documentation
- Note-takers who want a lightweight local editor
- Users switching away from proprietary note apps

## 4. In-Scope Functional Areas

1. Document session lifecycle
2. Local file open/save flows
3. Autosave behavior
4. Live Markdown preview
5. Recent files and relaunch context
6. Error handling for missing or moved files

## 5. Out of Scope

- Cloud sync
- Collaboration
- Search
- Tags
- Rich-text editing
- Formatting toolbar
- Slash commands
- Plugin system
- App-managed note database
- Folder tree navigation
- Web-based editing
- Windows/Linux MVP packaging

## 6. Functional Requirements

### 6.1 New Document Creation

- User can create a new untitled document immediately on app launch or through the app shell.
- Unsaved drafts exist in memory until the user chooses `Save As`.
- New drafts should start with empty content.
- App should clearly distinguish between unsaved draft state and saved file state.

**Acceptance criteria**

- Opening the app with no active file allows typing immediately.
- A newly created document does not require an initial file path.
- Closing before save does not silently write a file to disk.

### 6.2 Open Existing Markdown File

- User can open a local `.md` file using a native file picker.
- App reads the file content into the editor and preview.
- Opened file becomes the active document session.
- The opened file is added to the recent files list.

**Acceptance criteria**

- Native open dialog filters for Markdown-compatible files.
- Opened content appears in both editor and preview without restart.
- Active file metadata updates after open completes.

### 6.3 Save Existing File

- For path-backed documents, the app can write the latest editor contents to disk.
- Save must preserve the current file path.
- Save timestamp or persistence state should update after successful save.

**Acceptance criteria**

- Saving an opened file overwrites the same file.
- Save failures surface a user-visible error state.
- Dirty state clears after a successful save.

### 6.4 Save As for Unsaved Drafts

- Unsaved drafts require `Save As` to persist to disk.
- Native save dialog lets the user choose destination and filename.
- After `Save As`, the draft becomes a path-backed document eligible for autosave and recent-files tracking.

**Acceptance criteria**

- `Save As` creates a new `.md` file at the selected location.
- App switches to the new path after success.
- The saved file appears in recent files.

### 6.5 Autosave

- Autosave applies only to documents that already have a valid file path.
- Autosave triggers after a short debounce following edits.
- Autosave must not block typing or make the app feel laggy.

**Acceptance criteria**

- Editing a saved file writes changes after the debounce interval.
- Editing an unsaved draft does not create a file automatically.
- Autosave failures do not crash the app and present recoverable feedback.

### 6.6 Live Markdown Preview

- Preview updates as the user types.
- MVP rendering supports CommonMark basics only:
  - headings
  - lists
  - links
  - code blocks
  - blockquotes
  - emphasis
- Preview should remain visually aligned with the editor workflow, not become a full publishing layout.

**Acceptance criteria**

- Preview refreshes fast enough to feel live during normal typing.
- Supported Markdown syntax renders consistently.
- Unsupported advanced syntax fails gracefully without breaking the preview pane.

### 6.7 Recent Files

- App stores a lightweight list of recently opened or saved files.
- Recent files are shown in the desktop sidebar.
- Clicking a recent file reopens it quickly.
- Missing files must fail gracefully and be pruned or marked invalid.

**Acceptance criteria**

- Recent files persist across relaunch.
- Opening from recents restores the selected file into the session.
- If a file no longer exists, the app shows a clear failure state and does not crash.

### 6.8 Relaunch Context

- App should restore enough local context to help the user resume quickly.
- Recent files are always restored from local settings.
- The last active file path may be restored if still valid.

**Acceptance criteria**

- Relaunch preserves recent file history.
- If the last active file still exists, the app can restore it or make it quickly accessible.
- If the last active file is missing, launch still succeeds cleanly.

## 7. Non-Functional Requirements

- **Performance:** startup should feel lightweight; typing and preview updates should remain responsive.
- **Portability:** all documents remain standard `.md` files on disk.
- **Simplicity:** avoid database, sync layer, or hidden content storage.
- **Reliability:** file failures should be isolated and user-readable.
- **Maintainability:** document/session state, filesystem access, recent-files persistence, and preview rendering should remain separate concerns.

## 8. Suggested Architecture Boundaries

- **Document session state**
  - active content
  - active path
  - title
  - dirty/saved state
  - autosave eligibility
- **Filesystem gateway**
  - open
  - save
  - save as
  - reopen recent
- **Preview pipeline**
  - Markdown parsing
  - sanitization/rendering boundary
- **Recent files store**
  - persistent local settings
  - missing-file pruning
  - launch state restoration

## 9. Dependencies

- Electron shell and native dialogs
- React renderer state management
- Shared TypeScript document/file types
- Small persistence layer for recent files and launch state
- Markdown rendering library for CommonMark subset

## 10. Release Readiness Checklist

- New draft flow works
- Open/save/save-as flows work
- Autosave works for path-backed files only
- Live preview supports MVP syntax set
- Recent files persist across relaunch
- Missing-file behavior is graceful
- macOS-first experience feels stable and uncluttered
