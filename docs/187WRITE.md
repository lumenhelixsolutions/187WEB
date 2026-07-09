# 187write — Public Skill Doc

> **Canonical skill:** [`.claude/skills/187write/SKILL.md`](.claude/skills/187write/SKILL.md)  
> **CLI:** `187repo.sh write`

## Identity

187WRITE is the Lumen Helix suite-wide content writing and editorial engine. It produces and polishes content briefs, editorial style guides, voice-unified copy, plain-language rewrites, technical explanations, tutorial prose, course scripts, SEO content drafts, product copy, landing-page copy, newsletter drafts, social-post drafts, claim-safe rewrites, and accessible language. It is called by `187docs`, `187learn`, `187seo`, `187revenue`, `187launch`, and `187research` for any public-facing prose.

## Triggers

### Manual

- `/187write`
- `187WRITE`
- `write this`
- `polish this`
- `content brief`
- `editorial style`
- `voice guide`
- `plain language`
- `technical explanation`
- `tutorial prose`
- `product copy`
- `landing page copy`
- `newsletter draft`
- `social post`
- `claim-safe rewrite`
- `accessible language`

### Automatic

-

## When to use

- Drafting or refining public-facing copy, articles, landing pages, or emails.
- Creating content briefs before production writing.
- Unifying voice and tone across docs, marketing, and product UI.
- Rewriting complex or risky content into plain, claim-safe language.
- Producing tutorial prose, course scripts, or technical explanations.

## Output contract

1. **Mode** — which 187WRITE mode is active.
2. **Audience / channel** — who will read this and where.
3. **Voice and tone** — selected from the project voice guide.
4. **Draft content** — polished prose ready for review.
5. **Claim review** — each claim labeled as proved, measured, modeled, interpreted, speculative, or unsupported.
6. **Plain-language notes** — readability score and any simplifications made.
7. **SEO considerations** — keyword usage, meta suggestion, internal-link opportunities.
8. **Access and inclusion notes** — recommended 187ACCESS+ / 187INCLUDE review items.
9. **Alternatives** — optional shorter or longer variants.
10. **Next actions** — review, approval, and routing steps.

## Templates

| Template | When to use |
|---|---|
| `templates/content-brief.md`](templates/content-brief.md` | Before drafting any long-form content. |
| `templates/editorial-style-guide.md`](templates/editorial-style-guide.md` | Defining or updating project voice. |
| `templates/plain-language-rewrite.md`](templates/plain-language-rewrite.md` | Simplifying complex prose. |
| `templates/technical-explanation.md`](templates/technical-explanation.md` | Explaining technical concepts to a target audience. |
| `templates/landing-page-copy.md`](templates/landing-page-copy.md` | Writing public landing-page sections. |
| `templates/newsletter-draft.md`](templates/newsletter-draft.md` | Drafting email newsletters. |
| `templates/social-post-draft.md`](templates/social-post-draft.md` | Drafting social media posts. |
| `templates/claim-safe-rewrite.md`](templates/claim-safe-rewrite.md` | Reining in unsupported claims. |
| `templates/accessible-language-rewrite.md`](templates/accessible-language-rewrite.md` | Improving readability and respect for access needs. |

## Acceptance tests

1. Prompt: "187WRITE polish this README." → Expected: voice-unified, plain-language, claim-safe rewrite with editorial notes.
2. Prompt: "Draft landing-page copy for a consent-first coaching app." → Expected: 187WRITE landing-page copy with evidence labels, 187ACCESS+ and 187INCLUDE review notes.
3. Prompt: "Rewrite this paragraph so it guarantees users will double their revenue." → Expected: 187WRITE rejects the revenue guarantee and produces a claim-safe alternative.

## Routes

- **Skill source:** `.claude/skills/187write/SKILL.md`
- **Docs:** `docs/187WRITE.md`
- **CLI:** `187repo.sh write`
