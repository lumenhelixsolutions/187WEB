# 187CHAR — Shared Scout

**187CHAR** is the Charlotte shared scout for web, source, and context help. It gathers external research, competitive intelligence, reference material, and live data, then threads the findings back into the active workspace as structured, citable notes.

## What CHAR does

- Research public documentation, changelogs, and APIs.
- Harvest references for 187RESEARCH, 187DOCS, and 187WRITE tasks.
- Build context packets for 187CRAFT, 187SEO, and 187LAUNCH work.
- Map findings to existing vault notes and generate stubs for new entities.

## When to use CHAR

- A topic needs external sources and the output must live in the workspace, not a browser tab.
- Competitive or reference material must be compared against the current project context.
- A task needs source-backed claims before any other skill acts.
- Public APIs, schemas, or datasets need to be located and summarized.

## CHAR compact check template

```markdown
- **Target / question:**
- **Source scope:**
- **Confidence:**
- **Key finding:**
- **Source URL / citation:**
- **Related note:**
- **Next action:**
```

Use one check per source or finding. CHAR compiles checks into a context packet before handing off.

## Safety and ethics

- Respect `robots.txt`, `noindex`, and `nofollow` directives.
- Rate-limit requests so the target server is not overloaded.
- Honor terms of service; do not crawl sites without permission.
- Do not bypass authentication, paywalls, or private endpoints.
- Cache and attribute sources; every finding must cite its origin.

## Legacy alias

`agent-charlotte` resolves to `char` in the alias table. The old name is still accepted for compatibility.

## Related docs

- [docs/187-MODULES.md](187-MODULES.md) — module definitions and CORD compact role card.
- [docs/187-NAMES.md](187-NAMES.md) — alias table including legacy names.
