import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillShowcase } from "@/components/showcase/SkillShowcase";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";

const skill = skillShowcaseIndex.get("learn");

export const metadata: Metadata = {
  title: `${skill?.name ?? "187LEARN"} — Learning experience engine`,
  description:
    skill?.description ??
    "Design courses, study plans, curricula, lessons, workshops, learning paths, and accessible learning experiences.",
};

export default function LearnSkillPage() {
  if (!skill) notFound();
  return <SkillShowcase skill={skill} />;
}
