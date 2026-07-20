# Payment Integration Plan — {{project_name}}

## Scope

{{what is being sold, in which regions, and to whom}}

## Selected processor

| Provider | Rationale |
|---|---|
| {{provider}} | {{why chosen}} |

## Backup option

| Provider | Rationale |
|---|---|
| {{provider}} | {{why backup}} |

## Integration surface

- Frontend: {{hosted checkout / embedded form / custom UI}}
- Backend: {{API / webhook endpoints}}
- Database: {{subscription status, invoice records}}
- Notifications: {{receipts, dunning, renewal reminders}}

## Webhook handling

| Event | Action |
|---|---|
| checkout.session.completed | {{create account / provision access}} |
| invoice.paid | {{extend subscription}} |
| invoice.payment_failed | {{notify user, retry, downgrade if needed}} |
| customer.subscription.deleted | {{revoke access, send exit survey}} |

## Security and compliance

- [ ] HTTPS everywhere
- [ ] PCI scope minimized (use hosted fields or checkout)
- [ ] Webhook signatures verified
- [ ] API keys stored in secrets manager, never in repo
- [ ] Customer payment data never logged

## Accessibility

- [ ] Checkout keyboard navigable
- [ ] Error messages clear and associated with fields
- [ ] Focus management on payment modal
- [ ] Screen-reader labels on all inputs

## Testing plan

- [ ] Test mode transactions with real and test cards
- [ ] Webhook delivery verified
- [ ] Failure and retry flows tested
- [ ] Refund flow tested
- [ ] 187ACCESS+ review completed

## Rollout

1. {{step}}
2. {{step}}
3. {{step}}
