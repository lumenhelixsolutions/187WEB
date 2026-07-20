# 187WEB Master Repo Evolution Sprint

**Project:** 187WEB / 187SKILLS  
**Sprint Type:** Multi-agent / subagent repository evolution sprint  
**Status:** Plan for approval before execution  
**Prepared:** 2026-07-09  
**Target Repo:** `lumenhelixlab/187WEB`

---

## 0. Executive Summary

This sprint upgrades the existing 187WEB ecosystem from a four-skill public suite into a full multi-agent operating system for repo generation, design, launch, free-stack scouting, research, SEO, revenue, documentation, learning, testing, accessibility/inclusion, versioning, and publishing.

The sprint is not a rewrite. It is an evolutionary expansion of the current 187WEB architecture.

Current public suite:

```text
187REPO
187CRAFT
187VIBE
187LAUNCH
```

Target public suite:

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
187LEARN
187TEST
187ACCESS+
187VERSION
187PUBLISH
```

Suite-wide subskills:

```text
187WRITE
187INCLUDE
```

Internal profile / alias layer:

```text
187WCAG+  = technical accessibility audit profile inside 187ACCESS+
187CARE   = consent-first support/accommodation alias inside 187ACCESS+
```

Permanent release rule:

```text
No suite upgrade is complete until versioning, documentation, writing polish,
accessibility/inclusion review, model adapter sync, and the GitHub Pages product
showcase are updated.
```

---

## 1. Sprint Doctrine

### 1.1 Core Operating Principles

```text
Function first, language later.
Systems of cycles, not systems of disposal.
Best practices first, then controlled experimentation.
Separate research from product.
Separate proof from pattern.
Separate public claims from internal hypotheses.
Separate accessibility compliance from broader inclusion.
Separate launch attention from revenue architecture.
Separate documentation structure from content writing.
```

### 1.2 Safety and Release Discipline

```text
Do not delete anything without approval.
Do not overwrite source notes or source skills without approval.
Do not push directly to main.
Do not modify payment, affiliate, dropshipping, or accessibility claims without human review gates.
Do not publish public pages without 187ACCESS+ and 187INCLUDE review.
Do not claim WCAG compliance without evidence.
Do not make revenue, health, legal, disability, or SEO guarantees.
```

### 1.3 Evidence Standards

Every public claim should be labeled as one of:

```text
proved
measured
modeled
inherited
interpreted
speculative
poetic/metaphorical
unsupported
```

---

## 2. Final Skill Architecture

### 2.1 Public First-Class Skills

| Skill | Role | Public Product Surface |
|---|---|---|
| `187REPO` | Repo generation, deploys, installers, orchestration | `/187repo` |
| `187CRAFT` | Design, frontend, UI/UX, components | `/187craft` |
| `187VIBE` | Delight, onboarding, retention, community | `/187vibe` |
| `187LAUNCH` | GTM, campaigns, validation, outreach | `/187launch` |
| `187FREE` | Free-tier, open-source, local-first, no-cost solution scouting | `/187free` |
| `187RESEARCH` | Source-backed research, databases, labs, reproducibility | `/187research` |
| `187SEO` | Ethical SEO, structured data, analytics, search visibility | `/187seo` |
| `187REVENUE` | Pricing, payments, affiliate, coupons/deals, dropshipping, revenue ops | `/187revenue` |
| `187DOCS` | Documentation, instructions, SOPs, README systems, API docs | `/187docs` |
| `187LEARN` | Courses, study plans, lessons, workshops, learning paths | `/187learn` |
| `187TEST` | Quizzes, tests, polls, surveys, rubrics, validation instruments | `/187test` |
| `187ACCESS+` | Disability accessibility, neurodivergence, WCAG+, inclusion review | `/187access` |
| `187VERSION` | SemVer, releases, changelogs, migration notes, compatibility | `/187version` |
| `187PUBLISH` | Mandatory docs/demo/showcase sync after every upgrade | `/187publish` |

### 2.2 Suite-Wide Subskills

| Subskill | Role | Called By |
|---|---|---|
| `187WRITE` | Content writing, editing, voice, copy, scripts, plain language | DOCS, LEARN, SEO, REVENUE, LAUNCH, RESEARCH |
| `187INCLUDE` | Inclusive language, pronouns, LGBTQ+ support, identity-safe UX | ACCESS+, DOCS, LEARN, TEST, SEO, REVENUE, PUBLISH |

### 2.3 Internal Profiles and Aliases

| Label | Type | Meaning |
|---|---|---|
| `187WCAG+` | audit profile | WCAG + cognitive access + assistive tech + inclusive identity handling |
| `187CARE` | alias/submode | consent-first support, accommodation, and assistive workflow layer |
| `a11y` | CLI alias | routes to `187ACCESS+` |
| `pronouns` | CLI alias | routes to `187INCLUDE` |

---

## 3. Multi-Agent / Subagent Roster

### 3.1 Orchestration Agents

#### Sprint Orchestrator

**Canonical skill:** `187REPO`  
**Purpose:** Controls repo-level sequencing, branch discipline, task dispatch, and execution boundaries.

Inputs:

```text
user request
current repo state
skill contract
sprint plan
approval scope
```

Outputs:

```text
branch plan
task queue
commit sequence
PR plan
execution status
```

Done when:

```text
all planned agents have explicit tasks
all changes are sequenced
no public surface is left unsynchronized
```

#### Ecosystem Router

**Canonical skill:** `187web-ecosystem`  
**Purpose:** Keeps the suite map coherent and routes requests to the correct skill.

Owns:

```text
.claude/skills/187web-ecosystem/SKILL.md
AGENTS.md active suite table
routing rules
skill dependency graph
```

Done when:

```text
every first-class skill is represented in the router
every subskill has clear trigger rules
no old four-skill-only references remain
```

#### Manifest Compiler Steward

**Canonical skill:** `187web-manifest`  
**Purpose:** Updates manifest routing, prompt registry, compiler references, and long-run session logic.

Owns:

```text
.claude/skills/187web-manifest/SKILL.md
references/MANIFEST.xml
manifest index generation
compiler routing docs
```

Done when:

```text
new suite routes compile cleanly
manifest docs match public suite
adapter generation uses canonical skills
```

---

### 3.2 Domain Agents

#### 187FREE

**Purpose:** Finds no-cost, free-tier, open-source, and local-first implementation paths.

Modes:

```text
FREE_LAUNCH_ARCHITECT
FREE_FULLSTACK_MVP
FREE_DATABASE_SELECTOR
FREE_AUTH_SCOUT
FREE_DOMAIN_SCOUT
FREE_API_MINER
FREE_AI_LOCAL_MODEL_SCOUT
FREE_ACCESSIBILITY_TOOL_SCOUT
FREE_SECURITY_TOOL_SCOUT
FREE_CIVIC_STACK_SCOUT
```

Required output:

```text
Need
Best Free Pick
Two Backup Options
Stack Recipe
Why This Works
Gotchas
Privacy/Sensitivity Review
Upgrade Path
Recommendation
```

Key source family:

```text
free-for.dev
official service docs
GitHub repos
public API directories
open-source alternatives
```

#### 187RESEARCH

**Purpose:** Routes research questions through source discovery, database selection, evidence grading, and lab generation.

Modes:

```text
SOURCE_DISCOVERY
LITERATURE_REVIEW
DATABASE_ROUTER
EVIDENCE_LADDER
PROOF_VS_PATTERN
COMPUTATIONAL_LAB
DATASET_CARD
REPRODUCIBILITY_REPORT
PUBLIC_CLAIM_REVIEW
RESEARCH_TO_PRODUCT
```

Database router includes:

```text
arXiv
Crossref
OpenAlex
Semantic Scholar
Europe PMC
NCBI / PubMed / PMC / Gene / Protein
PubChem
UniProt
RCSB PDB
AlphaFold DB
ClinicalTrials.gov
OEIS
LMFDB
NIST DLMF
GitHub API
npm Registry
PyPI JSON API
Libraries.io
Data.gov
NASA
World Bank
Wikidata
OpenStreetMap
Zenodo
Hugging Face datasets
```

Done when:

```text
sources are named
query route is defined
evidence ladder is applied
public-claim risk is reviewed
187FREE is invoked for no-cost lab tooling when needed
```

#### 187SEO

**Purpose:** Ethical technical SEO, content visibility, structured data, Search Console analysis, and AI-search readiness.

Modes:

```text
TECHNICAL_AUDIT
CONTENT_STRATEGY
PAGE_OPTIMIZATION
SITE_ARCHITECTURE
STRUCTURED_DATA
SEARCH_ANALYTICS
LOCAL_SEO
ECOMMERCE_SEO
AI_SEARCH_READINESS
TRAFFIC_DROP_DEBUG
MIGRATION_SAFETY
LAUNCH_READINESS
ACCESSIBILITY_SEO
CLIENT_REPORTING
```

Hard guardrails:

```text
No cloaking.
No hidden text.
No link schemes.
No fake reviews.
No fake schema.
No doorway pages.
No scaled thin content.
No unauthorized SERP scraping.
No ranking guarantees.
No AI-search manipulation spam.
```

#### 187REVENUE

**Purpose:** Revenue systems, pricing, payment architecture, affiliate systems, coupons/deals, dropshipping, sponsorships, and commerce ops.

Modes:

```text
REVENUE_MODEL_AUDIT
PRICING_ARCHITECT
OFFER_LADDER_BUILDER
SUBSCRIPTION_SYSTEM
PAYMENT_INTEGRATION
AFFILIATE_SYSTEM
COUPON_DEAL_SYSTEM
DROPSHIPPING_SYSTEM
MARKETPLACE_SYSTEM
SPONSORSHIP_SYSTEM
OPEN_SOURCE_FUNDING
CLIENT_PACKAGE_BUILDER
LICENSING_STRATEGY
ADS_POLICY_REVIEW
REVENUE_DASHBOARD
REFUND_CHARGEBACK_RISK
TAX_LEGAL_REVIEW_GATE
```

Guardrails:

```text
No fake coupons.
No expired deals presented as active.
No undisclosed affiliate links.
No fake reviews.
No fake scarcity.
No counterfeit goods.
No misleading shipping times.
No hidden recurring billing.
No dropshipping products without supplier verification.
No health, disability, financial, or legal claims without evidence and human review.
```

#### 187DOCS

**Purpose:** Documentation architecture, READMEs, instructions, SOPs, API docs, manuals, troubleshooting, and docs drift repair.

Modes:

```text
README_ARCHITECT
API_DOCS
INSTALL_GUIDE
QUICKSTART
HOW_TO_GUIDE
REFERENCE_DOCS
EXPLANATION_DOCS
TROUBLESHOOTING
SOP_BUILDER
CHANGELOG_WRITER
ARCHITECTURE_DOCS
USER_MANUAL
DEVELOPER_DOCS
DOCS_AUDIT
DOCS_SYNC
```

Structural standard:

```text
tutorials
how-to guides
reference
explanation
```

#### 187WRITE

**Purpose:** Suite-wide content writing and editorial engine.

Modes:

```text
CONTENT_BRIEF
EDITORIAL_STYLE
VOICE_UNIFICATION
PLAIN_LANGUAGE_REWRITE
TECHNICAL_EXPLANATION
TUTORIAL_PROSE
COURSE_SCRIPT
SEO_CONTENT_DRAFT
PRODUCT_COPY
LANDING_PAGE_COPY
NEWSLETTER_DRAFT
SOCIAL_POST_DRAFT
CLAIM_SAFE_REWRITE
ACCESSIBLE_LANGUAGE
```

#### 187LEARN

**Purpose:** Courses, study plans, curricula, lessons, workshops, learning paths, and instructor/learner guides.

Modes:

```text
COURSE_ARCHITECT
STUDY_PLAN_BUILDER
LESSON_BUILDER
SYLLABUS_BUILDER
WORKSHOP_BUILDER
MICROLEARNING_BUILDER
PROJECT_BASED_LEARNING
LEARNING_PATH
INSTRUCTOR_GUIDE
STUDENT_GUIDE
ACCESSIBLE_LEARNING_DESIGN
COURSE_TO_REVENUE
COURSE_TO_SEO
COURSE_TO_DOCS
```

#### 187TEST

**Purpose:** Quizzes, tests, polls, surveys, rubrics, knowledge checks, validation forms, and feedback systems.

Modes:

```text
QUIZ_BUILDER
TEST_BUILDER
POLL_BUILDER
SURVEY_BUILDER
RUBRIC_BUILDER
QUESTION_BANK
PRACTICE_TEST
PLACEMENT_TEST
KNOWLEDGE_CHECK
COURSE_FEEDBACK
USER_FEEDBACK_FORM
VALIDATION_SURVEY
POLL_ANALYSIS
TEST_ANALYTICS
BIAS_REVIEW
ACCESSIBILITY_REVIEW
EXPORT_PLAN
```

Rules:

```text
Public-facing tests must invoke 187ACCESS+.
High-stakes assessments require human review.
Surveys and polls must state purpose and data use.
Do not present informal checks as clinical, diagnostic, legal, or employment tests.
```

#### 187ACCESS+

**Purpose:** Disability accessibility, neurodivergent access, sensory access, assistive technology support, WCAG+, cognitive accessibility, and inclusive access systems.

Modes:

```text
WCAG_AUDIT
WCAG_PLUS_PROFILE
COGNITIVE_ACCESS_AUDIT
NEURODIVERGENT_ACCESS_AUDIT
SCREEN_READER_AUDIT
KEYBOARD_NAVIGATION_AUDIT
LOW_VISION_AUDIT
COLOR_CONTRAST_AUDIT
CAPTION_TRANSCRIPT_AUDIT
DEAF_HOH_ACCESS_AUDIT
MOTOR_ACCESS_AUDIT
AAC_COMMUNICATION_ACCESS
PLAIN_LANGUAGE_REWRITE
INTELLECTUAL_DISABILITY_ACCESS
SENSORY_LOAD_REVIEW
REDUCED_MOTION_REVIEW
ACCESSIBLE_FORMS
ACCESSIBLE_AUTHENTICATION
ACCESSIBLE_COURSE_REVIEW
ACCESSIBLE_TEST_REVIEW
ACCOMMODATION_BUILDER
CONSENT_FIRST_SUPPORT
ASSISTIVE_TECH_SCOUT
ADA_SECTION_508_REVIEW
```

Respectful terminology:

```text
disabled people
people with disabilities
access needs
neurodivergent users
blind and low-vision users
Deaf and hard-of-hearing users
people with intellectual disabilities
people with cognitive disabilities
```

#### 187INCLUDE

**Purpose:** Inclusive language, LGBTQ+ support, pronoun-safe systems, identity-field design, anti-bias review, and community safety language.

Modes:

```text
PRONOUN_SAFE_COPY
LGBTQ_INCLUSION_REVIEW
GENDER_INCLUSIVE_FORMS
NAME_PRIVACY_REVIEW
DEADNAME_RISK_REVIEW
MISGENDERING_RISK_REVIEW
INCLUSIVE_LANGUAGE_REWRITE
IDENTITY_FIELD_DESIGN
ANTI_BIAS_CONTENT_REVIEW
COMMUNITY_SAFETY_REVIEW
```

Rules:

```text
Use the person’s stated name and pronouns.
Do not treat pronouns as optional decoration when identity data is present.
Avoid deadnaming unless legally/contextually required and explicitly approved.
Do not expose pronouns or identity fields without consent.
Do not force binary gender fields unless legally required.
```

#### 187VERSION

**Purpose:** Versioning, changelogs, releases, migration notes, compatibility, deprecations, adapter sync.

Modes:

```text
SEMVER_POLICY
SUITE_VERSION_BUMP
SKILL_VERSION_BUMP
DOCS_VERSIONING
COURSE_VERSIONING
CONTENT_REVISIONING
CHANGELOG_WRITER
RELEASE_NOTES
MIGRATION_GUIDE
DEPRECATION_POLICY
COMPATIBILITY_MATRIX
ADAPTER_VERSION_SYNC
GITHUB_RELEASE_PLAN
```

Required skill frontmatter:

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

#### 187PUBLISH

**Purpose:** Final release synchronization engine.

Modes:

```text
RELEASE_DOC_SYNC
README_SYNC
COMMAND_PAGE_SYNC
GITHUB_PAGES_SHOWCASE
PRODUCT_LAUNCH_PAGE
CHANGELOG_UPDATE
INSTALL_DOC_UPDATE
MODEL_ADAPTER_DOC_UPDATE
SKILL_INDEX_UPDATE
SCREENSHOT_DEMO_PLAN
SEO_PUBLISH_CHECK
ACCESSIBILITY_PUBLISH_CHECK
INCLUSION_PUBLISH_CHECK
```

---

## 4. Permanent Release Pipeline

Every suite upgrade must end in this order:

```text
1. 187VERSION
   Decide version bump, changelog entry, migration impact, compatibility impact.

2. 187DOCS
   Update README, install docs, API docs, command docs, internal docs.

3. 187WRITE
   Polish public copy, examples, explanations, and launch language.

4. 187ACCESS+
   Review disability accessibility, cognitive access, neurodivergent access, forms,
   tests, courses, checkout, docs, and public pages.

5. 187INCLUDE
   Review pronouns, identity fields, LGBTQ+ inclusion, names, deadname risk,
   misgendering risk, and inclusive terminology.

6. 187SEO
   Check metadata, structured data, search clarity, crawlability, and anti-spam.

7. 187PUBLISH
   Sync all final surfaces, including GitHub Pages demo/product launch page.
```

Mandatory sync targets:

```text
README.md
AGENTS.md
PLAN.md
CHANGELOG.md
docs/INSTALL.md
docs/MODEL-ADAPTERS.md
docs/SKILL-CONTRACT.md
docs/187FREE.md
docs/187RESEARCH.md
docs/187SEO.md
docs/187REVENUE.md
docs/187DOCS.md
docs/187LEARN.md
docs/187TEST.md
docs/187ACCESS.md
docs/187VERSION.md
docs/187PUBLISH.md
app/page.tsx
app/187repo/page.tsx
app/install/page.tsx
app/187ai-eye/page.tsx
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
GitHub Pages static showcase
.claude/skills/187web-ecosystem/SKILL.md
.claude/skills/187web-manifest/SKILL.md
.grok/skills mirror
.gemini/skills adapters
.kimi/skills adapters
.chatgpt/skills adapters
.ollama/modelfiles adapters
.herme/agents adapters
```

---

## 5. Repo File Plan

### 5.1 Canonical Skills

Create:

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

Update:

```text
.claude/skills/187repo/SKILL.md
.claude/skills/187craft/SKILL.md
.claude/skills/187vibe/SKILL.md
.claude/skills/187launch/SKILL.md
.claude/skills/187web-ecosystem/SKILL.md
.claude/skills/187web-manifest/SKILL.md
```

### 5.2 Docs

Create:

```text
docs/SKILL-CONTRACT.md
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
docs/ROUTING.md
docs/RELEASE-GATE.md
docs/SHOWCASE-SYNC.md
docs/audits/187skills-evolution-audit.md
```

Update:

```text
README.md
AGENTS.md
PLAN.md
CHANGELOG.md
docs/INSTALL.md
docs/MODEL-ADAPTERS.md
CONTRIBUTING.md
```

### 5.3 App Pages

Create:

```text
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

### 5.4 CLI and Installers

Update:

```text
scripts/187repo.sh
scripts/187repo.ps1
install.sh
install.ps1
docs/INSTALL.md
app/install/page.tsx
```

Add CLI routes:

```bash
187repo.sh free
187repo.sh research
187repo.sh seo
187repo.sh revenue
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

### 5.5 Validation Scripts

Add:

```text
scripts/validate-skills.mjs
scripts/validate-suite-release.mjs
scripts/check-docs-drift.mjs
scripts/check-adapter-drift.mjs
scripts/check-showcase-sync.mjs
```

Update package scripts:

```json
{
  "skills:validate": "node scripts/validate-skills.mjs",
  "release:validate": "node scripts/validate-suite-release.mjs",
  "docs:drift": "node scripts/check-docs-drift.mjs",
  "adapters:generate": "python scripts/generate-model-adapters.py",
  "adapters:drift": "node scripts/check-adapter-drift.mjs",
  "showcase:sync": "node scripts/check-showcase-sync.mjs"
}
```

---

## 6. Sprint Phases

### Phase 0 — Branch, Inventory, and Baseline

```bash
git checkout -b claude/187skills-master-evolution
find .claude/skills -maxdepth 2 -name SKILL.md
find .grok/skills -maxdepth 2 -name SKILL.md
find .gemini .kimi .chatgpt .ollama .herme -maxdepth 3 -type f
grep -R "187REPO\|187CRAFT\|187VIBE\|187LAUNCH" README.md AGENTS.md docs app scripts .claude || true
npm install
npm run lint
npm run typecheck
npm run build
```

Deliverable:

```text
docs/audits/187skills-evolution-audit.md
```

Approval gate:

```text
No implementation until audit is accepted.
```

### Phase 1 — Universal Skill Contract

Create:

```text
docs/SKILL-CONTRACT.md
```

Every first-class skill must include:

```text
name
description
suite
skill_version
contract_version
manual triggers
automatic triggers
when to use
when not to use
input contract
output contract
routing rules
safety rules
integration points
templates
dashboards / app surface
CLI route
docs route
adapter route
acceptance tests
```

### Phase 2 — Add New Canonical Skills

Create canonical skill folders:

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

Rules:

```text
No public page yet.
No CLI wrapper yet.
No runtime claims yet.
Only canonical skill definitions, references, templates, and acceptance tests.
```

### Phase 3 — Router and Manifest Upgrade

Update:

```text
187web-ecosystem
187web-manifest
187repo
187launch
187vibe
AGENTS.md
README.md
```

Key ownership changes:

```text
187VIBE no longer owns research as a primary category.
187LAUNCH no longer owns SEO or revenue as primary categories.
187SEO owns SEO.
187REVENUE owns monetization and commerce systems.
187RESEARCH owns research-grade database/lab workflows.
187PUBLISH owns release synchronization.
```

### Phase 4 — CLI and Installers

Update:

```text
scripts/187repo.sh
scripts/187repo.ps1
install.sh
install.ps1
docs/INSTALL.md
app/install/page.tsx
```

### Phase 5 — GitHub Pages Showcase / Product Launch Surface

Create new route pages and update existing surfaces.

Homepage copy:

```text
187REPO orchestrates.
187CRAFT designs.
187VIBE delights.
187LAUNCH ships.
187FREE finds no-cost stacks.
187RESEARCH builds source-backed labs.
187SEO makes public work discoverable.
187REVENUE turns value into ethical revenue systems.
187DOCS documents the system.
187LEARN teaches it.
187TEST checks knowledge and feedback.
187ACCESS+ makes it accessible and inclusive.
187VERSION controls releases.
187PUBLISH keeps every public surface synchronized.
```

### Phase 6 — Model Adapter Regeneration

Fix generator portability:

```python
ROOT = Path(__file__).resolve().parents[1]
```

Then run:

```bash
python scripts/generate-model-adapters.py
```

### Phase 7 — Validation and CI

Add validators and CI gates.

CI must fail if any first-class skill is missing from:

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

### Phase 8 — Version, Docs, Access, Include, SEO, Publish Gate

Run the permanent release pipeline:

```text
187VERSION
187DOCS
187WRITE
187ACCESS+
187INCLUDE
187SEO
187PUBLISH
```

---

## 7. Acceptance Tests

### Test 1 — Suite Router

Prompt:

```text
187repo suite
```

Expected:

```text
All first-class skills are listed.
Aliases are shown.
Subskills are explained.
No four-skill-only suite remains.
```

### Test 2 — Free Stack

Prompt:

```text
187FREE this: I need a no-cost stack for a public research demo with hosting,
database, auth, contact form, analytics, and monitoring.
```

Expected:

```text
187FREE primary.
187SEO optional for page discoverability.
187ACCESS+ invoked if public form exists.
```

### Test 3 — Research Lab

Prompt:

```text
187RESEARCH this: build a reproducible lab plan for a Golay/Leech lattice visualization.
```

Expected:

```text
187RESEARCH primary.
187FREE deployment suggestion.
187DOCS tutorial/reference plan.
187SEO public page plan.
```

### Test 4 — SEO Page

Prompt:

```text
187SEO this landing page for promptPACK.
```

Expected:

```text
metadata
headings
schema plan
internal links
measurement plan
spam guardrails
187ACCESS+ public-page review
```

### Test 5 — Revenue System

Prompt:

```text
187REVENUE build affiliate, coupon/deal, and dropshipping revenue systems for this product.
```

Expected:

```text
affiliate disclosure gate
coupon freshness gate
dropshipping supplier-risk gate
refund/chargeback review
margin model
187SEO deal-page strategy
187ACCESS+ checkout review
```

### Test 6 — Docs System

Prompt:

```text
187DOCS this repo.
```

Expected:

```text
README
install guide
quickstart
how-to
reference
explanation
troubleshooting
187WRITE polish
187PUBLISH final sync
```

### Test 7 — Course System

Prompt:

```text
187LEARN turn promptPACK into a 4-week course.
```

Expected:

```text
course outline
study plan
lessons
exercises
187TEST quizzes
187ACCESS+ learning access review
187REVENUE course monetization optional
```

### Test 8 — Testing System

Prompt:

```text
187TEST create a 25-question quiz with rubric and feedback.
```

Expected:

```text
question bank
answers
rubric
feedback
bias review
accessibility review
optional QTI export plan
```

### Test 9 — Access+ Review

Prompt:

```text
187ACCESS+ audit this checkout, course, quiz, and signup form.
```

Expected:

```text
WCAG profile
keyboard/screen reader review
cognitive load review
plain-language review
form/auth accessibility
sensory/reduced-motion review
```

### Test 10 — Inclusion Review

Prompt:

```text
187INCLUDE review this profile form for pronouns, names, gender fields, and privacy.
```

Expected:

```text
pronoun-safe handling
name privacy
deadname risk review
gender-inclusive form recommendations
consent and visibility controls
```

### Test 11 — Version Gate

Prompt:

```text
187VERSION this upgrade.
```

Expected:

```text
version bump
skill version impacts
changelog entry
migration notes
adapter impact
docs impact
```

### Test 12 — Publish Gate

Prompt:

```text
187PUBLISH audit the suite for docs drift and showcase drift.
```

Expected:

```text
README coverage
AGENTS coverage
docs coverage
app route coverage
GitHub Pages coverage
adapter coverage
CI status
release checklist
```

---

## 8. Commit / PR Plan

Use small commits:

```text
1. docs: add 187skills evolution audit and skill contract
2. skills: add 187free 187research 187seo 187revenue
3. skills: add 187docs 187write 187learn 187test
4. skills: add 187access-plus 187include 187version 187publish
5. router: expand ecosystem and manifest routing
6. cli: add suite command aliases and installer docs
7. app: add expanded suite pages and homepage showcase
8. adapters: fix generator root and regenerate model adapters
9. ci: add skill/release/docs/showcase validators
10. release: version changelog docs publish sync
```

PR title:

```text
Expand 187WEB into full 187SKILLS multi-agent suite
```

PR summary:

```text
This PR evolves 187WEB from a four-skill showcase into the full 187SKILLS
multi-agent suite. It adds first-class skills for free-stack scouting, research,
SEO, revenue, docs, learning, testing, accessibility/inclusion, versioning, and
publishing. It also adds release gates so future upgrades cannot ship without
docs, adapters, public showcase, accessibility, inclusion, SEO, and version sync.
```

---

## 9. Master Execution Prompt for Claude Code / Claudian

```text
/plan

You are upgrading the 187WEB repository into the full 187SKILLS multi-agent suite.

Target repo:
lumenhelixlab/187WEB

Primary objective:
Evolve the existing 187WEB ecosystem from the four public skills
187REPO / 187CRAFT / 187VIBE / 187LAUNCH into the full first-class suite:

187REPO
187CRAFT
187VIBE
187LAUNCH
187FREE
187RESEARCH
187SEO
187REVENUE
187DOCS
187LEARN
187TEST
187ACCESS+
187VERSION
187PUBLISH

Also add suite-wide subskills:

187WRITE
187INCLUDE

Internal profile / alias layer:

187WCAG+ = technical accessibility audit profile inside 187ACCESS+
187CARE = consent-first support/accommodation alias inside 187ACCESS+

Hard rules:
- Do not delete files without approval.
- Do not push directly to main.
- Work on a branch named claude/187skills-master-evolution.
- Keep .claude canonical skills as source of truth.
- Keep .grok mirror in sync.
- Regenerate .gemini, .kimi, .chatgpt, .ollama, and .herme adapters only after canonical skills are stable.
- Every new first-class skill must have version frontmatter, triggers, routing rules, output contract, safety rules, docs path, app/showcase route, CLI route, and acceptance tests.
- Every upgrade must end with 187VERSION, 187DOCS, 187WRITE, 187ACCESS+, 187INCLUDE, 187SEO, and 187PUBLISH.
- No public page, form, checkout, course, quiz, docs page, or showcase update is complete until 187ACCESS+ and 187INCLUDE have reviewed it.
- No SEO tactic may violate search spam policies.
- No affiliate/deal/dropshipping feature may ship without disclosure, freshness, supplier-risk, refund, and compliance gates.
- Do not claim medical, legal, disability, financial, SEO, or revenue guarantees.

Phase 0:
Inspect repo structure and produce docs/audits/187skills-evolution-audit.md.
Stop for approval.

Phase 1:
Create docs/SKILL-CONTRACT.md and version frontmatter standard.
Stop for approval.

Phase 2:
Create canonical skills:
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

Do not update public app pages yet.
Stop for approval.

Phase 3:
Update ecosystem routers:
187web-ecosystem
187web-manifest
187repo
187launch
187vibe
AGENTS.md
README.md

Stop for approval.

Phase 4:
Update CLI and installer routes:
scripts/187repo.sh
scripts/187repo.ps1
install.sh
install.ps1
docs/INSTALL.md
app/install/page.tsx

Stop for approval.

Phase 5:
Add public showcase pages:
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

Update:
app/page.tsx
app/187repo/page.tsx
app/187ai-eye/page.tsx
lib/content.ts

Stop for approval.

Phase 6:
Fix adapter generator to use repo-relative root.
Regenerate model adapters.
Update docs/MODEL-ADAPTERS.md.
Stop for approval.

Phase 7:
Add validation scripts:
scripts/validate-skills.mjs
scripts/validate-suite-release.mjs
scripts/check-docs-drift.mjs
scripts/check-adapter-drift.mjs
scripts/check-showcase-sync.mjs

Update package.json and CI.
Stop for approval.

Phase 8:
Run release gate:
187VERSION
187DOCS
187WRITE
187ACCESS+
187INCLUDE
187SEO
187PUBLISH

Update:
CHANGELOG.md
README.md
AGENTS.md
docs/*
app/*
GitHub Pages showcase
model adapter docs

Final verification:
npm run lint
npm run typecheck
npm run build
npm run skills:validate
npm run release:validate
npm run docs:drift
npm run adapters:drift
npm run showcase:sync
python scripts/generate-model-adapters.py

Report:
files created
files modified
tests run
failures
remaining manual steps
PR summary

Start with Phase 0 only.
Do not create or modify files until the Phase 0 plan is approved.
```

---

## 10. External Standards and Reference Anchors

Use these as source anchors for doctrine files and public docs.

```text
WCAG 2.2
https://www.w3.org/TR/WCAG22/

W3C Cognitive Accessibility / COGA
https://www.w3.org/WAI/cognitive/

Semantic Versioning 2.0.0
https://semver.org/spec/v2.0.0.html

Diátaxis Documentation Framework
https://diataxis.fr/

1EdTech QTI
https://www.1edtech.org/standards/qti

ADL xAPI
https://www.adlnet.gov/projects/xapi/

GLAAD Transgender Terms
https://glaad.org/reference/trans-terms/

FTC Disclosures 101
https://www.ftc.gov/business-guidance/resources/disclosures-101-social-media-influencers

Google Search Essentials
https://developers.google.com/search/docs/essentials

free-for.dev
https://github.com/ripienaar/free-for-dev
```

---

## 11. Minimum Acceptance Criteria

The sprint is not complete unless:

```text
1. Every first-class skill has a canonical .claude skill.
2. Every first-class skill has docs.
3. Every first-class skill has an app/showcase page or explicit public-surface entry.
4. Every first-class skill has CLI routing.
5. Every first-class skill has generated model adapters.
6. AGENTS.md lists all first-class skills.
7. README.md explains the full suite.
8. docs/INSTALL.md lists all commands.
9. docs/MODEL-ADAPTERS.md reflects all generated formats.
10. app/page.tsx and app/187repo/page.tsx showcase the expanded suite.
11. CHANGELOG.md records the evolution.
12. 187VERSION decides the release bump.
13. 187PUBLISH confirms docs/showcase sync.
14. 187ACCESS+ confirms accessibility review.
15. 187INCLUDE confirms inclusion/pronoun/identity review.
16. 187SEO confirms public-page metadata/search review.
17. CI validates skills, docs drift, adapter drift, and showcase drift.
18. npm run lint passes.
19. npm run typecheck passes.
20. npm run build passes.
```

---

## 12. Approval Recommendation

Approve in controlled batches.

First approval scope:

```text
Phase 0 — branch, inventory, audit
Phase 1 — universal skill contract
Phase 2 — canonical skill definitions only
```

Second approval scope:

```text
Phase 3 — ecosystem router and manifest update
Phase 4 — CLI and installer update
Phase 5 — GitHub Pages showcase/product launch page update
```

Third approval scope:

```text
Phase 6 — model adapter regeneration
Phase 7 — validation/CI
Phase 8 — version/docs/write/access/include/SEO/publish release gate
```

---

## 13. Final Architecture Statement

```text
187WEB becomes the public showcase.
187SKILLS becomes the operating system.
187REPO orchestrates.
187CRAFT builds.
187VIBE humanizes.
187LAUNCH distributes.
187FREE lowers cost.
187RESEARCH proves.
187SEO makes discoverable.
187REVENUE monetizes.
187DOCS documents.
187WRITE clarifies.
187LEARN teaches.
187TEST checks.
187ACCESS+ includes disabled and neurodivergent users.
187INCLUDE protects identity and pronoun safety.
187VERSION controls change.
187PUBLISH prevents drift.
```
