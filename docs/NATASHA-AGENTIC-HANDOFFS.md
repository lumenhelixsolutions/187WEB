# NATASHA Agentic Sprint Handoffs

`agentic-sprint-handoff` is the general Claude Code skill that converts an approved plan into an execution-ready, phased and milestoned coding handoff.

```text
THREAD → COMPRESS → TENSION → SPARK? → CORD → HANDOFF → SCOUT/LAB → FUSE
```

HANDOFF is a workflow support skill. It does not replace the eight NATASHA core modules or create a new brand layer.

Commands:

```text
/187 handoff <target> [draft|grounded|executor|release] [brief|report|deep]
/187 sprint <target> [mode] [depth]
/187 ash <target> [mode] [depth]
```

Canonical source: `.claude/skills/agentic-sprint-handoff/SKILL.md`.

Adapters must be generated from the canonical Claude skill. Add `.grok/skills` to adapter generation and drift checks before claiming Grok parity.
