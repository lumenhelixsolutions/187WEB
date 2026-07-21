import type { Metadata } from "next";
import { AgentPage, type AgentConfig } from "@/components/launch/AgentPage";

const agent: AgentConfig = {
  slug: "charlotte",
  name: "CHARLOTTE",
  tagline: "Application orchestration",
  color: "#3b82f6",
  skillIds: ["repo", "craft", "vibe", "launch", "write", "research"],
  overview:
    "CHARLOTTE threads intent into retrievable info, recycled and upcycled solutions, design-system hybrids, launch plans, and conflict-resolved public copy. With security handled by NATASHA and YELENA, she focuses on application orchestration and can appeal to XAVIER for final production decisions.",
};

export const metadata: Metadata = {
  title: `${agent.name} — 187WEB Agent`,
  description: agent.overview,
};

export default function CharlottePage() {
  return <AgentPage agent={agent} />;
}
