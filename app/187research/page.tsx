import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillShowcase } from "@/components/showcase/SkillShowcase";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";

const skill = skillShowcaseIndex.get("research");

export const metadata: Metadata = {
  title: `${skill?.name ?? "187RESEARCH"} — Research-grade lab engine`,
  description:
    skill?.description ??
    "Source-backed research routing, evidence discipline, reproducible labs, and scholarly/biomedical/math/code database routing.",
};

export default function ResearchSkillPage() {
  if (!skill) notFound();
  return <SkillShowcase skill={skill} />;
}
