import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { CommandPalette } from "@/components/187/CommandPalette";

const REPO = "https://github.com/lumenhelixsolutions/187WEB";

const coreSkills = [
  ["187COMMAND", "cmd", "Universal command router"], ["187REPORT", "rpt", "Reports, audits, approvals"],
  ["187SCAN", "scan", "Repo, site, and doc inspection"], ["187KIT", "kit", "Templates and prefab demos"],
  ["187STANDARD", "std", "Quality standards and gates"], ["187FLOW", "flow", "Scoped workflows"],
  ["187REPO", "repo", "Repo structure and deployment"], ["187CRAFT", "craft", "Design, UX, frontend"],
  ["187VIBE", "vibe", "Onboarding and delight"], ["187LAUNCH", "ship", "Launch and growth"],
  ["187FREE", "free", "Free-tier architecture"], ["187RESEARCH", "res", "Source maps and evidence"],
  ["187SEO", "seo", "Search visibility"], ["187REVENUE", "rev", "Offers and monetization"],
  ["187DOCS", "docs", "README, docs, SOPs"], ["187WRITE", "write", "Copy and content"],
  ["187LEARN", "learn", "Courses and lessons"], ["187TEST", "test", "QA, tests, rubrics"],
  ["187ACCESS+", "ax", "Accessibility"], ["187INCLUDE", "inc", "Inclusive UX"],
  ["187VERSION", "ver", "Changelog and SemVer"], ["187PUBLISH", "pub", "Docs/demo sync"],
];

const modules = [
  ["THREAD", "th", "Prompt shaping and intent extraction"],
  ["TUNE", "tu", "Output profile and model behavior"],
  ["CORD", "co", "Expert role dispatch"],
  ["CHAR", "ch", "Charlotte assisted research"],
  ["LAB", "lb", "Local action box"],
];

const research = [
  ["187SCI", "sci", "Claim discipline and non-claims"], ["187LABS", "labs", "Experiment protocols"],
  ["187DATA", "data", "Dataset/public DB workflows"], ["187API", "api", "OpenAPI contracts"],
  ["187BENCH", "bench", "Benchmarks and reproducibility"], ["187NB", "nb", "Notebook protocol"],
  ["187COLAB", "colab", "Google Colab profile"], ["187GAP", "gap", "GAP computational algebra"],
  ["187META", "meta", "Metadata and citation"], ["187PROV", "prov", "Provenance lineage"],
  ["187CRATE", "crate", "RO-Crate and release packets"], ["RRP", "rrp", "Research Release Packet"],
];

const packs = [
  ["core-lite", "cmd · rpt · scan · flow · docs · ver · pub"],
  ["web-build", "repo · craft · kit · lab · docs · test · ax"],
  ["research-lab", "res · sci · labs · data · api · bench · meta · prov · crate"],
  ["colab-lab", "nb · colab · labs · data · bench"],
  ["gap-math", "gap · sci · bench · meta · prov · crate"],
  ["local-brain", "vault · docs · rpt · res · ch · co"],
];

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="sc-glass mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full px-5 py-2.5">
        <a href="#top" className="flex items-center gap-2 font-bold tracking-tight text-white">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-[#39FF14] text-xs text-[#05060A]">187</span>
          <span className="hidden sm:inline">187WEB</span>
        </a>
        <div className="hidden items-center gap-7 text-sm text-white/60 md:flex">
          <a href="#skills" className="transition hover:text-white">Skills</a>
          <a href="#research" className="transition hover:text-white">Research Lab</a>
          <Link href="/187" className="transition hover:text-white">/187</Link>
          <Link href="/install" className="transition hover:text-white">Install</Link>
        </div>
        <a href={REPO} target="_blank" rel="noreferrer noopener" className="inline-flex h-9 items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 text-sm font-medium text-white transition hover:bg-white/10">GitHub</a>
      </nav>
    </header>
  );
}

function Grid({ items }: { items: string[][] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(([name, alias, purpose]) => (
        <div key={`${name}-${alias}`} className="rounded-2xl border border-white/10 bg-[#0A0C14] p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-bold text-white">{name}</h3>
            <code className="rounded bg-[#39FF14]/10 px-2 py-1 text-xs text-[#39FF14]">/187 {alias}</code>
          </div>
          <p className="mt-3 text-sm leading-6 text-white/60">{purpose}</p>
        </div>
      ))}
    </div>
  );
}

export function Showcase() {
  return (
    <div className="showcase relative overflow-x-clip bg-[#05060A] text-[#ECEDF7]">
      <div className="pointer-events-none absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(rgba(57,255,20,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.15) 1px, transparent 1px)", backgroundSize: "40px 40px", maskImage: "radial-gradient(120% 100% at 50% 0%, #000 40%, transparent 85%)", WebkitMaskImage: "radial-gradient(120% 100% at 50% 0%, #000 40%, transparent 85%)" }} aria-hidden="true" />
      <Header />

      <section id="top" className="relative px-6 pb-20 pt-32 sm:pb-28 sm:pt-40">
        <div className="container-x relative">
          <div className="mx-auto max-w-5xl text-center">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]"><span className="h-px w-6 bg-[#39FF14]" aria-hidden="true" />187WEB</p>
            <h1 className="mt-6 text-[clamp(2.75rem,1.4rem+6vw,6rem)] font-bold leading-[0.92] tracking-tight text-white">
              A killer AI-powered web suite: <span className="text-[#39FF14]">spin sharper sites, ship smarter systems.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/65">
              Build faster with short commands, standalone AI skills, routed workflows, prefab demos, documentation sync, launch support, research tools, revenue systems, accessibility review, public DB/API workflows, and a live showcase that explains the whole machine.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link href="/187" className="inline-flex h-12 items-center justify-center rounded bg-[#39FF14] px-6 text-sm font-semibold text-[#05060A] transition hover:brightness-110">Explore /187 Commands</Link>
              <Link href="/install" className="inline-flex h-12 items-center justify-center rounded border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10">Install / Select Skills</Link>
              <a href={REPO} target="_blank" rel="noreferrer noopener" className="inline-flex h-12 items-center justify-center rounded border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10">GitHub Repo</a>
            </div>
          </div>
          <Reveal className="mx-auto mt-16 max-w-5xl"><CommandPalette /></Reveal>
        </div>
      </section>

      <section id="skills" className="relative px-6 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">187SKILLS map</p>
            <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">Standalone-first skills. Routed only when useful.</h2>
            <p className="mt-4 text-white/60">Each skill can work alone. The ecosystem coordinates through assist, flow, or release mode when a task benefits from shared context, handoff, or public-surface sync.</p>
          </Reveal>
          <Grid items={coreSkills} />
        </div>
      </section>

      <section className="relative border-y border-white/10 bg-[#0A0C14] px-6 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">Charlotte module array</p>
            <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">THREAD / TUNE / CORD / CHAR / LAB.</h2>
          </Reveal>
          <Grid items={modules} />
        </div>
      </section>

      <section id="research" className="relative px-6 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">Research Lab Stack</p>
            <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">Scientific standards, public data APIs, notebooks, GAP, Colab, and release packets.</h2>
            <p className="mt-4 text-white/60">187WEB turns research work into claim tables, source maps, experiment protocols, dataset cards, OpenAPI contracts, benchmarks, metadata, provenance, and Research Release Packets.</p>
          </Reveal>
          <Grid items={research} />
        </div>
      </section>

      <section className="relative border-y border-white/10 bg-[#0A0C14] px-6 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">Preflight / install / onboarding</p>
            <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">Install one thing, a curated pack, or the full suite.</h2>
            <p className="mt-4 text-white/60">The selector separates requirements from optional improvements and detects what the current agentic runtime can support.</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {packs.map(([name, contents]) => (
              <div key={name} className="rounded-2xl border border-white/10 bg-[#05060A] p-5">
                <h3 className="font-bold text-white">{name}</h3>
                <p className="mt-3 font-mono text-sm leading-6 text-[#39FF14]/80">{contents}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#05060A] px-6 py-12">
        <div className="container-x flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-white/50">© {new Date().getFullYear()} Lumen Helix Solutions · 187WEB · Custom Noncommercial License with Reserved Knotstore IP</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/187" className="text-sm text-white/50 transition hover:text-white">/187 Reference</Link>
            <Link href="/install" className="text-sm text-white/50 transition hover:text-white">Install</Link>
            <a href={REPO} target="_blank" rel="noreferrer noopener" className="text-sm text-white/50 transition hover:text-white">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
