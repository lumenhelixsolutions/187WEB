import type { Metadata } from "next";
import { ProductShell } from "@/components/launch/ProductShell";
import { AboutPage } from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "About LumenHelix Lab — 187WEB",
  description:
    "About LumenHelix Lab (LumenHelix.com): AI-assisted web suites, local-first operator brains, motion craft, access, and launch systems. Version stamp, open-source credits, and skill backlinks.",
  openGraph: {
    title: "About LumenHelix Lab — 187WEB",
    description:
      "Who builds 187WEB, how the suite is versioned, and the open-source projects it relies on.",
    url: "https://lumenhelixlab.github.io/187WEB/about",
    type: "website",
  },
  alternates: {
    canonical: "https://lumenhelixlab.github.io/187WEB/about",
  },
};

export default function AboutRoute() {
  return (
    <ProductShell>
      <AboutPage />
    </ProductShell>
  );
}
