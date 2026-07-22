import type { Metadata } from "next";
import { ProductShell } from "@/components/launch/ProductShell";
import { PlusPlusPageClient } from "@/components/access/PlusPlusPageClient";

export const metadata: Metadata = {
  title: "/187++ — Full Access & Inclusion Sweep — 187WEB",
  description:
    "Run 187ACCESS+ (red→green) and 187INCLUDE+ (green→purple) together via /187++ for a complete accessibility, neurodivergence, LGBTQ+ identity-safety, and inclusion engineering sweep.",
};

export default function PlusPlusPage() {
  return (
    <ProductShell>
      <PlusPlusPageClient />
    </ProductShell>
  );
}
