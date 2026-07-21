"use client";

import Link from "next/link";
import { KineticHeadline } from "@/components/type/KineticHeadline";
import { SiteVersionBadge } from "@/components/version/SiteVersionBadge";
import { siteBuild, siteVersionSummary } from "@/lib/site-version";
import { OPEN_SOURCE_USED, type AttributionKind } from "@/lib/open-source-attribution";

const KIND_LABEL: Record<AttributionKind, string> = {
  org: "Lab & product",
  runtime: "Runtime open source",
  dev: "Dev tooling",
  docs: "Standards & docs",
  inspiration: "Patterns & inspiration",
  infra: "Infrastructure",
};

const WORK = [
  {
    title: "AI-assisted web systems",
    body: "Skill-routed suites like 187WEB that turn intent into pages, docs, launch assets, and publish gates — with claim discipline.",
    links: [
      { href: "/187", label: "/187 command surface" },
      { href: "/#skills", label: "Skills" },
      { href: "/187publish", label: "187PUBLISH" },
    ],
  },
  {
    title: "Local-first operator brains",
    body: "Offline-friendly command centers: skills on disk, vault notes, optional local inference — not cloud-only black boxes.",
    links: [
      { href: "/brain", label: "Local brain / Obsidian" },
      { href: "/install", label: "Install" },
      { href: "/187version", label: "187VERSION" },
    ],
  },
  {
    title: "Motion & spatial craft",
    body: "Award-caliber marketing motion: GSAP timelines, R3F heroes, scroll narratives, kinetic type — reduced-motion safe by default.",
    links: [
      { href: "/showcase", label: "Showcase / Motion Lab" },
      { href: "/187hero", label: "187HERO" },
      { href: "/187motion", label: "187MOTION" },
      { href: "/187type", label: "187TYPE" },
      { href: "/187gsap", label: "187GSAP" },
    ],
  },
  {
    title: "Access, inclusion & trust",
    body: "Disability access, neurodivergent UX, identity-safe language, and security-minded review as first-class skills — not afterthoughts.",
    links: [
      { href: "/187access", label: "187ACCESS+" },
      { href: "/187include", label: "187INCLUDE+" },
      { href: "/187natasha", label: "187NATASHA" },
      { href: "/187plusplus", label: "/187++ sweep" },
    ],
  },
  {
    title: "Growth & launch systems",
    body: "Ethical GTM: craft, create, launch, SEO, and revenue architecture with plain-language, claim-safe copy.",
    links: [
      { href: "/187craft", label: "187CRAFT" },
      { href: "/187create", label: "187CREATE" },
      { href: "/187launch", label: "187LAUNCH" },
      { href: "/187seo", label: "187SEO" },
      { href: "/187vibe", label: "187VIBE" },
      { href: "/187write", label: "187WRITE" },
    ],
  },
  {
    title: "Themes & design tokens",
    body: "Semantic palettes and type contracts so every surface stays on-brand without a second competing design system.",
    links: [
      { href: "/187theme", label: "187THEME" },
      { href: "/187craft", label: "187CRAFT" },
    ],
  },
];

const EXTERNAL = [
  { href: "https://lumenhelix.com", label: "LumenHelix.com" },
  { href: "https://github.com/LumenHelixLab", label: "GitHub org" },
  { href: "https://github.com/LumenHelixLab/187WEB", label: "187WEB repo" },
  { href: "https://lumenhelixlab.github.io/187WEB/", label: "Live showcase" },
];

export function AboutPage() {
  const groups = (Object.keys(KIND_LABEL) as AttributionKind[]).map((kind) => ({
    kind,
    label: KIND_LABEL[kind],
    items: OPEN_SOURCE_USED.filter((i) => i.kind === kind),
  }));

  return (
    <div className="px-6 pb-24 pt-28">
      <div className="container-x">
        <section className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">About · LumenHelix Lab</p>
          <KineticHeadline
            text="Build sharper systems."
            accent="Ship with soul."
            as="h1"
            className="mt-4 text-[clamp(2.4rem,1.3rem+4vw,4.5rem)] font-bold leading-[0.95] tracking-tight text-white"
          />
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/65">
            <strong className="text-white/90">LumenHelix Lab</strong> designs AI-assisted web suites, local-first
            operator tools, and motion-grade product surfaces.{" "}
            <a
              href="https://lumenhelix.com"
              className="font-semibold text-[#39FF14] underline-offset-2 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              LumenHelix.com
            </a>{" "}
            is the lab home;{" "}
            <Link href="/" className="font-semibold text-[#39FF14] underline-offset-2 hover:underline">
              187WEB
            </Link>{" "}
            is the living skill suite and showcase.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {EXTERNAL.map((e) => (
              <a
                key={e.href}
                href={e.href}
                target={e.href.startsWith("http") ? "_blank" : undefined}
                rel={e.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-[#39FF14]/40 hover:text-[#39FF14]"
              >
                {e.label}
              </a>
            ))}
            <SiteVersionBadge />
          </div>
        </section>

        {/* SEO-friendly internal path: work pillars */}
        <section className="mx-auto mt-16 max-w-5xl" aria-labelledby="work-heading">
          <h2 id="work-heading" className="text-center text-2xl font-bold text-white">
            What we build
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-white/55">
            Practical systems — design, motion, access, research, and launch — wired so agents and humans share the same
            command grammar.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WORK.map((w) => (
              <article
                key={w.title}
                className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#0A0C14] p-5"
              >
                <h3 className="text-lg font-bold text-white">{w.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{w.body}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {w.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="inline-flex rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-[#39FF14] transition hover:border-[#39FF14]/40"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Vibe / SEO CTA band */}
        <section className="mx-auto mt-16 max-w-3xl rounded-3xl border border-white/10 bg-gradient-to-br from-[#39FF14]/10 via-transparent to-[#a855f7]/10 p-6 text-center sm:p-8">
          <h2 className="text-xl font-bold text-white">Delight with discipline</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/65">
            We care about{" "}
            <Link href="/187vibe" className="text-[#39FF14] underline-offset-2 hover:underline">
              187VIBE
            </Link>{" "}
            (retention, micro-interactions, community) and{" "}
            <Link href="/187seo" className="text-[#39FF14] underline-offset-2 hover:underline">
              187SEO
            </Link>{" "}
            (discoverable structure, honest metadata) — without hype guarantees. Every public claim should be labelable:
            proved, measured, modeled, or planned.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/187vibe"
              className="inline-flex h-10 items-center rounded-full bg-[#39FF14] px-4 text-sm font-semibold text-[#050608]"
            >
              Explore 187VIBE
            </Link>
            <Link
              href="/187seo"
              className="inline-flex h-10 items-center rounded-full border border-white/15 bg-black/30 px-4 text-sm font-semibold text-white"
            >
              Explore 187SEO
            </Link>
            <Link
              href="/187launch"
              className="inline-flex h-10 items-center rounded-full border border-white/15 bg-black/30 px-4 text-sm font-semibold text-white"
            >
              187LAUNCH
            </Link>
          </div>
        </section>

        {/* Version mechanism */}
        <section id="version" className="mx-auto mt-16 max-w-3xl scroll-mt-28">
          <h2 className="text-2xl font-bold text-white">Site versioning</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            Every production build runs <code className="text-[#39FF14]">stamp-version</code>, which writes{" "}
            <code className="text-white/80">lib/generated/site-build.json</code> with SemVer, git SHA, branch, and build
            time. GitHub Pages deploys on <code className="text-white/80">main</code> push, so the whole static site
            refreshes with a new stamp. Human history lives in{" "}
            <Link href="https://github.com/LumenHelixLab/187WEB/blob/main/CHANGELOG.md" className="text-[#39FF14] underline-offset-2 hover:underline" target="_blank" rel="noopener noreferrer">
              CHANGELOG.md
            </Link>
            .
          </p>
          <dl className="mt-6 grid gap-3 rounded-2xl border border-white/10 bg-[#0A0C14] p-5 font-mono text-xs sm:grid-cols-2">
            <div>
              <dt className="text-white/40">Label</dt>
              <dd className="mt-1 text-[#39FF14]">{siteBuild.label}</dd>
            </div>
            <div>
              <dt className="text-white/40">Channel</dt>
              <dd className="mt-1 text-white/80">{siteBuild.channel}</dd>
            </div>
            <div>
              <dt className="text-white/40">Git</dt>
              <dd className="mt-1 truncate text-white/80">{siteBuild.gitShort}</dd>
            </div>
            <div>
              <dt className="text-white/40">Built</dt>
              <dd className="mt-1 text-white/80">{siteBuild.builtAt}</dd>
            </div>
          </dl>
          <p className="mt-3 text-xs text-white/40">{siteVersionSummary()}</p>
          <p className="mt-4 text-sm text-white/55">
            Skill surface:{" "}
            <Link href="/187version" className="text-[#39FF14] underline-offset-2 hover:underline">
              187VERSION
            </Link>
            . Operator docs:{" "}
            <code className="text-white/70">docs/187VERSION.md</code>.
          </p>
        </section>

        {/* Open source */}
        <section id="open-source" className="mx-auto mt-16 max-w-5xl scroll-mt-28">
          <h2 className="text-2xl font-bold text-white">Open source &amp; repos we use</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60">
            187WEB stands on excellent open projects. Licenses remain with their authors; this is attribution, not
            endorsement. Full dependency tree:{" "}
            <code className="text-white/75">package-lock.json</code>.
          </p>
          <div className="mt-8 space-y-8">
            {groups.map((g) =>
              g.items.length === 0 ? null : (
                <div key={g.kind}>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/45">{g.label}</h3>
                  <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                    {g.items.map((item) => (
                      <li
                        key={item.href + item.name}
                        className="rounded-xl border border-white/10 bg-[#0A0C14] px-4 py-3"
                      >
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-[#39FF14] underline-offset-2 hover:underline"
                        >
                          {item.name}
                        </a>
                        <p className="mt-1 text-sm text-white/60">{item.role}</p>
                        {item.license ? (
                          <p className="mt-1 font-mono text-[10px] text-white/35">{item.license}</p>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-3xl text-center">
          <p className="text-sm text-white/50">
            Prefer a command?{" "}
            <Link href="/187" className="text-[#39FF14] underline-offset-2 hover:underline">
              /187
            </Link>{" "}
            ·{" "}
            <Link href="/install" className="text-[#39FF14] underline-offset-2 hover:underline">
              Install
            </Link>{" "}
            ·{" "}
            <Link href="/brain" className="text-[#39FF14] underline-offset-2 hover:underline">
              Brain
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
