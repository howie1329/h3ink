# H3 Ink MVP PRD Baseline

## Problem Statement

Writers, developers, and note-takers often want a fast, local-first Markdown app that feels lightweight and stays out of the way. Many existing note apps either hide files behind a proprietary library model, add too much UI chrome, or try to solve too many workflows at once.

H3 Ink is meant to solve that by providing a desktop-first Markdown writing app that works directly with plain `.md` files, keeps the writing surface simple, and preserves Markdown portability while using a more capable structured editor internally.

## Solution

H3 Ink will be a desktop-first Electron Vite app for writing Markdown notes with a minimal TipTap editor while preserving Markdown as the file format on disk. The MVP focuses on an editor-first writing experience where users open `.md` files, H3 Ink converts them into TipTap’s internal document state for editing, and saves them back to Markdown through native desktop file flows. Users can create, open, and save local `.md` files through native file dialogs, rely on short-debounce autosave for saved files, and quickly reopen recent files from a lightweight sidebar.

The interface should feel intentional and minimal: dark theme by default, a calm writing surface, very little chrome, and no heavy formatting UI in the MVP.

The codebase will start as a monorepo so the Electron app and a separate marketing/download website can live together from the beginning.

## User Stories

1. As a writer, I want to open a Markdown file from my computer, so that I can continue working in a plain-text format I already use.
2. As a writer, I want to create a new untitled note immediately, so that I can start writing without interruption.
3. As a writer, I want to save a new note with `Save As`, so that I can choose exactly where it lives on disk.
4. As a writer, I want to edit an existing `.md` file, so that I can use H3 Ink as a lightweight editor instead of a proprietary note system.
5. As a writer, I want my edits to autosave after a short delay once a file already exists, so that I do not lose work.
6. As a writer, I want the editor to preserve Markdown portability when I save, so that my files remain useful outside H3 Ink.
7. As a writer, I want the app window to feel uncluttered, so that I can focus on writing.
8. As a writer, I want a dark theme out of the box, so that the app feels comfortable during long writing sessions.
9. As a writer, I want the editor to feel calm and readable, so that writing remains comfortable in long sessions.
10. As a writer, I want the editor workspace to stay focused and uncluttered, so that I can write for long sessions without distraction.
11. As a writer, I want to reopen recently used files from a sidebar, so that I can jump back into active notes quickly.
12. As a writer, I want missing recent files to fail gracefully, so that the app does not feel brittle when files move.
13. As a writer, I want native open and save dialogs, so that filesystem operations feel familiar on macOS.
14. As a writer, I want H3 Ink to work with plain `.md` files, so that my notes remain portable.
15. As a writer, I want to relaunch the app and still have recent context available, so that I can resume quickly.
16. As a note-taker, I want supported Markdown basics to open, edit, and save correctly through the editor, so that ordinary documents remain trustworthy.
17. As a note-taker, I want headings, lists, links, code blocks, blockquotes, emphasis, paragraphs, and hard breaks to round-trip correctly, so that the editor is dependable for MVP documents.
18. As a writer, I want untitled drafts to stay in memory until I choose `Save As`, so that the app never creates files behind my back.
19. As a writer, I want autosave to apply only after a file path exists, so that draft behavior stays predictable.
20. As a writer, I want unsupported Markdown to fail gracefully, so that the app remains safe even when a file uses syntax outside the MVP subset.
21. As a user evaluating the product, I want a simple website where I can understand the app and download it, so that installation is straightforward.
22. As a maintainer, I want the desktop app and website in one monorepo, so that product surfaces can evolve together without repository sprawl.
23. As a future maintainer, I want clear module boundaries around document state, filesystem access, Markdown conversion, and recent files, so that the codebase stays easy to extend.

## Implementation Decisions

- Use a monorepo from day one with separate app packages for the Electron desktop app and the website.
- Keep the MVP desktop-first; the website is marketing/download only and not a browser-based editor.
- Target macOS first to reduce packaging and QA scope.
- Use Electron + Vite + React + TypeScript for the desktop app.
- Use Next.js for the website.
- Operate directly on user-selected Markdown files rather than creating an app-managed note database.
- Allow unsaved drafts in memory before a file path exists; require `Save As` to persist them.
- Use TipTap as the editing surface, but keep Markdown as the only saved file format.
- Treat Markdown as a conversion boundary: open Markdown into TipTap state and save TipTap state back to Markdown.
- Guarantee reliable round-tripping only for the supported MVP subset: paragraphs, headings, emphasis, lists, links, code blocks, blockquotes, and hard breaks.
- Keep the sidebar limited to recently opened files rather than a full folder tree or note library.
- Keep the editor UI minimal with no toolbar, bubble menu, or slash commands.
- Add autosave only for path-backed files; unsaved drafts stay in memory until explicitly saved.
- Keep the renderer state model small and explicit: current Markdown snapshot, active editor state, active file metadata, and dirty/persistence state.
- Isolate filesystem behavior behind a small gateway interface for open, save, save as, and reopen recent operations.
- Persist recent files locally in a small settings store and prune entries when files no longer exist.
- Keep Markdown conversion behind a focused boundary so parser or serializer choices can evolve without touching the rest of the UI.

## Testing Decisions

- Good tests should validate visible behavior and persistence outcomes rather than internal component structure.
- The MVP baseline is manual-first and does not require an automated test suite initially.
- Future automated coverage should focus on the deepest, most stable modules first: document/session state, filesystem behavior, recent-file persistence, and Markdown conversion boundaries.
- When tests are added later, they should favor behavior-based checks over implementation details.

## Out of Scope

- Cloud sync
- Collaboration
- Tags
- Search
- Formatting toolbar
- Bubble menus
- Slash commands
- Plugin system
- App-managed note library
- Windows and Linux packaging in the first milestone
- Full browser-based note editing
- Broad automated test coverage in the initial baseline

## Further Notes

- The product should feel calm and restrained rather than feature-dense.
- The smallest maintainable implementation is the right starting point.
- TipTap Markdown support is still early, so the MVP should not promise lossless handling for arbitrary Markdown beyond the supported subset.
- The monorepo should stay simple until shared code actually appears.
- The initial docs here are intended as a working baseline and can be revised as implementation begins.
