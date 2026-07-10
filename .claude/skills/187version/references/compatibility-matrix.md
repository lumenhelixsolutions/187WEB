# Compatibility Matrix

Use this matrix to record which versions of skills, docs, app pages, and adapters work together for a given suite release.

## Suite release row

| Suite version | 187REPO | 187CRAFT | 187VIBE | 187LAUNCH | 187FREE | 187RESEARCH | 187SEO | 187REVENUE | 187DOCS | 187WRITE | 187LEARN | 187TEST | 187ACCESS+ | 187INCLUDE | 187VERSION | 187PUBLISH |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 0.1.0 | 1.0.0 | 1.0.0 | 1.0.0 | 1.0.0 | 1.0.0 | 1.0.0 | 1.0.0 | 1.0.0 | 1.0.0 | 1.0.0 | 1.0.0 | 1.0.0 | 1.0.0 | 1.0.0 | 1.0.0 | 1.0.0 |

## Cross-surface compatibility

| Surface | Minimum suite version | Notes |
|---|---|---|
| `docs/SKILL-CONTRACT.md` v2.0.0 | 0.1.0 | Required by all first-class skills. |
| `app/page.tsx` | 0.1.0 | Must list every first-class skill. |
| `app/187version/page.tsx` | 0.1.0 | Planned. |
| `app/187publish/page.tsx` | 0.1.0 | Planned. |
| `scripts/187repo.sh` | 0.1.0 | Must expose all skill aliases. |
| Model adapters | 0.1.0 | Regenerated from `.claude/skills` canonical source. |

## Contract compatibility

| Contract version | Compatible suite versions | Breaking changes |
|---|---|---|
| 2.0.0 | 0.1.0+ | Initial contract for expanded suite. |

## Adapter compatibility

| Adapter target | Source path | Sync command |
|---|---|---|
| Gemini | `.gemini/skills/<name>/` | `python scripts/generate-model-adapters.py` |
| Kimi | `.kimi/skills/<name>/` | `python scripts/generate-model-adapters.py` |
| ChatGPT | `.chatgpt/skills/<name>/` | `python scripts/generate-model-adapters.py` |
| Ollama | `.ollama/modelfiles/<name>/` | `python scripts/generate-model-adapters.py` |
| Herme | `.herme/agents/<name>/` | `python scripts/generate-model-adapters.py` |

## Updating the matrix

When a skill version changes:

1. Update the skill cell in the suite release row.
2. If the contract version changed, add a new contract compatibility row.
3. If a surface becomes incompatible, note it in the cross-surface table and provide a migration path.
