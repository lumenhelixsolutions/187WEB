import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillShowcase } from "@/components/showcase/SkillShowcase";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";

const skill = skillShowcaseIndex.get("natasha");

export const metadata: Metadata = {
  title: `${skill?.name ?? "187NATASHA"} — NATASHA multi-agent orchestration stack`,
  description: skill?.description ?? "NATASHA multi-agent orchestration stack",
};

export default function Page() {
  if (!skill) notFound();
  return <SkillShowcase skill={skill} />;
}
