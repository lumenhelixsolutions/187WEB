import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillShowcase } from "@/components/showcase/SkillShowcase";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";

const skill = skillShowcaseIndex.get("vibe");

export const metadata: Metadata = {
  title: `${skill?.name ?? "187VIBE"} — Delight + community`,
  description:
    skill?.description ??
    "Short-name entry point for delight, onboarding, retention, community UX, micro-interactions, copy sharpening, and safe execution.",
};

export default function VibeSkillPage() {
  if (!skill) notFound();
  return <SkillShowcase skill={skill} />;
}
