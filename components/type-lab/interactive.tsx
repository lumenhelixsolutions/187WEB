"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, registerGsap, registerAdvancedGsapPlugins } from "@/lib/motion/gsap";
import { TypeDemoCard, useReducedMotion } from "./harness";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&/\\<>*0123456789";

/** Real GSAP ScrambleText decode on hover/tap. */
export function Scramble() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const run = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    registerGsap();
    registerAdvancedGsapPlugins();
    if (reduced) {
      el.textContent = "SCRAMBLE";
      return;
    }
    gsap.to(el, { duration: 1, scrambleText: { text: "SCRAMBLE", chars: GLYPHS, speed: 0.5 }, ease: "none" });
  }, [reduced]);
  useEffect(() => {
    if (ref.current) ref.current.textContent = "SCRAMBLE";
  }, []);
  return (
    <TypeDemoCard name="Entropy Scrambler" command="/187scrrambletxt" mode="hover" how="GSAP ScrambleTextPlugin cycles random glyphs, then decodes to the target string.">
      <button type="button" onMouseEnter={run} onFocus={run} onClick={run} className="rounded px-2 font-mono text-3xl font-bold tracking-tight text-[#f472b6] outline-none focus-visible:ring-2 focus-visible:ring-[#f472b6]/50">
        <span ref={ref}>SCRAMBLE</span>
      </button>
    </TypeDemoCard>
  );
}

const SCRAMBLE_TARGETS = ["DECODE", "REVEAL", "RESOLVE"];

export function ScrambleTri() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const idx = useRef(0);
  const run = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    registerGsap();
    registerAdvancedGsapPlugins();
    const next = SCRAMBLE_TARGETS[idx.current % SCRAMBLE_TARGETS.length];
    idx.current += 1;
    if (reduced) {
      el.textContent = next;
      return;
    }
    gsap.to(el, { duration: 0.9, scrambleText: { text: next, chars: "upperCase", speed: 0.6 }, ease: "none" });
  }, [reduced]);
  useEffect(() => {
    if (ref.current) ref.current.textContent = "DECODE";
  }, []);
  return (
    <TypeDemoCard name="Unified Scramble Engine" command="/187scrambletri" mode="click" how="One scramble engine triggered by load, scroll, or click — here it cycles through target words.">
      <button type="button" onClick={run} className="rounded px-2 font-mono text-2xl font-bold tracking-widest text-white outline-none focus-visible:ring-2 focus-visible:ring-[#f472b6]/50 sm:text-3xl">
        <span ref={ref}>DECODE</span>
      </button>
    </TypeDemoCard>
  );
}

/** Real GSAP Physics2D: letters fall with gravity + bounce on click. */
export function GravityText() {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const drop = useCallback(() => {
    const root = rootRef.current;
    if (!root || reduced) return;
    registerGsap();
    registerAdvancedGsapPlugins();
    const letters = root.querySelectorAll<HTMLElement>("[data-l]");
    gsap.killTweensOf(letters);
    gsap.set(letters, { y: 0, x: 0, rotation: 0, opacity: 1 });
    letters.forEach((l) => {
      gsap.to(l, {
        duration: 1.6 + Math.random() * 0.6,
        physics2D: { velocity: -(120 + Math.random() * 140), angle: -90 + (Math.random() * 60 - 30), gravity: 520 },
        rotation: Math.random() * 220 - 110,
        opacity: 0,
        ease: "none",
        onComplete: () => gsap.set(l, { clearProps: "all" }),
      });
    });
  }, [reduced]);
  return (
    <TypeDemoCard name="Physics-Based Falling Text" command="/187gravitytxt" mode="click" how="GSAP Physics2DPlugin gives each character velocity, angle, and gravity — real ballistic motion.">
      <button type="button" onClick={drop} className="outline-none focus-visible:ring-2 focus-visible:ring-[#f472b6]/50" aria-label="Drop the letters">
        <div ref={rootRef} className="flex text-4xl font-black tracking-tight text-white">
          {"GRAVITY".split("").map((c, i) => (
            <span key={i} data-l className="inline-block will-change-transform">
              {c}
            </span>
          ))}
        </div>
      </button>
    </TypeDemoCard>
  );
}

/** Real GSAP DrawSVG: a squiggle underline draws itself on hover. */
export function SquiggleUnderline() {
  const reduced = useReducedMotion();
  const pathRef = useRef<SVGPathElement>(null);
  const draw = useCallback(() => {
    const path = pathRef.current;
    if (!path) return;
    registerGsap();
    registerAdvancedGsapPlugins();
    if (reduced) {
      gsap.set(path, { drawSVG: "0% 100%" });
      return;
    }
    gsap.fromTo(path, { drawSVG: "0% 0%" }, { drawSVG: "0% 100%", duration: 0.55, ease: "power2.out" });
  }, [reduced]);
  return (
    <TypeDemoCard name="Squiggly Underline Draw" command="/187randunderline" mode="hover" how="GSAP DrawSVGPlugin animates a hand-drawn SVG path from 0→100% under the word.">
      <span onMouseEnter={draw} onFocus={draw} tabIndex={0} className="relative inline-block px-1 text-3xl font-bold text-white outline-none focus-visible:ring-2 focus-visible:ring-[#f472b6]/50">
        underline
        <svg viewBox="0 0 160 16" className="absolute -bottom-1 left-0 w-full" fill="none" preserveAspectRatio="none">
          <path ref={pathRef} d="M4 9 C 28 2, 44 14, 66 8 S 108 2, 130 9 S 150 12, 156 7" stroke="#f472b6" strokeWidth={3} strokeLinecap="round" />
        </svg>
      </span>
    </TypeDemoCard>
  );
}

export function ScaleUnderline() {
  return (
    <TypeDemoCard name="Draw-In Underline" command="/187underline" mode="hover" how="A pseudo-element underline scales in from the left on hover — the cleanest link tell there is.">
      <a href="#" onClick={(e) => e.preventDefault()} className="tp-underline relative inline-block text-2xl font-semibold text-white sm:text-3xl">
        hover me
      </a>
    </TypeDemoCard>
  );
}

export function VarFont() {
  const reduced = useReducedMotion();
  const [on, setOn] = useState(false);
  return (
    <TypeDemoCard name="Variable Weight" command="/187varfont" mode="hover" how="Tweens font-variation-settings 'wght' on a variable font — thin to black in one smooth pull.">
      <span
        onMouseEnter={() => setOn(true)}
        onMouseLeave={() => setOn(false)}
        onFocus={() => setOn(true)}
        onBlur={() => setOn(false)}
        tabIndex={0}
        className="cursor-default text-4xl tracking-tight text-white outline-none transition-all focus-visible:ring-2 focus-visible:ring-[#f472b6]/50"
        style={{
          fontVariationSettings: `'wght' ${on && !reduced ? 800 : 200}`,
          fontWeight: on && !reduced ? 800 : 200,
          transition: reduced ? "none" : "font-variation-settings 0.5s cubic-bezier(0.16,1,0.3,1), font-weight 0.5s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        weight
      </span>
    </TypeDemoCard>
  );
}

export function CharStagger() {
  return (
    <TypeDemoCard name="Character-Stagger Button" command="/187charstagger" mode="hover" how="Each letter is a span with an incrementing CSS animation-delay — a cheap, GPU-only stagger.">
      <button type="button" className="tp-charstagger group/btn rounded-full border border-[#f472b6]/40 px-6 py-2.5 text-lg font-bold text-[#f472b6] transition hover:bg-[#f472b6]/10">
        {"EXPLORE".split("").map((c, i) => (
          <span key={i} className="inline-block" style={{ transitionDelay: `${i * 35}ms` }}>
            {c}
          </span>
        ))}
      </button>
    </TypeDemoCard>
  );
}

export function TextCursor() {
  const [label, setLabel] = useState("read");
  const dotRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const area = areaRef.current;
    const dot = dotRef.current;
    if (!area || !dot) return;
    const r = area.getBoundingClientRect();
    dot.style.transform = `translate(${e.clientX - r.left}px, ${e.clientY - r.top}px)`;
  };
  return (
    <TypeDemoCard name="Context-Aware Cursor" command="/187textcursor" mode="hover" how="The follow-cursor's label swaps to each hovered element's data-cursor value with a quickTo lag.">
      <div ref={areaRef} onPointerMove={onMove} className="relative flex w-full cursor-none flex-wrap justify-center gap-4 py-4">
        {[
          ["Article", "read"],
          ["Gallery", "view"],
          ["Demo", "play"],
        ].map(([w, c]) => (
          <span key={w} onPointerEnter={() => setLabel(c)} className="text-lg font-semibold text-white/80 transition hover:text-white">
            {w}
          </span>
        ))}
        <div ref={dotRef} className="pointer-events-none absolute left-0 top-0 -ml-4 -mt-4 flex h-8 min-w-8 items-center justify-center rounded-full bg-[#f472b6] px-2 text-[10px] font-bold uppercase text-black transition-transform duration-200 ease-out">
          {label}
        </div>
      </div>
    </TypeDemoCard>
  );
}

export function CursorMarquee() {
  const areaRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const onMove = (e: React.PointerEvent) => {
    const area = areaRef.current;
    const tag = tagRef.current;
    if (!area || !tag) return;
    const r = area.getBoundingClientRect();
    tag.style.transform = `translate(${e.clientX - r.left}px, ${e.clientY - r.top}px)`;
  };
  return (
    <TypeDemoCard name="Marquee-Text Cursor" command="/187cursormarq" mode="hover" how="A custom cursor pill holds a looping text marquee that follows the pointer inside the field.">
      <div
        ref={areaRef}
        onPointerMove={onMove}
        onPointerEnter={() => setShow(true)}
        onPointerLeave={() => setShow(false)}
        className="relative flex h-full w-full cursor-none items-center justify-center"
      >
        <span className="text-lg font-semibold text-white/70">move across me</span>
        <div ref={tagRef} className="pointer-events-none absolute left-0 top-0 -ml-10 -mt-4 h-8 w-20 overflow-hidden rounded-full bg-[#f472b6] transition-opacity" style={{ opacity: show ? 1 : 0 }}>
          <div className="tp-cursormarq flex w-max items-center gap-3 whitespace-nowrap py-1.5 text-[10px] font-bold uppercase text-black">
            <span>view · view · view · view ·</span>
            <span aria-hidden>view · view · view · view ·</span>
          </div>
        </div>
      </div>
    </TypeDemoCard>
  );
}

export function FitText() {
  const [w, setW] = useState(70);
  // font-size scales with the container width (the "binary-search fit" outcome).
  const size = 0.6 + (w / 100) * 2.6;
  return (
    <TypeDemoCard name="Binary-Search Fit" command="/187fittext" mode="drag" how="Font-size binary-searches to exactly fill its container width; drag the slider to resize the box.">
      <div className="flex w-full flex-col items-center gap-3">
        <div className="flex items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-black/30" style={{ width: `${w}%`, height: "3.5rem" }}>
          <span className="whitespace-nowrap font-black leading-none text-white" style={{ fontSize: `${size}rem` }}>
            FIT
          </span>
        </div>
        <input
          type="range"
          min={35}
          max={100}
          value={w}
          onChange={(e) => setW(Number(e.target.value))}
          aria-label="Container width"
          className="h-1 w-3/4 cursor-pointer appearance-none rounded-full bg-white/15 accent-[#f472b6]"
        />
      </div>
    </TypeDemoCard>
  );
}

export function FullNav() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    registerGsap();
    const links = root.querySelectorAll("[data-l]");
    if (!open) return;
    if (reduced) {
      gsap.set(links, { opacity: 1, y: 0 });
      return;
    }
    const tw = gsap.fromTo(links, { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" });
    return () => {
      tw.kill();
    };
  }, [open, reduced]);
  return (
    <TypeDemoCard name="Oversized Type Nav" command="/187fullnav" mode="click" how="A full-screen overlay menu whose oversized links scale and stagger in behind a blurred backdrop.">
      <div className="relative flex h-full w-full items-center justify-center">
        <button type="button" onClick={() => setOpen((v) => !v)} className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-[#f472b6]/50">
          {open ? "Close" : "Menu"}
        </button>
        {open && (
          <div ref={rootRef} className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-1 rounded-xl bg-black/70 backdrop-blur-sm">
            {["Work", "About", "Contact"].map((l) => (
              <span key={l} data-l className="text-2xl font-black tracking-tight text-white">
                {l}
              </span>
            ))}
          </div>
        )}
      </div>
    </TypeDemoCard>
  );
}
