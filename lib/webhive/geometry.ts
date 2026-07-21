import * as THREE from "three";

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

export function connectorGeometry(
  webRadius: number,
  webSpokes: number,
  webRings: number,
  honeyRadius: number,
  honeyRings: number,
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
