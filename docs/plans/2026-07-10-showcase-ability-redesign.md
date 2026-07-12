# Plan — Drastically upgrade the 187WEB launch / product showcase to reflect real 187 skill abilities

## Problem statement

The current landing page (`app/page.tsx` / `components/showcase/Showcase.tsx`) and README list the 187SKILLS names, aliases, and one-line purposes, but they do **not** show what each skill can actually *do* for a user. A visitor to https://lumenhelixlab.github.io/187WEB/ sees:

- a grid of skill cards with short labels (`187CRAFT` → “Design, UX, frontend”)
- a command palette that looks up commands
- install packs

They do **not** see concrete triggers, use cases, output artifacts, or real-world scenarios. The result feels like a component library rather than a product launch surface.

## Goal

Turn the README, landing page, and `/187` reference into an ability-driven product showcase that answers: *“What can 187WEB do for me right now, and how do I invoke it?”*

## Design direction (from ui-ux-pro-max + existing brand)

- **Pattern:** Product Demo + Features — embed an interactive demo in the hero, then walk through concrete abilities.
- **Style:** Dark OLED / developer-tool dark mode, preserving the existing 187WEB palette:
  - background `#05060A`
  - accent `#39FF14`
  - surface `#0A0C14`
  - text `#ECEDF7`
- **Typography:** keep `Space Grotesk` for headings and `Inter` for body; both are already loaded.
- **Motion:** 150–300 ms micro-interactions, transform/opacity only, `prefers-reduced-motion` respected.
- **Accessibility target:** WCAG AA, contrast ≥ 4.5:1, visible focus rings, keyboard operable.

## Assets we already have

- `lib/skill-showcase-data.ts` — rich ability model for 10 skills (triggers, useCases, outputs, routesTo, templates, related).
- `components/showcase/SkillShowcase.tsx` — detailed skill page renderer.
- `components/187/CommandPalette.tsx` + `command-data.ts` — interactive command explorer.
- 5 new media-kit PNGs in `public/images/`.
- Existing skill pages for: `free`, `research`, `seo`, `revenue`, `docs`, `learn`, `test`, `access`, `version`, `publish`.

## Gaps to close before redesign

1. **Missing skill data** in `lib/skill-showcase-data.ts`:
   - `187COMMAND`, `187REPORT`, `187SCAN`, `187KIT`, `187STANDARD`, `187FLOW`
   - `187REPO`, `187CRAFT`, `187VIBE`, `187LAUNCH`
   - `187WRITE`, `187INCLUDE`
   - Charlotte modules (`THREAD`, `TUNE`, `CORD`, `CHAR`, `LAB`)
   - Research Lab Stack (`187SCI`, `187LABS`, `187DATA`, `187API`, `187BENCH`, `187NB`, `187COLAB`, `187GAP`, `187META`, `187PROV`, `187CRATE`, `RRP`)
2. **Missing skill pages** for the skills above (today only 10 of 22+ have pages).
3. **Landing page does not consume `skillShowcases`** — it hard-codes flat arrays.
4. **README still reads like a feature list**, not a value-driven launch narrative.
5. **No real-world scenario section** — e.g., “ship a landing page”, “audit a repo”, “build a research lab”.
6. **No live output examples** — no mocked artifact cards (free-stack recipe, SEO audit, research claim table, etc.).

## Proposed new landing-page architecture

```
1. Hero
   - Tagline focused on outcomes, not features
   - Embedded live CommandPalette with ability-first default query (e.g., "/187 craft landing page")
   - Primary CTA: Explore abilities
   - Secondary CTA: Install /187

2. Problem → Solution (short)
   - 3 pain bullets: “I need to launch fast”, “I need a free stack”, “I need source-backed research”
   - 187WEB answer for each

3. Ability map (replaces the flat skill grid)
   - Tabs or sticky sub-nav: Build · Research · Launch · Operate
   - Each tab shows 4–6 skill cards
   - Each card exposes:
     - skill name + alias + color
     - one concrete trigger
     - one concrete use case
     - one output artifact
     - link to full skill page

4. Live scenario demos (the “product demo”)
   - 3–4 interactive/canned scenario cards:
     - “Launch a landing page this afternoon” — 187CRAFT → 187SEO → 187LAUNCH
     - “Find a free stack for my MVP” — 187FREE output recipe card
     - “Ship a reproducible research lab” — 187RESEARCH → 187LABS → 187CRATE
     - “Audit a page before publish” — 187SCAN → 187STANDARD → 187ACCESS+ → 187PUBLISH
   - Each scenario shows a mocked output artifact (text card, code block, checklist)

5. Command reference teaser
   - Filterable mini table of commands with status badges
   - “See full /187 reference” link

6. Install / preflight CTA
   - One-liner install commands
   - Pack selector (core-lite, web-build, research-lab, local-brain)

7. Social proof / trust
   - License note, KNOTstore mention, GitHub stars placeholder, live demo link

8. Footer
   - License, links, sitemap
```

## Proposed README rewrite

Move README from a flat command glossary to a value-driven launch doc:

```
1. Hero image + tagline
2. One-paragraph outcome statement
3. “What 187WEB can do” — 6 concrete ability clusters
4. “See it live” — link to GitHub Pages + screenshot
5. “Try a command” — 3 example commands with expected output
6. Quick start
7. Project structure
8. Licensing
```

## Proposed `/187` reference upgrade

- Keep the full command table (it already exists).
- Add an **ability explorer** at the top:
  - filter by category (Front Door, Control Plane, Core Suite, Modules, Research Lab, Local Brain)
  - clicking a command scrolls to a detail card showing triggers/use cases/outputs for that skill (reuse `SkillShowcase` data where available).
- Add a **scenario matrix**: “I want to … → start with … → then hand off to …”.

## Proposed data model extension

Extend `SkillShowcaseData` only if necessary; the current shape is good. Add the missing skills with:

```ts
{
  id: "craft",
  name: "187CRAFT",
  tagline: "Design, UX, and frontend execution",
  color: "#39FF14",
  description: "...",
  triggers: ["/187craft", "187CRAFT", "design a landing page", "polish this UI"],
  useCases: [...],
  outputs: [...],
  routesTo: [...],
  templates: [...],
  related: [...],
}
```

For research-lab skills that do not need full pages, create a lightweight `ResearchLabSkill` entry and render them in a dedicated research-lab section rather than duplicating `SkillShowcaseData`.

## Implementation phases

### Phase 1 — Data foundation
1. Add missing skill records to `lib/skill-showcase-data.ts`.
2. Create route pages for all new skills under `app/187<id>/page.tsx`.
3. Verify `npm run typecheck` and `npm test`.

### Phase 2 — Landing-page redesign
1. Refactor `components/showcase/Showcase.tsx` to ability-driven sections.
2. Build new presentational components:
   - `AbilityCard` — skill name, alias, trigger, use case, output, link
   - `ScenarioDemo` — scenario title, command chain, mocked artifact
   - `AbilityTabs` — Build / Research / Launch / Operate filtering
   - `CommandTeaser` — compact command table with category filter
3. Wire components to `skillShowcases`.
4. Add reduced-motion safe Reveal wrappers.

### Phase 3 — README and docs refresh
1. Rewrite `README.md` with outcome-first narrative and live-demo screenshot.
2. Update `docs/187-COMMANDS.md` with scenario matrix.
3. Update `docs/187SKILLS.md` to list abilities, not just IDs.

### Phase 4 — `/187` reference upgrade
1. Add ability explorer to `app/187/page.tsx`.
2. Link each command row to its skill page where available.

### Phase 5 — Verification
1. `npm run lint`
2. `npm run typecheck`
3. `npm test`
4. `npm run build`
5. Manual UX checklist:
   - contrast, focus rings, keyboard nav, touch targets, reduced motion

## Risk & decisions

| Decision | Recommendation |
|---|---|
| Use flat grid vs. tabs | Use tabs; ability count is too high for one flat grid |
| Show all 22+ skills on landing | Show 12 core + 4 scenario cards; link to `/187` for the rest |
| Mocked output examples | Use static text cards (no backend); safe for GitHub Pages |
| Keep existing skill pages | Yes; the redesign reuses `SkillShowcase` |
| Media-kit assets | Use new PNGs for hero banner and social-preview image |

## Pre-delivery checklist (from ui-ux-pro-max)

- [ ] No emojis as structural icons
- [ ] All clickable elements have `cursor-pointer`
- [ ] Hover/focus states visible with 150–300 ms transitions
- [ ] Text contrast ≥ 4.5:1 in dark mode
- [ ] Touch targets ≥ 44×44 px
- [ ] Loading states handled (skeleton/spinner)
- [ ] Empty states include helpful message + action
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive at 375 px, 768 px, 1024 px, 1440 px
- [ ] Z-index layering correct

## Success criteria

- A new visitor can scan the landing page and name **three concrete things 187WEB can do** within 10 seconds.
- Every skill listed on the landing page links to a page showing triggers, use cases, and outputs.
- README no longer reads like a glossary; it reads like a product launch page.
- `/187` explains *when* to use each command, not only *what* it is.
- All gates pass: lint, typecheck, tests, build.
