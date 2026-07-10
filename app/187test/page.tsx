import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillShowcase } from "@/components/showcase/SkillShowcase";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";

const skill = skillShowcaseIndex.get("test");

export const metadata: Metadata = {
  title: `${skill?.name ?? "187TEST"} — Assessment & validation engine`,
  description:
    skill?.description ??
    "Build quizzes, tests, polls, surveys, rubrics, knowledge checks, and validation instruments with bias and accessibility review.",
};

export default function TestSkillPage() {
  if (!skill) notFound();
  return <SkillShowcase skill={skill} />;
}
