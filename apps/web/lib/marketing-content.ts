export const hero = {
  eyebrow: "Desktop-first Markdown writing",
  title: "A calm home for local notes that still live as plain files.",
  description:
    "H3 Ink is a focused writing app for people who want native file flows, immediate Markdown feedback, and an interface quiet enough to disappear behind the draft.",
  primaryCta: "Join the waitlist",
  secondaryCta: "Read the roadmap",
  badge: "macOS-first MVP"
}

export const whyH3Ink = {
  label: "Why H3 Ink",
  title: "Writing software should help you stay with the sentence, not the system.",
  description:
    "H3 Ink keeps Markdown portable, keeps the window restrained, and keeps the filesystem in the loop from the start."
}

export const workflowSteps = [
  {
    index: "01",
    title: "Open a real file",
    body: "Pick up any local `.md` note through native dialogs instead of importing it into a hidden library."
  },
  {
    index: "02",
    title: "Write without chrome",
    body: "Stay in a clean editor that favors readable structure over toolbars, floating controls, and extra UI."
  },
  {
    index: "03",
    title: "Check the rendered shape",
    body: "Use the built-in preview to verify headings, lists, links, blockquotes, and code blocks while the draft is still moving."
  },
  {
    index: "04",
    title: "Save naturally",
    body: "Path-backed files autosave after a short delay, while unsaved drafts stay in memory until you explicitly choose Save As."
  }
]

export const detailHighlights = [
  "Works directly with plain `.md` files on disk",
  "Native open, save, and save as flows",
  "Recent files sidebar for quick return",
  "Restrained writing surface with very little chrome"
]

export const productDetail = {
  label: "Product detail",
  title: "The first release is intentionally narrow.",
  description:
    "H3 Ink is not trying to replace your folders, become a collaboration suite, or hide notes behind a proprietary database. It is a small desktop tool for local writing that stays believable because the scope stays tight."
}

export const roadmap = {
  label: "Roadmap",
  title: "A small roadmap that keeps the promise believable.",
  description:
    "The release story stays grounded in what the MVP actually does now and what comes next without changing the core idea.",
  columns: [
    {
      title: "Now",
      body: "The smallest useful version of H3 Ink.",
      items: [
        "Split-pane editor and live preview",
        "Native open, save, and save as flows",
        "Autosave for path-backed files",
        "Recent files sidebar"
      ]
    },
    {
      title: "Next",
      body: "Sharper desktop polish once the core writing loop is stable.",
      items: [
        "Packaging and download readiness",
        "Refined writing surface rhythm",
        "More confidence around persistence flows"
      ]
    },
    {
      title: "Out of scope",
      body: "Things the first milestone deliberately refuses.",
      items: [
        "No cloud sync or collaboration",
        "No app-managed note database",
        "No browser-based editor"
      ]
    }
  ]
}

export const waitlist = {
  label: "Waitlist",
  title: "Follow the first release without a noisy launch funnel.",
  description:
    "The signup flow is not wired up yet. The CTA stays here to define the launch shape honestly instead of pretending the backend already exists.",
  inputLabel: "Waitlist email coming soon"
}

export const footerLinks = [
  { label: "Workflow", href: "#workflow" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Waitlist", href: "#waitlist" }
]
