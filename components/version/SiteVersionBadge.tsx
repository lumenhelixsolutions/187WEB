import Link from "next/link";
import { siteBuild, siteVersionLabel } from "@/lib/site-version";

/** Compact version chip — updates every stamped build. */
export function SiteVersionBadge({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/about#version"
      className={`inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] text-white/55 transition hover:border-[#39FF14]/35 hover:text-[#39FF14] ${className}`.trim()}
      title={`Built ${siteBuild.builtAt} · ${siteBuild.gitSha}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#39FF14]/80" aria-hidden />
      {siteVersionLabel()}
    </Link>
  );
}
