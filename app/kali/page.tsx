import type { Metadata } from "next";
import { AgentPage, type AgentConfig } from "@/components/launch/AgentPage";

const agent: AgentConfig = {
  slug: "kali",
  name: "KALI",
  tagline: "Growth + create assist",
  color: "#39FF14",
  skillIds: ["seo", "revenue", "publish", "create", "repo", "vibe"],
  overview:
    "KALI drives growth and assists CHARLOTTE with direct web creation: SEO, revenue systems, publish gate, repo/vibe support, and 187CREATE for landing pages and campaign assets. She appeals to NATASHA/YELENA for security gates and to XAVIER for final ship calls.",
};

export const metadata: Metadata = {
  title: `${agent.name} — 187WEB Agent`,
  description: agent.overview,
};

export default function KaliPage() {
  return <AgentPage agent={agent} />;
}
