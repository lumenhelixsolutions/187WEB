import type { Metadata } from "next";
import { AgentPage, type AgentConfig } from "@/components/launch/AgentPage";

const agent: AgentConfig = {
  slug: "kali",
  name: "KALI",
  tagline: "Growth + safety gates",
  color: "#a855f7",
  skillIds: ["seo", "revenue", "access-plus", "publish", "include"],
  overview:
    "KALI owns growth and public-safety gates. She audits SEO, designs revenue systems, checks accessibility and inclusion, and runs the final publish gate.",
};

export const metadata: Metadata = {
  title: `${agent.name} — 187WEB Agent`,
  description: agent.overview,
};

export default function KaliPage() {
  return <AgentPage agent={agent} />;
}
