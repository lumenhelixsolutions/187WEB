import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { KnotPointBackend } from "../backends/knot-points";
import { KNOTstoreError } from "../errors";
import { existsSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomUUID } from "node:crypto";

let path: string;

function linksPath(p: string): string {
  return p.replace(/\.jsonl$/, ".links.jsonl");
}

function makeRecord(id: string, knotHash: string) {
  const now = new Date().toISOString();
  return {
    id,
    kind: "knot-point" as const,
    knotHash,
    createdAt: now,
    updatedAt: now,
  };
}

describe("KnotPointBackend", () => {
  let backend: KnotPointBackend;

  beforeEach(() => {
    path = join(tmpdir(), `knotstore-kp-test-${randomUUID()}.jsonl`);
    backend = new KnotPointBackend(path);
    backend.open();
  });

  afterEach(() => {
    backend.close();
    if (existsSync(path)) unlinkSync(path);
    const lp = linksPath(path);
    if (existsSync(lp)) unlinkSync(lp);
  });

  it("stores and retrieves a knot point record", () => {
    const now = new Date().toISOString();
    backend.put({
      id: "kp1",
      kind: "knot-point",
      knotHash: "aGVsbG8=",
      createdAt: now,
      updatedAt: now,
    });
    const got = backend.get("kp1");
    expect(got?.knotHash).toBe("aGVsbG8=");
  });

  it("counts knot points in stats", () => {
    const now = new Date().toISOString();
    backend.put({
      id: "kp1",
      kind: "knot-point",
      knotHash: "aA==",
      createdAt: now,
      updatedAt: now,
    });
    backend.put({
      id: "kp2",
      kind: "knot-point",
      knotHash: "bA==",
      createdAt: now,
      updatedAt: now,
    });
    expect(backend.stats().knotPoints).toBe(2);
  });

  it("throws EINVALID when knotHash is missing", () => {
    const now = new Date().toISOString();
    expect(() =>
      backend.put({
        id: "bad",
        kind: "knot-point",
        createdAt: now,
        updatedAt: now,
      }),
    ).toThrow(KNOTstoreError);

    try {
      backend.put({
        id: "bad",
        kind: "knot-point",
        createdAt: now,
        updatedAt: now,
      });
    } catch (err) {
      expect((err as KNOTstoreError).code).toBe("EINVALID");
    }
  });

  it("supports link() / getLinks() round-trip", () => {
    backend.put(makeRecord("a", "hash-a"));
    backend.put(makeRecord("b", "hash-b"));
    backend.link("a", "b", { rel: "refs" });

    const aLinks = backend.getLinks("a");
    expect(aLinks.outgoing).toHaveLength(1);
    expect(aLinks.outgoing[0].targetId).toBe("b");
    expect(aLinks.outgoing[0].rel).toBe("refs");

    const bLinks = backend.getLinks("b");
    expect(bLinks.incoming).toHaveLength(1);
    expect(bLinks.incoming[0].sourceId).toBe("a");
  });

  it("queries records with search", () => {
    backend.put(makeRecord("apple-record", "hash-apple"));
    backend.put(makeRecord("banana-record", "hash-banana"));

    const byId = backend.query({ search: "apple" });
    expect(byId.map((r) => r.id)).toContain("apple-record");
    expect(byId.map((r) => r.id)).not.toContain("banana-record");

    const byHash = backend.query({ search: "hash-banana" });
    expect(byHash.map((r) => r.id)).toContain("banana-record");
  });

  it("persists records and links across close -> new instance -> open", () => {
    backend.put(makeRecord("persist-a", "alpha"));
    backend.put(makeRecord("persist-b", "beta"));
    backend.link("persist-a", "persist-b", { rel: "child" });
    backend.close();

    backend = new KnotPointBackend(path);
    backend.open();

    expect(backend.get("persist-a")?.knotHash).toBe("alpha");
    expect(backend.get("persist-b")?.knotHash).toBe("beta");

    const links = backend.getLinks("persist-a");
    expect(links.outgoing).toHaveLength(1);
    expect(links.outgoing[0].targetId).toBe("persist-b");
    expect(links.outgoing[0].rel).toBe("child");
  });

  it("throws ECLOSED when operating after close()", () => {
    backend.close();

    expect(() => backend.get("kp1")).toThrow(KNOTstoreError);
    expect(() => backend.put(makeRecord("kp1", "hash"))).toThrow(KNOTstoreError);
    expect(() => backend.query({})).toThrow(KNOTstoreError);
    expect(() => backend.link("a", "b")).toThrow(KNOTstoreError);
    expect(() => backend.getLinks("a")).toThrow(KNOTstoreError);
    expect(() => backend.stats()).toThrow(KNOTstoreError);

    try {
      backend.get("kp1");
    } catch (err) {
      expect((err as KNOTstoreError).code).toBe("ECLOSED");
    }
  });
});
