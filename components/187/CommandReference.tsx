"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/Reveal";
import commandReference from "@/config/187-command-reference.json";

const categories = Array.from(
  new Set(commandReference.commands.map((c) => c.category)),
);

const statusColors: Record<string, string> = {
  core: "#39FF14",
  module: "#a855f7",
  selector: "#22d3ee",
  research: "#f59e0b",
  "optional-pack": "#3b82f6",
  planned: "#94a3b8",
  legacy: "#64748b",
};

export function CommandReference() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commandReference.commands;
    return commandReference.commands.filter(
      (c) =>
        c.cmd.toLowerCase().includes(q) ||
        c.alias.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        c.purpose.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q),
    );
  }, [query]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof commandReference.commands>();
    for (const cat of categories) {
      map.set(cat, []);
    }
    for (const cmd of filtered) {
      map.get(cmd.category)?.push(cmd);
    }
    return Array.from(map.entries()).filter(([, items]) => items.length > 0);
  }, [filtered]);

  return (
    <div className="container-x">
      <Reveal className="mx-auto mb-10 max-w-2xl text-center">
        <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">
          <span className="h-px w-6 bg-[#39FF14]" aria-hidden="true" />
          /187 command reference
        </p>
        <h2 className="mt-4 text-[clamp(1.9rem,1.2rem+2.6vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-white">
          Every slash command in 187WEB
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/55">
          Search by command, alias, or purpose. Use{" "}
          <code className="text-[#39FF14]">/187 &lt;alias&gt; [target] [mode] [depth]</code>.
        </p>
      </Reveal>

      <Reveal className="mx-auto mb-10 max-w-xl">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try 'seo', 'sel', 'sci', 'scan', 'vault'..."
            className="h-12 w-full rounded-xl border border-white/10 bg-[#0A0C14] px-4 pl-11 text-sm text-white placeholder:text-white/30 focus:border-[#39FF14]/50 focus:outline-none"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">/</span>
        </div>
        <p className="mt-2 text-center text-xs text-white/40">
          {filtered.length} command{filtered.length === 1 ? "" : "s"} matched
        </p>
      </Reveal>

      <div className="mx-auto max-w-5xl space-y-10">
        {grouped.map(([category, items], gi) => (
          <Reveal key={category} delay={gi * 80}>
            <div className="rounded-2xl border border-white/10 bg-[#0A0C14] p-5 sm:p-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#39FF14]">
                {category.replace(/-/g, " ")}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-white/50">
                    <tr>
                      <th className="pb-3 font-medium">Command</th>
                      <th className="pb-3 font-medium">Alias</th>
                      <th className="pb-3 font-medium">ID</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-[#d6deeb]/80">
                    {items.map((cmd) => (
                      <tr key={cmd.cmd}>
                        <td className="py-3 font-mono text-white">{cmd.cmd}</td>
                        <td className="py-3 font-mono text-white/70">{cmd.alias}</td>
                        <td className="py-3 text-white/70">{cmd.id}</td>
                        <td className="py-3">
                          <span
                            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-2 py-0.5 text-xs"
                            style={{
                              color: statusColors[cmd.status] ?? "#94a3b8",
                              borderColor: `${statusColors[cmd.status] ?? "#94a3b8"}33`,
                            }}
                          >
                            <span
                              className="h-1.5 w-1.5 rounded-full"
                              style={{ backgroundColor: statusColors[cmd.status] ?? "#94a3b8" }}
                            />
                            {cmd.status}
                          </span>
                        </td>
                        <td className="py-3">{cmd.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
