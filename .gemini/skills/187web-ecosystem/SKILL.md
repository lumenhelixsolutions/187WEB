---
name: 187web-ecosystem
description: >-
  Use when routing across the full 187SKILLS suite or the Charlotte integration stack.
model_adapter: gemini
system_instruction: >-
  **Parent skill:** [187webdesign](../187webdesign/SKILL.md)
---

> **Gemini adapter:** Load as a system instruction. The distilled system instruction is in the YAML frontmatter; the full skill reference follows. Source: [`../../.claude/skills/187web-ecosystem/SKILL.md`](../../.claude/skills/187web-ecosystem/SKILL.md).

# 187WEB ecosystem v2 — Charlotte integration

**Suite:** The 187WEB ecosystem v2 skill index. Core modules:
**THREAD** · **TUNE** · **CORD** · **CHAR** · **LAB**. Legacy aliases:
[`187web-manifest`](../187web-manifest/SKILL.md) · [`widow-weaver`](../widow-weaver/SKILL.md) · [`neuro-toxin`](../neuro-toxin/SKILL.md) · [`swarm-mind`](../swarm-mind/SKILL.md) ·
[`agent-charlotte`](../agent-charlotte/SKILL.md) · [`silk-sandbox`](../silk-sandbox/SKILL.md)

**Parent skill:** [187webdesign](../187webdesign/SKILL.md)

The 187WEB ecosystem v2 is the 187WEB stack: excellent, precise, highly
effective execution with zero wasted overhead. It is organized around
**Charlotte** — a stylized systems operator representing precise, connected web
mastery — and five specialized modules that mirror her workflow: extraction,
tuning, routing, research, and execution.

Load this skill first when the task spans more than one layer of the stack.
For single-layer work, jump directly to the module.

## When to use this

Orchestrating a multi-stage workflow inside the 187WEB ecosystem; setting the
overall tone, palette, or nervous-system behavior; or deciding which Charlotte
module owns the next move. If the prompt mentions "Killer Web," "Charlotte,"
or any v2 module name, start here.

## Brand identity

The ecosystem speaks in tight, intentional language. No filler. Every token
must earn its place.

| Token | Hex | Role |
|-------|-----|------|
| **Abyssal Black** | `#080808` | Deepest base, void canvas, primary background |
| **Dark Grey** | `#1A1A1A` | Surfaces, cards, panels |
| **Steel Grey** | `#4A4A4A` | Structural borders, dividers, tertiary elements |
| **Ash** | `#CCCCCC` | Secondary text, muted UI, quiet labels |
| **Signal Red** | `#FF0000` | Critical alerts, stop controls, errors |
| **Signal Green** | `#39FF14` | Success states, execution confirmation, live signals |

**Vibe:** Precise efficiency, highly calculated, no wasted overhead.
**Mascot:** Charlotte — the systems operator. Precise, connected, total web mastery.

## Central nervous system: Obsidian Local Brain

The ecosystem is wired into an **Obsidian "Local Brain"** powered by
**Claudian**. Skills dynamically read context from the active Obsidian pane and
vault frontmatter, then output densely linked, bidirectional markdown
files.

Under the hood, the nervous system uses local REST APIs and WebSockets to:

- Monitor filesystem mutations in the active vault.
- Maintain a persistent graph representation of notes, tasks, and outputs.
- Bidirectionally link every generated artifact back to its source context.

Treat every output as a node in the web: link it, tag it, and make it
findable.

## Skill array (v2)

| Module | Role | When to use | Path (legacy alias) |
|--------|------|-------------|---------------------|
| **THREAD** | Native OS prompt engine | Extract intent, polish tone, explain code, solve logic, refactor with precision | [`.claude/skills/widow-weaver/SKILL.md`](../widow-weaver/SKILL.md) |
| **TUNE** | Inference tuner | Tune temperature, top-k/top-p, repetition penalty, Mirostat weave, context windowing | [`.claude/skills/neuro-toxin/SKILL.md`](../neuro-toxin/SKILL.md) |
| **CORD** | Engineering & niche personas | Bring in a specialist persona (architect, RAG weaver, edge specialist, UI spinner, ledger operator, red-team reviewer, sysop) | [`.claude/skills/swarm-mind/SKILL.md`](../swarm-mind/SKILL.md) |
| **CHAR** | Autonomous web crawler | Web traversal, contextual research, Obsidian auto-weaving | [`.claude/skills/agent-charlotte/SKILL.md`](../agent-charlotte/SKILL.md) |
| **LAB** | Execution engine | MicroVM isolation, syscall monitoring, I/O multiplexing | [`.claude/skills/silk-sandbox/SKILL.md`](../silk-sandbox/SKILL.md) |
| **187web-manifest** | Master Prompt Manifest | 27 XML prompt skills, compiler, long-run session routing | [`.claude/skills/187web-manifest/SKILL.md`](../187web-manifest/SKILL.md) |

## Short-name aliases

For faster discovery, the ecosystem also exposes four short-name entry skills
that delegate back to the modules above:

| Short name | Maps to | Use when |
|---|---|---|
| [`187repo`](../187repo/SKILL.md) | `187web-ecosystem` + `187web-manifest` | Repo generation, deploy, installer, orchestration |
| [`187craft`](../187craft/SKILL.md) | `187webdesign` + 187webdev-* suite | Design, UX, frontend, QA |
| [`187vibe`](../187vibe/SKILL.md) | CHAR, THREAD, TUNE, CORD, LAB | Delight, research, tuning, execution |
| [`187launch`](../187launch/SKILL.md) | `187launch` *(new)* | Go-to-market, Product Hunt, early users |

Load the short-name skill when the user says "187", "187repo", "187craft",
"187vibe", "187launch", or any related launch/deploy/design keyword.

## 187SKILLS public suite map

| Skill | Role | Public surface | Load when |
|---|---|---|---|
| `187repo` | Orchestration, deploy, installer | `/187repo` | Repo generation, GitHub deploy, suite routing |
| `187craft` | Design + frontend | `/187craft` | UI/UX, components, design system |
| `187vibe` | Delight + community | `/187vibe` | Onboarding, retention, micro-interactions |
| `187launch` | Go-to-market | `/187launch` | Launch strategy, early users, outreach |
| `187free` | No-cost solution engine | `/187free` | Free-tier/open-source/local-first stacks |
| `187research` | Source-backed research | `/187research` | Scholarly/biomedical/math/code research |
| `187seo` | Ethical SEO | `/187seo` | Search visibility, structured data, audits |
| `187revenue` | Ethical revenue systems | `/187revenue` | Pricing, payments, affiliate, dropshipping |
| `187docs` | Documentation system | `/187docs` | READMEs, SOPs, API docs |
| `187write` | Suite-wide writing | — | Content, copy, plain-language polish |
| `187learn` | Courses + learning | `/187learn` | Study plans, lessons, workshops |
| `187test` | Quizzes + surveys | `/187test` | Knowledge checks, rubrics, feedback |
| `187access-plus` | Accessibility + inclusion | `/187access` | WCAG+, cognitive, neurodivergent access |
| `187include` | Identity-safe language | — | Pronouns, gender-inclusive forms, anti-bias |
| `187version` | Versioning + releases | `/187version` | SemVer, changelogs, migration notes |
| `187publish` | Final sync gate | `/187publish` | Docs/showcase/adapter release sync |
| `187command` | Command surface + CLI router | `/187command` | `187 <alias>` grammar, terminal routing |
| `187report` | Reports + analytics | `/187report` | Audit reports, metrics, dashboards |
| `187scan` | Scanner + health audit | `/187scan` | SEO/health/security scans |
| `187kit` | Starter kits + templates | `/187kit` | Scaffold packs, boilerplates |
| `187standard` | Standards + SOPs | `/187standard` | Conventions, checklists, governance |
| `187flow` | Workflow + pipeline automation | `/187flow` | Process automation, CI/CD glue |

**Canonical uppercase roster:** 187REPO 187CRAFT 187VIBE 187LAUNCH 187FREE 187RESEARCH 187SEO 187REVENUE 187DOCS 187WRITE 187LEARN 187TEST 187ACCESS+ 187INCLUDE 187VERSION 187PUBLISH 187COMMAND 187REPORT 187SCAN 187KIT 187STANDARD 187FLOW.

### Ownership changes

- `187vibe` no longer owns research as a primary category — use `187research`.
- `187launch` no longer owns SEO or revenue — use `187seo` and `187revenue`.
- `187publish` owns every release synchronization surface.
- New core skills are standalone-first: invoke them directly before falling back to the orchestrator.

## Command grammar

Use the compact form:

```text
187 <alias> [target] [mode] [depth]
```

- `<alias>` — any public suite skill above (e.g., `repo`, `craft`, `scan`, `flow`).
- `[target]` — file, URL, component, or topic.
- `[mode]` — `quick`, `deep`, `audit`, `draft`, `deploy`, etc.
- `[depth]` — `1`, `2`, `3`, or `full`.

Modules are **standalone-first**: load a single module when the task is
single-layer, and only compose the full chain when the work genuinely spans
layers.

## Invocation / workflow guidance

The modules compose like a workflow. Default order:

0. **[187web-manifest](../187web-manifest/SKILL.md)** — Compile the session: run `187web-compiler`, read
   `PLAN.md`, inject the routed directive and TUNE profile.
1. **[THREAD](../widow-weaver/SKILL.md)** — Understand and sharpen the request. Use
   summarization, translation, tone polish, task extraction, code explanation,
   logic solving, or refactoring tools to extract the real intent and produce a
   clean task statement.
2. **[TUNE](../neuro-toxin/SKILL.md)** — Tune the inference environment. Dial
   temperature, top-k/top-p precision, repetition penalty, Mirostat
   weave, and context windowing to match the desired output precision.
3. **[CORD](../swarm-mind/SKILL.md)** — Call a specialist persona when the work needs domain
   depth (architecture, RAG, edge cases, UI, ledger, red-team, sysop).
4. **[CHAR](../agent-charlotte/SKILL.md)** — Dispatch CHAR for research, references,
   or data to auto-weave into Obsidian.
5. **[LAB](../silk-sandbox/SKILL.md)** — Execute code or commands in an isolated MicroVM with
   syscall monitoring and I/O multiplexing.

Not every workflow needs all five. For a quick refactor, [THREAD](../widow-weaver/SKILL.md) +
[LAB](../silk-sandbox/SKILL.md) is enough. For a complex build, run the full chain.

## Prompt skills

Each of the 27 manifest prompts is also a standalone skill under
[`.claude/skills/<id>/`](../187web-manifest/SKILL.md). Load a prompt skill
directly when the user names a specific prompt ID (e.g., `a11y-linting-agent`,
`xss-vulnerability-scanner`, `ml-systems-architect`).

## Optional modules

| Module | When to enable | Reference |
|--------|----------------|-----------|
| **Observability** | OTel traces, Langfuse, eval/security pillars | [`references/OBSERVABILITY-4.7.md`](references/OBSERVABILITY-4.7.md) |
| **187aiEYE UI** | Standalone command surface for the Local Brain | `/187ai-eye` in 187webdesign |

Observability defaults to `off`. Enable via vault YAML `observability.mode` or `E187WEB_OBSERVABILITY=minimal|full`. The CHAR crawl extension is independent (`charlotte_crawl: true`).

## Child skill links

- [187web-manifest — Master Prompt Manifest](../187web-manifest/SKILL.md)
- [THREAD — Native OS prompt engine](../widow-weaver/SKILL.md) (legacy alias: `widow-weaver`)
- [TUNE — Inference tuner](../neuro-toxin/SKILL.md) (legacy alias: `neuro-toxin`)
- [CORD — Engineering & niche personas](../swarm-mind/SKILL.md) (legacy alias: `swarm-mind`)
- [CHAR — Autonomous web crawler](../agent-charlotte/SKILL.md) (legacy alias: `agent-charlotte`)
- [LAB — Execution engine](../silk-sandbox/SKILL.md) (legacy alias: `silk-sandbox`)

---

*This skill is the ecosystem index. It contains no implementation code or
runtime scaffolding — only brand, architecture, composition rules, and
pointers to the child skills.*

