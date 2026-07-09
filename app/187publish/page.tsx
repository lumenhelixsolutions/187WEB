import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillShowcase } from "@/components/showcase/SkillShowcase";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";

const skill = skillShowcaseIndex.get("publish");

export const metadata: Metadata = {
  title: `${skill?.name ?? "187PUBLISH"} — Release synchronization engine`,
  description:
    skill?.description ??
    "Final release synchronization engine for docs, demos, showcases, READMEs, command pages, adapters, and public surfaces.",
};

export default function PublishSkillPage() {
  if (!skill) notFound();
  return <SkillShowcase skill={skill} />;
}
