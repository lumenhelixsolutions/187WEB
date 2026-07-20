> markdown
# Changelog Format

Standard format for `CHANGELOG.md` entries in 187web projects.

## Entry structure

```markdown
## [1.2.0] - 2026-07-09

### Added
- New 187INCLUDE skill for inclusive language and identity-field review.
- `187repo.sh include` CLI alias.

### Changed
- 187ACCESS+ now routes identity-field issues to 187INCLUDE.

### Deprecated
- Legacy four-skill-only routing in 187web-ecosystem.

### Removed
- Old placeholder templates in `.claude/skills/187access-plus/templates/`.

### Fixed
- Adapter generator now uses repo-relative root path.

### Security
- Identity fields no longer exposed in public skill index.
```

## Categories

Use these categories in this order:

1. `Added`
2. `Changed`
3. `Deprecated`
4. `Removed`
5. `Fixed`
6. `Security`

Omit empty categories.

## Version links

Link each version heading to the GitHub release comparison:

```markdown
## [1.2.0]

[1.2.0]: https://github.com/lumenhelixlab/187WEB/compare/v1.1.0...v1.2.0
```

## Unreleased section

Keep an `## [Unreleased]` section at the top for work in progress:

```markdown
## [Unreleased]

### Added
- Work in progress.
```

## Evidence labels

When a change relies on research or measurement, note the evidence basis in the entry:

```markdown
- Improved landing-page contrast (measured via APCA).
```
