"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import commandReference from "@/config/187-command-reference.json";

type Command = (typeof commandReference.commands)[number];

function score(command: Command, query: string): number {
  const q = query.toLowerCase();
  const parts = q.split(/\s+/).filter(Boolean);
  let score = 0;
  for (const part of parts) {
    if (command.alias.toLowerCase() === part) score += 100;
    if (command.alias.toLowerCase().startsWith(part)) score += 50;
    if (command.cmd.toLowerCase().includes(part)) score += 30;
    if (command.id.toLowerCase().includes(part)) score += 20;
    if (command.purpose.toLowerCase().includes(part)) score += 10;
    if (command.category.toLowerCase().includes(part)) score += 5;
  }
  return score;
}

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const candidates = useMemo(() => {
    const q = query.trim();
    if (!q) {
      return commandReference.commands.filter((c) => c.status === "core").slice(0, 8);
    }
    const scored = commandReference.commands
      .map((c) => ({ c, s: score(c, q) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 12);
    return scored.map((x) => x.c);
  }, [query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => (i + 1) % candidates.length);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => (i - 1 + candidates.length) % candidates.length);
        return;
      }
      if (e.key === "Enter" && candidates[selectedIndex]) {
        e.preventDefault();
        setQuery(candidates[selectedIndex].cmd);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, candidates, selectedIndex, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 p-4 pt-[15vh] backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="187 command palette"
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0A0C14] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <span className="text-lg text-[#39FF14]">/</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or alias..."
            className="flex-1 bg-transparent text-lg text-white placeholder:text-white/30 focus:outline-none"
          />
          <kbd className="hidden rounded border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/40 sm:inline-block">
            ESC
          </kbd>
        </div>

        <div className="max-h-[50vh] overflow-y-auto p-2">
          {candidates.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-white/40">
              No commands match <code className="text-[#39FF14]">{query}</code>
            </div>
          ) : (
            <ul role="listbox">
              {candidates.map((cmd, i) => (
                <li
                  key={cmd.cmd}
                  role="option"
                  aria-selected={i === selectedIndex}
                  className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 transition ${
                    i === selectedIndex ? "bg-white/10" : "hover:bg-white/5"
                  }`}
                  onMouseEnter={() => setSelectedIndex(i)}
                  onClick={() => setQuery(cmd.cmd)}
                >
                  <div className="flex items-center gap-3">
                    <code className="text-sm font-semibold text-[#39FF14]">{cmd.cmd}</code>
                    <span className="text-xs text-white/50">{cmd.alias}</span>
                  </div>
                  <span className="truncate pl-4 text-right text-xs text-white/60 max-w-[50%]">
                    {cmd.purpose}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-white/10 px-4 py-2 text-xs text-white/40">
          <span>↑↓ to navigate · ↵ to select</span>
          <span>{candidates.length} candidate{candidates.length === 1 ? "" : "s"}</span>
        </div>
      </div>
    </div>
  );
}
