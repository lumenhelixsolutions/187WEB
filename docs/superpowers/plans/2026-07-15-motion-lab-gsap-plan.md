# Motion Lab: Three.js Trends + GSAP Integration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Evolve the 187WEB showcase into a cutting-edge 3D/GSAP motion lab, using techniques from the Orpetron "Cutting-Edge Three.js Web Design Trends" article and GSAP, and extract each technique into a documented, reusable skill.

**Architecture:** Add GSAP and `@react-three/drei` as production dependencies; build a set of self-contained R3F showcase scenes and reusable animation primitives; for every technique, ship a dedicated skill page, a docs file, and a `.claude/skills` entry so the suite can teach the pattern back to users.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, Three.js, React Three Fiber, GSAP + ScrollTrigger, `@react-three/drei`, `@react-three/postprocessing` (optional).

---

## Research summary

### Orpetron article — inferred techniques

The article is a curated award-site showcase. Each example demonstrates a recurring technique that can be reproduced with Three.js / R3F:

| # | Example | Technique | Production use for 187WEB |
|---|---------|-----------|---------------------------|
| 1 | Dave Holloway portfolio | Immersive 3D hero / studio intro | Full-screen animated hero scene on `/showcase` and landing pages |
| 2 | Casa di Solare | Kinetic / variable 3D typography | WebGL type specimen, variable-font distortion, scroll-driven glyph animation |
| 3 | Hakenguns | 3D product showcase / configurator | Rotatable product viewer with hotspots and exploded-view transitions |
| 4 | Envy™ | Product-as-experience 3D scene | Storytelling product reveal with camera dolly and animated materials |
| 5 | We create digital solutions | Creative effects + modular animation hooks library | Reusable R3F animation primitives (spring, loop, stagger, scrub) |
| 6 | Haunted by Nostalgia | Scroll-driven 3D narrative + audio-reactive atmosphere | Scroll-choreographed camera sequence + audio-driven mesh deformation |
| 7 | StringTune | Modular JS animation/hooks library | Public `187MOTION` skill exposing reusable hooks |
| 8 | Sage® | 3D network / marketplace data viz | Instanced node/edge network graph for crypto/AI/Web3 visuals |
| 9 | Dragonfly | Web3 / crypto 3D data storytelling | Token/funding-flow particle streams |
| 10 | Fantik Studio® | Immersive creative-studio experience | Combined hero + typography + scroll narrative showcase |

### GSAP role

GSAP becomes the timeline conductor:
- **ScrollTrigger** drives camera choreography and DOM-to-WebGL sync.
- **GSAP timelines** orchestrate R3F scene transitions without per-frame React state.
- **SplitText-style** typography animations (or a custom implementation) power kinetic type.
- **Flip plugin** (or custom FLIP) handles layout transitions between skill cards.

---

## New dependencies

```bash
npm install gsap @react-three/drei
# optional, only if we add post-processing bloom/DOF:
npm install @react-three/postprocessing
```

- `gsap` — core animation engine + ScrollTrigger.
- `@react-three/drei` — `Text3D`, `ScrollControls`, `useScroll`, `useTexture`, `Html`, `Float`, `MeshDistortMaterial`, `Sparkles`, `Stars`, etc.
- `@react-three/postprocessing` — bloom, depth-of-field, vignette (optional; fall back to additive blending if bundle/perf suffers).

---

## New showcase components

Create `components/motion-lab/` as a shared demo library:

| Component | Technique | Uses |
|-----------|-----------|------|
| `HeroScene.tsx` | Immersive 3D hero | R3F, mouse parallax, floating geometry |
| `KineticType.tsx` | 3D kinetic typography | `Text3D` or shader-distorted planes, GSAP SplitText-like reveal |
| `ProductViewer.tsx` | 3D product showcase | Procedural rifle/apple-like geometry or GLTF, rotation, hotspots |
| `ScrollNarrative.tsx` | Scroll-driven camera | GSAP ScrollTrigger + R3F camera rig |
| `AudioMesh.tsx` | Audio-reactive 3D | Web Audio API analyser + instanced mesh scale |
| `NetworkViz.tsx` | 3D network graph | Instanced nodes + lines, force-directed or static web layout |
| `MotionHooksDemo.tsx` | Reusable animation hooks | Springs, loops, staggers built on GSAP/R3F |

Each component is SSR-safe via dynamic import in pages and reduced-motion aware.

---

## New skills to create

Each skill gets:
- `app/187<id>/page.tsx` — dedicated skill page using `SkillShowcase`
- `lib/skill-showcase-data.ts` entry
- `docs/187<ID>.md` — public docs
- `.claude/skills/<id>/SKILL.md` — canonical skill file (required for docs-drift CI)
- Update `lib/first-class-skills.ts` and `scripts/lib/suite-constants.mjs`
- Update release-surface rosters in `app/page.tsx`, `app/187/page.tsx`, `components/showcase/Showcase.tsx`

| Skill ID | Name | What it teaches | Derived from |
|----------|------|-----------------|--------------|
| `gsap` | 187GSAP | GSAP foundation: timelines, ScrollTrigger, scrub, snap, staggers | GSAP.com + motion lab |
| `type` | 187TYPE | Kinetic / variable WebGL typography, 3D text, type specimens | Casa di Solare |
| `model` | 187MODEL | 3D product showcase / configurator with hotspots | Hakenguns / Envy |
| `scroll` | 187SCROLL | Scroll-driven 3D camera narratives | Haunted by Nostalgia |
| `audio` | 187AUDIO | Audio-reactive 3D geometry and atmosphere | Haunted by Nostalgia |
| `viz` | 187VIZ | 3D network / node-edge / data visualization | Sage / Dragonfly |
| `motion` | 187MOTION | Reusable R3F/GSAP animation hooks library | StringTune / We create digital solutions |
| `hero` | 187HERO | Full-screen immersive 3D hero systems | Dave Holloway / Fantik Studio |

> Note: `187HERO` overlaps with the existing WebHive background; it can generalize the background into a reusable hero-scene primitive.

---

## Existing files to modify

- `package.json` — add dependencies
- `components/launch/WebHiveThreeBackground.tsx` — refactor to use `drei` helpers and GSAP ScrollTrigger; add post-processing bloom (optional)
- `components/showcase/Showcase.tsx` — add Motion Lab section with the new demos
- `components/showcase/AbilityTabs.tsx` — add new skills to ability explorer
- `lib/skill-showcase-data.ts` — add 8 new skill entries
- `lib/first-class-skills.ts` — add new skills to canonical roster
- `scripts/lib/suite-constants.mjs` — keep in sync with `lib/first-class-skills.ts`
- `app/page.tsx`, `app/187/page.tsx`, `components/showcase/Showcase.tsx` — update release-surface rosters
- `next.config.js` / build config — verify static export handles new dynamic imports

---

## Implementation phases

### Phase 0 — Foundation

- [ ] Install `gsap`, `@react-three/drei` (and optional `@react-three/postprocessing`)
- [ ] Create `lib/motion/` utilities:
  - `useGsapTimeline.ts` — safe GSAP timeline hook with cleanup
  - `useScrollProgress.ts` — passive scroll progress ref
  - `useReducedMotion.ts` — reuse existing or centralize
- [ ] Add a `MotionLabProvider` or context if needed (likely not; keep components self-contained)

### Phase 1 — Refactor WebHive background with GSAP + dreidrei

- [ ] Replace custom geometry helpers with `drei` primitives where beneficial (e.g., `Line` for webs, `Instances` for telemetry)
- [ ] Tie scroll energy to a GSAP ScrollTrigger scrub instead of raw `scroll` event
- [ ] Add optional `UnrealBloomPass` via `@react-three/postprocessing`; fallback to additive blending
- [ ] Verify performance on low-power mode and reduced motion

### Phase 2 — Build showcase demos

- [ ] `HeroScene` demo on `/showcase`
- [ ] `KineticType` demo on `/showcase`
- [ ] `ProductViewer` demo on `/showcase`
- [ ] `ScrollNarrative` demo on `/showcase`
- [ ] `AudioMesh` demo on `/showcase`
- [ ] `NetworkViz` demo on `/showcase`
- [ ] `MotionHooksDemo` demo on `/showcase`

### Phase 3 — Extract skills

For each skill in [gsap, type, model, scroll, audio, viz, motion, hero]:
- [ ] Create `app/187<id>/page.tsx`
- [ ] Create `docs/187<ID>.md`
- [ ] Create `.claude/skills/<id>/SKILL.md`
- [ ] Add entry to `lib/skill-showcase-data.ts`
- [ ] Add entry to `lib/first-class-skills.ts` and `scripts/lib/suite-constants.mjs`
- [ ] Update release-surface rosters

### Phase 4 — CI and polish

- [ ] Run `npm run lint`
- [ ] Run `npm run typecheck`
- [ ] Run `npm test`
- [ ] Run `npm run build`
- [ ] Run `npm run docs:drift`, `npm run showcase:sync`, `npm run release:validate`
- [ ] Push and watch GitHub Actions + Pages deploy
- [ ] Manual performance check on deployed URL

---

## Performance guardrails

- All R3F scenes use `frameloop="demand"` + explicit `invalidate()`.
- `dpr={[1, 1.25]}` cap.
- Heavy demos lazy-loaded with `next/dynamic` and `ssr: false`.
- Reduced-motion users get static SVG/CSS fallbacks.
- Post-processing gated behind a perf check; disable on low-power/mobile.
- No per-frame React state; all animation values live in refs or GSAP.

---

## Open decisions

1. **Bloom / post-processing:** Add it for cinematic glow, or keep additive-blending-only to avoid bundle bloat?
2. **3D models:** Use procedural geometry (no assets) or add a small GLB/GLTF file?
3. **Audio input:** Use a generated oscillator for the audio demo, or let the user upload/mic?
4. **Scope:** Implement all 8 skills in one branch, or split into two releases (foundation + first 4 skills, then advanced 4)?

## Recommendation

Proceed with **all 8 skills in one branch**, but keep post-processing optional/behind a flag, and use procedural geometry so no new binary assets are required. This maximizes the "pull as many skills as possible" goal while keeping the build static-export friendly.

---

## Approval requested

Please review the plan above. If you approve, the next step is to invoke the `writing-plans` skill to produce the detailed implementation plan, then execute.
