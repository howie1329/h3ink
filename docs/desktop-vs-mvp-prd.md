# Desktop app vs MVP PRD — status breakdown

This document compares what is implemented under `apps/desktop/` against the baseline in [`h3ink-mvp-prd.md`](./h3ink-mvp-prd.md). It is a snapshot of the codebase as of the last update to this file, not a release checklist.

---

## Executive summary

The desktop app largely implements the MVP PRD’s core loop: **Electron + Vite + React + TypeScript**, **native open/save dialogs**, **TipTap editing with Markdown on disk**, **in-memory drafts until Save As**, **debounced autosave only when a path exists**, **recent files in a sidebar** with **graceful handling when a path is missing**, and **clear boundaries** between session state, the preload `FileGateway`, and main-process persistence.

Gaps and caveats cluster around **automatic resume of the last-open file on relaunch**, **unverified round-trip guarantees** for the documented Markdown subset, **no dedicated handling for “unsupported Markdown” beyond TipTap defaults**, and **packaging/branding** still looking like the electron-vite template in places. The monorepo and marketing site called out in the PRD live outside `apps/desktop/` but are noted briefly for stories 21–22.

---

## PRD user stories → `apps/desktop/` status

| # | Story (abbrev.) | Status | Notes |
|---|-----------------|--------|--------|
| 1 | Open `.md` from disk | **Done** | `openMarkdownFile()` + dialog in `persistence.ts`; wired from home, editor header, and sidebar recents. |
| 2 | New untitled note immediately | **Done** | `createEmptyDocument()` / `resetDraft`; home “New Note” and sidebar. |
| 3 | Save As for new notes | **Done** | `saveMarkdownFileAs` + `saveAs` / first-time `saveDocument('manual')` when no path. |
| 4 | Edit existing file | **Done** | Load path-backed document; editor keyed by `sessionKey` on load. |
| 5 | Autosave after short delay (saved files) | **Done** | `AUTOSAVE_DELAY_MS` = 700 in `document-session.ts`; effect in `use-document-session.ts` only when `filePath` + dirty. |
| 6 | Preserve Markdown portability on save | **Done (by design)** | Serialize via TipTap `getMarkdown()` / `setContent(..., { contentType: 'markdown' })`. |
| 7 | Uncluttered window | **Mostly done** | Home empty state + editor; header actions add some chrome but no formatting toolbar. |
| 8 | Dark theme default | **Done** | `App.tsx` defaults `isDarkMode` to `true`; light toggle in sidebar. |
| 9 | Calm, readable editor | **Done** | Monospace stack, spacing, blockquote/heading styles in `main.css`. |
| 10 | Focused workspace | **Mostly done** | Same as 7; dev-only debug strip in editor when `import.meta.env.DEV`. |
| 11 | Recent files in sidebar | **Done** | `AppSidebar` + `listRecentFiles` / `RecentFilesStore`. |
| 12 | Missing recents fail gracefully | **Done** | `openRecentFile` returns `H3MissingRecentFile`; UI message + `removePath` + recents refresh. |
| 13 | Native open/save dialogs | **Done** | `dialog.showOpenDialog` / `showSaveDialog` in `persistence.ts`. |
| 14 | Plain `.md` portability | **Done** | Filters and `.md` extension handling on save-as. |
| 15 | Relaunch with recent context | **Partial** | Recents and settings persist. `lastActiveFilePath` is stored and updated, but on launch the renderer **clears** `lastActiveFilePath` without reopening that file—no automatic “resume last document.” |
| 16–17 | MVP Markdown subset round-trip | **Implemented, not proven** | `tiptap.ts`: StarterKit (headings 1–3, lists, blockquote, code, emphasis, etc.) + Link + `@tiptap/markdown`. No automated round-trip tests; TipTap Markdown is still evolving per PRD “Further Notes.” |
| 18 | Drafts in memory until Save As | **Done** | No path → no autosave; explicit Save/Save As flows. |
| 19 | Autosave only when path exists | **Done** | Guard in `saveDocument` and in autosave `useEffect`. |
| 20 | Unsupported Markdown graceful | **Weak / implicit** | No explicit UX or parsing policy beyond what TipTap does with unknown constructs. |
| 21–22 | Website + monorepo | **Out of `apps/desktop/`** | Satisfied at repo level: `apps/web` (Next.js) + workspaces in root `package.json`. |

---

## PRD implementation decisions → code mapping

| Decision | Where it shows up | Match? |
|----------|-------------------|--------|
| Electron + Vite + React + TypeScript | `apps/desktop/` (electron-vite layout, `src/main`, `src/renderer`) | Yes |
| Direct filesystem, no app note DB | `persistence.ts` reads/writes user-chosen paths + `userData/settings.json` | Yes |
| TipTap in, Markdown out | `markdown-editor.tsx`, `tiptap.ts` | Yes |
| Autosave only path-backed | `use-document-session.ts` | Yes |
| Recents only (no full tree) | Sidebar lists `recentFiles` only | Yes |
| No formatting toolbar / bubble / slash | Editor is `EditorContent` only | Yes |
| Small explicit document state | `DocumentState` in `document-session.ts` + session reducer | Yes |
| Filesystem behind gateway | `shared/file-gateway.ts` + `preload/index.ts` + `ipcMain.handle` in `main/index.ts` | Yes |
| Recents in settings store, prune missing | `RecentFilesStore`, `pruneMissingFiles`, `listRecentFiles` | Yes |
| Markdown conversion isolated | `tiptap.ts` / `markdown-editor.tsx` vs session | Yes |

---

## PRD testing decisions

| PRD expectation | `apps/desktop/` |
|----------------|-----------------|
| Manual-first, no required automated suite | No `*.test.*` / `*.spec.*` under `apps/desktop/` |
| Future tests on session, FS, recents, Markdown | Not started in-app; aligns with “future” |

---

## PRD out of scope — quick check

| Out of scope item | In desktop app? |
|-------------------|-----------------|
| Cloud sync, collaboration, tags, search | Not present |
| Formatting toolbar, bubble menus, slash commands | Not present |
| Plugin system, app-managed library | Not present |
| Full browser editor | N/A (Electron) |
| Broad automated tests | Not present |

**Packaging note:** The PRD targets **macOS first** and defers Windows/Linux for the first milestone. `electron-builder.yml` still defines **Windows and Linux** targets alongside `mac`—useful later, but broader than the PRD’s first-milestone scope. **Notarize** is `false`; **productName** is still generic (`desktop`), which is a polish gap vs a shippable “H3 Ink” Mac build.

---

## Extras in `apps/desktop/` (not required by MVP PRD)

- **Delete current note** (path-backed only): `deleteMarkdownFile` + confirm in `EditorWorkspace` — not listed as a user story in the PRD.
- **Settings screen**: placeholder `SettingsWorkspace` — PRD does not require it.
- **Light mode toggle** — PRD only mandates dark default; toggle is additive.
- **`listDesktopNotes` / `createDesktopNote`**: implemented in main + exposed on `window.api`, but **not used** by the current renderer UI (potential future “desktop folder” flows without turning the sidebar into a full library).

---

## Suggested next steps (if closing MVP gaps)

1. **Story 15:** On launch, optionally **open `lastActiveFilePath`** when the file still exists (and only clear or update after a successful load), or document intentional “always start at home” product choice.
2. **Stories 16–17 / 20:** Add **focused tests** or a **manual QA script** for the named Markdown constructs; document known TipTap Markdown limitations in-app or in docs.
3. **Release fit:** Align `electron-builder.yml` **appId**, **productName**, and **macOS-first** packaging with branding and PRD scope.

---

## Key file index

| Concern | Primary files |
|---------|----------------|
| Session + autosave + recents UX | `src/renderer/src/hooks/use-document-session.ts`, `src/renderer/src/lib/document-session.ts` |
| Editor + Markdown boundary | `src/renderer/src/components/markdown-editor.tsx`, `src/renderer/src/lib/tiptap.ts` |
| Native FS + settings + recents | `src/main/persistence.ts`, `src/main/index.ts` |
| IPC contract | `src/shared/file-gateway.ts`, `src/preload/index.ts` |
| Shell UI | `src/renderer/src/App.tsx`, `app-sidebar.tsx`, `editor-workspace.tsx`, `home-workspace.tsx` |
