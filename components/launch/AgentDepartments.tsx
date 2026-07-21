"use client";

import Link from "next/link";
import { NatashaBlueprint } from "@/components/BrandMark";
import { Reveal } from "@/components/Reveal";
import { Tooltip } from "@/components/Tooltip";
import { skillShowcaseIndex, type SkillShowcaseData } from "@/lib/skill-showcase-data";
import { FIRST_CLASS_SKILLS, SUBSKILLS, type SuiteSkill } from "@/lib/first-class-skills";

/**
 * Top-level 187WEB agent ecosystem.
 *
 * Agent → skill mapping:
 * - NATASHA: natasha, chain, test (external / post-launch security + applications)
 * - YELENA: natasha, test, access-plus, include (pre-launch internal security + safety gates + applications)
 * - CHARLOTTE: repo, craft, vibe, launch, write, research (application orchestration)
 * - KALI: seo, revenue, publish, create, repo, vibe (growth + create assist)
 * - XAVIER: docs, version, publish, launch, natasha, test (final creation / production + council)
 *
 * NATASHA and YELENA split security duties so CHARLOTTE and KALI stay focused
 * on application work. Any agent can jump in, assign subagents, call any 1st/2nd/3rd
 * class skill when triggered, or appeal to XAVIER for a council or SkillChain.
 */

type AgentConfig = {
  slug: string;
  name: string;
  tagline: string;
  color: string;
  skillIds: string[];
  overview: string;
};

const AGENTS: AgentConfig[] = [
  {
    slug: "natasha",
    name: "NATASHA",
    tagline: "External + post-launch security",
    color: "#f43f5e",
    skillIds: ["natasha", "chain", "test"],
    overview:
      "NATASHA handles external and post-launch security: threat-surface audits, contract and chain assurance, and test-driven validation after ship. She shares the security workload with YELENA and can call XAVIER for a council when a post-launch incident escalates.",
  },
  {
    slug: "yelena",
    name: "YELENA",
    tagline: "Pre-launch internal safety gates",
    color: "#facc15",
    skillIds: ["natasha", "test", "access-plus", "include"],
    overview:
      "YELENA owns pre-launch internal security and safety gates: access checks, inclusion review, test-driven CI gates, and release readiness. She frees CHARLOTTE and KALI to build applications while standing ready to jump in when a safety review is triggered.",
  },
  {
    slug: "charlotte",
    name: "CHARLOTTE",
    tagline: "Application orchestration",
    color: "#3b82f6",
    skillIds: ["repo", "craft", "vibe", "launch", "write", "research"],
    overview:
      "CHARLOTTE orchestrates application work: design systems, repo scaffolding, launch planning, plain-language copy, and research-backed recycling. Security is handled by NATASHA and YELENA, so she focuses on shipping and can appeal to XAVIER for final production decisions.",
  },
  {
    slug: "kali",
    name: "KALI",
    tagline: "Growth + create assist",
    color: "#39FF14",
    skillIds: ["seo", "revenue", "publish", "create", "repo", "vibe"],
    overview:
      "KALI drives growth and assists CHARLOTTE with direct web creation: SEO, revenue architecture, publish gate, and the new 187CREATE skill for landing pages and campaign assets. She can appeal to NATASHA/YELENA for security gates and to XAVIER for final ship calls.",
  },
  {
    slug: "xavier",
    name: "XAVIER",
    tagline: "Final creation + council",
    color: "#a855f7",
    skillIds: ["docs", "version", "publish", "launch", "natasha", "test"],
    overview:
      "XAVIER is the only male-coded agent and the crew's final creation / production lead. He sees across all crews, can call a council huddle or Q&A, and owns the publish/launch/version skills that turn work into shipped artifacts.",
  },
];

const skillById = new Map([...FIRST_CLASS_SKILLS, ...SUBSKILLS].map((s) => [s.id, s]));

function skillMeta(id: string): SkillShowcaseData | undefined {
  return skillShowcaseIndex.get(id);
}

function AgentCard({ agent, index }: { agent: AgentConfig; index: number }) {
  const skills = agent.skillIds
    .map((id) => ({ skill: skillById.get(id), meta: skillMeta(id) }))
    .filter((item): item is { skill: SuiteSkill; meta: SkillShowcaseData | undefined } => Boolean(item.skill));

  return (
    <Reveal delay={index * 80}>
      <Tooltip content={<>{agent.overview}</>}>
        <Link
          href={`/${agent.slug}`}
          className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0A0C14] transition hover:-translate-y-1 hover:border-white/20"
          style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.03), 0 24px 60px -24px ${agent.color}22` }}
        >
          <div className="relative h-56 overflow-hidden bg-black/40 sm:h-64">
            <NatashaBlueprint className="absolute inset-0 h-full w-full object-cover opacity-70" />
            <div
              className="absolute inset-0 opacity-60"
              style={{ backgroundColor: agent.color, mixBlendMode: "color" }}
            />
            <div
              className="absolute inset-0 opacity-20"
              style={{ backgroundColor: agent.color, mixBlendMode: "overlay" }}
            />

            <span
              className="absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-bold text-[#050608]"
              style={{ backgroundColor: agent.color }}
            >
              {agent.name}
            </span>
          </div>

          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-white">{agent.name}</h3>
                <p className="text-sm" style={{ color: agent.color }}>
                  {agent.tagline}
                </p>
              </div>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-white/60">{agent.overview}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {skills.map(({ skill, meta }) => (
                <Tooltip
                  key={skill.id}
                  content={
                    <>
                      <strong className="text-white">{skill.name}</strong> — {meta?.description ?? `Open ${skill.name}`}{" "}
                      <Link href={`/187${skill.id}`} className="mt-2 block text-[#39FF14] underline">
                        Go to {skill.name} →
                      </Link>
                    </>
                  }
                >
                  <span
                    className="rounded-full px-3 py-1 text-xs font-medium"
                    style={{
                      backgroundColor: `${agent.color}18`,
                      color: agent.color,
                      border: `1px solid ${agent.color}30`,
                    }}
                  >
                    {skill.name}
                    {meta && <span className="ml-1.5 text-white/50">{meta.triggers[0]}</span>}
                  </span>
                </Tooltip>
              ))}
            </div>

            <div className="mt-auto flex items-center gap-1 pt-5 text-sm font-medium" style={{ color: agent.color }}>
              <span>Open {agent.name}</span>
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
          </div>
        </Link>
      </Tooltip>
    </Reveal>
  );
}

export function AgentDepartments() {
  return (
    <section id="agents" className="relative border-y border-white/10 bg-[#080808]/80 px-6 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">First-class agents</p>
          <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">
            Five agents. One web hive.
          </h2>
          <p className="mt-4 text-white/60">
            Each agent routes related skills into a coherent crew. Click through to see modules, triggers, and skill pages.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {AGENTS.map((agent, i) => (
            <AgentCard key={agent.slug} agent={agent} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
