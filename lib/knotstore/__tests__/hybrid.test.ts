import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { HybridBackend } from "../backends/hybrid";
import { existsSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomUUID } from "node:crypto";

let dbPath: string;
let kpPath: string;

describe("HybridBackend", () => {
  let backend: HybridBackend;

  beforeEach(() => {
    dbPath = join(tmpdir(), `knotstore-hybrid-test-${randomUUID()}.db`);
    kpPath = join(tmpdir(), `knotstore-hybrid-kp-test-${randomUUID()}.jsonl`);
    backend = new HybridBackend(dbPath, kpPath);
    backend.open();
  });

  afterEach(() => {
    backend.close();
    if (existsSync(dbPath)) unlinkSync(dbPath);
    if (existsSync(kpPath)) unlinkSync(kpPath);
    if (existsSync(kpPath + ".links.jsonl")) unlinkSync(kpPath + ".links.jsonl");
  });

  it("stores a hybrid record with both SQL fields and a knotHash", () => {
    const now = new Date().toISOString();
    backend.put({
      id: "h1",
      kind: "entity",
      title: "Hybrid Entity",
      knotHash: "aGFzaA==",
      createdAt: now,
      updatedAt: now,
    });
    const got = backend.get("h1");
    expect(got?.title).toBe("Hybrid Entity");
    expect(got?.knotHash).toBe("aGFzaA==");
  });

  it("counts hybrid records and knot points in stats", () => {
    const now = new Date().toISOString();
    backend.put({ id: "a", kind: "entity", knotHash: "xA==", createdAt: now, updatedAt: now });
    backend.put({ id: "b", kind: "crawl", createdAt: now, updatedAt: now });
    const s = backend.stats();
    expect(s.totalRecords).toBe(2);
    expect(s.knotPoints).toBe(1);
  });
});
