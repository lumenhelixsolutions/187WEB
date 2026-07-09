# 187publish — Public Skill Doc

> **Canonical skill:** [`.claude/skills/187publish/SKILL.md`](.claude/skills/187publish/SKILL.md)  
> **CLI:** `187repo.sh publish`

## Identity

187PUBLISH is the final gate in the 187WEB release pipeline. It audits every public surface for drift, synchronizes docs, READMEs, command pages, install docs, model-adapter docs, skill indexes, app routes, GitHub Pages showcases, screenshots, and demos, and produces a go/no-go decision for the release.

## Triggers

### Manual

- `/187publish`
- `187PUBLISH`
- `publish audit`
- `release sync`
- `docs drift`
- `showcase drift`
- `GitHub Pages sync`
- `README sync`
- `command page sync`
- `install doc update`
- `skill index update`
- `SEO publish check`
- `accessibility publish check`
- `inclusion publish check`

### Automatic

-

## When to use

- Before any public release or suite upgrade.
- When docs, app routes, adapters, README, or CHANGELOG may be out of sync.
- Preparing or updating the GitHub Pages product showcase or launch page.
- After 187VERSION, 187DOCS, 187WRITE, 187ACCESS+, 187INCLUDE, and 187SEO have run.

## Output contract

1. **Mode** — which 187PUBLISH mode is active.
2. **Surface inventory** — every public or internal surface that must be synchronized.
3. **Drift findings** — missing updates, stale references, or inconsistent claims.
4. **Sync actions** — concrete file changes and owners.
5. **Release checklist** — completed and pending gates.
6. **SEO publish check** — metadata, structured data, URLs, and crawlability status.
7. **Accessibility publish check** — WCAG-plus review status for public pages.
8. **Inclusion publish check** — identity-safe copy and form review status.
9. **GitHub Pages plan** — showcase updates, launch page, and asset plan.
10. **Final go/no-go** — release decision with blockers and follow-ups.

## Templates

| Template | When to use |
|---|---|
| `templates/release-sync-plan.md`](templates/release-sync-plan.md` | Mapping every surface to its required update for a release. |
| `templates/publish-gate-report.md`](templates/publish-gate-report.md` | Final go/no-go report with blockers and evidence. |
| `templates/github-pages-launch-checklist.md`](templates/github-pages-launch-checklist.md` | Checklist for updating the GitHub Pages product showcase. |
| `templates/adapter-sync-checklist.md`](templates/adapter-sync-checklist.md` | Verifying model adapters are regenerated and consistent. |

## Acceptance tests

1. Prompt: "187PUBLISH audit the suite for docs drift and showcase drift." → Expected: README coverage, AGENTS coverage, docs coverage, app route coverage, GitHub Pages coverage, adapter coverage, CI status, and release checklist.
2. Prompt: "Sync the release surfaces for the 187INCLUDE skill launch." → Expected: 187PUBLISH release sync plan listing README, AGENTS, docs, app, showcase, adapters, and install-doc updates.
3. Prompt: "Run the accessibility and inclusion publish checks." → Expected: 187PUBLISH confirmation that 187ACCESS+ and 187INCLUDE reviews are complete, with any blockers listed.
4. Prompt: "Prepare the GitHub Pages launch checklist." → Expected: 187PUBLISH GitHub Pages launch checklist with homepage copy, skill routes, screenshots, and SEO metadata.

## Routes

- **Skill source:** `.claude/skills/187publish/SKILL.md`
- **Docs:** `docs/187PUBLISH.md`
- **CLI:** `187repo.sh publish`
