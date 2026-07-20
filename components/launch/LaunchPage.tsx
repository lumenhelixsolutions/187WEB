"use client";

import { useState } from "react";
import Link from "next/link";
import { brandAssets } from "@/lib/brand-assets";
import { skillShowcases, type SkillShowcaseData } from "@/lib/skill-showcase-data";
import { CommandPalette } from "@/components/187/CommandPalette";
import { Reveal } from "@/components/Reveal";
import { natashaModules, quickStats, installSnippets } from "./launch-data";

const REPO = "https://github.com/LumenHelixLab/187WEB";
const RESEARCH_LAB_COMMANDS = [
  "/187 research",
  "/187 labs",
  "/187 data",
  "/187 crate",
  "/187 bench",
  "/187 prov",
];

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-4 mt-4 flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-[#050608]/80 px-5 py-2.5 backdrop-blur-xl sm:mx-auto">
        <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight text-white">
          <img
            src={brandAssets.orb}
            alt="187WEB"
            className="h-8 w-8 rounded-full object-cover drop-shadow-[0_0_12px_rgba(57,255,20,0.5)]"
          />
          <span className="hidden sm:inline">187WEB</span>
        </Link>
        <div className="hidden items-center gap-6 text-sm text-white/60 md:flex">
          <a href="#skills" className="transition hover:text-[#39FF14]">Skills</a>
          <a href="#natasha" className="transition hover:text-[#39FF14]">NATASHA</a>
          <a href="#command" className="transition hover:text-[#39FF14]">/187</a>
          <Link href="/showcase" className="transition hover:text-[#39FF14]">Showcase</Link>
          <Link href="/install" className="transition hover:text-[#39FF14]">Install</Link>
        </div>
        <a
          href={REPO}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex h-9 items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 text-sm font-medium text-white transition hover:border-[#39FF14]/40 hover:text-[#39FF14]"
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}

function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.07]"
        style={{ backgroundImage: `url(${brandAssets.blueprint})` }}
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(30deg, #39FF14 12%, transparent 12.5%, transparent 87%, #39FF14 87.5%, #39FF14), linear-gradient(150deg, #39FF14 12%, transparent 12.5%, transparent 87%, #39FF14 87.5%, #39FF14), linear-gradient(30deg, #39FF14 12%, transparent 12.5%, transparent 87%, #39FF14 87.5%, #39FF14), linear-gradient(150deg, #39FF14 12%, transparent 12.5%, transparent 87%, #39FF14 87.5%, #39FF14), linear-gradient(60deg, rgba(57,255,20,0.1) 25%, transparent 25.5%, transparent 75%, rgba(57,255,20,0.1) 75%, rgba(57,255,20,0.1)), linear-gradient(60deg, rgba(57,255,20,0.1) 25%, transparent 25.5%, transparent 75%, rgba(57,255,20,0.1) 75%, rgba(57,255,20,0.1))`,
          backgroundSize: "40px 70px",
          backgroundPosition: "0 0, 0 0, 20px 35px, 20px 35px, 0 0, 20px 35px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(57,255,20,0.12),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(255,0,0,0.06),transparent_45%)]" />
    </div>
  );
}

function OutcomePill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/70">
      <span className="h-1.5 w-1.5 rounded-full bg-[#39FF14] shadow-[0_0_6px_#39FF14]" />
      {children}
    </span>
  );
}

function Hero() {
  return (
    <section id="top" className="relative px-6 pb-16 pt-28 sm:pb-24 sm:pt-36">
      <div className="container-x relative">
        <div className="mx-auto max-w-5xl text-center">
          <Reveal>
            <div className="mx-auto mb-6 flex max-w-3xl flex-col items-center gap-4">
              <img
                src={brandAssets.headerLockup}
                alt="187WEB — A killer AI-powered web suite"
                className="w-full max-w-2xl drop-shadow-[0_0_40px_rgba(57,255,20,0.25)]"
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="relative mx-auto max-w-4xl">
              <div className="absolute -inset-4 rounded-full bg-[#39FF14]/10 blur-3xl" />
              <img
                src={brandAssets.headerInfographic}
                alt="187WEB killer web design solutions: 187REPO, 187CRAFT, 187VIBE, 187LAUNCH"
                className="relative w-full rounded-2xl border border-white/10 shadow-2xl shadow-black/40"
              />
            </div>
          </Reveal>

          <Reveal delay={200}>
            <h1 className="mt-8 text-[clamp(2.5rem,1.2rem+6vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-white">
              Type one command. <span className="text-[#39FF14]">Ship the whole surface.</span>
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/65">
              187WEB is a command-driven AI web suite that turns intent into research-grade pages, design systems, docs,
              launch plans, and publish gates — each skill usable alone or chained through the{" "}
              <code className="text-[#39FF14]">/187</code> command surface.
            </p>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <OutcomePill>Launch a landing page this afternoon</OutcomePill>
              <OutcomePill>Find a free stack for any MVP</OutcomePill>
              <OutcomePill>Ship a reproducible research lab</OutcomePill>
              <OutcomePill>Audit before you publish</OutcomePill>
            </div>
          </Reveal>

          <Reveal delay={500}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                href="/187"
                className="inline-flex h-12 items-center justify-center rounded bg-[#39FF14] px-6 text-sm font-semibold text-[#050608] transition hover:brightness-110"
              >
                Explore /187 Commands
              </Link>
              <Link
                href="/showcase"
                className="inline-flex h-12 items-center justify-center rounded border border-[#39FF14]/30 bg-[#39FF14]/5 px-6 text-sm font-semibold text-[#39FF14] transition hover:bg-[#39FF14]/10"
              >
                Open Showcase
              </Link>
              <Link
                href="/install"
                className="inline-flex h-12 items-center justify-center rounded border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Install / Select Skills
              </Link>
              <a
                href={REPO}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-12 items-center justify-center rounded border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                GitHub Repo
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function StatsStrip() {
  return (
    <section className="relative border-y border-white/10 bg-[#080808]/80 px-6 py-10 backdrop-blur-sm">
      <div className="container-x">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {quickStats.map((stat) => (
            <Reveal key={stat.label}>
              <div className="text-center">
                <div className="text-[clamp(1.75rem,1.2rem+2vw,2.5rem)] font-bold text-[#39FF14]">{stat.value}</div>
                <div className="mt-1 text-sm font-medium uppercase tracking-wider text-white/50">{stat.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandIntelligence() {
  const intel = [
    {
      skill: "187REPO",
      color: "#f43f5e",
      bullets: ["Systematized Codebase Structure", "Git Flow Workflow", "Component Versioning"],
    },
    {
      skill: "187CRAFT",
      color: "#22d3ee",
      bullets: ["Atomic Design System", "Pixel-Perfect Components", "Scalable Grid Modules"],
    },
    {
      skill: "187VIBE",
      color: "#a855f7",
      bullets: ["UX Flow Mapping v2.0", "Interaction State Library", "User Behavior Data"],
    },
    {
      skill: "187LAUNCH",
      color: "#f59e0b",
      bullets: [
        "CI/CD Build Pipelines",
        "Multi-Cloud Kubernetes",
        "Multi-Environment Deployment Engines",
        "Instant Zero-Downtime Rollbacks",
      ],
    },
  ];

  return (
    <section className="relative px-6 py-16 sm:py-20">
      <div className="container-x">
        <Reveal className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">
            Extracted from the brand header
          </p>
          <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3rem)] font-bold tracking-tight text-white">
            What the spider orb is built to ship
          </h2>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {intel.map((item, i) => (
            <Reveal key={item.skill} delay={i * 80}>
              <div
                className="h-full rounded-2xl border border-white/10 bg-[#0A0C14] p-5"
                style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.03), 0 24px 60px -24px ${item.color}22` }}
              >
                <h3 className="font-bold text-white">{item.skill}</h3>
                <ul className="mt-4 space-y-2">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-sm text-white/60">
                      <span style={{ color: item.color }}>›</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={300}>
          <div className="mt-8 text-center">
            <code className="rounded-full border border-[#39FF14]/20 bg-[#39FF14]/5 px-4 py-2 text-xs text-[#39FF14]">
              STATUS: REPO UPDATES DETECTED — 8 NEW FEATURES INTEGRATED — PLATFORM OPTIMIZED
            </code>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SkillCard({ skill, index }: { skill: SkillShowcaseData; index: number }) {
  const alias = skill.triggers[0]?.replace("/187", "").trim() ?? skill.id;
  const useCase = skill.useCases[0] ?? "";
  const output = skill.outputs[0] ?? "";
  return (
    <Reveal delay={index * 40}>
      <Link
        href={`/187${skill.id}`}
        className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#0A0C14] p-5 transition hover:-translate-y-1 hover:border-[#39FF14]/30"
        style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.03), 0 24px 60px -24px ${skill.color}22` }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-bold text-white">{skill.name}</h3>
            <p className="text-sm" style={{ color: skill.color }}>
              {skill.tagline}
            </p>
          </div>
          <span
            className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg text-xs font-bold text-[#050608]"
            style={{ backgroundColor: skill.color }}
          >
            {alias.slice(0, 2).toUpperCase()}
          </span>
        </div>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/60">{skill.description}</p>
        <div className="mt-4 space-y-2">
          <code className="block rounded bg-white/5 px-2 py-1 text-xs text-[#39FF14]">/187 {alias}</code>
          <p className="text-xs text-white/40">
            <span className="text-white/60">Use case:</span> {useCase}
          </p>
          <p className="text-xs text-white/40">
            <span className="text-white/60">Delivers:</span> {output}
          </p>
        </div>
        <div className="mt-auto flex items-center gap-1 pt-4 text-sm font-medium" style={{ color: skill.color }}>
          <span>Explore {skill.name}</span>
          <svg
            className="h-4 w-4 transition group-hover:translate-x-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      </Link>
    </Reveal>
  );
}

function SkillsGrid() {
  return (
    <section id="skills" className="relative px-6 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">First-class skills</p>
          <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">
            27 commands. One surface.
          </h2>
          <p className="mt-4 text-white/60">
            Every card is a routable skill page. Click through to see triggers, outputs, templates, and routing.
          </p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {skillShowcases.map((skill, i) => (
            <SkillCard key={skill.id} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function NatashaModules() {
  return (
    <section id="natasha" className="relative border-y border-white/10 bg-[#080808]/80 px-6 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">NATASHA module array</p>
          <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">
            THREAD · COMPRESS · TENSION · SPARK · CORD · SCOUT · LAB · FUSE
          </h2>
          <p className="mt-4 text-white/60">
            Cross-cutting modules that sharpen prompts, tune output profiles, dispatch experts, run local actions, and
            synthesize evidence.
          </p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {natashaModules.map((module, i) => (
            <Reveal key={module.id} delay={i * 60}>
              <Link
                href="/187natasha"
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#0A0C14] p-5 transition hover:-translate-y-1 hover:border-[#39FF14]/30"
                style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.03), 0 24px 60px -24px ${module.color}22` }}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-bold text-white">{module.id}</h3>
                  <code className="rounded bg-[#39FF14]/10 px-2 py-1 text-xs text-[#39FF14]">/187 {module.alias}</code>
                </div>
                {module.legacy && <p className="mt-1 text-xs text-white/30">legacy: {module.legacy}</p>}
                <p className="mt-3 text-sm leading-relaxed text-white/60">{module.purpose}</p>
                <div
                  className="mt-auto flex items-center gap-1 pt-4 text-sm font-medium"
                  style={{ color: module.color }}
                >
                  <span>Open NATASHA</span>
                  <svg
                    className="h-4 w-4 transition group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResearchLab() {
  return (
    <section className="relative px-6 py-20 sm:py-28">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-3xl border border-white/10 bg-[#0A0C14] p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">Research lab stack</p>
              <h3 className="mt-3 text-2xl font-bold text-white">Reproducible, citable, source-backed</h3>
              <p className="mt-3 text-white/60">
                From claim discipline to RO-Crate packaging, the research stack turns findings into reproducible,
                citable artifacts.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {RESEARCH_LAB_COMMANDS.map((cmd) => (
                  <code key={cmd} className="rounded bg-white/5 px-2 py-1 text-xs text-[#39FF14]">
                    {cmd}
                  </code>
                ))}
              </div>
              <Link
                href="/187research"
                className="mt-6 inline-flex h-11 items-center justify-center rounded border border-[#39FF14]/30 bg-[#39FF14]/5 px-5 text-sm font-semibold text-[#39FF14] transition hover:bg-[#39FF14]/10"
              >
                Explore 187RESEARCH
              </Link>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-3xl border border-white/10 bg-[#0A0C14] p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">KNOTstore memory layer</p>
              <h3 className="mt-3 text-2xl font-bold text-white">Agentic memory, local-first</h3>
              <p className="mt-3 text-white/60">
                Pluggable agentic memory with SQLite, KNOT-point, and hybrid backends. Preview the vault-style surface
                at /knotstore.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <code className="rounded bg-white/5 px-2 py-1 text-xs text-[#39FF14]">/187 vault</code>
                <code className="rounded bg-white/5 px-2 py-1 text-xs text-[#39FF14]">/187 vault init</code>
                <code className="rounded bg-white/5 px-2 py-1 text-xs text-[#39FF14]">/187 vault sync</code>
              </div>
              <Link
                href="/knotstore"
                className="mt-6 inline-flex h-11 items-center justify-center rounded border border-[#39FF14]/30 bg-[#39FF14]/5 px-5 text-sm font-semibold text-[#39FF14] transition hover:bg-[#39FF14]/10"
              >
                Open KNOTstore
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const COMMAND_CHIPS = [
  "/187 craft",
  "/187 seo",
  "/187 launch",
  "/187 research",
  "/187 free",
  "/187 scan",
  "/187 publish",
  "/187 th",
];

function CommandSurface() {
  const [commandInput, setCommandInput] = useState("/187 ");
  return (
    <section id="command" className="relative border-y border-white/10 bg-[#080808]/80 px-6 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">Interactive command surface</p>
          <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">
            Try a slash command
          </h2>
          <p className="mt-4 text-white/60">
            Tap a chip or type your own. The same registry powers the CLI, docs, and this page.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 flex flex-wrap justify-center gap-2">
              {COMMAND_CHIPS.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setCommandInput(chip)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 transition hover:border-[#39FF14]/40 hover:text-[#39FF14]"
                >
                  {chip}
                </button>
              ))}
            </div>
            <CommandPalette value={commandInput} onChange={setCommandInput} className="border-[#39FF14]/20" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function InstallSection() {
  const [tab, setTab] = useState<keyof typeof installSnippets>("macos");
  return (
    <section id="install" className="relative px-6 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">Install</p>
          <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">
            Spin up the web suite in seconds
          </h2>
          <p className="mt-4 text-white/60">
            Clone, install, seed the SQLite layer, and start the Next.js dev server.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-[#0A0C14] p-6 sm:p-8">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Install commands">
              {(Object.keys(installSnippets) as Array<keyof typeof installSnippets>).map((key) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={tab === key}
                  onClick={() => setTab(key)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    tab === key
                      ? "bg-[#39FF14] text-[#050608]"
                      : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  {key === "macos" ? "macOS / Linux" : key === "windows" ? "Windows" : "Git Bash / WSL"}
                </button>
              ))}
            </div>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-white/10 bg-[#050608] p-5">
              <pre className="font-mono text-sm leading-7 text-[#39FF14]">
                <code>{installSnippets[tab]}</code>
              </pre>
            </div>
            <p className="mt-4 text-center text-xs text-white/40">
              Tested on Windows 11, macOS Sonoma, Ubuntu 22.04/24.04, and modern mobile browsers.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050608] px-6 py-12">
      <div className="container-x flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <img src={brandAssets.labWordmark} alt="LumenHelix Lab" className="h-5 opacity-90" />
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} LumenHelix Lab · 187WEB · Custom Noncommercial License with Reserved Knotstore
            IP
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Link href="/187" className="text-sm text-white/50 transition hover:text-[#39FF14]">
            /187 Reference
          </Link>
          <Link href="/showcase" className="text-sm text-white/50 transition hover:text-[#39FF14]">
            Showcase
          </Link>
          <Link href="/install" className="text-sm text-white/50 transition hover:text-[#39FF14]">
            Install
          </Link>
          <a href={REPO} target="_blank" rel="noreferrer noopener" className="text-sm text-white/50 transition hover:text-[#39FF14]">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

export function LaunchPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050608] text-[#ECEDF7]">
      <Background />
      <Header />
      <main className="relative z-10">
        <Hero />
        <StatsStrip />
        <BrandIntelligence />
        <SkillsGrid />
        <NatashaModules />
        <ResearchLab />
        <CommandSurface />
        <InstallSection />
      </main>
      <Footer />
    </div>
  );
}
