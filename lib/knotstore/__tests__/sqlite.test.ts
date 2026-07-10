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

  it("queries by a single tag", () => {
    const now = new Date().toISOString();
    backend.put({
      id: "tagged",
      kind: "entity",
      tags: ["alpha", "beta"],
      createdAt: now,
      updatedAt: now,
    });
    backend.put({
      id: "untagged",
      kind: "entity",
      createdAt: now,
      updatedAt: now,
    });
    expect(backend.query({ tags: ["alpha"] }).map((r) => r.id)).toEqual(["tagged"]);
  });

  it("queries by multiple tags with AND semantics", () => {
    const now = new Date().toISOString();
    backend.put({
      id: "both",
      kind: "entity",
      tags: ["alpha", "beta"],
      createdAt: now,
      updatedAt: now,
    });
    backend.put({
      id: "one",
      kind: "entity",
      tags: ["alpha"],
      createdAt: now,
      updatedAt: now,
    });
    expect(backend.query({ tags: ["alpha", "beta"] }).map((r) => r.id)).toEqual(["both"]);
  });

  it("queries by from date", () => {
    const t1 = "2026-01-01T00:00:00.000Z";
    const t2 = "2026-06-01T00:00:00.000Z";
    const t3 = "2026-12-01T00:00:00.000Z";
    backend.put({ id: "old", kind: "entity", createdAt: t1, updatedAt: t1 });
    backend.put({ id: "mid", kind: "entity", createdAt: t2, updatedAt: t2 });
    backend.put({ id: "new", kind: "entity", createdAt: t3, updatedAt: t3 });
    expect(
      backend
        .query({ from: t2 })
        .map((r) => r.id)
        .sort(),
    ).toEqual(["mid", "new"]);
  });

  it("queries by to date", () => {
    const t1 = "2026-01-01T00:00:00.000Z";
    const t2 = "2026-06-01T00:00:00.000Z";
    const t3 = "2026-12-01T00:00:00.000Z";
    backend.put({ id: "old", kind: "entity", createdAt: t1, updatedAt: t1 });
    backend.put({ id: "mid", kind: "entity", createdAt: t2, updatedAt: t2 });
    backend.put({ id: "new", kind: "entity", createdAt: t3, updatedAt: t3 });
    expect(
      backend
        .query({ to: t2 })
        .map((r) => r.id)
        .sort(),
    ).toEqual(["mid", "old"]);
  });

  it("queries by kind and tags together", () => {
    const now = new Date().toISOString();
    backend.put({
      id: "match",
      kind: "entity",
      tags: ["alpha"],
      createdAt: now,
      updatedAt: now,
    });
    backend.put({
      id: "wrong-kind",
      kind: "crawl",
      tags: ["alpha"],
      createdAt: now,
      updatedAt: now,
    });
    backend.put({
      id: "wrong-tag",
      kind: "entity",
      tags: ["beta"],
      createdAt: now,
      updatedAt: now,
    });
    expect(backend.query({ kind: "entity", tags: ["alpha"] }).map((r) => r.id)).toEqual(["match"]);
  });

  it("queries by source", () => {
    const now = new Date().toISOString();
    backend.put({
      id: "from-blog",
      kind: "entity",
      source: "https://example.com/blog",
      createdAt: now,
      updatedAt: now,
    });
    backend.put({
      id: "from-docs",
      kind: "entity",
      source: "https://example.com/docs",
      createdAt: now,
      updatedAt: now,
    });
    backend.put({
      id: "no-source",
      kind: "entity",
      createdAt: now,
      updatedAt: now,
    });
    expect(
      backend
        .query({ source: "https://example.com/blog" })
        .map((r) => r.id)
        .sort(),
    ).toEqual(["from-blog"]);
  });

  it("queries by search matching title or content", () => {
    const now = new Date().toISOString();
    backend.put({
      id: "title-match",
      kind: "entity",
      title: "Helix pattern overview",
      createdAt: now,
      updatedAt: now,
    });
    backend.put({
      id: "content-match",
      kind: "entity",
      content: "The helix structure is self-referential.",
      createdAt: now,
      updatedAt: now,
    });
    backend.put({
      id: "no-match",
      kind: "entity",
      title: "Unrelated",
      content: "Nothing here.",
      createdAt: now,
      updatedAt: now,
    });
    const results = backend.query({ search: "helix" }).map((r) => r.id);
    expect(results).toContain("title-match");
    expect(results).toContain("content-match");
    expect(results).not.toContain("no-match");
  });
});
