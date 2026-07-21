"use client";

import { useState } from "react";
import { skillShowcases, type SkillShowcaseData } from "@/lib/skill-showcase-data";
import { AbilityCard } from "./AbilityCard";

const tabs = [
  { id: "build", label: "Build", skills: ["craft", "repo", "kit", "docs", "write", "access", "include"] },
  { id: "research", label: "Research", skills: ["research", "free", "seo", "test"] },
  { id: "launch", label: "Launch", skills: ["launch", "revenue", "vibe", "learn"] },
  { id: "motion", label: "Motion", skills: ["gsap", "type", "model", "scroll", "audio", "viz", "motion", "hero"] },
  { id: "operate", label: "Operate", skills: ["command", "report", "scan", "standard", "flow", "version", "publish"] },
] as const;

type TabId = (typeof tabs)[number]["id"];

const skillById = new Map(skillShowcases.map((s) => [s.id, s]));

export function AbilityTabs() {
  const [active, setActive] = useState<TabId>("build");
  const activeSkills = tabs.find((t) => t.id === active)?.skills
    .map((id) => skillById.get(id))
    .filter(Boolean) as SkillShowcaseData[];

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={`inline-flex h-11 items-center rounded-full px-5 text-sm font-semibold transition ${
              active === tab.id
                ? "bg-[#39FF14] text-[#05060A]"
                : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {activeSkills?.map((skill, i) => (
          <AbilityCard key={skill.id} skill={skill} delay={i * 60} />
        ))}
      </div>
    </div>
  );
}
