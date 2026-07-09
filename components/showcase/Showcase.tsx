import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { skillShowcases } from "@/lib/skill-showcase-data";

const REPO = "https://github.com/lumenhelixsolutions/187WEB";

const baseSuites = [
  {
    id: "command",
    name: "187COMMAND",
    tagline: "Direct intent to action",
    color: "#39FF14",
    items: ["Parse the ask", "Map to the right skill", "Return a clear plan"],
  },
  {
    id: "report",
    name: "187REPORT",
    tagline: "Explain · summarize · status",
    color: "#10b981",
    items: ["Context-aware summaries", "Decision-ready reports", "Audit trails"],
  },
  {
    id: "scan",
    name: "187SCAN",
    tagline: "Inspect · audit · detect",
    color: "#f59e0b",
    items: ["Static and runtime audits", "Drift detection", "Risk flags"],
  },
  {
    id: "kit",
    name: "187KIT",
    tagline: "Equip · scaffold · template",
    color: "#3b82f6",
    items: ["Design tokens", "14 industry templates", "Archetype scaffolds"],
  },
  {
    id: "standard",
    name: "187STANDARD",
    tagline: "Judge · check · certify",
    color: "#a855f7",
    items: ["Pre-ship checklist", "WCAG+ review", "Quality gates"],
  },
  {
    id: "flow",
    name: "187FLOW",
    tagline: "Plan · route · sequence",
    color: "#ec4899",
    items: ["Multi-surface workflows", "Handoff maps", "Release sequencing"],
  },
  {
    id: "repo",
    name: "187REPO",
    tagline: "Orchestrate · scaffold · deploy",
    color: "#14b8a6",
    items: ["Systematized codebase structure", "Git-flow workflow", "Component versioning", "7 archetype scaffolds"],
  },
  {
    id: "craft",
    name: "187CRAFT",
    tagline: "Design · UX · frontend",
    color: "#0ea5e9",
    items: ["Atomic design system", "Pixel-perfect components", "Scalable grid modules", "Accessibility-first tokens"],
  },
  {
    id: "vibe",
    name: "187VIBE",
    tagline: "Delight · community · execution",
    color: "#eab308",
    items: ["UX flow mapping v2.0", "Interaction state library", "User behavior data", "Micro-interactions"],
  },
  {
    id: "launch",
    name: "187LAUNCH",
    tagline: "Ship · launch · grow",
    color: "#FF2D2D",
    items: ["CI/CD build pipelines", "Multi-environment deploy", "Instant rollbacks", "Go-to-market intelligence"],
  },
];

const newSuites = skillShowcases.map((s) => ({
  id: s.id,
  name: s.name,
  tagline: s.tagline,
  color: s.color,
  href: `/187${s.id}`,
  items: s.useCases.slice(0, 4),
}));

const suites = [...baseSuites, ...newSuites];

const modules = [
  { id: "thread", name: "THREAD", desc: "Prompt shaping, intent extraction, rewrite, refactor", color: "#39FF14" },
  { id: "tune", name: "TUNE", desc: "Model behavior, output profile, inference settings", color: "#3b82f6" },
  { id: "cord", name: "CORD", desc: "Coordinated role dispatch, expert persona routing", color: "#f59e0b" },
  { id: "char", name: "CHAR", desc: "Shared scout for web/source/context help", color: "#FF2D2D" },
  { id: "lab", name: "LAB", desc: "Local action box, isolated execution/test workspace", color: "#a855f7" },
];

const nav = [
  { href: "#suites", label: "Skills" },
  { href: "#modules", label: "Modules" },
  { href: "/187", label: "/187" },
  { href: "/187repo", label: "Commands" },
  { href: "/install", label: "Install" },
  { href: "#docs", label: "Docs" },
];

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="sc-glass mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full px-5 py-2.5">
        <a href="#top" className="flex items-center gap-2 font-bold tracking-tight text-white">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-[#39FF14] text-xs text-[#05060A]">
            187
          </span>
          <span className="hidden sm:inline">WEB</span>
        </a>
        <div className="hidden items-center gap-7 text-sm text-white/60 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-white">
              {item.label}
            </Link>
          ))}
        </div>
        <a
          href={REPO}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex h-9 items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 text-sm font-medium text-white transition hover:bg-white/10"
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0A0C14]">
      <div className="container-x py-12">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} Lumen Helix Solutions · MIT License
          </p>
          <div className="flex items-center gap-6">
            <a
              href={REPO}
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm text-white/50 transition hover:text-white"
            >
              GitHub
            </a>
            <Link href="/install" className="text-sm text-white/50 transition hover:text-white">
              Install
            </Link>
            <Link href="/187repo" className="text-sm text-white/50 transition hover:text-white">
              /commands
            </Link>
            <Link href="/187docs" className="text-sm text-white/50 transition hover:text-white">
              Docs
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Showcase() {
  return (
    <div
      className="showcase relative overflow-x-clip"
      style={{ background: "#05060A", color: "#ECEDF7" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(57,255,20,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.15) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(120% 100% at 50% 0%, #000 40%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(120% 100% at 50% 0%, #000 40%, transparent 85%)",
        }}
        aria-hidden="true"
      />

      <Header />

      <section id="top" className="relative px-6 pb-20 pt-32 sm:pb-28 sm:pt-40">
        <div className="container-x relative">
          <div className="mx-auto max-w-4xl text-center">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">
              <span className="h-px w-6 bg-[#39FF14]" aria-hidden="true" />
              A killer AI-powered web suite
            </p>
            <h1 className="mt-6 text-[clamp(2.5rem,1.5rem+5vw,5rem)] font-bold leading-[0.98] tracking-tight text-white">
              Spin sharper sites, ship smarter systems with <span className="text-[#39FF14]">187WEB.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
              Build faster with short commands, standalone AI skills, routed workflows, prefab demos,
              documentation sync, launch support, research tools, revenue systems, accessibility review,
              and a public showcase that explains the whole machine.
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-white/40">
              187COMMAND · 187REPORT · 187SCAN · 187KIT · 187STANDARD · 187FLOW · 187REPO · 187CRAFT ·
              187VIBE · 187LAUNCH · 187FREE · 187RESEARCH · 187SEO · 187REVENUE · 187DOCS · 187WRITE ·
              187LEARN · 187TEST · 187ACCESS+ · 187INCLUDE · 187VERSION · 187PUBLISH
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                href="/187repo"
                className="inline-flex h-12 items-center justify-center rounded bg-[#39FF14] px-6 text-sm font-semibold text-[#05060A] transition hover:brightness-110"
              >
                Browse /commands
              </Link>
              <Link
                href="/187"
                className="inline-flex h-12 items-center justify-center rounded border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Open /187
              </Link>
              <Link
                href="/install"
                className="inline-flex h-12 items-center justify-center rounded border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Install the CLI
              </Link>
            </div>
          </div>

          <Reveal className="mx-auto mt-16 max-w-5xl">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0A0C14]">
              <Image
                src="/images/187suite-hero.jpg"
                alt="187WEB — the 187SKILLS command surface: 22 short-name skills from 187COMMAND to 187PUBLISH"
                className="w-full"
                width={1024}
                height={595}
                priority
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="grammar" className="relative border-y border-white/10 bg-[#0A0C14] px-6 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl rounded-2xl border border-[#39FF14]/20 bg-[#39FF14]/5 p-8 text-center sm:p-12">
            <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">
              <span className="h-px w-6 bg-[#39FF14]" aria-hidden="true" />
              Command grammar
            </p>
            <h2 className="mt-4 text-[clamp(1.5rem,1rem+2vw,2.25rem)] font-semibold tracking-tight text-white">
              187 &lt;alias&gt; [target] [mode] [depth]
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-white/70">
              One short command routes intent to the right skill. Default is <strong>solo + brief</strong>.
              Use <strong>assist</strong>, <strong>flow</strong>, or <strong>release</strong> when coordination helps.
            </p>
            <div className="mt-8 grid gap-3 text-sm text-white/60 sm:grid-cols-3">
              <div className="rounded-lg border border-white/10 bg-[#05060A] p-4">
                <code className="text-[#39FF14]">187 craft hero report</code>
                <p className="mt-2 text-white/50">assist depth</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#05060A] p-4">
                <code className="text-[#39FF14]">187 seo audit brief</code>
                <p className="mt-2 text-white/50">solo default</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-[#05060A] p-4">
                <code className="text-[#39FF14]">187 publish release deep</code>
                <p className="mt-2 text-white/50">release depth</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="suites" className="relative px-6 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">
              <span className="h-px w-6 bg-[#39FF14]" aria-hidden="true" />
              The 187SKILLS suite
            </p>
            <h2 className="mt-4 text-[clamp(1.9rem,1.2rem+2.6vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-white">
              22 short-name skills. One strike.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/55">
              Each short-name skill delegates back to mature 187web skills, so you get speed without
              sacrificing depth. Click any skill below to see its triggers, outputs, and templates.
            </p>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {suites.map((suite, i) => {
              const card = (
                <div
                  className="h-full rounded-2xl border border-white/10 bg-[#0A0C14] p-6 transition hover:-translate-y-1 sm:p-8"
                  style={{
                    boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 24px 60px -24px ${suite.color}22`,
                  }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className="inline-flex h-3 w-3 rounded-full"
                      style={{ backgroundColor: suite.color, boxShadow: `0 0 12px ${suite.color}` }}
                      aria-hidden="true"
                    />
                    <h3 className="text-xl font-bold text-white">{suite.name}</h3>
                    <span className="text-sm text-white/50">— {suite.tagline}</span>
                  </div>
                  <ul className="space-y-2 text-white/70">
                    {suite.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span style={{ color: suite.color }}>▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );

              return (
                <Reveal key={suite.id} delay={i * 80}>
                  {"href" in suite && typeof suite.href === "string" ? (
                    <Link href={suite.href} className="block">
                      {card}
                    </Link>
                  ) : (
                    card
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="modules" className="relative border-y border-white/10 bg-[#0A0C14] px-6 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">
              <span className="h-px w-6 bg-[#39FF14]" aria-hidden="true" />
              Charlotte modules
            </p>
            <h2 className="mt-4 text-[clamp(1.9rem,1.2rem+2.6vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-white">
              THREAD · TUNE · CORD · CHAR · LAB
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/55">
              Five lightweight coordination modules. They only coordinate when a task benefits from
              routing, shared context, handoff, or release synchronization.
            </p>
          </Reveal>

          <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {modules.map((m, i) => (
              <Reveal key={m.id} delay={i * 80}>
                <div className="h-full rounded-2xl border border-white/10 bg-[#05060A] p-6 text-center transition hover:-translate-y-1">
                  <span
                    className="mx-auto mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-[#05060A]"
                    style={{ backgroundColor: m.color, boxShadow: `0 0 16px ${m.color}44` }}
                  >
                    {m.name[0]}
                  </span>
                  <h3 className="text-lg font-bold text-white">{m.name}</h3>
                  <p className="mt-2 text-sm text-white/55">{m.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mx-auto mt-12 max-w-3xl text-center">
            <p className="text-sm text-white/40">
              Legacy aliases: widow-weaver → thread · neuro-toxin → tune · swarm-mind → cord ·
              agent-charlotte → char · silk-sandbox → lab
            </p>
          </Reveal>
        </div>
      </section>

      <section id="docs" className="relative px-6 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">
              <span className="h-px w-6 bg-[#39FF14]" aria-hidden="true" />
              Documentation
            </p>
            <h2 className="mt-4 text-[clamp(1.9rem,1.2rem+2.6vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-white">
              Every surface tells the same story
            </h2>
          </Reveal>

          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
            {[
              { href: "/187docs", label: "187DOCS showcase", desc: "Documentation architecture engine" },
              { href: "/docs/187SKILLS.md", label: "187SKILLS.md", desc: "Operating layer overview" },
              { href: "/docs/187-NAMES.md", label: "187-NAMES.md", desc: "Short-name alias reference" },
              { href: "/docs/187-MODULES.md", label: "187-MODULES.md", desc: "THREAD / TUNE / CORD / CHAR / LAB" },
              { href: "/docs/187-KERNEL.md", label: "187-KERNEL.md", desc: "Behavior cycle and autonomy levels" },
              { href: "/docs/SHOWCASE-SYNC.md", label: "SHOWCASE-SYNC.md", desc: "Public surface sync runbook" },
            ].map((d) => (
              <Reveal key={d.href}>
                <Link
                  href={d.href}
                  className="flex h-full items-center justify-between rounded-xl border border-white/10 bg-[#0A0C14] p-6 transition hover:bg-white/5"
                >
                  <div>
                    <h3 className="font-semibold text-white">{d.label}</h3>
                    <p className="mt-1 text-sm text-white/50">{d.desc}</p>
                  </div>
                  <span className="text-[#39FF14]">→</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-y border-white/10 bg-[#0A0C14] px-6 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl rounded-2xl border border-[#39FF14]/20 bg-[#39FF14]/5 p-8 text-center sm:p-12">
            <h2 className="text-[clamp(1.5rem,1rem+2vw,2.25rem)] font-semibold tracking-tight text-white">
              Ready to wire up the suite?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-white/70">
              Install the CLI, get the manifest and short-name scripts on PATH, and deploy your
              first archetype in one command.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/install"
                className="inline-flex h-14 items-center justify-center rounded bg-[#39FF14] px-8 text-base font-semibold text-[#05060A] transition hover:brightness-110"
              >
                Go to installer
              </Link>
              <a
                href={REPO}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-14 items-center justify-center rounded border border-white/10 bg-white/5 px-8 text-base font-semibold text-white transition hover:bg-white/10"
              >
                View on GitHub
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
