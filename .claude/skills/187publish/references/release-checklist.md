# Release Checklist

Master checklist used by 187PUBLISH before approving a suite release.

## Pre-gates

- [ ] Branch is `claude/187skills-master-evolution` or an approved release branch.
- [ ] All changes are committed and pushed.
- [ ] Target version is set by 187VERSION.
- [ ] `CHANGELOG.md` has an entry for the target version.

## Permanent pipeline completion

- [ ] 187VERSION completed: version bump, changelog, migration notes, compatibility matrix.
- [ ] 187DOCS completed: README, install guide, API docs, command docs, internal docs updated.
- [ ] 187WRITE completed: public copy, examples, explanations, and launch language polished.
- [ ] 187ACCESS+ completed: disability, cognitive, neurodivergent, form, auth, docs, and public-page review.
- [ ] 187INCLUDE completed: pronouns, identity fields, names, deadname risk, misgendering risk, and terminology review.
- [ ] 187SEO completed: metadata, structured data, search clarity, crawlability, and anti-spam review.

## Surface sync

- [ ] `README.md` lists every first-class skill.
- [ ] `AGENTS.md` lists every first-class skill.
- [ ] `PLAN.md` reflects current priorities.
- [ ] `CHANGELOG.md` is up to date.
- [ ] `docs/INSTALL.md` lists all CLI commands.
- [ ] `docs/MODEL-ADAPTERS.md` reflects all generated formats.
- [ ] Every first-class skill has a canonical `.claude/skills/<name>/SKILL.md`.
- [ ] Every first-class skill has a docs route file.
- [ ] Every first-class skill has an app/showcase page or explicit public-surface entry.
- [ ] Every first-class skill has generated model adapters.

## Quality gates

- [ ] `npm install` completed.
- [ ] `npm run lint` passes.
- [ ] `npm run typecheck` passes.
- [ ] `npm run build` passes.
- [ ] `npm run skills:validate` passes.
- [ ] `npm run release:validate` passes.
- [ ] `npm run docs:drift` passes.
- [ ] `npm run adapters:drift` passes.
- [ ] `npm run showcase:sync` passes.
- [ ] `python scripts/generate-model-adapters.py` runs cleanly.

## Final approval

- [ ] No CI failures.
- [ ] No accessibility blockers.
- [ ] No inclusion blockers.
- [ ] No SEO spam risks.
- [ ] No unreviewed revenue, health, disability, financial, or legal claims.
- [ ] Release notes approved.
- [ ] GitHub release drafted.

## Post-release

- [ ] Git tag `v<version>` pushed.
- [ ] GitHub release published.
- [ ] GitHub Pages showcase updated.
- [ ] Adapters committed to their respective folders.
