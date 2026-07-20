import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillShowcase } from "@/components/showcase/SkillShowcase";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";

const skill = skillShowcaseIndex.get("docs");

export const metadata: Metadata = {
  title: `${skill?.name ?? "187DOCS"} — Documentation architecture engine`,
  description:
    skill?.description ??
    "Documentation architecture, READMEs, install guides, how-to guides, reference docs, SOPs, troubleshooting, API docs, and docs drift repair.",
};

export default function DocsSkillPage() {
  if (!skill) notFound();
  return <SkillShowcase skill={skill} />;
}
