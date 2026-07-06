import type { ActiveAgents, ManifestPrompt } from "@/lib/187ai-eye/types";

type AgentRailProps = {
  agents: ActiveAgents;
  manifestIndex: ManifestPrompt[];
  charlotteActive: boolean;
};

const statusColor: Record<string, string> = {
  idle: "border-[#4a4a4a] text-[#cccccc]",
  running: "border-[#39ff14] text-[#39ff14] shadow-[0_0_12px_rgba(57,255,20,0.35)]",
  done: "border-[#39ff14]/60 text-[#39ff14]/80",
  blocked: "border-[#ff0000] text-[#ff0000]",
};

export function AgentRail({ agents, manifestIndex, charlotteActive }: AgentRailProps) {
  const persona = agents.primary_persona;
  const skill = agents.primary_skill;

  return (
    <section className="rounded-lg border border-[#4a4a4a] bg-[#1a1a1a]">
      <header className="border-b border-[#4a4a4a] px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-[#39ff14]">
        Agent Rail
      </header>
      <div className="space-y-4 p-4">
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#39ff14] shadow-[0_0_16px_rgba(57,255,20,0.4)]"
            aria-hidden
          >
            <span className="font-mono text-[10px] text-[#39ff14]">187</span>
          </div>
          <div>
            <p className="font-mono text-sm text-white">{skill ?? "—"}</p>
            <p className="font-mono text-xs text-[#4a4a4a]">{persona ? `persona: ${persona}` : "no persona"}</p>
          </div>
        </div>

        {charlotteActive && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#39ff14]/40 bg-[#39ff14]/10 px-2.5 py-1 font-mono text-[10px] text-[#39ff14]">
            agent-charlotte · crawl extension
          </span>
        )}

        <div className="flex flex-wrap gap-2">
          {agents.sub_agents.map((sub) => {
            const meta = manifestIndex.find((p) => p.id === sub.id);
            const label = sub.alias ?? meta?.alias ?? sub.id;
            const cls = statusColor[sub.status] ?? statusColor.idle;
            return (
              <span
                key={sub.id}
                className={`rounded-md border px-2 py-1 font-mono text-[10px] ${cls} ${sub.nested ? "ml-3" : ""}`}
                title={sub.id}
              >
                {label}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}