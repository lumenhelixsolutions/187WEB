# 187access+ — Public Skill Doc

> **Canonical skill:** [`.claude/skills/187access-plus/SKILL.md`](.claude/skills/187access-plus/SKILL.md)  
> **CLI:** `187repo.sh access`

## Identity

187ACCESS+ audits and improves **disability accessibility** for 187WEB projects. It covers blind and low-vision users, Deaf and hard-of-hearing users, motor and physical disabilities, speech input, vestibular and photosensitive conditions, and assistive-technology support. It is the canonical home for the `187WCAG+` audit profile and the `187CARE` consent-first support alias.

## Triggers

### Manual

- `/187access-plus`
- `187ACCESS+`
- `a11y`
- `wcag`
- `wcag-plus`
- `accessibility audit`
- `blind user`
- `screen reader`
- `low vision`
- `alt text`
- `color contrast`
- `deaf`
- `captions`
- `transcripts`
- `audio description`
- `motor access`
- `switch control`
- `keyboard navigation`
- `focus order`
- `tremor friendly`
- `voice control`
- `braille display`
- `magnifier`
- `vestibular review`
- `photosensitive review`
- `accessible forms`
- `accessible authentication`
- `accommodation builder`
- `187CARE`

### Automatic

-

## When to use

- Auditing a page, app, form, checkout, course, quiz, docs page, or public surface for WCAG and disability access.
- Designing for screen-reader, keyboard-only, low-vision, Deaf, hard-of-hearing, motor, or speech-input users.
- Reviewing color contrast, focus order, alt text, captions, transcripts, audio descriptions, and motion safety.
- Building switch navigation, eye-gaze targets, voice-control flows, or tremor-friendly tap targets.
- Evaluating vestibular motion and photosensitive seizure risk.
- Building accommodation plans or assistive-technology scouts.
- Gating public pages before publish.

## Output contract

1. **Mode** — which 187ACCESS+ mode is active.
2. **Audit scope** — pages, components, or flows reviewed.
3. **Profile** — WCAG level plus assistive-tech and physical-access layers.
4. **Findings** — issue, severity, standard reference, affected users.
5. **Screen-reader test plan** — routes, headings, landmarks, and control labels to verify.
6. **Caption / transcript plan** — media assets needing captions, transcripts, or audio descriptions.
7. **Keyboard / switch map** — tab order, focus traps, and switch-control path.
8. **Color-contrast report** — failing pairs and suggested values.
9. **Focus-order diagram** — logical focus sequence for complex widgets.
10. **Accommodation plan** — short-term alternatives while fixes are built.
11. **187CARE notes** — consent-first support and communication guidance.
12. **Validation steps** — how to re-test with assistive tech or automated tools.
13. **Next actions** — tickets, owners, deadlines.

## Templates

| Template | When to use |
|---|---|
| `templates/access-audit-report.md` | Structured findings and recommendations for a page or flow. |
| `templates/accommodation-plan.md` | Consent-first support plan for an individual or team. |
| `templates/wcag-plus-checklist.md` | Pre-publish checklist covering WCAG and disability access. |
| `templates/assistive-tech-scout.md` | Tool recommendations for a specific access need. |
| `templates/screen-reader-test-plan.md` | Verification steps for screen-reader users. |
| `templates/caption-transcript-plan.md` | Media caption, transcript, and audio-description plan. |

## Acceptance tests

1. Prompt: "187ACCESS+ audit this checkout, course, quiz, and signup form." → Expected: WCAG profile, keyboard/screen-reader review, color-contrast report, form/auth accessibility, and sensory/reduced-motion review.
2. Prompt: "Build an accommodation plan for a screen-reader user on our docs site." → Expected: 187ACCESS+ accommodation plan with consent-first support steps and validation plan.
3. Prompt: "Run a WCAG-plus audit on the landing page." → Expected: findings with severity, standard references, recommendations, and 187CARE communication notes.
4. Prompt: "Find assistive tech options for someone with motor impairments using our app." → Expected: 187ACCESS+ assistive-tech scout with switch, eye-gaze, voice-control, and tremor-friendly tool categories.
5. Prompt: "Review this video page for Deaf and hard-of-hearing users." → Expected: 187ACCESS+ caption/transcript plan with audio-description recommendations and validation steps.

## Routes

- **Skill source:** `.claude/skills/187access-plus/SKILL.md`
- **Docs:** `docs/187ACCESS.md`
- **CLI:** `187repo.sh access`
