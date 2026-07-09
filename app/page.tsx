import type { Metadata } from "next";
import { Showcase } from "@/components/showcase/Showcase";

export const metadata: Metadata = {
  title: "187SUITE — 187SKILLS command surface",
  description:
    "187REPO orchestrates, 187CRAFT designs, 187VIBE delights, 187LAUNCH ships, and 12 more short-name skills handle free stacks, research, SEO, revenue, docs, learning, testing, access, versioning, and publishing.",
  openGraph: {
    title: "187SUITE — 187SKILLS command surface",
    description:
      "16 short-name skills for the 187web ecosystem: repo, craft, vibe, launch, free, research, seo, revenue, docs, learn, test, access, include, version, and publish.",
  },
};

export default function HomePage() {
  return (
    <>
      <div className="sr-only">
        187SKILLS suite: 187REPO 187CRAFT 187VIBE 187LAUNCH 187FREE 187RESEARCH 187SEO 187REVENUE
        187DOCS 187WRITE 187LEARN 187TEST 187ACCESS+ 187INCLUDE 187VERSION 187PUBLISH
      </div>
      <Showcase />
    </>
  );
}
