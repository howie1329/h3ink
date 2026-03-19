# H3 Ink Desktop Functionality PRD

## 1. Purpose

Define the core desktop behaviors required for the H3 Ink MVP so users can create, open, edit, save, and resume plain Markdown documents on macOS with minimal friction through a TipTap-based editor.

## 2. Product Goal

Deliver a fast, local-first Markdown desktop app that works directly with `.md` files, uses TipTap as the editing surface, preserves Markdown portability at the filesystem boundary, and avoids the complexity of note libraries, sync, and formatting-heavy editor chrome.

## 3. Target Users

- Writers maintaining notes in plain text
- Developers editing Markdown documentation
- Note-takers who want a lightweight local editor
- Users switching away from proprietary note apps

## 4. In-Scope Functional Areas

1. Document session lifecycle
2. Local file open/save flows
3. Autosave behavior for saved files only
4. Markdown import into TipTap and export back to Markdown
5. Recent files and relaunch context
6. Error handling for missing or moved files

## 5. Out of Scope

- Cloud sync
- Collaboration
- Search
- Tags
- Formatting toolbar
- Bubble menu
- Slash commands
- Comments
- Tables
- Plugin system
- App-managed note database
- Folder tree navigation
- Live preview pane in the MVP editor workspace
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
- App reads the file content as Markdown and converts it into TipTap editor state.
- Opened file becomes the active document session.
- The opened file is added to the recent files list.

**Acceptance criteria**

- Native open dialog filters for Markdown-compatible files.
- Opened content appears in the editor without restart.
- Active file metadata updates after open completes.

### 6.3 Save Existing File

- For path-backed documents, the app writes the latest editor state back to disk as Markdown.
- Save preserves the current file path.
- Save timestamp or persistence state updates after successful save.

**Acceptance criteria**

- Saving an opened file overwrites the same file as Markdown.
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

### 6.6 Markdown Conversion Boundary

- TipTap is the live editor surface and Markdown is the file-format boundary.
- App opens `.md` by parsing Markdown into TipTap document state.
- App saves by serializing TipTap document state back into Markdown.
- MVP support is intentionally narrow:
  - paragraphs
  - headings
  - emphasis
  - lists
  - links
  - code blocks
  - blockquotes
  - hard breaks
- Unsupported Markdown should degrade gracefully and never crash the app.

**Acceptance criteria**

- Supported syntax opens, edits, and saves reliably.
- Save output remains a standard Markdown file.
- Unsupported or unconfigured syntax failures remain user-safe and non-destructive.

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

- **Performance:** startup should feel lightweight; typing and autosave should remain responsive.
- **Portability:** all documents remain standard `.md` files on disk.
- **Simplicity:** avoid database, sync layer, or hidden content storage.
- **Reliability:** file failures should be isolated and user-readable.
- **Maintainability:** document/session state, filesystem access, Markdown conversion, and recent-files persistence should remain separate concerns.
- **Risk disclosure:** TipTap Markdown support is early/beta, so the MVP only guarantees reliable round-tripping for the supported subset.

## 8. Suggested Architecture Boundaries

- **Document session state**
  - active Markdown snapshot
  - active editor state
  - active path
  - title
  - dirty/saved state
  - autosave eligibility
- **Markdown conversion boundary**
  - parse Markdown into TipTap state
  - serialize TipTap state back into Markdown
  - keep supported syntax narrow and explicit
- **Filesystem gateway**
  - open
  - save
  - save as
  - reopen recent
- **Recent files store**
  - persistent local settings
  - missing-file pruning
  - launch state restoration

## 9. Dependencies

- Electron shell and native dialogs
- React renderer state management
- Shared TypeScript document/file types
- Small persistence layer for recent files and launch state
- TipTap core editor packages
- TipTap Markdown integration for the supported subset

## 10. Release Readiness Checklist

- New draft flow stays in memory until `Save As`
- Open/save/save-as flows work
- Autosave works for path-backed files only
- Supported Markdown subset round-trips cleanly
- Recent files persist across relaunch
- Missing-file behavior is graceful
- macOS-first experience feels stable and uncluttered
