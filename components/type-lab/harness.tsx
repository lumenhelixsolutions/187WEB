"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Shared harness for the 187TYPE demo lab. Every demo is a REAL, interactive
 * type effect (GSAP SplitText/ScrambleText/DrawSVG/Physics2D where it earns
 * it, hand-tuned CSS/rAF otherwise) — not a thumbnail. The card supplies a
 * consistent stage, the pattern's real command + one-line mechanism, an
 * interaction-mode badge, and in-view gating so 20+ demos on one page only
 * animate while visible (perf + the resilience story). Reduced motion is
 * honoured per-demo via useReducedMotion.
 */

export type DemoMode = "hover" | "click" | "drag" | "auto" | "scroll";

const MODE_LABEL: Record<DemoMode, string> = {
  hover: "Hover",
  click: "Click",
  drag: "Drag",
  auto: "Live",
  scroll: "In view",
};

/** IntersectionObserver-backed visibility, so offscreen demos stay idle. */
export function useInView<T extends HTMLElement>(rootMargin = "120px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin, threshold: 0.15 },
    );
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

/** Split a string into per-character spans, preserving spaces. */
export function chars(text: string) {
  return text.split("").map((c) => (c === " " ? " " : c));
}

export function TypeDemoCard({
  name,
  command,
  how,
  mode,
  children,
  stageClassName = "",
}: {
  name: string;
  command: string;
  how: string;
  mode: DemoMode;
  children: ReactNode;
  stageClassName?: string;
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0A0C14] transition hover:border-[#f472b6]/30">
      <div
        className={`relative flex min-h-[11rem] items-center justify-center overflow-hidden border-b border-white/[0.06] p-6 ${stageClassName}`}
        style={{
          background:
            "radial-gradient(130% 100% at 50% 0%, rgba(244,114,182,0.06), transparent 60%), #06070c",
        }}
      >
        <span className="pointer-events-none absolute right-2.5 top-2.5 rounded-full border border-white/10 bg-black/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/45">
          {MODE_LABEL[mode]}
        </span>
        {children}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-[0.95rem] font-bold leading-tight text-white">{name}</h3>
          <code className="shrink-0 rounded bg-[#f472b6]/10 px-1.5 py-0.5 font-mono text-[11px] text-[#f9a8d4]">{command}</code>
        </div>
        <p className="text-[0.8rem] leading-relaxed text-white/50">{how}</p>
      </div>
    </article>
  );
}
