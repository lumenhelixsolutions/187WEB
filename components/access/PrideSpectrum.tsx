"use client";

import Link from "next/link";
import { useEffect, useRef, type RefObject } from "react";
import { gsap, registerGsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { useClientMounted } from "@/lib/motion/useClientMounted";

/**
 * Pride spectrum tokens — green is the bridge uniting Access+ and Include+.
 * Access+: red → orange → yellow → green (warm half)
 * Include+: green → blue → indigo → purple (cool half)
 * Full: classic six-band pride
 */
export const PRIDE = {
  red: "#E40303",
  orange: "#FF8C00",
  yellow: "#FFED00",
  /** Uniting green (classic pride green) */
  green: "#008026",
  brandGreen: "#39FF14",
  blue: "#24408E",
  indigo: "#3B4CCA",
  purple: "#732982",
} as const;

export const GRAD_ACCESS = `linear-gradient(105deg, ${PRIDE.red} 0%, ${PRIDE.orange} 32%, ${PRIDE.yellow} 62%, ${PRIDE.green} 100%)`;
export const GRAD_INCLUDE = `linear-gradient(105deg, ${PRIDE.green} 0%, ${PRIDE.blue} 38%, ${PRIDE.indigo} 68%, ${PRIDE.purple} 100%)`;
export const GRAD_PRIDE_FULL = `linear-gradient(105deg, ${PRIDE.red}, ${PRIDE.orange}, ${PRIDE.yellow}, ${PRIDE.green}, ${PRIDE.blue}, ${PRIDE.purple})`;

type Spectrum = "access" | "include" | "full";

const SPECTRUM_GRAD: Record<Spectrum, string> = {
  access: GRAD_ACCESS,
  include: GRAD_INCLUDE,
  full: GRAD_PRIDE_FULL,
};

/**
 * Autism-awareness interlocking puzzle mark.
 * Four pieces colored by spectrum half (or full pride).
 */
export function AutismPuzzleIcon({
  spectrum = "full",
  className = "h-6 w-6",
  decorative = false,
}: {
  spectrum?: Spectrum;
  className?: string;
  decorative?: boolean;
}) {
  const fills =
    spectrum === "access"
      ? [PRIDE.red, PRIDE.orange, PRIDE.yellow, PRIDE.green]
      : spectrum === "include"
        ? [PRIDE.green, PRIDE.blue, PRIDE.indigo, PRIDE.purple]
        : [PRIDE.red, PRIDE.yellow, PRIDE.green, PRIDE.purple];

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden={decorative ? true : undefined}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : "Autism awareness puzzle mark"}
      focusable="false"
    >
      {!decorative ? <title>Autism awareness puzzle mark</title> : null}
      {/* 2×2 classic puzzle tiles with tab/blank */}
      <path
        fill={fills[0]}
        d="M4 8h18c0 4 3 7 7 7s7-3 7-7h6c2.2 0 4 1.8 4 4v14c-4 0-7 3-7 7s3 7 7 7v6c0 2.2-1.8 4-4 4H28c0-4-3-7-7-7s-7 3-7 7H8c-2.2 0-4-1.8-4-4V30c4 0 7-3 7-7s-3-7-7-7V12c0-2.2 1.8-4 4-4z"
      />
      <path
        fill={fills[1]}
        d="M36 8h18c2.2 0 4 1.8 4 4v6c-4 0-7 3-7 7s3 7 7 7v14c0 2.2-1.8 4-4 4H42c0-4-3-7-7-7s-7 3-7 7h-6c-2.2 0-4-1.8-4-4V30c4 0 7-3 7-7s-3-7-7-7V12c0-2.2 1.8-4 4-4h6c0 4 3 7 7 7s7-3 7-7z"
      />
      <path
        fill={fills[2]}
        d="M4 36h10c0 4 3 7 7 7s7-3 7-7h14c2.2 0 4 1.8 4 4v6c-4 0-7 3-7 7s3 7 7 7v2c0 2.2-1.8 4-4 4H28c0-4-3-7-7-7s-7 3-7 7H8c-2.2 0-4-1.8-4-4V48c4 0 7-3 7-7s-3-7-7-7v-5c0-2.2 1.8-4 4-4z"
      />
      <path
        fill={fills[3]}
        d="M36 36h18c2.2 0 4 1.8 4 4v5c-4 0-7 3-7 7s3 7 7 7v1c0 2.2-1.8 4-4 4H42c0-4-3-7-7-7s-7 3-7 7h-6c-2.2 0-4-1.8-4-4v-2c4 0 7-3 7-7s-3-7-7-7v-6c0-2.2 1.8-4 4-4h6c0 4 3 7 7 7s7-3 7-7z"
      />
    </svg>
  );
}

type PrideCtaProps = {
  href: string;
  spectrum: Spectrum;
  children: React.ReactNode;
  variant?: "filled" | "outline";
  className?: string;
  showPuzzle?: boolean;
  "data-hero-cta"?: boolean | string;
};

/**
 * Pride-spectrum CTA with autism puzzle mark + GSAP hover lift.
 * Filled: solid gradient + dark text (contrast). Outline: spectrum border.
 */
export function PrideCta({
  href,
  spectrum,
  children,
  variant = "filled",
  className = "",
  showPuzzle = true,
  ...rest
}: PrideCtaProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  const mounted = useClientMounted();
  const filled = variant === "filled";
  const grad = SPECTRUM_GRAD[spectrum];

  useEffect(() => {
    if (!mounted || reduced || !ref.current) return;
    registerGsap();
    const el = ref.current;
    const enter = () => gsap.to(el, { y: -2, scale: 1.02, duration: 0.22, ease: "power2.out" });
    const leave = () => gsap.to(el, { y: 0, scale: 1, duration: 0.28, ease: "power2.out" });
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    el.addEventListener("focus", enter);
    el.addEventListener("blur", leave);
    return () => {
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
      el.removeEventListener("focus", enter);
      el.removeEventListener("blur", leave);
    };
  }, [mounted, reduced]);

  return (
    <Link
      ref={ref}
      href={href}
      className={[
        "pride-cta inline-flex h-12 min-h-[44px] items-center justify-center gap-2.5 rounded-xl px-5 text-sm font-semibold will-change-transform",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
        filled ? "pride-cta--filled text-[#0a0a0a]" : "pride-cta--outline text-white",
        className,
      ].join(" ")}
      style={
        filled
          ? { backgroundImage: grad }
          : {
              backgroundImage: `linear-gradient(#0A0C14, #0A0C14), ${grad}`,
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
              border: "2px solid transparent",
            }
      }
      {...rest}
    >
      {showPuzzle ? <AutismPuzzleIcon spectrum={spectrum} className="h-5 w-5 shrink-0 drop-shadow-sm" decorative /> : null}
      <span>{children}</span>
    </Link>
  );
}

/** Decorative spectrum rail — green seam unites Access+ and Include+. */
export function PrideUnityRail({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex h-2 w-full overflow-hidden rounded-full ${className}`}
      role="img"
      aria-label="Pride spectrum: red to green for Access+, green to purple for Include+, united by green"
    >
      <span className="h-full flex-1" style={{ background: GRAD_ACCESS }} />
      <span className="h-full w-2 shrink-0 bg-[#39FF14]" title="Uniting green" />
      <span className="h-full flex-1" style={{ background: GRAD_INCLUDE }} />
    </div>
  );
}

/** Soft entrance stagger for pride CTAs in a container. */
export function usePrideCtaEntrance(containerRef: RefObject<HTMLElement | null>) {
  const reduced = useReducedMotion();
  const mounted = useClientMounted();

  useEffect(() => {
    if (!mounted || reduced || !containerRef.current) return;
    registerGsap();
    const nodes = containerRef.current.querySelectorAll(".pride-cta");
    if (!nodes.length) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        nodes,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: "power3.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [mounted, reduced, containerRef]);
}
