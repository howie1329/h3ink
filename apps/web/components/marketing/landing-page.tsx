import Image from "next/image"
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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--marketing-muted)]">
      {children}
    </p>
  )
}

function ManifestoCard() {
  return (
    <article className="rounded-[1.5rem] border border-[var(--marketing-line)] bg-[var(--marketing-panel)] p-6 shadow-[0_20px_60px_rgba(21,24,22,0.08)] sm:p-7">
      <SectionLabel>Product shape</SectionLabel>
      <p className="mt-5 max-w-md text-lg leading-8 text-[var(--marketing-ink)]">
        Built for people who want their notes to stay portable, readable, and
        close to the filesystem.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {valuePillars.map((pillar, index) => (
          <div
            key={pillar.title}
            className={cn(
              "rounded-[1rem] border p-4",
              index === valuePillars.length - 1
                ? "border-[var(--marketing-accent)] bg-[var(--marketing-accent)] text-[var(--marketing-accent-foreground)]"
                : "border-[var(--marketing-line)] bg-white/70"
            )}
          >
            <p
              className={cn(
                "text-[0.68rem] uppercase tracking-[0.18em]",
                index === valuePillars.length - 1
                  ? "text-[var(--marketing-accent-foreground)]/58"
                  : "text-[var(--marketing-muted)]"
              )}
            >
              0{index + 1}
            </p>
            <p
              className={cn(
                "mt-2 text-sm leading-6",
                index === valuePillars.length - 1
                  ? "text-[var(--marketing-accent-foreground)]/84"
                  : "text-[var(--marketing-soft-ink)]"
              )}
            >
              {pillar.title}
            </p>
          </div>
        ))}
      </div>
    </article>
  )
}

function PreviewPanel() {
  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-[var(--marketing-ink)]/10 bg-[#111311] text-[#f4f0e8] shadow-[0_36px_120px_rgba(16,18,16,0.28)]">
      <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-white/30" />
            <span className="size-2 rounded-full bg-white/18" />
            <span className="size-2 rounded-full bg-white/12" />
          </div>
          <span className="text-[0.68rem] uppercase tracking-[0.22em] text-white/42">
            Desktop preview
          </span>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-white/54">
          local-first
        </span>
      </div>

      <div className="grid min-h-[32rem] md:grid-cols-[14rem_minmax(0,1fr)]">
        <aside className="border-b border-white/8 bg-[#0d0f0d] p-4 md:border-b-0 md:border-r">
          <div className="rounded-[1rem] border border-white/8 bg-white/4 p-3">
            <p className="text-[0.66rem] uppercase tracking-[0.2em] text-white/42">
              Workspace
            </p>
            <div className="mt-4 space-y-2 text-sm text-white/80">
              <div className="rounded-xl bg-white/8 px-3 py-2">meeting-notes.md</div>
              <div className="rounded-xl px-3 py-2 text-white/46">draft-ideas.md</div>
              <div className="rounded-xl px-3 py-2 text-white/46">writing-rules.md</div>
            </div>
          </div>
          <div className="mt-4 rounded-[1rem] border border-white/8 bg-[#121512] p-4">
            <p className="text-[0.66rem] uppercase tracking-[0.2em] text-white/42">
              Recent
            </p>
            <div className="mt-4 space-y-3 text-sm leading-6 text-white/62">
              <p>Native open and save flows</p>
              <p>Path-backed autosave</p>
              <p>Fast file switching</p>
            </div>
          </div>
        </aside>

        <div className="grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="border-b border-white/8 p-5 md:border-r md:border-b-0 md:p-6">
            <div className="flex items-center justify-between text-[0.68rem] uppercase tracking-[0.2em] text-white/42">
              <span>Editor</span>
              <span className="rounded-full border border-white/10 px-3 py-1 text-white/56">
                autosave
              </span>
            </div>
            <div className="mt-6 space-y-4 font-mono text-sm leading-7 text-[#efe7da]">
              <p># Drafting without clutter</p>
              <p className="text-white/58">
                H3 Ink keeps the file close and the chrome quiet.
              </p>
              <p>- Open a plain Markdown note</p>
              <p>- Write with rendered feedback in view</p>
              <p>- Save naturally to the filesystem</p>
              <p className="text-white/36">last opened: notes/project-brief.md</p>
            </div>
          </div>

          <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5 md:p-6">
            <div className="text-[0.68rem] uppercase tracking-[0.2em] text-white/42">
              Preview
            </div>
            <div className="mt-6 rounded-[1.25rem] border border-white/8 bg-[#171a17] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
              <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[#f5f0e8]">
                Drafting without clutter
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#c8c0b4]">
                Desktop-first writing for local Markdown notes, with enough
                structure to stay confident and enough restraint to stay calm.
              </p>
              <div className="mt-6 space-y-3">
                <div className="rounded-[0.9rem] border border-white/8 bg-white/4 px-4 py-3 text-sm text-[#e8dfd0]">
                  Plain files remain portable
                </div>
                <div className="rounded-[0.9rem] border border-white/8 bg-white/4 px-4 py-3 text-sm text-[#e8dfd0]">
                  Live Markdown feedback while writing
                </div>
                <div className="rounded-[0.9rem] border border-white/8 bg-white/4 px-4 py-3 text-sm text-[#e8dfd0]">
                  Recent context without a heavy library view
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
    <div
      className={cn(
        "rounded-[1.5rem] border border-[var(--marketing-line)] bg-[var(--marketing-panel)]",
        className
      )}
    >
      {children}
    </div>
  )
}

export function LandingPage() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.85),transparent_52%),linear-gradient(180deg,rgba(122,108,86,0.08),transparent_60%)]" />
      <div className="mx-auto flex w-full max-w-[88rem] flex-col px-5 pb-12 pt-5 sm:px-8 lg:px-10">
        <header className="sticky top-4 z-20 mb-10">
          <div className="mx-auto flex max-w-6xl items-center justify-between rounded-[1rem] border border-[var(--marketing-line-strong)] bg-[rgba(247,243,236,0.82)] px-4 py-3 shadow-[0_14px_40px_rgba(27,29,26,0.08)] backdrop-blur-xl">
            <a href="#" className="flex items-center gap-3">
              <Image
                src="/icon-light.svg"
                alt="H3 Ink"
                width={36}
                height={36}
                className="size-9 rounded-[0.9rem] border border-[var(--marketing-line)] bg-[var(--marketing-ink)] p-1.5"
              />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--marketing-ink)]">
                  H3 Ink
                </p>
                <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[var(--marketing-muted)]">
                  local markdown
                </p>
              </div>
            </a>
            <nav className="hidden items-center gap-6 text-sm text-[var(--marketing-soft-ink)] md:flex">
              <a
                href="#features"
                className="transition-colors duration-150 ease-[var(--ease-out-strong)] hover:text-[var(--marketing-ink)]"
              >
                Features
              </a>
              <a
                href="#principles"
                className="transition-colors duration-150 ease-[var(--ease-out-strong)] hover:text-[var(--marketing-ink)]"
              >
                Principles
              </a>
              <a
                href="#roadmap"
                className="transition-colors duration-150 ease-[var(--ease-out-strong)] hover:text-[var(--marketing-ink)]"
              >
                Roadmap
              </a>
            </nav>
            <Button
              asChild
              size="lg"
              className="rounded-[0.9rem] border border-[var(--marketing-ink)] bg-[var(--marketing-ink)] px-4 text-[var(--marketing-accent-foreground)] transition-[transform,background-color,border-color] duration-150 ease-[var(--ease-out-strong)] hover:bg-[#282b26] active:scale-[0.98]"
            >
              <a href="#waitlist">{hero.primaryCta}</a>
            </Button>
          </div>
        </header>

        <section className="mx-auto grid w-full max-w-6xl gap-8 pb-16 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-end">
          <div className="max-w-2xl">
            <SectionLabel>{hero.eyebrow}</SectionLabel>
            <h1 className="mt-6 max-w-[11ch] text-5xl font-semibold tracking-[-0.07em] text-[var(--marketing-ink)] sm:text-6xl lg:text-7xl">
              {hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--marketing-soft-ink)] sm:text-xl">
              {hero.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="rounded-[0.9rem] border border-[var(--marketing-ink)] bg-[var(--marketing-ink)] px-5 text-[var(--marketing-accent-foreground)] transition-[transform,background-color,border-color] duration-150 ease-[var(--ease-out-strong)] hover:bg-[#282b26] active:scale-[0.98]"
              >
                <a href="#waitlist">{hero.primaryCta}</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-[0.9rem] border-[var(--marketing-line-strong)] bg-[var(--marketing-panel-strong)] px-5 text-[var(--marketing-ink)] transition-[transform,background-color,border-color,color] duration-150 ease-[var(--ease-out-strong)] hover:bg-white active:scale-[0.98]"
              >
                <a href="#roadmap">{hero.secondaryCta}</a>
              </Button>
            </div>
            <p className="mt-5 max-w-lg text-sm leading-6 text-[var(--marketing-muted)]">
              {hero.note}
            </p>
          </div>

          <ManifestoCard />
        </section>

        <section className="mx-auto w-full max-w-6xl pb-18">
          <PreviewPanel />
        </section>

        <section
          id="features"
          className="mx-auto grid w-full max-w-6xl gap-6 pb-18 lg:grid-cols-[0.82fr_1.18fr]"
        >
          <MarketingCard className="p-7 sm:p-8">
            <SectionLabel>What the first version includes</SectionLabel>
            <h2 className="mt-5 max-w-[12ch] text-3xl font-semibold tracking-[-0.05em] text-[var(--marketing-ink)] sm:text-4xl">
              A real first release, shaped around the writing loop.
            </h2>
            <p className="mt-4 max-w-md text-base leading-7 text-[var(--marketing-soft-ink)]">
              The page should sound like the product itself: simple, direct, and
              honest about what exists today.
            </p>
          </MarketingCard>

          <div className="grid gap-6 md:grid-cols-2">
            {featureColumns.map((column) => (
              <MarketingCard
                key={column.title}
                className="p-7 transition-[transform,box-shadow,border-color] duration-200 ease-[var(--ease-out-strong)] hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(27,29,26,0.06)]"
              >
                <h3 className="text-xl font-semibold tracking-[-0.03em] text-[var(--marketing-ink)]">
                  {column.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--marketing-soft-ink)]">
                  {column.description}
                </p>
                <ul className="mt-6 space-y-3 text-sm leading-7 text-[var(--marketing-ink)]">
                  {column.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--marketing-ink)]/72" />
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
          className="mx-auto grid w-full max-w-6xl gap-6 pb-18 md:grid-cols-3"
        >
          {principles.map((principle) => (
            <MarketingCard
              key={principle.title}
              className="p-7 transition-[transform,box-shadow] duration-200 ease-[var(--ease-out-strong)] hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(27,29,26,0.06)]"
            >
              <SectionLabel>Why H3 Ink</SectionLabel>
              <h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-[var(--marketing-ink)]">
                {principle.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--marketing-soft-ink)]">
                {principle.body}
              </p>
            </MarketingCard>
          ))}
        </section>

        <section id="roadmap" className="mx-auto w-full max-w-6xl pb-18">
          <div className="max-w-2xl">
            <SectionLabel>Roadmap</SectionLabel>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[var(--marketing-ink)] sm:text-4xl">
              A light roadmap that keeps the promise small and believable.
            </h2>
            <p className="mt-4 text-base leading-7 text-[var(--marketing-soft-ink)]">
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
                  index === 0 && "border-[var(--marketing-ink)]/16 bg-[#ece6da]"
                )}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--marketing-ink)]">
                  {column.title}
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--marketing-soft-ink)]">
                  {column.description}
                </p>
                <ul className="mt-6 space-y-3 text-sm leading-7 text-[var(--marketing-ink)]">
                  {column.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--marketing-ink)]/72" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </MarketingCard>
            ))}
          </div>
        </section>

        <section id="waitlist" className="mx-auto w-full max-w-6xl pb-18">
          <div className="overflow-hidden rounded-[1.75rem] border border-[var(--marketing-ink)]/12 bg-[var(--marketing-accent)] p-7 text-[var(--marketing-accent-foreground)] shadow-[0_28px_80px_rgba(17,19,17,0.12)] sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <div>
                <SectionLabel>Waitlist</SectionLabel>
                <h2 className="mt-5 max-w-[12ch] text-4xl font-semibold tracking-[-0.06em] text-[var(--marketing-accent-foreground)] sm:text-5xl">
                  Follow the first release without a noisy launch funnel.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-[var(--marketing-accent-foreground)]/72">
                  This CTA stays honest on purpose. The waitlist flow is not
                  wired up yet, but the page should already communicate the tone
                  of the product and the shape of the release.
                </p>
              </div>
              <div className="rounded-[1.25rem] border border-white/12 bg-white/10 p-4 backdrop-blur-sm">
                <div className="rounded-[1rem] border border-white/12 bg-white/12 p-2">
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <div className="flex h-12 flex-1 items-center rounded-[0.8rem] border border-white/10 bg-white/12 px-4 text-sm text-white/56">
                      Waitlist email coming soon
                    </div>
                    <Button
                      size="lg"
                      className="h-12 rounded-[0.8rem] border border-white/10 bg-[var(--marketing-accent-foreground)] px-5 text-[var(--marketing-accent)] transition-[transform,background-color] duration-150 ease-[var(--ease-out-strong)] hover:bg-[#faf6ee] active:scale-[0.98]"
                    >
                      Join the waitlist
                    </Button>
                  </div>
                </div>
                <p className="px-2 pt-3 text-xs leading-6 text-white/58">
                  No fake signup flow. This section exists to define the final
                  launch shape without pretending the backend already exists.
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className="mx-auto flex w-full max-w-6xl flex-col gap-5 border-t border-[var(--marketing-line-strong)] py-8 text-sm text-[var(--marketing-soft-ink)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold uppercase tracking-[0.12em] text-[var(--marketing-ink)]">
              H3 Ink
            </p>
            <p className="mt-2 max-w-md leading-7">
              A desktop-first writing app for local Markdown notes. Calm,
              portable, and intentionally narrow in its first release.
            </p>
          </div>
          <nav className="flex flex-wrap gap-5">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors duration-150 ease-[var(--ease-out-strong)] hover:text-[var(--marketing-ink)]"
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
