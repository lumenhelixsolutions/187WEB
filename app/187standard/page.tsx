import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillShowcase } from "@/components/showcase/SkillShowcase";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";

const skill = skillShowcaseIndex.get("standard");

export const metadata: Metadata = {
  title: `${skill?.name ?? "187STANDARD"} — Quality standards engine`,
  description:
    skill?.description ??
    "Score work against 187WEB quality standards, conventions, governance rules, SOPs, and checklists before handoff or release.",
};

export default function StandardSkillPage() {
  if (!skill) notFound();
  return <SkillShowcase skill={skill} />;
}
