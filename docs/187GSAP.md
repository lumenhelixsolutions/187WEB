# 187gsap — Public Skill Doc

> **Canonical skill:** [`.claude/skills/187gsap/SKILL.md`](.claude/skills/187gsap/SKILL.md)

## Identity

187GSAP is the motion-lab foundation for GSAP timelines, ScrollTrigger pinning/scrubbing, and performance-safe animation patterns in React and Next.js.

## Triggers

### Manual

- `/187gsap`
- `187GSAP`
- `gsap timeline`
- `scrolltrigger`
- `animation choreograph`
- `gsap react`

### Automatic

- Any request mentioning GSAP, timeline, ScrollTrigger, tween, stagger, or easing.

## When to use

- Building a GSAP timeline for a page or component.
- Adding ScrollTrigger pinning, scrub, or progress-linked animation.
- Standardizing easing, stagger, and reduced-motion fallbacks.

## Output contract

1. **Timeline spec** — targets, duration, easing, stagger, and callbacks.
2. **ScrollTrigger map** — trigger element, start/end, scrub, pin, and markers.
3. **Easing and performance notes** — recommended eases, will-change/translate3d guidance.
4. **Reduced-motion fallback plan** — `prefers-reduced-motion` handling.
5. **Next actions** — concrete, assignable steps.

## Templates

| Template | When to use |
|---|---|
| `templates/gsap-timeline.md` | A new timeline-driven animation. |
| `templates/scrolltrigger-map.md` | Mapping scroll progress to animation. |

## Acceptance tests

1. Prompt: "Build a GSAP timeline for a hero headline and CTA." → Expected: timeline spec + stagger plan.
2. Prompt: "Pin a section and scrub a progress bar." → Expected: ScrollTrigger map with pin/scrub.
3. Prompt: "Respect reduced motion." → Expected: fallback plan included.

## Routes

- **Skill source:** `.claude/skills/187gsap/SKILL.md`
- **Docs:** `docs/187GSAP.md`
- **Page:** `/187gsap`
