import { describe, it, expect } from "vitest";
import { KNOTstoreError } from "../errors";

describe("KNOTstoreError", () => {
  it("carries a code and message", () => {
    const err = new KNOTstoreError("ENOENT", "missing record");
    expect(err.code).toBe("ENOENT");
    expect(err.message).toBe("missing record");
  });
});
