# 187type — Public Skill Doc

> **Canonical skill:** [`.claude/skills/187type/SKILL.md`](.claude/skills/187type/SKILL.md)

## Identity

187TYPE designs reactive, variable, and three-dimensional typography systems that respond to scroll, audio, or interaction while preserving readability.

## Triggers

### Manual

- `/187type`
- `187TYPE`
- `kinetic type`
- `variable font`
- `3d typography`
- `text motion`
- `typography animation`

### Automatic

- Any request mentioning animated type, variable fonts, kinetic typography, or 3D text.

## When to use

- Designing kinetic headlines and hero type.
- Animating variable-font axes on interaction or scroll.
- Building 3D text scenes with R3F/Three.js.

## Output contract

1. **Type motion spec** — element, trigger, motion property, and timing.
2. **Variable-font axis plan** — axes to animate, ranges, and fallback fonts.
3. **3D text render notes** — geometry, material, lighting, and performance.
4. **Readability / accessibility review** — contrast, motion sensitivity, screen-reader impact.
5. **Next actions** — concrete, assignable steps.

## Templates

| Template | When to use |
|---|---|
| `templates/kinetic-type-spec.md` | Designing animated type. |
| `templates/variable-font-plan.md` | Animating font axes. |

## Acceptance tests

1. Prompt: "Animate a headline on scroll with variable font weight." → Expected: type motion spec + axis plan.
2. Prompt: "Build a 3D text scene in R3F." → Expected: render notes + accessibility review.
3. Prompt: "Make kinetic type safe for vestibular disorders." → Expected: reduced-motion fallback.

## Routes

- **Skill source:** `.claude/skills/187type/SKILL.md`
- **Docs:** `docs/187TYPE.md`
- **Page:** `/187type`
