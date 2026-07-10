import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillShowcase } from "@/components/showcase/SkillShowcase";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";

const skill = skillShowcaseIndex.get("seo");

export const metadata: Metadata = {
  title: `${skill?.name ?? "187SEO"} — Policy-aware search optimization`,
  description:
    skill?.description ??
    "Policy-aware SEO, AEO, GEO, structured data, technical audits, content strategy, and search analytics for the 187web suite.",
};

export default function SeoSkillPage() {
  if (!skill) notFound();
  return <SkillShowcase skill={skill} />;
}
