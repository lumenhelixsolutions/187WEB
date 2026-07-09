# Version Bump Checklist

Use this checklist before finalizing a version bump.

## Version decision

- [ ] SemVer bump determined (patch / minor / major).
- [ ] Rationale documented in 187VERSION output.
- [ ] Breaking changes identified and migration guide drafted.

## Files to update

- [ ] `package.json` version
- [ ] `CHANGELOG.md` updated with new version block
- [ ] Skill frontmatter `skill_version` updated for changed skills
- [ ] Skill frontmatter `last_updated` updated
- [ ] `docs/SKILL-CONTRACT.md` contract version reviewed
- [ ] `README.md` version badge or mention updated
- [ ] `AGENTS.md` suite version updated

## Surface sync

- [ ] `app/page.tsx` lists all first-class skills
- [ ] New app routes exist for new skills
- [ ] `docs/INSTALL.md` lists new CLI commands
- [ ] `docs/MODEL-ADAPTERS.md` reflects adapter formats
- [ ] GitHub Pages showcase updated

## Quality gates

- [ ] `npm run lint` passes
- [ ] `npm run typecheck` passes
- [ ] `npm run build` passes
- [ ] `npm run skills:validate` passes
- [ ] `npm run release:validate` passes
- [ ] `npm run docs:drift` passes
- [ ] `npm run adapters:drift` passes
- [ ] `npm run showcase:sync` passes

## Reviews

- [ ] 187ACCESS+ review completed if public surfaces changed
- [ ] 187INCLUDE review completed if public copy changed
- [ ] 187SEO review completed if routes or metadata changed
- [ ] 187PUBLISH audit completed

## Tag and release

- [ ] Git tag `v{{version}}` created
- [ ] GitHub release drafted
- [ ] Release notes published
- [ ] Adapter regeneration run and committed
