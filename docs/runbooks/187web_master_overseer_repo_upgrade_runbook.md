# 187WEB / 187SKILLS Master Repo Upgrade Runbook

**File purpose:** one-sprint, multi-overseer-agent / specialized-subagent master upgrade instruction  
**Target repo:** `lumenhelixsolutions/187WEB`  
**Run mode:** plan-first, approval-gated, report-driven  
**Default branch:** `claude/187skills-master-overseer-upgrade`  
**Primary trigger:** `187`, `187 this`, `187 audit this`, `187 make this better`

---

## 0. Prime Directive

Upgrade the 187WEB repository into the full 187SKILLS operating suite with a front-door diagnostic layer, internal/external scanning, prefab templates, modern website/app/social/work kits, standards enforcement, goal-achieving workflow assistants, versioning, documentation, accessibility/inclusion review, and GitHub Pages showcase synchronization.

This runbook is the master instruction for a single controlled sprint. It is not permission to edit `main`. It is not permission to publish, deploy, send messages, touch payments, or change user/private data.

**Default behavior: report first, execute second.**

---

## 1. Required Behavior for “187” Mentions

Any ambiguous mention of `187` must trigger this sequence:

```text
187COMMAND
  -> 187REPORT
  -> 187SCAN, if context exists and scan can be read-only
  -> 187FLOW
  -> approval options
  -> specialized subagents only after approval
```

### 1.1 Examples

```text
User: 187
Action: orientation report. No execution.

User: 187 this
Action: infer what “this” refers to, produce 187REPORT, list approvals.

User: 187 audit this site
Action: 187REPORT + 187SCAN read-only audit plan, then approval.

User: 187 make this launchable
Action: 187REPORT + 187FLOW mission card, then approval.
```

### 1.2 Default Mode

```text
READ_ONLY_REPORT
```

Allowed without approval:

```text
intent classification
read-only context scan
repo inventory
route recommendation
risk report
template/demo suggestions
approval matrix
```

Requires approval:

```text
file creation
file edits
deletes
moves
commits
pushes
PRs
app page changes
README/docs changes
installer changes
model adapter changes
```

Explicit approval required:

```text
deployment
publishing
sending emails/messages
calendar changes
payment changes
affiliate links
coupon/deal publication
dropshipping supplier actions
identity/pronoun data handling
legal/medical/financial/disability claims
public research claims
```

Human review required:

```text
WCAG compliance claims
ADA/508/legal claims
health/disability support claims
tax/payment advice
high-stakes testing
public research claims
public revenue claims
```

---

## 2. Final Suite Architecture

### 2.1 Public First-Class Skills

```text
187REPO        repo generation, deploys, installers, orchestration
187CRAFT       design, frontend, UX, components
187VIBE        delight, onboarding, retention, community
187LAUNCH      GTM, campaigns, validation, outreach
187FREE        free-tier / open-source / no-cost solution engine
187RESEARCH    source-backed research, databases, labs, reproducibility
187SEO         ethical SEO and search visibility
187REVENUE     pricing, payments, affiliate, coupons, dropshipping
187DOCS        documentation, instructions, SOPs, README systems
187LEARN       courses, study plans, lessons, learning paths
187TEST        quizzes, tests, polls, surveys, rubrics
187ACCESS+     disability accessibility, neurodivergence, WCAG+, inclusion review
187VERSION     versioning, changelogs, releases, compatibility
187PUBLISH     docs/demo/showcase sync after every upgrade
```

### 2.2 Suite-Wide Subskills

```text
187WRITE       content writing, editing, copy, scripts, plain language
187INCLUDE     inclusive language, pronouns, LGBTQ+ support, identity-safe UX
```

### 2.3 Control Plane Skills

```text
187COMMAND     universal trigger, intake, Q&A, router
187REPORT      first-response diagnostic and approval artifact
187SCAN        internal/external web, repo, app, docs, social, and product analysis
187KIT         templates, modules, prefab demos, pattern library
187STANDARD    suite-wide quality law and scoring engine
187FLOW        goal-to-execution mission integrator
```

### 2.4 Profiles and Aliases

```text
187WCAG+       technical accessibility audit profile inside 187ACCESS+
187CARE        consent-first support/accommodation alias inside 187ACCESS+
187HELP        alias to 187COMMAND help mode
187AUDIT       alias to 187SCAN
187TEMPLATE    alias to 187KIT
187DEMO        alias to 187KIT demo mode
187GOAL        alias to 187FLOW
```

---

## 3. Overseer Agent System

### 3.1 Supreme Overseer: 187OVERSEER

**Role:** global sprint controller.  
**Loads first:** always.

Responsibilities:

```text
enforce plan-first behavior
maintain approval gates
dispatch subagents
prevent scope drift
prevent unsafe execution
maintain release pipeline
verify all mandatory surfaces are synchronized
produce final PR summary
```

Non-negotiable rules:

```text
Do not push to main.
Do not delete without approval.
Do not publish without approval.
Do not bypass 187REPORT.
Do not skip 187ACCESS+ or 187INCLUDE for public surfaces.
Do not skip 187VERSION or 187PUBLISH for suite upgrades.
```

### 3.2 Deputy Overseers

```text
187COMMAND   controls trigger and intake
187REPORT    creates approval artifact
187FLOW      converts goal to mission plan
187STANDARD  enforces quality gates
187VERSION   controls release/version discipline
187PUBLISH   prevents docs/showcase drift
```

### 3.3 Specialized Subagents

```text
187REPO
187CRAFT
187VIBE
187LAUNCH
187FREE
187RESEARCH
187SEO
187REVENUE
187DOCS
187WRITE
187LEARN
187TEST
187ACCESS+
187INCLUDE
187SCAN
187KIT
```

Each subagent must report:

```text
scope accepted
inputs used
files affected
risks found
recommendations
approval needed
done criteria
```

---

## 4. 187REPORT Required Format

Every ambiguous `187` trigger produces this artifact:

```markdown
# 187REPORT

## 1. Target Detected
What “this” appears to refer to.

## 2. Confidence
High / Medium / Low, with reason.

## 3. Intent Read
What the user likely wants.

## 4. Object Type
Repo / app / website / document / course / product / social post / research / revenue system / unknown.

## 5. Suite Route
Recommended skill chain.

## 6. Findings
Visible facts from current context.

## 7. Opportunities
What can be improved or built.

## 8. Risks / Constraints
Technical, legal, privacy, accessibility, inclusion, SEO, research, revenue, publishing.

## 9. Approvals Needed
Exact approval gates.

## 10. Updates Expected
Files, docs, app routes, README, showcase, adapters, changelog, CI.

## 11. Suggested First Move
Safest next action.

## 12. Execution Options
A. Plan only
B. Safe scan only
C. Create branch and canonical files
D. Full implementation through publish gate

## 13. Questions
Maximum 3 questions, only if needed.
```

Reports should be saved under:

```text
docs/reports/
```

Example:

```text
docs/reports/187report-YYYY-MM-DD-master-overseer-upgrade.md
```

---

## 5. 187SCAN Scope

### 5.1 Internal Scan Modes

```text
REPO_SCAN
APP_ROUTE_SCAN
DOCS_SCAN
SKILL_SCAN
README_SCAN
CI_SCAN
PACKAGE_SCAN
ACCESSIBILITY_SCAN
SEO_SCAN
CONTENT_SCAN
DEMO_SCAN
SHOWCASE_SCAN
TEMPLATE_GAP_SCAN
RELEASE_DRIFT_SCAN
ADAPTER_DRIFT_SCAN
```

### 5.2 External Scan Modes

```text
PUBLIC_SITE_SCAN
COMPETITOR_SCAN
REFERENCE_SITE_SCAN
SERP_SCAN
SOCIAL_SURFACE_SCAN
BRAND_FOOTPRINT_SCAN
TECH_STACK_SCAN
PERFORMANCE_SCAN
ACCESSIBILITY_SCAN
CONTENT_GAP_SCAN
REVENUE_SURFACE_SCAN
COMMUNITY_SCAN
```

### 5.3 Tool Categories

```text
Lighthouse / PageSpeed
Playwright / browser rendering
axe-core / accessibility scan
sitemap / robots / canonical checks
Open Graph / social preview checks
schema / structured data checks
link checking
screenshot comparison
package/dependency health
GitHub repo scan
README/docs drift scan
Search Console exports when available
analytics exports when available
```

Hard limits:

```text
No authentication bypass.
No paywall bypass.
No private endpoint scraping.
No aggressive crawling.
No unauthorized SERP scraping.
Respect robots.txt, terms, rate limits, and user authorization.
```

---

## 6. 187KIT System

187KIT stores modern reusable kits, modules, and prefab demos.

### 6.1 Kit Families

```text
Website Kits
App Kits
Dashboard Kits
Social Media Kits
Work/Ops Kits
Research/Lab Kits
Revenue/Commerce Kits
Learning/Course Kits
Accessibility/Inclusion Kits
Documentation Kits
Launch Kits
```

### 6.2 Required Prefab Demo Packs

```text
1. 187 Suite Product Showcase
2. SaaS Launch Page
3. AI Agent Command Center
4. Research Lab / Lattice Lab
5. Obsidian-to-Public Docs Site
6. Course Portal
7. Quiz/Test/Survey Portal
8. Affiliate/Coupon/Deal Site
9. Dropshipping Product Validator
10. Accessibility Audit Dashboard
11. Local Business Website
12. Civic Evidence Timeline
13. GitHub Repo Showcase
14. Social Launch Campaign Board
15. Client Work Portal
16. CRM / Lead Pipeline
17. Nonprofit / Community Hub
18. Newsletter / Content Engine
19. Portfolio / Creator Site
20. Internal Ops Dashboard
```

### 6.3 Kit Registry Schema

```yaml
kit_id:
name:
category:
surface:
best_for:
not_for:
skills_used:
files_created:
routes_created:
components:
data_model:
copy_blocks:
demo_data:
accessibility_notes:
inclusion_notes:
seo_notes:
revenue_notes:
free_stack:
dependencies:
acceptance_tests:
release_gate:
```

Create:

```text
docs/187-KIT-REGISTRY.md
docs/187-DEMO-REGISTRY.md
.claude/skills/187kit/templates/kit-card.md
.claude/skills/187kit/templates/demo-card.md
```

---

## 7. 187STANDARD Quality Matrix

Every public-facing output should receive a 100-point standard score.

```text
Goal fit                         15
User clarity / UX                10
Accessibility + inclusion        15
Performance                      10
Security + privacy               10
SEO / discoverability            10
Content quality                  10
Technical maintainability        10
Docs / version / publish sync    10
```

Mandatory gates:

```text
187STANDARD
187ACCESS+
187INCLUDE
187SEO
187VERSION
187PUBLISH
```

No public route, template, demo, social kit, work kit, app module, revenue page, quiz, course, checkout, or docs page ships without these gates.

---

## 8. 187FLOW Mission Card

Every goal-oriented request should produce a mission card.

```markdown
# 187FLOW Mission Card

## Goal
What the user wants.

## Target Surface
Repo / app / site / doc / course / revenue system / social / workflow.

## Skill Route
Ordered skill chain.

## Selected Kit or Demo
Suggested prefab.

## Assets Needed
Text, images, repo files, URLs, data, credentials, approvals.

## Milestones
Small execution steps.

## Acceptance Criteria
What done means.

## Risks
Technical, accessibility, inclusion, SEO, revenue, legal, privacy.

## Release Gate
Version, docs, write, access, include, SEO, publish.

## Approval Options
A/B/C execution choices.
```

---

## 9. Repo File Plan

### 9.1 Create Control Plane Skills

```text
.claude/skills/187command/SKILL.md
.claude/skills/187report/SKILL.md
.claude/skills/187scan/SKILL.md
.claude/skills/187kit/SKILL.md
.claude/skills/187standard/SKILL.md
.claude/skills/187flow/SKILL.md
```

### 9.2 Create Domain Skills

```text
.claude/skills/187free/SKILL.md
.claude/skills/187research/SKILL.md
.claude/skills/187seo/SKILL.md
.claude/skills/187revenue/SKILL.md
.claude/skills/187docs/SKILL.md
.claude/skills/187write/SKILL.md
.claude/skills/187learn/SKILL.md
.claude/skills/187test/SKILL.md
.claude/skills/187access-plus/SKILL.md
.claude/skills/187include/SKILL.md
.claude/skills/187version/SKILL.md
.claude/skills/187publish/SKILL.md
```

### 9.3 Update Existing Skills

```text
.claude/skills/187repo/SKILL.md
.claude/skills/187craft/SKILL.md
.claude/skills/187vibe/SKILL.md
.claude/skills/187launch/SKILL.md
.claude/skills/187web-ecosystem/SKILL.md
.claude/skills/187web-manifest/SKILL.md
```

### 9.4 Mirror and Adapters

Mirror:

```text
.grok/skills/*
```

Regenerate:

```text
.gemini/skills/*
.kimi/skills/*
.chatgpt/skills/*
.ollama/modelfiles/*
.herme/agents/*
```

---

## 10. Documentation Plan

Create:

```text
docs/187COMMAND.md
docs/187REPORT.md
docs/187SCAN.md
docs/187KIT.md
docs/187STANDARD.md
docs/187FLOW.md
docs/187FREE.md
docs/187RESEARCH.md
docs/187SEO.md
docs/187REVENUE.md
docs/187DOCS.md
docs/187WRITE.md
docs/187LEARN.md
docs/187TEST.md
docs/187ACCESS.md
docs/187INCLUDE.md
docs/187VERSION.md
docs/187PUBLISH.md
docs/187-KIT-REGISTRY.md
docs/187-DEMO-REGISTRY.md
docs/187-STANDARDS.md
docs/ROUTING.md
docs/RELEASE-GATE.md
docs/SHOWCASE-SYNC.md
docs/reports/
```

Update:

```text
README.md
AGENTS.md
PLAN.md
CHANGELOG.md
CONTRIBUTING.md
docs/INSTALL.md
docs/MODEL-ADAPTERS.md
```

---

## 11. GitHub Pages / Product Showcase Plan

Create:

```text
app/187/page.tsx
app/187report/page.tsx
app/187scan/page.tsx
app/187kit/page.tsx
app/187demo/page.tsx
app/187standard/page.tsx
app/187flow/page.tsx
app/187free/page.tsx
app/187research/page.tsx
app/187seo/page.tsx
app/187revenue/page.tsx
app/187docs/page.tsx
app/187learn/page.tsx
app/187test/page.tsx
app/187access/page.tsx
app/187version/page.tsx
app/187publish/page.tsx
```

Update:

```text
app/page.tsx
app/187repo/page.tsx
app/install/page.tsx
app/187ai-eye/page.tsx
lib/content.ts
components/showcase/*
components/ecosystem/*
```

Homepage positioning:

```text
187COMMAND hears it.
187REPORT explains it.
187SCAN inspects it.
187FLOW plans it.
187KIT equips it.
187STANDARD judges it.
187REPO orchestrates it.
187CRAFT builds it.
187VIBE humanizes it.
187LAUNCH distributes it.
187FREE lowers cost.
187RESEARCH proves claims.
187SEO makes it discoverable.
187REVENUE monetizes it.
187DOCS documents it.
187WRITE clarifies it.
187LEARN teaches it.
187TEST checks it.
187ACCESS+ includes disabled and neurodivergent users.
187INCLUDE protects identity and pronoun safety.
187VERSION controls change.
187PUBLISH prevents drift.
```

---

## 12. CLI Route Plan

Update:

```text
scripts/187repo.sh
scripts/187repo.ps1
install.sh
install.ps1
docs/INSTALL.md
app/install/page.tsx
```

Add:

```bash
187repo.sh 187
187repo.sh command
187repo.sh report
187repo.sh scan
187repo.sh audit
187repo.sh kit
187repo.sh template
187repo.sh demo
187repo.sh standard
187repo.sh flow
187repo.sh goal
187repo.sh free
187repo.sh research
187repo.sh seo
187repo.sh revenue
187repo.sh affiliate
187repo.sh deals
187repo.sh dropship
187repo.sh docs
187repo.sh write
187repo.sh learn
187repo.sh test
187repo.sh access
187repo.sh access-plus
187repo.sh wcag
187repo.sh wcag-plus
187repo.sh include
187repo.sh care
187repo.sh a11y
187repo.sh pronouns
187repo.sh version
187repo.sh publish
```

---

## 13. Validation and CI Plan

Create:

```text
scripts/validate-skills.mjs
scripts/validate-suite-release.mjs
scripts/check-docs-drift.mjs
scripts/check-adapter-drift.mjs
scripts/check-showcase-sync.mjs
scripts/check-kit-registry.mjs
scripts/check-report-gate.mjs
```

Add package scripts:

```json
{
  "skills:validate": "node scripts/validate-skills.mjs",
  "release:validate": "node scripts/validate-suite-release.mjs",
  "docs:drift": "node scripts/check-docs-drift.mjs",
  "adapters:generate": "python scripts/generate-model-adapters.py",
  "adapters:drift": "node scripts/check-adapter-drift.mjs",
  "showcase:sync": "node scripts/check-showcase-sync.mjs",
  "kit:validate": "node scripts/check-kit-registry.mjs",
  "report:gate": "node scripts/check-report-gate.mjs"
}
```

CI must fail if a first-class skill is missing from:

```text
README.md
AGENTS.md
docs/INSTALL.md
docs/MODEL-ADAPTERS.md
app/page.tsx
app/187repo/page.tsx
GitHub Pages showcase content
.claude/skills/187web-ecosystem/SKILL.md
.claude/skills/187web-manifest/SKILL.md
model adapters
CHANGELOG.md
```

CI must also fail if a first-class skill lacks:

```text
skill_version
manual triggers
automatic triggers
output contract
routing rules
safety rules
documentation path
public showcase entry
CLI route
acceptance tests
```

---

## 14. Sprint Phases

### Phase 0 — Read-Only 187REPORT and Inventory

Actions:

```bash
git checkout -b claude/187skills-master-overseer-upgrade
find .claude/skills -maxdepth 2 -name SKILL.md
find .grok/skills -maxdepth 2 -name SKILL.md
find .gemini .kimi .chatgpt .ollama .herme -maxdepth 3 -type f
grep -R "187REPO\|187CRAFT\|187VIBE\|187LAUNCH" README.md AGENTS.md docs app scripts .claude || true
npm install
npm run lint
npm run typecheck
npm run build
```

Deliverables:

```text
docs/reports/187report-master-overseer-upgrade.md
docs/audits/187skills-master-overseer-audit.md
```

Stop for approval.

---

### Phase 1 — Skill Contract and Standards

Create:

```text
docs/SKILL-CONTRACT.md
docs/187-STANDARDS.md
```

Define required skill frontmatter:

```yaml
name:
description:
suite:
skill_version:
contract_version:
last_updated:
last_verified:
status:
replaces:
deprecated:
compatible_with:
requires:
```

Stop for approval.

---

### Phase 2 — Control Plane Skills

Create:

```text
187COMMAND
187REPORT
187SCAN
187KIT
187STANDARD
187FLOW
```

No public app edits yet. Stop for approval.

---

### Phase 3 — Domain Skills

Create:

```text
187FREE
187RESEARCH
187SEO
187REVENUE
187DOCS
187WRITE
187LEARN
187TEST
187ACCESS+
187INCLUDE
187VERSION
187PUBLISH
```

Stop for approval.

---

### Phase 4 — Router and Manifest Upgrade

Update:

```text
187web-ecosystem
187web-manifest
187repo
187vibe
187launch
AGENTS.md
README.md
docs/ROUTING.md
```

Stop for approval.

---

### Phase 5 — Kit, Demo, Template Registries

Create:

```text
docs/187-KIT-REGISTRY.md
docs/187-DEMO-REGISTRY.md
.claude/skills/187kit/templates/*
```

Populate at least the 20 prefab demos listed in this runbook. Stop for approval.

---

### Phase 6 — CLI and Installer Upgrade

Update:

```text
scripts/187repo.sh
scripts/187repo.ps1
install.sh
install.ps1
docs/INSTALL.md
app/install/page.tsx
```

Stop for approval.

---

### Phase 7 — GitHub Pages / Product Showcase Upgrade

Create and update app pages listed in Section 11.

Stop for approval.

---

### Phase 8 — Adapter Generator and Model Adapters

Fix generator root:

```python
ROOT = Path(__file__).resolve().parents[1]
```

Run:

```bash
python scripts/generate-model-adapters.py
```

Update:

```text
docs/MODEL-ADAPTERS.md
```

Stop for approval.

---

### Phase 9 — Validators and CI

Create validators listed in Section 13.

Update:

```text
package.json
.github/workflows/*
```

Stop for approval.

---

### Phase 10 — Final Release Gate

Run this required sequence:

```text
187REPORT
187VERSION
187DOCS
187WRITE
187ACCESS+
187INCLUDE
187SEO
187STANDARD
187PUBLISH
```

Update:

```text
CHANGELOG.md
README.md
AGENTS.md
PLAN.md
docs/*
app/*
model adapter docs
GitHub Pages showcase
```

Final verification:

```bash
npm run lint
npm run typecheck
npm run build
npm run skills:validate
npm run release:validate
npm run docs:drift
npm run adapters:drift
npm run showcase:sync
npm run kit:validate
npm run report:gate
python scripts/generate-model-adapters.py
git status
```

---

## 15. Acceptance Tests

### Test 1 — Universal Trigger

```text
187
```

Expected:

```text
187COMMAND triggers.
187REPORT orientation mode prints.
No files edited.
```

### Test 2 — Ambiguous Target

```text
187 this
```

Expected:

```text
target detected
confidence stated
suite route proposed
approval options printed
no edits
```

### Test 3 — Audit Target

```text
187 audit this site
```

Expected:

```text
187REPORT -> 187SCAN -> 187SEO -> 187ACCESS+ -> 187STANDARD
approval required before edits
```

### Test 4 — Launchable App

```text
187 make this app launchable
```

Expected:

```text
187FLOW mission card
187KIT template suggestion
187CRAFT / 187SEO / 187REVENUE / 187ACCESS+ route
187VERSION + 187PUBLISH gate
```

### Test 5 — Template Request

```text
187 template for a modern course site
```

Expected:

```text
187KIT recommends Course Portal kit
187LEARN + 187DOCS + 187TEST + 187ACCESS+ + 187SEO route
```

### Test 6 — Revenue System

```text
187 revenue for affiliate coupons and dropshipping
```

Expected:

```text
187REVENUE route
affiliate disclosure gate
coupon freshness gate
dropshipping supplier-risk gate
refund/chargeback review
```

### Test 7 — Accessibility and Inclusion

```text
187ACCESS+ review this profile form
```

Expected:

```text
WCAG profile
keyboard/screen reader check
cognitive access
pronoun-safe and identity-safe review through 187INCLUDE
```

### Test 8 — Release Gate

```text
187 publish this upgrade
```

Expected:

```text
187REPORT
187VERSION
187DOCS
187WRITE
187ACCESS+
187INCLUDE
187SEO
187STANDARD
187PUBLISH
```

---

## 16. Commit Plan

```text
1. docs: add master overseer report and skill contract
2. skills: add 187 command/report/scan/kit/standard/flow
3. skills: add free/research/seo/revenue domain skills
4. skills: add docs/write/learn/test/access/include/version/publish
5. router: expand ecosystem and manifest routing
6. kit: add template and prefab demo registries
7. cli: add expanded 187 command aliases
8. app: add universal command and expanded suite showcase pages
9. adapters: fix generator root and regenerate model adapters
10. ci: add skill, release, docs, adapter, kit, report, and showcase validation
11. release: changelog, docs sync, accessibility/inclusion/SEO/publish gate
```

PR title:

```text
Expand 187WEB into 187SKILLS master overseer suite
```

PR summary:

```text
This PR evolves 187WEB into the full 187SKILLS multi-agent operating suite.
It adds a report-first universal 187 command layer, internal/external scanning,
template and prefab demo kits, suite standards, goal-to-execution workflows,
expanded domain skills, accessibility/inclusion gates, versioning, publishing,
CLI routes, model adapters, and validation to prevent documentation/showcase drift.
```

---

## 17. Paste-Ready Claude Code / Claudian Master Prompt

```text
/plan

You are the 187OVERSEER for the 187WEB repository.

Target repo:
lumenhelixsolutions/187WEB

Objective:
Run the master overseer upgrade sprint that evolves 187WEB into the 187SKILLS multi-agent suite with report-first command behavior, scanning, templates, prefab demos, standards, goal workflows, expanded domain skills, versioning, accessibility/inclusion, and publishing gates.

Default rule:
Any ambiguous “187” mention triggers 187COMMAND -> 187REPORT before execution.

Hard rules:
- Do not edit main.
- Create branch claude/187skills-master-overseer-upgrade.
- Do not delete files without approval.
- Do not publish or deploy without approval.
- Do not perform payment, affiliate, dropshipping, identity, legal, medical, disability, or public-claim actions without explicit approval.
- Do not bypass 187REPORT.
- Do not bypass 187ACCESS+ or 187INCLUDE for public surfaces.
- Do not bypass 187VERSION or 187PUBLISH for suite upgrades.
- Stop after each phase for approval.

Phase 0:
Run read-only inventory and produce docs/reports/187report-master-overseer-upgrade.md plus docs/audits/187skills-master-overseer-audit.md.
Stop for approval.

Phase 1:
Create docs/SKILL-CONTRACT.md and docs/187-STANDARDS.md.
Stop for approval.

Phase 2:
Create canonical control plane skills:
187command
187report
187scan
187kit
187standard
187flow
Stop for approval.

Phase 3:
Create canonical domain skills:
187free
187research
187seo
187revenue
187docs
187write
187learn
187test
187access-plus
187include
187version
187publish
Stop for approval.

Phase 4:
Update routers:
187web-ecosystem
187web-manifest
187repo
187vibe
187launch
AGENTS.md
README.md
docs/ROUTING.md
Stop for approval.

Phase 5:
Create kit and demo registries:
docs/187-KIT-REGISTRY.md
docs/187-DEMO-REGISTRY.md
187kit templates
Stop for approval.

Phase 6:
Update CLI and installers:
scripts/187repo.sh
scripts/187repo.ps1
install.sh
install.ps1
docs/INSTALL.md
app/install/page.tsx
Stop for approval.

Phase 7:
Update GitHub Pages product showcase and app routes.
Stop for approval.

Phase 8:
Fix adapter generator root to repo-relative.
Regenerate model adapters.
Update docs/MODEL-ADAPTERS.md.
Stop for approval.

Phase 9:
Add validators and CI gates.
Stop for approval.

Phase 10:
Run final release gate:
187REPORT
187VERSION
187DOCS
187WRITE
187ACCESS+
187INCLUDE
187SEO
187STANDARD
187PUBLISH

Final verification:
npm run lint
npm run typecheck
npm run build
npm run skills:validate
npm run release:validate
npm run docs:drift
npm run adapters:drift
npm run showcase:sync
npm run kit:validate
npm run report:gate
python scripts/generate-model-adapters.py
git status

Report files created, files modified, tests run, failures, manual steps, and PR summary.

Start Phase 0 only.
Do not create or modify files until Phase 0 plan is approved.
```

---

## 18. Final Operating Statement

```text
187COMMAND hears it.
187REPORT explains it.
187SCAN inspects it.
187FLOW plans it.
187KIT equips it.
187STANDARD judges it.
187REPO orchestrates it.
187CRAFT builds it.
187VIBE humanizes it.
187LAUNCH distributes it.
187FREE lowers cost.
187RESEARCH proves claims.
187SEO makes it discoverable.
187REVENUE monetizes it.
187DOCS documents it.
187WRITE clarifies it.
187LEARN teaches it.
187TEST checks it.
187ACCESS+ includes disabled and neurodivergent users.
187INCLUDE protects identity and pronoun safety.
187VERSION controls change.
187PUBLISH prevents drift.
```
