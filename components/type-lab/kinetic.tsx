"use client";

import { useEffect, useState } from "react";
import { TypeDemoCard, useInView, useReducedMotion } from "./harness";

export function CircularText() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const text = "187TYPE · KINETIC · REACTIVE · ";
  const running = inView && !reduced;
  return (
    <TypeDemoCard name="Circular Text Rotator" command="/187radialtxt" mode="auto" how="Each glyph is rotated around a shared centre; the whole ring spins continuously, pausing on hover.">
      <div ref={ref} className="sc-spin-slow group/ring relative h-32 w-32 [animation-duration:14s]" style={{ animationPlayState: running ? "running" : "paused" }}>
        {text.split("").map((c, i) => (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 text-[11px] font-bold uppercase tracking-widest text-[#f9a8d4]"
            style={{ transform: `rotate(${(360 / text.length) * i}deg) translateY(-3.75rem)`, transformOrigin: "0 0" }}
          >
            {c}
          </span>
        ))}
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-black text-white">187</span>
      </div>
    </TypeDemoCard>
  );
}

export function BigTypo() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const running = inView && !reduced;
  return (
    <TypeDemoCard name="Infinite Type Ticker" command="/187bigtypo" mode="auto" how="Cloned oversized text driven by gsap.utils.wrap for a seamless, never-ending horizontal loop.">
      <div ref={ref} className="w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="tp-bigtype flex w-max whitespace-nowrap text-4xl font-black tracking-tight sm:text-5xl" style={{ animationPlayState: running ? "running" : "paused" }}>
          {[0, 1].map((d) => (
            <span key={d} aria-hidden={d === 1} className="bg-gradient-to-r from-[#f472b6] to-[#a855f7] bg-clip-text pr-6 text-transparent">
              KINETIC TYPOGRAPHY —&nbsp;
            </span>
          ))}
        </div>
      </div>
    </TypeDemoCard>
  );
}

export function RotateText() {
  const words = ["kinetic", "variable", "reactive", "3D"];
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>();
  useEffect(() => {
    if (reduced || !inView) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % words.length), 1800);
    return () => window.clearInterval(id);
  }, [reduced, inView, words.length]);
  return (
    <TypeDemoCard name="Rotating Word Carousel" command="/187rotatetext" mode="auto" how="A timeline loops a word list — fade the current out, slide the next up into place, repeat.">
      <div ref={ref} className="flex items-center gap-2 text-2xl font-bold text-white sm:text-3xl">
        <span>We build</span>
        <span className="relative inline-grid h-10 overflow-hidden">
          {words.map((w, wi) => (
            <span
              key={w}
              className="col-start-1 row-start-1 bg-gradient-to-r from-[#f472b6] to-[#a855f7] bg-clip-text text-transparent transition-all duration-500"
              style={{ transform: `translateY(${(wi - i) * 100}%)`, opacity: wi === i ? 1 : 0, transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
            >
              {w}
            </span>
          ))}
        </span>
      </div>
    </TypeDemoCard>
  );
}

export function LoopSelector() {
  const words = ["FASTER", "SHARPER", "SMOOTHER"];
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>();
  useEffect(() => {
    if (reduced || !inView) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % words.length), 1600);
    return () => window.clearInterval(id);
  }, [reduced, inView, words.length]);
  return (
    <TypeDemoCard name="Word Selector + Highlight" command="/187loopselector" mode="auto" how="A word list cycles with the active term wrapped in a sliding highlight box on a timeline.">
      <div ref={ref} className="flex flex-col items-center gap-2">
        {words.map((w, wi) => (
          <span
            key={w}
            className="relative rounded px-3 py-0.5 text-lg font-bold transition-colors duration-300"
            style={{ color: wi === i ? "#000" : "rgba(255,255,255,0.4)", backgroundColor: wi === i ? "#f472b6" : "transparent" }}
          >
            {w}
          </span>
        ))}
      </div>
    </TypeDemoCard>
  );
}

export function SkeletonText() {
  return (
    <TypeDemoCard name="Shimmer Skeleton" command="/187skeleton" mode="auto" how="A 45° linear-gradient sweep on a 200% background — the standard content-loading shimmer.">
      <div className="flex w-2/3 flex-col gap-2.5">
        <div className="tp-shimmer h-3 w-full rounded-full" />
        <div className="tp-shimmer h-3 w-5/6 rounded-full" />
        <div className="tp-shimmer h-3 w-2/3 rounded-full" />
      </div>
    </TypeDemoCard>
  );
}

export function ReadTime() {
  const [text, setText] = useState(
    "Kinetic type reacts to scroll, audio, or input without hurting readability. Edit this text and the estimate updates live.",
  );
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / 200));
  return (
    <TypeDemoCard name="Reading-Time Estimator" command="/187readtime" mode="drag" how="Counts words via a TreeWalker and divides by 200 wpm; a MutationObserver keeps it live as content changes.">
      <div className="flex w-full flex-col gap-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-[#f9a8d4]">{words} words</span>
          <span className="rounded-full bg-[#f472b6]/15 px-2 py-0.5 font-semibold text-[#f9a8d4]">{mins} min read</span>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="Editable text — reading time updates live"
          rows={3}
          className="w-full resize-none rounded-lg border border-white/10 bg-black/30 p-2.5 text-xs leading-relaxed text-white/80 outline-none focus:border-[#f472b6]/50"
        />
      </div>
    </TypeDemoCard>
  );
}
