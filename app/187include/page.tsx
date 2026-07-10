import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillShowcase } from "@/components/showcase/SkillShowcase";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";

const skill = skillShowcaseIndex.get("include");

export const metadata: Metadata = {
  title: `${skill?.name ?? "187INCLUDE"} — Inclusion + identity safety`,
  description:
    skill?.description ??
    "Suite-wide inclusion engine for LGBTQ+ inclusion, identity-safe language, pronoun-safe systems, anti-bias review, and community safety.",
};

export default function IncludeSkillPage() {
  if (!skill) notFound();
  return <SkillShowcase skill={skill} />;
}
