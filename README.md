# H3 Ink

H3 Ink is a desktop-first Markdown note-taking app built with Electron and Vite.

The product goal is simple: a clean writing surface for local `.md` files with fast feedback, minimal chrome, and a strong default dark theme. The repo is set up as a Turborepo monorepo so the desktop app and the website can live together from the start.

## MVP

### Core features

- Minimal TipTap editor for writing Markdown-backed notes
- Create, open, and save `.md` files through native file dialogs
- Auto-save on a short debounce for saved files
- Simple sidebar for recently opened files

### UI

- Dark theme by default
- Clean editor-first writing surface
- Minimal interface with very little toolbar clutter
- Lightweight file and save-state feedback

## Product direction

- Desktop app first
- macOS first
- Plain Markdown files, not a proprietary note database
- Marketing/download website in the same monorepo
- Possible future web app, but not part of the MVP

## Repo structure

```text
apps/
  desktop/   # Electron app
  web/       # Marketing/download website
packages/    # Shared code if and when we need it
docs/        # Product and technical reference docs
```

## Tooling baseline

- Turborepo
- npm workspaces
- TypeScript
- React for app and web UI
- Next.js for the website

## Current status

The monorepo foundation is in place, and both `apps/desktop` and `apps/web` are scaffolded from the official CLIs.

## Local development

```bash
npm install
npm run dev:desktop
npm run dev:web
```

## Reference

The original MVP PRD baseline is saved in [docs/h3ink-mvp-prd.md](/Users/howardthomas/Desktop/h3ink/docs/h3ink-mvp-prd.md).
