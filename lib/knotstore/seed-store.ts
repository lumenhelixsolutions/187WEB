import { KNOTstore } from "@/lib/knotstore";
import { previewPath } from "@/lib/knotstore/preview";
import { sampleSeedRecords } from "@/lib/knotstore/seed-preview";
import type { KNOTRecord, KNOTStats } from "@/lib/knotstore/types";

/** Persist sample showcase records into the preview store (server / API only). */
export function seedPreviewStore(): { stats: KNOTStats; records: KNOTRecord[] } {
  const store = KNOTstore({ backend: "hybrid", path: previewPath });
  try {
    store.open();
    const records = sampleSeedRecords();
    for (const record of records) {
      store.put(record);
    }
    const entity = records.find((r) => r.id === "seed-entity-1");
    const knot = records.find((r) => r.id === "seed-knot-1");
    if (entity && knot) {
      store.link(entity.id, knot.id, { rel: "anchors" });
    }
    return {
      stats: store.stats(),
      records: store.query({ limit: 10 }),
    };
  } finally {
    store.close();
  }
}
