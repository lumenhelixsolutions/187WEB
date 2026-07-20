import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillShowcase } from "@/components/showcase/SkillShowcase";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";

const skill = skillShowcaseIndex.get("launch");

export const metadata: Metadata = {
  title: `${skill?.name ?? "187LAUNCH"} — Go-to-market intelligence`,
  description:
    skill?.description ??
    "Go-to-market layer for product launches, early-user acquisition, distribution playbooks, and campaign planning.",
};

export default function LaunchSkillPage() {
  if (!skill) notFound();
  return <SkillShowcase skill={skill} />;
}
