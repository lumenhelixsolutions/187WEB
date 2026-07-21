import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillShowcase } from "@/components/showcase/SkillShowcase";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";

const skill = skillShowcaseIndex.get("viz");

export const metadata: Metadata = {
  title: `${skill?.name ?? "187VIZ"} — 3D network / node-edge data visualization`,
  description:
    skill?.description ??
    "Three.js data visualizations for networks, graphs, force layouts, and spatial data stories.",
};

export default function VizSkillPage() {
  if (!skill) notFound();
  return <SkillShowcase skill={skill} />;
}
