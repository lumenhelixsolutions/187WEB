# 187WEB → 187SKILLS Master Overseer Upgrade Report

## Report metadata

| Field | Value |
|---|---|
| Date | 2026-07-09 |
| Branch | `claude/187skills-master-overseer-upgrade` |
| Runbook | `docs/runbooks/187web_master_overseer_repo_upgrade_runbook.md` |
| Reporter | 187OVERSEER (Kimi Code) |
| Autonomy level | L1 READ_ONLY_REPORT |

## Executive summary

187WEB currently ships a four-skill public suite (`187REPO`, `187CRAFT`, `187VIBE`, `187LAUNCH`) backed by an ecosystem router, a manifest compiler, 27 prompt skills, and a small Next.js showcase. The master runbook expands this into **187SKILLS**, a 14-skill first-class operating system plus two suite-wide subskills (`187WRITE`, `187INCLUDE`) and an internal accessibility/inclusion alias layer (`187WCAG+`, `187CARE`).

This report is the Phase 0 gate. No files beyond this audit, this report, the runbook, and the K2.7 runner have been created or modified.

## Target architecture

```text
187REPO      orchestrates
187CRAFT     designs
187VIBE      delights / retains / community
187LAUNCH    ships / GTM
187FREE      no-cost stacks
187RESEARCH  source-backed labs
187SEO       discoverability
187REVENUE   ethical revenue systems
187DOCS      documentation system
187WRITE     suite-wide writing engine
187LEARN     courses / learning paths
187TEST      quizzes / surveys / rubrics
187ACCESS+   accessibility + inclusion
187INCLUDE   identity-safe language
187VERSION   releases / changelogs
187PUBLISH   final sync gate
```

## Phase 0 findings

1. **Skill gap:** 10 first-class skills and 2 subskills are missing from `.claude/skills/`.
2. **Showcase gap:** 10 public app routes are missing.
3. **Docs gap:** Per-skill docs and release-gate docs are missing.
4. **Contract gap:** No versioned universal skill contract exists.
5. **Validation gap:** No drift-check scripts or CI gates exist.
6. **Router gap:** Existing `187web-ecosystem` and `187web-manifest` skills need expansion.
7. **Tooling gap:** Adapter generator root is hardcoded.

## Risk-triggered gates

| Gate | Trigger | Mitigation |
|---|---|---|
| Revenue claims | Any `187REVENUE` output | Disclosure, freshness, supplier-risk, refund, and human review gates |
| Accessibility claims | Any `187ACCESS+` / public page | Evidence-based WCAG review; no unsubstantiated compliance claims |
| Inclusion claims | Any `187INCLUDE` / form / profile | Pronoun/name privacy, deadname-risk, consent controls |
| SEO claims | Any `187SEO` output | Google Search Essentials alignment; no ranking guarantees |
| Legal/medical/disability | Any public content | Human review required before publish |
| Payment/data | Any checkout/auth flow | Explicit consent, privacy notice, security review |

## Approval menu

The runbook recommends executing in three controlled batches.

### Batch A — Foundation

**Scope:**
- Phase 1: Universal skill contract (`docs/SKILL-CONTRACT.md`) with version frontmatter.
- Phase 2: Add all 12 missing canonical skill definitions (no app pages, no CLI wrappers, no runtime claims).

**Skills to create:**
`187free`, `187research`, `187seo`, `187revenue`, `187docs`, `187write`, `187learn`, `187test`, `187access-plus`, `187include`, `187version`, `187publish`.

### Batch B — Router, CLI, and Showcase

**Scope:**
- Phase 3: Update `187web-ecosystem`, `187web-manifest`, `187repo`, `187launch`, `187vibe`, `AGENTS.md`, `README.md`.
- Phase 4: Expand CLI/installer routes in `scripts/187repo.sh`, `scripts/187repo.ps1`, `install.sh`, `install.ps1`, `docs/INSTALL.md`, `app/install/page.tsx`.
- Phase 5: Create 10 new app showcase pages and update homepage/ecosystem surfaces.

### Batch C — Adapters, Validation, and Release Gate

**Scope:**
- Phase 6: Fix adapter generator root and regenerate all model adapters.
- Phase 7: Add validation scripts and CI gates.
- Phase 8: Run the permanent release pipeline (VERSION → DOCS → WRITE → ACCESS+ → INCLUDE → SEO → PUBLISH) and sync all surfaces.

## Progress log

### Batch A — Foundation ✅ COMPLETE

- Created `docs/SKILL-CONTRACT.md` v2.0.0 with required frontmatter and 16 contract sections.
- Added 12 canonical skills under `.claude/skills/`:
  - `187free`, `187research`, `187seo`, `187revenue`
  - `187docs`, `187write`, `187learn`, `187test`
  - `187access-plus`, `187include`, `187version`, `187publish`

### Batch B — Router, CLI, and Showcase ✅ COMPLETE

- **Phase 3:** Updated `187web-ecosystem`, `187web-manifest`, `187repo`, `187vibe`, `187launch`; refreshed `README.md`, `AGENTS.md`, and created `docs/ROUTING.md`.
- **Phase 4:** Expanded short-name CLI routes in `scripts/187repo.sh` and `scripts/187repo.ps1` for the full 187SKILLS suite; updated `install.sh`, `install.ps1`, `docs/INSTALL.md`, and `app/install/page.tsx`.
- **Phase 5:** Created 10 skill showcase pages:
  `/187free`, `/187research`, `/187seo`, `/187revenue`, `/187docs`, `/187learn`, `/187test`, `/187access`, `/187version`, `/187publish`.
  Updated `app/page.tsx`, `app/187repo/page.tsx`, `app/187ai-eye/page.tsx`, and `lib/content.ts`.

### Verification ✅

- `npm run lint` — no warnings or errors.
- `npm run typecheck` — passes.
- `npm run build` — passes.

## Current first-class skill count

16 first-class short-name skills + 2 suite-wide subskills (`187WRITE`, `187INCLUDE`).

## Recommended next action

Execute **Batch C** — fix the adapter generator root, regenerate all model adapters, add validation/CI gates, and run the permanent release pipeline (VERSION → DOCS → WRITE → ACCESS+ → INCLUDE → SEO → PUBLISH).
