import Image from "next/image"
import { Check } from "lucide-react"
import { Button } from "@h3ink/ui/components/button"
import { cn } from "@h3ink/ui/lib/utils"
import {
  featureColumns,
  footerLinks,
  hero,
  principles,
  roadmap,
  valuePillars
} from "@/lib/marketing-content"
import { ThemeToggle } from "@/components/marketing/theme-toggle"

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
        "text-2xs font-medium tracking-widest uppercase text-muted-foreground",
        className
      )}
    >
      {children}
    </p>
  )
}

function ManifestoCard() {
  return (
    <article className="rounded-lg border border-border bg-card p-6 sm:p-7">
      <SectionLabel>Product shape</SectionLabel>
      <p className="mt-5 max-w-md text-lg font-medium leading-relaxed tracking-tight text-foreground">
        Built for people who want their notes to stay portable, readable, and
        close to the filesystem.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {valuePillars.map((pillar, index) => (
          <div
            key={pillar.title}
            className={cn(
              "rounded-lg border p-4 transition-colors duration-fast ease-snap motion-reduce:transition-none",
              index === valuePillars.length - 1
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-subtle hover:bg-surface"
            )}
          >
            <p
              className={cn(
                "text-2xs font-medium tracking-widest uppercase",
                index === valuePillars.length - 1
                  ? "text-primary-foreground/70"
                  : "text-muted-foreground"
              )}
            >
              0{index + 1}
            </p>
            <p
              className={cn(
                "mt-2 text-sm font-medium leading-relaxed",
                index === valuePillars.length - 1
                  ? "text-primary-foreground/90"
                  : "text-foreground"
              )}
            >
              {pillar.title}
            </p>
            <p
              className={cn(
                "mt-2 text-xs leading-relaxed",
                index === valuePillars.length - 1
                  ? "text-primary-foreground/75"
                  : "text-muted-foreground"
              )}
            >
              {pillar.description}
            </p>
          </div>
        ))}
      </div>
    </article>
  )
}

function PreviewPanel() {
  return (
    <section
      className="dark overflow-hidden rounded-lg border border-border shadow-lg dark:shadow-dark-lg"
      aria-label="Product preview"
    >
      <div className="bg-background text-foreground">
        <div className="flex items-center justify-between border-b border-border bg-subtle px-4 py-3 sm:px-5">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5" aria-hidden>
              <span className="size-2 rounded-full bg-foreground-subtle/40" />
              <span className="size-2 rounded-full bg-foreground-subtle/25" />
              <span className="size-2 rounded-full bg-foreground-subtle/15" />
            </div>
            <span className="text-2xs font-medium tracking-widest uppercase text-muted-foreground">
              Desktop preview
            </span>
          </div>
          <span className="rounded-full border border-border bg-overlay px-3 py-1 text-2xs font-medium tracking-widest uppercase text-muted-foreground">
            local-first
          </span>
        </div>

        <div className="grid min-h-80 md:min-h-96 md:grid-cols-[14rem_minmax(0,1fr)]">
          <aside className="border-b border-border bg-surface p-4 md:border-b-0 md:border-r">
            <div className="rounded-lg border border-border bg-card p-3">
              <p className="text-2xs font-medium tracking-widest uppercase text-muted-foreground">
                Workspace
              </p>
              <div className="mt-4 space-y-2 text-sm text-foreground">
                <div className="rounded-md bg-overlay px-3 py-2 font-medium">
                  meeting-notes.md
                </div>
                <div className="rounded-md px-3 py-2 text-muted-foreground">
                  draft-ideas.md
                </div>
                <div className="rounded-md px-3 py-2 text-muted-foreground">
                  writing-rules.md
                </div>
              </div>
            </div>
            <div className="mt-4 rounded-lg border border-border bg-surface-raised p-4">
              <p className="text-2xs font-medium tracking-widest uppercase text-muted-foreground">
                Recent
              </p>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                <p>Native open and save flows</p>
                <p>Path-backed autosave</p>
                <p>Fast file switching</p>
              </div>
            </div>
          </aside>

          <div className="grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="border-b border-border p-5 md:border-r md:border-b-0 md:p-6">
              <div className="flex items-center justify-between text-2xs font-medium tracking-widest uppercase text-muted-foreground">
                <span>Editor</span>
                <span className="rounded-full border border-border bg-overlay px-3 py-1 text-muted-foreground">
                  autosave
                </span>
              </div>
              <div className="mt-6 space-y-4 font-mono text-sm leading-relaxed text-foreground">
                <p># Drafting without clutter</p>
                <p className="text-muted-foreground">
                  H3 Ink keeps the file close and the chrome quiet.
                </p>
                <p>- Open a plain Markdown note</p>
                <p>- Write with rendered feedback in view</p>
                <p>- Save naturally to the filesystem</p>
                <p className="text-foreground-subtle">
                  last opened: notes/project-brief.md
                </p>
              </div>
            </div>

            <div className="bg-surface p-5 md:p-6">
              <div className="text-2xs font-medium tracking-widest uppercase text-muted-foreground">
                Preview
              </div>
              <div className="mt-6 rounded-lg border border-border bg-card p-6">
                <h3 className="text-2xl font-semibold tracking-tight text-card-foreground">
                  Drafting without clutter
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Desktop-first writing for local Markdown notes, with enough
                  structure to stay confident and enough restraint to stay calm.
                </p>
                <div className="mt-6 space-y-3">
                  <div className="rounded-md border border-border bg-subtle px-4 py-3 text-sm text-foreground">
                    Plain files remain portable
                  </div>
                  <div className="rounded-md border border-border bg-subtle px-4 py-3 text-sm text-foreground">
                    Live Markdown feedback while writing
                  </div>
                  <div className="rounded-md border border-border bg-subtle px-4 py-3 text-sm text-foreground">
                    Recent context without a heavy library view
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MarketingCard({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("rounded-lg border border-border bg-card", className)}>
      {children}
    </div>
  )
}

const btnPrimaryLanding =
  "h-9 rounded-md px-4 text-sm font-medium transition-colors duration-fast ease-snap motion-reduce:transition-none"

const btnOutlineLanding =
  "h-9 rounded-md border-border-strong bg-surface px-4 text-sm font-medium text-foreground transition-colors duration-fast ease-snap motion-reduce:transition-none hover:bg-surface-raised hover:border-border"

export function LandingPage() {
  return (
    <main className="relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-linear-to-b from-subtle to-transparent" />

      <div className="mx-auto flex w-full max-w-7xl flex-col px-5 pb-12 pt-5 sm:px-8 lg:px-10">
        <header className="sticky top-4 z-50 mb-10">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-lg border border-border bg-card/80 px-4 py-3 shadow-sm backdrop-blur-md dark:shadow-none">
            <a href="#" className="flex min-w-0 items-center gap-3">
              <Image
                src="/icon-light.svg"
                alt="H3 Ink"
                width={36}
                height={36}
                className="size-9 shrink-0 rounded-md border border-border bg-card p-1.5"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold tracking-tight text-foreground">
                  H3 Ink
                </p>
                <p className="text-2xs font-medium tracking-widest uppercase text-muted-foreground">
                  local markdown
                </p>
              </div>
            </a>
            <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
              <a
                href="#features"
                className="transition-colors duration-fast ease-snap motion-reduce:transition-none hover:text-foreground"
              >
                Features
              </a>
              <a
                href="#principles"
                className="transition-colors duration-fast ease-snap motion-reduce:transition-none hover:text-foreground"
              >
                Principles
              </a>
              <a
                href="#roadmap"
                className="transition-colors duration-fast ease-snap motion-reduce:transition-none hover:text-foreground"
              >
                Roadmap
              </a>
            </nav>
            <div className="flex shrink-0 items-center gap-2">
              <ThemeToggle />
              <Button asChild className={btnPrimaryLanding}>
                <a href="#waitlist">{hero.primaryCta}</a>
              </Button>
            </div>
          </div>
        </header>

        <section className="mx-auto grid w-full max-w-6xl gap-10 pb-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end">
          <div className="max-w-2xl">
            <SectionLabel>{hero.eyebrow}</SectionLabel>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-md">
              {hero.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className={btnPrimaryLanding}>
                <a href="#waitlist">{hero.primaryCta}</a>
              </Button>
              <Button asChild variant="outline" className={btnOutlineLanding}>
                <a href="#roadmap">{hero.secondaryCta}</a>
              </Button>
            </div>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">
              {hero.note}
            </p>
          </div>

          <ManifestoCard />
        </section>

        <section className="mx-auto w-full max-w-6xl space-y-4 pb-16">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <SectionLabel>Visual reference</SectionLabel>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Layout and density inspired by polished marketing surfaces—swap
                for H3 product shots when ready.
              </p>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <figure className="overflow-hidden rounded-lg border border-border bg-card">
              <Image
                src="/marketing/linear-web-0.png"
                alt="Reference: marketing layout and typography rhythm"
                width={1600}
                height={900}
                className="h-auto w-full object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </figure>
            <figure className="overflow-hidden rounded-lg border border-border bg-card">
              <Image
                src="/marketing/linear-web-68.png"
                alt="Reference: section structure and spacing"
                width={1600}
                height={900}
                className="h-auto w-full object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </figure>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl pb-16">
          <PreviewPanel />
        </section>

        <section
          id="features"
          className="mx-auto grid w-full max-w-6xl gap-6 pb-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
        >
          <MarketingCard className="p-7 sm:p-8">
            <SectionLabel>What the first version includes</SectionLabel>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-foreground">
              A real first release, shaped around the writing loop.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              The page should sound like the product itself: simple, direct, and
              honest about what exists today.
            </p>
          </MarketingCard>

          <div className="grid gap-6 md:grid-cols-2">
            {featureColumns.map((column) => (
              <MarketingCard
                key={column.title}
                className="p-7 transition-colors duration-fast ease-snap motion-reduce:transition-none hover:bg-surface-raised"
              >
                <h3 className="text-xl font-semibold tracking-tight text-foreground">
                  {column.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {column.description}
                </p>
                <ul className="mt-6 space-y-3 text-sm leading-relaxed text-foreground">
                  {column.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-primary"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </MarketingCard>
            ))}
          </div>
        </section>

        <section
          id="principles"
          className="mx-auto grid w-full max-w-6xl gap-6 pb-16 md:grid-cols-3"
        >
          {principles.map((principle) => (
            <MarketingCard
              key={principle.title}
              className="p-7 transition-colors duration-fast ease-snap motion-reduce:transition-none hover:bg-surface-raised"
            >
              <SectionLabel>Why H3 Ink</SectionLabel>
              <h2 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">
                {principle.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {principle.body}
              </p>
            </MarketingCard>
          ))}
        </section>

        <section id="roadmap" className="mx-auto w-full max-w-6xl pb-16">
          <div className="max-w-2xl">
            <SectionLabel>Roadmap</SectionLabel>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
              A light roadmap that keeps the promise small and believable.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              The next steps sharpen the desktop experience without changing the
              core idea: local files, clear feedback, and less noise.
            </p>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {roadmap.map((column, index) => (
              <MarketingCard
                key={column.title}
                className={cn(
                  "p-7",
                  index === 0 &&
                    "border-primary/20 bg-primary-subtle dark:border-primary/30"
                )}
              >
                <p className="text-sm font-semibold tracking-wide text-foreground">
                  {column.title}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {column.description}
                </p>
                <ul className="mt-6 space-y-3 text-sm leading-relaxed text-foreground">
                  {column.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-primary"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </MarketingCard>
            ))}
          </div>
        </section>

        <section id="waitlist" className="mx-auto w-full max-w-6xl pb-16">
          <div className="overflow-hidden rounded-lg border border-primary/20 bg-primary p-7 text-primary-foreground shadow-md dark:shadow-dark-md sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <div>
                <SectionLabel className="text-primary-foreground/80">
                  Waitlist
                </SectionLabel>
                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">
                  Follow the first release without a noisy launch funnel.
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-primary-foreground/80">
                  This CTA stays honest on purpose. The waitlist flow is not wired
                  up yet, but the page should already communicate the tone of
                  the product and the shape of the release.
                </p>
              </div>
              <div className="rounded-lg border border-primary-foreground/15 bg-primary-foreground/10 p-4 backdrop-blur-sm">
                <div className="rounded-md border border-primary-foreground/15 bg-primary-foreground/5 p-2">
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <div className="flex h-9 flex-1 items-center rounded-md border border-primary-foreground/15 bg-primary-foreground/10 px-3 text-sm text-primary-foreground/60">
                      Waitlist email coming soon
                    </div>
                    <Button
                      size="sm"
                      className="h-9 shrink-0 rounded-md border border-primary-foreground/20 bg-primary-foreground px-4 text-sm font-medium text-primary transition-colors duration-fast ease-snap motion-reduce:transition-none hover:bg-primary-foreground/90"
                    >
                      Join the waitlist
                    </Button>
                  </div>
                </div>
                <p className="px-2 pt-3 text-xs leading-relaxed text-primary-foreground/65">
                  No fake signup flow. This section exists to define the final
                  launch shape without pretending the backend already exists.
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className="mx-auto flex w-full max-w-6xl flex-col gap-5 border-t border-border py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-tight text-foreground">
              H3 Ink
            </p>
            <p className="mt-2 max-w-md leading-relaxed">
              A desktop-first writing app for local Markdown notes. Calm,
              portable, and intentionally narrow in its first release.
            </p>
          </div>
          <nav className="flex flex-wrap gap-5 font-medium">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors duration-fast ease-snap motion-reduce:transition-none hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </footer>
      </div>
    </main>
  )
}
