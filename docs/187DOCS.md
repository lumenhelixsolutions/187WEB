# 187docs — Public Skill Doc

> **Canonical skill:** [`.claude/skills/187docs/SKILL.md`](.claude/skills/187docs/SKILL.md)  
> **CLI:** `187repo.sh docs`

## Identity

187DOCS designs, writes, audits, and repairs documentation systems for 187WEB projects. It covers READMEs, install guides, quickstarts, how-to guides, reference docs, explanation docs, troubleshooting, SOPs, changelogs, architecture docs, user manuals, developer docs, API docs, docs audits, and docs drift repair. It follows the Diátaxis framework: tutorials, how-to guides, reference, explanation.

## Triggers

### Manual

- `/187docs`
- `187DOCS`
- `docs this`
- `write README`
- `install guide`
- `quickstart`
- `how to guide`
- `API docs`
- `troubleshooting`
- `SOP`
- `docs audit`
- `docs sync`

### Automatic

-

## When to use

- Creating or restructuring project documentation.
- Writing install guides, quickstarts, how-to guides, and reference material.
- Building API docs, SOPs, user manuals, or architecture documentation.
- Auditing docs for drift, completeness, or outdated content.
- Synchronizing docs across README, AGENTS.md, docs site, and app pages.

## Output contract

1. **Mode** — which 187DOCS mode is active.
2. **Audience** — who the doc serves.
3. **Doc-type mapping** — which Diátaxis quadrant each section belongs to.
4. **Structure** — headings, sections, and navigation order.
5. **Draft content** — body copy following the project voice.
6. **Code / command examples** — tested or marked as needing verification.
7. **Cross-references** — links to related docs, skills, or templates.
8. **Drift repair notes** — outdated sections to update.
9. **187WRITE polish pass** — editorial review required before publish.
10. **Next actions** — edits, reviews, and sync tasks.

## Templates

| Template | When to use |
|---|---|
| `templates/README.md`](templates/README.md` | Project landing doc. |
| `templates/install-guide.md`](templates/install-guide.md` | Step-by-step environment setup. |
| `templates/quickstart.md`](templates/quickstart.md` | First success in minutes. |
| `templates/how-to-guide.md`](templates/how-to-guide.md` | Goal-oriented task instructions. |
| `templates/reference-doc.md`](templates/reference-doc.md` | Fact lookup, commands, schemas. |
| `templates/explanation-doc.md`](templates/explanation-doc.md` | Conceptual background and why. |
| `templates/troubleshooting-guide.md`](templates/troubleshooting-guide.md` | Error diagnosis and recovery. |
| `templates/SOP.md`](templates/SOP.md` | Repeatable operational procedure. |
| `templates/API-docs.md`](templates/API-docs.md` | API endpoint and schema reference. |
| `templates/changelog-entry.md`](templates/changelog-entry.md` | Version change entry. |

## Acceptance tests

1. Prompt: "187DOCS this repo." → Expected: README, install guide, quickstart, how-to, reference, explanation, troubleshooting, 187WRITE polish, 187PUBLISH final sync.
2. Prompt: "Write API docs for the /invoices endpoint." → Expected: 187DOCS API-docs template output with request/response schema and examples.
3. Prompt: "Audit our docs for drift." → Expected: 187DOCS audit checklist applied, outdated sections flagged, sync plan generated.

## Routes

- **Skill source:** `.claude/skills/187docs/SKILL.md`
- **Docs:** `docs/187DOCS.md`
- **CLI:** `187repo.sh docs`
