# Deprecation Policy

Use this policy when sunsetting features, skills, modes, templates, CLI commands, or adapter formats.

## Goals

- Give consumers time and guidance to migrate.
- Avoid surprise breakage.
- Keep deprecated artifacts available in source history but hidden from new work.

## Deprecation stages

| Stage | Name | Duration | Behavior |
|---|---|---|---|
| 1 | Announce | At least one minor release | Log a warning; update docs; mark in changelog. |
| 2 | Maintain | At least one additional minor release | Keep functional but discourage new use. |
| 3 | Restrict | One major release | Remove from default routing and new scaffold output. |
| 4 | Remove | After major + one minor | Delete only with human approval and a migration window. |

## Deprecation notice format

```markdown
## Deprecated: <name>

- **Deprecated since:** 1.x.0
- **Removal planned:** 2.0.0
- **Replacement:** <new skill, mode, or command>
- **Migration:** <link to migration guide>
- **Rationale:** <why it is being removed>
```

## Required actions

When deprecating a skill or feature:

1. Update `CHANGELOG.md` with a deprecation section.
2. Update the skill’s `SKILL.md` frontmatter `status: deprecated` and `deprecated: true`.
3. Add a replacement pointer in the deprecated skill.
4. Update `187web-ecosystem` and `187web-manifest` routing to avoid the deprecated path.
5. Update adapters so new model files route to the replacement.
6. Publish migration guide using `templates/migration-guide.md`.
7. Notify consumers in release notes and docs.

## Hard rules

- Do not delete deprecated files without human approval.
- Do not repurpose a deprecated name for a different feature.
- Do not skip the announce stage for public skills.
- Keep deprecation notices actionable and time-bounded.
