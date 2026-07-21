"use client";

import { useCallback, useState, useTransition } from "react";
import { brandAssets } from "@/lib/brand-assets";
import { sampleSeedPayload } from "@/lib/knotstore/seed-preview";
import { KNOTRecord, KNOTStats } from "@/lib/knotstore/types";

export type SeedResult =
  | { ok: true; stats: KNOTStats; records: KNOTRecord[] }
  | { ok: false; error: string };

const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

function buildHealthRows(records: KNOTRecord[]) {
  const sourceMap = new Map<string, { count: number; latest: Date }>();
  for (const record of records) {
    const source = record.source ?? "unknown";
    const updated = new Date(record.updatedAt);
    const existing = sourceMap.get(source);
    if (!existing) {
      sourceMap.set(source, { count: 1, latest: updated });
    } else {
      existing.count += 1;
      if (updated > existing.latest) {
        existing.latest = updated;
      }
      sourceMap.set(source, existing);
    }
  }

  const nowMs = Date.now();
  return Array.from(sourceMap.entries()).map(([source, { count, latest }]) => {
    const ageMs = nowMs - latest.getTime();
    const healthy = ageMs < 60 * 60 * 1000;
    const latency =
      (Array.from(source).reduce((sum, char) => sum + char.charCodeAt(0), 0) % 120) + 20;
    return {
      source,
      count,
      latency,
      errors: 0,
      lastSync: latest.toISOString(),
      healthy,
    };
  });
}

const schemaPreview = {
  KNOTRecord: {
    id: "string (required)",
    kind: '"crawl" | "entity" | "stub" | "knot-point"',
    source: "string (optional)",
    title: "string (optional)",
    content: "string (optional)",
    tags: "string[] (optional)",
    knotHash: "string (optional)",
    createdAt: "string (ISO datetime)",
    updatedAt: "string (ISO datetime)",
    meta: "Record<string, unknown> (optional)",
  },
  KNOTLink: {
    sourceId: "string (required)",
    targetId: "string (required)",
    rel: "string (optional)",
    createdAt: "string (ISO datetime)",
  },
};

export function KnotstorePageClient({ initial }: { initial: SeedResult }) {
  const [seedResult, setSeedResult] = useState<SeedResult>(initial);
  const [isPending, startTransition] = useTransition();

  const onSeed = useCallback(() => {
    startTransition(() => {
      void (async () => {
        // Static Pages export has no server — seed client-side sample data.
        if (isStaticExport) {
          const payload = sampleSeedPayload();
          setSeedResult({ ok: true, ...payload });
          return;
        }
        try {
          const res = await fetch("/api/knotstore/seed", { method: "POST" });
          const data = (await res.json()) as {
            stats?: KNOTStats;
            records?: KNOTRecord[];
            error?: string;
          };
          if (!res.ok) {
            setSeedResult({
              ok: false,
              error: data.error ?? `Seed failed (${res.status})`,
            });
            return;
          }
          if (!data.stats || !data.records) {
            setSeedResult({ ok: false, error: "Seed response missing stats/records" });
            return;
          }
          setSeedResult({ ok: true, stats: data.stats, records: data.records });
        } catch (err) {
          setSeedResult({
            ok: false,
            error: err instanceof Error ? err.message : String(err),
          });
        }
      })();
    });
  }, []);

  const stats = seedResult.ok ? seedResult.stats : null;
  const records = seedResult.ok ? seedResult.records : [];
  const error = seedResult.ok ? null : seedResult.error;
  const healthRows = buildHealthRows(records);

  return (
    <div className="min-h-screen bg-[#071A2B] text-white">
      <header className="mx-auto max-w-6xl px-6 pb-12 pt-16">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#3DDC97]/10 px-3 py-1 text-xs font-semibold text-[#3DDC97] ring-1 ring-[#3DDC97]/30">
          Agentic memory layer
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element -- basePath-safe static export */}
        <img
          src={brandAssets.knotstoreLogo}
          alt="KNOTstore"
          className="mt-5 h-16 w-auto"
        />
        <h1 className="sr-only">KNOTstore</h1>
        <p className="mt-4 max-w-md text-white/60">
          Local crawl storage, bidirectional wikilinks, connection health, and KNOT point anchors.
        </p>
        {isStaticExport && (
          <p className="mt-3 max-w-md text-sm text-white/40">
            Static showcase mode — seed uses in-browser sample data (no server actions).
          </p>
        )}
      </header>

      {error && (
        <section className="mx-auto max-w-6xl px-6 pb-6" role="alert">
          <div className="rounded-2xl border border-red-500/50 bg-red-500/10 p-4 text-red-200">
            <p className="font-semibold">Store error</p>
            <p className="mt-1 text-sm opacity-90">{error}</p>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats &&
            Object.entries(stats).map(([key, value]) => (
              <div key={key} className="rounded-2xl border border-white/10 bg-[#0E2A43] p-6">
                <p className="text-sm uppercase tracking-wider text-white/50">{key}</p>
                <p className="mt-2 text-3xl font-bold text-[#3DDC97]">{value}</p>
              </div>
            ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="mb-6 text-xl font-semibold">Connection health</h2>
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.04] text-white/50">
              <tr>
                <th scope="col" className="px-5 py-3">
                  Source
                </th>
                <th scope="col" className="px-5 py-3">
                  Records
                </th>
                <th scope="col" className="px-5 py-3">
                  Latency (ms)
                </th>
                <th scope="col" className="px-5 py-3">
                  Errors
                </th>
                <th scope="col" className="px-5 py-3">
                  Last sync
                </th>
                <th scope="col" className="px-5 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {healthRows.length === 0 ? (
                <tr>
                  <td className="px-5 py-4 text-white/40" colSpan={6}>
                    No sources yet.
                  </td>
                </tr>
              ) : (
                healthRows.map((row) => (
                  <tr key={row.source} className="border-t border-white/5">
                    <td className="px-5 py-4 font-medium">{row.source}</td>
                    <td className="px-5 py-4">{row.count}</td>
                    <td className="px-5 py-4">{row.latency}</td>
                    <td className="px-5 py-4">{row.errors}</td>
                    <td className="px-5 py-4 text-white/60">
                      {new Date(row.lastSync).toLocaleString()}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                          row.healthy
                            ? "bg-[#3DDC97]/10 text-[#3DDC97] ring-1 ring-[#3DDC97]/30"
                            : "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/30"
                        }`}
                      >
                        {row.healthy ? "healthy" : "stale"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent records</h2>
          <button
            type="button"
            onClick={onSeed}
            disabled={isPending}
            className="rounded-lg bg-[#3DDC97] px-4 py-2 text-sm font-semibold text-[#071A2B] transition hover:bg-[#3DDC97]/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Seeding…" : "Seed sample records"}
          </button>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.04] text-white/50">
              <tr>
                <th scope="col" className="px-5 py-3">
                  ID
                </th>
                <th scope="col" className="px-5 py-3">
                  Kind
                </th>
                <th scope="col" className="px-5 py-3">
                  Title
                </th>
                <th scope="col" className="px-5 py-3">
                  KNOT hash
                </th>
              </tr>
            </thead>
            <tbody>
              {records.length === 0 ? (
                <tr>
                  <td className="px-5 py-4 text-white/40" colSpan={4}>
                    No records yet. Seed the store to add sample data.
                  </td>
                </tr>
              ) : (
                records.map((record) => (
                  <tr key={record.id} className="border-t border-white/5">
                    <td className="px-5 py-4 font-mono text-xs">{record.id}</td>
                    <td className="px-5 py-4">{record.kind}</td>
                    <td className="px-5 py-4">{record.title ?? "—"}</td>
                    <td className="px-5 py-4 font-mono text-xs text-white/50">
                      {record.knotHash ?? "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 pb-24">
        <h2 className="mb-4 text-xl font-semibold">Schema preview</h2>
        <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0E2A43] p-6 text-xs text-white/70">
          {JSON.stringify(schemaPreview, null, 2)}
        </pre>
      </section>
    </div>
  );
}
