# 187SKILLS Routing Guide

This doc is the source of truth for how requests map to skills in the 187SKILLS suite.

## Trigger hierarchy

1. **Explicit skill name** — e.g., `187seo`, `/187free`. Route directly.
2. **Domain keyword** — e.g., "schema", "free tier", "affiliate". Route to the matching skill.
3. **Ambiguous `187` / `187 this`** — run `187REPORT` first; propose approval options.
4. **Public surface requirement** — any page, form, checkout, course, quiz, or docs update must include `187ACCESS+` and `187INCLUDE` review.

## Skill ownership

| Domain | Primary skill | Common co-routes |
|---|---|---|
| Repo generation / deploy / installer | `187REPO` | `187VERSION`, `187PUBLISH` |
| Design / frontend / UI/UX | `187CRAFT` | `187VIBE`, `187ACCESS+`, `187INCLUDE` |
| Delight / onboarding / retention / community | `187VIBE` | `187CRAFT`, `187ACCESS+` |
| Go-to-market / launch / outreach | `187LAUNCH` | `187SEO`, `187WRITE`, `187PUBLISH` |
| Free / open-source / local-first stacks | `187FREE` | `187RESEARCH`, `187DOCS` |
| Research / sources / labs / reproducibility | `187RESEARCH` | `187FREE`, `187DOCS`, `187VERSION` |
| SEO / AEO / GEO / structured data | `187SEO` | `187CRAFT`, `187WRITE`, `187ACCESS+` |
| Revenue / pricing / payments / affiliate | `187REVENUE` | `187LAUNCH`, `187DOCS`, `187ACCESS+` |
| Documentation / README / SOP / API docs | `187DOCS` | `187WRITE`, `187PUBLISH` |
| Writing / copy / plain language | `187WRITE` | `187DOCS`, `187SEO`, `187LAUNCH` |
| Courses / learning paths / workshops | `187LEARN` | `187TEST`, `187ACCESS+`, `187INCLUDE` |
| Quizzes / surveys / rubrics | `187TEST` | `187LEARN`, `187ACCESS+`, `187INCLUDE` |
| Accessibility / WCAG+ / inclusion | `187ACCESS+` | `187INCLUDE`, `187CRAFT` |
| Identity-safe language / pronouns | `187INCLUDE` | `187ACCESS+`, `187DOCS` |
| Versioning / changelogs / releases | `187VERSION` | `187PUBLISH`, `187DOCS` |
| Release sync / showcase / adapters | `187PUBLISH` | `187VERSION`, `187DOCS`, `187SEO` |

## Anti-patterns

- Do not route research questions to `187VIBE`.
- Do not route SEO strategy to `187LAUNCH`.
- Do not route revenue architecture to `187LAUNCH`.
- Do not publish any public page without `187ACCESS+` and `187INCLUDE` review.
- Do not make WCAG, ADA, revenue, health, legal, or SEO guarantees without evidence and human review.
