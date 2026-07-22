"use client";

import { useEffect, useRef } from "react";
import { brandAssets } from "@/lib/brand-assets";
import { gsap, registerGsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { useClientMounted } from "@/lib/motion/useClientMounted";

/**
 * Soft hologram mascot drifting in the animated background layer.
 * Transform/opacity only; does not capture pointer events.
 */
export function WebHiveHoloMascot() {
  const mounted = useClientMounted();
  const reduced = useReducedMotion();
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!mounted || reduced || !imgRef.current) return;
    registerGsap();
    const el = imgRef.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.92 },
        { opacity: 0.14, scale: 1, duration: 2.2, ease: "power2.out" }
      );
      gsap.to(el, {
        y: -18,
        duration: 7,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(el, {
        rotate: 2.5,
        duration: 11,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, [mounted, reduced]);

  if (!mounted) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- basePath-safe static export */}
      <img
        ref={imgRef}
        src={brandAssets.mascotHoloBg}
        alt=""
        width={900}
        height={900}
        decoding="async"
        className={`max-h-[min(88vh,52rem)] w-auto max-w-[min(92vw,46rem)] object-contain ${
          reduced ? "opacity-[0.1]" : "opacity-0"
        }`}
        style={{
          filter: "saturate(1.05) brightness(1.05)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
