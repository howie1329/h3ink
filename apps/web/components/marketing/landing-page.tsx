import Image from "next/image"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@h3ink/ui/components/button"
import { cn } from "@h3ink/ui/lib/utils"
import { ThemeToggle } from "@/components/marketing/theme-toggle"
import {
  detailHighlights,
  footerLinks,
  hero,
  productDetail,
  roadmap,
  waitlist,
  whyH3Ink,
  workflowSteps
} from "@/lib/marketing-content"

function SectionLabel({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p
      className={cn(
        "text-2xs font-medium tracking-[0.28em] uppercase text-muted-foreground",
        className
      )}
    >
      {children}
    </p>
  )
}

function AppFrame() {
  return (
    <div className="landing-reveal landing-delay-2 relative mx-auto w-full max-w-[58rem] motion-reduce:translate-y-0 motion-reduce:opacity-100">
      <div className="pointer-events-none absolute inset-x-[12%] bottom-0 h-24 rounded-full bg-foreground/8 blur-3xl dark:bg-primary/10" />
      <div className="relative overflow-hidden rounded-[1.6rem] border border-white/12 bg-black text-white dark:border-white/10">
        <div className="border-b border-white/10 bg-white/[0.03] px-4 py-3 sm:px-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex items-center gap-1.5" aria-hidden>
                <span className="size-2 rounded-full bg-white/25" />
                <span className="size-2 rounded-full bg-white/18" />
                <span className="size-2 rounded-full bg-white/12" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white/92">
                  H3 Ink
                </p>
                <p className="text-2xs tracking-[0.22em] uppercase text-white/45">
                  writing session
                </p>
              </div>
            </div>
            <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-2xs font-medium tracking-[0.22em] uppercase text-white/55">
              local-first
            </div>
          </div>
        </div>

        <div className="grid min-h-[28rem] lg:grid-cols-[15rem_minmax(0,1fr)]">
          <aside className="border-b border-white/10 bg-white/[0.03] p-4 lg:border-r lg:border-b-0 lg:p-5">
            <div className="space-y-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <p className="text-2xs tracking-[0.2em] uppercase text-white/40">
                  Recent
                </p>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-white/94">
                    draft-essay.md
                  </div>
                  <div className="rounded-xl px-3 py-2 text-white/45">
                    daily-notes.md
                  </div>
                  <div className="rounded-xl px-3 py-2 text-white/45">
                    ideas.md
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                <p className="text-2xs tracking-[0.2em] uppercase text-white/40">
                  Native flows
                </p>
                <div className="mt-3 space-y-2 text-sm text-white/62">
                  <p>Open local Markdown</p>
                  <p>Save As when ready</p>
                  <p>Autosave after path exists</p>
                </div>
              </div>
            </div>
          </aside>

          <div className="grid lg:grid-cols-[minmax(0,1.15fr)_16rem]">
            <div className="border-b border-white/10 p-5 lg:border-r lg:border-b-0 lg:p-8">
              <div className="flex items-center justify-between text-2xs tracking-[0.22em] uppercase text-white/45">
                <span>Editor</span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-white/55">
                  autosave
                </span>
              </div>
              <div className="mt-7 max-w-2xl space-y-4 font-mono text-[0.95rem] leading-7 text-white/86">
                <p># Drafting without clutter</p>
                <p className="text-white/55">
                  The app keeps the file close and the chrome quiet.
                </p>
                <p>- Open a plain Markdown note from disk</p>
                <p>- Write with immediate rendered feedback</p>
                <p>- Save naturally through native desktop flows</p>
                <p className="text-white/38">
                  last opened: ~/notes/project-brief.md
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between bg-black/20 p-5 lg:p-6">
              <div>
                <p className="text-2xs tracking-[0.22em] uppercase text-white/40">
                  Preview
                </p>
                <div className="mt-5 space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/78">
                    Plain files stay portable
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/78">
                    Structure stays readable
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/78">
                    Recent context stays nearby
                  </div>
                </div>
              </div>
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm font-medium text-white/88">Path-backed note</p>
                <p className="mt-2 text-sm leading-relaxed text-white/52">
                  The MVP stays small on purpose: write, preview, save, return.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const navLinkClass =
  "rounded-full px-3 py-2 text-sm text-muted-foreground transition-[color,background-color,transform] duration-fast ease-snap hover:bg-overlay hover:text-foreground active:scale-[0.98] motion-reduce:transition-none"

const primaryButtonClass =
  "h-9 rounded-full px-4 text-sm font-medium transition-[color,background-color,border-color,transform] duration-fast ease-snap hover:bg-primary/88 active:scale-[0.98] motion-reduce:transition-none"

const secondaryButtonClass =
  "h-9 rounded-full border-border bg-transparent px-4 text-sm font-medium text-foreground transition-[color,background-color,border-color,transform] duration-fast ease-snap hover:bg-overlay active:scale-[0.98] motion-reduce:transition-none"

export function LandingPage() {
  return (
    <main className="overflow-x-hidden bg-background text-foreground">
      <section className="relative isolate overflow-hidden border-b border-border bg-background">
        <div className="absolute inset-0 -z-20 bg-linear-to-b from-subtle via-background to-background dark:from-black dark:via-black dark:to-background" />
        <div className="absolute inset-x-0 top-0 -z-10 h-[34rem] bg-linear-to-b from-foreground/[0.06] via-transparent to-transparent dark:from-white/[0.06]" />
        <div className="absolute inset-x-[20%] top-24 -z-10 h-56 rounded-full bg-primary/10 blur-3xl dark:bg-primary/18" />

        <div className="mx-auto flex w-full max-w-7xl flex-col px-4 pb-14 pt-5 sm:px-8 lg:px-10">
          <header className="landing-reveal flex items-center justify-between gap-4 rounded-full border border-border bg-background/88 px-3 py-2 backdrop-blur-sm motion-reduce:translate-y-0 motion-reduce:opacity-100">
            <a href="#" className="flex min-w-0 items-center gap-3 rounded-full px-2 py-1.5">
              <Image
                src="/icon-light.svg"
                alt="H3 Ink"
                width={32}
                height={32}
                className="size-8 shrink-0 rounded-full border border-border bg-card p-1.5 dark:hidden"
              />
              <Image
                src="/icon-dark.svg"
                alt="H3 Ink"
                width={32}
                height={32}
                className="hidden size-8 shrink-0 rounded-full border border-border bg-card p-1.5 dark:block"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold tracking-tight text-foreground">
                  H3 Ink
                </p>
                <p className="text-2xs tracking-[0.22em] uppercase text-muted-foreground">
                  local markdown
                </p>
              </div>
            </a>

            <div className="flex items-center gap-2">
              <nav className="hidden items-center gap-1 md:flex">
                <a href="#workflow" className={navLinkClass}>
                  Workflow
                </a>
                <a href="#detail" className={navLinkClass}>
                  Product
                </a>
                <a href="#roadmap" className={navLinkClass}>
                  Roadmap
                </a>
              </nav>
              <div className="flex items-center gap-1 rounded-full border border-border bg-background/86 p-1">
                <ThemeToggle />
              </div>
              <Button asChild className={primaryButtonClass}>
                <a href="#waitlist">{hero.primaryCta}</a>
              </Button>
            </div>
          </header>

          <div className="grid gap-12 pb-4 pt-12 lg:gap-16 lg:pt-18">
            <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
              <div className="max-w-2xl">
                <SectionLabel className="landing-reveal motion-reduce:translate-y-0 motion-reduce:opacity-100">
                  {hero.eyebrow}
                </SectionLabel>
                <div className="landing-reveal landing-delay-1 mt-6 motion-reduce:translate-y-0 motion-reduce:opacity-100">
                  <div className="mb-5 inline-flex rounded-full border border-border bg-background/72 px-3 py-1 text-2xs tracking-[0.22em] uppercase text-muted-foreground dark:bg-white/[0.03]">
                    {hero.badge}
                  </div>
                  <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.06em] text-foreground sm:text-6xl lg:text-[4.75rem] lg:leading-[0.94]">
                    {hero.title}
                  </h1>
                  <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                    {hero.description}
                  </p>
                </div>

                <div className="landing-reveal landing-delay-2 mt-8 flex flex-col gap-3 sm:flex-row motion-reduce:translate-y-0 motion-reduce:opacity-100">
                  <Button asChild className={primaryButtonClass}>
                    <a href="#waitlist">{hero.primaryCta}</a>
                  </Button>
                  <Button asChild variant="outline" className={secondaryButtonClass}>
                    <a href="#roadmap">{hero.secondaryCta}</a>
                  </Button>
                </div>
              </div>

              <div className="landing-reveal landing-delay-3 flex items-center justify-end self-stretch motion-reduce:translate-y-0 motion-reduce:opacity-100">
                <div className="grid w-full max-w-sm gap-3 text-sm leading-relaxed text-muted-foreground sm:max-w-md">
                  <p>
                    Desktop-first writing for people who want local files, clear
                    feedback, and fewer interface decisions between thought and
                    draft.
                  </p>
                  <p>
                    The MVP is intentionally narrow: open, write, preview, save,
                    and return quickly.
                  </p>
                </div>
              </div>
            </div>

            <AppFrame />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-18 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:px-10">
          <div>
            <SectionLabel>{whyH3Ink.label}</SectionLabel>
            <h2 className="mt-5 max-w-xl text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
              {whyH3Ink.title}
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            {whyH3Ink.description}
          </p>
        </div>
      </section>

      <section id="workflow" className="border-b border-border bg-subtle/55">
        <div className="mx-auto w-full max-w-6xl px-4 py-18 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <SectionLabel>Workflow</SectionLabel>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
              Four small steps, one calm writing loop.
            </h2>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-[1.75rem] border border-border bg-border md:grid-cols-2 xl:grid-cols-4">
            {workflowSteps.map((step, index) => (
              <article
                key={step.title}
                className="flex h-full flex-col bg-background p-6 sm:p-7"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-2xs tracking-[0.22em] uppercase text-muted-foreground">
                    {step.index}
                  </p>
                  {index < workflowSteps.length - 1 ? (
                    <ArrowRight
                      className="hidden size-4 text-foreground-subtle xl:block"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  ) : null}
                </div>
                <h3 className="mt-10 text-xl font-semibold tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="detail" className="border-b border-border bg-background">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-18 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:px-10">
          <div>
            <SectionLabel>{productDetail.label}</SectionLabel>
            <h2 className="mt-5 max-w-xl text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
              {productDetail.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
              {productDetail.description}
            </p>
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-border">
            <div className="grid gap-px bg-border">
              {detailHighlights.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 bg-subtle/60 px-5 py-5"
                >
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-primary"
                    strokeWidth={1.6}
                    aria-hidden
                  />
                  <p className="text-sm leading-7 text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="roadmap" className="border-b border-border bg-subtle/45">
        <div className="mx-auto w-full max-w-6xl px-4 py-18 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <SectionLabel>{roadmap.label}</SectionLabel>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
              {roadmap.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-muted-foreground">
              {roadmap.description}
            </p>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-[1.75rem] border border-border bg-border lg:grid-cols-3">
            {roadmap.columns.map((column, index) => (
              <article
                key={column.title}
                className={cn(
                  "bg-background p-6 sm:p-7",
                  index === 0 && "bg-primary-subtle/70 dark:bg-primary-subtle/40"
                )}
              >
                <p className="text-sm font-semibold tracking-wide text-foreground">
                  {column.title}
                </p>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {column.body}
                </p>
                <ul className="mt-6 space-y-3">
                  {column.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm leading-7 text-foreground">
                      <Check
                        className="mt-1 size-4 shrink-0 text-primary"
                        strokeWidth={1.6}
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="waitlist" className="bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-18 sm:px-8 lg:px-10">
          <div className="overflow-hidden rounded-[2rem] border border-border bg-subtle/70">
            <div className="grid gap-px bg-border lg:grid-cols-[minmax(0,1.1fr)_minmax(22rem,0.9fr)]">
              <div className="bg-background px-6 py-8 sm:px-8 sm:py-10">
                <SectionLabel>{waitlist.label}</SectionLabel>
                <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
                  {waitlist.title}
                </h2>
                <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
                  {waitlist.description}
                </p>
              </div>

              <div className="bg-subtle/85 px-6 py-8 sm:px-8 sm:py-10">
                <div className="rounded-[1.5rem] border border-border bg-background p-3">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="flex h-11 flex-1 items-center rounded-full border border-border bg-subtle px-4 text-sm text-muted-foreground">
                      {waitlist.inputLabel}
                    </div>
                    <Button className={primaryButtonClass}>
                      {hero.primaryCta}
                    </Button>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  No fake signup flow. This section defines the launch shape
                  without pretending the final plumbing already exists.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <div>
            <p className="text-sm font-semibold tracking-tight text-foreground">
              H3 Ink
            </p>
            <p className="mt-2 max-w-md text-sm leading-7 text-muted-foreground">
              A desktop-first writing app for local Markdown notes. Calm,
              portable, and intentionally narrow in its first release.
            </p>
          </div>
          <nav className="flex flex-wrap gap-5 text-sm font-medium">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-muted-foreground transition-[color,transform] duration-fast ease-snap hover:text-foreground active:scale-[0.98] motion-reduce:transition-none"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </main>
  )
}
