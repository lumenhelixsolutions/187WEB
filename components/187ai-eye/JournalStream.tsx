import type { CompilePayload } from "@/lib/187ai-eye/types";

type JournalStreamProps = {
  compile: CompilePayload | null;
};

export function JournalStream({ compile }: JournalStreamProps) {
  const lines = [
    compile?.compiled_at ? `compile @ ${compile.compiled_at}` : null,
    compile?.prompt_id ? `prompt: ${compile.prompt_id}${compile.alias ? ` (${compile.alias})` : ""}` : null,
    compile?.power_mode ? `power_mode: ${compile.power_mode}` : null,
    compile?.trace_id ? `trace_id: ${compile.trace_id}` : null,
    compile?.observability_profile
      ? `observability: ${compile.observability_profile.mode}`
      : "observability: off (default)",
  ].filter(Boolean) as string[];

  return (
    <section className="rounded-lg border border-[#4a4a4a] bg-[#1a1a1a]">
      <header className="border-b border-[#4a4a4a] px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-[#39ff14]">
        Session Journal
      </header>
      <pre className="max-h-48 overflow-auto p-4 font-mono text-[11px] leading-relaxed text-[#39ff14]">
        {lines.length > 0 ? lines.join("\n") : "Awaiting compiler output…"}
      </pre>
    </section>
  );
}