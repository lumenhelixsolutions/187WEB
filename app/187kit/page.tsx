import type { Metadata } from "next";
import Link from "next/link";
import { EcosystemFooter, EcosystemHeader } from "@/components/ecosystem/Chrome";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "187KIT — Tools + Templates",
  description:
    "187KIT is the equipping layer of 187WEB: design-system tokens, industry templates, archetype scaffolds, pre-ship checklists, and install scripts.",
};

const nav = [
  { href: "#abilities", label: "Abilities" },
  { href: "#templates", label: "Templates" },
  { href: "#docs", label: "Docs" },
];

const abilities = [
  {
    title: "Design-system tokens",
    desc: "Warm-blueprint color, type, spacing, and motion tokens ready for Tailwind and CSS variables.",
  },
  {
    title: "Industry templates",
    desc: "Fourteen completely different design languages across SaaS, e-commerce, fintech, healthcare, scientific, agency, and more.",
  },
  {
    title: "Archetype scaffolds",
    desc: "CLI-generated starters for CLI tools, agents, KV engines, edge routers, UI primitives, full monorepos, and award sites.",
  },
  {
    title: "Pre-ship checklist",
    desc: "Quality gates covering lint, typecheck, build, accessibility, SEO, inclusion, and release sync.",
  },
  {
    title: "Install scripts",
    desc: "Cross-platform bash and PowerShell installers that put the 187WEB toolchain on PATH.",
  },
  {
    title: "Model adapters",
    desc: "Skill definitions mirrored for Claude, Grok, Gemini, Kimi, ChatGPT, Ollama, and Hermes formats.",
  },
];

const docs = [
  { name: "SHOWCASE-SYNC.md", desc: "Keep every public surface in sync" },
  { name: "INSTALL.md", desc: "Cross-platform install guide" },
];

export default function KitPage() {
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

      <EcosystemHeader navLabel="187KIT" nav={nav} cta={{ href: "/templates", label: "Templates" }} />

      <section
        id="hero"
        className="relative overflow-hidden border-b border-white/10 px-6 pb-16 pt-12 sm:pb-24 sm:pt-20"
      >
        <div className="container-x relative">
          <div className="mx-auto max-w-4xl text-center">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">
              <span className="h-px w-6 bg-[#39FF14]" aria-hidden="true" />
              187KIT
            </p>
            <h1 className="mt-6 text-[clamp(2.5rem,1.5rem+5vw,5rem)] font-bold leading-[0.98] tracking-tight text-white">
              The equipping layer of <span className="text-[#39FF14]">187WEB.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
              187KIT holds the templates, scaffolds, design tokens, checklists, and install scripts
              that turn a 187WEB plan into a working project.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                href="/templates"
                className="inline-flex h-12 items-center justify-center rounded bg-[#39FF14] px-6 text-sm font-semibold text-[#05060A] transition hover:brightness-110"
              >
                Browse templates
              </Link>
              <Link
                href="/install"
                className="inline-flex h-12 items-center justify-center rounded border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Install the CLI
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="abilities" className="px-6 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto mb-14 max-w-prose text-center">
            <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">
              <span className="h-px w-6 bg-[#39FF14]" aria-hidden="true" />
              Kit abilities
            </p>
            <h2 className="mt-4 text-[clamp(1.9rem,1.2rem+2.6vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-white">
              Everything you need to start building
            </h2>
          </Reveal>

          <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {abilities.map((ability, i) => (
              <Reveal key={ability.title} delay={i * 60}>
                <div
                  className="h-full rounded-2xl border border-white/10 bg-[#0A0C14] p-6 transition hover:-translate-y-1"
                  style={{
                    boxShadow:
                      "0 0 0 1px rgba(255,255,255,0.06), 0 24px 60px -24px rgba(34,211,238,0.13)",
                  }}
                >
                  <h3 className="text-lg font-bold text-white">{ability.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{ability.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="templates"
        className="border-y border-white/10 bg-[#0A0C14] px-6 py-20 sm:py-28"
      >
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl rounded-2xl border border-[#39FF14]/20 bg-[#39FF14]/5 p-8 text-center sm:p-12">
            <h2 className="text-[clamp(1.5rem,1rem+2vw,2.25rem)] font-semibold tracking-tight text-white">
              Browse the template gallery
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-white/70">
              Fourteen industry templates, each with its own design language, palette, and component
              set. Proof that 187CRAFT adapts to the brief instead of stamping one look on everything.
            </p>
            <Link
              href="/templates"
              className="mt-8 inline-flex h-14 items-center justify-center rounded bg-[#39FF14] px-8 text-base font-semibold text-[#05060A] transition hover:brightness-110"
            >
              Open templates
            </Link>
          </Reveal>
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
              Related docs
            </h2>
          </Reveal>

          <div className="mx-auto grid max-w-3xl gap-3">
            {docs.map((doc, i) => (
              <Reveal key={doc.name} delay={i * 60}>
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
        </div>
      </section>

      <EcosystemFooter secondary={{ href: "/templates", label: "Browse templates" }} />
    </div>
  );
}
