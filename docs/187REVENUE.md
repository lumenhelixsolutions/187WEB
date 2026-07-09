# 187revenue — Public Skill Doc

> **Canonical skill:** [`.claude/skills/187revenue/SKILL.md`](.claude/skills/187revenue/SKILL.md)  
> **CLI:** `187repo.sh revenue`

## Identity

187REVENUE designs, audits, and implements revenue systems for 187WEB projects. It covers pricing models, payment integrations, subscriptions, affiliates, coupons and deals, dropshipping, marketplaces, sponsorships, open-source funding, client packages, licensing, ad policy review, revenue dashboards, refund/chargeback risk, and tax/legal review gates.

## Triggers

### Manual

- `/187revenue`
- `187REVENUE`
- `revenue model`
- `pricing strategy`
- `payment integration`
- `subscription system`
- `affiliate system`
- `coupon system`
- `dropshipping`
- `sponsorship`
- `licensing`

### Automatic

-

## When to use

- Designing or auditing a revenue model, offer ladder, or pricing page.
- Selecting and wiring payment processors, subscriptions, or billing logic.
- Building affiliate, coupon, deal, or dropshipping systems.
- Evaluating sponsorship, licensing, or open-source funding paths.
- Assessing refund, chargeback, tax, and legal-review gates before launch.

## Output contract

1. **Mode** — which 187REVENUE mode is active.
2. **Revenue Need** — restated business goal.
3. **Recommended Model(s)** — pricing, billing, or monetization approach.
4. **Stack / Integration Plan** — payment processor, platform, APIs, webhooks.
5. **Offer Ladder / Packaging** — tiers, one-time vs recurring, add-ons.
6. **Disclosure & Compliance Plan** — affiliate, tax, refund, legal disclosures.
7. **Risk Review** — refund, chargeback, fraud, supplier, regulatory.
8. **Margin Model** — cost structure, fees, breakeven assumptions.
9. **187SEO / 187ACCESS+ / 187INCLUDE Gates** — public-page, checkout, and identity-safety reviews.
10. **Next Actions** — implementation sequence and human review checkpoints.

## Templates

| Template | When to use |
|---|---|
| `templates/pricing-architecture.md`](templates/pricing-architecture.md` | Designing pricing tiers, offer ladders, and packaging. |
| `templates/payment-integration-plan.md`](templates/payment-integration-plan.md` | Planning processor selection, webhooks, and billing logic. |
| `templates/affiliate-disclosure-plan.md`](templates/affiliate-disclosure-plan.md` | Documenting affiliate relationships and disclosures. |
| `templates/coupon-deal-plan.md`](templates/coupon-deal-plan.md` | Planning coupons, discounts, and deal-page content. |
| `templates/dropshipping-risk-review.md`](templates/dropshipping-risk-review.md` | Reviewing supplier, margin, shipping, and compliance risks. |
| `templates/revenue-dashboard-spec.md`](templates/revenue-dashboard-spec.md` | Specifying metrics, data sources, and reporting views. |

## Acceptance tests

1. Prompt: "187REVENUE build affiliate, coupon/deal, and dropshipping revenue systems for this product." → Expected: affiliate disclosure gate, coupon freshness gate, dropshipping supplier-risk gate, refund/chargeback review, margin model, 187SEO deal-page strategy, 187ACCESS+ checkout review.
2. Prompt: "Design a subscription pricing ladder for a consent-first coaching app." → Expected: 187REVENUE pricing architecture, payment integration plan, refund/chargeback risk review, 187ACCESS+ and 187INCLUDE gates.
3. Prompt: "Can we hide the recurring billing notice to improve conversions?" → Expected: 187REVENUE rejects the request, cites hidden-recurring-billing guardrail, and requires compliant disclosure.

## Routes

- **Skill source:** `.claude/skills/187revenue/SKILL.md`
- **Docs:** `docs/187REVENUE.md`
- **CLI:** `187repo.sh revenue`
