import type { Metadata } from "next";
import { AgentPage, type AgentConfig } from "@/components/launch/AgentPage";

const agent: AgentConfig = {
  slug: "natasha",
  name: "NATASHA",
  tagline: "External + post-launch security",
  color: "#f43f5e",
  skillIds: ["natasha", "chain", "test"],
  overview:
    "NATASHA handles external and post-launch security for 187WEB: threat-surface audits, contract and chain assurance, and test-driven validation after ship. She works in tandem with YELENA and can call XAVIER for a council when an incident needs cross-crew coordination.",
};

export const metadata: Metadata = {
  title: `${agent.name} — 187WEB Agent`,
  description: agent.overview,
};

export default function NatashaPage() {
  return <AgentPage agent={agent} />;
}
