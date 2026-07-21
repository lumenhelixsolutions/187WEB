"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { skillShowcaseIndex, type SkillShowcaseData } from "@/lib/skill-showcase-data";
import { FIRST_CLASS_SKILLS, SUBSKILLS, type SuiteSkill } from "@/lib/first-class-skills";
import { natashaKit, yelenaKit, charlotteKit, kaliKit, xavierKit, type AgentKit } from "@/lib/agents";
import { AgentMascotStack } from "./AgentMascot";
import { gsap, registerGsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

/**
 * Top-level 187WEB agent ecosystem.
 */

const AGENTS: AgentKit[] = [natashaKit, yelenaKit, charlotteKit, kaliKit, xavierKit];

const skillById = new Map([...FIRST_CLASS_SKILLS, ...SUBSKILLS].map((s) => [s.id, s]));

function skillMeta(id: string): SkillShowcaseData | undefined {
  return skillShowcaseIndex.get(id);
}

function AgentCard({
  agent,
  cardRef,
}: {
  agent: AgentKit;
  cardRef: (el: HTMLAnchorElement | null) => void;
}) {
  const skills = agent.skills
    .map((id) => ({ skill: skillById.get(id), meta: skillMeta(id) }))
    .filter((item): item is { skill: SuiteSkill; meta: SkillShowcaseData | undefined } => Boolean(item.skill));

  return (
    <Link
      ref={cardRef}
      href={`/${agent.slug}`}
      data-agent-card
      className="group relative flex h-full min-h-[30rem] flex-col overflow-hidden rounded-2xl border bg-[#0A0C14]/95 p-1 will-change-transform"
      style={{ borderColor: `${agent.color}40` }}
    >
      {/* Ghost name watermark — sits behind mascot + body text */}
      <span
        data-agent-ghost
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[18%] z-0 select-none text-center font-black uppercase leading-none tracking-tighter"
        style={{
          color: "transparent",
          WebkitTextStroke: `1px ${agent.color}55`,
          fontSize: "clamp(2.75rem, 1.2rem + 4vw, 4.25rem)",
          opacity: 0.55,
        }}
      >
        {agent.name}
      </span>
      <span
        data-agent-ghost-fill
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[42%] z-0 select-none text-center text-[0.65rem] font-semibold uppercase tracking-[0.35em]"
        style={{ color: `${agent.color}66` }}
      >
        {agent.tagline}
      </span>

      <div
        className="relative z-10 flex flex-1 flex-col rounded-[0.9rem] px-5 pb-6 pt-8 sm:px-6"
        style={{
          background: `linear-gradient(180deg, ${agent.color}10 0%, rgba(10,12,20,0.92) 38%, rgba(10,12,20,0.98) 100%)`,
        }}
      >
        <div data-agent-mascot className="relative z-10 flex items-center justify-center py-3">
          <AgentMascotStack color={agent.color} name={agent.name} size="lg" showWordmark={false} />
        </div>

        <div className="relative z-10 mt-1 flex flex-1 flex-col">
          <h3
            data-agent-title
            className="text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            {agent.name}
          </h3>
          <p className="mt-1 text-sm font-medium" style={{ color: agent.color }}>
            {agent.tagline}
          </p>

          <p className="mt-4 text-sm leading-relaxed text-white/70 line-clamp-4">{agent.overview}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {skills.map(({ skill }) => (
              <span
                key={skill.id}
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  backgroundColor: `${agent.color}18`,
                  color: agent.color,
                  border: `1px solid ${agent.color}30`,
                }}
              >
                {skill.name}
              </span>
            ))}
          </div>

          <div
            className="mt-auto flex items-center gap-1 pt-6 text-sm font-semibold"
            style={{ color: agent.color }}
          >
            <span>Open {agent.name}</span>
            <svg
              data-agent-arrow
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function AgentDepartments() {
  const reducedMotion = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const cardEls = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    registerGsap();
    const cards = cardEls.current.filter(Boolean) as HTMLAnchorElement[];
    if (cards.length === 0) return;

    if (reducedMotion) {
      gsap.set(cards, { clearProps: "all", opacity: 1, y: 0, scale: 1 });
      return;
    }

    const listenerCleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      // Slow staggered entrance
      gsap.fromTo(
        cards,
        { opacity: 0, y: 36, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.45,
          stagger: 0.18,
          ease: "power2.out",
        }
      );

      // Ghost name: slow drift + letter spacing breathe
      cards.forEach((card, i) => {
        const ghost = card.querySelector<HTMLElement>("[data-agent-ghost]");
        const ghostFill = card.querySelector<HTMLElement>("[data-agent-ghost-fill]");
        const title = card.querySelector<HTMLElement>("[data-agent-title]");
        const mascot = card.querySelector<HTMLElement>("[data-agent-mascot]");

        if (ghost) {
          gsap.to(ghost, {
            y: -8,
            duration: 5.5 + i * 0.35,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: i * 0.4,
          });
          gsap.fromTo(
            ghost,
            { letterSpacing: "-0.06em", opacity: 0.4 },
            {
              letterSpacing: "0.02em",
              opacity: 0.65,
              duration: 4.2 + i * 0.2,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              delay: i * 0.25,
            }
          );
        }

        if (ghostFill) {
          gsap.to(ghostFill, {
            opacity: 0.35,
            duration: 3.8,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: i * 0.3,
          });
        }

        if (title) {
          gsap.fromTo(
            title,
            { letterSpacing: "0em" },
            {
              letterSpacing: "0.04em",
              duration: 4.5,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              delay: i * 0.2,
            }
          );
        }

        // Very soft mascot float
        if (mascot) {
          gsap.to(mascot, {
            y: -4,
            duration: 4.8 + i * 0.25,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: i * 0.35,
          });
        }
      });

      // Gentle hover
      cards.forEach((card) => {
        const mascot = card.querySelector<HTMLElement>("[data-agent-mascot]");
        const arrow = card.querySelector<HTMLElement>("[data-agent-arrow]");
        const ghost = card.querySelector<HTMLElement>("[data-agent-ghost]");
        const color = getComputedStyle(card).borderColor;

        const onEnter = () => {
          gsap.to(card, {
            y: -6,
            scale: 1.015,
            boxShadow: `0 24px 50px -30px ${color}`,
            duration: 0.75,
            ease: "power2.out",
            overwrite: "auto",
          });
          if (mascot) {
            gsap.to(mascot, { scale: 1.04, duration: 0.8, ease: "power2.out", overwrite: "auto" });
          }
          if (arrow) {
            gsap.to(arrow, { x: 5, duration: 0.65, ease: "power2.out", overwrite: "auto" });
          }
          if (ghost) {
            gsap.to(ghost, { opacity: 0.85, duration: 0.7, ease: "power2.out", overwrite: "auto" });
          }
        };

        const onLeave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: "0 0 0 0 transparent",
            duration: 0.9,
            ease: "power2.out",
            overwrite: "auto",
          });
          if (mascot) {
            gsap.to(mascot, { scale: 1, duration: 0.9, ease: "power2.out", overwrite: "auto" });
          }
          if (arrow) {
            gsap.to(arrow, { x: 0, duration: 0.75, ease: "power2.out", overwrite: "auto" });
          }
          if (ghost) {
            gsap.to(ghost, { opacity: 0.55, duration: 0.8, ease: "power2.out", overwrite: "auto" });
          }
        };

        card.addEventListener("pointerenter", onEnter);
        card.addEventListener("pointerleave", onLeave);
        listenerCleanups.push(() => {
          card.removeEventListener("pointerenter", onEnter);
          card.removeEventListener("pointerleave", onLeave);
        });
      });
    }, gridRef);

    return () => {
      listenerCleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <section id="agents" className="relative z-10 border-y border-white/10 bg-[#080808]/90 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto w-full max-w-[90rem]">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">First-class agents</p>
          <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">
            Five agents. One web hive.
          </h2>
          <p className="mt-4 text-white/60">
            Each agent routes related skills into a coherent crew. Click through to see modules, triggers, and skill
            pages.
          </p>
        </Reveal>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:grid-cols-5 xl:gap-6"
        >
          {AGENTS.map((agent, i) => (
            <AgentCard
              key={agent.slug}
              agent={agent}
              cardRef={(el) => {
                cardEls.current[i] = el;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
