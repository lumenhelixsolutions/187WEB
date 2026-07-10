# Docs Drift Map

Tracks dependencies between canonical skills, docs, app pages, and adapters so 187PUBLISH can detect drift.

## Skill → doc mapping

| Skill | Canonical skill | Required doc | Required app page |
|---|---|---|---|
| 187REPO | `.claude/skills/187repo/SKILL.md` | `docs/187REPO.md` | `app/187repo/page.tsx` |
| 187CRAFT | `.claude/skills/187craft/SKILL.md` | `docs/187CRAFT.md` | `app/187craft/page.tsx` |
| 187VIBE | `.claude/skills/187vibe/SKILL.md` | `docs/187VIBE.md` | `app/187vibe/page.tsx` |
| 187LAUNCH | `.claude/skills/187launch/SKILL.md` | `docs/187LAUNCH.md` | `app/187launch/page.tsx` |
| 187FREE | `.claude/skills/187free/SKILL.md` | `docs/187FREE.md` | `app/187free/page.tsx` |
| 187RESEARCH | `.claude/skills/187research/SKILL.md` | `docs/187RESEARCH.md` | `app/187research/page.tsx` |
| 187SEO | `.claude/skills/187seo/SKILL.md` | `docs/187SEO.md` | `app/187seo/page.tsx` |
| 187REVENUE | `.claude/skills/187revenue/SKILL.md` | `docs/187REVENUE.md` | `app/187revenue/page.tsx` |
| 187DOCS | `.claude/skills/187docs/SKILL.md` | `docs/187DOCS.md` | `app/187docs/page.tsx` |
| 187WRITE | `.claude/skills/187write/SKILL.md` | `docs/187WRITE.md` | `app/187write/page.tsx` |
| 187LEARN | `.claude/skills/187learn/SKILL.md` | `docs/187LEARN.md` | `app/187learn/page.tsx` |
| 187TEST | `.claude/skills/187test/SKILL.md` | `docs/187TEST.md` | `app/187test/page.tsx` |
| 187ACCESS+ | `.claude/skills/187access-plus/SKILL.md` | `docs/187ACCESS.md` | `app/187access/page.tsx` |
| 187INCLUDE | `.claude/skills/187include/SKILL.md` | `docs/187INCLUDE.md` | `app/187include/page.tsx` |
| 187VERSION | `.claude/skills/187version/SKILL.md` | `docs/187VERSION.md` | `app/187version/page.tsx` |
| 187PUBLISH | `.claude/skills/187publish/SKILL.md` | `docs/187PUBLISH.md` | `app/187publish/page.tsx` |

## Common drift patterns

| Drift | Cause | Fix |
|---|---|---|
| Skill added but doc missing | Phase 2 skipped doc creation | Create doc using skill frontmatter and contract. |
| Doc updated but app page stale | Phase 5 not run | Update app page copy and route. |
| Canonical skill changed but adapters stale | Adapter regeneration missed | Run `python scripts/generate-model-adapters.py`. |
| README missing skill | Router sync incomplete | Add skill to `README.md` and `AGENTS.md`. |
| Install doc missing CLI alias | Phase 4 skipped | Add alias to `scripts/187repo.sh`, `scripts/187repo.ps1`, and `docs/INSTALL.md`. |

## Drift detection commands

```bash
npm run docs:drift
npm run adapters:drift
npm run showcase:sync
npm run release:validate
```
