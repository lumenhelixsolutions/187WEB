"use client";

import type { ModuleToggles, ObservabilityMode } from "@/lib/187ai-eye/types";

type ModuleDrawerProps = {
  toggles: ModuleToggles;
  onChange: (next: ModuleToggles) => void;
};

const obsModes: ObservabilityMode[] = ["off", "minimal", "full"];

export function ModuleDrawer({ toggles, onChange }: ModuleDrawerProps) {
  const set = <K extends keyof ModuleToggles>(key: K, value: ModuleToggles[K]) => {
    onChange({ ...toggles, [key]: value });
  };

  return (
    <section className="rounded-lg border border-[#4a4a4a] bg-[#1a1a1a]">
      <header className="border-b border-[#4a4a4a] px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-[#39ff14]">
        Modules
      </header>
      <div className="space-y-4 p-4 font-mono text-xs">
        <div>
          <p id="obs-mode-label" className="mb-2 text-[#4a4a4a]">
            Observability
          </p>
          <div
            role="group"
            aria-labelledby="obs-mode-label"
            className="flex flex-wrap gap-2"
          >
            {obsModes.map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={toggles.observability === m}
                onClick={() => set("observability", m)}
                className={`rounded border px-2.5 py-1 transition ${
                  toggles.observability === m
                    ? "border-[#39ff14] bg-[#39ff14]/10 text-[#39ff14]"
                    : "border-[#4a4a4a] text-[#cccccc] hover:border-[#39ff14]/50"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {(
          [
            ["sandbox", "silk-sandbox"],
            ["charlotte_crawl", "agent-charlotte crawl"],
            ["eval", "eval CI / online sampling"],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="flex cursor-pointer items-center justify-between gap-4 text-[#cccccc]">
            <span>{label}</span>
            <input
              type="checkbox"
              checked={toggles[key]}
              onChange={(e) => set(key, e.target.checked)}
              className="h-4 w-4 accent-[#39ff14]"
            />
          </label>
        ))}

        {toggles.observability !== "off" && (
          <p className="text-[10px] text-[#4a4a4a]">Langfuse panels appear when backend is configured (§14).</p>
        )}
      </div>
    </section>
  );
}