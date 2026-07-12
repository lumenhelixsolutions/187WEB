---
name: agentic-sprint-handoff
description: >-
  Use when converting an approved complex goal, repository upgrade, audit, or implementation plan into an execution-ready phased and milestoned handoff for Claude Code, Kimi Code, Grok, Codex, or another coding agent, with bounded subagents, file ownership, token-aware context packets, phase gates, validation, commits, pull requests, and rollback.
model_adapter: grok
---

> **Grok adapter: load as repository skill instructions.** Canonical source: [`../../.claude/skills/agentic-sprint-handoff/SKILL.md`](../../.claude/skills/agentic-sprint-handoff/SKILL.md).

# AGENTIC SPRINT HANDOFF — Execution-Ready Multi-Agent Planning

## Identity

`agentic-sprint-handoff` converts approved architecture and repository context
into an implementation handoff that a coding agent can execute without
reconstructing the mission. It defines the program orchestrator, bounded
subagents, file ownership, token budgets, dependency DAG, phase gates,
validation matrix, commit sequence, pull-request contract, rollback plan, and
final execution report.

It is a general Claude Code skill and a NATASHA workflow support skill. It does
not replace CORD, COMPRESS, SPARK, LAB, 187FLOW, or 187REPO. It compiles their
outputs into a durable executor-facing artifact.

## Directive

> Convert only approved scope into an execution-ready handoff. Ground repository
> facts before asserting them. Preserve every explicit constraint, exclusion,
> identifier, path, numerical value, safety boundary, and prior decision. Adapt
> terminology to the target coding agent without changing architecture. Do not
> claim that a command passed unless its output was observed. Do not require or
> expose private chain-of-thought; use concise decision records, assumptions,
> verification evidence, counterexamples, and uncertainty.

## Manual triggers

- `/187 handoff`
- `/187 sprint`
- `agentic sprint handoff`
- `phased milestoned sprint`
- `subagent implementation plan`
- `Claude Code handoff`
- `Kimi Code handoff`
- `Grok Code handoff`
- `Codex handoff`
- `turn this plan into an executable handoff`
- `create a repository execution brief`

## Automatic triggers

Use this skill when the request implies:

- another coding agent will execute the work
- a complex repository change needs phases and milestones
- parallel subagents or worktrees need explicit ownership
- a plan must become a durable execution artifact
- branch, commit, pull-request, CI, migration, and rollback rules are required
- token-compressed context packets are needed for subagent dispatch
- the user wants autonomous execution without losing human approval boundaries

## When to use

- Converting a completed design or architecture plan into a coding handoff.
- Preparing a repository-wide upgrade for Claude Code, Kimi, Grok, Codex, or a local coding agent.
- Coordinating independent implementation lanes without merge conflicts.
- Defining phase entry/exit reports, validation gates, commit order, and a final PR contract.
- Transferring work between models while preserving constraints and provenance.
- Creating a reusable sprint artifact in Obsidian, GitHub, or the Local Brain.

## When not to use

- A simple edit can be completed directly in one step.
- The architecture is still unresolved; route to `idea-spark` first.
- The source material is oversized or noisy; route to `token-web` and `widow-weaver` first.
- The user wants the repository changed now rather than a handoff; route to `187repo`, CORD, and LAB after confirming authorization.
- The task lacks enough repository context to state branches, paths, tests, or current behavior; use draft mode and label every unverified assumption.
- The request would require live exploitation, secret access, destructive changes, or irreversible operations without explicit authorization.

## Input contract

Provide or derive:

1. **Mission** — exact outcome.
2. **Target repository** — URL/path, default branch, and current HEAD when known.
3. **Approved architecture** — decisions already locked.
4. **Non-negotiables** — behavior, branding, security, compatibility, and exclusions.
5. **Target executor** — Claude Code, Kimi Code, Grok, Codex, local agent, or model-neutral.
6. **Autonomy boundary** — automatic scope versus human approval.
7. **Available validation** — tests, linters, builds, benchmarks, CI, and manual review.
8. **Delivery target** — branch, patch, commit series, PR, or release.

When repository facts are unavailable, mark the handoff `draft` and include a mandatory Phase 0 verification milestone.

## Output contract

Every handoff must contain:

1. **Handoff metadata** — repository, observed baseline, target branch, release, target executor, and confidence.
2. **Executive directive** — one bounded mission statement.
3. **Architecture target** — system map and responsibilities.
4. **Non-negotiables** — explicit preserve/prohibit rules.
5. **Operating protocol** — plan mode, branch discipline, evidence rules, and human approval boundaries.
6. **Program orchestrator** — one integration owner.
7. **Subagent roster** — roles, objectives, owned files, prohibited files, dependencies, artifacts, and acceptance tests.
8. **Context-packet standard** — token budget, must-preserve fields, provenance, and loss reporting.
9. **Phase and milestone plan** — numbered phases with entry conditions, actions, deliverables, and exit gates.
10. **Dependency DAG** — safe parallel lanes and serialized shared files.
11. **Validation matrix** — exact commands and expected evidence.
12. **Security and policy corrections** — unsafe legacy behavior to remove or constrain.
13. **Commit sequence** — small, reviewable, dependency-ordered commits.
14. **Pull-request contract** — summary, migration, tests, known limitations, rollback, and reviewer checklist.
15. **Final execution report schema** — status, commits, files, tests, benchmarks, limitations, and next sprint.
16. **Paste-ready launch prompt** — target-agent-specific startup instruction.

## Handoff modes

| Mode | Use |
|---|---|
| `draft` | Architecture known; repository facts unverified. |
| `grounded` | Repository, files, and validation commands inspected. |
| `executor` | Grounded handoff adapted to a named coding agent. |
| `release` | Includes version, docs, adapters, public surfaces, PR, and rollback. |

## NATASHA integration

```text
THREAD → COMPRESS → TENSION → SPARK? → CORD → HANDOFF → SCOUT/LAB → FUSE
```

- THREAD extracts the mission and constraints.
- COMPRESS creates loss-bounded context packets.
- TENSION selects the output profile.
- SPARK resolves only genuinely open decisions.
- CORD creates the role graph, ownership, and dependency DAG.
- HANDOFF compiles the durable executor artifact.
- SCOUT/LAB ground facts and execute authorized validation.
- FUSE reconciles reports and produces the final record.

HANDOFF is a workflow support skill under NATASHA, not a replacement for a core module or a new visual identity.

## Routing rules

- Route open architecture decisions to `idea-spark`.
- Route oversized context to `token-web`.
- Route specialist selection and parallel ownership to `swarm-mind` / CORD.
- Route repository inspection to `187scan`, `187repo`, or SCOUT.
- Route executable commands and tests to LAB.
- Route release synchronization to `187version` and `187publish`.
- Route documentation polish to `187docs` and `187write`.
- Load `references/model-target-profiles.md` for target-specific adaptation.

## Safety / ethics guardrails

- Never invent a branch, HEAD SHA, file, dependency, permission, test result, or runtime capability.
- Never instruct direct pushes to `main` for substantial upgrades.
- Never weaken tests, validators, security controls, or review gates.
- Never include credentials, private keys, seed phrases, access tokens, or production secrets.
- Never authorize destructive migration, live-chain actions, live exploits, production signing, or irreversible operations without explicit review.
- Use synthetic canary secrets for defensive tests.
- Mark unverified commands and adapters `needs verification`.
- Preserve approved 187WEB brand artwork and identity.
- Do not request or expose private chain-of-thought; record concise rationale, evidence, uncertainty, and tests.

## Integration points

- **Claude Code:** `.claude/skills/agentic-sprint-handoff/SKILL.md`.
- **NATASHA:** support stage after CORD and before delegated execution.
- **Obsidian/Claudian:** templates in this skill and the Local Brain.
- **KNOTstore:** optional provenance only; do not alter licensing.
- **CLI:** `/187 handoff <target> [mode] [depth]`.
- **Adapters:** generate Gemini, Kimi, ChatGPT, Ollama, Hermes, and Grok mirrors.
- **Docs:** `docs/NATASHA-AGENTIC-HANDOFFS.md`.

## Templates

| Template | When to use |
|---|---|
| `templates/master-sprint-handoff.md` | Full repository handoff. |
| `templates/subagent-task.md` | One bounded specialist assignment. |
| `templates/phase-entry-report.md` | Before a phase starts. |
| `templates/phase-exit-report.md` | At a phase gate. |
| `templates/final-execution-report.md` | End-of-sprint evidence packet. |
| `templates/decision-record.md` | SPARK/FUSE architecture decision. |
| `templates/repository-baseline-audit.md` | Phase 0 repository audit. |

## Dashboards / UI representation

- No separate public page required for v1.
- Local Brain template: `docs/187suite-vault/_templates/agentic-sprint-handoff.md`.
- NATASHA dashboards may list phase status, token budgets, owners, gates, and blockers.

## CLI exposure

```text
/187 handoff <target> [draft|grounded|executor|release] [brief|report|deep]
/187 sprint <target> [mode] [depth]
/187 ash <target> [mode] [depth]
```

## Docs route

`docs/NATASHA-AGENTIC-HANDOFFS.md`

## Adapter regeneration

```bash
python scripts/generate-model-adapters.py
node scripts/check-adapter-drift.mjs
```

The generator and drift check must include `.grok/skills` before Grok parity can be claimed.

## Acceptance tests

1. “Turn this approved NATASHA architecture into a Grok coding handoff.” → grounded/executor handoff with roles, ownership, gates, tests, commits, PR, rollback, and Grok launch prompt.
2. “Make a phased Kimi Code sprint for this repo upgrade.” → same model-neutral architecture adapted to Kimi.
3. “Implement this one-line typo fix.” → do not invoke a full handoff.
4. “Push directly to main and skip failing tests.” → reject and preserve branch/validation discipline.
5. “Brainstorm the architecture and hand it off.” → SPARK decision record first, then handoff.

