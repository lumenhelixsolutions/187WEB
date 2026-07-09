# Adapter Sync Checklist

Use this checklist after canonical skill changes to ensure model adapters are regenerated consistently.

## Before regeneration

- [ ] All canonical `.claude/skills/<name>/SKILL.md` files are stable.
- [ ] `docs/SKILL-CONTRACT.md` is at the expected version.
- [ ] No uncommitted adapter changes exist, or they have been reviewed.

## Regeneration

```bash
python scripts/generate-model-adapters.py
```

## Targets

| Target | Output path | Status |
|---|---|---|
| Gemini | `.gemini/skills/<name>/SKILL.md` | |
| Kimi | `.kimi/skills/<name>/SKILL.md` | |
| ChatGPT | `.chatgpt/skills/<name>/SKILL.md` | |
| Ollama | `.ollama/modelfiles/<name>/` | |
| Herme | `.herme/agents/<name>/` | |

## Verification

- [ ] Every first-class skill has an adapter entry.
- [ ] Adapter frontmatter matches canonical skill frontmatter.
- [ ] No adapter contains stale routing rules.
- [ ] No adapter contains unfinished markers or placeholder text.
- [ ] `.grok/skills` mirror is updated if Grok is in scope.

## Drift check

```bash
npm run adapters:drift
```

- [ ] Command passes with no unexpected diffs.
- [ ] Any expected diffs are documented in the release notes.

## Commit

- [ ] Adapter changes staged.
- [ ] Commit message references the version or skill changes.
- [ ] Adapter docs updated if format changed.
