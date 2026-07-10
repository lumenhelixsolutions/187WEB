import type { Metadata } from "next";
import Link from "next/link";
import { EcosystemFooter, EcosystemHeader } from "@/components/ecosystem/Chrome";
import { CommandPaletteDemo } from "@/components/187/CommandPaletteDemo";
import { CommandReference } from "@/components/187/CommandReference";
import { Reveal } from "@/components/Reveal";
import { skillShowcases } from "@/lib/skill-showcase-data";

export const metadata: Metadata = {
  title: "187WEB — A killer AI-powered web suite",
  description:
    "187WEB is a killer AI-powered web suite: spin sharper sites, ship smarter systems. Explore the 187SKILLS command grammar, the full short-name skill roster, and the THREAD / TUNE / CORD / CHAR / LAB modules.",
};

const nav = [
  { href: "#grammar", label: "Grammar" },
  { href: "#commands", label: "Commands" },
  { href: "#skills", label: "Skills" },
  { href: "#modules", label: "Modules" },
  { href: "#docs", label: "Docs" },
];

const baseSkills = [
  {
    id: "repo",
    name: "187REPO",
    tagline: "Orchestrate · scaffold · deploy",
    color: "#39FF14",
    href: "/187repo",
  },
  {
    id: "craft",
    name: "187CRAFT",
    tagline: "Design · UX · frontend",
    color: "#3b82f6",
    href: "/187craft",
  },
  {
    id: "vibe",
    name: "187VIBE",
    tagline: "Delight · community · execution",
    color: "#f59e0b",
    href: "/187vibe",
  },
  {
    id: "launch",
    name: "187LAUNCH",
    tagline: "Go-to-market intelligence",
    color: "#FF2D2D",
    href: "/187launch",
  },
];

const supportSkills = [
  { id: "command", name: "187COMMAND", tagline: "Universal entry point", color: "#94a3b8" },
  { id: "report", name: "187REPORT", tagline: "Situational summary", color: "#94a3b8" },
  { id: "scan", name: "187SCAN", tagline: "Quick audit and health", color: "#94a3b8" },
  { id: "kit", name: "187KIT", tagline: "Templates and scaffolds", color: "#22d3ee", href: "/187kit" },
  { id: "standard", name: "187STANDARD", tagline: "Quality gates", color: "#94a3b8" },
  { id: "flow", name: "187FLOW", tagline: "Workflow orchestration", color: "#94a3b8" },
];

const modules = [
  {
    id: "thread",
    name: "THREAD",
    tagline: "Prompt shaping + intent extraction",
    color: "#a855f7",
  },
  {
    id: "tune",
    name: "TUNE",
    tagline: "Model behavior + output profile",
    color: "#ec4899",
  },
  {
    id: "cord",
    name: "CORD",
    tagline: "Role dispatch + coordination",
    color: "#f97316",
  },
  {
    id: "char",
    name: "CHAR",
    tagline: "Shared web/source scout",
    color: "#0ea5e9",
  },
  {
    id: "lab",
    name: "LAB",
    tagline: "Isolated execution workspace",
    color: "#10b981",
  },
];

const docs = [
  { name: "187SKILLS.md", desc: "Operating layer and full skill roster" },
  { name: "187-NAMES.md", desc: "Alias table, modes, and depths" },
  { name: "187-MODULES.md", desc: "THREAD / TUNE / CORD / CHAR / LAB" },
  { name: "187-KERNEL.md", desc: "Behavior cycle and autonomy levels" },
  { name: "187-CHAR.md", desc: "Shared scout documentation" },
  { name: "187-COMMANDS.md", desc: "Full /187 slash-command reference" },
  { name: "187-COMMAND-GRAMMAR.md", desc: "Grammar rules, modes, and depths" },
  { name: "187-AUTOCOMPLETE.md", desc: "Autocomplete + alias matching guide" },
  { name: "187-CLI-SELECTOR.md", desc: "Install profile selector" },
  { name: "187-INSTALL-PROFILES.md", desc: "Platform install profiles" },
  { name: "187-ABILITIES.md", desc: "Capability surface overview" },
  { name: "SHOWCASE-SYNC.md", desc: "Keep every public surface in sync" },
  { name: "INSTALL.md", desc: "Cross-platform install guide" },
  { name: "ROUTING.md", desc: "Skill routing guide" },
];

export default function WebOverviewPage() {
  return (
    <div className="relative min-h-screen bg-[#05060A] font-sans text-[#d6deeb]">
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

      <EcosystemHeader navLabel="187WEB" nav={nav} cta={{ href: "/install", label: "Install" }} />

      <section
        id="hero"
        className="relative overflow-hidden border-b border-white/10 px-6 pb-16 pt-12 sm:pb-24 sm:pt-20"
      >
        <div className="container-x relative">
          <div className="mx-auto max-w-4xl text-center">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">
              <span className="h-px w-6 bg-[#39FF14]" aria-hidden="true" />
              187WEB
            </p>
            <h1 className="mt-6 text-[clamp(2.5rem,1.5rem+5vw,5rem)] font-bold leading-[0.98] tracking-tight text-white">
              A killer <span className="text-[#39FF14]">AI-powered web suite:</span> spin sharper
              sites, ship smarter systems.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
              An AI-powered suite of web tools to die for. 187SKILLS is the operating layer behind
              the 187WEB brand: short-name skills, command grammar, and modules that turn intent
              into action.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                href="/install"
                className="inline-flex h-12 items-center justify-center rounded bg-[#39FF14] px-6 text-sm font-semibold text-[#05060A] transition hover:brightness-110"
              >
                Install the CLI
              </Link>
              <Link
                href="/187repo"
                className="inline-flex h-12 items-center justify-center rounded border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Browse /commands
              </Link>
              <CommandPaletteDemo />
            </div>
          </div>
        </div>
      </section>

      <section id="commands" className="border-y border-white/10 bg-[#0A0C14] px-6 py-20 sm:py-28">
        <CommandReference />
      </section>

      <section id="grammar" className="border-b border-white/10 px-6 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">
              <span className="h-px w-6 bg-[#39FF14]" aria-hidden="true" />
              Command grammar
            </p>
            <h2 className="mt-4 text-[clamp(1.9rem,1.2rem+2.6vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-white">
              One grammar for every request
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/55">
              Every short-name request follows the same shape. The alias resolves to a skill; the
              target, mode, and depth scope the work.
            </p>
          </Reveal>

          <Reveal className="mx-auto mt-10 max-w-3xl">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0A0C14] p-6 sm:p-10">
              <code className="block text-center font-mono text-lg text-[#39FF14] sm:text-2xl">
                187 &lt;alias&gt; [target] [mode] [depth]
              </code>
              <div className="mt-8 grid gap-4 text-sm text-white/70 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <span className="font-semibold text-white">Example</span>
                  <p className="mt-1 font-mono text-[#39FF14]">187 seo /pricing report</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <span className="font-semibold text-white">Modes</span>
                  <p className="mt-1">solo · assist · flow · release</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <span className="font-semibold text-white">Depths</span>
                  <p className="mt-1">brief · report · deep</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <span className="font-semibold text-white">Default</span>
                  <p className="mt-1 font-mono text-[#39FF14]">solo + brief</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="skills" className="px-6 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto mb-14 max-w-prose text-center">
            <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">
              <span className="h-px w-6 bg-[#39FF14]" aria-hidden="true" />
              187SKILLS
            </p>
            <h2 className="mt-4 text-[clamp(1.9rem,1.2rem+2.6vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-white">
              Full short-name suite
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/55">
              Base skills, public suite, and control layer. Each skill is standalone-first and
              coordinates only when helpful.
            </p>
          </Reveal>

          <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...baseSkills, ...skillShowcases, ...supportSkills].map((skill, i) => {
              const href =
                "href" in skill && skill.href
                  ? skill.href
                  : skill.id && skillShowcases.some((s) => s.id === skill.id)
                    ? `/187${skill.id}`
                    : undefined;
              const card = (
                <div
                  className="h-full rounded-2xl border border-white/10 bg-[#0A0C14] p-5 transition hover:-translate-y-1"
                  style={{
                    boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 24px 60px -24px ${skill.color}22`,
                  }}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span
                      className="inline-flex h-3 w-3 rounded-full"
                      style={{ backgroundColor: skill.color, boxShadow: `0 0 12px ${skill.color}` }}
                      aria-hidden="true"
                    />
                    <h3 className="text-lg font-bold text-white">{skill.name}</h3>
                  </div>
                  <p className="text-sm text-white/60">{skill.tagline}</p>
                </div>
              );
              return (
                <Reveal key={skill.id} delay={i * 40}>
                  {href ? (
                    <Link href={href} className="block">
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

      <section
        id="modules"
        className="border-y border-white/10 bg-[#0A0C14] px-6 py-20 sm:py-28"
      >
        <div className="container-x">
          <Reveal className="mx-auto mb-14 max-w-prose text-center">
            <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">
              <span className="h-px w-6 bg-[#39FF14]" aria-hidden="true" />
              Modules
            </p>
            <h2 className="mt-4 text-[clamp(1.9rem,1.2rem+2.6vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-white">
              THREAD / TUNE / CORD / CHAR / LAB
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/55">
              Cross-cutting capabilities that sharpen any skill. They coordinate only when they add
              value.
            </p>
          </Reveal>

          <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((m, i) => (
              <Reveal key={m.id} delay={i * 60}>
                <div
                  className="h-full rounded-2xl border border-white/10 bg-[#05060A] p-6 transition hover:-translate-y-1"
                  style={{
                    boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 24px 60px -24px ${m.color}22`,
                  }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className="inline-flex h-3 w-3 rounded-full"
                      style={{ backgroundColor: m.color, boxShadow: `0 0 12px ${m.color}` }}
                      aria-hidden="true"
                    />
                    <h3 className="text-xl font-bold text-white">{m.name}</h3>
                  </div>
                  <p className="text-white/70">{m.tagline}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="docs" className="px-6 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto mb-14 max-w-prose text-center">
            <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">
              <span className="h-px w-6 bg-[#39FF14]" aria-hidden="true" />
              Documentation
            </p>
            <h2 className="mt-4 text-[clamp(1.9rem,1.2rem+2.6vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-white">
              Docs that keep the story straight
            </h2>
          </Reveal>

          <div className="mx-auto grid max-w-4xl gap-3">
            {docs.map((doc, i) => (
              <Reveal key={doc.name} delay={i * 50}>
                <a
                  href={`https://github.com/lumenhelixsolutions/187WEB/blob/main/docs/${doc.name}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0A0C14] p-4 transition hover:bg-white/5"
                >
                  <div>
                    <h3 className="font-semibold text-white">{doc.name}</h3>
                    <p className="text-sm text-white/50">{doc.desc}</p>
                  </div>
                  <span className="text-sm text-[#39FF14]">View →</span>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal className="mx-auto mt-10 max-w-3xl rounded-2xl border border-[#39FF14]/20 bg-[#39FF14]/5 p-8 text-center sm:p-12">
            <h3 className="text-xl font-semibold tracking-tight text-white">Want the overview route?</h3>
            <p className="mx-auto mt-3 max-w-lg text-white/70">
              The docs index page lives at <code className="text-[#39FF14]">/187docs</code>. Until it
              ships, every doc is available in the GitHub repository.
            </p>
            <Link
              href="/187demo"
              className="mt-6 inline-flex h-12 items-center justify-center rounded border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              See demo abilities
            </Link>
          </Reveal>
        </div>
      </section>

      <EcosystemFooter secondary={{ href: "/187repo", label: "Browse /commands" }} />
    </div>
  );
}
