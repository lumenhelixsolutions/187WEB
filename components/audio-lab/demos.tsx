"use client";

import { useEffect, useRef, useState } from "react";
import { DemoCard, useCanvas2D, useInView, useReducedMotion } from "@/components/demo-lab/kit";

const ACCENT = "#f87171";

// A calm C-major-add9 pad (Hz) — consonant, no harsh beating.
const CHORD = [130.81, 261.63, 329.63, 392.0, 587.33];

type Pad = {
  ctx: AudioContext;
  master: GainNode;
  stop: () => void;
};

/**
 * Builds a soft sine-chord pad: each note is a sine through its own slow
 * tremolo LFO, summed into a low-pass filter + master gain. Pleasant rather
 * than the raw oscillator buzz. Returns the master gain (tap it for an
 * analyser) and a stop() that tears the whole graph down.
 */
function createPad(volume: number): Pad {
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new AC();
  const master = ctx.createGain();
  master.gain.value = 0;
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 1600;
  filter.Q.value = 0.6;
  master.connect(filter).connect(ctx.destination);

  const nodes: Array<OscillatorNode> = [];
  CHORD.forEach((f, i) => {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = f;
    osc.detune.value = (i - 2) * 2; // gentle spread
    const g = ctx.createGain();
    g.gain.value = 0.2;
    // slow tremolo so it breathes
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.12 + i * 0.05;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.12;
    lfo.connect(lfoGain).connect(g.gain);
    osc.connect(g).connect(master);
    osc.start();
    lfo.start();
    nodes.push(osc, lfo);
  });

  // soft fade-in
  master.gain.setValueAtTime(0.0001, ctx.currentTime);
  master.gain.exponentialRampToValueAtTime(Math.max(0.0002, volume * 0.5), ctx.currentTime + 0.6);

  return {
    ctx,
    master,
    stop: () => {
      try {
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
        nodes.forEach((n) => n.stop(ctx.currentTime + 0.3));
      } catch {
        /* already stopped */
      }
      window.setTimeout(() => ctx.close().catch(() => {}), 400);
    },
  };
}

/** Custom audio-player UI backed by the soft WebAudio pad (no asset to ship). */
export function HowlerPlayer() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [vol, setVol] = useState(0.5);
  const padRef = useRef<Pad | null>(null);
  const rafRef = useRef(0);
  const startRef = useRef(0);
  const DURATION = 12;

  useEffect(() => () => stopPad(), []);
  const stopPad = () => {
    cancelAnimationFrame(rafRef.current);
    padRef.current?.stop();
    padRef.current = null;
  };

  const tick = () => {
    setProgress((((performance.now() - startRef.current) / 1000) / DURATION) % 1);
    rafRef.current = requestAnimationFrame(tick);
  };

  const toggle = () => {
    if (playing) {
      stopPad();
      setPlaying(false);
      return;
    }
    padRef.current = createPad(vol);
    startRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);
    setPlaying(true);
  };

  useEffect(() => {
    const pad = padRef.current;
    if (pad) pad.master.gain.setTargetAtTime(vol * 0.5, pad.ctx.currentTime, 0.05);
  }, [vol]);

  return (
    <DemoCard name="Custom Audio Player" command="/187howler" how="A Howler-style player — play/scrub/volume UI wired to a soft WebAudio chord pad, so it needs no audio file." mode="click" accent={ACCENT}>
      <div className="flex w-full max-w-[15rem] flex-col gap-3">
        <div className="flex items-center gap-3">
          <button type="button" onClick={toggle} aria-label={playing ? "Pause" : "Play"} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f87171] text-black outline-none transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-[#f87171]/50">
            {playing ? (
              <span className="flex gap-1">
                <span className="h-3.5 w-1 rounded-sm bg-black" />
                <span className="h-3.5 w-1 rounded-sm bg-black" />
              </span>
            ) : (
              <span className="ml-0.5 h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-black" />
            )}
          </button>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-[#f87171]" style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
        <label className="flex items-center gap-2 text-[11px] text-white/50">
          Vol
          <input type="range" min={0} max={1} step={0.01} value={vol} onChange={(e) => setVol(Number(e.target.value))} aria-label="Volume" className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-white/15 accent-[#f87171]" />
        </label>
      </div>
    </DemoCard>
  );
}

// ───────────────────────── bonus "cool-factor" tricks ─────────────────────
const PENTA = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25];

function newCtx() {
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  return new AC();
}

/** A plucked note: sine (+ octave shimmer) with a fast decay envelope. */
function pluck(ctx: AudioContext, dest: AudioNode, freq: number, when = 0) {
  const t = ctx.currentTime + when;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.5, t + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
  g.connect(dest);
  [1, 2].forEach((mult, i) => {
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = freq * mult;
    const og = ctx.createGain();
    og.gain.value = i === 0 ? 0.7 : 0.18;
    o.connect(og).connect(g);
    o.start(t);
    o.stop(t + 0.7);
  });
}

/** Theremin — hold and glide: X sets pitch, Y sets volume, with vibrato. */
export function Theremin() {
  const ref = useRef<HTMLDivElement>(null);
  const audio = useRef<{ ctx: AudioContext; osc: OscillatorNode; gain: GainNode } | null>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);

  const stop = () => {
    const a = audio.current;
    if (a) {
      a.gain.gain.setTargetAtTime(0.0001, a.ctx.currentTime, 0.05);
      const ctx = a.ctx;
      const osc = a.osc;
      window.setTimeout(() => {
        try {
          osc.stop();
        } catch {
          /* noop */
        }
        ctx.close().catch(() => {});
      }, 200);
      audio.current = null;
    }
    setActive(false);
  };
  useEffect(() => () => stop(), []);

  const set = (e: React.PointerEvent) => {
    const el = ref.current;
    const a = audio.current;
    if (!el || !a) return;
    const r = el.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    const y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    a.osc.frequency.setTargetAtTime(180 + x * 620, a.ctx.currentTime, 0.03);
    a.gain.gain.setTargetAtTime((1 - y) * 0.12, a.ctx.currentTime, 0.03);
    el.style.setProperty("--tx", `${x * 100}%`);
    el.style.setProperty("--ty", `${y * 100}%`);
  };
  const down = (e: React.PointerEvent) => {
    if (reduced) return;
    const ctx = newCtx();
    const osc = ctx.createOscillator();
    osc.type = "sine";
    const gain = ctx.createGain();
    gain.gain.value = 0.0001;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 2200;
    // vibrato
    const vib = ctx.createOscillator();
    const vibG = ctx.createGain();
    vib.frequency.value = 5.5;
    vibG.gain.value = 4;
    vib.connect(vibG).connect(osc.frequency);
    osc.connect(gain).connect(lp).connect(ctx.destination);
    osc.start();
    vib.start();
    audio.current = { ctx, osc, gain };
    setActive(true);
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    set(e);
  };
  return (
    <DemoCard name="Theremin" how="Press and glide — X bends the pitch, Y the volume, with a 5.5Hz vibrato and a low-pass for warmth." mode="drag" accent={ACCENT}>
      <div
        ref={ref}
        onPointerDown={down}
        onPointerMove={(e) => active && set(e)}
        onPointerUp={stop}
        onPointerLeave={stop}
        className="relative h-32 w-full cursor-crosshair touch-none overflow-hidden rounded-lg border border-white/10"
        style={{ background: "radial-gradient(circle at var(--tx,50%) var(--ty,50%), rgba(248,113,113,0.35), #0a0c14 60%)" }}
      >
        <span className="pointer-events-none absolute inset-0 grid place-items-center text-xs uppercase tracking-widest text-white/40">
          {active ? "playing" : "press & glide"}
        </span>
      </div>
    </DemoCard>
  );
}

/** Pluck pads — a pentatonic pad grid; tap to play soft plucked notes. */
export function PluckPads() {
  const ctxRef = useRef<AudioContext | null>(null);
  const reduced = useReducedMotion();
  const play = (freq: number, el: HTMLButtonElement) => {
    if (reduced) return;
    if (!ctxRef.current) ctxRef.current = newCtx();
    const ctx = ctxRef.current;
    if (ctx.state === "suspended") ctx.resume();
    pluck(ctx, ctx.destination, freq);
    el.animate([{ transform: "scale(1)", opacity: 1 }, { transform: "scale(0.88)", opacity: 0.6 }, { transform: "scale(1)", opacity: 1 }], { duration: 260, easing: "ease-out" });
  };
  useEffect(
    () => () => {
      ctxRef.current?.close().catch(() => {});
    },
    [],
  );
  return (
    <DemoCard name="Pentatonic Pluck Pads" how="Tap any pad for a soft two-oscillator pluck with a fast decay envelope — pentatonic, so it never clashes." mode="click" accent={ACCENT}>
      <div className="grid grid-cols-4 gap-2">
        {PENTA.map((f, i) => (
          <button
            key={f}
            type="button"
            onPointerDown={(e) => play(f, e.currentTarget)}
            aria-label={`Play note ${i + 1}`}
            className="h-10 w-10 rounded-lg border border-[#f87171]/40 outline-none transition hover:bg-[#f87171]/20 focus-visible:ring-2 focus-visible:ring-[#f87171]/50"
            style={{ background: `color-mix(in srgb, #f87171 ${8 + i * 4}%, #0a0c14)` }}
          />
        ))}
      </div>
    </DemoCard>
  );
}

/** Spectrum bloom — a shimmering arpeggio through an analyser → colour bars. */
export function SpectrumBloom() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const [on, setOn] = useState(false);
  const audioRef = useRef<{ ctx: AudioContext; analyser: AnalyserNode; data: Uint8Array; timer: number } | null>(null);

  const canvasRef = useCanvas2D((ctx, t, w, h) => {
    ctx.clearRect(0, 0, w, h);
    const a = audioRef.current;
    const bins = 28;
    for (let i = 0; i < bins; i++) {
      let v: number;
      if (a) {
        a.analyser.getByteFrequencyData(a.data as Uint8Array<ArrayBuffer>);
        v = (a.data[i] ?? 0) / 255;
      } else {
        v = 0.15 + 0.15 * (0.5 + 0.5 * Math.sin(t * 3 + i * 0.6));
      }
      const bh = Math.max(2, v * h);
      const x = (i / bins) * w;
      const bw = w / bins - 2;
      const hue = 350 + (i / bins) * 60; // coral → magenta bloom
      ctx.fillStyle = `hsl(${hue} 90% ${50 + v * 25}%)`;
      ctx.shadowColor = `hsl(${hue} 90% 60%)`;
      ctx.shadowBlur = v * 16;
      ctx.fillRect(x, h - bh, bw, bh);
    }
    ctx.shadowBlur = 0;
  }, inView && !reduced);

  const stop = () => {
    const a = audioRef.current;
    if (a) {
      window.clearInterval(a.timer);
      a.ctx.close().catch(() => {});
      audioRef.current = null;
    }
  };
  useEffect(() => () => stop(), []);

  const toggle = () => {
    if (on) {
      stop();
      setOn(false);
      return;
    }
    const ctx = newCtx();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 128;
    const master = ctx.createGain();
    master.gain.value = 0.5;
    master.connect(analyser);
    analyser.connect(ctx.destination);
    let step = 0;
    const seq = [0, 2, 4, 6, 4, 2, 5, 3];
    const timer = window.setInterval(() => {
      pluck(ctx, master, PENTA[seq[step % seq.length]] * (step % 16 >= 8 ? 2 : 1));
      step++;
    }, 220);
    audioRef.current = { ctx, analyser, data: new Uint8Array(analyser.frequencyBinCount), timer };
    setOn(true);
  };

  return (
    <DemoCard name="Spectrum Bloom Arp" how="A pentatonic arpeggio of plucks runs through a real AnalyserNode; each note blooms a glowing frequency bar." mode="click" accent={ACCENT}>
      <div ref={ref} className="relative h-full w-full">
        <canvas ref={canvasRef} className="h-32 w-full" />
        <button type="button" onClick={toggle} className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-[#f87171] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-black outline-none transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-[#f87171]/50">
          {on ? "Stop" : "Start"}
        </button>
      </div>
    </DemoCard>
  );
}

/** Real WebAudio AnalyserNode → smooth glowing waveform (oscilloscope). */
export function ColorwaveAudio() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const [on, setOn] = useState(false);
  const audioRef = useRef<{ pad: Pad; analyser: AnalyserNode; data: Uint8Array } | null>(null);

  const canvasRef = useCanvas2D((ctx, t, w, h) => {
    ctx.clearRect(0, 0, w, h);
    const a = audioRef.current;
    const N = 96;
    const pts: number[] = [];
    if (a) {
      a.analyser.getByteTimeDomainData(a.data as Uint8Array<ArrayBuffer>);
      const step = Math.floor(a.data.length / N);
      for (let i = 0; i < N; i++) pts.push((a.data[i * step] - 128) / 128);
    } else {
      for (let i = 0; i < N; i++) pts.push(Math.sin(t * 2 + i * 0.28) * 0.35 * (0.6 + 0.4 * Math.sin(t + i * 0.1)));
    }
    const grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, "#fca5a5");
    grad.addColorStop(0.5, "#f87171");
    grad.addColorStop(1, "#fb7185");
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = grad;
    ctx.shadowColor = "#f87171";
    ctx.shadowBlur = 12;
    ctx.beginPath();
    pts.forEach((v, i) => {
      const x = (i / (N - 1)) * w;
      const y = h / 2 + v * (h * 0.4);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.shadowBlur = 0;
  }, inView && !reduced);

  const stop = () => {
    audioRef.current?.pad.stop();
    audioRef.current = null;
  };
  useEffect(() => () => stop(), []);

  const toggle = () => {
    if (on) {
      stop();
      setOn(false);
      return;
    }
    const pad = createPad(0.7);
    const analyser = pad.ctx.createAnalyser();
    analyser.fftSize = 1024;
    pad.master.connect(analyser);
    audioRef.current = { pad, analyser, data: new Uint8Array(analyser.fftSize) };
    setOn(true);
  };

  return (
    <DemoCard name="Audio-Reactive Visualizer" command="/187colorwaveaudio" how="A real WebAudio AnalyserNode feeds a live waveform to the glowing curve; press Start to sound a soft chord pad." mode="click" accent={ACCENT}>
      <div ref={ref} className="relative h-full w-full">
        <canvas ref={canvasRef} className="h-32 w-full" />
        <button type="button" onClick={toggle} className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-[#f87171] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-black outline-none transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-[#f87171]/50">
          {on ? "Stop" : "Start"}
        </button>
      </div>
    </DemoCard>
  );
}
