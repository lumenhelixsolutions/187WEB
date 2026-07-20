import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillShowcase } from "@/components/showcase/SkillShowcase";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";

const skill = skillShowcaseIndex.get("command");

export const metadata: Metadata = {
  title: `${skill?.name ?? "187COMMAND"} — Universal command surface`,
  description:
    skill?.description ??
    "The universal 187WEB command surface and intent router for aliases, modes, depths, and skill routing.",
};

export default function CommandSkillPage() {
  if (!skill) notFound();
  return <SkillShowcase skill={skill} />;
}
