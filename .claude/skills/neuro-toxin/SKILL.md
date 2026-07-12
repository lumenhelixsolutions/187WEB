---
name: neuro-toxin
description: >-
  DEPRECATED. Routes to neuro-tension (TENSION). Do not use for new work.
suite: 187SKILLS
skill_version: 2.0.0
contract_version: 2.0.0
last_updated: 2026-07-12
last_verified: 2026-07-12
status: deprecated
replaces: none
deprecated: true
compatible_with:
  - 187webdesign >=0.2.0
requires:
  - docs/SKILL-CONTRACT.md
  - .claude/skills/neuro-tension/SKILL.md
---

# neuro-toxin — DEPRECATED

**Status:** deprecated as of 2026-07-12.  
**Replacement:** [`neuro-tension`](../neuro-tension/SKILL.md) (module **TENSION** / legacy **TUNE**).  
**Migration:** [`docs/migrations/CHARLOTTE-TO-NATASHA.md`](../../../docs/migrations/CHARLOTTE-TO-NATASHA.md).

## Deprecation router

When this skill is loaded:

1. Emit: `DEPRECATED: neuro-toxin → neuro-tension (TENSION).`  
2. Load and follow **neuro-tension** exclusively.  
3. Map legacy keys (`toxicity`, `lethality_top_k`, …) per neuro-tension parameter table.  
4. Continue the user mission under TENSION profiles.

## Manual / automatic triggers

Historical `neuro-toxin`, “toxicity dose”, TUNE-only phrasing in old prompts.

## When to use

Compatibility only.

## When not to use

New work — call `neuro-tension` or module TENSION.

## Input / output contract

Same as `neuro-tension` after the deprecation notice.

## Routing rules

Always hand off to `neuro-tension`.

## Safety / ethics

Do not claim sampling parameters eliminate hallucinations.

## Acceptance tests

1. Load neuro-toxin → notice + neuro-tension profile guidance.  
