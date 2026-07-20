import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillShowcase } from "@/components/showcase/SkillShowcase";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";

const skill = skillShowcaseIndex.get("scan");

export const metadata: Metadata = {
  title: `${skill?.name ?? "187SCAN"} — Health + security scanner`,
  description:
    skill?.description ??
    "Inspect repositories, sites, docs, apps, and external surfaces for health, SEO, security, accessibility, and compliance.",
};

export default function ScanSkillPage() {
  if (!skill) notFound();
  return <SkillShowcase skill={skill} />;
}
