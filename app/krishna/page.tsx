import type { Metadata } from "next";
import { AgentPage, type AgentConfig } from "@/components/launch/AgentPage";

const agent: AgentConfig = {
  slug: "krishna",
  name: "KRISHNA",
  tagline: "Knowledge + validation",
  color: "#3b82f6",
  skillIds: ["free", "docs", "learn", "test", "version"],
  overview:
    "KRISHNA curates knowledge and validation. He finds free stacks, architects docs, designs courses, builds assessments, and controls release versions.",
};

export const metadata: Metadata = {
  title: `${agent.name} — 187WEB Agent`,
  description: agent.overview,
};

export default function KrishnaPage() {
  return <AgentPage agent={agent} />;
}
