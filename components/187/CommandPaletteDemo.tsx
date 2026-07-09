"use client";

import { useState } from "react";
import { CommandPalette } from "./CommandPalette";

export function CommandPaletteDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-12 items-center justify-center gap-2 rounded border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39FF14]/50"
      >
        <span className="text-[#39FF14]">/</span>
        Try /187
      </button>
      <CommandPalette open={open} onClose={() => setOpen(false)} />
    </>
  );
}
