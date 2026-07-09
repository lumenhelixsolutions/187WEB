import type { Metadata } from "next";
import Link from "next/link";
import { EcosystemFooter, EcosystemHeader } from "@/components/ecosystem/Chrome";
import { Reveal } from "@/components/Reveal";
import { skillShowcases } from "@/lib/skill-showcase-data";

export const metadata: Metadata = {
  title: "187WEB Demo Abilities",
  description:
    "Overview of 187WEB demo abilities across the suite: slash commands, skill showcases, templates, resilience states, install flow, and the live GitHub Pages demo.",
};

const nav = [
  { href: "#abilities", label: "Abilities" },
  { href: "#skills", label: "Skills" },
  { href: "#live", label: "Live demo" },
];

const abilities = [
  {
    title: "Slash-command reference",
    desc: "Every /command in the 187SKILLS suite, organized by skill.",
    href: "/187repo",
    color: "#39FF14",
  },
  {
    title: "187aiEYE command surface",
    desc: "Standalone multi-agent rail with module toggles for the Local Brain.",
    href: "/187ai-eye",
    color: "#0ea5e9",
  },
  {
    title: "Template gallery",
    desc: "Fourteen industry templates showing the range of 187CRAFT design languages.",
    href: "/templates",
    color: "#22d3ee",
  },
  {
    title: "Resilience states",
    desc: "Loading, empty, error, and offline UI patterns.",
    href: "/resilience",
    color: "#f59e0b",
  },
  {
    title: "Cross-platform installer",
    desc: "Bash and PowerShell install flow for the 187WEB CLI.",
    href: "/install",
    color: "#3b82f6",
  },
  {
    title: "187WEB overview",
    desc: "Command grammar, skill roster, modules, and docs index.",
    href: "/187",
    color: "#a855f7",
  },
];

export default function DemoPage() {
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

      <EcosystemHeader navLabel="187WEB Demo" nav={nav} cta={{ href: "/install", label: "Install" }} />

      <section
        id="hero"
        className="relative overflow-hidden border-b border-white/10 px-6 pb-16 pt-12 sm:pb-24 sm:pt-20"
      >
        <div className="container-x relative">
          <div className="mx-auto max-w-4xl text-center">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">
              <span className="h-px w-6 bg-[#39FF14]" aria-hidden="true" />
              Demo abilities
            </p>
            <h1 className="mt-6 text-[clamp(2.5rem,1.5rem+5vw,5rem)] font-bold leading-[0.98] tracking-tight text-white">
              See <span className="text-[#39FF14]">187WEB</span> in action.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
              A killer AI-powered web suite: spin sharper sites, ship smarter systems. Explore the
              command surface, skill showcases, templates, resilience states, and live demo.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a
                href="https://lumenhelixsolutions.github.io/187WEB/"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-12 items-center justify-center rounded bg-[#39FF14] px-6 text-sm font-semibold text-[#05060A] transition hover:brightness-110"
              >
                Launch live demo
              </a>
              <Link
                href="/187"
                className="inline-flex h-12 items-center justify-center rounded border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                187WEB overview
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
              Explore
            </p>
            <h2 className="mt-4 text-[clamp(1.9rem,1.2rem+2.6vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-white">
              Demo routes across the suite
            </h2>
          </Reveal>

          <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {abilities.map((ability, i) => (
              <Reveal key={ability.title} delay={i * 60}>
                <Link
                  href={ability.href}
                  className="group block h-full rounded-2xl border border-white/10 bg-[#0A0C14] p-6 transition hover:-translate-y-1 hover:bg-white/5"
                  style={{
                    boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 24px 60px -24px ${ability.color}22`,
                  }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className="inline-flex h-3 w-3 rounded-full"
                      style={{
                        backgroundColor: ability.color,
                        boxShadow: `0 0 12px ${ability.color}`,
                      }}
                      aria-hidden="true"
                    />
                    <h3 className="text-lg font-bold text-white group-hover:text-[#39FF14]">
                      {ability.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-white/60">{ability.desc}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="skills"
        className="border-y border-white/10 bg-[#0A0C14] px-6 py-20 sm:py-28"
      >
        <div className="container-x">
          <Reveal className="mx-auto mb-14 max-w-prose text-center">
            <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">
              <span className="h-px w-6 bg-[#39FF14]" aria-hidden="true" />
              Skill showcases
            </p>
            <h2 className="mt-4 text-[clamp(1.9rem,1.2rem+2.6vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-white">
              Every public skill has its own page
            </h2>
          </Reveal>

          <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skillShowcases.map((skill, i) => (
              <Reveal key={skill.id} delay={i * 50}>
                <Link
                  href={`/187${skill.id}`}
                  className="group flex items-center gap-3 rounded-xl border border-white/10 bg-[#05060A] p-4 transition hover:bg-white/5"
                >
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: skill.color, boxShadow: `0 0 10px ${skill.color}` }}
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-[#39FF14]">
                      {skill.name}
                    </h3>
                    <p className="text-sm text-white/50">{skill.tagline}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="live" className="px-6 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl rounded-2xl border border-[#39FF14]/20 bg-[#39FF14]/5 p-8 text-center sm:p-12">
            <h2 className="text-[clamp(1.5rem,1rem+2vw,2.25rem)] font-semibold tracking-tight text-white">
              Live GitHub Pages demo
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-white/70">
              The public demo is deployed from the main branch and stays in sync with the showcase.
            </p>
            <a
              href="https://lumenhelixsolutions.github.io/187WEB/"
              target="_blank"
              rel="noreferrer noopener"
              className="mt-8 inline-flex h-14 items-center justify-center rounded bg-[#39FF14] px-8 text-base font-semibold text-[#05060A] transition hover:brightness-110"
            >
              Open lumenhelixsolutions.github.io/187WEB
            </a>
          </Reveal>
        </div>
      </section>

      <EcosystemFooter secondary={{ href: "/187", label: "187WEB overview" }} />
    </div>
  );
}
