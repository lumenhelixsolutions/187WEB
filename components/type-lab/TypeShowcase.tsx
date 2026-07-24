"use client";

import type { ComponentType } from "react";
import { Reveal } from "@/components/Reveal";
import { GradWave, Welcome, MaskReveal, TitleWipe, Highlighter, ScrollHighlight } from "./reveal";
import {
  Scramble,
  ScrambleTri,
  GravityText,
  SquiggleUnderline,
  ScaleUnderline,
  VarFont,
  CharStagger,
  TextCursor,
  CursorMarquee,
  FitText,
  FullNav,
} from "./interactive";
import { CircularText, BigTypo, RotateText, LoopSelector, SkeletonText, ReadTime } from "./kinetic";

type Group = { id: string; label: string; blurb: string; demos: ComponentType[] };

const GROUPS: Group[] = [
  {
    id: "interactive",
    label: "Interactive",
    blurb: "Hover, click, and drag them — real GSAP ScrambleText, Physics2D, and DrawSVG, not canned playback.",
    demos: [Scramble, GravityText, SquiggleUnderline, VarFont, FitText, TextCursor, CharStagger, ScaleUnderline, CursorMarquee, ScrambleTri, FullNav],
  },
  {
    id: "reveals",
    label: "Reveals & entrances",
    blurb: "Scroll- and timeline-driven entrances — clip wipes, marker sweeps, staggered word highlights.",
    demos: [GradWave, TitleWipe, MaskReveal, Highlighter, ScrollHighlight, Welcome],
  },
  {
    id: "kinetic",
    label: "Kinetic & looping",
    blurb: "Always-on motion systems — circular type, infinite tickers, rotating word carousels, live utilities.",
    demos: [RotateText, BigTypo, CircularText, LoopSelector, ReadTime, SkeletonText],
  },
];

const TOTAL = GROUPS.reduce((n, g) => n + g.demos.length, 0);

export function TypeShowcase() {
  return (
    <section id="type-lab" className="relative border-t border-white/10 bg-[#050608] px-6 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#f472b6]">
            <span className="h-px w-6 bg-[#f472b6]" aria-hidden />
            Type lab
          </p>
          <h2 className="mt-4 text-[clamp(1.9rem,1.2rem+2.6vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-white">
            {TOTAL} live type effects
          </h2>
          <p className="mt-4 leading-relaxed text-white/60">
            Every kinetic-typography pattern in the 187TYPE catalog, built as a real, interactive demo you can play with —
            each labelled with its <code className="text-[#f9a8d4]">/187…</code> command and the technique behind it. All
            honour <code className="text-[#f9a8d4]">prefers-reduced-motion</code>.
          </p>
        </Reveal>

        {GROUPS.map((group) => (
          <div key={group.id} className="mb-14 last:mb-0">
            <div className="mb-6 flex flex-col gap-1">
              <h3 className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.16em] text-white/80">
                {group.label}
                <span className="h-px flex-1 bg-white/10" />
                <span className="tabular-nums text-white/40">{group.demos.length}</span>
              </h3>
              <p className="max-w-2xl text-sm text-white/45">{group.blurb}</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {group.demos.map((Demo, i) => (
                <Reveal key={i} delay={(i % 3) * 60}>
                  <Demo />
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
