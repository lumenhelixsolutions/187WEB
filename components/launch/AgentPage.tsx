import Link from "next/link";
import { NatashaBlueprint } from "@/components/BrandMark";
import { Reveal } from "@/components/Reveal";
import { ProductShell } from "./ProductShell";
import { brandAssets } from "@/lib/brand-assets";
import { skillShowcaseIndex, type SkillShowcaseData } from "@/lib/skill-showcase-data";
import { FIRST_CLASS_SKILLS, SUBSKILLS, type SuiteSkill } from "@/lib/first-class-skills";
import { charlotteModules } from "./launch-data";

export type AgentConfig = {
  slug: string;
  name: string;
  tagline: string;
  color: string;
  skillIds: string[];
  overview: string;
};

const skillById = new Map([...FIRST_CLASS_SKILLS, ...SUBSKILLS].map((s) => [s.id, s]));

function skillMeta(id: string): SkillShowcaseData | undefined {
  return skillShowcaseIndex.get(id);
}

function AgentHero({ agent }: { agent: AgentConfig }) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 px-6 pb-16 pt-28 sm:pb-24 sm:pt-36">
      <div className="container-x relative">
        <div className="mx-auto max-w-5xl">
          <div className="relative mx-auto mb-10 max-w-3xl overflow-hidden rounded-2xl border p-2 shadow-[0_0_60px_rgba(57,255,20,0.12)]"
            style={{ borderColor: `${agent.color}40`, boxShadow: `0 0 60px ${agent.color}20` }}
          >
            <div className="relative overflow-hidden rounded-xl bg-black/40">
              <NatashaBlueprint priority className="rounded-xl opacity-90" />
              <div
                className="absolute inset-0 opacity-60"
                style={{ backgroundColor: agent.color, mixBlendMode: "color" }}
              />
              <div
                className="absolute inset-0 opacity-20"
                style={{ backgroundColor: agent.color, mixBlendMode: "overlay" }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element -- basePath-safe static export */}
              <img
                src={brandAssets.headerLockup}
                alt="187WEB"
                className="absolute bottom-4 left-4 h-8 w-auto opacity-90 sm:h-10"
              />
            </div>
          </div>

          <div className="text-center">
            <p
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: agent.color }}
            >
              <span className="h-px w-6" style={{ backgroundColor: agent.color }} aria-hidden="true" />
              187WEB Agent
            </p>
            <h1 className="mt-6 text-[clamp(2.75rem,1.4rem+6vw,6rem)] font-bold leading-[0.92] tracking-tight text-white">
              {agent.name} —{" "}
              <span style={{ color: agent.color }}>{agent.tagline}.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/65">{agent.overview}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                href="/showcase"
                className="inline-flex h-12 items-center justify-center rounded border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                ← Back to showcase
              </Link>
              <Link
                href="/"
                className="inline-flex h-12 items-center justify-center rounded border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Agent ecosystem
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill, meta, agentColor, index }: { skill: SuiteSkill; meta: SkillShowcaseData | undefined; agentColor: string; index: number }) {
  const trigger = meta?.triggers[0] ?? `/187 ${skill.id}`;
  const tagline = meta?.tagline ?? skill.name;
  return (
    <Reveal delay={index * 60}>
      <Link
        href={`/187${skill.id}`}
        className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#0A0C14] p-5 transition hover:-translate-y-1 hover:border-white/20"
        style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.03), 0 24px 60px -24px ${agentColor}22` }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-bold text-white">{skill.name}</h3>
            <p className="text-sm" style={{ color: agentColor }}>
              {tagline}
            </p>
          </div>
          <span
            className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg text-xs font-bold text-[#050608]"
            style={{ backgroundColor: agentColor }}
          >
            {skill.id.slice(0, 2).toUpperCase()}
          </span>
        </div>
        {meta && (
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/60">{meta.description}</p>
        )}
        <code className="mt-4 block rounded bg-white/5 px-2 py-1 text-xs text-[#39FF14]">{trigger}</code>
        <div className="mt-auto flex items-center gap-1 pt-5 text-sm font-medium" style={{ color: agentColor }}>
          <span>Open {skill.name}</span>
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

function AgentSkills({ agent }: { agent: AgentConfig }) {
  const skills = agent.skillIds
    .map((id) => ({ skill: skillById.get(id), meta: skillMeta(id) }))
    .filter((item): item is { skill: SuiteSkill; meta: SkillShowcaseData | undefined } => Boolean(item.skill));

  return (
    <section id="skills" className="relative px-6 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: agent.color }}>
            {agent.name} skills
          </p>
          <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">
            Routed skills
          </h2>
          <p className="mt-4 text-white/60">
            Each card links to a dedicated skill page with triggers, outputs, routing, and templates.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {skills.map(({ skill, meta }, i) => (
            <SkillCard key={skill.id} skill={skill} meta={meta} agentColor={agent.color} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AgentModules({ agent }: { agent: AgentConfig }) {
  if (agent.slug !== "charlotte") return null;

  return (
    <section id="modules" className="relative border-y border-white/10 bg-[#080808]/80 px-6 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">CHARLOTTE module array</p>
          <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">
            THREAD · COMPRESS · TENSION · SPARK · CORD · SCOUT · LAB · FUSE
          </h2>
          <p className="mt-4 text-white/60">
            Cross-cutting modules that thread intent, retrieve info, recycle solutions, dispatch experts, run isolated
            actions, and resolve conflicts into decision-ready artifacts.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {charlotteModules.map((module, i) => (
            <Reveal key={module.id} delay={i * 60}>
              <Link
                href={`/${agent.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#0A0C14] p-5 transition hover:-translate-y-1 hover:border-white/20"
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
                  <span>Open CHARLOTTE</span>
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

export function AgentPage({ agent }: { agent: AgentConfig }) {
  return (
    <ProductShell>
      <AgentHero agent={agent} />
      <AgentSkills agent={agent} />
      <AgentModules agent={agent} />
    </ProductShell>
  );
}
