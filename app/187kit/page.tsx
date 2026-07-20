import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillShowcase } from "@/components/showcase/SkillShowcase";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";

const skill = skillShowcaseIndex.get("kit");

export const metadata: Metadata = {
  title: `${skill?.name ?? "187KIT"} — Templates + starter kits`,
  description:
    skill?.description ??
    "The equipping layer of 187WEB: design-system tokens, industry templates, archetype scaffolds, checklists, and install scripts.",
};

export default function KitSkillPage() {
  if (!skill) notFound();
  return <SkillShowcase skill={skill} />;
}
