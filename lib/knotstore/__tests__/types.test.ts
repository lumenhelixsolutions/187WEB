import { describe, it, expect } from "vitest";
import { KNOTQuerySchema, KNOTRecordSchema } from "../types";

describe("KNOTRecordSchema", () => {
  it("accepts a minimal record", () => {
    const result = KNOTRecordSchema.safeParse({
      id: "rec-1",
      kind: "entity",
      createdAt: "2026-07-09T00:00:00.000Z",
      updatedAt: "2026-07-09T00:00:00.000Z",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an unknown kind", () => {
    const result = KNOTRecordSchema.safeParse({
      id: "rec-1",
      kind: "unknown",
      createdAt: "2026-07-09T00:00:00.000Z",
      updatedAt: "2026-07-09T00:00:00.000Z",
    });
    expect(result.success).toBe(false);
  });
});

describe("KNOTQuerySchema", () => {
  it("accepts a minimal query", () => {
    const result = KNOTQuerySchema.safeParse({});
    expect(result.success).toBe(true);
  });

  it("accepts a full query", () => {
    const result = KNOTQuerySchema.safeParse({
      kind: "crawl",
      source: "https://example.com",
      tags: ["alpha", "beta"],
      search: "helix",
      from: "2026-01-01T00:00:00.000Z",
      to: "2026-12-31T23:59:59.000Z",
      limit: 10,
    });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid kind", () => {
    const result = KNOTQuerySchema.safeParse({ kind: "invalid" });
    expect(result.success).toBe(false);
  });

  it("rejects a negative limit", () => {
    const result = KNOTQuerySchema.safeParse({ limit: -1 });
    expect(result.success).toBe(false);
  });
});
