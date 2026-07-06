"use client";

type NeuroSlidersProps = {
  toxicity?: string | number;
  lethality?: string;
};

const lethalityMap: Record<string, number> = { max: 95, medium: 55, low: 25 };

export function NeuroSliders({ toxicity, lethality }: NeuroSlidersProps) {
  const tox = parseFloat(String(toxicity ?? 0));
  const toxPct = Math.min((tox / 1.5) * 100, 100);
  const leth = lethality ?? "medium";
  const lethPct = lethalityMap[leth] ?? 50;
  const lethAlert = leth === "max";

  return (
    <div className="space-y-4">
      <div>
        <div className="mb-1 flex justify-between font-mono text-[11px] text-[#4a4a4a]">
          <span>toxicity</span>
          <span className="text-[#cccccc]">{toxicity ?? "—"}</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded bg-[#2a2a2a]">
          <div className="h-full bg-[#39ff14] transition-all duration-300" style={{ width: `${toxPct}%` }} />
        </div>
      </div>
      <div>
        <div className="mb-1 flex justify-between font-mono text-[11px] text-[#4a4a4a]">
          <span>lethality</span>
          <span className="text-[#cccccc]">{leth}</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded bg-[#2a2a2a]">
          <div
            className={`h-full transition-all duration-300 ${lethAlert ? "bg-[#ff0000]" : "bg-[#39ff14]"}`}
            style={{ width: `${lethPct}%` }}
          />
        </div>
      </div>
    </div>
  );
}