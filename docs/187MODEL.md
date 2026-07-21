# 187model — Public Skill Doc

> **Canonical skill:** [`.claude/skills/187model/SKILL.md`](.claude/skills/187model/SKILL.md)

## Identity

187MODEL builds interactive 3D product viewers with model loading, material variants, camera presets, and configurator UX.

## Triggers

### Manual

- `/187model`
- `187MODEL`
- `product viewer`
- `3d configurator`
- `model showcase`
- `three.js product`
- `r3f product`

### Automatic

- Any request mentioning 3D product viewer, model configurator, or Three.js/R3F product showcase.

## When to use

- Building a 3D product viewer.
- Adding material, color, or feature variants.
- Defining camera presets and orbit constraints.

## Output contract

1. **Model loading and format plan** — glTF/USD/DRACO choices, compression, preload.
2. **Variant state map** — material, color, feature selections and URL state.
3. **Camera rig spec** — presets, orbit limits, auto-rotate, focus targets.
4. **Performance budget** — draw calls, texture sizes, LOD, frame target.
5. **Next actions** — concrete, assignable steps.

## Templates

| Template | When to use |
|---|---|
| `templates/product-viewer-spec.md` | A 3D product showcase. |
| `templates/configurator-state-map.md` | Variant selection and state. |

## Acceptance tests

1. Prompt: "Build a shoe configurator in R3F." → Expected: model plan + variant state map.
2. Prompt: "Add camera presets for a product viewer." → Expected: camera rig spec.
3. Prompt: "Optimize a 3D product page for mobile." → Expected: performance budget.

## Routes

- **Skill source:** `.claude/skills/187model/SKILL.md`
- **Docs:** `docs/187MODEL.md`
- **Page:** `/187model`
