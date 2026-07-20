import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Install 187WEB",
  description: "Preflight, onboarding, and individual installation paths for 187WEB skills, agents, abilities, modules, profiles, and packs.",
};

const packs = [
  ["core-lite", "cmd, rpt, scan, flow, docs, ver, pub"],
  ["web-build", "repo, craft, kit, lab, docs, test, ax"],
  ["research-lab", "res, sci, labs, data, api, bench, meta, prov, crate"],
  ["colab-lab", "nb, colab, labs, data, bench"],
  ["gap-math", "gap, sci, bench, meta, prov, crate"],
  ["local-brain", "vault, docs, rpt, res, ch, co"],
];

export default function InstallPage() {
  return (
    <main className="min-h-screen bg-[#05060A] px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm text-[#39FF14] transition hover:text-white">← Back to 187WEB</Link>
        <section className="py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">Preflight / install / onboarding</p>
          <h1 className="mt-4 text-[clamp(2.5rem,1.5rem+5vw,5rem)] font-bold leading-[0.95] tracking-tight">Install exactly the 187WEB capabilities you need.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">The selector supports individual installs for any 187 skill, agent, module, agentic ability, tool profile, research layer, local-brain kit, curated pack, or the full suite.</p>
        </section>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-[#0A0C14] p-6">
            <h2 className="text-xl font-bold">Preflight</h2>
            <pre className="mt-4 overflow-x-auto rounded-2xl bg-black/30 p-4 text-sm text-[#39FF14]">{`187 pre\n187 cap\n187 doctor`}</pre>
          </div>
          <div className="rounded-3xl border border-white/10 bg-[#0A0C14] p-6">
            <h2 className="text-xl font-bold">Individual install</h2>
            <pre className="mt-4 overflow-x-auto rounded-2xl bg-black/30 p-4 text-sm text-[#39FF14]">{`187 install seo\n187 install sci\n187 install gap\n187 install char\n187 install public-data-api`}</pre>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-2xl font-bold">Curated packs</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {packs.map(([name, contents]) => (
              <div key={name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="font-bold">{name}</h3>
                <p className="mt-3 font-mono text-sm leading-6 text-[#39FF14]/80">{contents}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-10 rounded-3xl border border-[#39FF14]/20 bg-[#39FF14]/5 p-6">
          <h2 className="text-xl font-bold">Slash command reference</h2>
          <p className="mt-3 text-white/65">The complete command list, autocomplete behavior, and selection logic live at the public /187 route.</p>
          <Link href="/187" className="mt-5 inline-flex h-12 items-center justify-center rounded bg-[#39FF14] px-6 text-sm font-semibold text-[#05060A]">Open /187 Reference</Link>
        </div>
      </div>
    </main>
  );
}
