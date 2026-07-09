# 187SKILLS — Operating Layer

**187WEB** is the public showcase: the brand, the demo, and the front door.  
**187SKILLS** is the operating layer: the short-name skills, aliases, and modules that turn intent into action.

Think of 187WEB as the sign above the shop and 187SKILLS as the workbench inside.

## Core suite

| Skill | One-line role |
|---|---|
| **187REPO** | Orchestrate, scaffold, deploy |
| **187CRAFT** | Design, UX, frontend |
| **187VIBE** | Delight, community, execution |
| **187LAUNCH** | Go-to-market intelligence |
| **187FREE** | No-cost stack engine |
| **187RESEARCH** | Research-grade lab engine |
| **187SEO** | Policy-aware search optimization |
| **187REVENUE** | Ethical revenue architecture |
| **187DOCS** | Documentation architecture engine |
| **187WRITE** | Suite-wide writing and polish |
| **187LEARN** | Learning experience engine |
| **187TEST** | Assessment and validation engine |
| **187ACCESS+** | Accessibility and inclusion engine |
| **187INCLUDE** | Identity-safe language engine |
| **187VERSION** | Version and release control engine |
| **187PUBLISH** | Release synchronization engine |

## Control + support layer

| Skill | One-line role |
|---|---|
| **187COMMAND** | Universal entry point and parser for `187 <alias>` requests |
| **187REPORT** | Situational summary, approval options, and next-action proposals |
| **187SCAN** | Quick audit, drift detection, and surface health checks |
| **187KIT** | Templates, scaffolds, design tokens, and pre-ship checklists |
| **187STANDARD** | Quality gates, conventions, and acceptance criteria |
| **187FLOW** | Workflow orchestration across multiple skills |

## Standalone-first behavior

Every skill is designed to act on its own first. A skill reads the request, scopes the work, produces output, and hands off only when another skill is genuinely needed. Coordination is explicit, not automatic.

## Command grammar

All short-name requests follow the same grammar:

```text
187 <alias> [target] [mode] [depth]
```

- `alias` — the short name that resolves to a skill (e.g., `repo`, `craft`, `seo`).
- `target` — the file, URL, component, or topic to operate on.
- `mode` — how the skill should work: `solo`, `assist`, `flow`, or `release`.
- `depth` — output detail: `brief`, `report`, or `deep`.

See [docs/187-NAMES.md](187-NAMES.md) for the full alias table and [docs/187-MODULES.md](187-MODULES.md) for the module definitions.
