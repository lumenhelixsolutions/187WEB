"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  webGeometry,
  webRadialSegments,
  honeycombGeometry,
  honeycombSegments,
  buildHoneycombAdjacency,
  connectorGeometry,
  createParticleTexture,
  type Segment,
} from "@/lib/webhive";

const NEON = "#39FF14";

const GIANT_RADIUS = 18;
const GIANT_SPOKES = 48;
const GIANT_RINGS = 16;
const GIANT_OPACITY = 0.05;

const HONEY_RADIUS = 0.5;
const HONEY_RINGS = 4;
const HONEY_OPACITY = 0.09;

const MID_RADIUS = 9;
const MID_SPOKES = 40;
const MID_RINGS = 14;
const MID_OPACITY = 0.08;

const OVERLAY_RADIUS = 5;
const OVERLAY_SPOKES = 32;
const OVERLAY_RINGS = 12;
const OVERLAY_OPACITY = 0.16;

const WEB_TELEMETRY = 32;
const HONEY_TELEMETRY = 24;
const CONNECTOR_OPACITY = 0.04;

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
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

function eq(a: number, b: number) {
  return Math.abs(a - b) < 1e-5;
}

function nodeKey(x: number, y: number, z: number) {
  return `${x.toFixed(6)},${y.toFixed(6)},${z.toFixed(6)}`;
}

interface Telemetry {
  idx: Uint16Array;
  progress: Float32Array;
  speed: Float32Array;
  reversed: Uint8Array;
  positions: Float32Array;
}

function buildTelemetry(segments: Segment[], count: number): Telemetry {
  const idx = new Uint16Array(count);
  const progress = new Float32Array(count);
  const speed = new Float32Array(count);
  const reversed = new Uint8Array(count);
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    idx[i] = Math.floor(Math.random() * segments.length);
    progress[i] = Math.random();
    speed[i] = 0.2 + Math.random() * 0.35;
  }
  return { idx, progress, speed, reversed, positions };
}

function WebHiveScene() {
  const rootRef = useRef<THREE.Group>(null);
  const giantRef = useRef<THREE.Group>(null);
  const honeyRef = useRef<THREE.Group>(null);
  const midRef = useRef<THREE.Group>(null);
  const overlayRef = useRef<THREE.Group>(null);
  const overlayMatRef = useRef<THREE.LineBasicMaterial>(null);
  const connectorRef = useRef<THREE.Group>(null);
  const webTelemetryRef = useRef<THREE.Points>(null);
  const honeyTelemetryRef = useRef<THREE.Points>(null);

  const reducedMotion = useReducedMotion();
  const pointerTarget = usePointerInputs();
  const scroll = useScrollInputs();
  const { invalidate, camera } = useThree();

  const giantGeometry = useMemo(
    () => webGeometry(GIANT_RADIUS, GIANT_SPOKES, GIANT_RINGS, 64),
    [],
  );
  const honeyGeometry = useMemo(
    () => honeycombGeometry(HONEY_RADIUS, HONEY_RINGS),
    [],
  );
  const midGeometry = useMemo(
    () => webGeometry(MID_RADIUS, MID_SPOKES, MID_RINGS, 56),
    [],
  );
  const overlayGeometry = useMemo(
    () => webGeometry(OVERLAY_RADIUS, OVERLAY_SPOKES, OVERLAY_RINGS, 48),
    [],
  );
  const connectorGeometryMemo = useMemo(
    () =>
      connectorGeometry(
        GIANT_RADIUS,
        GIANT_SPOKES,
        GIANT_RINGS,
        HONEY_RADIUS,
        HONEY_RINGS,
        -1.3,
      ),
    [],
  );
  const particleTexture = useMemo(() => createParticleTexture(), []);

  const webSegments = useMemo(
    () => webRadialSegments(GIANT_RADIUS, GIANT_SPOKES, GIANT_RINGS),
    [],
  );
  const honeySegments = useMemo(
    () => honeycombSegments(HONEY_RADIUS, HONEY_RINGS),
    [],
  );
  const honeyAdjacency = useMemo(
    () => buildHoneycombAdjacency(honeySegments),
    [honeySegments],
  );

  const webTelemetry = useMemo(
    () => buildTelemetry(webSegments, WEB_TELEMETRY),
    [webSegments],
  );
  const honeyTelemetry = useMemo(
    () => buildTelemetry(honeySegments, HONEY_TELEMETRY),
    [honeySegments],
  );

  const webPositionArgs = useMemo(
    () => [webTelemetry.positions, 3] as [Float32Array, number],
    [webTelemetry.positions],
  );
  const honeyPositionArgs = useMemo(
    () => [honeyTelemetry.positions, 3] as [Float32Array, number],
    [honeyTelemetry.positions],
  );

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
    const rawVelocity =
      (scrollProgress - lastScrollProgress.current) / Math.max(delta, 0.001);
    lastScrollProgress.current = scrollProgress;
    scrollVelocity.current = lerp(scrollVelocity.current, rawVelocity, 0.08);
    const energy = Math.min(1, Math.abs(scrollVelocity.current) * 8);

    pointerSmooth.current.x = lerp(pointerSmooth.current.x, pointerTarget.current.x, 0.06);
    pointerSmooth.current.y = lerp(pointerSmooth.current.y, pointerTarget.current.y, 0.06);
    const px = pointerSmooth.current.x;
    const py = pointerSmooth.current.y;
    const pointerIntensity = Math.max(0, 1 - Math.hypot(px, py));

    // Root volume: continuous drift + scroll + mouse
    rootRef.current.rotation.x =
      Math.sin(t * 0.18) * 0.05 + scrollProgress * 0.22 + py * 0.06;
    rootRef.current.rotation.y =
      Math.cos(t * 0.14) * 0.04 + scrollProgress * 0.1 + px * 0.06;
    rootRef.current.rotation.z = Math.sin(t * 0.09) * 0.02;
    rootRef.current.position.y = Math.sin(t * 0.35) * 0.08;

    // Giant web: far back, slow counter-rotation
    if (giantRef.current) {
      giantRef.current.rotation.y = -t * 0.045 - scrollProgress * 0.08 + px * 0.03;
      giantRef.current.rotation.x = Math.sin(t * 0.11) * 0.03 + 0.04;
      giantRef.current.rotation.z = Math.cos(t * 0.08) * 0.015;
    }

    // Honeycomb field: offset vertically so it slices through the webs
    if (honeyRef.current) {
      honeyRef.current.rotation.y = t * 0.075 + scrollProgress * 0.05 - px * 0.04;
      honeyRef.current.rotation.x = 0.14 + Math.sin(t * 0.13) * 0.02;
      honeyRef.current.rotation.z = Math.cos(t * 0.07) * 0.01;
      honeyRef.current.position.y = -1.3 + Math.sin(t * 0.25) * 0.06;
    }

    // Mid web: crosses through honeycomb vertically
    if (midRef.current) {
      midRef.current.rotation.y = -t * 0.16 - scrollProgress * 0.1;
      midRef.current.rotation.x = -0.1 + Math.cos(t * 0.17) * 0.02;
      const scale = 1 + Math.sin(t * 2) * 0.04 + energy * 0.15;
      midRef.current.scale.setScalar(scale);
      midRef.current.position.y = 0.9 + Math.sin(t * 0.3) * 0.05;
    }

    // Overlay web: close, fast, reactive
    if (overlayRef.current) {
      overlayRef.current.rotation.y = t * 0.5 + scrollProgress * 0.28 + px * 0.1;
      overlayRef.current.rotation.x = 0.06 + Math.cos(t * 0.3) * 0.03 + py * 0.04;
      const pulse =
        1 + Math.sin(t * 3.5) * 0.06 + energy * 0.25 + pointerIntensity * 0.1;
      overlayRef.current.scale.setScalar(pulse);
      overlayRef.current.position.y = -0.5 + Math.sin(t * 0.4) * 0.04;
    }

    if (overlayMatRef.current) {
      overlayMatRef.current.opacity =
        OVERLAY_OPACITY +
        Math.sin(t * 3.5) * 0.04 +
        energy * 0.12 +
        pointerIntensity * 0.08;
    }

    // Connector filaments breathe
    if (connectorRef.current) {
      connectorRef.current.rotation.y = t * 0.015;
      const s = 1 + Math.sin(t * 2.5) * 0.02 + energy * 0.05;
      connectorRef.current.scale.setScalar(s);
    }

    // Web telemetry: packets flow outward along radial spokes
    if (webTelemetryRef.current) {
      const pos = webTelemetryRef.current.geometry.attributes.position
        .array as Float32Array;
      const { idx, progress, speed } = webTelemetry;
      const speedScale = 1 + energy * 2;
      for (let i = 0; i < WEB_TELEMETRY; i++) {
        progress[i] += speed[i] * delta * speedScale;
        if (progress[i] >= 1) {
          progress[i] -= 1;
          const ring = idx[i] % GIANT_RINGS;
          const spoke = Math.floor(idx[i] / GIANT_RINGS);
          if (ring === GIANT_RINGS - 1) {
            idx[i] = spoke * GIANT_RINGS;
          } else {
            idx[i] += 1;
          }
        }
        const seg = webSegments[idx[i]];
        const k = i * 3;
        pos[k] = lerp(seg.x1, seg.x2, progress[i]);
        pos[k + 1] = lerp(seg.y1, seg.y2, progress[i]);
        pos[k + 2] = lerp(seg.z1, seg.z2, progress[i]);
      }
      webTelemetryRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Honeycomb telemetry: packets travel the hex network
    if (honeyTelemetryRef.current) {
      const pos = honeyTelemetryRef.current.geometry.attributes.position
        .array as Float32Array;
      const { idx, progress, speed, reversed } = honeyTelemetry;
      const speedScale = 1 + energy * 1.5;
      for (let i = 0; i < HONEY_TELEMETRY; i++) {
        progress[i] += speed[i] * delta * speedScale;
        if (progress[i] >= 1) {
          const seg = honeySegments[idx[i]];
          const rx = reversed[i] ? seg.x1 : seg.x2;
          const ry = reversed[i] ? seg.y1 : seg.y2;
          const rz = reversed[i] ? seg.z1 : seg.z2;
          const candidates = honeyAdjacency.get(nodeKey(rx, ry, rz)) ?? [idx[i]];
          const nextIdx = candidates[Math.floor(Math.random() * candidates.length)];
          const nextSeg = honeySegments[nextIdx];
          idx[i] = nextIdx;
          reversed[i] = eq(rx, nextSeg.x2) && eq(ry, nextSeg.y2) && eq(rz, nextSeg.z2) ? 1 : 0;
          progress[i] = 0;
        }
        const seg = honeySegments[idx[i]];
        const ax = reversed[i] ? seg.x2 : seg.x1;
        const ay = reversed[i] ? seg.y2 : seg.y1;
        const az = reversed[i] ? seg.z2 : seg.z1;
        const bx = reversed[i] ? seg.x1 : seg.x2;
        const by = reversed[i] ? seg.y1 : seg.y2;
        const bz = reversed[i] ? seg.z1 : seg.z2;
        const k = i * 3;
        pos[k] = lerp(ax, bx, progress[i]);
        pos[k + 1] = lerp(ay, by, progress[i]);
        pos[k + 2] = lerp(az, bz, progress[i]);
      }
      honeyTelemetryRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Camera reacts to scroll and mouse
    camera.position.x = lerp(camera.position.x, px * 0.3, 0.04);
    camera.position.y = lerp(camera.position.y, py * 0.22, 0.04);
    camera.position.z = lerp(
      camera.position.z,
      5.8 + scrollProgress * 1.2 + energy * 0.35,
      0.03,
    );
    camera.lookAt(0, 0, 0);

    invalidate();
  });

  return (
    <group ref={rootRef}>
      <group ref={giantRef} position={[0, 0, -4.4]}>
        <lineSegments geometry={giantGeometry}>
          <lineBasicMaterial
            color={NEON}
            transparent
            opacity={GIANT_OPACITY}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
        <points ref={webTelemetryRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={webPositionArgs}
              usage={THREE.DynamicDrawUsage}
            />
          </bufferGeometry>
          <pointsMaterial
            color={NEON}
            size={0.07}
            map={particleTexture}
            transparent
            opacity={0.9}
            sizeAttenuation
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      </group>

      <group ref={connectorRef} position={[0, 0, -2.9]}>
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

      <group ref={honeyRef} position={[0, -1.3, -2.1]}>
        <lineSegments geometry={honeyGeometry}>
          <lineBasicMaterial
            color={NEON}
            transparent
            opacity={HONEY_OPACITY}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
        <points ref={honeyTelemetryRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={honeyPositionArgs}
              usage={THREE.DynamicDrawUsage}
            />
          </bufferGeometry>
          <pointsMaterial
            color={NEON}
            size={0.06}
            map={particleTexture}
            transparent
            opacity={0.85}
            sizeAttenuation
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      </group>

      <group ref={midRef} position={[0, 0.9, -0.5]}>
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

      <group ref={overlayRef} position={[0, -0.5, 0.9]}>
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
    </group>
  );
}

export function WebHiveThreeBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(circle at 50% 45%, #07100a 0%, #050608 65%, #000 100%)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 60, near: 0.1, far: 30 }}
        frameloop="demand"
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        dpr={[1, 1.25]}
      >
        <WebHiveScene />
      </Canvas>
    </div>
  );
}
