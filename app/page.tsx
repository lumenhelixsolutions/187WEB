import type { Metadata } from "next";
import { Showcase } from "@/components/showcase/Showcase";

export const metadata: Metadata = {
  title: "187WEB — A killer AI-powered web suite",
  description:
    "187WEB is a killer AI-powered web suite for building sharper sites and shipping smarter systems with AI-assisted skills for repos, design, docs, launch, research, SEO, revenue, testing, accessibility, versioning, publishing, command selection, and scientific lab workflows.",
  openGraph: {
    title: "187WEB — A killer AI-powered web suite",
    description: "Spin sharper sites. Ship smarter systems. Explore the full 187WEB skill, command, research, and agentic workflow ecosystem.",
  },
};

export default function HomePage() {
  return <Showcase />;
}
