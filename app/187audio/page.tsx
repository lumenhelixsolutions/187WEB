import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillShowcase } from "@/components/showcase/SkillShowcase";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";

const skill = skillShowcaseIndex.get("audio");

export const metadata: Metadata = {
  title: `${skill?.name ?? "187AUDIO"} — Audio-reactive 3D geometry`,
  description:
    skill?.description ??
    "Web Audio and Three.js geometry that reacts to frequency data, beats, and microphone input in real time.",
};

export default function AudioSkillPage() {
  if (!skill) notFound();
  return <SkillShowcase skill={skill} />;
}
