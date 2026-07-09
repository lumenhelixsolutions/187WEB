import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillShowcase } from "@/components/showcase/SkillShowcase";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";

const skill = skillShowcaseIndex.get("free");

export const metadata: Metadata = {
  title: `${skill?.name ?? "187FREE"} — No-cost stack engine`,
  description:
    skill?.description ??
    "Find practical free, free-tier, open-source, local-first, public-API, and low-cost bootstrap solutions for 187web projects.",
};

export default function FreeSkillPage() {
  if (!skill) notFound();
  return <SkillShowcase skill={skill} />;
}
