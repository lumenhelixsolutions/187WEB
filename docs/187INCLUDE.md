# 187INCLUDE+ — Public Skill Doc

> **Canonical skill:** [`.claude/skills/187include/SKILL.md`](.claude/skills/187include/SKILL.md)  
> **CLI:** `187repo.sh include`

## Identity

187INCLUDE+ is the suite-wide inclusion engine for 187WEB projects. It covers **neurodivergence** (Autism, ADHD, OCD, dyslexia, dyspraxia, Tourette’s) and **identity safety** (LGBTQ+ inclusion, pronoun-safe systems, anti-bias review, community safety). It reviews copy, forms, identity fields, sensory design, plain language, and cognitive load so every public surface is safe, predictable, and respectful.

## Triggers

### Manual

- `/187include+`
- `187INCLUDE+`
- `include+`
- `neurodivergent`
- `autism friendly`
- `ADHD friendly`
- `OCD friendly`
- `sensory safe`
- `plain language`
- `cognitive load`
- `executive function`
- `dyslexia friendly`
- `identity safe`
- `pronouns`
- `inclusive language`
- `pronoun review`
- `LGBTQ inclusion`
- `gender inclusive forms`
- `anti-bias review`
- `deadname check`
- `misgendering risk review`
- `community safety review`
- `identity field design`
- `187CARE` *(when identity or pronoun safety is the focus)*

### Automatic

-

## When to use

- Reviewing public copy, marketing, onboarding, docs, course content, quizzes, or launch pages for identity safety and plain language.
- Designing or auditing name, pronoun, gender, title, or salutation fields.
- Assessing deadname or misgendering risk in forms, databases, emails, or migrations.
- Building Autism-, ADHD-, or OCD-friendly UX with predictable patterns, reduced ambiguity, and executive-function support.
- Designing sensory-safe interfaces: dimmable motion, readable fonts, clear hierarchy, and optional intensity.
- Drafting community safety language, codes of conduct, or support responses.
- Policing stereotypes, tokenism, or culturally loaded terms before publish.

## Output contract

1. **Mode** — which 187INCLUDE+ mode is active.
2. **Scope** — copy, form, field, flow, sensory surface, or community surface reviewed.
3. **Neurodivergent review** — Autism/ADHD/OCD/dyslexia considerations and recommendations.
4. **Sensory profile** — motion, sound, color, font, and hierarchy guidance.
5. **Plain-language score** — readability and ambiguity assessment.
6. **Identity field design** — recommendations for name, pronoun, gender, title, and visibility controls.
7. **Pronoun handling** — how pronouns are collected, stored, displayed, and defaulted.
8. **Deadname / misgendering risk** — data scenarios and mitigation steps.
9. **Inclusive rewrite** — concrete replacement text where needed.
10. **Cognitive-load map** — where the UI demands too much working memory or executive function.
11. **Community safety notes** — harassment vectors, escalation paths, and supportive language.
12. **Prioritized recommendations** — blocker, high, medium, low.
13. **Validation steps** — review with affected community members, audit exports, and test flows.

## Templates

| Template | When to use |
|---|---|
| `templates/inclusion-review-report.md` | Structured findings and rewrites for a page, form, or content block. |
| `templates/neurodivergent-ux-checklist.md` | Autism/ADHD/OCD-friendly UX review. |
| `templates/gender-inclusive-form-template.md` | Designing name, pronoun, gender, title, and visibility fields. |
| `templates/plain-language-rewrite.md` | Simplifying complex prose. |
| `templates/community-safety-plan.md` | Code of conduct, support response, and harassment-escalation language. |

## Acceptance tests

1. Prompt: "187INCLUDE+ review this profile form for pronouns, names, gender fields, and privacy." → Expected: pronoun-safe handling, name privacy, deadname risk review, gender-inclusive form recommendations, consent and visibility controls.
2. Prompt: "Make this landing page copy more inclusive and plain-language." → Expected: 187INCLUDE+ terminology review, inclusive rewrite, plain-language score, and prioritized recommendations.
3. Prompt: "Check this quiz for misgendering, anti-bias, and cognitive-load risks." → Expected: 187INCLUDE+ bias review, cognitive-load map, and concrete replacement items with validation steps.
4. Prompt: "Design an Autism- and ADHD-friendly settings panel." → Expected: 187INCLUDE+ neurodivergent review with predictable patterns, sensory profile, executive-function support, and validation steps.
5. Prompt: "Design a community code of conduct for our forum." → Expected: 187INCLUDE+ community safety plan with escalation paths and identity-safe language.

## Routes

- **Skill source:** `.claude/skills/187include/SKILL.md`
- **Docs:** `docs/187INCLUDE.md`
- **CLI:** `187repo.sh include`
