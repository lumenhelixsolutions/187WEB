import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillShowcase } from "@/components/showcase/SkillShowcase";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";

const skill = skillShowcaseIndex.get("flow");

export const metadata: Metadata = {
  title: `${skill?.name ?? "187FLOW"} — Workflow automation`,
  description:
    skill?.description ??
    "Turn goals into scoped, multi-skill workflows with clean handoffs, sequencing, and pipeline automation.",
};

export default function FlowSkillPage() {
  if (!skill) notFound();
  return <SkillShowcase skill={skill} />;
}
