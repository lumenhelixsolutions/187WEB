# 187motion — Public Skill Doc

> **Canonical skill:** [`.claude/skills/187motion/SKILL.md`](.claude/skills/187motion/SKILL.md)

## Identity

187MOTION is a library of reusable React Three Fiber and GSAP hooks for common animation patterns, entrance sequences, and scroll triggers.

## Triggers

### Manual

- `/187motion`
- `187MOTION`
- `motion hooks`
- `r3f animation`
- `usegsap`
- `animation hook`
- `reusable animation`

### Automatic

- Any request mentioning reusable animation hooks, R3F animation hooks, or shared motion patterns.

## When to use

- Creating reusable animation hooks.
- Standardizing entrance and transition effects.
- Composing scroll-triggered and interaction-driven animations.

## Output contract

1. **Hook API and signature** — name, arguments, return values, and TypeScript types.
2. **Usage examples** — one minimal and one real-world example.
3. **Dependency list** — GSAP, R3F, Zustand, etc.
4. **Motion accessibility notes** — reduced motion, focus management, and vestibular safety.
5. **Next actions** — concrete, assignable steps.

## Templates

| Template | When to use |
|---|---|
| `templates/motion-hook-spec.md` | Designing a reusable animation hook. |
| `templates/entrance-sequence-plan.md` | Standardizing entrance effects. |

## Acceptance tests

1. Prompt: "Create a useScrollProgress hook." → Expected: API + usage example.
2. Prompt: "Standardize page entrance animations." → Expected: hook spec + accessibility notes.
3. Prompt: "Make an R3F useFloat hook." → Expected: signature + dependency list.

## Routes

- **Skill source:** `.claude/skills/187motion/SKILL.md`
- **Docs:** `docs/187MOTION.md`
- **Page:** `/187motion`
