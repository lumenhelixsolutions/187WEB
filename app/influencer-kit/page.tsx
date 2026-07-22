import type { Metadata } from "next";
import { ProductShell } from "@/components/launch/ProductShell";
import { InfluencerKitPageClient } from "@/components/create/InfluencerKitPageClient";

export const metadata: Metadata = {
  title: "Influencer Kit — 187WEB · /187create",
  description:
    "Creator-ready 187WEB influencer kit: tiers, talking points, captions, asset briefs, usage rights, and UTM tracking. Access+ and Include+ as first-class skills.",
  openGraph: {
    title: "187WEB Influencer Kit",
    description: "Access is the product. Inclusion is the system. Creator kit with copy, assets, and tracking.",
  },
};

export default function InfluencerKitPage() {
  return (
    <ProductShell>
      <InfluencerKitPageClient />
    </ProductShell>
  );
}
