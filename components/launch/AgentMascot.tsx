"use client";

import Link from "next/link";
import { brandAssets } from "@/lib/brand-assets";

type Size = "sm" | "md" | "lg" | "hero";

/** Pixel heights for the wireframe plate (keeps aspect; image stays object-contain). */
const MASCOT_H: Record<Size, string> = {
  sm: "h-36 w-36 sm:h-40 sm:w-40",
  md: "h-48 w-48 sm:h-56 sm:w-56",
  lg: "h-64 w-64 sm:h-72 sm:w-72",
  hero: "h-72 w-72 sm:h-[22rem] sm:w-[22rem]",
};

const WORDMARK_H: Record<Size, string> = {
  sm: "h-6",
  md: "h-8",
  lg: "h-9",
  hero: "h-10 sm:h-12",
};

/**
 * Transparent wireframe mascot, unaltered except solid agent color via mask.
 * No glow, no blend overlays, no background plate.
 */
export function AgentMascot({
  color,
  name,
  size = "md",
  className = "",
  priority = false,
}: {
  color: string;
  name: string;
  size?: Size;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      role="img"
      aria-label={`${name} mascot`}
      className={`mx-auto shrink-0 ${MASCOT_H[size]} ${className}`.trim()}
      style={{
        backgroundColor: color,
        WebkitMaskImage: `url(${brandAssets.mascotWireframe})`,
        maskImage: `url(${brandAssets.mascotWireframe})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
      // Preload hint for heroes: browser still fetches the mask image URL.
      data-priority={priority ? "high" : undefined}
    />
  );
}

/**
 * Vertical stack: large centered mascot, then wordmark below — separate, not merged.
 */
export function AgentMascotStack({
  color,
  name,
  size = "md",
  showWordmark = true,
  showName = false,
  className = "",
  priority = false,
}: {
  color: string;
  name: string;
  size?: Size;
  showWordmark?: boolean;
  showName?: boolean;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`flex w-full flex-col items-center gap-4 ${className}`.trim()}>
      <AgentMascot color={color} name={name} size={size} priority={priority} />
      {showWordmark && (
        // eslint-disable-next-line @next/next/no-img-element -- basePath-safe static export
        <img
          src={brandAssets.wordmarkTagline}
          alt="187WEB"
          width={480}
          height={120}
          decoding="async"
          loading={priority ? "eager" : "lazy"}
          className={`${WORDMARK_H[size]} w-auto max-w-[90%] object-contain`}
        />
      )}
      {showName && (
        <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color }}>
          {name}
        </span>
      )}
    </div>
  );
}

/** Home-hero / ecosystem roster: mascot over ghost name — separate, not merged art. */
export function AgentMascotRoster({
  agents,
}: {
  agents: Array<{ slug: string; name: string; color: string }>;
}) {
  return (
    <div className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-8 sm:grid-cols-5 sm:gap-6">
      {agents.map((agent) => (
        <Link
          key={agent.slug}
          href={`/${agent.slug}`}
          className="group relative flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-[#0A0C14]/40 px-3 py-5 transition hover:-translate-y-0.5 hover:border-white/25"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-1 top-1/2 -translate-y-1/2 select-none text-center font-black uppercase leading-none tracking-tighter"
            style={{
              color: "transparent",
              WebkitTextStroke: `1px ${agent.color}44`,
              fontSize: "1.65rem",
            }}
          >
            {agent.name}
          </span>
          <div className="relative z-10">
            <AgentMascot color={agent.color} name={agent.name} size="md" />
          </div>
          <span
            className="relative z-10 text-center text-[11px] font-semibold uppercase tracking-[0.16em] transition group-hover:tracking-[0.22em]"
            style={{ color: agent.color }}
          >
            {agent.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
