import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { skillShowcaseIndex, type SkillShowcaseData, skillColorValue, skillIsRainbow, skillRainbowTextClass } from "@/lib/skill-showcase-data";
import { COMMANDS } from "@/components/187/command-data";

function IconArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function skillAlias(id: string): string {
  const found = COMMANDS.find((c) => c.id.toLowerCase() === id.toLowerCase());
  return found?.alias ?? id;
}

export function AbilityCard({
  skill,
  delay = 0,
}: {
  skill: SkillShowcaseData;
  delay?: number;
}) {
  const alias = skillAlias(skill.id);
  const trigger = skill.triggers[0] ?? `/187 ${alias}`;
  const useCase = skill.useCases[0] ?? "";
  const output = skill.outputs[0] ?? "";
  const solidColor = skillColorValue(skill.color);

  return (
    <Reveal delay={delay}>
      <Link
        href={`/187${skill.id}`}
        className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#0A0C14] p-5 transition hover:-translate-y-1 hover:border-[#39FF14]/30 hover:bg-[#0A0C14]/80"
        style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 24px 60px -24px ${solidColor}22` }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-bold text-white">{skill.name}</h3>
            <p className={`text-sm ${skillIsRainbow(skill.color) ? skillRainbowTextClass() : ""}`} style={skillIsRainbow(skill.color) ? undefined : { color: solidColor }}>
              {skill.tagline}
            </p>
          </div>
          <span
            className={`grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg text-xs font-bold ${skillIsRainbow(skill.color) ? "text-white" : "text-[#050608]"}`}
            style={skillIsRainbow(skill.color) ? {} : { backgroundColor: solidColor }}
          >
            {skillIsRainbow(skill.color) ? (
              <span className="bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                {alias.slice(0, 2).toUpperCase()}
              </span>
            ) : (
              alias.slice(0, 2).toUpperCase()
            )}
          </span>
        </div>

        <div className="mt-4 space-y-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">Trigger</p>
            <code className="mt-1 block rounded bg-white/5 px-2 py-1 text-xs text-[#39FF14]">{trigger}</code>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">Use case</p>
            <p className="mt-1 text-sm leading-relaxed text-white/70">{useCase}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">Delivers</p>
            <p className="mt-1 text-sm leading-relaxed text-white/70">{output}</p>
          </div>
        </div>

        <div className="mt-auto flex items-center gap-1 pt-5 text-sm font-medium" style={{ color: solidColor }}>
          <span>Explore {skill.name}</span>
          <IconArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </div>
      </Link>
    </Reveal>
  );
}

export function MiniAbilityCard({
  id,
  name,
  alias,
  purpose,
  color,
  delay = 0,
}: {
  id: string;
  name: string;
  alias: string;
  purpose: string;
  color: string;
  delay?: number;
}) {
  const hasPage = skillShowcaseIndex.has(id);
  const Wrapper = hasPage ? Link : "div";
  const wrapperProps = hasPage ? { href: `/187${id}`, className: "group block" } : { className: "block" };

  return (
    <Reveal delay={delay}>
      {/* @ts-expect-error Wrapper is polymorphic */}
      <Wrapper
        {...wrapperProps}
        className={`${wrapperProps.className} h-full rounded-2xl border border-white/10 bg-[#0A0C14] p-5 transition hover:border-[#39FF14]/30 ${hasPage ? "hover:-translate-y-1" : ""}`}
        style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 24px 60px -24px ${color}22` }}
      >
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-bold text-white">{name}</h3>
          <code className="rounded bg-[#39FF14]/10 px-2 py-1 text-xs text-[#39FF14]">/187 {alias}</code>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-white/60">{purpose}</p>
      </Wrapper>
    </Reveal>
  );
}
