---
name: 187model
description: >-
  Interactive 3D product viewers with model loading, material variants, camera presets, and configurator UX.
model_adapter: gemini
system_instruction: >-
  Build interactive 3D product showcases and configurators with Three.js / React Three Fiber.
---

> **Gemini adapter:** Load as a system instruction. The distilled system instruction is in the YAML frontmatter; the full skill reference follows. Source: [`../../.claude/skills/187model/SKILL.md`](../../.claude/skills/187model/SKILL.md).

# 187MODEL

Build interactive 3D product showcases and configurators with Three.js / React Three Fiber.

## When to use

- 3D product viewer.
- Material, color, or feature variants.
- Camera presets and orbit constraints.

## Output

1. Model loading and format plan.
2. Variant state map.
3. Camera rig spec.
4. Performance budget.
5. Next actions.

## Routes

- `187CRAFT` for UI/UX and design tokens.
- `187HERO` when the model anchors a hero.
- `187ACCESS+` for keyboard/screen-reader support.

