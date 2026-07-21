import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillShowcase } from "@/components/showcase/SkillShowcase";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";

const skill = skillShowcaseIndex.get("type");

export const metadata: Metadata = {
  title: `${skill?.name ?? "187TYPE"} — Kinetic / variable 3D typography`,
  description:
    skill?.description ??
    "Reactive, variable, and three-dimensional typography systems that respond to scroll, audio, or interaction.",
};

export default function TypeSkillPage() {
  if (!skill) notFound();
  return <SkillShowcase skill={skill} />;
}
