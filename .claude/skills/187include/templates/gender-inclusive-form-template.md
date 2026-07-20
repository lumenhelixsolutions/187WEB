# Gender-Inclusive Form Template

Use this template to design or audit a form that collects name, pronoun, gender, title, or salutation data.

## Form metadata

- **Form name:**
- **Context:** [signup, profile, event registration, checkout, etc.]
- **Jurisdiction / policy:**
- **Data retention period:**

## Section A: Name

### Display name

- Label: `Name`
- Helper text: `The name you want us to use.`
- Required: [Yes / No]
- Public by default: [Yes / No]
- Validation notes:

### Full name (if needed)

- Label:
- Helper text:
- Required:
- Used for:

### Legal name (if needed)

- Label: `Legal name`
- Helper text: `Required for [specific purpose]. Only visible to [roles].`
- Required:
- Visible to:

## Section B: Pronouns

- Label: `Pronouns`
- Helper text: `Share the pronouns people should use for you.`
- Required: [Yes / No]
- Public by default: [Yes / No]
- Options:
  - [ ] she/her
  - [ ] he/him
  - [ ] they/them
  - [ ] she/they
  - [ ] he/they
  - [ ] ze/zir
  - [ ] xe/xem
  - [ ] use my name only
  - [ ] prefer not to say
  - [ ] self-describe: __________

## Section C: Gender

- Question: Is gender necessary for this form? [Yes / No]
- If yes, explain why:
- Field design:
  - Label:
  - Helper text:
  - Required:
  - Public by default:
  - Options:
    - [ ] woman
    - [ ] man
    - [ ] nonbinary
    - [ ] genderqueer
    - [ ] agender
    - [ ] prefer not to say
    - [ ] self-describe: __________

## Section D: Title / salutation

- Label: `Title` (optional)
- Options:
  - [ ] none
  - [ ] Dr.
  - [ ] Prof.
  - [ ] Mx.
  - [ ] Ms.
  - [ ] Mr.
  - [ ] other: __________

## Section E: Visibility and consent

For each identity field, define default visibility and consent.

| Field | Default visibility | User can change | Used in |
|---|---|---|---|
| Display name | | | |
| Pronouns | Private | Yes | Internal comms, opted-in profiles |
| Gender | Private | Yes | Aggregated analytics only |
| Legal name | Restricted | No (legal constraint) | Billing, compliance |

## Section F: Accessibility

Coordinate with 187ACCESS+:

- [ ] Labels are visible and persistent.
- [ ] Helper text is linked to inputs with `aria-describedby`.
- [ ] Open-text fields accept diacritics and non-Latin scripts.
- [ ] Error messages do not reveal private data.
- [ ] Form is fully keyboard and screen-reader operable.

## Section G: Post-submission

- [ ] User can update display name without support.
- [ ] User can update pronouns without support.
- [ ] Changes propagate to email templates and support tools.
- [ ] Former names are not retained without justification.
