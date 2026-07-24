"use client";

import type { CSSProperties } from "react";

/**
 * One faithful, always-on preview per DISTINCT motion technique (see
 * lib/motion-techniques.ts). Unlike the earlier per-entry previews these
 * aren't generic shapes keyed to a keyword — each one actually demonstrates
 * the mechanism its technique describes (a stroke that draws itself for
 * draw-svg, a clip-path curtain for clip-wipe, gravity-accelerated fall for
 * physics, an odometer reel for counter, …). All motion is transform/opacity
 * CSS keyframes (tp-* in globals.css), so a wall of them stays GPU-cheap and
 * the global prefers-reduced-motion override freezes every one to a legible
 * still frame. Accent is the technique's owning-skill color, passed in.
 */

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

function anim(name: string, dur: number, opts: { delay?: number; ease?: string; alt?: boolean } = {}): CSSProperties {
  return {
    animation: `${name} ${dur}ms ${opts.ease ?? EASE} ${opts.delay ?? 0}ms infinite ${opts.alt ? "alternate" : "normal"}`,
  };
}

function Stage({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <div
      className="relative flex h-28 w-full items-center justify-center overflow-hidden rounded-xl border border-white/10"
      style={{
        ["--preview-accent" as string]: accent,
        background:
          "radial-gradient(120% 90% at 50% 0%, rgba(255,255,255,0.05), transparent 60%), #06070c",
        boxShadow: "inset 0 0 32px rgba(0,0,0,0.5)",
      }}
    >
      {/* faint blueprint grid for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--preview-accent) 1px, transparent 1px), linear-gradient(90deg, var(--preview-accent) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />
      {children}
    </div>
  );
}

const bg = "bg-[var(--preview-accent)]";

export function TechniquePreview({ techniqueId, color }: { techniqueId: string; color: string }) {
  switch (techniqueId) {
    case "text-reveal":
      return (
        <Stage accent={color}>
          <div className="flex gap-1 text-2xl font-bold tracking-tight text-[var(--preview-accent)]">
            {"GSAP".split("").map((ch, i) => (
              <span key={i} style={anim("tp-rise", 2600, { delay: i * 140 })}>
                {ch}
              </span>
            ))}
          </div>
        </Stage>
      );

    case "draw-svg":
      return (
        <Stage accent={color}>
          <svg viewBox="0 0 120 48" className="h-14 w-32" fill="none">
            <path
              d="M6 30 C 20 8, 34 8, 44 26 S 70 44, 82 24 S 108 8, 114 22"
              pathLength={1}
              strokeWidth={3}
              strokeLinecap="round"
              className="stroke-[var(--preview-accent)]"
              style={{ strokeDasharray: 1, ...anim("tp-draw", 3200, { ease: "linear" }) }}
            />
          </svg>
        </Stage>
      );

    case "morph-svg":
      return (
        <Stage accent={color}>
          <div className="relative h-9 w-9">
            {/* play triangle ↔ pause bars crossfade */}
            <span
              className={`absolute inset-0 ${bg}`}
              style={{ clipPath: "polygon(20% 10%, 20% 90%, 90% 50%)", ...anim("tp-morph-a", 3000, { ease: "ease-in-out" }) }}
            />
            <span
              className="absolute inset-0 flex justify-between"
              style={{ ...anim("tp-morph-a", 3000, { ease: "ease-in-out", delay: 1500 }) }}
            >
              <span className={`h-full w-[30%] rounded-sm ${bg}`} />
              <span className={`h-full w-[30%] rounded-sm ${bg}`} />
            </span>
          </div>
        </Stage>
      );

    case "clip-wipe":
      return (
        <Stage accent={color}>
          <div className="relative h-14 w-24 overflow-hidden rounded-md bg-white/[0.06]">
            <div className={`absolute inset-0 ${bg}`} style={anim("tp-wipe", 3000, { ease: "cubic-bezier(0.76,0,0.24,1)" })} />
          </div>
        </Stage>
      );

    case "pixelate":
      return (
        <Stage accent={color}>
          <div
            className="h-14 w-20 rounded-md"
            style={{
              background: "linear-gradient(135deg, var(--preview-accent), rgba(255,255,255,0.4))",
              ...anim("tp-pixel", 3200, { ease: "steps(6, end)" }),
            }}
          />
        </Stage>
      );

    case "scroll-scrub":
      return (
        <Stage accent={color}>
          <div className="flex h-16 items-end gap-3">
            <div className="relative h-full w-2.5 overflow-hidden rounded-full bg-white/10">
              <div className={`absolute bottom-0 w-full origin-bottom ${bg}`} style={{ height: "100%", ...anim("tp-fill", 3000) }} />
            </div>
            <div className="flex flex-col gap-1.5 pb-1">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-1.5 w-12 rounded bg-white/10" />
              ))}
            </div>
          </div>
        </Stage>
      );

    case "scroll-pin":
      return (
        <Stage accent={color}>
          <div className="relative h-16 w-24 overflow-hidden rounded-md border border-white/10">
            <div className="absolute inset-x-0 top-0 flex flex-col gap-1.5 p-1.5" style={anim("tp-scroll-bg", 1600, { ease: "ease-in-out", alt: true })}>
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="h-1.5 w-full rounded bg-white/10" />
              ))}
            </div>
            <div className={`absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-md ${bg} shadow-[0_0_16px_var(--preview-accent)]`} />
          </div>
        </Stage>
      );

    case "parallax":
      return (
        <Stage accent={color}>
          <div className="relative h-16 w-28">
            <span className="absolute left-2 top-3 h-3 w-3 rounded-full bg-white/25" style={anim("tp-drift", 4200, { ease: "ease-in-out", alt: true })} />
            <span className="absolute left-10 top-8 h-4 w-4 rounded-full bg-[var(--preview-accent)]/70" style={anim("tp-drift", 3000, { ease: "ease-in-out", alt: true })} />
            <span className={`absolute left-20 top-4 h-5 w-5 rounded-full ${bg}`} style={anim("tp-drift", 2000, { ease: "ease-in-out", alt: true })} />
          </div>
        </Stage>
      );

    case "marquee":
      return (
        <Stage accent={color}>
          <div className="sc-mask-x w-full overflow-hidden">
            <div className="sc-marquee flex w-max gap-5 text-sm font-semibold uppercase tracking-widest text-[var(--preview-accent)]" style={{ animationDuration: "6s" }}>
              {Array.from({ length: 2 }, (_, dup) => (
                <span key={dup} className="flex gap-5" aria-hidden={dup === 1}>
                  {["187", "gsap", "motion", "187", "gsap", "motion"].map((t, i) => (
                    <span key={i}>{t}</span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </Stage>
      );

    case "stagger-cascade":
      return (
        <Stage accent={color}>
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className={`h-9 w-3 rounded-full ${bg}`} style={anim("tp-rise", 2400, { delay: i * 120 })} />
            ))}
          </div>
        </Stage>
      );

    case "carousel":
      return (
        <Stage accent={color}>
          <div className="w-20 overflow-hidden rounded-md">
            <div className="flex" style={{ width: "300%", ...anim("tp-slide", 4200, { ease: "cubic-bezier(0.65,0,0.35,1)" }) }}>
              {[1, 0.6, 0.85].map((o, i) => (
                <div key={i} className={`h-14 shrink-0 ${bg}`} style={{ width: "33.333%", opacity: o, borderRight: "2px solid #06070c" }} />
              ))}
            </div>
          </div>
        </Stage>
      );

    case "drag-inertia":
      return (
        <Stage accent={color}>
          <div className="relative h-2 w-3/4 rounded-full bg-white/10">
            <div className={`absolute left-0 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full ${bg} shadow-[0_4px_12px_rgba(0,0,0,0.6)]`} style={anim("tp-fling", 3400, { ease: "cubic-bezier(0.22,1,0.36,1)" })} />
          </div>
        </Stage>
      );

    case "cursor-follow":
      return (
        <Stage accent={color}>
          <div className="relative h-16 w-40">
            <span className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-white/25" style={anim("tp-orbit-path", 3600, { ease: "ease-in-out" })} />
            <span className="absolute left-1/2 top-1/2 h-3 w-3 rounded-full bg-[var(--preview-accent)]/60" style={anim("tp-orbit-path", 3600, { ease: "ease-in-out", delay: 160 })} />
            <span className={`absolute left-1/2 top-1/2 h-4 w-4 rounded-full ${bg} shadow-[0_0_14px_var(--preview-accent)]`} style={anim("tp-orbit-path", 3600, { ease: "ease-in-out", delay: 320 })} />
          </div>
        </Stage>
      );

    case "tilt-3d":
      return (
        <Stage accent={color}>
          <div style={{ perspective: "400px" }}>
            <div
              className="h-14 w-20 rounded-lg"
              style={{ background: "linear-gradient(135deg, var(--preview-accent), rgba(255,255,255,0.15))", transformStyle: "preserve-3d", ...anim("tp-tilt", 4000, { ease: "ease-in-out" }) }}
            />
          </div>
        </Stage>
      );

    case "orbit-rotate":
      return (
        <Stage accent={color}>
          <div className="sc-spin-slow relative h-14 w-14 rounded-full border border-dashed border-white/20" style={{ animationDuration: "6s" }}>
            <span className={`absolute -top-1 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full ${bg} shadow-[0_0_10px_var(--preview-accent)]`} />
            <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-white/40" />
          </div>
        </Stage>
      );

    case "counter":
      return (
        <Stage accent={color}>
          <div className="flex h-9 items-center gap-0.5 overflow-hidden font-mono text-3xl font-bold text-[var(--preview-accent)]">
            {[0, 240, 120].map((d, r) => (
              <div key={r} className="h-9 overflow-hidden leading-9">
                <div style={anim("tp-reel", 3000, { ease: "cubic-bezier(0.65,0,0.35,1)", delay: d })}>
                  {[0, 2, 4, 6, 8].map((n) => (
                    <div key={n} className="h-9">
                      {n}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Stage>
      );

    case "physics":
      return (
        <Stage accent={color}>
          <div className="relative h-16 w-24">
            {[8, 32, 56, 80].map((x, i) => (
              <span key={i} className={`absolute top-0 h-3 w-3 rounded-full ${bg}`} style={{ left: x, ...anim("tp-fall", 2200, { ease: "linear", delay: i * 260 }) }} />
            ))}
            <div className="absolute inset-x-0 bottom-0 h-px bg-white/15" />
          </div>
        </Stage>
      );

    case "flip-layout":
      return (
        <Stage accent={color}>
          <div style={{ perspective: "500px" }}>
            <div className="h-14 w-14 rounded-lg" style={{ background: "linear-gradient(135deg, var(--preview-accent), rgba(255,255,255,0.12))", transformStyle: "preserve-3d", ...anim("tp-flip", 3400, { ease: "cubic-bezier(0.65,0,0.35,1)" }) }} />
          </div>
        </Stage>
      );

    case "loader":
      return (
        <Stage accent={color}>
          <div className="flex w-2/3 flex-col gap-2">
            <div className="sc-skeleton h-2.5 w-full rounded-full" />
            <div className="sc-skeleton h-2.5 w-4/5 rounded-full" />
            <div className="sc-skeleton h-2.5 w-2/3 rounded-full" />
          </div>
        </Stage>
      );

    case "hover-fx":
      return (
        <Stage accent={color}>
          <div className="relative flex h-12 w-12 items-center justify-center">
            <span className={`absolute inset-0 rounded-full border-2 border-[var(--preview-accent)]`} style={anim("tp-ripple", 2200, { ease: "ease-out" })} />
            <span className={`absolute inset-0 rounded-full border-2 border-[var(--preview-accent)]`} style={anim("tp-ripple", 2200, { ease: "ease-out", delay: 1100 })} />
            <span className={`h-4 w-4 rounded-full ${bg}`} />
          </div>
        </Stage>
      );

    case "webgl-3d":
      return (
        <Stage accent={color}>
          <div style={{ perspective: "500px" }}>
            <svg viewBox="-60 -60 120 120" className="h-16 w-16" style={{ transformStyle: "preserve-3d", ...anim("tp-spin3d", 5000, { ease: "linear" }) }}>
              <g fill="none" strokeWidth={2} className="stroke-[var(--preview-accent)]" strokeLinejoin="round">
                <polygon points="0,-46 40,-23 40,23 0,46 -40,23 -40,-23" opacity={0.9} />
                <polygon points="0,-24 22,-12 22,12 0,24 -22,12 -22,-12" opacity={0.5} />
                <line x1="0" y1="-46" x2="0" y2="-24" />
                <line x1="40" y1="23" x2="22" y2="12" />
                <line x1="-40" y1="23" x2="-22" y2="12" />
              </g>
            </svg>
          </div>
        </Stage>
      );

    case "audio-react":
      return (
        <Stage accent={color}>
          <div className="flex h-14 items-center gap-1.5">
            {[0.5, 0.85, 1, 0.7, 1, 0.6, 0.9].map((peak, i) => (
              <span
                key={i}
                className={`w-2 origin-center rounded-full ${bg}`}
                style={{ height: 44, ["--peak" as string]: peak, ...anim("tp-bar", 900, { ease: "ease-in-out", delay: i * 90, alt: true }) }}
              />
            ))}
          </div>
        </Stage>
      );

    case "toggle-ui":
      return (
        <Stage accent={color}>
          <div className="w-24">
            <div className="flex h-6 items-center justify-between rounded-t-md bg-white/[0.08] px-2">
              <span className="h-1.5 w-10 rounded bg-white/25" />
              <span className={`h-2 w-2 rounded-full ${bg}`} />
            </div>
            <div className="origin-top overflow-hidden rounded-b-md bg-[var(--preview-accent)]/15 p-1.5" style={anim("tp-accordion", 3200, { ease: "cubic-bezier(0.76,0,0.24,1)" })}>
              <span className="mb-1 block h-1.5 w-full rounded bg-white/20" />
              <span className="block h-1.5 w-2/3 rounded bg-white/20" />
            </div>
          </div>
        </Stage>
      );

    case "media-embed":
      return (
        <Stage accent={color}>
          <div className="flex w-28 flex-col items-center gap-2.5">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${bg}`}>
              <span className="ml-0.5 block h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-black/70" />
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div className={`h-full w-full origin-left ${bg}`} style={anim("tp-fill-x", 3600, { ease: "linear" })} />
            </div>
          </div>
        </Stage>
      );

    case "map":
      return (
        <Stage accent={color}>
          <div className="relative h-16 w-16">
            <div className="sc-spin-slow absolute inset-0 rounded-full border border-[var(--preview-accent)]/40" style={{ animationDuration: "7s" }}>
              <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[var(--preview-accent)]/40" />
              <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[var(--preview-accent)]/40" />
              <span className="absolute inset-[22%] rounded-full border border-[var(--preview-accent)]/30" />
            </div>
            <span className={`absolute left-[58%] top-[30%] h-2.5 w-2.5 rounded-full ${bg} shadow-[0_0_10px_var(--preview-accent)]`} style={anim("tp-ripple", 2400, { ease: "ease-out" })} />
            <span className={`absolute left-[58%] top-[30%] h-2.5 w-2.5 rounded-full ${bg}`} />
          </div>
        </Stage>
      );

    case "ui-utility":
    default:
      return (
        <Stage accent={color}>
          <div className="flex w-28 flex-col gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-2" style={anim("tp-rise", 2800, { delay: i * 180 })}>
                <span className={`flex h-4 w-4 items-center justify-center rounded ${bg}`}>
                  <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none">
                    <path d="M2 6 L5 9 L10 3" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="stroke-black/70" />
                  </svg>
                </span>
                <span className="h-1.5 flex-1 rounded bg-white/20" />
              </div>
            ))}
          </div>
        </Stage>
      );
  }
}
