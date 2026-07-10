import { describe, it, expect } from "vitest";
import { KNOTstore } from "../index";
import { existsSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomUUID } from "node:crypto";

const pathBase = join(tmpdir(), `knotstore-factory-test-${randomUUID()}`);

describe("KNOTstore factory", () => {
  it("creates a sqlite backend", () => {
    const path = pathBase + ".db";
    const store = KNOTstore({ backend: "sqlite", path });
    expect(store).toBeDefined();
    store.open();
    store.close();
    if (existsSync(path)) unlinkSync(path);
  });

  it("creates a knot-points backend", () => {
    const path = pathBase + ".jsonl";
    const store = KNOTstore({ backend: "knot-points", path });
    expect(store).toBeDefined();
    store.open();
    store.close();
    if (existsSync(path)) unlinkSync(path);
    if (existsSync(path + ".links.jsonl")) unlinkSync(path + ".links.jsonl");
  });
});
