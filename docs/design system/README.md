# H3 Ink Design System

This document defines the shared UI/UX direction for H3 Ink.

H3 Ink should feel minimal, calm, and linear. The product should guide the user forward with as little UI as possible. If an element does not improve focus, orientation, or the next action, it should be removed.

The intended feeling is close to ChatGPT at its best: simple, quiet, obvious, and highly readable. The interface should not feel like a dashboard. It should feel like a tool for thought.

## Core Principles

- Default to the simplest workable layout.
- Prefer linear UI over branching UI.
- Show one clear path forward.
- Use structure, spacing, and typography before using decoration.
- Keep the shell quieter than the content.
- Let empty space do real work.
- Remove copy before removing whitespace.
- Do not add chrome just because space exists.

## Visual Language

### Color

- The source of truth for color tokens is [packages/ui/src/styles.css](/Users/howardthomas/Desktop/h3ink/packages/ui/src/styles.css).
- App-level shell backgrounds or surface treatments can be layered in each app's global CSS, but they should still derive from the shared token system.
- Keep the palette monochrome or near-monochrome.
- Keep contrast functional and quiet.
- Avoid accent colors for personality or branding.
- Use fills, borders, and opacity to separate layers.
- Treat the docs here as color direction, not as a hardcoded palette definition.

### Typography

- Use a modern sans-serif for UI surfaces.
- Use monospace only for note content, code, or technical metadata.
- Keep type scales tight and simple.
- Default UI button and list-row text to `text-[0.82rem]` when possible.
- Favor weight and spacing over large jumps in size.
- Make labels calm and understated.

### Layout

- Build around stable structure and generous whitespace.
- Let the eye move in a simple order: navigation, active context, content.
- Avoid dense toolbar clusters.
- Avoid multiple surfaces competing equally for attention.
- Prefer one strong canvas instead of many framed panels.

### Surfaces

- Use flat or nearly flat surfaces with subtle borders.
- Keep shadows minimal and functional.
- Avoid turning every grouping into a card.
- Avoid ornamental gradients, textures, and decorative effects.
- Treat empty space as a feature, not as an unfinished area.

## Interaction Principles

- Interactions should feel immediate and predictable.
- Hover states should be quiet.
- Focus states must remain visible.
- Motion should be sparse and short.
- Empty states should be almost invisible.
- If an empty state works with a mark, a short label, and a short title, stop there.
- Avoid “helpful” UI that interrupts the user’s flow.

## Desktop App Guidelines

### Product Feel

- The desktop app is the primary product surface.
- The app should feel more like a writing tool than a productivity suite.
- Keep chrome minimal and predictable.
- Make the writing surface the visual center of the experience.
- The shell should feel native, quiet, and low ceremony.

### Sidebar Shell

- Treat the sidebar as a quiet outline, not a feature surface.
- Put brand identity at the top.
- After branding, show only the smallest useful set of navigation groups.
- Default to collapsible groups such as `Pinned` and `Recent`.
- Keep note rows compact.
- Note rows should usually be just the note title.
- Avoid per-row metadata unless it changes the user’s next decision.
- Avoid icons on every note row unless they are necessary.
- Reserve filled pills for the selected row only.
- Prefer disclosure, spacing, and typography over cards, badges, and dividers.
- The sidebar should stay visually lighter than the content area.

### Top Chrome

- Use top chrome only when it helps the current task.
- Keep labels short and quiet.
- If a control is not helping orientation or action, remove it.
- Avoid decorative headers and toolbars.

### Writing Surface

- Keep the main content area open and calm.
- Prioritize readability and low-friction editing.
- Keep supporting UI out of the way of note content.
- Use empty states with restraint.
- Do not let placeholders feel like marketing sections.

### Desktop UI Boundaries

- Do not overload the shell with menus, badges, quick filters, or supporting panels.
- Do not make the sidebar visually louder than the main canvas.
- Do not build rich list rows when plain text rows are enough.
- Do not add explanatory copy where a clear label is enough.
- Do not make empty states more visually complex than the real feature will be.

## Web App Guidelines

- The website is a marketing and download surface, not a second app.
- Keep the website aligned with the same calm, restrained visual language.
- Use concise sections and minimal navigation.
- Avoid over-designed marketing patterns that do not resemble the product.

## Accessibility Baseline

- Maintain strong contrast between text and surfaces.
- Support keyboard navigation for all meaningful controls.
- Keep focus visible at all times.
- Avoid relying on color alone to communicate state.
- Use readable font sizes and line heights.
- Respect reduced-motion preferences.

## What To Avoid

- Colorful branding systems.
- Dense dashboards.
- Decorative UI that does not support the task.
- Large note cards in the sidebar.
- Rich metadata on every row.
- Empty states with long explanations.
- Multiple primary actions on the same screen.
- Surfaces that compete equally for attention.

## Design Check

Before shipping a screen, ask:

- Can this be simpler?
- Is the next action obvious?
- Can I remove a label, border, card, or line of copy without losing clarity?
- Does the screen feel linear rather than branching?
- Is the content more visually important than the chrome?
- Would this still feel good if it were only black, white, and gray?

## References

- Yes, screenshots are useful here.
- Keep them curated and few.
- Prefer 2-4 approved screenshots of canonical product states.
- Use them as principle anchors, not pixel-perfect specs.
- Good candidates are:
- the minimal desktop landing shell
- an open note view
- the future split editor and preview view
