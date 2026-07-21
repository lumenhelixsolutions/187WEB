"use client";

import { useMemo } from "react";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

const NEON = "#39FF14";

const CODE_SNIPPETS = [
  'import { hive } from "@/lib/webhive";',
  "const signal = telemetry.read(0x4A);",
  "if (signal > threshold) { hive.lock(); }",
  'natasha.sweep({ surface: "public", depth: 3 });',
  'yelena.gate({ ci: true, iam: true });',
  'xavier.council({ topic: "ship", urgency: "high" });',
  'brood.spawn({ parent: "natasha", task: "scan" });',
  "0x7F 0xA2 0x11 0xD4 0xE8 0x00",
  "SYS.HIVE.NODE :: ONLINE",
  "TELEMETRY_STREAM_OK",
  "checksum(artifact) === 0x9f3b",
  "while (alive) { route(pulse); }",
];

const LABELS = [
  "HIVE.NODE",
  "SYS.OK",
  "TELEMETRY",
  "BROOD.IDLE",
  "COUNCIL.STBY",
  "NATASHA.LINK",
  "YELENA.GATE",
  "XAVIER.SHIP",
];

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randHexByte(rand: () => number) {
  const n = Math.floor(rand() * 256);
  return `0x${n.toString(16).padStart(2, "0").toUpperCase()}`;
}

type MatrixColumn = {
  id: number;
  left: number;
  width: number;
  duration: number;
  delay: number;
  fontSize: number;
  opacity: number;
  chars: string[];
};

function buildColumns(seed: number, count: number): MatrixColumn[] {
  const rand = mulberry32(seed);
  const cols: MatrixColumn[] = [];
  const band = 100 / count;
  for (let i = 0; i < count; i++) {
    const left = i * band + rand() * band * 0.7;
    const chars = Array.from({ length: 14 }, () => randHexByte(rand));
    cols.push({
      id: i,
      left,
      width: 1.5 + rand() * 1.5,
      duration: 7 + rand() * 8,
      delay: -(rand() * 20),
      fontSize: 10 + rand() * 6,
      opacity: 0.08 + rand() * 0.2,
      chars,
    });
  }
  return cols;
}

type CodeStrip = {
  id: number;
  fontSize: number;
  opacity: number;
  duration: number;
  blur: number;
  content: string;
};

function buildStrips(seed: number, count: number): CodeStrip[] {
  const rand = mulberry32(seed);
  const shuffled = [...CODE_SNIPPETS].sort(() => rand() - 0.5);
  const strips: CodeStrip[] = [];
  for (let i = 0; i < count; i++) {
    const chunk = shuffled.slice(i * 2, i * 2 + 3).join("  //  ");
    strips.push({
      id: i,
      fontSize: 10 + rand() * 4,
      opacity: 0.06 + rand() * 0.12,
      duration: 22 + rand() * 20,
      blur: rand() > 0.6 ? 1 : 0,
      content: `${chunk}  //  ${chunk}`,
    });
  }
  return strips;
}

type TelemetryLabel = {
  id: number;
  left: number;
  top: number;
  text: string;
  delay: number;
};

function buildLabels(seed: number, count: number): TelemetryLabel[] {
  const rand = mulberry32(seed);
  const labels: TelemetryLabel[] = [];
  for (let i = 0; i < count; i++) {
    labels.push({
      id: i,
      left: 4 + rand() * 88,
      top: 6 + rand() * 84,
      text: LABELS[i % LABELS.length],
      delay: rand() * 4,
    });
  }
  return labels;
}

export function WebHiveTelemetryOverlay() {
  const reducedMotion = useReducedMotion();
  const columns = useMemo(() => buildColumns(0x9e3779b9, 18), []);
  const strips = useMemo(() => buildStrips(0x6d2b79f5, 6), []);
  const labels = useMemo(() => buildLabels(0x7f4a7c13, 8), []);

  if (reducedMotion) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[2] overflow-hidden"
      aria-hidden="true"
    >
      {/* Edge vignette so the overlay stays behind content and fades at borders. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, transparent 0%, transparent 40%, rgba(5,6,8,0.65) 100%)",
        }}
      />

      {/* Layer 1: falling hex-byte matrix columns. */}
      {columns.map((col) => (
        <div
          key={col.id}
          className="absolute top-0 h-full overflow-hidden font-mono leading-tight"
          style={{
            left: `${col.left}%`,
            width: `${col.width}rem`,
            fontSize: col.fontSize,
            color: `rgba(57,255,20,${col.opacity})`,
          }}
        >
          <div
            className="absolute left-0 top-0 flex flex-col gap-2"
            style={{
              animation: `wh-matrix-fall ${col.duration}s linear infinite`,
              animationDelay: `${col.delay}s`,
            }}
          >
            {Array.from({ length: 3 }).flatMap((_, copy) =>
              col.chars.map((c, idx) => (
                <span key={`${copy}-${idx}`} className="block">
                  {c}
                </span>
              )),
            )}
          </div>
        </div>
      ))}

      {/* Layer 2: horizontal code/telemetry streams at different depths. */}
      <div className="absolute inset-0 flex flex-col justify-around py-16">
        {strips.map((strip) => (
          <div
            key={strip.id}
            className="sc-mask-x overflow-hidden font-mono whitespace-nowrap"
            style={{
              opacity: strip.opacity,
              filter: strip.blur ? `blur(${strip.blur}px)` : undefined,
            }}
          >
            <div
              className="inline-flex"
              style={{
                animation: `wh-code-drift ${strip.duration}s linear infinite`,
                fontSize: strip.fontSize,
                color: `rgba(57,255,20,${strip.opacity + 0.1})`,
              }}
            >
              <span className="px-8">{strip.content}</span>
              <span className="px-8">{strip.content}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Layer 3: pulsing system labels scattered through the field. */}
      {labels.map((label) => (
        <span
          key={label.id}
          className="absolute font-mono text-[10px] font-semibold uppercase tracking-widest"
          style={{
            left: `${label.left}%`,
            top: `${label.top}%`,
            color: NEON,
            animation: `wh-pulse-glow 4s ease-in-out infinite`,
            animationDelay: `${label.delay}s`,
          }}
        >
          {label.text}
        </span>
      ))}
    </div>
  );
}
