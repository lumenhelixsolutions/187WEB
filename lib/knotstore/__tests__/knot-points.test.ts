import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { KnotPointBackend } from "../backends/knot-points";
import { existsSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomUUID } from "node:crypto";

let path: string;

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
});
