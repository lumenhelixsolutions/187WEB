# NATASHA v3 Baseline Audit

**Date:** 2026-07-12  
**Auditor:** Grok 4.5 Program Orchestrator (Phase 0)  
**Handoff:** `187WEB_NATASHA_v3_Grok_4_5_Code_Master_Handoff.md`  
**Integration branch:** `feat/natasha-v3-qchain`  
**Skill contract:** `docs/SKILL-CONTRACT.md` v2.0.0 (present)

---

## M0.1 Current baseline

| Field | Value |
|-------|--------|
| Remote | `https://github.com/lumenhelixlab/187WEB.git` |
| Branch (audit start) | `main` → checked out `feat/natasha-v3-qchain` |
| **Observed baseline (handoff)** | `84917d05bfd29ee9c5995c695c09f9ad64c6dccf` |
| **Current HEAD** | `13395e3716280e630cc2dc49430c3e08f652aca6` |
| Divergence | **YES** — `main` is **2 commits ahead** of observed baseline |
| Package name | `187webdesign` |
| Package version | **`0.2.0`** (release target handoff: `0.3.0`) |
| Working tree | clean at branch creation |

### Commits since observed baseline

```text
13395e3 rebrand: product-first launch page and README
0ba9068 Apply LumenHelix 187 brand kit to README and docs/ launch page
84917d0 Redesign 187WEB showcase around abilities and outcomes  ← observed baseline
```

**Implication:** Rebase handoff plan onto `13395e3`. Do **not** reset to `84917d0`. Preserve brand-kit and product-first launch work; NATASHA work must not re-skin logos/mascot (handoff visual boundary aligns with recent brand commits).

---

## Key path inventory (handoff §3.1)

| Path | Present | Notes |
|------|---------|--------|
| `README.md` | yes | Product-first after rebrand commits |
| `AGENTS.md` | yes | Mentions Charlotte ecosystem |
| `PLAN.md` | yes | |
| `docs/SKILL-CONTRACT.md` | yes | |
| `docs/ROUTING.md` | yes | THREAD/TUNE/CORD/**CHAR**/LAB |
| `docs/187-INSTALL-PROFILES.md` | yes | |
| `.claude/skills/187web-ecosystem/SKILL.md` | yes | Still titled Ecosystem v2 Charlotte |
| `.claude/skills/widow-weaver/SKILL.md` | yes | |
| `.claude/skills/neuro-toxin/SKILL.md` | yes | |
| `.claude/skills/swarm-mind/SKILL.md` | yes | |
| `.claude/skills/agent-charlotte/SKILL.md` | yes | |
| `.claude/skills/silk-sandbox/SKILL.md` | yes | |
| `scripts/lib/suite-constants.mjs` | yes | FIRST_CLASS_SKILLS only (no NATASHA/quantum/chain) |
| `scripts/validate-skills.py` | yes | |
| `scripts/validate-suite-release.mjs` | yes | |
| `scripts/check-adapter-drift.mjs` | yes | |
| `scripts/check-docs-drift.mjs` | yes | |
| `scripts/check-showcase-sync.mjs` | yes | |
| `scripts/generate-model-adapters.py` | yes | |
| `scripts/generate-skill-docs.py` | yes | |
| `config/187-aliases.json` | yes | `char`/`ch`/`agent-charlotte` → char |
| `config/187-command-reference.json` | yes | CHAR module id |
| `lib/skill-showcase-data.ts` | yes | |
| `.grok/skills/` | yes | ~48 skill dirs; **canonical edits = `.claude/skills/` first** |
| `npm run reserved-names:check` | **no** | Must add Phase 1 |
| `tools/natasha/` | **no** | Phase 3 |
| `tests/natasha`, `tests/qchain` | **no** | Phase 3–5 |

### Package scripts observed

`lint`, `typecheck`, `skills:validate`, `release:validate`, `docs:drift`, `adapters:generate`, `adapters:drift`, `showcase:sync`, `test` (+ watch/ui).

---

## M0.2 Terminology inventory

### Hit counts (files, excluding `node_modules` / `.next`)

| Term | Files (approx) | Classification |
|------|----------------|----------------|
| `Charlotte` | 15 | **Migrate** active operator/module narrative → NATASHA; keep history/changelog |
| `agent-charlotte` | 12 | **Deprecate** skill id → `natasha-scout` + stub |
| `CHAR` / `char` | 19+ | **Rename active module** CHAR → SCOUT; alias migration |
| `neuro-toxin` | 9 | **Deprecate** → `neuro-tension` / TENSION |
| `widow-weaver` | 10 | **Preserve** + THREAD upgrade |
| `swarm-mind` | 11 | **Preserve** + CORD upgrade |
| `silk-sandbox` | 10 | **Preserve** + LAB upgrade |
| `187web-ecosystem` | 7 | **Rewrite** as v3 NATASHA index |

### High-signal active surfaces (must migrate in Phase 1+)

| Path | Role |
|------|------|
| `.claude/skills/187web-ecosystem/SKILL.md` | Ecosystem index still Charlotte v2 |
| `docs/187-MODULES.md` | THREAD/TUNE/CORD/**CHAR**/LAB |
| `docs/187-CHAR.md` | Dedicated CHAR scout doc |
| `docs/ROUTING.md` | CHAR routing row |
| `docs/INSTALL.md` | CHAR install mapping |
| `docs/187-COMMANDS.md` | `/187 ch` → CHAR |
| `docs/187-NAMES.md` | char aliases |
| `docs/187-ABILITIES.md` | CHAR in module list |
| `docs/187-KERNEL.md` | CHAR links |
| `docs/MODEL-ADAPTERS.md` | CHAR in module adapters |
| `docs/SHOWCASE-SYNC.md` | CHAR checklist |
| `config/187-aliases.json` | `char`, `ch`, `agent-charlotte` |
| `config/187-command-reference.json` | CHAR command id |
| `components/187/command-data.ts` | UI command data |
| `components/showcase/Showcase.tsx` | Showcase copy |
| `AGENTS.md` | Agent guidance |

### Allowlist candidates (Charlotte may remain)

| Path | Why allowlist |
|------|----------------|
| `CHANGELOG.md` | Historical |
| `docs/migrations/CHARLOTTE-TO-NATASHA.md` | Migration (to create) |
| Specs under `docs/superpowers/` | Historical design notes; migrate carefully or allowlist |
| Deprecated skill stubs | Explicit deprecation routers |
| Reserved-name allowlist file | Phase 1 script |

### Important pre-existing partial migration

The suite has **already** productized modules as:

```text
THREAD · TUNE · CORD · CHAR · LAB
```

Handoff maps:

| Current public module | v3 module | Skill |
|----------------------|-----------|--------|
| THREAD | THREAD | widow-weaver |
| TUNE | TENSION | neuro-tension (new) / neuro-toxin stub |
| CORD | CORD | swarm-mind |
| CHAR | **SCOUT** | natasha-scout (new) / agent-charlotte stub |
| LAB | LAB | silk-sandbox |
| (none) | COMPRESS | token-web |
| (none) | SPARK | idea-spark |
| (none) | FUSE | part of CORD/synthesis |
| (none) | 187QUANTUM | 187quantum |
| (none) | 187CHAIN | 187chain |

**Conflict:** Handoff renames operator Charlotte → NATASHA and CHAR → SCOUT. Public docs still teach CHAR heavily. Phase 1 must treat CHAR as first-class rename with alias window, not a silent delete.

---

## M0.3 File ownership map (Phase 1–7)

| Owner role | Primary paths |
|------------|----------------|
| **Program Orchestrator** | `docs/plans/natasha-v3-master-sprint.md`, branch integration, PR, this audit |
| **Skill Contract Architect** | `.claude/skills/**/SKILL.md` (canonical), stubs, new skill trees |
| **Token Systems Engineer** | `.claude/skills/token-web/**`, compression tests |
| **Multi-Agent Architect** | `.claude/skills/swarm-mind/**`, FUSE docs, `tools/natasha/orchestrator/**` |
| **Quantum Architect** | `.claude/skills/187quantum/**`, quantum refs/templates |
| **Quantum Circuit Eng.** | `tools/qchain/quantum/**`, `tests/qchain/quantum/**` |
| **Smart Contract Sec.** | `.claude/skills/187chain/**` (security refs) |
| **DeFi Risk Analyst** | `.claude/skills/187chain/references/*defi*`, defi templates |
| **Sandbox Engineer** | `.claude/skills/silk-sandbox/**`, `tools/natasha/lab/**` |
| **Local Brain Integrator** | `docs/187suite-vault/_system/NATASHA*`, templates |
| **CLI/Installer** | `config/187-aliases.json`, `config/187-command-reference.json`, install scripts, profiles |
| **Public Surface** | `app/187natasha|187quantum|187chain/**`, `lib/skill-showcase-data.ts` |
| **Security Reviewer** | Reserved-name check, unsafe directive removal, chain auth scope |
| **Validation/Release** | `scripts/lib/suite-constants.mjs`, generators, CI, CHANGELOG, package version |

### Single-owner (no parallel edit)

```text
scripts/lib/suite-constants.mjs
lib/skill-showcase-data.ts
README.md
AGENTS.md
CHANGELOG.md
config/187-aliases.json
config/187-command-reference.json
.claude/skills/187web-ecosystem/SKILL.md
package.json (version/scripts)
```

### Adapter rule

- **Edit:** `.claude/skills/` only for skill semantics.  
- **Generate:** `.grok/skills/` and other model adapters via `npm run adapters:generate`.  
- **Do not** hand-edit Grok mirrors as source of truth.

---

## M0.4 Dependency DAG

See `docs/plans/natasha-v3-master-sprint.md` for full sprint DAG.

```text
Phase 0 (this audit) ──► Phase 1 identity
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
         Phase 2           Phase 4         Phase 5
      cognitive core      187QUANTUM      187CHAIN
              │               │               │
              └───────┬───────┴───────┬───────┘
                      ▼               │
                 Phase 3 runtime ◄────┘
                 (CORD/SCOUT/LAB + tools/natasha)
                      │
                      ▼
                 Phase 6 packs/CLI/brain/public
                      │
                      ▼
                 Phase 7 adapters/release/PR
```

**Safe parallel after Phase 1:** Lane A (THREAD/COMPRESS/TENSION/SPARK), Lane B (quantum skill+fixtures), Lane C (chain skill+fixtures), Lane D (CLI/public scaffolds without registry collision).

---

## Conflicts: handoff vs repository

| # | Conflict | Resolution |
|---|----------|------------|
| 1 | Baseline SHA behind `main` by 2 commits | Branch from `13395e3`; record brand commits as must-preserve |
| 2 | Package already `0.2.0`; target `0.3.0` | Compatible; Phase 7 bumps to 0.3.0 |
| 3 | Modules already THREAD/TUNE/CORD/CHAR/LAB (not raw Charlotte skill names in UI) | Migrate CHAR→SCOUT, TUNE→TENSION labeling; keep THREAD/CORD/LAB |
| 4 | Ecosystem skill still “v2 Charlotte” | Phase 1 rewrite to v3 NATASHA |
| 5 | No `reserved-names:check` script | Phase 1 deliverable |
| 6 | Suite constants lack quantum/chain/natasha | Phase 7 (+ progressive registration as skills land) |
| 7 | Charlotte technology reserved vs generic operator | ADR-001; allowlist historical docs |
| 8 | Visual rebrand already applied (0ba9068, 13395e3) | **Do not** re-art-direct; integrate NATASHA into existing system only |
| 9 | Handoff “Charlotte crawler” vs docs “CHAR shared scout” | Same migration target: SCOUT / natasha-scout |

---

## Proposed parallel subagent lanes (post Phase 1)

| Lane | Roles | Owned files (summary) |
|------|-------|------------------------|
| **A** | THREAD + COMPRESS + TENSION + SPARK | widow-weaver, token-web, neuro-tension, idea-spark, stubs |
| **B** | 187QUANTUM + circuit eng | `.claude/skills/187quantum/**`, early `tests/qchain/quantum` |
| **C** | 187CHAIN + DeFi | `.claude/skills/187chain/**`, early `tests/qchain/chain` |
| **D** | CLI/public inventory | command docs inventory only until Phase 6; no suite-constants edits |
| **Serial** | Orchestrator | registry, showcase, README, release, reserved-names CI |

---

## Gate status (Phase 0)

| Deliverable | Status |
|-------------|--------|
| Baseline verified | done |
| Branch `feat/natasha-v3-qchain` | done |
| This audit | done |
| Terminology inventory | done (this file) |
| File ownership map | done (this file) |
| Dependency DAG | done (+ master sprint) |
| ADRs 001–002 | done (sibling files) |
| Implementation | **blocked until Phase 0 commit** |

---

## Phase Entry / Exit (Phase 0)

```yaml
phase_entry:
  phase: 0
  base_commit: 13395e3716280e630cc2dc49430c3e08f652aca6
  objective: Reconnaissance, branch, audit, DAG, no implementation
  active_subagents: [program-orchestrator, repository-archaeologist]
  file_owners:
    program-orchestrator: [docs/audits/**, docs/plans/natasha-v3-master-sprint.md, docs/decisions/**]
  dependencies: []
  commands_planned: [git fetch, inventory, rg terminology]
  risks: [baseline divergence, CHAR public surface volume]
  expected_gate: Phase 0 artifacts committed; no skill/runtime edits yet
```

```yaml
phase_exit:
  phase: 0
  status: complete_pending_commit
  commits: []  # filled after commit
  files_added:
    - docs/audits/natasha-v3-baseline-audit.md
    - docs/plans/natasha-v3-master-sprint.md
    - docs/decisions/NATASHA-ADR-001-NAMING.md
    - docs/decisions/NATASHA-ADR-002-MODULE-BOUNDARIES.md
  files_modified: []
  commands_run: [git fetch, git rev-parse, rg inventories]
  validation: manual audit complete; npm gates deferred to Phase 1+
  deviations:
    - "main HEAD 13395e3 ≠ handoff observed 84917d0 (+2 brand commits)"
  unresolved:
    - "Exact allowlist for reserved-names.mjs content (Phase 1)"
    - "Whether public module label TUNE renames to TENSION in UI copy or only skill id"
  next_phase: 1
```
