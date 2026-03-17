export const hero = {
  eyebrow: "Desktop-first Markdown writing",
  title: "A calm home for local notes that still live as plain files.",
  description:
    "H3 Ink is a focused writing app for people who want immediate Markdown feedback, native file dialogs, and a minimal interface that stays out of the way.",
  primaryCta: "Join the waitlist",
  secondaryCta: "See the roadmap",
  note: "Marketing site for the desktop app. Browser-based editing is not part of the MVP."
}

export const valuePillars = [
  {
    title: "Plain `.md` files",
    description:
      "Open, edit, and save real Markdown files on disk instead of working inside a proprietary note library."
  },
  {
    title: "Live split-pane preview",
    description:
      "Write on one side and verify the rendered output on the other without leaving your flow."
  },
  {
    title: "Quiet by default",
    description:
      "Very little chrome, a dark writing surface, and room to focus on the document instead of the tooling."
  }
]

export const featureColumns = [
  {
    title: "Built for the first useful version",
    description:
      "The MVP is intentionally narrow: a fast desktop editor for local Markdown notes with the core behaviors writers expect.",
    items: [
      "Create new notes and save with Save As",
      "Open existing Markdown files from native dialogs",
      "Autosave path-backed files after a short debounce",
      "Reopen recent files from a lightweight sidebar"
    ]
  },
  {
    title: "Portable, familiar, and local",
    description:
      "H3 Ink is designed to work with your filesystem, not replace it.",
    items: [
      "macOS-first desktop experience",
      "Common Markdown basics in preview",
      "No app-managed database in the MVP",
      "No cloud sync or collaboration in the first milestone"
    ]
  }
]

export const principles = [
  {
    title: "Restraint over feature sprawl",
    body: "The product should feel calm and deliberate, not crowded with every possible workflow."
  },
  {
    title: "Local-first as a product decision",
    body: "Your files stay portable and understandable because the app works directly with Markdown on disk."
  },
  {
    title: "Fast feedback while writing",
    body: "Preview, autosave, and recent context exist to keep momentum high once the cursor is moving."
  }
]

export const roadmap = [
  {
    title: "Now",
    description: "The smallest real version of H3 Ink.",
    items: [
      "Split-pane editor and live preview",
      "Native open, save, and save as flows",
      "Autosave for path-backed files",
      "Recent files sidebar"
    ]
  },
  {
    title: "Next",
    description: "Sharper desktop polish after the core workflow lands.",
    items: [
      "Packaging and download readiness",
      "Refined writing surface and layout polish",
      "More confidence around file persistence"
    ]
  },
  {
    title: "Later",
    description: "Deeper workflow improvements without changing the product philosophy.",
    items: [
      "Broader platform support",
      "More thoughtful preview and writing ergonomics",
      "Extensions that keep files portable"
    ]
  }
]

export const footerLinks = [
  { label: "Roadmap", href: "#roadmap" },
  { label: "Principles", href: "#principles" },
  { label: "Waitlist", href: "#waitlist" }
]
