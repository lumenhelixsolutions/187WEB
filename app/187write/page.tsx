import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillShowcase } from "@/components/showcase/SkillShowcase";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";

const skill = skillShowcaseIndex.get("write");

export const metadata: Metadata = {
  title: `${skill?.name ?? "187WRITE"} — Suite-wide editorial engine`,
  description:
    skill?.description ??
    "Suite-wide content writing and editorial engine for copy, scripts, tutorials, SEO drafts, accessible language, and claim-safe rewrites.",
};

export default function WriteSkillPage() {
  if (!skill) notFound();
  return <SkillShowcase skill={skill} />;
}
