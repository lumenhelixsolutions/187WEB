import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillShowcase } from "@/components/showcase/SkillShowcase";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";

const skill = skillShowcaseIndex.get("version");

export const metadata: Metadata = {
  title: `${skill?.name ?? "187VERSION"} — Version & release control engine`,
  description:
    skill?.description ??
    "Versioning, changelogs, releases, migration notes, compatibility, deprecations, and adapter sync for the 187web suite.",
};

export default function VersionSkillPage() {
  if (!skill) notFound();
  return <SkillShowcase skill={skill} />;
}
