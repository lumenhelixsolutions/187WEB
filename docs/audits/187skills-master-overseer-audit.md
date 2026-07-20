# 187SKILLS Master Overseer Audit

## Audit metadata

| Field | Value |
|---|---|
| Date | 2026-07-09 |
| Branch | `claude/187skills-master-overseer-upgrade` |
| Runbook | `docs/runbooks/187web_master_overseer_repo_upgrade_runbook.md` |
| Auditor | 187OVERSEER (Kimi Code) |
| Autonomy level | L1 READ_ONLY_REPORT |

## Current inventory

### Canonical `.claude/skills` SKILL.md files

**Public short-name suite (existing):**

| Skill | Path | Status |
|---|---|---|
| 187REPO | `.claude/skills/187repo/SKILL.md` | exists |
| 187CRAFT | `.claude/skills/187craft/SKILL.md` | exists |
| 187VIBE | `.claude/skills/187vibe/SKILL.md` | exists |
| 187LAUNCH | `.claude/skills/187launch/SKILL.md` | exists |

**Ecosystem / manifest / core skills:**

| Skill | Path | Status |
|---|---|---|
| 187web-ecosystem | `.claude/skills/187web-ecosystem/SKILL.md` | exists |
| 187web-manifest | `.claude/skills/187web-manifest/SKILL.md` | exists |
| 187webdesign | `.claude/skills/187webdesign/SKILL.md` | exists |

**187WEBDEV portfolio skills:**

| Skill | Path | Status |
|---|---|---|
| 187webdev-code-review | `.claude/skills/187webdev-code-review/SKILL.md` | exists |
| 187webdev-design-system | `.claude/skills/187webdev-design-system/SKILL.md` | exists |
| 187webdev-qa | `.claude/skills/187webdev-qa/SKILL.md` | exists |
| 187webdev-resilience | `.claude/skills/187webdev-resilience/SKILL.md` | exists |
| 187webdev-templates | `.claude/skills/187webdev-templates/SKILL.md` | exists |
| 187webdev-trends | `.claude/skills/187webdev-trends/SKILL.md` | exists |

**Manifest prompt skills (27 total):**

`a11y-linting-agent`, `agent-charlotte`, `ai-ethics-reviewer`, `annual-report-synthesizer`, `auto-doc-generator`, `component-library-weaver`, `copy-conversion-linter`, `document-summarization`, `edge-ai-deployment-specialist`, `email-follow-up`, `generative-drafting`, `linguistic-translation`, `llm-deployment-architect`, `ml-systems-architect`, `multimodal-agent-designer`, `neuro-toxin`, `npu-performance-linter`, `pdf-dialogue`, `persona-simulation-testing`, `responsive-breakpoint-debugger`, `s-agent-spatial-architect`, `seo-semantic-optimizer`, `silk-sandbox`, `state-machine-generator`, `stylistic-unification`, `swarm-mind`, `task-identification-extraction`, `tone-adjustment-polishing`, `ui-aesthetic-auditor`, `user-journey-mapper`, `widow-weaver`, `xss-vulnerability-scanner`.

### Public app / showcase routes

| Route | File | Status |
|---|---|---|
| `/` | `app/page.tsx` | exists |
| `/187repo` | `app/187repo/page.tsx` | exists |
| `/install` | `app/install/page.tsx` | exists |
| `/187ai-eye` | `app/187ai-eye/page.tsx` | exists |
| `/resilience` | `app/resilience/page.tsx` | exists |
| `/templates` | `app/templates/page.tsx` | exists |

### Docs

| Doc | Path | Status |
|---|---|---|
| Architecture | `docs/ARCHITECTURE.md` | exists |
| Deployment | `docs/DEPLOYMENT.md` | exists |
| Design system | `docs/DESIGN-SYSTEM.md` | exists |
| Getting started | `docs/GETTING-STARTED.md` | exists |
| Install | `docs/INSTALL.md` | exists |
| Model adapters | `docs/MODEL-ADAPTERS.md` | exists |
| Master runbook | `docs/runbooks/187web_master_overseer_repo_upgrade_runbook.md` | added this branch |

### Model adapter roots

| Adapter | Root | Status |
|---|---|---|
| Grok | `.grok/skills/` | exists |
| Gemini | `.gemini/skills/` | exists |
| Kimi | `.kimi/skills/` | exists |
| ChatGPT | `.chatgpt/skills/` | exists |
| Ollama | `.ollama/modelfiles/` | exists |
| Herme | `.herme/agents/` | exists |

### CLI / installer scripts

| Script | Path | Status |
|---|---|---|
| 187repo.sh | `scripts/187repo.sh` | exists |
| 187repo.ps1 | `scripts/187repo.ps1` | exists |
| 187init.sh | `scripts/187init.sh` | exists |
| 187init.ps1 | `scripts/187init.ps1` | exists |
| 187power.sh | `scripts/187power.sh` | exists |
| 187power.ps1 | `scripts/187power.ps1` | exists |
| Manifest index generator | `scripts/generate-manifest-index.py` | exists |
| Model adapter generator | `scripts/generate-model-adapters.py` | exists |
| K2.7 overseer runner | `187overseer.sh` / `187overseer.ps1` | added this branch |

## Gap analysis vs target 187SKILLS suite

### Missing first-class skills

| Skill | Target public surface | Priority |
|---|---|---|
| 187FREE | `/187free` | high |
| 187RESEARCH | `/187research` | high |
| 187SEO | `/187seo` | high |
| 187REVENUE | `/187revenue` | high |
| 187DOCS | `/187docs` | high |
| 187LEARN | `/187learn` | high |
| 187TEST | `/187test` | high |
| 187ACCESS+ | `/187access` | high |
| 187VERSION | `/187version` | high |
| 187PUBLISH | `/187publish` | high |

### Missing suite-wide subskills

| Subskill | Consumers |
|---|---|
| 187WRITE | DOCS, LEARN, SEO, REVENUE, LAUNCH, RESEARCH |
| 187INCLUDE | ACCESS+, DOCS, LEARN, TEST, SEO, REVENUE, PUBLISH |

### Missing app pages

`/187free`, `/187research`, `/187seo`, `/187revenue`, `/187docs`, `/187learn`, `/187test`, `/187access`, `/187version`, `/187publish`.

### Missing docs

Per the runbook, each first-class skill needs a dedicated docs file:

`docs/187FREE.md`, `docs/187RESEARCH.md`, `docs/187SEO.md`, `docs/187REVENUE.md`, `docs/187DOCS.md`, `docs/187LEARN.md`, `docs/187TEST.md`, `docs/187ACCESS.md`, `docs/187VERSION.md`, `docs/187PUBLISH.md`, `docs/187WRITE.md`, `docs/187INCLUDE.md`, plus `docs/ROUTING.md`, `docs/RELEASE-GATE.md`, `docs/SHOWCASE-SYNC.md`.

### Missing validation / CI

| Script | Purpose |
|---|---|
| `scripts/validate-skills.mjs` | Validate canonical skill shape |
| `scripts/validate-suite-release.mjs` | Validate release gate |
| `scripts/check-docs-drift.mjs` | Detect docs drift |
| `scripts/check-adapter-drift.mjs` | Detect adapter drift |
| `scripts/check-showcase-sync.mjs` | Detect showcase drift |

### Structural gaps

- No universal skill contract with version frontmatter (`suite`, `skill_version`, `contract_version`, etc.).
- `187VIBE` still lists research as a primary category; should narrow to delight/community/retention.
- `187LAUNCH` still owns SEO/revenue as primary categories; should hand those to `187SEO` and `187REVENUE`.
- `187web-ecosystem` and `187web-manifest` routers need expansion to the full 14+2 suite.
- Adapter generator uses a hardcoded `D:/projects/187webdesign` root; not portable.

## Risk notes

- Revenue, accessibility, inclusion, and medical/legal/disability content must pass human review gates before any public page ships.
- No payment, affiliate, dropshipping, or accessibility claims should be made without evidence and review.
- All public pages must be reviewed by `187ACCESS+` and `187INCLUDE` before publish.

## Recommended phase order

1. **Phase 0 (this audit)** — approved.
2. **Phase 1** — Universal skill contract with version frontmatter.
3. **Phase 2** — Add missing canonical first-class skills (no public pages, no CLI yet).
4. **Phase 3** — Update ecosystem router, manifest, existing skills, AGENTS.md, README.md.
5. **Phase 4** — CLI / installer route expansion.
6. **Phase 5** — Public showcase pages.
7. **Phase 6** — Fix adapter generator root and regenerate adapters.
8. **Phase 7** — Validation scripts + CI gates.
9. **Phase 8** — Release gate: VERSION → DOCS → WRITE → ACCESS+ → INCLUDE → SEO → PUBLISH.
