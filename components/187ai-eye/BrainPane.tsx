import type { CompilePayload } from "@/lib/187ai-eye/types";

type BrainPaneProps = {
  compile: CompilePayload | null;
};

export function BrainPane({ compile }: BrainPaneProps) {
  const cwd = compile?.cwd ?? "Awaiting compiler session…";
  const directive = compile?.directive ?? "Run 187web-compiler with -Write -Emit, or enable the shell hook.";

  return (
    <section className="rounded-lg border border-[#4a4a4a] bg-[#1a1a1a]">
      <header className="border-b border-[#4a4a4a] px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-[#39ff14]">
        Active Brain
      </header>
      <div className="space-y-4 p-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-[#4a4a4a]">Vault path (B1)</p>
          <p className="mt-1 break-all font-mono text-sm text-[#cccccc]">{cwd}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-[#4a4a4a]">Directive</p>
          <p className="mt-2 max-h-40 overflow-y-auto font-serif text-sm leading-relaxed text-[#e0e0e0]">
            {directive}
          </p>
        </div>
        <p className="font-mono text-[10px] text-[#4a4a4a]">
          B2: Obsidian REST/MCP live sync · B3: bidirectional vault writes
        </p>
      </div>
    </section>
  );
}