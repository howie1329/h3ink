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
    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#8f9586]">
      {children}
    </p>
  )
}

function PreviewPanel() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#101115] shadow-[0_32px_100px_rgba(0,0,0,0.45)]">
      <div className="flex items-center justify-between border-b border-white/8 px-5 py-4 text-[0.72rem] text-white/55">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-[#f2efe8]/30" />
          <span className="size-2 rounded-full bg-[#f2efe8]/18" />
          <span className="size-2 rounded-full bg-[#f2efe8]/10" />
        </div>
        <span className="font-mono tracking-[0.18em] uppercase">Desktop preview</span>
      </div>
      <div className="grid min-h-[27rem] md:grid-cols-[1.1fr_0.9fr]">
        <div className="border-b border-white/8 bg-[#0d0f12] p-5 md:border-r md:border-b-0">
          <div className="mb-4 flex items-center justify-between text-[0.72rem] uppercase tracking-[0.18em] text-white/45">
            <span>Editor</span>
            <span className="rounded-full border border-white/10 px-2 py-1 text-[0.62rem] text-[#d8d2c5]">
              autosave
            </span>
          </div>
          <div className="space-y-3 font-mono text-sm leading-7 text-[#f5f0e6]">
            <p># Drafting without clutter</p>
            <p className="text-white/55">
              H3 Ink is meant to stay close to the file and out of the way.
            </p>
            <p>- Open plain Markdown files</p>
            <p>- Write with live preview nearby</p>
            <p>- Save without thinking too hard about it</p>
            <p className="text-white/40">[recent] meeting-notes.md</p>
          </div>
        </div>
        <div className="bg-[linear-gradient(180deg,rgba(242,239,232,0.06),rgba(242,239,232,0.02))] p-5">
          <div className="mb-4 text-[0.72rem] uppercase tracking-[0.18em] text-white/45">
            Preview
          </div>
          <div className="rounded-[1.5rem] border border-white/8 bg-[#16181d] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
            <h3 className="text-xl font-semibold text-[#f4efe3]">
              Drafting without clutter
            </h3>
            <p className="mt-4 text-sm leading-7 text-[#c5c0b4]">
              H3 Ink is a desktop-first writing surface for Markdown notes that
              should feel lightweight, local, and familiar from the first open.
            </p>
            <div className="mt-6 space-y-3 text-sm text-[#d9d2c5]">
              <div className="rounded-xl border border-white/8 bg-white/4 px-4 py-3">
                Native open and save flows
              </div>
              <div className="rounded-xl border border-white/8 bg-white/4 px-4 py-3">
                Plain files, not a proprietary note system
              </div>
              <div className="rounded-xl border border-white/8 bg-white/4 px-4 py-3">
                Recent files and live Markdown feedback
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function LandingPage() {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[42rem] bg-[radial-gradient(circle_at_top,rgba(242,239,232,0.12),transparent_38%),radial-gradient(circle_at_20%_18%,rgba(118,120,196,0.16),transparent_22%),radial-gradient(circle_at_82%_18%,rgba(96,103,110,0.2),transparent_20%)]" />
      <div className="mx-auto flex w-full max-w-7xl flex-col px-5 pb-16 pt-5 sm:px-8 lg:px-10">
        <header className="sticky top-4 z-20 mb-10">
          <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-[#111216]/80 px-4 py-3 backdrop-blur-xl">
            <a href="#" className="flex items-center gap-3">
              <Image
                src="/icon-dark.svg"
                alt="H3 Ink"
                width={36}
                height={36}
                className="size-9 rounded-2xl border border-white/8 bg-[#0d0d11]"
              />
              <div>
                <p className="text-sm font-semibold tracking-[0.12em] text-[#f4efe3] uppercase">
                  H3 Ink
                </p>
                <p className="text-[0.68rem] tracking-[0.18em] uppercase text-white/45">
                  local markdown
                </p>
              </div>
            </a>
            <nav className="hidden items-center gap-6 text-sm text-white/58 md:flex">
              <a href="#features" className="transition-colors hover:text-white">
                Features
              </a>
              <a href="#principles" className="transition-colors hover:text-white">
                Principles
              </a>
              <a href="#roadmap" className="transition-colors hover:text-white">
                Roadmap
              </a>
            </nav>
            <Button
              asChild
              size="lg"
              className="rounded-full border border-[#f2efe8]/20 bg-[#f2efe8] px-4 text-[#121317] hover:bg-[#e7e1d3]"
            >
              <a href="#waitlist">{hero.primaryCta}</a>
            </Button>
          </div>
        </header>

        <section className="mx-auto grid w-full max-w-6xl gap-10 pb-20 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-end">
          <div className="max-w-2xl">
            <SectionLabel>{hero.eyebrow}</SectionLabel>
            <h1 className="mt-6 max-w-[12ch] text-5xl font-semibold tracking-[-0.06em] text-[#f4efe3] sm:text-6xl lg:text-7xl">
              {hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#b5b1a6] sm:text-xl">
              {hero.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="rounded-full border border-[#f2efe8]/15 bg-[#f2efe8] px-5 text-[#15161a] hover:bg-[#e6e0d2]"
              >
                <a href="#waitlist">{hero.primaryCta}</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/12 bg-white/4 px-5 text-[#f4efe3] hover:bg-white/8"
              >
                <a href="#roadmap">{hero.secondaryCta}</a>
              </Button>
            </div>
            <p className="mt-5 max-w-lg text-sm leading-6 text-white/48">
              {hero.note}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {valuePillars.map((pillar, index) => (
              <article
                key={pillar.title}
                className={cn(
                  "rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1",
                  index === 0 && "sm:col-span-3 lg:col-span-1"
                )}
              >
                <p className="text-[0.72rem] uppercase tracking-[0.22em] text-white/42">
                  0{index + 1}
                </p>
                <h2 className="mt-6 text-xl font-semibold text-[#f4efe3]">
                  {pillar.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#b5b1a6]">
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl pb-20">
          <PreviewPanel />
        </section>

        <section
          id="features"
          className="mx-auto grid w-full max-w-6xl gap-6 pb-20 lg:grid-cols-[0.78fr_1.22fr]"
        >
          <div className="rounded-[2rem] border border-white/10 bg-[#121318] p-7">
            <SectionLabel>What the first version includes</SectionLabel>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-[#f4efe3]">
              A real MVP, not a vague promise.
            </h2>
            <p className="mt-4 max-w-md text-base leading-7 text-[#b5b1a6]">
              The page should sell the product honestly: H3 Ink is a marketing
              site for a desktop app that is still being shaped around the
              smallest useful writing workflow.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {featureColumns.map((column) => (
              <article
                key={column.title}
                className="rounded-[2rem] border border-white/10 bg-white/4 p-7"
              >
                <h3 className="text-xl font-semibold text-[#f4efe3]">
                  {column.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#b5b1a6]">
                  {column.description}
                </p>
                <ul className="mt-6 space-y-3 text-sm leading-7 text-[#ddd6c8]">
                  {column.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#f2efe8]/75" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section
          id="principles"
          className="mx-auto grid w-full max-w-6xl gap-6 pb-20 md:grid-cols-3"
        >
          {principles.map((principle) => (
            <article
              key={principle.title}
              className="rounded-[2rem] border border-white/10 bg-[#0f1014] p-7"
            >
              <SectionLabel>Why H3 Ink</SectionLabel>
              <h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-[#f4efe3]">
                {principle.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#b5b1a6]">
                {principle.body}
              </p>
            </article>
          ))}
        </section>

        <section id="roadmap" className="mx-auto w-full max-w-6xl pb-20">
          <div className="flex flex-col gap-4 md:max-w-2xl">
            <SectionLabel>Roadmap</SectionLabel>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#f4efe3] sm:text-4xl">
              A light roadmap that keeps the product honest.
            </h2>
            <p className="text-base leading-7 text-[#b5b1a6]">
              The site should explain where H3 Ink is headed without turning the
              page into a list of promises. The focus stays on the desktop app
              and the writing workflow.
            </p>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {roadmap.map((column, index) => (
              <article
                key={column.title}
                className={cn(
                  "rounded-[2rem] border p-7",
                  index === 0
                    ? "border-[#f2efe8]/14 bg-[#f2efe8]/8"
                    : "border-white/10 bg-white/4"
                )}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#f0ece2]">
                  {column.title}
                </p>
                <p className="mt-4 text-sm leading-7 text-[#b5b1a6]">
                  {column.description}
                </p>
                <ul className="mt-6 space-y-3 text-sm leading-7 text-[#ddd6c8]">
                  {column.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#f2efe8]/75" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="waitlist" className="mx-auto w-full max-w-6xl pb-20">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,#f2efe8_0%,#ddd5c5_44%,#a9abb6_100%)] p-7 text-[#15161a] shadow-[0_40px_100px_rgba(0,0,0,0.35)] sm:p-10">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/35 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <SectionLabel>Waitlist</SectionLabel>
                <h2 className="mt-5 max-w-[12ch] text-4xl font-semibold tracking-[-0.05em] text-[#121317] sm:text-5xl">
                  Follow the first release without the usual noise.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-black/66">
                  H3 Ink is still in the build phase. This CTA is intentionally
                  simple for now: a placeholder for people who want to keep an
                  eye on the desktop app as it becomes downloadable.
                </p>
              </div>
              <div className="rounded-[2rem] border border-black/10 bg-black/6 p-4 backdrop-blur-sm">
                <div className="rounded-[1.5rem] border border-black/10 bg-white/50 p-2">
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <div className="flex h-12 flex-1 items-center rounded-[1rem] border border-black/10 bg-white/70 px-4 text-sm text-black/45">
                      Waitlist email coming soon
                    </div>
                    <Button
                      size="lg"
                      className="h-12 rounded-[1rem] bg-[#15161a] px-5 text-[#f4efe3] hover:bg-[#24262c]"
                    >
                      Join the waitlist
                    </Button>
                  </div>
                </div>
                <p className="px-2 pt-3 text-xs leading-6 text-black/52">
                  No signup backend yet. This section exists to establish the
                  shape of the launch page without inventing a fake submission
                  flow.
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className="mx-auto flex w-full max-w-6xl flex-col gap-5 border-t border-white/10 py-8 text-sm text-white/52 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold tracking-[0.12em] uppercase text-[#f4efe3]">
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
                className="transition-colors hover:text-white"
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
