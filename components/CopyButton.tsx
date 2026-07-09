"use client";

import { useEffect, useRef, useState } from "react";

type CopyState = "idle" | "copied" | "failed";

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<number | undefined>(undefined);

  // One tracked timer: rapid clicks reset it instead of stacking, and unmount
  // cancels it so setState never fires on a dead component.
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const flash = (next: CopyState) => {
    setState(next);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 1500);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      flash("copied");
    } catch {
      // Clipboard unavailable (permissions, non-secure context) — say so
      // instead of silently doing nothing.
      flash("failed");
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs font-medium text-[#d6deeb]/60 transition hover:bg-white/5 hover:text-[#d6deeb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39FF14]/50"
      aria-label={`Copy ${text}`}
    >
      {state === "copied" ? (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M20 6L9 17l-5-5" stroke="#39FF14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[#39FF14]">Copied</span>
        </>
      ) : state === "failed" ? (
        <span className="text-amber-400">Copy blocked — select it manually</span>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.75" />
            <path d="M5 15V5a2 2 0 012-2h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
          {label}
        </>
      )}
      <span role="status" aria-live="polite" className="sr-only">
        {state === "copied" ? "Copied to clipboard" : state === "failed" ? "Copy failed" : ""}
      </span>
    </button>
  );
}
