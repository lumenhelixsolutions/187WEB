import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { SqliteBackend } from "../backends/sqlite";
import { KNOTRecord } from "../types";
import { existsSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomUUID } from "node:crypto";

let dbPath: string;

describe("SqliteBackend", () => {
  let backend: SqliteBackend;

  beforeEach(() => {
    dbPath = join(tmpdir(), `knotstore-sqlite-test-${randomUUID()}.db`);
    backend = new SqliteBackend(dbPath);
    backend.open();
  });

  afterEach(() => {
    backend.close();
    if (existsSync(dbPath)) unlinkSync(dbPath);
  });

  it("round-trips a record", () => {
    const record: KNOTRecord = {
      id: "r1",
      kind: "entity",
      title: "Entity One",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    backend.put(record);
    expect(backend.get("r1")?.title).toBe("Entity One");
  });

  it("queries by kind", () => {
    const now = new Date().toISOString();
    backend.put({ id: "a", kind: "entity", createdAt: now, updatedAt: now });
    backend.put({ id: "b", kind: "crawl", createdAt: now, updatedAt: now });
    expect(backend.query({ kind: "entity" }).map((r) => r.id)).toEqual(["a"]);
  });

  it("creates bidirectional links", () => {
    const now = new Date().toISOString();
    backend.put({ id: "x", kind: "entity", createdAt: now, updatedAt: now });
    backend.put({ id: "y", kind: "entity", createdAt: now, updatedAt: now });
    backend.link("x", "y", { rel: "cites" });
    const links = backend.getLinks("x");
    expect(links.outgoing).toHaveLength(1);
    expect(links.incoming).toHaveLength(0);
    expect(backend.getLinks("y").incoming).toHaveLength(1);
  });

  it("returns stats", () => {
    const now = new Date().toISOString();
    backend.put({ id: "a", kind: "crawl", createdAt: now, updatedAt: now });
    backend.put({ id: "b", kind: "entity", createdAt: now, updatedAt: now });
    backend.link("a", "b");
    const s = backend.stats();
    expect(s.totalRecords).toBe(2);
    expect(s.entitiesWoven).toBe(1);
    expect(s.links).toBe(1);
  });
});
