---
name: 187web-ecosystem
description: >-
  Use when routing across the full 187SKILLS suite or the Charlotte integration stack.
model_adapter: kimi
---

> **Kimi adapter:** Load via the Kimi Skill tool or place in your Kimi skills directory. Source: [`../../.claude/skills/187web-ecosystem/SKILL.md`](../../.claude/skills/187web-ecosystem/SKILL.md).

# 187web Ecosystem v2 — Charlotte Integration

**Suite:** The 187web Ecosystem v2 skill index. Child skills:
[`187web-manifest`](../187web-manifest/SKILL.md) · [`widow-weaver`](../widow-weaver/SKILL.md) · [`neuro-toxin`](../neuro-toxin/SKILL.md) · [`swarm-mind`](../swarm-mind/SKILL.md) ·
[`agent-charlotte`](../agent-charlotte/SKILL.md) · [`silk-sandbox`](../silk-sandbox/SKILL.md)

**Parent skill:** [187webdesign](../187webdesign/SKILL.md)

The 187web Ecosystem v2 is the "Killer Web" stack: excellent, precise, highly
effective execution with zero wasted overhead. It is organized around
**Charlotte** — a stylized Black Widow representing lethal precision and web
mastery — and five specialized skills that mirror her web: extraction, tuning,
persona, research, and execution.

Load this skill first when the task spans more than one layer of the stack.
For single-layer work, jump directly to the child skill.

## When to use this

Orchestrating a multi-stage workflow inside the 187web Ecosystem; setting the
overall tone, palette, or nervous-system behavior; or deciding which Charlotte
skill owns the next move. If the prompt mentions "Killer Web," "Charlotte,"
"widow," or any v2 skill name, start here.

## Brand identity

The ecosystem speaks in tight, intentional language. No filler. Every token
must earn its place.

| Token | Hex | Role |
|-------|-----|------|
| **Abyssal Black** | `#080808` | Deepest base, void canvas, primary background |
| **Dark Grey** | `#1A1A1A` | Surfaces, cards, panels |
| **Steel Grey** | `#4A4A4A` | Structural borders, dividers, tertiary elements |
| **Ash** | `#CCCCCC` | Secondary text, muted UI, quiet labels |
| **Widow Red** | `#FF0000` | Critical alerts, kill switches, errors |
| **Toxic Avenger Green** | `#39FF14` | Success states, execution confirmation, live signals |

**Vibe:** Lethal efficiency, highly calculated, no wasted overhead.
**Mascot:** Charlotte — the Black Widow. Lethal precision, total web mastery.

## Central nervous system: Obsidian Local Brain

The ecosystem is wired into an **Obsidian "Local Brain"** powered by
**Claudian**. Skills dynamically read context from the active Obsidian pane and
vault frontmatter, then output aggressively linked, bidirectional markdown
files.

Under the hood, the nervous system uses local REST APIs and WebSockets to:

- Monitor filesystem mutations in the active vault.
- Maintain a persistent graph representation of notes, tasks, and outputs.
- Bidirectionally link every generated artifact back to its source context.

Treat every output as a node in the web: link it, tag it, and make it
findable.

## Skill array (v2)

| Skill | Role | When to use | Path |
|-------|------|-------------|------|
| **widow-weaver** | Native OS prompt engine | Extract intent, polish tone, explain code, solve logic, refactor with venom | [`.claude/skills/widow-weaver/SKILL.md`](../widow-weaver/SKILL.md) |
| **neuro-toxin** | Inference tuner | Tune toxicity/temperature, top-k/top-p, repetition penalty, Mirostat weave, context windowing | [`.claude/skills/neuro-toxin/SKILL.md`](../neuro-toxin/SKILL.md) |
| **swarm-mind** | Engineering & niche personas | Bring in a specialist persona (architect, RAG weaver, edge venom, UI spinner, ledger spider, red-team widow, sysop widow) | [`.claude/skills/swarm-mind/SKILL.md`](../swarm-mind/SKILL.md) |
| **agent-charlotte** | Autonomous web crawler | Deep-web spinning, contextual traversal, Obsidian auto-weaving | [`.claude/skills/agent-charlotte/SKILL.md`](../agent-charlotte/SKILL.md) |
| **silk-sandbox** | Execution engine | MicroVM isolation, syscall monitoring, I/O multiplexing | [`.claude/skills/silk-sandbox/SKILL.md`](../silk-sandbox/SKILL.md) |
| **187web-manifest** | Master Prompt Manifest | 27 XML prompt skills, compiler, long-run session routing | [`.claude/skills/187web-manifest/SKILL.md`](../187web-manifest/SKILL.md) |

## Short-name aliases

For faster discovery, the ecosystem also exposes four short-name entry skills
that delegate back to the mature skills above:

| Short name | Maps to | Use when |
|---|---|---|
| [`187repo`](../187repo/SKILL.md) | `187web-ecosystem` + `187web-manifest` | Repo generation, deploy, installer, orchestration |
| [`187craft`](../187craft/SKILL.md) | `187webdesign` + 187webdev-* suite | Design, UX, frontend, QA |
| [`187vibe`](../187vibe/SKILL.md) | `agent-charlotte`, `widow-weaver`, `neuro-toxin`, `swarm-mind`, `silk-sandbox` | Delight, research, tuning, execution |
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

### Ownership changes

- `187vibe` no longer owns research as a primary category — use `187research`.
- `187launch` no longer owns SEO or revenue — use `187seo` and `187revenue`.
- `187publish` owns every release synchronization surface.

## Invocation / workflow guidance

The skills compose like a kill chain. Default order:

0. **[187web-manifest](../187web-manifest/SKILL.md)** — Compile the session: run `187web-compiler`, read
   `PLAN.md`, inject the routed directive and neuro-toxin profile.
1. **[widow-weaver](../widow-weaver/SKILL.md)** — Understand and sharpen the request. Use
   `TLDR_Toxin`, `Polyglot_Thread`, `Tone_Polish`, `Task_Extractor`,
   `Code_Explainer`, `Logic_Solver`, or `Refactor_Venom` to extract the real
   intent and produce a clean task statement.
2. **[neuro-toxin](../neuro-toxin/SKILL.md)** — Tune the inference environment. Dial
   toxicity/temperature, top-k/top-p lethality, repetition penalty, Mirostat
   weave, and context windowing to match the desired output precision.
3. **[swarm-mind](../swarm-mind/SKILL.md)** — Call a specialist persona when the work needs domain
   depth (architecture, RAG, edge cases, UI, ledger, red-team, sysop).
4. **[agent-charlotte](../agent-charlotte/SKILL.md)** — Send Charlotte crawling for research, references,
   or data to auto-weave into Obsidian.
5. **[silk-sandbox](../silk-sandbox/SKILL.md)** — Execute code or commands in an isolated MicroVM with
   syscall monitoring and I/O multiplexing.

Not every workflow needs all five. For a quick refactor, [`widow-weaver`](../widow-weaver/SKILL.md) +
[`silk-sandbox`](../silk-sandbox/SKILL.md) is enough. For a complex build, run the full chain.

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

Observability defaults to `off`. Enable via vault YAML `observability.mode` or `E187WEB_OBSERVABILITY=minimal|full`. The `agent-charlotte` crawl extension is independent (`charlotte_crawl: true`).

## Child skill links

- [187web-manifest — Master Prompt Manifest](../187web-manifest/SKILL.md)
- [widow-weaver — Native OS prompt engine](../widow-weaver/SKILL.md)
- [neuro-toxin — Inference tuner](../neuro-toxin/SKILL.md)
- [swarm-mind — Engineering & niche personas](../swarm-mind/SKILL.md)
- [agent-charlotte — Autonomous web crawler](../agent-charlotte/SKILL.md)
- [silk-sandbox — Execution engine](../silk-sandbox/SKILL.md)

---

*This skill is the ecosystem index. It contains no implementation code or
runtime scaffolding — only brand, architecture, composition rules, and
pointers to the child skills.*

