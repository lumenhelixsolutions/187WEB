import { describe, it, expect } from "vitest";
import {
  webGeometry,
  webRadialSegments,
  honeycombGeometry,
  honeycombSegments,
  buildHoneycombAdjacency,
  connectorGeometry,
} from "@/lib/webhive";

describe("webGeometry", () => {
  it("creates a BufferGeometry with a position attribute", () => {
    const geo = webGeometry(10, 4, 2, 8);
    expect(geo.attributes.position).toBeDefined();
    expect(geo.attributes.position.count).toBeGreaterThan(0);
  });

  it("draws one spoke line segment per requested spoke", () => {
    const geo = webGeometry(10, 6, 1, 8);
    const spokeVertices = 6 * 2;
    expect(geo.attributes.position.count).toBeGreaterThanOrEqual(spokeVertices);
  });
});

describe("webRadialSegments", () => {
  it("returns spokes * rings segments", () => {
    const segs = webRadialSegments(10, 8, 4);
    expect(segs.length).toBe(8 * 4);
  });

  it("segments progress outward from the center", () => {
    const segs = webRadialSegments(10, 4, 3);
    const firstSpoke = segs.slice(0, 3);
    const radii = firstSpoke.map((s) => Math.hypot(s.x1, s.z1));
    expect(radii[0]).toBe(0);
    for (let i = 1; i < radii.length; i++) {
      expect(radii[i]).toBeGreaterThan(radii[i - 1]);
    }
  });
});

describe("honeycombGeometry", () => {
  it("creates geometry for the requested ring count", () => {
    const geo = honeycombGeometry(0.5, 2);
    expect(geo.attributes.position.count).toBeGreaterThan(0);
  });
});

describe("honeycombSegments", () => {
  it("returns segments for every hex edge", () => {
    const segs = honeycombSegments(0.5, 2);
    expect(segs.length).toBeGreaterThan(0);
    for (const s of segs) {
      expect(Math.hypot(s.x2 - s.x1, s.y2 - s.y1, s.z2 - s.z1)).toBeGreaterThan(0);
    }
  });
});

describe("buildHoneycombAdjacency", () => {
  it("maps each node to its connected segment indices", () => {
    const segs = honeycombSegments(0.5, 2);
    const adj = buildHoneycombAdjacency(segs);
    let maxDegree = 0;
    for (const [, indices] of adj) {
      maxDegree = Math.max(maxDegree, indices.length);
    }
    expect(maxDegree).toBeGreaterThanOrEqual(2);
  });
});

describe("connectorGeometry", () => {
  it("creates one connector segment per honeycomb center", () => {
    const honeyRings = 2;
    const centers = 1 + 6 + 12;
    const geo = connectorGeometry(12, 12, 4, 0.55, honeyRings, -1.2);
    expect(geo.attributes.position.count).toBe(centers * 2);
  });
});
