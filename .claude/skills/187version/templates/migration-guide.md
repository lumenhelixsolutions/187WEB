# Migration Guide

Use this template when a release introduces breaking changes.

## From version

{{previous_version}}

## To version

{{new_version}}

## Who is affected

Describe the consumers, projects, or integrations that need to migrate.

## Breaking changes

| Feature | Old behavior | New behavior | Action required |
|---|---|---|---|
| | | | |

## Step-by-step migration

1. Backup current configuration.
2. Update dependency version to `{{new_version}}`.
3. Replace deprecated commands or imports.
4. Run the validation script:
   ```bash
   npm run skills:validate
   ```
5. Review generated adapter drift:
   ```bash
   npm run adapters:drift
   ```
6. Update custom templates to match the new output contract.
7. Run the test suite:
   ```bash
   npm run test
   ```

## Deprecation timeline

| Stage | Version | Date | Status |
|---|---|---|---|
| Announce | | | |
| Maintain | | | |
| Restrict | | | |
| Remove | | | |

## Rollback plan

If the migration causes issues, revert to `{{previous_version}}` and contact the maintainers.

## Support

- Open an issue: [https://github.com/LumenHelixLab/187WEB/issues](https://github.com/LumenHelixLab/187WEB/issues)
- Review the full changelog: `CHANGELOG.md`
