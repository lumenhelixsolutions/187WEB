# NATASHA-ADR-002 — Module and skill boundaries

**Status:** Accepted (Phase 0)  
**Date:** 2026-07-12  
**Deciders:** Program Orchestrator (per NATASHA v3 handoff)

---

## Context

v3 adds cognitive modules (COMPRESS, SPARK, FUSE), renames scout/tension, and adds domain skills 187QUANTUM and 187CHAIN plus install packs. Boundaries must prevent skill sprawl and unsafe tool claims.

## Decision

### NATASHA core modules

| Module | Skill id (canonical) | Responsibility | Non-goals |
|--------|----------------------|----------------|-----------|
| THREAD | `widow-weaver` | Structural prompt/doc processing, Verification Record | Hidden CoT mandates |
| COMPRESS | `token-web` | Loss-bounded context capsules, metrics, NO_OP | Inventing missing requirements |
| TENSION | `neuro-tension` | Inference profile control | Claiming zero hallucinations |
| SPARK | `idea-spark` | Bounded diverge/critic/converge | Brand redesign brainstorming |
| CORD | `swarm-mind` | Subagent dispatch, ownership, retries, FUSE | Unbounded agent free-for-all |
| SCOUT | `natasha-scout` | Compliant research | Auth bypass, paywall bypass, fingerprint spoof |
| LAB | `silk-sandbox` | Isolated execution profiles | Live production exploitation |
| FUSE | (contract inside CORD + docs) | Evidence-weighted synthesis | Single-source absolutism |

### Domain skills

| Skill | Responsibility | Non-goals |
|-------|----------------|-----------|
| `187quantum` | Algorithm/circuit design, metrics, claim discipline | Unsupported quantum advantage claims |
| `187chain` | EVM-first assurance, DeFi risk separation | Live keys, live exploits, investment advice |

### Packs

| Pack | Contents |
|------|----------|
| `natasha` | Full NATASHA core + quantum + chain + lab/scout prerequisites |
| `qchain-lab` | Narrow quantum + chain + lab stack |

### Runtime layout

```text
tools/natasha/     # orchestration, compress, scout, lab (Phase 3)
tools/qchain/      # quantum/ + chain/ adapters (Phases 4–5)
```

Skills remain the **contracts**; tools are **optional executors**. Skills must degrade when tools absent.

### Canonical source

- Skills: `.claude/skills/`  
- Adapters: generated (incl. `.grok/skills/`)  
- Showcase/registry: single-owner files only  

## Consequences

- New skills start at `skill_version: 1.0.0`, ecosystem index `3.0.0` at release.  
- Suite constants and showcase updated only when skills exist and validate.  
- LAB profiles include `lab:quantum` and `lab:evm` as named profiles; offline fixtures first.

## Rejected options

| Option | Why rejected |
|--------|----------------|
| Put quantum/chain only as docs without skills | Breaks CLI/routing/showcase contract |
| One mega-skill for NATASHA | Violates specialist routing and token budgets |
| Edit Grok adapters as source | Causes permanent drift |

## Reversible?

Skill additions are reversible via deprecation; schema versions on packets (`packet_version: 1.0`) allow evolution.
