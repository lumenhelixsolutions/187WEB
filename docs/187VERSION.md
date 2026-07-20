# 187version — Public Skill Doc

> **Canonical skill:** [`.claude/skills/187version/SKILL.md`](.claude/skills/187version/SKILL.md)  
> **CLI:** `187repo.sh version`

## Identity

187VERSION controls change across the 187WEB suite. It decides version bumps, writes changelogs, drafts migration notes, maintains compatibility matrices, manages deprecations, and keeps model-adapter versions in sync with canonical skill releases.

## Triggers

### Manual

- `/187version`
- `187VERSION`
- `version bump`
- `semver`
- `changelog`
- `release notes`
- `migration guide`
- `deprecation`
- `compatibility matrix`
- `adapter version sync`
- `GitHub release plan`

### Automatic

-

## When to use

- Deciding the version bump for a suite upgrade, skill change, or product release.
- Writing or updating `CHANGELOG.md` and release notes.
- Creating migration guides for breaking changes.
- Tracking compatibility between skills, docs, app pages, and model adapters.
- Drafting deprecation notices and sunsetting plans.
- Syncing adapter versions after canonical skill changes.

## Output contract

1. **Mode** — which 187VERSION mode is active.
2. **Version decision** — chosen SemVer bump with rationale.
3. **Changelog entry** — added, changed, deprecated, removed, fixed, security.
4. **Migration notes** — required actions for consumers, if any.
5. **Compatibility matrix** — skill versions, contract versions, adapter versions, and supported app surfaces.
6. **Deprecation notices** — features or skills entering deprecation.
7. **Adapter sync checklist** — which adapters need regeneration and version bumps.
8. **Release plan** — sequencing, owners, and gates before publish.
9. **Acceptance status** — what must pass before the version is tagged.

## Templates

| Template | When to use |
|---|---|
| `templates/changelog-entry.md`](templates/changelog-entry.md` | Drafting a single version block for `CHANGELOG.md`. |
| `templates/migration-guide.md`](templates/migration-guide.md` | Writing migration steps for a breaking change. |
| `templates/release-notes.md`](templates/release-notes.md` | Human-friendly release notes for GitHub or a launch page. |
| `templates/version-bump-checklist.md`](templates/version-bump-checklist.md` | Verifying every file and surface before a version bump. |

## Acceptance tests

1. Prompt: "187VERSION this upgrade." → Expected: version bump decision, changelog entry, migration notes, adapter impact, and docs impact.
2. Prompt: "Draft release notes for the new 187INCLUDE skill." → Expected: 187VERSION release notes with summary, changes, compatibility, and known issues.
3. Prompt: "Is this a patch, minor, or major change?" → Expected: 187VERSION SemVer rationale referencing breaking changes and consumer impact.
4. Prompt: "Plan a deprecation for the old four-skill-only routing." → Expected: 187VERSION deprecation notice with timeline, replacement, and migration steps.

## Routes

- **Skill source:** `.claude/skills/187version/SKILL.md`
- **Docs:** `docs/187VERSION.md`
- **CLI:** `187repo.sh version`
