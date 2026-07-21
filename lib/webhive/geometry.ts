import * as THREE from "three";

export interface Segment {
  x1: number;
  y1: number;
  z1: number;
  x2: number;
  y2: number;
  z2: number;
}

export function webGeometry(
  radius: number,
  spokes: number,
  rings: number,
  ringSegments: number,
): THREE.BufferGeometry {
  const positions: number[] = [];

  for (let i = 0; i < spokes; i++) {
    const angle = (i * Math.PI * 2) / spokes;
    positions.push(
      0,
      0,
      0,
      Math.cos(angle) * radius,
      0,
      Math.sin(angle) * radius,
    );
  }

  for (let r = 1; r <= rings; r++) {
    const ringRadius = (radius / rings) * r;
    for (let i = 0; i < ringSegments; i++) {
      const a1 = (i * Math.PI * 2) / ringSegments;
      const a2 = ((i + 1) * Math.PI * 2) / ringSegments;
      positions.push(
        Math.cos(a1) * ringRadius,
        0,
        Math.sin(a1) * ringRadius,
        Math.cos(a2) * ringRadius,
        0,
        Math.sin(a2) * ringRadius,
      );
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  return geometry;
}

export function webRadialSegments(
  radius: number,
  spokes: number,
  rings: number,
): Segment[] {
  const segments: Segment[] = [];
  for (let i = 0; i < spokes; i++) {
    const angle = (i * Math.PI * 2) / spokes;
    for (let r = 0; r < rings; r++) {
      const r1 = (radius / rings) * r;
      const r2 = (radius / rings) * (r + 1);
      segments.push({
        x1: Math.cos(angle) * r1,
        y1: 0,
        z1: Math.sin(angle) * r1,
        x2: Math.cos(angle) * r2,
        y2: 0,
        z2: Math.sin(angle) * r2,
      });
    }
  }
  return segments;
}

export function hexCorners(cx: number, cy: number, r: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    points.push(
      new THREE.Vector3(cx + r * Math.cos(angle), cy + r * Math.sin(angle), 0),
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
        centers.push(new THREE.Vector3(sx + (nx - sx) * t, sy + (ny - sy) * t, 0));
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

export function honeycombSegments(radius: number, rings: number): Segment[] {
  const segments: Segment[] = [];
  const centers = honeycombCenters(radius, rings);
  for (const center of centers) {
    const corners = hexCorners(center.x, center.y, radius - 0.04);
    for (let i = 0; i < 6; i++) {
      const a = corners[i];
      const b = corners[(i + 1) % 6];
      segments.push({
        x1: a.x,
        y1: a.y,
        z1: a.z,
        x2: b.x,
        y2: b.y,
        z2: b.z,
      });
    }
  }
  return segments;
}

export function buildHoneycombAdjacency(segments: Segment[]): Map<string, number[]> {
  const map = new Map<string, number[]>();
  const key = (x: number, y: number, z: number) =>
    `${x.toFixed(6)},${y.toFixed(6)},${z.toFixed(6)}`;

  for (let i = 0; i < segments.length; i++) {
    const s = segments[i];
    const k1 = key(s.x1, s.y1, s.z1);
    const k2 = key(s.x2, s.y2, s.z2);
    if (!map.has(k1)) map.set(k1, []);
    if (!map.has(k2)) map.set(k2, []);
    map.get(k1)!.push(i);
    map.get(k2)!.push(i);
  }
  return map;
}

export function connectorGeometry(
  webRadius: number,
  webSpokes: number,
  webRings: number,
  honeyRadius: number,
  honeyRings: number,
  honeyY = 0,
): THREE.BufferGeometry {
  const positions: number[] = [];
  const honeyCenters = honeycombCenters(honeyRadius, honeyRings);
  const webPoints: THREE.Vector3[] = [];

  for (let r = 1; r <= webRings; r++) {
    const ringRadius = (webRadius / webRings) * r;
    for (let i = 0; i < webSpokes; i++) {
      const angle = (i * Math.PI * 2) / webSpokes;
      webPoints.push(
        new THREE.Vector3(Math.cos(angle) * ringRadius, 0, Math.sin(angle) * ringRadius),
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
    positions.push(center.x, honeyY, center.z, nearest.x, 0, nearest.z);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  return geometry;
}
