---
name: 187craft
description: >-
  Use when designing, building, or auditing UI/UX for a 187web project.
model_adapter: hermes
---

> **Hermes adapter:** Use `system.md` as the system message for Hermes-based local LLMs (Ollama, lm-studio, etc.). Source: [`../../.claude/skills/187craft/SKILL.md`](../../.claude/skills/187craft/SKILL.md).

# 187CRAFT — Short-Name Design + Frontend

**Suite:** Short-name entry for the mature design layer. Canonical skills:
[`187webdesign`](../187webdesign/SKILL.md) ·
[`187webdev-design-system`](../187webdev-design-system/SKILL.md) ·
[`187webdev-qa`](../187webdev-qa/SKILL.md) ·
[`187webdev-code-review`](../187webdev-code-review/SKILL.md).

Use `187craft` when the user says "design", "UI", "UX", "frontend",
"accessibility", "components", or "polish".

## When to use this

- Building or redesigning a public-facing page.
- Art-directing a hero or landing section.
- Running a pre-ship audit.
- Generating a design system, palette, or component library.

## Slash commands

| Command | Loads | Action |
|---|---|---|
| `/187craft design` | `187webdesign` + `187webdev-design-system` | Generate/update design system |
| `/187craft ui` | `187webdesign` | Generate UI components |
| `/187craft a11y` | `a11y-linting-agent` + `187webdev-qa` | Run accessibility audit |
| `/187craft palette` | `187webdesign` | Suggest color palette |
| `/187craft fonts` | `187webdesign` | Suggest font pairings |
| `/187craft polish` | `187webdesign` + `ui-aesthetic-auditor` | Run baseline polish |
| `/187craft motion` | `187webdesign` | Fix motion performance |

## Design tokens

Reuse the warm-blueprint and Killer Web tokens already in
[`tailwind.config.ts`](../../../tailwind.config.ts) and
[`app/globals.css`](../../../app/globals.css). Do not invent new palettes unless the
brief explicitly requires a rebrand.

## Tone

Refined, precise, detail-obsessed. Every pixel matters.

