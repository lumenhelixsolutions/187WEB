import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillShowcase } from "@/components/showcase/SkillShowcase";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";

const skill = skillShowcaseIndex.get("scroll");

export const metadata: Metadata = {
  title: `${skill?.name ?? "187SCROLL"} — Scroll-driven 3D camera narratives`,
  description:
    skill?.description ??
    "Long-form scroll narratives that drive 3D camera paths, scene transitions, and progress-based reveals.",
};

export default function ScrollSkillPage() {
  if (!skill) notFound();
  return <SkillShowcase skill={skill} />;
}
