"use client";

import { useState } from "react";
import Link from "next/link";
import { COMMANDS, COMMAND_CATEGORIES } from "@/components/187/command-data";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";

export function CommandTeaser() {
  const [category, setCategory] = useState<string>(COMMAND_CATEGORIES[0] ?? "Front Door");
  const filtered = COMMANDS.filter((c) => c.category === category);

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0A0C14] p-6 sm:p-8">
      <div className="flex flex-wrap gap-2">
        {COMMAND_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={`inline-flex h-9 items-center rounded-full px-4 text-xs font-semibold transition ${
              category === cat
                ? "bg-[#39FF14] text-[#05060A]"
                : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="text-xs uppercase tracking-[0.16em] text-white/40">
            <tr>
              <th className="border-b border-white/10 py-3 pr-4">Command</th>
              <th className="border-b border-white/10 py-3 pr-4">ID</th>
              <th className="border-b border-white/10 py-3">Purpose</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((cmd) => {
              const hasSkill = skillShowcaseIndex.has(cmd.id.toLowerCase());
              return (
                <tr key={`${cmd.cmd}-${cmd.id}`} className="text-white/70">
                  <td className="py-3 pr-4 font-mono text-[#39FF14]">
                    {hasSkill ? (
                      <Link href={`/187${cmd.id.toLowerCase()}`} className="hover:underline">
                        {cmd.cmd}
                      </Link>
                    ) : (
                      cmd.cmd
                    )}
                  </td>
                  <td className="py-3 pr-4 font-semibold text-white">{cmd.id}</td>
                  <td className="py-3">{cmd.purpose}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/187"
          className="inline-flex h-12 items-center justify-center rounded border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Open full /187 reference
        </Link>
      </div>
    </div>
  );
}
