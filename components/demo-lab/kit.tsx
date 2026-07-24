"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Shared demo-lab kit reused by every skill's interactive lab (187model,
 * 187hero, 187viz, 187audio, …). Same contract as the 187TYPE harness but
 * parameterised by an accent colour so each skill keeps its own identity
 * hue. Cards carry the pattern's real /187 command, an interaction-mode
 * badge, and the mechanism caption; demos are IntersectionObserver-gated so
 * only visible ones run (keeps WebGL/rAF work — and context count — bounded).
 */

export type DemoMode = "hover" | "click" | "drag" | "auto" | "scroll";

const MODE_LABEL: Record<DemoMode, string> = {
  hover: "Hover",
  click: "Click",
  drag: "Drag",
  auto: "Live",
  scroll: "In view",
};

export function useInView<T extends HTMLElement>(rootMargin = "160px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin, threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);
  return { ref, inView };
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/**
 * 2D-canvas rAF loop, DPR-aware and only running while `active`. `draw(ctx,
 * t, w, h)` gets seconds elapsed and CSS pixel size. When active flips false
 * (offscreen / reduced motion) the loop stops but one final frame is drawn so
 * a legible still remains. Returns a canvas ref to spread onto <canvas>.
 */
export function useCanvas2D(
  draw: (ctx: CanvasRenderingContext2D, t: number, w: number, h: number) => void,
  active: boolean,
) {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef(draw);
  drawRef.current = draw;
  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const resize = () => {
      const r = cv.getBoundingClientRect();
      w = r.width;
      h = r.height;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    let raf = 0;
    const start = performance.now();
    const loop = () => {
      drawRef.current(ctx, (performance.now() - start) / 1000, w, h);
      if (active) raf = requestAnimationFrame(loop);
    };
    if (active) raf = requestAnimationFrame(loop);
    else drawRef.current(ctx, 0, w, h);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [active]);
  return ref;
}

export function DemoCard({
  name,
  command,
  how,
  mode,
  accent,
  children,
}: {
  name: string;
  /** Registry /187 command, or omit for a bonus trick not in the catalog. */
  command?: string;
  how: string;
  mode: DemoMode;
  accent: string;
  children: ReactNode;
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0A0C14] transition hover:border-white/20" style={{ ["--accent" as string]: accent }}>
      <div
        className="relative flex min-h-[12rem] items-center justify-center overflow-hidden border-b border-white/[0.06] p-6"
        style={{ background: `radial-gradient(130% 100% at 50% 0%, color-mix(in srgb, ${accent} 8%, transparent), transparent 60%), #06070c` }}
      >
        <span className="pointer-events-none absolute right-2.5 top-2.5 z-10 rounded-full border border-white/10 bg-black/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/45">
          {MODE_LABEL[mode]}
        </span>
        {children}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-[0.95rem] font-bold leading-tight text-white">{name}</h3>
          {command ? (
            <code className="shrink-0 rounded px-1.5 py-0.5 font-mono text-[11px]" style={{ backgroundColor: `color-mix(in srgb, ${accent} 12%, transparent)`, color: accent }}>
              {command}
            </code>
          ) : (
            <span className="shrink-0 rounded-full border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider" style={{ borderColor: `color-mix(in srgb, ${accent} 40%, transparent)`, color: accent }}>
              ★ bonus
            </span>
          )}
        </div>
        <p className="text-[0.8rem] leading-relaxed text-white/50">{how}</p>
      </div>
    </article>
  );
}
