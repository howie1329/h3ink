# Design System — H3 / Linear-Inspired

> **Purpose**: Source of truth for all UI/UX decisions across H3 projects.  
> **Stack**: React · Vite · **Tailwind CSS v4** (CSS-first config) · ShadCN · Lucide React  
> Feed this file to Codex, Cursor, or any AI tool at the start of every UI task.

### Tailwind v4 (no `tailwind.config.ts` for theme)

Theme extensions live in CSS with `@theme` / `@theme inline`, alongside `@import "tailwindcss"`. Color and radius tokens are wired from `:root` / `.dark` HSL variables into utilities (e.g. `--color-surface` → `bg-surface`). Use `@source` in the stylesheet that Tailwind scans so classes in `packages/ui` and app `src/` are included.

Dark mode: prefer a CSS variant such as `@custom-variant dark (&:is(.dark *));` and toggle `.dark` on `<html>` (e.g. via `next-themes` or your own store)—do not rely on a `darkMode` key in a JS config file.

---

## 0. Philosophy

- **Precision over decoration.** Every pixel is intentional. If you can remove it, remove it.
- **Both modes are first-class.** Light and dark are equally polished. Neither is an afterthought.
- **Density with breathing room.** Pack information tightly, but give the eye a place to rest.
- **Speed is a feature.** Animations are fast (100–200ms). Nothing lingers.
- **Systematic consistency.** If a value isn't in this doc, it doesn't exist in the UI.

---

## 1. Typography — fonts & type scale

**Default stack (Vite + React):** load **Geist** from npm (e.g. Fontsource variable packages) and import them once in your app entry CSS—**not** via `<link>` tags or ad-hoc `@import` URLs in random components.

```css
/* e.g. src/index.css — before or after Tailwind, per package docs */
@import "@fontsource-variable/geist-sans";
@import "@fontsource-variable/geist-mono";
```

Point Tailwind at those families via `@theme` (see below). The shared UI package may set `--font-sans` / `--font-mono` on `:root` to match.

**Optional — Next.js:** you may use `next/font/google` for Geist and apply the generated `variable` classes on `<html>` / `<body>` instead of Fontsource; still map `--font-sans` / `--font-mono` in `@theme` the same way.

### Tailwind v4 — `fontFamily` + type scale (`@theme`)

Define families on `:root` (or let Fontsource set them), then expose them to Tailwind’s `font-sans` / `font-mono` utilities:

```css
:root {
  --font-sans: "Geist Variable", "Geist", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "Geist Mono Variable", "Geist Mono", ui-monospace, monospace;
}

@theme inline {
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
}
```

@theme {
  --text-2xs: 10px;
  --text-2xs--line-height: 1.4;
  --text-2xs--letter-spacing: 0.02em;
  --text-xs: 11px;
  --text-xs--line-height: 1.5;
  --text-sm: 13px;
  --text-sm--line-height: 1.5;
  --text-base: 14px;
  --text-base--line-height: 1.6;
  --text-md: 15px;
  --text-md--line-height: 1.5;
  --text-lg: 17px;
  --text-lg--line-height: 1.4;
  --text-lg--letter-spacing: -0.01em;
  --text-xl: 20px;
  --text-xl--line-height: 1.3;
  --text-xl--letter-spacing: -0.01em;
  --text-2xl: 24px;
  --text-2xl--line-height: 1.25;
  --text-2xl--letter-spacing: -0.02em;
  --text-3xl: 30px;
  --text-3xl--line-height: 1.2;
  --text-3xl--letter-spacing: -0.02em;
  --text-4xl: 38px;
  --text-4xl--line-height: 1.1;
  --text-4xl--letter-spacing: -0.03em;
}
```

### Typography Rules

- Default body: `text-sm text-muted-foreground font-normal`
- UI labels (buttons, nav, tabs): `text-sm font-medium`
- Headings: `font-semibold tracking-tight`
- ALL CAPS labels: `text-2xs font-medium tracking-widest uppercase` — use sparingly
- Mono font (`font-mono`): code, IDs, version strings, technical values only
- No gradient text or text-shadows in app UI — only in marketing contexts

---

## 2. Color System

Colors live in your **Tailwind entry CSS** (e.g. app `globals.css` or `packages/ui` `styles.css`) as custom properties (HSL, ShadCN convention). They are consumed exclusively through **Tailwind semantic class names** — never raw hex or CSS vars in components. One class name works in both light and dark mode automatically.

### `globals.css`

```css
@layer base {
  :root {
    /* ── LIGHT MODE ─────────────────────────────────────────── */

    /* Backgrounds — layered from base to most elevated */
    --background: 0 0% 100%; /* #ffffff  — app canvas */
    --background-subtle: 0 0% 98%; /* #fafafa  — page tint */
    --surface: 0 0% 96%; /* #f5f5f5  — cards, panels */
    --surface-raised: 0 0% 93%; /* #ededed  — elevated cards */
    --overlay: 240 5% 90%; /* #e3e3e6  — hover, selected */

    /* Text */
    --foreground: 240 6% 10%; /* #17171a  — primary */
    --foreground-muted: 240 4% 46%; /* #717180  — secondary */
    --foreground-subtle: 240 3% 68%; /* #ababb4  — tertiary / disabled */

    /* Borders */
    --border: 240 5% 88%; /* #dddde0 */
    --border-strong: 240 5% 78%; /* #c3c3c8 */
    --input: 240 5% 88%;

    /* Accent / Primary */
    --primary: 237 56% 57%; /* #5e6ad2 */
    --primary-foreground: 0 0% 100%;
    --primary-subtle: 237 56% 95%; /* #eef0fb */

    /* ShadCN-required vars */
    --card: 0 0% 100%;
    --card-foreground: 240 6% 10%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 6% 10%;
    --secondary: 240 5% 96%;
    --secondary-foreground: 240 6% 10%;
    --muted: 240 5% 93%;
    --muted-foreground: 240 4% 46%;
    --accent: 240 5% 93%;
    --accent-foreground: 240 6% 10%;
    --destructive: 0 72% 51%; /* #d63232 */
    --destructive-foreground: 0 0% 100%;
    --ring: 237 56% 57%;

    /* Semantic status */
    --success: 158 55% 42%; /* #3a9e76 */
    --success-subtle: 158 55% 95%;
    --warning: 35 90% 48%; /* #e5930d */
    --warning-subtle: 35 90% 95%;
    --info: 214 80% 52%; /* #2d7ee0 */
    --info-subtle: 214 80% 95%;

    --radius: 6px;
  }

  .dark {
    /* ── DARK MODE ──────────────────────────────────────────── */

    /* Backgrounds */
    --background: 240 7% 7%; /* #0e0e12  — app canvas */
    --background-subtle: 240 6% 9%; /* #131317  — page tint */
    --surface: 240 6% 11%; /* #18181e  — cards, panels */
    --surface-raised: 240 5% 14%; /* #1f1f26  — elevated cards */
    --overlay: 240 5% 18%; /* #28282f  — hover, selected */

    /* Text */
    --foreground: 240 5% 94%; /* #ededf0  — primary */
    --foreground-muted: 240 4% 56%; /* #8a8a96  — secondary */
    --foreground-subtle: 240 3% 36%; /* #585862  — tertiary / disabled */

    /* Borders */
    --border: 240 5% 18%; /* #28282f */
    --border-strong: 240 5% 26%; /* #3c3c46 */
    --input: 240 5% 18%;

    /* Accent / Primary — slightly lighter for contrast on dark bg */
    --primary: 237 55% 67%; /* #7b85dc */
    --primary-foreground: 240 7% 7%;
    --primary-subtle: 237 30% 17%; /* #20224a */

    /* ShadCN-required vars */
    --card: 240 6% 11%;
    --card-foreground: 240 5% 94%;
    --popover: 240 5% 14%;
    --popover-foreground: 240 5% 94%;
    --secondary: 240 5% 14%;
    --secondary-foreground: 240 5% 94%;
    --muted: 240 5% 14%;
    --muted-foreground: 240 4% 56%;
    --accent: 240 5% 18%;
    --accent-foreground: 240 5% 94%;
    --destructive: 0 65% 58%; /* #d95050 */
    --destructive-foreground: 240 5% 94%;
    --ring: 237 55% 67%;

    /* Semantic status */
    --success: 158 45% 52%; /* #4cad89 */
    --success-subtle: 158 30% 13%;
    --warning: 35 75% 55%; /* #e0993a */
    --warning-subtle: 35 40% 13%;
    --info: 214 70% 62%; /* #5b99e8 */
    --info-subtle: 214 40% 13%;
  }
}
```

### Tailwind v4 — semantic color utilities (`@theme`)

Map HSL components from `:root` / `.dark` into Tailwind color tokens. Use `hsl(var(--token) / <alpha-value>)` so opacity modifiers (`bg-primary/90`) work.

```css
@theme inline {
  --color-background: hsl(var(--background));
  --color-subtle: hsl(var(--background-subtle));
  --color-surface: hsl(var(--surface));
  --color-surface-raised: hsl(var(--surface-raised));
  --color-overlay: hsl(var(--overlay));

  --color-foreground: hsl(var(--foreground));
  --color-foreground-muted: hsl(var(--foreground-muted));
  --color-foreground-subtle: hsl(var(--foreground-subtle));

  --color-border: hsl(var(--border));
  --color-border-strong: hsl(var(--border-strong));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));

  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-primary-subtle: hsl(var(--primary-subtle));

  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));
  --color-popover: hsl(var(--popover));
  --color-popover-foreground: hsl(var(--popover-foreground));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));

  --color-success: hsl(var(--success));
  --color-success-subtle: hsl(var(--success-subtle));
  --color-warning: hsl(var(--warning));
  --color-warning-subtle: hsl(var(--warning-subtle));
  --color-info: hsl(var(--info));
  --color-info-subtle: hsl(var(--info-subtle));
}
```

Utilities: `bg-subtle`, `bg-surface`, `text-foreground-muted`, `text-foreground-subtle`, `border-border-strong`, `bg-primary-subtle`, `text-success`, `bg-success-subtle`, etc., per Tailwind v4 naming (`--color-{name}` → `bg-{name}`, `text-{name}`, …). Align any ShadCN-generated `--color-*` entries so they are not duplicated or conflicting.

### Color Usage Rules

- **Always use semantic Tailwind class names** — `bg-surface`, `text-muted-foreground`, `border-border`, etc.
- Never write `bg-[#18181e]`, `text-[#8a8a96]`, or inline `var(--foreground)` in components.
- Background layering order (shallowest → deepest): `background → subtle → surface → surface-raised → overlay` (classes: `bg-background`, `bg-subtle`, `bg-surface`, …)
- Semantic colors (`success`, `warning`, `destructive`, `info`) are for status indicators only — not decorative.
- One `primary` accent per view. Do not stack multiple accent-colored elements competing for attention.

---

## 3. Spacing

Tailwind's default spacing scale (base: 4px). No arbitrary values.

| Token   | px   | Usage                              |
| ------- | ---- | ---------------------------------- |
| `p-0.5` | 2px  | Icon nudge, micro gaps             |
| `p-1`   | 4px  | Dense internal padding             |
| `p-1.5` | 6px  | Compact badge / chip padding       |
| `p-2`   | 8px  | Button vertical, list item padding |
| `p-3`   | 12px | Button horizontal, input padding   |
| `p-4`   | 16px | Card padding, section gap          |
| `p-5`   | 20px | Comfortable card padding           |
| `p-6`   | 24px | Section spacing                    |
| `p-8`   | 32px | Page-level padding                 |
| `p-10`  | 40px | Large section breaks               |

Never use arbitrary values: `p-[7px]`, `mt-[11px]`, `gap-[18px]`.

---

## 4. Border Radius

Set `--radius: 6px` in `:root`. Extend Tailwind v4 radius tokens in CSS (maps to that base):

```css
@theme {
  --radius-sm: calc(var(--radius) - 2px);
  --radius-md: var(--radius);
  --radius-lg: calc(var(--radius) + 2px);
  --radius-xl: calc(var(--radius) + 6px);
  --radius-full: 9999px;
}
```

Rules:

- Buttons, inputs, selects: `rounded-md`
- Cards, dropdowns, sheets: `rounded-lg`
- Modals, command palettes: `rounded-xl`
- Badges, chips: `rounded-sm` or `rounded-full`
- Never mix radius sizes within the same component group

---

## 5. Elevation

Depth is communicated through **background layering + borders**, not shadows. Shadows are reserved only for elements that truly float above the page.

```css
@theme {
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08);
  --shadow-dark-md: 0 4px 12px rgba(0, 0, 0, 0.4);
  --shadow-dark-lg: 0 8px 32px rgba(0, 0, 0, 0.5);
}
```

- Surface cards: no shadow — use `border border-border` only
- Dropdowns, tooltips: `shadow-md dark:shadow-dark-md`
- Modals, command palettes: `shadow-lg dark:shadow-dark-lg`

---

## 6. Motion & Animation

```css
@theme {
  --duration-fast: 100ms;
  --duration-normal: 150ms;
  --duration-slow: 200ms;
  --duration-slower: 300ms;
  --ease-snap: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

Common patterns:

```tsx
// Standard hover
"transition-colors duration-fast hover:bg-overlay";

// Button active press
"transition-[background-color,opacity] duration-fast active:opacity-75";

// Modal enter (tailwindcss-animate or Radix)
"animate-in fade-in-0 zoom-in-95 duration-slow";

// Modal exit
"animate-out fade-out-0 zoom-out-95 duration-normal";

// Drawer slide-in
"animate-in slide-in-from-left duration-slow";
```

Rules:

- Every interactive element has a hover/active transition — never fully static
- Always specify what you're transitioning: `transition-colors`, `transition-[transform,opacity]` — never `transition-all`
- Modal/panel enter is slightly slower than exit
- Always add `motion-reduce:transition-none motion-reduce:animate-none` on animated elements

---

## 7. Component Patterns

All class strings below work in both light and dark mode without any `dark:` prefix on color tokens.

### Buttons

```tsx
// Primary
"bg-primary text-primary-foreground hover:bg-primary/90
 rounded-md px-3 h-8 text-sm font-medium
 transition-colors duration-fast ease-snap"

// Secondary
"bg-surface border border-border text-foreground
 hover:bg-surface-raised hover:border-border-strong
 rounded-md px-3 h-8 text-sm font-medium
 transition-colors duration-fast ease-snap"

// Ghost
"text-muted-foreground hover:bg-overlay hover:text-foreground
 rounded-md px-3 h-8 text-sm font-medium
 transition-colors duration-fast ease-snap"

// Destructive
"bg-destructive/10 text-destructive hover:bg-destructive/20
 rounded-md px-3 h-8 text-sm font-medium
 transition-colors duration-fast ease-snap"
```

Heights: `h-7` compact · `h-8` default · `h-9` comfortable

### Input / Textarea

```tsx
"bg-background border border-input text-foreground
 placeholder:text-foreground-subtle
 rounded-md px-3 h-8 text-sm w-full
 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
 transition-[border-color,box-shadow] duration-fast ease-snap"
```

Error state: add `border-destructive focus-visible:ring-destructive/50`

### Card

```tsx
// Static
"bg-card border border-border rounded-lg p-4 text-card-foreground"

// Interactive
"bg-card border border-border rounded-lg p-4 text-card-foreground
 hover:bg-surface-raised transition-colors duration-fast cursor-pointer"

// Floating (modal, popover, dropdown)
"bg-popover border border-border rounded-xl
 shadow-md dark:shadow-dark-md text-popover-foreground"
```

### Badge / Tag

```tsx
// Neutral
"bg-overlay text-muted-foreground rounded-sm px-2 py-0.5 text-xs font-medium";

// Primary
"bg-primary/10 text-primary rounded-sm px-2 py-0.5 text-xs font-medium";

// Success
"bg-success/10 text-success rounded-sm px-2 py-0.5 text-xs font-medium";

// Warning
"bg-warning/10 text-warning rounded-sm px-2 py-0.5 text-xs font-medium";

// Destructive
"bg-destructive/10 text-destructive rounded-sm px-2 py-0.5 text-xs font-medium";
```

### Sidebar Nav Item

```tsx
// Default
"flex items-center gap-2 px-3 h-8 rounded-md text-sm
 text-muted-foreground hover:bg-overlay hover:text-foreground
 transition-colors duration-fast ease-snap cursor-pointer"

// Active
"flex items-center gap-2 px-3 h-8 rounded-md text-sm
 font-medium text-foreground bg-overlay cursor-pointer"
```

### Divider

```tsx
<div className="border-t border-border my-1" />
<div className="border-l border-border mx-2 self-stretch" />
```

### Empty State

```tsx
<div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
  <Icon size={32} className="text-foreground-subtle" strokeWidth={1.5} />
  <p className="text-sm font-medium text-foreground">Nothing here yet</p>
  <p className="text-sm text-muted-foreground max-w-xs">
    Supporting description goes here.
  </p>
</div>
```

---

## 8. Iconography

- Library: **`lucide-react`** exclusively — never mix icon libraries in the same project
- Default `strokeWidth`: `1.5`
- Sizes:
  - `size={14}` — inline / dense list items
  - `size={16}` — standard UI (default)
  - `size={18}` — prominent actions, sidebar icons
  - `size={20}` — empty states, feature callouts
- Default color: `text-muted-foreground` → `text-foreground` on hover/active
- Icons in buttons: `gap-1.5` between icon and label text
- Icon-only buttons: must have `aria-label`

---

## 9. Layout

### Primary Pattern: Sidebar + Main

```tsx
<div className="flex h-screen bg-background">
  <aside className="w-56 shrink-0 border-r border-border bg-subtle flex flex-col">
    {/* sidebar nav — w-56 (14rem) ≈ 224px; adjust with standard spacing only */}
  </aside>
  <main className="flex-1 overflow-y-auto">
    <div className="max-w-4xl mx-auto px-8 py-6">{/* content */}</div>
  </main>
</div>
```

Content max-widths:

- Text / reading views: `max-w-2xl` (672px)
- Forms, settings: `max-w-xl` (560px)
- Dashboards, mixed layouts: `max-w-4xl` (896px)
- Data tables: full width, no max

### Z-Index Scale

```css
@theme {
  --z-base: 0;
  --z-raised: 10;
  --z-dropdown: 100;
  --z-modal: 200;
  --z-toast: 300;
  --z-tooltip: 400;
}
```

Utilities match your `@theme` keys (e.g. `--z-modal` → `z-modal` in Tailwind v4). When unsure, use the default numeric scale (`z-10`, `z-50`, …).

---

## 10. Theme Switching

Use **`next-themes`** (works with Vite + React) for system preference and a user toggle. Wrap the root in `ThemeProvider` (e.g. in `main.tsx` next to `createRoot`).

```tsx
// e.g. src/main.tsx
import { ThemeProvider } from "next-themes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <App />
    </ThemeProvider>
  </StrictMode>
);
```

In CSS, define the dark variant for Tailwind v4 (ShadCN-style):

```css
@custom-variant dark (&:is(.dark *));
```

Toggle:

```tsx
import { useTheme } from "next-themes";
const { theme, setTheme } = useTheme();
// cycle: 'system' → 'light' → 'dark'
```

Notes:

- `attribute="class"` adds `.dark` to `<html>` — pairs with `@custom-variant dark` above (no `darkMode` key in a JS config).
- `defaultTheme="system"` respects OS preference on first visit
- `disableTransitionOnChange` prevents background color flash on mode switch

---

## 11. ShadCN Integration

```bash
npx shadcn@latest init
# Style: New York | Base color: Neutral | CSS variables: Yes
# Tailwind v4: CLI targets CSS-first setup; theme lives in your stylesheet, not tailwind.config.js
```

After init:

1. Replace the generated `:root` / `.dark` blocks with the palette from Section 2 and merge `@theme` / `@theme inline` mappings (Section 2–6) so semantic utilities match this doc.
2. Set `--radius: 6px` — map radius tokens in `@theme` (Section 4) so `rounded-md` / `rounded-lg` / `rounded-xl` match the system.
3. ShadCN components (`bg-card`, `text-muted-foreground`, `border-input`, etc.) resolve to your tokens via shared CSS variables.

---

## 12. Do / Don't

| ✅ Do                                                           | ❌ Don't                                            |
| --------------------------------------------------------------- | --------------------------------------------------- |
| `bg-surface`, `text-muted-foreground` — semantic tokens         | `bg-[#18181e]`, `text-[#8a8a96]` — hardcoded values |
| Design `:root` (light) and `.dark` together                     | Design dark-only, patch light mode after            |
| Fontsource (Vite) or `next/font` (Next) once in entry layout/CSS | `<link>` tags or scattered `@import` for fonts      |
| Layer backgrounds for depth                                     | Use shadows for in-app surface elevation            |
| `transition-colors duration-fast` — explicit                    | `transition-all`                                    |
| `motion-reduce:transition-none` on all animated elements        | Ignore reduced motion preference                    |
| Tailwind default spacing (`p-3`, `gap-4`)                       | Arbitrary values (`p-[7px]`, `mt-[11px]`)           |
| `lucide-react` only, `strokeWidth={1.5}`                        | Mix icon libraries                                  |
| `rounded-md` buttons · `rounded-lg` cards · `rounded-xl` modals | Inconsistent radius                                 |
| `text-sm font-medium` for UI labels                             | Heavy weights on body copy                          |
| One `primary` accent per view                                   | Multiple competing accent-colored elements          |

---

## 13. AI Coding Instructions

Paste this block at the top of every Codex / Cursor task involving UI:

```
Reference DESIGN_SYSTEM.md as the source of truth for all styling. Non-negotiable rules:

1. COLORS — Tailwind semantic tokens only: bg-surface, text-muted-foreground, border-border,
   bg-primary, text-foreground, etc. Never hardcode hex values or write var(--x) in components.
   A single token works in both light and dark mode automatically.

2. FONTS — Geist loaded once via Fontsource in entry CSS (Vite) or next/font (Next).
   --font-sans / --font-mono on :root; @theme maps font-sans / font-mono. No extra <link> fonts.

3. BOTH MODES — Every component must look correct in light AND dark mode. Semantic tokens
   switch automatically. Only use dark: prefix for structural things (shadows, images).
   Never use dark: for color tokens that already switch via CSS vars.

4. SPACING — Tailwind default scale only. No arbitrary values (p-[7px] is forbidden).

5. TRANSITIONS — Always specify the property: transition-colors, transition-[transform,opacity].
   Use duration-fast (100ms) for interactions, duration-normal (150ms) for most transitions.
   Never use transition-all. Add motion-reduce:transition-none on all animated elements.

6. ICONS — lucide-react only. Default: size={16} strokeWidth={1.5}.

7. RADIUS — rounded-md for buttons/inputs, rounded-lg for cards/panels, rounded-xl for modals.

8. TAILWIND v4 — Theme in CSS (@theme, @source). No tailwind.config theme duplication.

9. SHADCN — New York style, neutral base; CSS variables match Section 2.
```

## Inspiration

1. docs/design system/images/Linear Web 0.png
2. docs/design system/images/Linear Web 68.png
