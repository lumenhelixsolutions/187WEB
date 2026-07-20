import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillShowcase } from "@/components/showcase/SkillShowcase";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";

const skill = skillShowcaseIndex.get("craft");

export const metadata: Metadata = {
  title: `${skill?.name ?? "187CRAFT"} — Design + frontend craft`,
  description:
    skill?.description ??
    "Short-name entry point for design, UX, frontend components, design systems, palettes, font pairings, and pre-ship audits.",
};

export default function CraftSkillPage() {
  if (!skill) notFound();
  return <SkillShowcase skill={skill} />;
}
