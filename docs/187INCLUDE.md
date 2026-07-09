# 187include — Public Skill Doc

> **Canonical skill:** [`.claude/skills/187include/SKILL.md`](.claude/skills/187include/SKILL.md)  
> **CLI:** `187repo.sh include`

## Identity

187INCLUDE is the suite-wide inclusion engine for 187WEB projects. It reviews copy, forms, identity fields, names, pronouns, and community language for LGBTQ+ inclusion, anti-bias safety, and identity-safe UX. It is the canonical home for the `pronouns` alias and works across every public and internal surface that touches people’s identities.

## Triggers

### Manual

- `/187include`
- `187INCLUDE`
- `pronouns`
- `inclusive language`
- `pronoun review`
- `LGBTQ inclusion`
- `gender inclusive forms`
- `name privacy review`
- `deadname risk review`
- `misgendering risk review`
- `anti-bias review`
- `community safety review`
- `identity field design`
- `187CARE` *(when identity or pronoun safety is the focus)*

### Automatic

-

## When to use

- Reviewing public copy, marketing, onboarding, docs, course content, quizzes, or launch pages for identity safety.
- Designing or auditing name, pronoun, gender, title, or salutation fields.
- Assessing deadname or misgendering risk in forms, databases, emails, or migrations.
- Drafting community safety language, codes of conduct, or support responses.
- Policing stereotypes, tokenism, or culturally loaded terms before publish.

## Output contract

1. **Mode** — which 187INCLUDE mode is active.
2. **Scope** — copy, form, field, flow, or community surface reviewed.
3. **Terminology review** — flagged terms, suggested replacements, and rationale.
4. **Identity field design** — recommendations for name, pronoun, gender, title, and visibility controls.
5. **Pronoun handling** — how pronouns are collected, stored, displayed, and defaulted.
6. **Deadname / misgendering risk** — data scenarios and mitigation steps.
7. **Inclusive rewrite** — concrete replacement text where needed.
8. **Privacy and consent controls** — who can see identity data and how consent is recorded.
9. **Community safety notes** — harassment vectors, escalation paths, and supportive language.
10. **Prioritized recommendations** — blocker, high, medium, low.
11. **Validation steps** — review with affected community members, audit exports, and test flows.

## Templates

| Template | When to use |
|---|---|
| `templates/inclusion-review-report.md`](templates/inclusion-review-report.md` | Structured findings and rewrites for a page, form, or content block. |
| `templates/gender-inclusive-form-template.md`](templates/gender-inclusive-form-template.md` | Designing name, pronoun, gender, title, and visibility fields. |
| `templates/pronoun-safe-copy-checklist.md`](templates/pronoun-safe-copy-checklist.md` | Pre-publish copy checklist for pronoun and identity safety. |
| `templates/community-safety-plan.md`](templates/community-safety-plan.md` | Code of conduct, support response, and harassment-escalation language. |

## Acceptance tests

1. Prompt: "187INCLUDE review this profile form for pronouns, names, gender fields, and privacy." → Expected: pronoun-safe handling, name privacy, deadname risk review, gender-inclusive form recommendations, consent and visibility controls.
2. Prompt: "Make this landing page copy more inclusive." → Expected: 187INCLUDE terminology review, inclusive rewrite, and prioritized recommendations.
3. Prompt: "Check this quiz for misgendering and anti-bias risks." → Expected: 187INCLUDE bias review with concrete replacement items and validation steps.
4. Prompt: "Design a community code of conduct for our forum." → Expected: 187INCLUDE community safety plan with escalation paths and identity-safe language.

## Routes

- **Skill source:** `.claude/skills/187include/SKILL.md`
- **Docs:** `docs/187INCLUDE.md`
- **CLI:** `187repo.sh include`
