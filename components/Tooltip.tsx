"use client";

import { type ReactNode } from "react";

export function Tooltip({
  content,
  children,
}: {
  content: ReactNode;
  children: ReactNode;
}) {
  return (
    <span className="group/tooltip relative inline-block">
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 rounded-xl border border-white/10 bg-[#0A0C14] p-3 text-xs leading-relaxed text-white/80 opacity-0 shadow-2xl shadow-black/40 transition-opacity motion-reduce:transition-none group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100"
      >
        {content}
      </span>
    </span>
  );
}
