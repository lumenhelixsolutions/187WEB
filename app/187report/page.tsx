import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillShowcase } from "@/components/showcase/SkillShowcase";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";

const skill = skillShowcaseIndex.get("report");

export const metadata: Metadata = {
  title: `${skill?.name ?? "187REPORT"} — Status + audit reports`,
  description:
    skill?.description ??
    "Create compact reports, status summaries, audit artifacts, and approval documents across the 187WEB suite.",
};

export default function ReportSkillPage() {
  if (!skill) notFound();
  return <SkillShowcase skill={skill} />;
}
