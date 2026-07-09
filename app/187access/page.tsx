import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillShowcase } from "@/components/showcase/SkillShowcase";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";

const skill = skillShowcaseIndex.get("access");

export const metadata: Metadata = {
  title: `${skill?.name ?? "187ACCESS+"} — Accessibility & inclusion engine`,
  description:
    skill?.description ??
    "Audit and improve disability accessibility, neurodivergent access, sensory access, assistive technology support, WCAG+, and inclusive access systems.",
};

export default function AccessSkillPage() {
  if (!skill) notFound();
  return <SkillShowcase skill={skill} />;
}
