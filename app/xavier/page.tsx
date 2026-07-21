import type { Metadata } from "next";
import { AgentPage, type AgentConfig } from "@/components/launch/AgentPage";
import { XavierSkillChains } from "@/components/launch/XavierSkillChains";

const agent: AgentConfig = {
  slug: "xavier",
  name: "XAVIER",
  tagline: "Final creation + council",
  color: "#a855f7",
  skillIds: ["docs", "version", "publish", "launch", "natasha", "test"],
  overview:
    "XAVIER is the only male-coded agent on the crew. He owns final creation and production responsibility, cross-crew vision, and the council command. He can call huddles, interject across teams, and appeal to any 1st, 2nd, or 3rd class skill to ship the final artifact.",
};

export const metadata: Metadata = {
  title: `${agent.name} — 187WEB Agent`,
  description: agent.overview,
};

export default function XavierPage() {
  return (
    <>
      <AgentPage agent={agent} />
      <XavierSkillChains />
    </>
  );
}
