import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillShowcase } from "@/components/showcase/SkillShowcase";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";

const skill = skillShowcaseIndex.get("repo");

export const metadata: Metadata = {
  title: `${skill?.name ?? "187REPO"} — Repo + deploy orchestrator`,
  description:
    skill?.description ??
    "Short-name orchestrator for repo generation, GitHub deployment, installer sites, archetype scaffolds, and 187SKILLS routing.",
};

export default function RepoSkillPage() {
  if (!skill) notFound();
  return <SkillShowcase skill={skill} />;
}
