># WCAG+ Audit Profile

Use this profile when 187ACCESS+ audits a public page, component, course, quiz, or form.

## Base standard

- WCAG 2.2 Level AA is the default target.
- Level AAA is applied only when explicitly requested and feasible.
- Section 508 and EN 301 549 are noted when relevant.

## WCAG 2.2 principle checklist

| Principle | Key checks |
|---|---|
| Perceivable | Text alternatives, captions, transcripts, adaptable layout, color independence, contrast, resize |
| Operable | Keyboard access, focus order, navigation, timeouts, motion, input modalities |
| Understandable | Readable language, predictable behavior, input assistance, error prevention |
| Robust | Valid markup, name/role/value, status messages, compatibility with assistive tech |

## Plus layers beyond WCAG

1. **Cognitive access** — plain language, chunked content, memory aids, error recovery.
2. **Neurodivergent access** — predictable patterns, sensory control, clear expectations, reduced ambiguity.
3. **Sensory load** — adjustable motion, audio, and visual density.
4. **Intellectual disability access** — concrete examples, step-by-step support, picture alternatives.
5. **AAC communication** — compatibility with symbol boards and speech-generating devices where applicable.

## Severity scale

| Severity | Meaning |
|---|---|
| Blocker | A disabled user cannot complete the core task. |
| High | Major barrier; workaround is difficult or degrading. |
| Medium | Noticeable barrier with a reasonable workaround. |
| Low | Polish or optimization; no current blocker. |

## Evidence labels

Tag each finding with one of: `proved` (tested), `measured` (tool result), `modeled` (pattern-based), `inherited` (from component), `interpreted` (expert judgment).
