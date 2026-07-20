# Identity Field Design Guide

Use this reference when designing or auditing forms, profiles, databases, and APIs that collect name, pronoun, gender, title, or salutation data.

## Design principles

1. **Collect only what you need.** If you do not use gender to provide a service, do not collect it.
2. **Let people self-describe.** Closed lists erase identities; open text with examples respects them.
3. **Separate display, legal, and billing names.** Different contexts need different name fields.
4. **Make visibility and consent explicit.** Identity data should never be public by default.

## Name fields

| Field | Use case | Example |
|---|---|---|
| Display name | Public profile, comments, community | "Jamie Chen" |
| Full name | Personalization, formal communication | "Jamie A. Chen" |
| Legal name | Contracts, billing, compliance | "James Alexander Chen" |
| Former name | Historical records only; require consent | Use with deadname-risk review |

### Validation rules

- Allow spaces, hyphens, apostrophes, diacritics, and non-Latin scripts.
- Do not enforce minimum length below 1 character or maximum below 200 characters.
- Do not assume first-name / last-name order. Use "given name" and "family name" if internationalization matters.
- Never auto-capitalize or "correct" names.

## Pronoun fields

### Recommended pattern

- Label: "Pronouns"
- Helper text: "Share the pronouns people should use for you."
- Options (with an open text fallback):
  - she/her
  - he/him
  - they/them
  - she/they
  - he/they
  - [Open text]
- Do not make the field required unless there is a clear functional reason.
- Do not display pronouns publicly without explicit consent.

### Storage

Store the raw value the user entered. Do not normalize to a binary enum unless required by an external system, and document that dependency.

## Gender fields

### Recommended pattern

- If gender is truly necessary, prefer:
  - Open text: "Gender (optional)" with helper text "How do you describe your gender?"
  - Or a broad list plus open text: woman, man, nonbinary, genderqueer, agender, prefer not to say, [self-describe]
- Avoid binary "Male / Female" unless a legal or medical integration forces it.
- Never use gender as a proxy for title, pronoun, or marketing segment.

## Title / salutation

- Make title optional.
- Offer neutral options: Mx., Dr., Prof., none.
- Do not derive title from gender or pronouns.

## Visibility and consent

| Data | Default visibility | Notes |
|---|---|---|
| Display name | Public or internal as designed | Allow pseudonyms where appropriate. |
| Pronouns | Private | Public display requires explicit opt-in per context. |
| Gender | Private | Should rarely be public. |
| Legal name | Restricted | Visible only to billing, compliance, or verified admins. |
| Former name | Restricted + consent | Deadname risk; delete or lock when possible. |

## Databases and migrations

- Use stable IDs for users; keep identity fields in a separate table or column group.
- When migrating data, run a deadname-risk review before importing historical names.
- Provide a self-service name-change flow; do not require support tickets for display-name updates.
- Log access to legal-name and former-name fields for privacy auditing.

## Accessibility notes

Coordinate with 187ACCESS+:

- Use clear, visible labels (not placeholder-only).
- Provide helpful error messages that do not reveal private data.
- Ensure pronoun and gender fields are reachable by keyboard and screen reader.
