import type { Metadata } from "next";
import { KNOTstore } from "@/lib/knotstore";
import { previewPath } from "@/lib/knotstore/preview";
import { KNOTRecord, KNOTStats } from "@/lib/knotstore/types";
import { KnotstorePageClient, SeedResult } from "./KnotstorePageClient";

export const metadata: Metadata = {
  title: "KNOTstore — 187WEB agent memory",
  description: "Vault-style preview of the 187WEB KNOTstore data layer.",
};

export default async function KnotstorePage() {
  let stats: KNOTStats | null = null;
  let records: KNOTRecord[] = [];
  let error: string | null = null;

  const store = KNOTstore({ backend: "hybrid", path: previewPath });

  try {
    store.open();
    stats = store.stats();
    records = store.query({ limit: 10 });
  } catch (err) {
    error = err instanceof Error ? err.message : String(err);
  } finally {
    store.close();
  }

  const initial: SeedResult = error
    ? { ok: false, error }
    : { ok: true, stats: stats as KNOTStats, records };

  return <KnotstorePageClient initial={initial} />;
}
