# NATASHA-ADR-001 — Naming and Charlotte boundary

**Status:** Accepted (Phase 0)  
**Date:** 2026-07-12  
**Deciders:** Program Orchestrator (per NATASHA v3 handoff)

---

## Context

187WEB v2 marketed a Charlotte operator (Black Widow metaphor) and module **CHAR** (shared scout). The v3 handoff introduces **NATASHA** as the sole 187WEB multi-agent operator architecture and reserves **Charlotte** for a separate technology.

Active surfaces still use Charlotte / CHAR / agent-charlotte extensively.

## Decision

1. **NATASHA** is the canonical 187WEB v3 operator and orchestration architecture name.  
2. **Charlotte** must not be used as the generic 187WEB operator, mascot-as-module, crawler brand, or new skill name.  
3. **Charlotte** may appear only in:  
   - `docs/migrations/CHARLOTTE-TO-NATASHA.md`  
   - CHANGELOG / historical specs  
   - deprecated skill stubs that **redirect** to NATASHA skills  
   - explicit reserved-name allowlist entries  
   - documentation that clearly names the **separate Charlotte technology** (if any)  
4. Module rename: public **CHAR** → **SCOUT** (skill `natasha-scout`).  
5. Inference skill: **neuro-toxin** → **neuro-tension** (module **TENSION**); keep `neuro-toxin` as deprecated router to TUNE/TENSION.  
6. Aliases `char`, `ch`, `agent-charlotte` remain during compatibility window but resolve to SCOUT guidance, not new Charlotte features.  
7. Existing module names **THREAD**, **CORD**, **LAB** retained; **TUNE** may remain as user-facing alias for **TENSION** during window (decision finalized in Phase 1 UI copy pass).

## Consequences

- Phase 1 implements migration doc, stubs, and `scripts/check-reserved-names.mjs`.  
- Public docs and command reference must stop teaching Charlotte as the live operator.  
- Brand artwork is **not** renamed or redrawn under this ADR (visual boundary separate).

## Rejected options

| Option | Why rejected |
|--------|----------------|
| Keep Charlotte as operator name | Conflicts with handoff reserved-name policy |
| Hard-delete all Charlotte strings in one commit | Breaks history and migration clarity |
| Rename THREAD/CORD/LAB | Unnecessary churn; already public |

## Reversible?

Yes — stubs and aliases can be extended; irreversible only after compatibility window ends (date TBD in migration doc, Phase 1).
