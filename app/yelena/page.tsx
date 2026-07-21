import type { Metadata } from "next";
import { AgentPage, type AgentConfig } from "@/components/launch/AgentPage";

const agent: AgentConfig = {
  slug: "yelena",
  name: "YELENA",
  tagline: "Pre-launch internal safety gates",
  color: "#facc15",
  skillIds: ["natasha", "test", "access-plus", "include"],
  overview:
    "YELENA owns pre-launch internal security and safety gates for 187WEB: access checks, inclusion review, test-driven CI validation, and release readiness. She frees CHARLOTTE and KALI to focus on application work and shares the security load with NATASHA.",
};

export const metadata: Metadata = {
  title: `${agent.name} — 187WEB Agent`,
  description: agent.overview,
};

export default function YelenaPage() {
  return <AgentPage agent={agent} />;
}
