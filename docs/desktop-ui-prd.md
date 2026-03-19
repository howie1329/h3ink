# H3 Ink Desktop UI PRD

## 1. Purpose

Define the MVP desktop user interface for H3 Ink, focusing on a calm, minimal TipTap writing experience that supports the functional requirements without adding unnecessary chrome.

## 2. UX Principle

The interface should feel restrained, intentional, and invisible enough that the user’s attention stays on writing.

## 3. UI Goals

- Minimize friction to start writing
- Keep file actions familiar through native desktop patterns
- Make the editor the dominant surface
- Preserve fast access to recent work
- Support long writing sessions with a strong default dark theme

## 4. Primary Desktop Surfaces

1. Main app window
2. Sidebar for recent files
3. Editor workspace
4. Lightweight status/feedback states
5. Native file dialogs

## 5. Layout Requirements

### 5.1 Main Window

- Single focused application window
- Minimal top-level chrome
- No heavy toolbar in MVP
- Content-first layout

**Acceptance criteria**

- Main writing surfaces are visible immediately on launch.
- Nonessential controls are hidden or minimized.
- Window layout feels usable without setup.

### 5.2 Editor Workspace

- Replace the previous split editor/preview layout with a single editor-first workspace.
- TipTap is the primary writing surface.
- Supporting file status and save feedback should stay lightweight and secondary.

**Acceptance criteria**

- The editor occupies the dominant share of the window.
- Supporting status UI does not crowd the writing surface.
- Common desktop window sizes remain comfortable for long sessions.

### 5.3 Sidebar

- Lightweight left-side sidebar for recent files
- Sidebar should not become a folder tree, database browser, or note library
- Sidebar should support quick re-entry into active work

**Acceptance criteria**

- Recent files are readable at a glance.
- Clicking a recent item loads the document.
- Missing items display gracefully.

## 6. Visual Design Requirements

### 6.1 Theme

- Dark theme by default
- High enough contrast for long sessions
- Muted chrome with stronger emphasis on editor content

### 6.2 Typography

- Monospace or monospace-leaning writing feel in the editor
- Clear, readable text in the main workspace
- Visual hierarchy in the editor should reflect supported Markdown structure without feeling overly styled

### 6.3 UI Chrome

- Minimal borders, buttons, and decorations
- Avoid dense control bars
- Use whitespace and spacing to create calm rather than heavy framing

## 7. Component-Level Requirements

### 7.1 Editor Surface

- Minimal TipTap editor for MVP
- Fast typing performance
- Clear caret and selection visibility in dark mode
- No syntax-heavy IDE affordances required
- No toolbar, bubble menu, or formatting ribbon

**Acceptance criteria**

- Editor is immediately focusable and usable.
- Writing remains comfortable even though the editor is schema-based rather than raw Markdown text.
- Long text entry remains comfortable.

### 7.2 Empty/Initial States

- App should feel ready even before a file is opened
- Empty state should encourage writing or opening a file
- Empty state copy should stay minimal

**Acceptance criteria**

- First-time launch does not feel broken or blank.
- User has a clear next action: start writing or open a file.

### 7.3 Save and Error Feedback

- Subtle feedback for save status, autosave, or file errors
- Avoid disruptive modal behavior unless required for desktop-native flows
- Missing recent files should be reported clearly but lightly

**Acceptance criteria**

- User can tell whether content is unsaved, saved, or failed to save.
- Error states do not block the main writing flow unless necessary.

## 8. Core User Flows

### 8.1 Start Writing Immediately

- Launch app
- Focus editor
- Type in untitled draft
- Save later if desired

### 8.2 Open Existing File

- Launch app
- Use native open dialog or click recent file
- Continue editing in the main editor workspace

### 8.3 Resume Previous Work

- Launch app
- See recent files in sidebar
- Reopen last or nearby document quickly

### 8.4 Review Formatting While Writing

- Type in editor
- Observe structure directly in the editor surface
- Save to `.md` and continue editing without leaving the main workspace

## 9. Desktop-Specific UX Constraints

- Design for desktop window sizes, not mobile or responsive web breakpoints
- Prioritize mouse/trackpad interactions plus standard keyboard behavior
- Use native file dialogs for trust and familiarity
- macOS-first interaction polish is sufficient for MVP

## 10. Accessibility and Readability Baseline

- Adequate dark-mode contrast
- Keyboard-focus visibility
- Clickable sidebar items should have clear hit targets
- Font size should be readable at default desktop scale

## 11. UI Implementation Notes

- Keep the main shell composed of:
  - app frame/container
  - sidebar
  - editor workspace
  - lightweight status region
- Avoid introducing a complex command bar, ribbon, formatting toolbar, or selection menu in MVP
- Prefer simple reusable primitives over a large component system for the first release

## 12. Success Metrics for the UI

- User can start writing within seconds of launch
- File actions feel native and unsurprising
- The editor-first layout supports drafting without extra chrome
- Interface feels calmer than typical note apps
- Sidebar improves re-entry without turning into navigation overhead
