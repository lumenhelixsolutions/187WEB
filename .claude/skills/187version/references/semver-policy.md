# Semantic Versioning Policy

187VERSION follows [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html) for all public 187web artifacts.

## Version format

```text
MAJOR.MINOR.PATCH
```

| Segment | Bump when |
|---|---|
| MAJOR | Incompatible changes to public API, skill contract, or CLI surface. |
| MINOR | New functionality added in a backward-compatible way. |
| PATCH | Backward-compatible bug fixes, corrections, or security patches. |

## 187web-specific rules

### Suite version

The suite version in `package.json`, `AGENTS.md`, and the public showcase reflects the overall 187SKILLS release. Bump:

- **MAJOR** when a first-class skill is removed, renamed, or its contract changes incompatibly.
- **MINOR** when a new first-class skill is added or a significant new feature ships.
- **PATCH** when fixes, docs updates, or adapter corrections ship with no new skills.

### Skill version

Each `SKILL.md` frontmatter `skill_version` tracks that skill independently. Bump:

- **MAJOR** when the skill’s input contract, output contract, or routing rules change incompatibly.
- **MINOR** when a new mode, template, or integration is added.
- **PATCH** when guidance, examples, or non-breaking clarifications are updated.

### Contract version

`contract_version` in frontmatter matches `docs/SKILL-CONTRACT.md`. Bump only when the contract itself changes.

## Pre-release labels

Use pre-release labels for work that is not yet stable:

```text
1.2.0-alpha.1
1.2.0-beta.2
1.2.0-rc.1
```

Pre-releases must not be tagged as `latest` and must not be mirrored to stable adapter branches without review.

## Determining the bump

Ask these questions in order:

1. Does this change break an existing public contract, API, or CLI command? → **MAJOR**
2. Does this add a new public feature, skill, or mode? → **MINOR**
3. Does this fix a bug or improve guidance without adding features? → **PATCH**
4. Is this purely internal refactoring with no observable effect? → No version change required, but document in changelog if user-facing.

## Zero-major versions

`0.x.x` versions may introduce breaking changes in minor releases. The 187web suite targets `1.0.0` once the first public showcase is stable.
