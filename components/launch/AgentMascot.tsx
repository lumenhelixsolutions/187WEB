"use client";

import Link from "next/link";
import { brandAssets } from "@/lib/brand-assets";

function hexWithAlpha(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

type Size = "sm" | "md" | "lg" | "hero";

const FRAME: Record<Size, string> = {
  sm: "h-36 sm:h-40",
  md: "h-52 sm:h-56",
  lg: "h-64 sm:h-72",
  hero: "h-72 sm:h-96",
};

/**
 * Color-coded 187WEB web-mascot plate — hologram wireframe tinted to the agent color.
 * Used on agent department cards and agent page heroes.
 */
export function AgentMascot({
  color,
  name,
  size = "md",
  className = "",
  showNameBadge = true,
  showWordmark = false,
  priority = false,
}: {
  color: string;
  name: string;
  size?: Size;
  className?: string;
  showNameBadge?: boolean;
  showWordmark?: boolean;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl bg-[#050608] ${FRAME[size]} ${className}`.trim()}
      style={{
        boxShadow: `inset 0 0 0 1px ${hexWithAlpha(color, 0.25)}, 0 0 48px ${hexWithAlpha(color, 0.18)}`,
      }}
    >
      {/* Soft radial wash in agent color */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 42%, ${hexWithAlpha(color, 0.45)} 0%, transparent 62%)`,
        }}
        aria-hidden
      />

      {/* eslint-disable-next-line @next/next/no-img-element -- basePath-safe static export */}
      <img
        src={brandAssets.mascotWireframe}
        alt=""
        width={480}
        height={480}
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className="absolute inset-0 m-auto h-[88%] w-auto max-w-[92%] object-contain opacity-95"
        style={{
          filter: `drop-shadow(0 0 22px ${hexWithAlpha(color, 0.55)})`,
        }}
        aria-hidden
      />

      {/* Color grade over the monochrome hologram */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-color opacity-75"
        style={{ backgroundColor: color }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-30"
        style={{ backgroundColor: color }}
        aria-hidden
      />

      {/* Bottom vignette so badges stay readable */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent"
        aria-hidden
      />

      {showNameBadge && (
        <span
          className="absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-bold text-[#050608] shadow-lg"
          style={{ backgroundColor: color }}
        >
          {name}
        </span>
      )}

      {showWordmark && (
        // eslint-disable-next-line @next/next/no-img-element -- basePath-safe static export
        <img
          src={brandAssets.wordmarkTagline}
          alt="187WEB"
          width={320}
          height={80}
          className="absolute bottom-3 left-3 h-7 w-auto max-w-[70%] object-contain opacity-90 sm:h-9"
          decoding="async"
        />
      )}
    </div>
  );
}

/** Compact row of all agent mascots for the home hero. */
export function AgentMascotRoster({
  agents,
}: {
  agents: Array<{ slug: string; name: string; color: string }>;
}) {
  return (
    <div className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-5 sm:gap-4">
      {agents.map((agent) => (
        <Link
          key={agent.slug}
          href={`/${agent.slug}`}
          className="group block overflow-hidden rounded-2xl border border-white/10 transition hover:-translate-y-1 hover:border-white/25"
          style={{ boxShadow: `0 16px 40px -24px ${hexWithAlpha(agent.color, 0.55)}` }}
        >
          <AgentMascot color={agent.color} name={agent.name} size="sm" showNameBadge className="rounded-none" />
          <span className="block bg-[#0A0C14] px-2 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70 transition group-hover:text-white">
            {agent.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
