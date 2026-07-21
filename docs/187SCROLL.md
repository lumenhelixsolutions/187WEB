# 187scroll — Public Skill Doc

> **Canonical skill:** [`.claude/skills/187scroll/SKILL.md`](.claude/skills/187scroll/SKILL.md)

## Identity

187SCROLL crafts long-form scroll narratives that drive 3D camera paths, scene transitions, and progress-based reveals.

## Triggers

### Manual

- `/187scroll`
- `187SCROLL`
- `scroll narrative`
- `camera scroll`
- `3d scroll story`
- `scroll-driven scene`
- `scroll camera`

### Automatic

- Any request mentioning scroll-driven 3D, camera-on-scroll, or scroll narrative.

## When to use

- Building a scroll-driven 3D scene.
- Animating a camera path tied to scroll progress.
- Sequencing scene reveals and transitions.

## Output contract

1. **Scroll progress map** — section breakpoints, progress ranges, and scrub values.
2. **Camera path spec** — keyframes, easing, look-at targets, and FOV changes.
3. **Scene sequence** — object entrances, exits, and state changes per section.
4. **Performance notes** — instancing, culling, and resize handling.
5. **Next actions** — concrete, assignable steps.

## Templates

| Template | When to use |
|---|---|
| `templates/scroll-narrative-spec.md` | A scroll-driven 3D story. |
| `templates/camera-path-plan.md` | Defining a scroll-linked camera. |

## Acceptance tests

1. Prompt: "Build a scroll-driven 3D product story." → Expected: progress map + camera path.
2. Prompt: "Sequence scene reveals on scroll." → Expected: scene sequence with timings.
3. Prompt: "Keep scroll narrative performant on low-power devices." → Expected: perf notes.

## Routes

- **Skill source:** `.claude/skills/187scroll/SKILL.md`
- **Docs:** `docs/187SCROLL.md`
- **Page:** `/187scroll`
