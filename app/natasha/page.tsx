import type { Metadata } from "next";
import { AgentPage, type AgentConfig } from "@/components/launch/AgentPage";

const agent: AgentConfig = {
  slug: "natasha",
  name: "NATASHA",
  tagline: "Multi-agent operator stack",
  color: "#f43f5e",
  skillIds: ["natasha", "quantum", "chain", "research"],
  overview:
    "NATASHA is the command-and-control layer of the 187WEB hive. She compresses context, dispatches specialist subagents, runs isolated labs, and fuses evidence into decision-ready artifacts.",
};

export const metadata: Metadata = {
  title: `${agent.name} — 187WEB Agent`,
  description: agent.overview,
};

export default function NatashaPage() {
  return <AgentPage agent={agent} />;
}
