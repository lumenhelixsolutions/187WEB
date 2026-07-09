# 187access+ — Public Skill Doc

> **Canonical skill:** [`.claude/skills/187access-plus/SKILL.md`](.claude/skills/187access-plus/SKILL.md)  
> **CLI:** `187repo.sh access`

## Identity

187ACCESS+ audits and improves disability accessibility, neurodivergent access, sensory access, assistive-technology support, cognitive accessibility, WCAG+, and inclusive access systems for 187web projects. It is the canonical home for the `187WCAG+` audit profile and the `187CARE` consent-first support alias.

## Triggers

### Manual

- `/187access-plus`
- `187ACCESS+`
- `a11y`
- `wcag`
- `wcag-plus`
- `accessibility audit`
- `cognitive access audit`
- `neurodivergent access`
- `screen reader audit`
- `keyboard navigation audit`
- `color contrast audit`
- `caption audit`
- `sensory load review`
- `reduced motion review`
- `accessible forms`
- `accessible authentication`
- `accommodation builder`
- `187CARE`

### Automatic

-

## When to use

- Auditing a page, app, form, checkout, course, quiz, docs page, or public surface.
- Designing for screen-reader, keyboard-only, low-vision, Deaf, hard-of-hearing, motor, cognitive, or neurodivergent users.
- Reviewing color contrast, motion, captions, transcripts, focus order, and plain language.
- Building accommodation plans or assistive-technology scouts.
- Reviewing public pages before publish.

## Output contract

1. **Mode** — which 187ACCESS+ mode is active.
2. **Audit scope** — pages, components, or flows reviewed.
3. **Profile** — WCAG level plus cognitive, neurodivergent, and sensory layers.
4. **Findings** — issue, severity, standard reference, affected users.
5. **Recommendations** — concrete fix, code snippet, or design change.
6. **Priority order** — blocker, high, medium, low.
7. **Plain-language summary** — non-technical explanation of impact.
8. **Accommodation plan** — short-term alternatives while fixes are built.
9. **187CARE notes** — consent-first support and communication guidance.
10. **Validation steps** — how to re-test with assistive tech or automated tools.
11. **Next actions** — tickets, owners, deadlines.

## Templates

| Template | When to use |
|---|---|
| `templates/access-audit-report.md`](templates/access-audit-report.md` | Structured findings and recommendations for a page or flow. |
| `templates/accommodation-plan.md`](templates/accommodation-plan.md` | Consent-first support plan for an individual or team. |
| `templates/wcag-plus-checklist.md`](templates/wcag-plus-checklist.md` | Pre-publish checklist covering WCAG plus cognitive and sensory access. |
| `templates/assistive-tech-scout.md`](templates/assistive-tech-scout.md` | Tool recommendations for a specific access need. |

## Acceptance tests

1. Prompt: "187ACCESS+ audit this checkout, course, quiz, and signup form." → Expected: WCAG profile, keyboard/screen-reader review, cognitive load review, plain-language review, form/auth accessibility, sensory/reduced-motion review.
2. Prompt: "Build an accommodation plan for a screen-reader user on our docs site." → Expected: 187ACCESS+ accommodation plan with consent-first support steps and validation plan.
3. Prompt: "Run a WCAG-plus audit on the landing page." → Expected: findings with severity, standard references, recommendations, and 187CARE communication notes.
4. Prompt: "Find assistive tech options for someone with motor impairments using our app." → Expected: 187ACCESS+ assistive-tech scout with tool categories and setup notes.

## Routes

- **Skill source:** `.claude/skills/187access-plus/SKILL.md`
- **Docs:** `docs/187ACCESS.md`
- **CLI:** `187repo.sh access`
