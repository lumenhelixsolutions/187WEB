"use client";

import { useRef } from "react";
import { DemoCard, useCanvas2D, useInView, useReducedMotion } from "@/components/demo-lab/kit";

const ACCENT = "#2dd4bf";

export function ColumnVisualizer() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const running = inView && !reduced;
  const bars = 15;
  return (
    <DemoCard name="Rhythmic Column Visualizer" command="/187gridvisual" how="Vertical bars scaleY on a sine wave rippling out from centre — stagger + sine.inOut, continuous." mode="auto" accent={ACCENT}>
      <div ref={ref} className="flex h-28 items-center justify-center gap-1.5">
        {Array.from({ length: bars }, (_, i) => {
          const dist = Math.abs(i - (bars - 1) / 2);
          return (
            <span
              key={i}
              className="tp-vizbar w-2 rounded-full"
              style={{
                height: "100%",
                background: "linear-gradient(#2dd4bf, #0d9488)",
                animationDelay: `${dist * 0.08}s`,
                animationPlayState: running ? "running" : "paused",
                transformOrigin: "center",
              }}
            />
          );
        })}
      </div>
    </DemoCard>
  );
}

export function PixelGrid() {
  const reduced = useReducedMotion();
  const areaRef = useRef<HTMLDivElement>(null);
  const cols = 12;
  const rows = 7;
  const onMove = (e: React.PointerEvent) => {
    const area = areaRef.current;
    if (!area || reduced) return;
    const r = area.getBoundingClientRect();
    const mx = e.clientX - r.left;
    const my = e.clientY - r.top;
    const cells = area.querySelectorAll<HTMLElement>("[data-cell]");
    cells.forEach((cell) => {
      const cx = cell.offsetLeft + cell.offsetWidth / 2;
      const cy = cell.offsetTop + cell.offsetHeight / 2;
      const d = Math.hypot(mx - cx, my - cy);
      const f = Math.max(0, 1 - d / 90);
      cell.style.transform = `scale(${1 + f * 1.1})`;
      cell.style.opacity = `${0.18 + f * 0.82}`;
    });
  };
  const reset = () => {
    const cells = areaRef.current?.querySelectorAll<HTMLElement>("[data-cell]");
    cells?.forEach((c) => {
      c.style.transform = "scale(1)";
      c.style.opacity = "0.18";
    });
  };
  return (
    <DemoCard name="Proximity Pixel Grid" command="/187pixelgrid" how="Each cell's distance to the pointer (gsap.utils.distance) maps to scale + brightness, quickTo-smoothed." mode="hover" accent={ACCENT}>
      <div ref={areaRef} onPointerMove={onMove} onPointerLeave={reset} className="grid gap-1" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: cols * rows }, (_, i) => (
          <span key={i} data-cell className="h-2.5 w-2.5 rounded-[3px] bg-[#2dd4bf] opacity-[0.18] transition-transform duration-150 ease-out" />
        ))}
      </div>
    </DemoCard>
  );
}

export function PointCloud() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const canvasRef = useCanvas2D((ctx, t, w, h) => {
    ctx.clearRect(0, 0, w, h);
    const cols = 26;
    const rows = 14;
    const gx = w / (cols + 1);
    const gy = h / (rows + 1);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const bx = gx * (c + 1);
        const by = gy * (r + 1);
        // ripple wave + mouse displacement (fake depth)
        const wave = Math.sin(t * 1.4 + c * 0.4 + r * 0.3) * 3;
        const mdx = (mouse.current.x * w - bx) / w;
        const mdy = (mouse.current.y * h - by) / h;
        const push = Math.max(0, 1 - Math.hypot(mdx, mdy) * 2.2);
        const z = wave + push * 10;
        const size = 1 + push * 2.2 + (z > 0 ? z * 0.06 : 0);
        const alpha = 0.25 + push * 0.7;
        ctx.beginPath();
        ctx.arc(bx + mdx * push * -20, by + z, Math.max(0.6, size), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(45,212,191,${alpha})`;
        ctx.fill();
      }
    }
  }, inView && !reduced);
  const onMove = (e: React.PointerEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mouse.current = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
  };
  return (
    <DemoCard name="Interactive Point Cloud" command="/187pointcloudocean" how="A field of points ripples on a sine sea; the pointer pushes a depth wave through the grid (50k in the real Three.js build)." mode="hover" accent={ACCENT}>
      <div ref={ref} className="h-full w-full" onPointerMove={onMove}>
        <canvas ref={canvasRef} className="h-32 w-full" />
      </div>
    </DemoCard>
  );
}

export function FiberOrbs() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const canvasRef = useCanvas2D((ctx, t, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = "lighter";
    const N = 14;
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2;
      const x = w / 2 + Math.cos(a + t * 0.5) * (w * 0.32) * (0.6 + 0.4 * Math.sin(t + i));
      const y = h / 2 + Math.sin(a * 1.3 + t * 0.4) * (h * 0.32);
      const rad = 8 + Math.sin(t * 1.5 + i) * 5;
      const g = ctx.createRadialGradient(x, y, 0, x, y, rad);
      g.addColorStop(0, "rgba(45,212,191,0.9)");
      g.addColorStop(0.5, "rgba(34,211,238,0.35)");
      g.addColorStop(1, "rgba(45,212,191,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, rad, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalCompositeOperation = "source-over";
  }, inView && !reduced);
  return (
    <DemoCard name="Glowing Orb Field" command="/187fiberorb" how="Additively-blended radial-gradient orbs drift and pulse — the physical-material glow of the WebGL sphere field." mode="auto" accent={ACCENT}>
      <div ref={ref} className="h-full w-full">
        <canvas ref={canvasRef} className="h-32 w-full" />
      </div>
    </DemoCard>
  );
}
