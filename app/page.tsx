import type { Metadata } from "next";
import { Showcase } from "@/components/showcase/Showcase";

export const metadata: Metadata = {
  title: "187WEB — A killer AI-powered web suite",
  description:
    "187WEB is a killer AI-powered web suite for building sharper sites and shipping smarter systems with AI-assisted skills for repos, design, docs, launch, research, SEO, revenue, testing, accessibility, versioning, and publishing.",
  openGraph: {
    title: "187WEB — A killer AI-powered web suite",
    description:
      "187WEB is a killer AI-powered web suite for building sharper sites and shipping smarter systems with AI-assisted skills for repos, design, docs, launch, research, SEO, revenue, testing, accessibility, versioning, and publishing.",
  },
};

export default function HomePage() {
  return (
    <>
      <div className="sr-only">
        187WEB — a killer AI-powered web suite. 187SKILLS suite: 187COMMAND 187REPORT 187SCAN
        187KIT 187STANDARD 187FLOW 187REPO 187CRAFT 187VIBE 187LAUNCH 187FREE 187RESEARCH 187SEO
        187REVENUE 187DOCS 187WRITE 187LEARN 187TEST 187ACCESS+ 187INCLUDE 187VERSION 187PUBLISH.
        Modules: THREAD TUNE CORD CHAR LAB.
      </div>
      <Showcase />
    </>
  );
}
