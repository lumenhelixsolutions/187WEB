import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillShowcase } from "@/components/showcase/SkillShowcase";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";

const skill = skillShowcaseIndex.get("quantum");

export const metadata: Metadata = {
  title: `${skill?.name ?? "187QUANTUM"} — Quantum algorithms and circuit engineering`,
  description: skill?.description ?? "Quantum algorithms and circuit engineering",
};

export default function Page() {
  if (!skill) notFound();
  return <SkillShowcase skill={skill} />;
}
