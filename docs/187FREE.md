# 187free — Public Skill Doc

> **Canonical skill:** [`.claude/skills/187free/SKILL.md`](.claude/skills/187free/SKILL.md)  
> **CLI:** `187repo.sh free`

## Identity

187FREE is the Lumen Helix no-cost solution engine. It finds practical free, free-tier, open-source, local-first, public-domain, public-API, and low-cost bootstrap solutions for software, research, accessibility, civic tech, education, publishing, automation, data, AI, hosting, and client-budget needs.

## Triggers

### Manual

- `/187free`
- `187FREE`
- `free stack`
- `free solution`
- `cheapest way`
- `no-cost option`
- `bootstrap this`

### Automatic

-

## When to use

- Choosing a no-cost stack for a landing page, MVP, demo, or client project.
- Finding open-source or local-first alternatives to paid tools.
- Scouting free public APIs, datasets, or hosting tiers.

## Output contract

1. **Need** — restated problem.
2. **Best Free Pick** — single best option with justification.
3. **Two Backup Options** — viable alternatives.
4. **Complete Free Stack Recipe** — if relevant, full wiring.
5. **Why This Works** — scoring rationale.
6. **Gotchas** — limits, quotas, expiration, telemetry.
7. **Privacy/Sensitivity Review** — data handling and consent.
8. **Upgrade Path** — what changes when free limits hit.
9. **Recommendation** — `use now` / `test first` / `avoid` / `paid upgrade likely later`.

## Templates

| Template | When to use |
|---|---|
| `templates/free-stack-recipe.md` | [`templates/free-stack-recipe.md`](templates/free-stack-recipe.md) |
| `templates/tool-review.md` | [`templates/tool-review.md`](templates/tool-review.md) |

## Acceptance tests

1. Prompt: "I need a free stack for a static research demo with analytics and a contact form." → Expected: 187FREE only.
2. Prompt: "Find me the cheapest way to deploy promptPACK with auth, database, storage, email, and monitoring." → Expected: 187FREE only.
3. Prompt: "Find papers and a free hosting stack for an ADHD support tool." → Expected: 187RESEARCH for sources, 187FREE for stack.

## Routes

- **Skill source:** `.claude/skills/187free/SKILL.md`
- **Docs:** `docs/187FREE.md`
- **CLI:** `187repo.sh free`
