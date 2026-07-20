import type { Metadata } from "next";
import { Showcase } from "@/components/showcase/Showcase";

export const metadata: Metadata = {
  title: "187WEB — Showcase",
  description: "A rolling exhibition of 187WEB's design system, workflow, and quality rubric.",
};

export default function ShowcasePage() {
  return <Showcase />;
}
