# H3 Ink Design System

This document defines the shared UI/UX direction for the desktop app and the website.

The goal is a calm, modern, minimal interface that helps people write, read, and act without visual noise. The system should feel deliberate, quiet, and highly usable. If something does not improve clarity or interaction, it should not be added.

## Core Principles

- Keep the interface restrained. Show only what the user needs right now.
- Favor strong hierarchy over decoration.
- Make interaction obvious through motion, spacing, contrast, and state changes.
- Use monochrome surfaces and neutral grays only.
- Prefer clear structure over dense UI chrome.
- Design for focus. Every screen should support a single primary task.

## Visual Language

### Color

- Use only black, white, and neutral grays.
- Treat contrast as a functional tool, not a decorative one.
- Use borders, fills, opacity, and surface elevation to separate layers.
- Do not introduce accent colors for branding or flavor.

### Typography

- Use a modern sans-serif for UI and marketing surfaces.
- Use a monospace face only where file content, code, or technical metadata benefits from it.
- Keep type scales simple and easy to scan.
- Prefer short line lengths for reading-heavy content.
- Use weight and spacing before using size jumps.

### Layout

- Build around generous whitespace.
- Keep the primary action easy to find.
- Group related controls tightly and separate unrelated areas clearly.
- Avoid dense toolbar clusters and unnecessary supporting text.
- Prefer stable layouts that do not shift as the user works.

### Surfaces

- Use clean panels with subtle borders and low-contrast fills.
- Keep shadows minimal and functional.
- Reserve strong contrast for the active editing surface or primary call to action.
- Avoid visual texture, ornamental gradients, and unnecessary background imagery.

## Interaction Principles

- Interactions should feel fast and predictable.
- Hover states should be subtle, not flashy.
- Focus states must be clearly visible and keyboard-friendly.
- Active and pressed states should feel immediate.
- Empty states should guide the next action without overexplaining.
- Loading states should be calm and brief.
- Error states should be direct and actionable.

### Motion

- Use motion sparingly.
- Motion should explain change, not decorate it.
- Keep transitions short and smooth.
- Avoid large or distracting animations.
- Respect reduced-motion preferences.

## Desktop App Guidelines

### Product Feel

- The desktop app is the primary product surface.
- The interface should stay out of the way of writing.
- Keep chrome minimal and predictable.
- Make the editor the visual center of the experience.

### Writing Surface

- Prioritize clarity, readability, and low-friction editing.
- Keep the split view simple and easy to parse.
- Make file state, save state, and recent context visible without crowding the canvas.
- Use a clear monospace editor style.
- Avoid persistent controls that are not needed while writing.

### Desktop Interaction

- Resizing, opening, saving, and switching files should feel immediate.
- Recent files should be easy to return to, but never dominate the interface.
- Autosave and persistence feedback should be quiet and trustworthy.
- Native file dialogs and filesystem actions should feel familiar and low ceremony.

### Desktop UI Boundaries

- Do not overload the shell with menus, badges, or secondary actions.
- Keep sidebar content compact and scannable.
- Use labels and spacing to clarify state instead of stacking explanatory text.
- Let the content area carry the experience, not the chrome.

## Web App Guidelines

### Product Role

- The website is a marketing and download surface, not a second app experience.
- It should communicate the product clearly and honestly.
- The web experience should mirror the desktop product’s restraint.

### Web Layout

- Lead with a single clear value proposition.
- Use sections to explain the product, not to prove visual complexity.
- Keep content blocks concise and purposeful.
- Avoid overcrowding the page with too many selling points at once.

### Web Interaction

- Calls to action should be obvious and few in number.
- Navigation should be minimal and scannable.
- Motion should support emphasis and flow, not compete with the message.
- Product previews should feel like a real interface, not a gimmick.

## Accessibility Baseline

- Maintain strong contrast between text and surfaces.
- Support keyboard navigation across all meaningful controls.
- Keep focus visible at all times.
- Avoid relying on color alone to communicate state.
- Use readable text sizes and line heights.
- Respect reduced-motion preferences and avoid motion-heavy transitions.

## What To Avoid

- Colorful branding systems.
- Dense dashboards and information overload.
- Decorative UI that does not help the task.
- Competing visual effects.
- Hidden controls that only appear after trial and error.
- Walls of explanatory copy.

## Design Check

Before shipping a screen, ask:

- Does this help the user focus?
- Is the primary action obvious?
- Can I remove any controls, labels, or surfaces without losing clarity?
- Does the interaction feel calm and immediate?
- Would this still work if the only colors were black, white, and gray?

If the answer to the last question is no, the design is probably relying on decoration instead of structure.
