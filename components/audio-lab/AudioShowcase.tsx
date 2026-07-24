"use client";

import { Reveal } from "@/components/Reveal";
import { HowlerPlayer, ColorwaveAudio, Theremin, PluckPads, SpectrumBloom } from "./demos";

const DEMOS = [ColorwaveAudio, SpectrumBloom, Theremin, PluckPads, HowlerPlayer];

export function AudioShowcase() {
  return (
    <section id="audio-lab" className="relative border-t border-white/10 bg-[#050608] px-6 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#f87171]">
            <span className="h-px w-6 bg-[#f87171]" aria-hidden />
            Audio lab
          </p>
          <h2 className="mt-4 text-[clamp(1.9rem,1.2rem+2.6vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-white">
            {DEMOS.length} live audio systems
          </h2>
          <p className="mt-4 leading-relaxed text-white/60">
            The two 187AUDIO patterns wired to the real Web Audio API — plus a few extra tricks for the cool factor: a
            playable theremin, pentatonic pluck pads, and a spectrum-bloom arpeggiator. Everything is a soft sine chord
            or pluck (no harsh tones), needs no audio file, and tears its audio graph down on stop. Press Start / Play,
            or tap the pads.
          </p>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DEMOS.map((Demo, i) => (
            <Reveal key={i} delay={i * 60}>
              <Demo />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
