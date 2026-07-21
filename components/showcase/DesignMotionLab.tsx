"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { prefersReducedMotion } from "@/lib/motion";

const MARQUEE_TAGS = [
  "motion",
  "typography",
  "glassmorphism",
  "SVG",
  "3D tilt",
  "kinetic type",
  "micro-interactions",
  "dark mode",
  "scroll depth",
  "neon glow",
];

function ScrollCounter({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setCount(target);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started) {
            setStarted(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, started]);

  useEffect(() => {
    if (!started) return;
    let start: number | null = null;
    const duration = 1500;
    const tick = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target]);

  return (
    <div ref={ref} className="text-center">
      <span className="text-5xl font-bold tabular-nums text-[#39FF14]">{count}</span>
      <p className="mt-1 text-sm text-white/60">{label}</p>
    </div>
  );
}

export function DesignMotionLab() {
  return (
    <section id="design-lab" className="relative border-y border-white/10 bg-[#080808]/80 px-6 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">Design & motion lab</p>
          <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">
            Web craft <span className="sc-grad-text">in motion</span>
          </h2>
          <p className="mt-4 text-white/60">
            A living sampler of the techniques 187WEB uses to make interfaces feel alive.
          </p>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Gradient text + glass panel */}
          <Reveal delay={0} className="sc-glass relative overflow-hidden rounded-2xl p-6 md:col-span-2">
            <div className="relative z-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Gradient type</p>
              <h3 className="mt-2 text-3xl font-bold sm:text-4xl">
                Color that <span className="sc-grad-text">flows</span> across the headline.
              </h3>
              <p className="mt-3 max-w-xl text-sm text-white/60">
                A single animated background gradient clipped to text keeps the motion lightweight and the copy readable.
              </p>
            </div>
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#39FF14]/10 blur-3xl" />
          </Reveal>

          {/* Marquee */}
          <Reveal delay={80} className="sc-glass relative overflow-hidden rounded-2xl py-5 md:col-span-2">
            <p className="sr-only">Scrolling capability tags</p>
            <div className="sc-mask-x">
              <div className="sc-marquee flex w-max items-center gap-8 px-4 text-sm font-semibold uppercase tracking-wider text-white/50">
                {[...MARQUEE_TAGS, ...MARQUEE_TAGS].map((tag, i) => (
                  <span key={`${tag}-${i}`} className="shrink-0">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Floating / pulsing orbs */}
          <Reveal delay={120} className="sc-glass relative min-h-[12rem] overflow-hidden rounded-2xl p-6">
            <p className="relative z-10 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Ambient depth</p>
            <p className="relative z-10 mt-2 font-medium text-white/80">Floating orbs</p>
            <div
              className="sc-float absolute left-[15%] top-[30%] h-16 w-16 rounded-full bg-purple-500/30 blur-2xl"
              aria-hidden="true"
            />
            <div
              className="sc-float sc-pulse absolute right-[20%] top-[45%] h-20 w-20 rounded-full bg-cyan-500/30 blur-2xl"
              style={{ animationDelay: "1.2s" }}
              aria-hidden="true"
            />
            <div
              className="sc-float absolute bottom-[20%] left-[45%] h-14 w-14 rounded-full bg-[#39FF14]/20 blur-2xl"
              style={{ animationDelay: "2.4s" }}
              aria-hidden="true"
            />
          </Reveal>

          {/* Skeleton shimmer */}
          <Reveal delay={160} className="sc-glass rounded-2xl p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Loading states</p>
            <div className="mt-4 space-y-3">
              <div className="h-4 w-3/4 rounded sc-skeleton" />
              <div className="h-4 w-1/2 rounded sc-skeleton" />
              <div className="h-20 rounded sc-skeleton" />
              <div className="h-4 w-2/3 rounded sc-skeleton" />
            </div>
          </Reveal>

          {/* Self-drawing SVG */}
          <Reveal delay={200} className="sc-glass grid place-items-center rounded-2xl p-6">
            <div className="text-center">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">SVG stroke draw</p>
              <svg
                className="mx-auto h-28 w-28"
                viewBox="0 0 100 100"
                fill="none"
                stroke="#39FF14"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle className="sc-draw-path" cx="50" cy="50" r="38" pathLength={1} />
                <path className="sc-draw-path" d="M30 52 L45 67 L72 36" pathLength={1} style={{ animationDelay: "0.5s" }} />
              </svg>
            </div>
          </Reveal>

          {/* Kinetic / variable-weight hover text */}
          <Reveal delay={240} className="sc-glass flex items-center justify-center rounded-2xl p-6">
            <div className="text-center">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Kinetic type</p>
              <p className="cursor-default text-3xl font-extralight text-white/80 transition-all duration-300 hover:font-bold hover:tracking-wide sc-vweight">
                Hover me
              </p>
            </div>
          </Reveal>

          {/* 3D tilt hover card */}
          <Reveal delay={280} className="sc-perspective">
            <div className="sc-glass sc-tilt flex h-full flex-col justify-between rounded-2xl p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">3D tilt</p>
                <p className="mt-2 text-lg font-semibold text-white/90">Pure CSS perspective</p>
                <p className="mt-2 text-sm text-white/60">
                  The card tilts on hover using perspective and rotateX/Y — no JS tracking required.
                </p>
              </div>
              <div className="mt-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#39FF14]/10 text-[#39FF14]">
                ↗
              </div>
            </div>
          </Reveal>

          {/* Glowing CTA */}
          <Reveal delay={320} className="sc-glass flex flex-col items-center justify-center gap-4 rounded-2xl p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Call to action</p>
            <button
              type="button"
              className="sc-glow sc-glow-pulse inline-flex h-12 items-center justify-center rounded bg-[#39FF14] px-6 text-sm font-bold text-[#05060A]"
            >
              Ship it
            </button>
            <p className="max-w-[12rem] text-center text-xs text-white/50">Pulsing box-shadow draws the eye without flashing.</p>
          </Reveal>

          {/* Animated counter */}
          <Reveal delay={360} className="sc-glass flex items-center justify-center rounded-2xl p-6">
            <ScrollCounter target={187} label="hours automated" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
