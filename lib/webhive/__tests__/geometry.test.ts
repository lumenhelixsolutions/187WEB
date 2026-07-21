import { describe, it, expect } from "vitest";
import {
  webGeometry,
  honeycombGeometry,
  connectorGeometry,
  particlePositions,
  pulsePositions,
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

describe("honeycombGeometry", () => {
  it("creates geometry for the requested ring count", () => {
    const geo = honeycombGeometry(0.5, 2);
    expect(geo.attributes.position.count).toBeGreaterThan(0);
  });
});

describe("connectorGeometry", () => {
  it("creates one connector segment per honeycomb center", () => {
    const honeyRings = 2;
    const centers = 1 + 6 + 12;
    const geo = connectorGeometry(12, 12, 4, 0.55, honeyRings);
    expect(geo.attributes.position.count).toBe(centers * 2);
  });
});

describe("particlePositions", () => {
  it("returns a Float32Array of length count * 3", () => {
    const arr = particlePositions(100, 10);
    expect(arr.length).toBe(300);
  });

  it("keeps particles inside the requested radius", () => {
    const arr = particlePositions(50, 10);
    for (let i = 0; i < arr.length; i += 3) {
      const x = arr[i];
      const z = arr[i + 2];
      expect(Math.sqrt(x * x + z * z)).toBeLessThanOrEqual(10 + 0.001);
    }
  });
});

describe("pulsePositions", () => {
  it("returns a Float32Array of length count * 3", () => {
    const arr = pulsePositions(48);
    expect(arr.length).toBe(144);
  });
});
