import type { Metadata } from "next";
import { Showcase } from "@/components/showcase/Showcase";

export const metadata: Metadata = {
  title: "Showcase — 187WEB ability surface",
  description:
    "Interactive showcase of the 187WEB command-driven ability surface: skills, scenarios, command reference, and install packs.",
  openGraph: {
    title: "Showcase — 187WEB ability surface",
    description: "Interactive showcase of the 187WEB command-driven ability surface.",
  },
};

export default function ShowcasePage() {
  return <Showcase />;
}
