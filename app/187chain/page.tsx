import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillShowcase } from "@/components/showcase/SkillShowcase";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";

const skill = skillShowcaseIndex.get("chain");

export const metadata: Metadata = {
  title: `${skill?.name ?? "187CHAIN"} — Smart-contract and DeFi protocol assurance`,
  description: skill?.description ?? "Smart-contract and DeFi protocol assurance",
};

export default function Page() {
  if (!skill) notFound();
  return <SkillShowcase skill={skill} />;
}
