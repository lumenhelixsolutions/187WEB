"use client";

import Link from "next/link";
import { brandAssets } from "@/lib/brand-assets";
import { siteConfig } from "@/lib/content";

const pillars = [
  {
    key: "repo",
    title: "187REPO",
    color: "#22d3ee",
    items: ["Systematized codebase structure", "Git flow workflow", "Component versioning"],
  },
  {
    key: "craft",
    title: "187CRAFT",
    color: "#00ff41",
    items: ["Atomic design system", "Pixel-perfect components", "Scalable grid modules"],
  },
  {
    key: "vibe",
    title: "187VIBE",
    color: "#a855f7",
    items: ["UX flow mapping v2.0", "Interaction state library", "User behavior data"],
  },
  {
    key: "launch",
    title: "187LAUNCH",
    color: "#ff4d6d",
    items: ["CI/CD build pipelines", "Multi-cloud Kubernetes", "Instant zero-downtime rollbacks"],
  },
];

const commands = [
  "/187 craft --target landing-page",
  "/187 launch --stage publish",
  "/187 seo --audit",
  "/187 research --topic web-vitals",
  "/187 access-plus --scan",
];

export function LaunchPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#060713] text-[#ecedf7]">
      {/* ambient grid */}
      <div
        className="pointer-events-none fixed inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* nav */}
      <header className="relative z-20 border-b border-white/5 bg-[#060713]/80 backdrop-blur-md">
        <div className="container-x flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 font-display text-xl font-bold tracking-tight">
            <img
              src={brandAssets.orb}
              alt=""
              width={36}
              height={36}
              className="shrink-0"
            />
            <span>187WEB</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-[#9aa1bd] md:flex">
            <a href="#pillars" className="hover:text-white">Solutions</a>
            <a href="#command" className="hover:text-white">Command Surface</a>
            <a href="#blueprint" className="hover:text-white">Blueprint</a>
            <a href={siteConfig.repo} className="hover:text-white" target="_blank" rel="noreferrer">GitHub</a>
          </nav>
          <a
            href="/showcase"
            className="rounded-sm bg-white/5 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/10 transition hover:bg-white/10"
          >
            Showcase
          </a>
        </div>
      </header>

      {/* hero */}
      <section className="relative z-10">
        <div className="container-x grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div className="order-2 lg:order-1">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#00ff41]/30 bg-[#00ff41]/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#00ff41]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#00ff41]" />
              Killer Web Design Solutions
            </div>
            <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
              <span className="text-white">187</span>
              <span className="text-[#ff1a1a]">WEB</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-[#9aa1bd]">
              A command-driven AI web suite. Type one slash command and ship sharper sites,
              smarter systems, and research-grade public pages.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#command"
                className="inline-flex h-12 items-center justify-center rounded-sm bg-[#00ff41] px-6 font-semibold text-[#060713] shadow-[0_0_24px_rgba(0,255,65,0.25)] transition hover:brightness-110"
              >
                Try the command surface
              </a>
              <a
                href={siteConfig.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-sm border border-white/15 px-6 font-medium text-white transition hover:bg-white/5"
              >
                View on GitHub
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-[#9aa1bd]">
              <div><strong className="block text-2xl text-white">18</strong>first-class skills</div>
              <div><strong className="block text-2xl text-white">/187</strong>command grammar</div>
              <div><strong className="block text-2xl text-white">0→1</strong>launch gate</div>
            </div>
          </div>

          <div className="order-1 flex justify-center lg:order-2">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(0,255,65,0.25) 0%, transparent 70%)" }}
              />
              <img
                src={brandAssets.mascotReference}
                alt="187WEB spider-bot mascot holding a glowing green 187 orb"
                width={1024}
                height={595}
                className="relative z-10 w-full max-w-2xl drop-shadow-[0_0_40px_rgba(0,255,65,0.15)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* pillars */}
      <section id="pillars" className="relative z-10 border-y border-white/5 bg-black/20 py-20">
        <div className="container-x">
          <div className="mb-12 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#00ff41]">The Suite</span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">Four killer modules</h2>
            <p className="mx-auto mt-4 max-w-2xl text-[#9aa1bd]">
              Each module is a first-class skill in the 187 command surface. Use them solo, or let them orchestrate together.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {pillars.map((p) => (
              <div
                key={p.key}
                className="group rounded-lg border border-white/5 bg-white/[0.02] p-6 transition hover:-translate-y-1 hover:border-white/10 hover:bg-white/[0.04]"
                style={{ boxShadow: `0 0 0 1px ${p.color}10` }}
              >
                <div
                  className="mb-4 inline-block rounded-md px-3 py-1 text-xs font-bold uppercase tracking-wider"
                  style={{ color: p.color, backgroundColor: `${p.color}15` }}
                >
                  {p.title}
                </div>
                <ul className="space-y-3 text-sm text-[#b8bdd3]">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span style={{ color: p.color }}>▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* command surface */}
      <section id="command" className="relative z-10 py-20">
        <div className="container-x">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#22d3ee]">Command Surface</span>
              <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">Type intent. Ship output.</h2>
            </div>
            <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0a0b14] shadow-2xl">
              <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#ff4d6d]" />
                <span className="h-3 w-3 rounded-full bg-[#ffd166]" />
                <span className="h-3 w-3 rounded-full bg-[#00ff41]" />
                <span className="ml-2 text-xs text-[#9aa1bd]">187web — bash</span>
              </div>
              <div className="p-6 font-mono text-sm md:text-base">
                {commands.map((cmd) => (
                  <div key={cmd} className="group flex items-center gap-3 py-2">
                    <span className="text-[#00ff41]">$</span>
                    <span className="text-white">{cmd}</span>
                    <span className="ml-auto opacity-0 text-xs text-[#9aa1bd] transition group-hover:opacity-100">↵ run</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* blueprint */}
      <section id="blueprint" className="relative z-10 border-y border-white/5 bg-black/20 py-20">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#a855f7]">NATASHA v3</span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">Built by a multi-agent operating system</h2>
            <p className="mt-4 text-[#9aa1bd]">
              187WEB is the public face of a deeper stack: a reversible-state substrate, a hardened Wasm execution boundary,
              agentic memory, and a slash-command grammar that turns intent into artifacts.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                ["Reversible computation", "TEN² kernel + AKASH memory"],
                ["Hardened execution", "Gate 2 Wasm sandbox"],
                ["Agentic memory", "KNOTstore SQLite + hybrid backends"],
                ["Publish gate", "SEO / a11y / revenue / version checks"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
                  <div className="text-xs uppercase tracking-wider text-[#9aa1bd]">{label}</div>
                  <div className="mt-1 font-semibold text-white">{value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src={brandAssets.blueprint}
              alt="187WEB NATASHA technical blueprint"
              width={800}
              height={1000}
              className="w-full max-w-md rounded-lg border border-white/5 opacity-90"
            />
          </div>
        </div>
      </section>

      {/* footer cta */}
      <section className="relative z-10 py-20">
        <div className="container-x text-center">
          <h2 className="font-display text-3xl font-bold md:text-5xl">Ready to ship?</h2>
          <p className="mx-auto mt-4 max-w-xl text-[#9aa1bd]">
            Clone the repo, run the installer, and type your first <code className="rounded bg-white/10 px-1 py-0.5 text-[#00ff41]">/187</code> command.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={siteConfig.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-sm bg-[#00ff41] px-6 font-semibold text-[#060713] shadow-[0_0_24px_rgba(0,255,65,0.25)] transition hover:brightness-110"
            >
              Clone on GitHub
            </a>
            <a
              href="/install"
              className="inline-flex h-12 items-center justify-center rounded-sm border border-white/15 px-6 font-medium text-white transition hover:bg-white/5"
            >
              Install 187WEB
            </a>
          </div>
          <p className="mt-12 text-xs text-[#9aa1bd]">
            {siteConfig.tagline} · A LumenHelix Lab project.
          </p>
        </div>
      </section>
    </div>
  );
}
