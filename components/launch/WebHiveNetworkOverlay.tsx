"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

const ACCENT = "#39FF14";
const HEX_RADIUS = 0.85;
const HEX_RINGS = 4;
const LAYERS = 4;
const Z_SPREAD = 4.5;
const MAX_NEIGHBORS = 3;
const EDGE_THRESHOLD = HEX_RADIUS * 1.85;

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildHoneycombNodes(seed: number): THREE.Vector3[] {
  const rand = mulberry32(seed);
  const nodes: THREE.Vector3[] = [];
  const w = Math.sqrt(3) * HEX_RADIUS;
  const h = 1.5 * HEX_RADIUS;

  for (let ring = 0; ring <= HEX_RINGS; ring++) {
    for (let q = -ring; q <= ring; q++) {
      for (let r = Math.max(-ring, -q - ring); r <= Math.min(ring, -q + ring); r++) {
        const x = w * q + (w / 2) * r;
        const y = h * r;
        // Skip the exact center occasionally so the hub is not overcrowded.
        if (ring === 0 && rand() > 0.35) continue;
        const z = -Z_SPREAD / 2 + rand() * Z_SPREAD;
        const jitterX = (rand() - 0.5) * HEX_RADIUS * 0.25;
        const jitterY = (rand() - 0.5) * HEX_RADIUS * 0.25;
        nodes.push(new THREE.Vector3(x + jitterX, y + jitterY, z));
      }
    }
  }

  // Add a few layered rings at varying depths for the "spiderweb" radial feel.
  const layerNodes = LAYERS * 16;
  for (let i = 0; i < layerNodes; i++) {
    const angle = (i / 16) * Math.PI * 2 + (Math.floor(i / 16) * Math.PI) / LAYERS;
    const radius = 2.2 + (i % 4) * 1.4 + rand() * 0.4;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const z = -Z_SPREAD / 2 + rand() * Z_SPREAD;
    nodes.push(new THREE.Vector3(x, y, z));
  }

  return nodes;
}

function buildEdges(nodes: THREE.Vector3[]): [THREE.Vector3, THREE.Vector3][] {
  const edges: [THREE.Vector3, THREE.Vector3][] = [];
  const seen = new Set<string>();
  for (let i = 0; i < nodes.length; i++) {
    const neighbors: { j: number; d: number }[] = [];
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;
      const d = nodes[i].distanceTo(nodes[j]);
      if (d < EDGE_THRESHOLD) neighbors.push({ j, d });
    }
    neighbors.sort((a, b) => a.d - b.d);
    for (const { j } of neighbors.slice(0, MAX_NEIGHBORS)) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push([nodes[i], nodes[j]]);
    }
  }
  return edges;
}

function NetworkContent() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const reducedMotion = useReducedMotion();
  const { invalidate } = useThree();
  const timeRef = useRef(0);
  const intro = useRef({ value: reducedMotion ? 1 : 0 });

  const nodes = useMemo(() => buildHoneycombNodes(0x9e3779b9), []);
  const edges = useMemo(() => buildEdges(nodes), [nodes]);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (reducedMotion) {
      intro.current.value = 1;
      return;
    }
    const tween = gsap.to(intro.current, {
      value: 1,
      duration: 1.8,
      ease: "power2.out",
      onUpdate: invalidate,
    });
    return () => {
      tween.kill();
    };
  }, [reducedMotion, invalidate]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const dt = Math.min(delta, 0.1);
    if (!reducedMotion) timeRef.current += dt * 0.35;
    const t = timeRef.current;
    const p = intro.current.value;

    nodes.forEach((node, i) => {
      const pulse = Math.sin(t + node.x * 0.4 + node.y * 0.3) * 0.15 + 1;
      dummy.position.copy(node).multiplyScalar(pulse * 0.15 + 0.85);
      dummy.position.multiplyScalar(p);
      dummy.scale.setScalar((0.06 + Math.sin(t * 2 + node.z) * 0.025) * p);
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    invalidate();
  });

  return (
    <group rotation={[0.18, 0, 0]}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, nodes.length]}>
        <sphereGeometry args={[1, 10, 10]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.75} />
      </instancedMesh>
      <Line
        segments
        points={edges.flatMap(([a, b]) => [a, b])}
        color={ACCENT}
        lineWidth={1}
        transparent
        opacity={0.07}
      />
      <ambientLight intensity={0.5} />
      <pointLight color={ACCENT} intensity={1.2} position={[4, 4, 4]} />
    </group>
  );
}

export function WebHiveNetworkOverlay() {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, transparent 0%, transparent 35%, rgba(5,6,8,0.55) 100%)",
        }}
      />
      <Canvas
        camera={{ position: [0, 0, 9.5], fov: 55, near: 0.1, far: 30 }}
        frameloop="demand"
        dpr={[1, 1.25]}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      >
        <NetworkContent />
      </Canvas>
    </div>
  );
}
