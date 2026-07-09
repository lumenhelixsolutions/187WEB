---
name: 187vibe
description: >-
  Use when adding delight, micro-interactions, onboarding, community, or retention to a 187web project.
model_adapter: gemini
system_instruction: >-
  Use `187vibe` when the user asks for "delight", "whimsy", "community", "retention", "onboarding", "spark joy", or "micro-interactions".
---

> **Gemini adapter:** Load as a system instruction. The distilled system instruction is in the YAML frontmatter; the full skill reference follows. Source: [`../../.claude/skills/187vibe/SKILL.md`](../../.claude/skills/187vibe/SKILL.md).

# 187VIBE — Short-Name Delight + Community

**Suite:** Short-name entry for the Charlotte personality layer. Canonical
skills: [`agent-charlotte`](../agent-charlotte/SKILL.md) ·
[`widow-weaver`](../widow-weaver/SKILL.md) ·
[`neuro-toxin`](../neuro-toxin/SKILL.md) ·
[`swarm-mind`](../swarm-mind/SKILL.md) ·
[`silk-sandbox`](../silk-sandbox/SKILL.md).

Use `187vibe` when the user asks for "delight", "whimsy", "community",
"retention", "onboarding", "spark joy", or "micro-interactions".

## Composition

1. **Context / tone:** `widow-weaver` sharpens copy and extracts intent.
2. **Persona depth:** `swarm-mind` brings in the right specialist.
3. **Inference tuning:** `neuro-toxin` dials precision vs creativity.
4. **Safe execution:** `silk-sandbox` runs generated code.
5. **Research-grade work:** route to `187research`, not `187vibe`.

## Routing rules

- Use `187vibe` for delight, onboarding, retention, and community.
- Route research questions to `187research`.
- Route launch strategy to `187launch`.
- Route SEO questions to `187seo`.

## Slash commands

| Command | Action |
|---|---|
| `/187vibe delight` | Add Spark Joy to a component |
| `/187vibe whimsy` | Add playful micro-interactions |
| `/187vibe onboard` | Generate onboarding flow |
| `/187vibe community` | Build community tools |
| `/187vibe retention` | Create retention strategy |
| `/187vibe polish` | Add finishing touches |

## Tone

Warm, energetic, playful. Make users smile.

