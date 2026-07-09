---
name: 187launch
description: >-
  Use when planning a product launch, finding early users, or executing go-to-market strategy for a 187web project.
model_adapter: gemini
system_instruction: >-
  Use `187launch` when the user asks about "launch", "Product Hunt", "go to market", "early users", "validation", "cold outreach", "content marketing", "ads", or "CRO".
---

> **Gemini adapter:** Load as a system instruction. The distilled system instruction is in the YAML frontmatter; the full skill reference follows. Source: [`../../.claude/skills/187launch/SKILL.md`](../../.claude/skills/187launch/SKILL.md).

# 187LAUNCH — Go-to-Market Intelligence

**Suite:** Short-name go-to-market layer. This skill is new (not a rename of an
existing skill) and adds launch strategy to the 187web ecosystem.

Use `187launch` when the user asks about "launch", "Product Hunt", "go to
market", "early users", "validation", "cold outreach", "content marketing",
"ads", or "CRO".

## Routing rules

- Use `187launch` for go-to-market strategy, launch platforms, outreach, and validation.
- Route SEO / AEO / GEO work to `187seo`.
- Route pricing architecture, payments, affiliate, and revenue systems to `187revenue`.
- Route documentation and launch copy to `187docs` + `187write`.
- Every public launch page must pass `187access-plus` and `187include` review.

## Core capabilities

1. **Launch platforms** — curated directories and communities by product type.
   See [`references/launch-platforms.md`](references/launch-platforms.md).
2. **Product Hunt strategy** — 4-week pre-launch, launch-week blitz, 30-day
   follow-up. See [`references/producthunt-guide.md`](references/producthunt-guide.md).
3. **Building in public** — trust + distribution playbook. See
   [`references/social-media.md`](references/social-media.md).
4. **Cold outreach** — ICP builder, email/DM templates, follow-ups. See
   [`references/cold-outreach.md`](references/cold-outreach.md) and
   [`templates/icp-builder.md`](templates/icp-builder.md).
5. **Launch content** — planning framework and distribution. See
   [`references/content-marketing.md`](references/content-marketing.md).
6. **Ads & influencers** — paid strategy. See
   [`references/ads-influencers.md`](references/ads-influencers.md).
7. **Landing optimization / CRO** — models, A/B tests, landing optimization. See
   [`references/pricing-cro.md`](references/pricing-cro.md).
8. **SEO / revenue handoffs** — `187launch` coordinates with `187seo` and `187revenue`; it does not own those domains.
9. **Validation & research** — idea validation framework. See
   [`references/validation-research.md`](references/validation-research.md).

## Slash commands

| Command | Action |
|---|---|
| `/187launch plan` | Full go-to-market plan |
| `/187launch platforms` | Platform recommendations |
| `/187launch ph` | Product Hunt strategy |
| `/187launch social` | Build in public playbook |
| `/187launch sales` | Cold outreach + ICP |
| `/187launch icp` | Generate ICP |
| `/187launch outreach` | Generate cold sequence |
| `/187launch seo` | SEO + AI search strategy |
| `/187launch content` | Content strategy |
| `/187launch ads` | Paid ads + influencers |
| `/187launch pricing` | Pricing + CRO |
| `/187launch validate` | Idea validation |
| `/187launch checklist` | Launch day checklist |
| `/187launch timeline` | 4–6 week timeline |

## Templates

- [`templates/launch-checklist.md`](templates/launch-checklist.md)
- [`templates/icp-builder.md`](templates/icp-builder.md)
- [`templates/cold-email-templates.md`](templates/cold-email-templates.md)
- [`templates/launch-timeline.md`](templates/launch-timeline.md)

## Tone

Strategic, data-driven, founder-focused. Actionable, not theoretical.

