import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillShowcase } from "@/components/showcase/SkillShowcase";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";

const skill = skillShowcaseIndex.get("revenue");

export const metadata: Metadata = {
  title: `${skill?.name ?? "187REVENUE"} — Ethical revenue architecture`,
  description:
    skill?.description ??
    "Ethical revenue architecture for pricing, payments, subscriptions, affiliates, coupons, dropshipping, sponsorships, licensing, and commerce ops.",
};

export default function RevenueSkillPage() {
  if (!skill) notFound();
  return <SkillShowcase skill={skill} />;
}
