"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/motion/gsap";
import { TypeDemoCard, useInView, useReducedMotion } from "./harness";

/** Replays a GSAP timeline each time the card scrolls into view. */
function useReplay(build: (root: HTMLElement) => gsap.core.Timeline | undefined, inView: boolean, reduced: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    registerGsap();
    if (reduced) {
      gsap.set(root.querySelectorAll("[data-anim]"), { clearProps: "all", opacity: 1 });
      return;
    }
    if (!inView) return;
    const tl = build(root);
    return () => {
      tl?.kill();
    };
  }, [inView, reduced, build]);
  return ref;
}

export function GradWave() {
  const { ref: viewRef, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const word = "CHROMATIC";
  return (
    <TypeDemoCard name="Staggered Chromatic Wave" command="/187gradwave" mode="auto" how="Per-character conic-gradient text; each letter's gradient position phase-shifts on a sine wave.">
      <div ref={viewRef} className="flex text-3xl font-black tracking-tight sm:text-4xl">
        {word.split("").map((c, i) => (
          <span
            key={i}
            className="tp-gradwave inline-block"
            style={{
              backgroundImage: "linear-gradient(90deg,#f472b6,#a855f7,#22d3ee,#f472b6)",
              backgroundSize: "300% 100%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              animationDelay: `${i * 0.09}s`,
              animationPlayState: inView && !reduced ? "running" : "paused",
            }}
          >
            {c}
          </span>
        ))}
      </div>
    </TypeDemoCard>
  );
}

export function Welcome() {
  const { ref: viewRef, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const ref = useReplay(
    (root) => {
      const t = gsap.timeline({ repeat: -1, repeatDelay: 1.4 });
      t.from(root.querySelectorAll("[data-anim]"), { yPercent: 120, opacity: 0, duration: 0.5, stagger: 0.04, ease: "power3.out" })
        .to(root.querySelectorAll("[data-anim]"), { opacity: 0, duration: 0.4, delay: 1 });
      return t;
    },
    inView,
    reduced,
  );
  return (
    <TypeDemoCard name="Typing-Intro Sequence" command="/187welcomewords" mode="auto" how="Characters stagger up from the baseline, hold, then clear — the classic splash-loader intro.">
      <div ref={viewRef} className="w-full">
        <div ref={ref} className="flex justify-center overflow-hidden text-2xl font-bold text-white sm:text-3xl">
          {"WELCOME".split("").map((c, i) => (
            <span key={i} data-anim className="inline-block">
              {c}
            </span>
          ))}
        </div>
      </div>
    </TypeDemoCard>
  );
}

export function MaskReveal() {
  const { ref: viewRef, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const lines = ["Design as", "precise,", "measured craft"];
  const ref = useReplay(
    (root) => {
      const t = gsap.timeline({ repeat: -1, repeatDelay: 1.6 });
      t.fromTo(
        root.querySelectorAll("[data-anim]"),
        { clipPath: "inset(0 100% 0 0)", opacity: 0.2 },
        { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.7, stagger: 0.18, ease: "power3.out" },
      ).to(root.querySelectorAll("[data-anim]"), { clipPath: "inset(0 0 0 100%)", opacity: 0.2, duration: 0.5, stagger: 0.1, delay: 1 });
      return t;
    },
    inView,
    reduced,
  );
  return (
    <TypeDemoCard name="Clip-Path Line Reveal" command="/187maskreveal" mode="auto" how="SplitText lines wiped in with an animated clip-path inset, staggered top to bottom.">
      <div ref={viewRef} className="w-full">
        <div ref={ref} className="flex flex-col text-left text-xl font-bold leading-tight text-white">
          {lines.map((l) => (
            <span key={l} data-anim className="inline-block">
              {l}
            </span>
          ))}
        </div>
      </div>
    </TypeDemoCard>
  );
}

export function TitleWipe() {
  const { ref: viewRef, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const ref = useReplay(
    (root) => {
      const t = gsap.timeline({ repeat: -1, repeatDelay: 1.4 });
      t.fromTo(root.querySelector("[data-anim]"), { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.8, ease: "power4.out" })
        .to(root.querySelector("[data-anim]"), { clipPath: "inset(0 0 0 100%)", duration: 0.6, ease: "power4.in", delay: 1.1 });
      return t;
    },
    inView,
    reduced,
  );
  return (
    <TypeDemoCard name="Typographic Wipe Title" command="/187titlewipe" mode="auto" how="A single headline revealed by tweening a clip-path inset from one edge — power4 easing.">
      <div ref={viewRef} className="w-full">
        <div ref={ref} className="text-center">
          <span data-anim className="inline-block bg-gradient-to-r from-[#f472b6] to-[#a855f7] bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl">
            HEADLINE
          </span>
        </div>
      </div>
    </TypeDemoCard>
  );
}

export function Highlighter() {
  const { ref: viewRef, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const ref = useReplay(
    (root) => {
      const t = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });
      t.fromTo(root.querySelectorAll("[data-anim]"), { backgroundSize: "0% 100%" }, { backgroundSize: "100% 100%", duration: 0.6, stagger: 0.25, ease: "power2.inOut" })
        .to(root.querySelectorAll("[data-anim]"), { backgroundSize: "0% 100%", duration: 0.4, delay: 1 });
      return t;
    },
    inView,
    reduced,
  );
  return (
    <TypeDemoCard name="Marker-Pen Reveal" command="/187highlighter" mode="auto" how="A marker highlight sweeps across each line by animating background-size on a no-repeat gradient.">
      <div ref={viewRef} className="w-full">
        <div ref={ref} className="flex flex-col items-start gap-1 text-lg font-bold text-white">
          {["Key insight one", "Key insight two"].map((l) => (
            <span
              key={l}
              data-anim
              className="inline bg-no-repeat px-1 leading-relaxed"
              style={{ backgroundImage: "linear-gradient(transparent 55%, rgba(244,114,182,0.45) 55%)", backgroundSize: "0% 100%" }}
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </TypeDemoCard>
  );
}

export function ScrollHighlight() {
  const { ref: viewRef, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const words = "words light up one by one as they enter".split(" ");
  const ref = useReplay(
    (root) => {
      const t = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });
      t.fromTo(root.querySelectorAll("[data-anim]"), { color: "rgba(255,255,255,0.25)" }, { color: "#f9a8d4", duration: 0.3, stagger: 0.09, ease: "none" })
        .to(root.querySelectorAll("[data-anim]"), { color: "rgba(255,255,255,0.25)", duration: 0.5, delay: 0.9 });
      return t;
    },
    inView,
    reduced,
  );
  return (
    <TypeDemoCard name="Word Highlighter" command="/187scrollhighlight" mode="auto" how="SplitText words toggle an active colour in sequence, driven by scroll progress on the real page.">
      <div ref={viewRef} className="w-full">
        <div ref={ref} className="flex flex-wrap gap-x-1.5 gap-y-0.5 text-center text-lg font-semibold">
          {words.map((w, i) => (
            <span key={i} data-anim style={{ color: "rgba(255,255,255,0.25)" }}>
              {w}
            </span>
          ))}
        </div>
      </div>
    </TypeDemoCard>
  );
}
