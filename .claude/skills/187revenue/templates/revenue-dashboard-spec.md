# Revenue Dashboard Spec — {{project_name}}

## Purpose

{{what decisions the dashboard supports}}

## Audience

{{roles that use this dashboard}}

## Key metrics

| Metric | Source | Frequency | Target |
|---|---|---|---|
| MRR / ARR | {{source}} | {{frequency}} | {{target}} |
| Churn rate | {{source}} | {{frequency}} | {{target}} |
| ARPU | {{source}} | {{frequency}} | {{target}} |
| LTV | {{source}} | {{frequency}} | {{target}} |
| CAC | {{source}} | {{frequency}} | {{target}} |
| Refund rate | {{source}} | {{frequency}} | {{target}} |
| Chargeback rate | {{source}} | {{frequency}} | {{target}} |
| Affiliate revenue | {{source}} | {{frequency}} | {{target}} |

## Dimensions

- Time: day, week, month, quarter
- Plan / tier
- Channel / campaign
- Region / currency
- Coupon / affiliate code

## Data sources

| Source | Connector | Refresh rate |
|---|---|---|
| Payment processor | {{API}} | {{frequency}} |
| Subscription platform | {{API}} | {{frequency}} |
| Analytics | {{API}} | {{frequency}} |
| CRM | {{API}} | {{frequency}} |

## Alerts

| Condition | Threshold | Action |
|---|---|---|
| Chargeback spike | >{{percentage}} | {{action}} |
| Failed payment cluster | >{{count}} | {{action}} |
| Coupon redemption anomaly | >{{percentage}} | {{action}} |

## Access and privacy

- [ ] Role-based access configured
- [ ] PII minimized or masked
- [ ] Financial data encrypted at rest
- [ ] 187ACCESS+ review for dashboard readability

## Delivery

- Primary view: {{tool / URL}}
- Export formats: {{CSV / PDF / API}}
- Mobile support: {{yes/no}}
