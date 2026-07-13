import type { KNOTRecord, KNOTStats } from "./types";

/** Sample records for the KNOTstore showcase (no I/O). */
export function sampleSeedRecords(now = new Date().toISOString()): KNOTRecord[] {
  return [
    {
      id: "seed-crawl-1",
      kind: "crawl",
      source: "187web.dev",
      title: "Homepage crawl",
      content: "Sample homepage crawl record.",
      tags: ["home"],
      createdAt: now,
      updatedAt: now,
      meta: { depth: 1 },
    },
    {
      id: "seed-entity-1",
      kind: "entity",
      source: "vault",
      title: "Sample entity",
      content: "A woven entity node.",
      tags: ["entity"],
      knotHash: "knot-abc",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "seed-knot-1",
      kind: "knot-point",
      source: "vault",
      title: "KNOT anchor",
      content: "A KNOT point anchor.",
      tags: ["anchor"],
      knotHash: "knot-abc",
      createdAt: now,
      updatedAt: now,
    },
  ];
}

/** Showcase stats for sample seed data (matches KNOTStats fields). */
export function sampleSeedStats(): KNOTStats {
  return {
    totalRecords: 3,
    crawlDepth: 1,
    entitiesWoven: 1,
    stubPages: 0,
    links: 1,
    knotPoints: 1,
  };
}

export function sampleSeedPayload() {
  return {
    stats: sampleSeedStats(),
    records: sampleSeedRecords(),
  };
}
