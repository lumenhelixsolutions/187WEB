# Deadname Risk Framework

Use this framework when systems store, display, or migrate former names, legal names, or historical identity data.

## Definition

A deadname is a name that a person no longer uses, typically a birth or former name. Using or exposing it can cause harm, especially for transgender and nonbinary people.

## Risk scenarios

| Scenario | Risk level | Example |
|---|---|---|
| Public profile shows a former name | High | Old name appears in search results. |
| Email or invoice uses former legal name | High | Misgendering and outing in financial records. |
| Support ticket history displays former name | Medium | Staff see outdated identity data. |
| Audit logs retain former name | Low-Medium | Necessary for compliance but should be restricted. |
| URL slug contains former display name | Medium | Search engines may continue to surface it. |

## Prevention

- Collect only the name needed for each context.
- Separate display name, legal name, and former name into distinct fields.
- Do not auto-populate new fields from old records without review.
- Provide a self-service name-change flow for display names.
- Update marketing lists, email templates, and support macros when a name changes.

## Response workflow

1. **Acknowledge** the request promptly and respectfully.
2. **Identify** all systems that store or display the former name.
3. **Update** display-facing fields immediately.
4. **Restrict** legal-name visibility to contexts that genuinely require it.
5. **Delete** former-name data where legal and feasible.
6. **Audit** search indexes, caches, and third-party integrations for lingering references.
7. **Document** the change in access logs without exposing the old name.

## Migration checklist

When migrating user data into a new system:

- [ ] Map which source fields contain former names.
- [ ] Decide whether former names are needed in the target system.
- [ ] If not needed, do not import them.
- [ ] If needed, place them in a restricted field with explicit consent.
- [ ] Run a sample audit for deadname exposure in exports and reports.
- [ ] Train support and admin staff on the new data model.

## Legal and compliance notes

Some jurisdictions require retention of former names for contracts, tax, or identity verification. In those cases:

- Minimize the number of people who can see the former name.
- Use it only for the specific legal purpose.
- Do not display it in user-facing surfaces.
- Document the legal basis for retention.

This framework is not legal advice. Consult a qualified attorney for jurisdiction-specific requirements.
