import type { Metadata } from "next";
import { AgentPage, type AgentConfig } from "@/components/launch/AgentPage";

const agent: AgentConfig = {
  slug: "charlotte",
  name: "CHARLOTTE",
  tagline: "Build + ship surface",
  color: "#39FF14",
  skillIds: ["repo", "craft", "vibe", "launch", "write"],
  overview:
    "CHARLOTTE is the build-and-ship crew. She scaffolds repos, crafts design systems, tunes UX vibe, plans launches, and polishes public copy.",
};

export const metadata: Metadata = {
  title: `${agent.name} — 187WEB Agent`,
  description: agent.overview,
};

export default function CharlottePage() {
  return <AgentPage agent={agent} />;
}
