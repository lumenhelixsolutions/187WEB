import type { Metadata } from "next";
import Link from "next/link";
import { CommandPalette } from "@/components/187/CommandPalette";
import { CommandReference } from "@/components/187/CommandReference";

export const metadata: Metadata = {
  title: "/187 Command Reference — 187WEB",
  description: "The complete 187WEB slash command reference for skills, agents, modules, research profiles, abilities, packs, and autocomplete.",
};

export default function CommandReferencePage() {
  return (
    <main className="min-h-screen bg-[#05060A] px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm text-[#39FF14] transition hover:text-white">← Back to 187WEB</Link>
        <section className="py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">187WEB command surface</p>
          <h1 className="mt-4 max-w-4xl text-[clamp(2.5rem,1.5rem+5vw,5.25rem)] font-bold leading-[0.95] tracking-tight">Every slash command in the 187WEB suite.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">Use /187 to select one skill, one agent, one ability, one module, one research profile, one install pack, or the full 187WEB suite.</p>
        </section>
        <CommandPalette />
        <div className="mt-10"><CommandReference /></div>
      </div>
    </main>
  );
}
