"use client";

import { useEffect, useRef, useState } from "react";
import type { PreviewKind } from "@/lib/motion-registry-preview";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

/**
 * Small, mostly-CSS previews for each registry pattern archetype
 * (lib/motion-registry-preview.ts classifies all 207 entries into one of
 * these). These are representative, not literal reproductions of each
 * pattern's exact logic — building 207 bespoke implementations isn't
 * tractable, so entries in the same visual family share one preview.
 * Pure-CSS variants inherit the site-wide prefers-reduced-motion override
 * in globals.css for free; the two JS-driven ones (cursor, counter) check
 * useReducedMotion() explicitly.
 */

// 6 points evenly spaced around a 22px-radius circle, precomputed rather than
// derived from Math.cos/sin at render time — trig functions aren't guaranteed
// bit-identical across JS engines, and Node's V8 (SSR) vs the browser's V8
// (hydration) disagreeing by a float ULP was producing real hydration
// mismatches here.
const PARTICLE_OFFSETS: Array<[number, number]> = [
  [22, 0],
  [11, 19],
  [-11, 19],
  [-22, 0],
  [-11, -19],
  [11, -19],
];

function Frame({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <div
      className="group relative flex h-20 w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black/25"
      style={{ ["--preview-accent" as string]: accent }}
    >
      {children}
    </div>
  );
}

function Dot({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return <span className={`block h-2 w-2 rounded-full bg-[var(--preview-accent)] ${className}`} style={style} />;
}

function StaggerDots({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {Array.from({ length: count }, (_, i) => (
        <Dot key={i} className="sc-rise-hover" style={{ ["--rise-delay" as string]: `${i * 0.06}s` }} />
      ))}
    </div>
  );
}

function CursorFollow() {
  const boxRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (reducedMotion) return;
    const box = boxRef.current;
    const glow = glowRef.current;
    if (!box || !glow) return;
    const move = (e: PointerEvent) => {
      const r = box.getBoundingClientRect();
      glow.style.transform = `translate(${e.clientX - r.left - 16}px, ${e.clientY - r.top - 16}px)`;
      glow.style.opacity = "1";
    };
    const leave = () => {
      glow.style.opacity = "0";
    };
    box.addEventListener("pointermove", move);
    box.addEventListener("pointerleave", leave);
    return () => {
      box.removeEventListener("pointermove", move);
      box.removeEventListener("pointerleave", leave);
    };
  }, [reducedMotion]);
  return (
    <div ref={boxRef} className="absolute inset-0">
      <div
        ref={glowRef}
        className="pointer-events-none absolute h-8 w-8 rounded-full bg-[var(--preview-accent)] opacity-0 blur-md transition-opacity"
      />
      <div className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-widest text-white/30">
        move
      </div>
    </div>
  );
}

function Counter() {
  const [value, setValue] = useState(0);
  const reducedMotion = useReducedMotion();
  const onEnter = () => {
    if (reducedMotion) {
      setValue(187);
      return;
    }
    let n = 0;
    const id = window.setInterval(() => {
      n += 17;
      setValue(Math.min(n, 187));
      if (n >= 187) window.clearInterval(id);
    }, 40);
  };
  return (
    <div onPointerEnter={onEnter} onPointerLeave={() => setValue(0)} className="text-2xl font-bold text-[var(--preview-accent)]">
      {value}
    </div>
  );
}

export function PatternPreview({ kind, color, seed }: { kind: PreviewKind; color: string; seed: number }) {
  switch (kind) {
    case "morph":
      return (
        <Frame accent={color}>
          <div className="sc-blob h-10 w-10 bg-[var(--preview-accent)]" />
        </Frame>
      );

    case "draw-path":
      return (
        <Frame accent={color}>
          <svg viewBox="0 0 60 60" className="h-12 w-12">
            <circle cx="30" cy="30" r="22" fill="none" strokeWidth="3" className="sc-draw-hover stroke-[var(--preview-accent)]" />
          </svg>
        </Frame>
      );

    case "split-text":
      return (
        <Frame accent={color}>
          <div className="flex gap-1 text-lg font-bold text-[var(--preview-accent)]">
            {"GSAP".split("").map((ch, i) => (
              <span key={i} className="sc-rise-hover" style={{ ["--rise-delay" as string]: `${i * 0.08}s` }}>
                {ch}
              </span>
            ))}
          </div>
        </Frame>
      );

    case "flip":
      return (
        <Frame accent={color}>
          <div className="sc-perspective h-10 w-10">
            <div className="sc-tilt h-full w-full rounded-lg bg-[var(--preview-accent)]" />
          </div>
        </Frame>
      );

    case "drag":
      return (
        <Frame accent={color}>
          <div className="relative h-2 w-3/4 rounded-full bg-white/10">
            <div className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[var(--preview-accent)] transition-transform duration-700 ease-out group-hover:translate-x-[calc(100%*3)]" />
          </div>
        </Frame>
      );

    case "parallax":
      return (
        <Frame accent={color}>
          <div className="relative h-10 w-16">
            <Dot className="absolute left-0 top-1 transition-transform duration-500 group-hover:translate-x-2" />
            <Dot className="absolute left-4 top-5 opacity-60 transition-transform duration-700 group-hover:translate-x-5" />
            <Dot className="absolute left-9 top-2 opacity-30 transition-transform duration-[900ms] group-hover:translate-x-7" />
          </div>
        </Frame>
      );

    case "rotate-icon":
      return (
        <Frame accent={color}>
          <div className="h-8 w-8 rotate-0 rounded bg-[var(--preview-accent)] transition-transform duration-700 ease-out group-hover:rotate-[360deg]" />
        </Frame>
      );

    case "toggle":
      return (
        <Frame accent={color}>
          <div className="h-6 w-11 rounded-full bg-white/10 p-1 transition-colors group-hover:bg-[var(--preview-accent)]/25">
            <div className="h-4 w-4 rounded-full bg-[var(--preview-accent)] transition-transform duration-300 group-hover:translate-x-5" />
          </div>
        </Frame>
      );

    case "fade":
      return (
        <Frame accent={color}>
          <div className="absolute inset-3 rounded-lg bg-white/10" />
          <div className="absolute inset-3 rounded-lg bg-[var(--preview-accent)] transition-opacity duration-500 group-hover:opacity-0" />
        </Frame>
      );

    case "marquee":
      return (
        <Frame accent={color}>
          <div className="sc-mask-x w-full overflow-hidden">
            <div className="sc-marquee flex w-max gap-4 text-[10px] uppercase tracking-widest text-[var(--preview-accent)]">
              {Array.from({ length: 2 }, (_, dup) => (
                <span key={dup} className="flex gap-4">
                  {["187web", "gsap", "motion", "187web", "gsap", "motion"].map((t, i) => (
                    <span key={i}>{t}</span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </Frame>
      );

    case "scroll":
      return (
        <Frame accent={color}>
          <div className="h-12 w-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-0 w-full bg-[var(--preview-accent)] transition-[height] duration-700 ease-out group-hover:h-full" />
          </div>
        </Frame>
      );

    case "wipe":
      return (
        <Frame accent={color}>
          <div className="absolute inset-3 origin-left scale-x-0 rounded-lg bg-[var(--preview-accent)] transition-transform duration-500 ease-out group-hover:scale-x-100" />
        </Frame>
      );

    case "stagger-grid":
      return (
        <Frame accent={color}>
          <StaggerDots />
        </Frame>
      );

    case "carousel":
      return (
        <Frame accent={color}>
          <div className="flex gap-1.5 transition-transform duration-500 ease-out group-hover:-translate-x-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-10 w-7 rounded-md bg-[var(--preview-accent)]" style={{ opacity: 1 - i * 0.28 }} />
            ))}
          </div>
        </Frame>
      );

    case "loader":
      return (
        <Frame accent={color}>
          <div className="flex w-2/3 flex-col gap-2">
            <div className="sc-skeleton h-2 w-full rounded" />
            <div className="sc-skeleton h-2 w-2/3 rounded" />
          </div>
        </Frame>
      );

    case "particle":
      return (
        <Frame accent={color}>
          {PARTICLE_OFFSETS.map(([dx, dy], i) => (
            <Dot
              key={i}
              className="sc-particle-dot absolute"
              style={{ ["--dx" as string]: `${dx}px`, ["--dy" as string]: `${dy}px` }}
            />
          ))}
        </Frame>
      );

    case "cursor":
      return (
        <Frame accent={color}>
          <CursorFollow />
        </Frame>
      );

    case "orbit3d":
      return (
        <Frame accent={color}>
          <div className="sc-spin-slow relative h-12 w-12 rounded-full border border-dashed border-white/15">
            <Dot className="absolute -top-1 left-1/2 -translate-x-1/2" />
          </div>
        </Frame>
      );

    case "glow-pulse":
      return (
        <Frame accent={color}>
          <div className="h-6 w-6 rounded-full bg-[var(--preview-accent)] transition-shadow duration-500 group-hover:shadow-[0_0_28px_var(--preview-accent)]" />
        </Frame>
      );

    case "counter":
      return (
        <Frame accent={color}>
          <Counter />
        </Frame>
      );

    case "button":
      return (
        <Frame accent={color}>
          <div className="sc-glow rounded-full bg-[var(--preview-accent)]/15 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-[var(--preview-accent)]">
            click
          </div>
        </Frame>
      );

    case "fallback":
    default: {
      const variant = seed % 3;
      return (
        <Frame accent={color}>
          {variant === 0 && <div className="sc-blob h-9 w-9 bg-[var(--preview-accent)]" />}
          {variant === 1 && <div className="sc-pulse h-8 w-8 rounded-full bg-[var(--preview-accent)]" />}
          {variant === 2 && <div className="sc-float h-8 w-8 rounded-lg bg-[var(--preview-accent)]" />}
        </Frame>
      );
    }
  }
}
