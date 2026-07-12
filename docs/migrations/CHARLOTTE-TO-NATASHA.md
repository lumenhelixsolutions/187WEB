# Migration: Charlotte → NATASHA

**Status:** active compatibility window  
**Window start:** 2026-07-12  
**Window end (planned):** 2026-10-12 (90 days; extend only by ADR)  
**ADR:** `docs/decisions/NATASHA-ADR-001-NAMING.md`

---

## Summary

| Was (v2) | Is (v3) |
|----------|---------|
| Operator / mascot narrative **Charlotte** | Operator architecture **NATASHA** |
| Module **CHAR** / skill `agent-charlotte` | Module **SCOUT** / skill `natasha-scout` |
| Skill `neuro-toxin` (TUNE) | Skill `neuro-tension` (TENSION); alias TUNE |
| Ecosystem v2 Charlotte integration | Ecosystem v3 NATASHA Integration |

**Charlotte** as a *separate technology* name is reserved. Do not use Charlotte for new 187WEB operator, crawler, or module branding.

---

## Historical map

| Historical term | Location class | Action |
|-----------------|----------------|--------|
| Charlotte (operator) | AGENTS, ecosystem skill, showcase | Migrate to NATASHA |
| CHAR / char / ch | aliases, command reference, docs/187-CHAR.md | Map to SCOUT; deprecation notice |
| agent-charlotte | skill folder | Deprecated router → natasha-scout |
| neuro-toxin | skill folder | Deprecated router → neuro-tension |
| widow-weaver / swarm-mind / silk-sandbox | skills | Keep; THREAD / CORD / LAB |
| Changelog / old plans | historical | Allowlist; do not rewrite history |

---

## Alias compatibility

| Incoming alias | Resolves to | Notice |
|----------------|-------------|--------|
| `agent-charlotte` | `natasha-scout` | Deprecated |
| `char` / `ch` / `CHAR` | `natasha-scout` / SCOUT | Deprecated module name |
| `neuro-toxin` | `neuro-tension` | Deprecated |
| `tune` / `TUNE` | `neuro-tension` / TENSION | Compatibility alias |
| `thread` / `cord` / `lab` | unchanged | Active |

During the window, tools **must** accept legacy aliases and **must** emit a one-line deprecation notice when they are used.

After window end: aliases may hard-fail or become silent maps only after a further ADR.

---

## Reserved-name policy

`scripts/check-reserved-names.mjs` fails CI if **Charlotte** / **agent-charlotte** / standalone **CHAR** appear outside the allowlist.

Allowlist includes (see script):

- This migration file  
- CHANGELOG and historical superpowers specs  
- Deprecated skill stubs  
- `docs/decisions/NATASHA-ADR-001-NAMING.md`  
- `config/reserved-names-allowlist.json`

---

## Compatibility behavior for agents

When a user or config loads a deprecated skill:

1. State that the skill is **deprecated**.  
2. Load the replacement skill.  
3. Do not implement fingerprint spoofing or auth bypass (removed from SCOUT contract).  
4. Continue the user task under the replacement.

---

## Rollback

1. Revert ecosystem skill to last v2 commit if needed.  
2. Keep stubs so old aliases still resolve.  
3. Do not delete migration history.
