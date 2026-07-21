# 187hero — Public Skill Doc

> **Canonical skill:** [`.claude/skills/187hero/SKILL.md`](.claude/skills/187hero/SKILL.md)

## Identity

187HERO builds full-screen immersive hero sections with WebGL/R3F backgrounds, parallax layers, and scroll-linked CTAs.

## Triggers

### Manual

- `/187hero`
- `187HERO`
- `hero scene`
- `immersive hero`
- `webgl background`
- `full screen 3d`
- `hero three.js`

### Automatic

- Any request mentioning full-screen hero, WebGL background, immersive hero, or 3D hero scene.

## When to use

- Building a WebGL/R3F hero background.
- Adding parallax or depth layers to a hero.
- Linking the hero to a scroll CTA or transition.

## Output contract

1. **Hero scene spec** — concept, mood, palette, and content hierarchy.
2. **Layer stack** — background, mid, foreground, and CTA with z-order and blend modes.
3. **Scroll / link integration plan** — scroll-linked transition, CTA behavior, and routing.
4. **Performance budget** — load time, draw calls, texture memory, and FPS target.
5. **Next actions** — concrete, assignable steps.

## Templates

| Template | When to use |
|---|---|
| `templates/hero-scene-spec.md` | A full-screen immersive hero. |
| `templates/hero-performance-budget.md` | Defining hero load and runtime limits. |

## Acceptance tests

1. Prompt: "Build a WebGL hero with floating particles." → Expected: scene spec + layer stack.
2. Prompt: "Link a hero to a scroll CTA." → Expected: integration plan.
3. Prompt: "Keep a 3D hero under 2s LCP." → Expected: performance budget.

## Routes

- **Skill source:** `.claude/skills/187hero/SKILL.md`
- **Docs:** `docs/187HERO.md`
- **Page:** `/187hero`
