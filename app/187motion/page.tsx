import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillShowcase } from "@/components/showcase/SkillShowcase";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";

const skill = skillShowcaseIndex.get("motion");

export const metadata: Metadata = {
  title: `${skill?.name ?? "187MOTION"} — Reusable R3F/GSAP animation hooks`,
  description:
    skill?.description ??
    "A library of reusable React Three Fiber and GSAP hooks for common animation patterns, entrance sequences, and scroll triggers.",
};

export default function MotionSkillPage() {
  if (!skill) notFound();
  return <SkillShowcase skill={skill} />;
}
