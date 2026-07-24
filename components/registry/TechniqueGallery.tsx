"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { TECHNIQUES, TECHNIQUE_SECTIONS, TECHNIQUE_COUNT, VARIATION_COUNT, type Technique } from "@/lib/motion-techniques";
import { type MotionSkillId } from "@/lib/motion-registry";
import { skillShowcaseIndex, skillColorValue } from "@/lib/skill-showcase-data";
import { TechniquePreview } from "./TechniquePreview";

function skillMeta(owner: MotionSkillId) {
  const skill = skillShowcaseIndex.get(owner.replace("187", ""));
  return {
    name: skill?.name ?? owner.toUpperCase(),
    color: skill ? skillColorValue(skill.color) : "#39ff14",
    href: `/${owner}`,
  };
}

function TechniqueCard({ technique }: { technique: Technique }) {
  const [open, setOpen] = useState(false);
  const primary = skillMeta(technique.skills[0] ?? "187gsap");

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-sc-panel transition hover:border-white/20">
      <div className="p-3 pb-0">
        <TechniquePreview techniqueId={technique.id} color={primary.color} />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-lg font-bold leading-tight text-white">{technique.label}</h3>
          <span className="shrink-0 rounded-full bg-white/[0.06] px-2 py-0.5 text-[11px] font-semibold tabular-nums text-white/50">
            {technique.entries.length} {technique.entries.length === 1 ? "variation" : "variations"}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-white/60">{technique.blurb}</p>

        <div className="flex flex-wrap gap-1.5">
          {technique.skills.map((s) => {
            const m = skillMeta(s);
            return (
              <Link
                key={s}
                href={m.href}
                className="rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] transition hover:brightness-125"
                style={{ borderColor: `${m.color}44`, color: m.color }}
              >
                {m.name}
              </Link>
            );
          })}
        </div>

        <div className="mt-auto">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="flex items-center gap-1.5 text-xs font-semibold text-white/45 transition hover:text-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sc-primary"
          >
            {open ? "Hide" : "Show"} variations
            <span aria-hidden className={`transition-transform ${open ? "rotate-180" : ""}`}>
              ▾
            </span>
          </button>

          {open && (
            <ul className="mt-3 flex flex-col gap-2 border-t border-white/[0.07] pt-3">
              {technique.entries.map((e) => (
                <li key={e.id} className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-sm">
                  <code className="rounded bg-sc-primary/10 px-1.5 py-0.5 font-mono text-xs text-sc-primary">{e.command}</code>
                  <span className="text-white/70">{e.name}</span>
                  {e.hybrid && <span className="text-[10px] font-semibold uppercase tracking-wider text-sc-cyan">3D</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  );
}

export function TechniqueGallery() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TECHNIQUES;
    return TECHNIQUES.filter((t) => {
      if (`${t.label} ${t.blurb}`.toLowerCase().includes(q)) return true;
      return t.entries.some((e) => `${e.name} ${e.command} ${e.logic}`.toLowerCase().includes(q));
    });
  }, [query]);

  return (
    <section className="relative border-t border-white/10 px-6 py-16 sm:py-20">
      <div className="container-x">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sc-primary">Effect registry</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
            {TECHNIQUE_COUNT} distinct motion techniques
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/55">
            The catalog behind the 8 motion-lab skills holds {VARIATION_COUNT} entries — but they collapse to{" "}
            {TECHNIQUE_COUNT} genuinely distinct techniques. Each card below shows the real mechanism, then lists its
            catalogued variations. Parsed from{" "}
            <code className="text-sc-primary">docs/handoffs/187-motion-gsap-skill-registry-v3.md</code>.
          </p>
        </div>

        <div className="mx-auto mb-8 max-w-xl">
          <label className="block">
            <span className="sr-only">Search techniques and variations</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search motion techniques and their catalogued variations"
              placeholder="Search techniques or variations…"
              className="h-13 w-full rounded-2xl border border-sc-primary/30 bg-sc-void px-4 py-3.5 text-base text-white outline-none transition placeholder:text-white/40 focus:border-sc-primary focus-visible:ring-2 focus-visible:ring-sc-primary/50"
            />
          </label>
        </div>

        {TECHNIQUE_SECTIONS.map((section) => {
          const items = filtered.filter((t) => t.section === section.id);
          if (items.length === 0) return null;
          return (
            <div key={section.id} className="mb-12 last:mb-0">
              <h3 className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                {section.label}
                <span className="h-px flex-1 bg-white/10" />
                <span className="tabular-nums">{items.length}</span>
              </h3>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((t) => (
                  <TechniqueCard key={t.id} technique={t} />
                ))}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <p className="text-center text-sm text-white/45">
            No techniques match &ldquo;{query}&rdquo;. Try a different term.
          </p>
        )}
      </div>
    </section>
  );
}
