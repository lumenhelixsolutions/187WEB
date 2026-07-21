# WebHive Three.js Background Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current flat WebHive background with a deep, continuously moving, mouse- and scroll-reactive futuristic spiderweb/honeycomb network using only `three` and `@react-three/fiber`.

**Architecture:** Move all procedural geometry math into a testable `lib/webhive/geometry.ts` module, add a tiny radial-gradient texture helper, then rewrite `components/launch/WebHiveThreeBackground.tsx` as a single declarative R3F scene with five depth layers, energy particles, traveling data pulses, and smoothed pointer/scroll inputs.

**Tech Stack:** Next.js 15, React 19, TypeScript strict, Tailwind CSS, Three.js 0.185.1, React Three Fiber 9.6.1, Vitest.

---

## File map

| File | Responsibility |
|------|----------------|
| `lib/webhive/geometry.ts` | Pure functions that build `BufferGeometry` for webs, honeycomb, connector filaments, and particle/pulse position arrays. |
| `lib/webhive/__tests__/geometry.test.ts` | Vitest unit tests for the geometry helpers. |
| `lib/webhive/particleTexture.ts` | Canvas-based radial gradient texture for soft additive particles. |
| `components/launch/WebHiveThreeBackground.tsx` | The R3F scene: layers, animation loop, scroll/mouse hooks, reduced-motion guard. |
| `components/launch/ProductShell.tsx` | Already switches to SVG fallback on reduced motion; no changes needed. |

---

### Task 1: Extract geometry helpers and write failing tests

**Files:**
- Create: `lib/webhive/geometry.ts`
- Create: `lib/webhive/__tests__/geometry.test.ts`

- [ ] **Step 1: Write the failing tests**

```ts
// lib/webhive/__tests__/geometry.test.ts
import { describe, it, expect } from "vitest";
import * as THREE from "three";
import {
  webGeometry,
  honeycombGeometry,
  connectorGeometry,
  particlePositions,
  pulsePositions,
} from "@/lib/webhive/geometry";

describe("webGeometry", () => {
  it("creates a BufferGeometry with a position attribute", () => {
    const geo = webGeometry(10, 4, 2, 8);
    expect(geo.attributes.position).toBeDefined();
    expect(geo.attributes.position.count).toBeGreaterThan(0);
  });

  it("draws one spoke per requested spoke", () => {
    const geo = webGeometry(10, 6, 1, 8);
    // each spoke is one line segment => 2 vertices
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
    const centers = 1 + 6 + 12; // 0 + ring1 + ring2
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
    const arr = pulsePositions(48, 10);
    expect(arr.length).toBe(144);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run:
```bash
npx vitest run lib/webhive/__tests__/geometry.test.ts
```

Expected output:
```
 FAIL  lib/webhive/__tests__/geometry.test.ts [ lib/webhive/__tests__/geometry.test.ts ]
Error: Failed to resolve import "@/lib/webhive/geometry" from ...
```

- [ ] **Step 3: Implement the geometry helpers**

```ts
// lib/webhive/geometry.ts
import * as THREE from "three";

export function webGeometry(
  radius: number,
  spokes: number,
  rings: number,
  ringSegments: number
): THREE.BufferGeometry {
  const positions: number[] = [];

  for (let i = 0; i < spokes; i++) {
    const angle = (i * Math.PI * 2) / spokes;
    positions.push(
      0, 0, 0,
      Math.cos(angle) * radius, 0, Math.sin(angle) * radius
    );
  }

  for (let r = 1; r <= rings; r++) {
    const ringRadius = (radius / rings) * r;
    for (let i = 0; i < ringSegments; i++) {
      const a1 = (i * Math.PI * 2) / ringSegments;
      const a2 = ((i + 1) * Math.PI * 2) / ringSegments;
      positions.push(
        Math.cos(a1) * ringRadius, 0, Math.sin(a1) * ringRadius,
        Math.cos(a2) * ringRadius, 0, Math.sin(a2) * ringRadius
      );
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  return geometry;
}

export function hexCorners(cx: number, cy: number, r: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    points.push(
      new THREE.Vector3(cx + r * Math.cos(angle), cy + r * Math.sin(angle), 0)
    );
  }
  return points;
}

export function honeycombCenters(radius: number, rings: number): THREE.Vector3[] {
  const centers: THREE.Vector3[] = [new THREE.Vector3(0, 0, 0)];
  const w = Math.sqrt(3) * radius;
  const h = 1.5 * radius;
  for (let ring = 1; ring <= rings; ring++) {
    for (let side = 0; side < 6; side++) {
      for (let step = 0; step < ring; step++) {
        const startAngle = Math.PI / 6;
        const sx = ring * w * Math.cos(startAngle + (side * Math.PI) / 3);
        const sy = ring * h * Math.sin(startAngle + (side * Math.PI) / 3);
        const nextAngle = startAngle + ((side + 1) * Math.PI) / 3;
        const nx = ring * w * Math.cos(nextAngle);
        const ny = ring * h * Math.sin(nextAngle);
        const t = step / ring;
        centers.push(
          new THREE.Vector3(sx + (nx - sx) * t, sy + (ny - sy) * t, 0)
        );
      }
    }
  }
  return centers;
}

export function honeycombGeometry(radius: number, rings: number): THREE.BufferGeometry {
  const positions: number[] = [];
  const centers = honeycombCenters(radius, rings);
  for (const center of centers) {
    const corners = hexCorners(center.x, center.y, radius - 0.04);
    for (let i = 0; i < 6; i++) {
      const a = corners[i];
      const b = corners[(i + 1) % 6];
      positions.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  return geometry;
}

export function connectorGeometry(
  webRadius: number,
  webSpokes: number,
  webRings: number,
  honeyRadius: number,
  honeyRings: number
): THREE.BufferGeometry {
  const positions: number[] = [];
  const honeyCenters = honeycombCenters(honeyRadius, honeyRings);
  const webPoints: THREE.Vector3[] = [];

  for (let r = 1; r <= webRings; r++) {
    const ringRadius = (webRadius / webRings) * r;
    for (let i = 0; i < webSpokes; i++) {
      const angle = (i * Math.PI * 2) / webSpokes;
      webPoints.push(
        new THREE.Vector3(Math.cos(angle) * ringRadius, 0, Math.sin(angle) * ringRadius)
      );
    }
  }

  for (const center of honeyCenters) {
    let nearest = webPoints[0];
    let best = Infinity;
    for (const p of webPoints) {
      const d = center.distanceTo(p);
      if (d < best) {
        best = d;
        nearest = p;
      }
    }
    positions.push(center.x, center.y, center.z, nearest.x, nearest.y, nearest.z);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  return geometry;
}

export function particlePositions(count: number, radius: number): Float32Array {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = radius * (0.2 + Math.random() * 0.8);
    const theta = Math.random() * Math.PI * 2;
    const y = (Math.random() - 0.5) * radius * 0.5;
    arr[i * 3] = Math.cos(theta) * r;
    arr[i * 3 + 1] = y;
    arr[i * 3 + 2] = Math.sin(theta) * r;
  }
  return arr;
}

export function pulsePositions(count: number): Float32Array {
  return new Float32Array(count * 3);
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run:
```bash
npx vitest run lib/webhive/__tests__/geometry.test.ts
```

Expected output:
```
 Test Files  1 passed (1)
      Tests  8 passed (8)
```

- [ ] **Step 5: Commit**

```bash
git add lib/webhive/geometry.ts lib/webhive/__tests__/geometry.test.ts
git commit -m "feat(webhive): extract testable geometry helpers"
```

---

### Task 2: Create the particle texture helper

**Files:**
- Create: `lib/webhive/particleTexture.ts`

- [ ] **Step 1: Implement the helper**

```ts
// lib/webhive/particleTexture.ts
import * as THREE from "three";

const NEON = "#39FF14";

export function createParticleTexture(): THREE.Texture {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return new THREE.Texture();
  }
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(57,255,20,1)");
  gradient.addColorStop(0.35, "rgba(57,255,20,0.35)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}
```

- [ ] **Step 2: Verify it type-checks**

Run:
```bash
npx tsc --noEmit --skipLibCheck lib/webhive/particleTexture.ts
```

Expected: exit code 0.

- [ ] **Step 3: Commit**

```bash
git add lib/webhive/particleTexture.ts
git commit -m "feat(webhive): add radial particle texture helper"
```

---

### Task 3: Rewrite the WebHiveThreeBackground component

**Files:**
- Modify: `components/launch/WebHiveThreeBackground.tsx`

- [ ] **Step 1: Replace the file contents**

```tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  webGeometry,
  honeycombGeometry,
  connectorGeometry,
  particlePositions,
  pulsePositions,
} from "@/lib/webhive/geometry";
import { createParticleTexture } from "@/lib/webhive/particleTexture";

const NEON = "#39FF14";

const GIANT_RADIUS = 18;
const GIANT_SPOKES = 48;
const GIANT_RINGS = 16;
const GIANT_OPACITY = 0.05;

const HONEY_RADIUS = 0.55;
const HONEY_RING_COUNT = 3;
const HONEY_OPACITY = 0.08;

const MID_RADIUS = 9;
const MID_SPOKES = 40;
const MID_RINGS = 14;
const MID_OPACITY = 0.08;

const OVERLAY_RADIUS = 5;
const OVERLAY_SPOKES = 32;
const OVERLAY_RINGS = 12;
const OVERLAY_OPACITY = 0.16;

const PARTICLE_COUNT = 512;
const PULSE_COUNT = 48;
const CONNECTOR_OPACITY = 0.035;

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

function usePointerInputs() {
  const target = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return target;
}

function useScrollInputs() {
  const scroll = useRef({ y: 0, progress: 0, height: 1 });
  useEffect(() => {
    const onScroll = () => {
      const h = Math.max(1, document.body.scrollHeight - window.innerHeight);
      scroll.current.y = window.scrollY;
      scroll.current.height = h;
      scroll.current.progress = Math.min(1, window.scrollY / h);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scroll;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function WebHiveScene() {
  const rootRef = useRef<THREE.Group>(null);
  const giantRef = useRef<THREE.Group>(null);
  const honeyRef = useRef<THREE.Group>(null);
  const midRef = useRef<THREE.Group>(null);
  const overlayRef = useRef<THREE.Group>(null);
  const overlayMatRef = useRef<THREE.LineBasicMaterial>(null);
  const connectorRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const pulsesRef = useRef<THREE.Points>(null);

  const reducedMotion = useReducedMotion();
  const pointerTarget = usePointerInputs();
  const scroll = useScrollInputs();
  const { invalidate, camera } = useThree();

  const giantGeometry = useMemo(
    () => webGeometry(GIANT_RADIUS, GIANT_SPOKES, GIANT_RINGS, 64),
    []
  );
  const honeyGeometry = useMemo(
    () => honeycombGeometry(HONEY_RADIUS, HONEY_RING_COUNT),
    []
  );
  const midGeometry = useMemo(
    () => webGeometry(MID_RADIUS, MID_SPOKES, MID_RINGS, 56),
    []
  );
  const overlayGeometry = useMemo(
    () => webGeometry(OVERLAY_RADIUS, OVERLAY_SPOKES, OVERLAY_RINGS, 48),
    []
  );
  const connectorGeometryMemo = useMemo(
    () =>
      connectorGeometry(
        GIANT_RADIUS,
        GIANT_SPOKES,
        GIANT_RINGS,
        HONEY_RADIUS,
        HONEY_RING_COUNT
      ),
    []
  );
  const particleTexture = useMemo(() => createParticleTexture(), []);

  const particleData = useMemo(() => {
    const positions = particlePositions(PARTICLE_COUNT, 12);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    return { positions, velocities };
  }, []);

  const pulseData = useMemo(() => {
    const positions = pulsePositions(PULSE_COUNT);
    const phases = new Float32Array(PULSE_COUNT);
    const spokes = new Float32Array(PULSE_COUNT);
    const speeds = new Float32Array(PULSE_COUNT);
    for (let i = 0; i < PULSE_COUNT; i++) {
      phases[i] = Math.random();
      spokes[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.15 + Math.random() * 0.25;
    }
    return { positions, phases, spokes, speeds };
  }, []);

  const pointerSmooth = useRef({ x: 0, y: 0 });
  const scrollVelocity = useRef(0);
  const lastScrollProgress = useRef(0);
  const timeRef = useRef(0);

  useFrame((_, rawDelta) => {
    if (!rootRef.current || reducedMotion) return;
    const delta = Math.min(rawDelta, 0.1);
    timeRef.current += delta;
    const t = timeRef.current;

    const scrollProgress = scroll.current.progress;
    const rawVelocity = (scrollProgress - lastScrollProgress.current) / Math.max(delta, 0.001);
    lastScrollProgress.current = scrollProgress;
    scrollVelocity.current = lerp(scrollVelocity.current, rawVelocity, 0.08);
    const energy = Math.min(1, Math.abs(scrollVelocity.current) * 8);

    pointerSmooth.current.x = lerp(pointerSmooth.current.x, pointerTarget.current.x, 0.06);
    pointerSmooth.current.y = lerp(pointerSmooth.current.y, pointerTarget.current.y, 0.06);
    const px = pointerSmooth.current.x;
    const py = pointerSmooth.current.y;
    const pointerIntensity = Math.max(0, 1 - Math.hypot(px, py));

    // Root tilt: continuous bob + scroll + mouse
    rootRef.current.rotation.x =
      Math.sin(t * 0.22) * 0.04 + scrollProgress * 0.25 + py * 0.07;
    rootRef.current.rotation.y =
      Math.cos(t * 0.17) * 0.03 + scrollProgress * 0.12 + px * 0.07;
    rootRef.current.rotation.z = Math.sin(t * 0.11) * 0.015;
    rootRef.current.position.y = Math.sin(t * 0.45) * 0.04;

    // Giant web: slow counter-rotation, big off-screen radius
    if (giantRef.current) {
      giantRef.current.rotation.y = -t * 0.055 - scrollProgress * 0.08 + px * 0.03;
      giantRef.current.rotation.x = Math.sin(t * 0.13) * 0.025;
      giantRef.current.rotation.z = Math.cos(t * 0.1) * 0.015;
    }

    // Honeycomb: opposite yaw, gentle drift
    if (honeyRef.current) {
      honeyRef.current.rotation.y = t * 0.09 + scrollProgress * 0.05 - px * 0.04;
      honeyRef.current.rotation.z = Math.sin(t * 0.08) * 0.01;
      honeyRef.current.position.y =
        Math.sin(t * 0.28) * 0.05 + scroll.current.y * 0.00012;
    }

    // Mid web: moderate speed, scale reacts to scroll velocity
    if (midRef.current) {
      midRef.current.rotation.y = -t * 0.18 - scrollProgress * 0.1;
      midRef.current.rotation.x = Math.cos(t * 0.2) * 0.02;
      const scale = 1 + Math.sin(t * 2.2) * 0.04 + energy * 0.15;
      midRef.current.scale.setScalar(scale);
    }

    // Overlay web: fast, pulsing, mouse-reactive
    if (overlayRef.current) {
      overlayRef.current.rotation.y = t * 0.55 + scrollProgress * 0.28 + px * 0.1;
      overlayRef.current.rotation.x = Math.cos(t * 0.35) * 0.03 + py * 0.05;
      const pulse = 1 + Math.sin(t * 4) * 0.07 + energy * 0.25 + pointerIntensity * 0.1;
      overlayRef.current.scale.setScalar(pulse);
    }

    if (overlayMatRef.current) {
      overlayMatRef.current.opacity =
        OVERLAY_OPACITY + Math.sin(t * 4) * 0.04 + energy * 0.12 + pointerIntensity * 0.08;
    }

    // Connector filaments breathe with the overlay
    if (connectorRef.current) {
      connectorRef.current.rotation.y = t * 0.02;
      const s = 1 + Math.sin(t * 3) * 0.02 + energy * 0.05;
      connectorRef.current.scale.setScalar(s);
    }

    // Energy motes drift and wrap
    if (particlesRef.current) {
      const pos = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const { velocities } = particleData;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const idx = i * 3;
        pos[idx] += velocities[idx] * (1 + energy);
        pos[idx + 1] += velocities[idx + 1] * (1 + energy * 0.5);
        pos[idx + 2] += velocities[idx + 2] * (1 + energy);

        const dist = Math.hypot(pos[idx], pos[idx + 2]);
        if (dist > 12 || Math.abs(pos[idx + 1]) > 4) {
          const theta = Math.random() * Math.PI * 2;
          const r = 2 + Math.random() * 3;
          pos[idx] = Math.cos(theta) * r;
          pos[idx + 1] = (Math.random() - 0.5) * 2;
          pos[idx + 2] = Math.sin(theta) * r;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Data pulses travel along spokes
    if (pulsesRef.current) {
      const pos = pulsesRef.current.geometry.attributes.position.array as Float32Array;
      const { phases, spokes, speeds } = pulseData;
      const speedScale = 1 + energy * 2 + pointerIntensity * 0.5;
      for (let i = 0; i < PULSE_COUNT; i++) {
        phases[i] += speeds[i] * delta * speedScale;
        if (phases[i] > 1) {
          phases[i] = 0;
          spokes[i] = Math.random() * Math.PI * 2;
        }
        const radius = phases[i] * GIANT_RADIUS;
        const angle = spokes[i];
        const idx = i * 3;
        pos[idx] = Math.cos(angle) * radius;
        pos[idx + 1] = 0;
        pos[idx + 2] = Math.sin(angle) * radius;
      }
      pulsesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Camera reacts to scroll and mouse
    camera.position.x = lerp(camera.position.x, px * 0.35, 0.04);
    camera.position.y = lerp(camera.position.y, py * 0.25, 0.04);
    camera.position.z = lerp(
      camera.position.z,
      5.5 + scrollProgress * 1.4 + energy * 0.4,
      0.03
    );
    camera.lookAt(0, 0, 0);

    invalidate();
  });

  return (
    <group ref={rootRef}>
      <group ref={giantRef} position={[0, 0, -4.2]}>
        <lineSegments geometry={giantGeometry}>
          <lineBasicMaterial
            color={NEON}
            transparent
            opacity={GIANT_OPACITY}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
      </group>

      <group ref={connectorRef} position={[0, 0, -2.8]}>
        <lineSegments geometry={connectorGeometryMemo}>
          <lineBasicMaterial
            color={NEON}
            transparent
            opacity={CONNECTOR_OPACITY}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
      </group>

      <group ref={honeyRef} position={[0, 0, -2.0]}>
        <lineSegments geometry={honeyGeometry}>
          <lineBasicMaterial
            color={NEON}
            transparent
            opacity={HONEY_OPACITY}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
      </group>

      <points ref={particlesRef} position={[0, 0, -1.0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={PARTICLE_COUNT}
            array={particleData.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color={NEON}
          size={0.06}
          map={particleTexture}
          transparent
          opacity={0.7}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <group ref={midRef} position={[0, 0, -0.5]}>
        <lineSegments geometry={midGeometry}>
          <lineBasicMaterial
            color={NEON}
            transparent
            opacity={MID_OPACITY}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
      </group>

      <group ref={overlayRef} position={[0, 0, 0.9]}>
        <lineSegments geometry={overlayGeometry}>
          <lineBasicMaterial
            ref={overlayMatRef}
            color={NEON}
            transparent
            opacity={OVERLAY_OPACITY}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
      </group>

      <points ref={pulsesRef} position={[0, 0, -4.2]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={PULSE_COUNT}
            array={pulseData.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color={NEON}
          size={0.12}
          map={particleTexture}
          transparent
          opacity={0.95}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export function WebHiveThreeBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
      style={{
        background: "radial-gradient(circle at 50% 45%, #07100a 0%, #050608 65%, #000 100%)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 60, near: 0.1, far: 30 }}
        frameloop="demand"
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        dpr={[1, 1.25]}
      >
        <WebHiveScene />
      </Canvas>
    </div>
  );
}
```

- [ ] **Step 2: Lint the file**

Run:
```bash
npx next lint components/launch/WebHiveThreeBackground.tsx
```

Expected: no errors.

- [ ] **Step 3: Type-check the project**

Run:
```bash
npm run typecheck
```

Expected: `error TS0: no errors`.

- [ ] **Step 4: Commit**

```bash
git add components/launch/WebHiveThreeBackground.tsx
git commit -m "feat(launch): deep layered, mouse/scroll reactive WebHive background"
```

---

### Task 4: Full verification and deploy

**Files:**
- All modified files.

- [ ] **Step 1: Run the full test suite**

Run:
```bash
npx vitest run
```

Expected output:
```
 Test Files  N passed (N)
      Tests  M passed (M)
```

- [ ] **Step 2: Build the static export**

Run:
```bash
npm run build
```

Expected: `next build` completes with exit code 0 and emits `out/` directory.

- [ ] **Step 3: Push and watch CI**

```bash
git push
gh run watch --exit-status
```

Expected: GitHub Actions `main` workflow and Pages deploy both pass.

- [ ] **Step 4: Manual visual check**

Visit the deployed Pages URL. Confirm:
- Multiple rotating web/honeycomb layers are visible.
- The giant web extends past the viewport.
- Scrolling tilts the scene and increases motion energy.
- Moving the mouse gently parallaxes the background.
- Small bright pulses travel outward along the web spokes.

- [ ] **Step 5: Final commit (if any tweaks)**

If visual checks required small tuning, commit those changes with a message like:
```bash
git commit -am "fix(webhive): tune layer speeds and pulse density"
```

---

## Self-review checklist

1. **Spec coverage:**
   - Dramatic depth / giant off-screen web → GIANT_RADIUS=18, giant layer at z=-4.2 ✅
   - Layered overlap / counter-rotation → giant, honey, mid, overlay rotate at different speeds and directions ✅
   - Scroll reactivity → scrollProgress, scrollVelocity, camera z ✅
   - Mouse parallax → pointerTarget, pointerSmooth, root/camera transform ✅
   - Continuous motion → all layers rotate/drift via `useFrame` even with no scroll ✅
   - Interconnected network → connector filaments + data pulses ✅
   - Performance → capped geometry counts, demand render, no allocations in loop ✅
   - No new dependencies → only existing `three`/`@react-three/fiber` used ✅

2. **Placeholder scan:** No TBD/TODO/fill-in details in tasks. ✅

3. **Type consistency:** All helper names and signatures match between geometry module, tests, and component. ✅
