"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { buildActiveAgents } from "@/lib/187ai-eye/orchestrator";
import {
  CompilePayloadSchema,
  type CompilePayload,
  type ManifestPrompt,
  type ModuleToggles,
} from "@/lib/187ai-eye/types";
import { AgentRail } from "./AgentRail";
import { BrainPane } from "./BrainPane";
import { ChromeBar } from "./ChromeBar";
import { JournalStream } from "./JournalStream";
import { ModuleDrawer } from "./ModuleDrawer";
import { NeuroSliders } from "./NeuroSliders";

const DEFAULT_RELAY = "http://localhost:18780";

type EyeShellProps = {
  manifestIndex: ManifestPrompt[];
  initialRelay?: string;
};

function parseCompile(data: unknown): CompilePayload | null {
  const parsed = CompilePayloadSchema.safeParse(data);
  return parsed.success ? parsed.data : null;
}

export function EyeShell({ manifestIndex, initialRelay }: EyeShellProps) {
  const relayBase = initialRelay ?? DEFAULT_RELAY;
  const [connected, setConnected] = useState(false);
  const [compile, setCompile] = useState<CompilePayload | null>(null);
  const [toggles, setToggles] = useState<ModuleToggles>({
    observability: "off",
    sandbox: true,
    charlotte_crawl: false,
    eval: false,
  });

  const applyCompile = useCallback((raw: unknown) => {
    const next = parseCompile(raw);
    if (!next) return;
    setCompile(next);
    if (next.observability_profile) {
      setToggles((prev) => ({
        ...prev,
        observability: next.observability_profile!.mode,
        charlotte_crawl: next.observability_profile!.charlotte_crawl,
        eval: next.observability_profile!.eval,
      }));
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    // Once a live SSE message lands, the /last snapshot is stale — never let
    // a slow fetch response overwrite fresher stream state.
    let gotLive = false;
    const ac = new AbortController();

    fetch(`${relayBase}/last`, { signal: ac.signal })
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled && !gotLive && d?.ecosystem) applyCompile(d);
      })
      .catch(() => {});

    const es = new EventSource(`${relayBase}/events`);
    es.onopen = () => {
      if (cancelled) return;
      setConnected(true);
    };
    es.onerror = () => {
      if (cancelled) return;
      setConnected(false);
    };
    es.onmessage = (e) => {
      if (cancelled) return;
      try {
        gotLive = true;
        applyCompile(JSON.parse(e.data));
      } catch {
        /* ignore */
      }
    };

    return () => {
      cancelled = true;
      ac.abort();
      es.close();
    };
  }, [relayBase, applyCompile]);

  const agents = useMemo(
    () => buildActiveAgents(compile, manifestIndex),
    [compile, manifestIndex],
  );

  const charlotteActive = toggles.charlotte_crawl;

  return (
    <div className="min-h-screen bg-[#080808] text-[#cccccc]">
      <ChromeBar connected={connected} relayUrl={relayBase} />

      <header className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          187<span className="text-[#39ff14]">ai</span>EYE
        </h1>
        <p className="mt-2 font-mono text-xs text-[#4a4a4a]">
          Obsidian Local Brain · multi-agent orchestration · hyper-skilled sub-agents
        </p>
      </header>

      {/* Worst-state-first (RESILIENCE.md): a visitor with no local relay gets
          an explanation and a next step, not a dead dashboard. */}
      {!connected && !compile && (
        <div className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
          <div className="rounded-lg border border-[#4a4a4a] bg-[#1a1a1a] p-6 text-center">
            <p className="font-mono text-sm text-white">No relay detected</p>
            <p className="mx-auto mt-2 max-w-md font-mono text-xs leading-relaxed text-[#8a8a8a]">
              This dashboard mirrors a local orchestrator. Run{" "}
              <code className="rounded bg-[#2a2a2a] px-1.5 py-0.5 text-[#39ff14]">187power</code> on
              your machine and it connects to{" "}
              <code className="rounded bg-[#2a2a2a] px-1.5 py-0.5 text-[#39ff14]">{relayBase}</code>{" "}
              automatically. The panels below show the idle layout until then.
            </p>
          </div>
        </div>
      )}

      <div className="mx-auto grid max-w-6xl gap-4 px-4 pb-12 sm:px-6 lg:grid-cols-2">
        <BrainPane compile={compile} />
        <section className="rounded-lg border border-[#4a4a4a] bg-[#1a1a1a]">
          <header className="border-b border-[#4a4a4a] px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-[#39ff14]">
            Neuro-Toxin
          </header>
          <div className="p-4">
            <NeuroSliders
              toxicity={compile?.neuro_toxin?.toxicity}
              lethality={compile?.neuro_toxin?.lethality}
            />
          </div>
        </section>

        <div className="lg:col-span-2">
          <AgentRail agents={agents} manifestIndex={manifestIndex} charlotteActive={charlotteActive} />
        </div>

        <ModuleDrawer toggles={toggles} onChange={setToggles} />

        <section className="rounded-lg border border-[#4a4a4a] bg-[#1a1a1a]">
          <header className="border-b border-[#4a4a4a] px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-[#39ff14]">
            Routing
          </header>
          <dl className="space-y-2 p-4 font-mono text-xs">
            {(
              [
                ["power_mode", compile?.power_mode],
                ["prompt_id", compile?.prompt_id],
                ["skill", compile?.skill],
                ["persona", compile?.persona],
                ["layer", compile?.layer_name ? `L${compile?.layer} ${compile.layer_name}` : compile?.layer],
              ] as const
            ).map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-[#2a2a2a] py-1.5 last:border-0">
                <dt className="text-[#4a4a4a]">{k}</dt>
                <dd className="max-w-[60%] break-all text-right text-white">{v ?? "—"}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="lg:col-span-2">
          <JournalStream compile={compile} />
        </div>

        {toggles.observability !== "off" && (
          <div className="lg:col-span-2 rounded-lg border border-[#39ff14]/30 bg-[#39ff14]/5 p-4 font-mono text-xs text-[#39ff14]">
            Observability {toggles.observability}: Langfuse self-host · OTel GenAI · see OBSERVABILITY-4.7.md §14
          </div>
        )}
      </div>

      <footer className="border-t border-[#4a4a4a] py-6 text-center font-mono text-[11px] text-[#4a4a4a]">
        187web Ecosystem v2 ·{" "}
        <Link href="/omniqube.html" className="text-[#39ff14] hover:underline">
          OmniQube legacy
        </Link>
      </footer>
    </div>
  );
}