"use client";

import { Reveal } from "@/components/Reveal";
import { ColumnVisualizer, PixelGrid, PointCloud, FiberOrbs } from "./demos";

const DEMOS = [FiberOrbs, PointCloud, ColumnVisualizer, PixelGrid];

export function VizShowcase() {
  return (
    <section id="viz-lab" className="relative border-t border-white/10 bg-[#050608] px-6 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#2dd4bf]">
            <span className="h-px w-6 bg-[#2dd4bf]" aria-hidden />
            Viz lab
          </p>
          <h2 className="mt-4 text-[clamp(1.9rem,1.2rem+2.6vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-white">
            {DEMOS.length} live visualization systems
          </h2>
          <p className="mt-4 leading-relaxed text-white/60">
            Every 187VIZ pattern as a real, GPU-drawn demo — an additive glowing orb field, a pointer-rippled point
            cloud, a rhythmic column visualizer, and a proximity-reactive pixel grid. Canvas/2D for cross-device
            resilience; each honours <code className="text-[#5eead4]">prefers-reduced-motion</code> and only runs while
            visible.
          </p>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DEMOS.map((Demo, i) => (
            <Reveal key={i} delay={(i % 3) * 60}>
              <Demo />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
