"use client";

import { useEffect, useRef, useState } from "react";
import { brandAssets } from "@/lib/brand-assets";
import { gsap, registerGsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { useClientMounted } from "@/lib/motion/useClientMounted";

const BOOT_LINES = [
  "INIT 187WEB KERNEL",
  "MOUNT SKILL REGISTRY",
  "SYNC BASEPATH /187WEB",
  "LOAD THEME CONTRACT",
  "ARM GSAP CONTEXT",
  "READY",
];

/**
 * Technical boot sequence for route transitions (187GSAP).
 * Transform/opacity only; reduced-motion shows a static status plate.
 */
export function TechBootLoader({
  label = "Loading surface",
  compact = false,
}: {
  label?: string;
  compact?: boolean;
}) {
  const mounted = useClientMounted();
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(reduced ? 100 : 0);
  const [line, setLine] = useState(BOOT_LINES[0]);

  useEffect(() => {
    if (!mounted || reduced || !rootRef.current || !barRef.current) return;
    registerGsap();
    const root = rootRef.current;
    const bar = barRef.current;
    const marks = root.querySelectorAll("[data-boot-mark]");
    const ticks = root.querySelectorAll("[data-boot-tick]");
    const probe = { v: 0 };

    const ctx = gsap.context(() => {
      gsap.fromTo(
        root,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out" }
      );

      gsap.fromTo(
        marks,
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 0.35, stagger: 0.04, ease: "power2.out" }
      );

      gsap.to(probe, {
        v: 100,
        duration: 1.15,
        ease: "power2.inOut",
        onUpdate: () => {
          const n = Math.round(probe.v);
          setPct(n);
          setLine(BOOT_LINES[Math.min(BOOT_LINES.length - 1, Math.floor((n / 100) * BOOT_LINES.length))]);
          bar.style.transform = `scaleX(${probe.v / 100})`;
        },
      });

      gsap.fromTo(
        ticks,
        { opacity: 0.15 },
        {
          opacity: 1,
          duration: 0.18,
          stagger: { each: 0.05, repeat: 4, yoyo: true },
          ease: "none",
        }
      );
    }, root);

    return () => ctx.revert();
  }, [mounted, reduced]);

  return (
    <div
      ref={rootRef}
      className={`relative overflow-hidden border border-white/10 bg-[#050608] ${
        compact ? "rounded-2xl px-5 py-6" : "min-h-[50vh] rounded-none px-6 py-20"
      }`}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={label}
    >
      {/* Technical grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(57,255,20,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.35) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#39FF14]/70 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[#39FF14]/40 to-transparent" aria-hidden />

      <div className={`relative mx-auto ${compact ? "max-w-lg" : "max-w-2xl"}`}>
        <div className="mb-6 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
          <span data-boot-tick>SYS // 187WEB</span>
          <span data-boot-tick className="text-[#39FF14]">
            {String(pct).padStart(3, "0")}%
          </span>
          <span data-boot-tick>SEQ 0x{pct.toString(16).toUpperCase().padStart(2, "0")}</span>
        </div>

        <div className="mb-5 flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element -- basePath-safe static export */}
          <img
            src={brandAssets.mascotCore}
            alt=""
            width={64}
            height={64}
            className="h-12 w-12 object-contain opacity-80 sm:h-14 sm:w-14"
          />
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#39FF14]">{label}</p>
            <p className="mt-1 font-mono text-sm text-white/70">{line}</p>
          </div>
        </div>

        {/* Progress rail */}
        <div className="relative h-2 overflow-hidden rounded-full border border-white/10 bg-white/[0.04]">
          <div
            ref={barRef}
            className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-[#39FF14] via-[#22d3ee] to-[#a855f7]"
            style={{ transform: reduced ? "scaleX(1)" : "scaleX(0)" }}
          />
        </div>

        {/* Tick marks */}
        <div className="mt-2 flex justify-between" aria-hidden>
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              data-boot-mark
              className="block h-2 w-px origin-bottom bg-white/25"
              style={{ height: i % 3 === 0 ? 10 : 6 }}
            />
          ))}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2 font-mono text-[10px] uppercase tracking-wider text-white/35">
          <span data-boot-tick>LCP · HOLD</span>
          <span data-boot-tick className="text-center">
            HYDRATE
          </span>
          <span data-boot-tick className="text-right">
            ROUTE · ARM
          </span>
        </div>
      </div>
    </div>
  );
}
