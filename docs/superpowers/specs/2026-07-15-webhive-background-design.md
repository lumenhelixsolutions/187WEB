# WebHive Three.js Background Redesign

## Problem

The current `WebHiveThreeBackground` is a single rotating group of wireframe
line-segments. Feedback from the human partner is that it is not dynamic
enough, the layers do not read as overlapping, and the giant web does not feel
like it stretches far off-screen. The request is to research current Three.js
/ React Three Fiber animation patterns and try again with a much more
cinematic, layered, scroll-reactive result.

## Goals

1. **Dramatic depth**: multiple independent layers at different depths so the
   background feels like a 3D volume, not a flat overlay.
2. **Giant off-screen web**: at least one web layer must be physically large
   enough that its edges extend well past the viewport.
3. **Layered overlap**: the spiderweb and honeycomb layers should overlap and
   counter-rotate so the relationship between them is visually obvious.
4. **Scroll reactivity**: scrolling should tilt the scene, change camera depth,
   and modulate motion energy.
5. **Performance first**: must stay at 60fps on mid-range devices, respect
   `prefers-reduced-motion`, and not add heavy dependencies.
6. **No new runtime dependencies**: keep using `three` and `@react-three/fiber`
   only; avoid `@react-three/drei`, `@react-three/postprocessing`, and GLTFs.

## Constraints

- Next.js 15 App Router, static export, GitHub Pages with `/187WEB` basePath.
- React 19, TypeScript strict, Tailwind CSS.
- Background is rendered inside a fixed-position `Canvas` behind page content.
- Existing SVG fallback (`WebHiveBackground`) must remain for reduced motion.
- Must pass existing lint/typecheck/build/docs-drift/release-surface CI checks.

## Research Summary

Patterns from recent R3F / Three.js work that fit this use-case:

- **Shader-driven grids/wires** (`fwidth` anti-aliasing, `fract` tiling) give
  crisp, stable lines without post-processing bloom.
- **Multiple planes/groups at staggered z** create cheap parallax and depth.
- **`useFrame` with `delta`** produces stable motion regardless of frame rate,
  unlike `performance.now()`.
- **Scroll as a shared signal** (raw scroll progress + velocity) is enough to
  drive camera, rotation speed, and pulse intensity.
- **Additive-blended `Points`** are cheap "energy" particles that sell motion.
- **Instancing / BufferGeometry reuse** keeps draw calls low; avoid creating
  geometry per frame.

## Approaches Considered

### A. Geometry-only upgrade (larger, more layers, points) — RECOMMENDED

Keep the current `LineSegments` + `Points` approach but redesign it:

- Add 4 distinct depth layers (deep web, honeycomb field, mid web, overlay web).
- Give each layer its own axis/rotation speed and scroll response.
- Add a `Points` energy layer that drifts like dust/motes.
- Increase the giant web radius so spokes run off-screen.
- Replace `performance.now()` with `useFrame((state, delta) => ...)`.
- Use a small custom vertex shader displacement for the giant web so it breathes.
- No post-processing; rely on additive blending, low opacity, and color choice
  for the glow.

Pros:
- No new dependencies.
- Predictable performance.
- Static-export safe.
- Reduced-motion fallback trivial.

Cons:
- Line thickness is still 1px (WebGL limitation).
- Glow is faked with additive blending, not true bloom.

### B. Full post-processing stack

Add `@react-three/postprocessing` with Bloom, Vignette, DepthOfField.

Pros:
- True glow and cinematic depth-of-field.

Cons:
- Adds a dependency.
- Can break static export / low-power mode.
- Heavier on mobile and harder to tune for dark neon lines.
- Overkill for a background that should stay readable behind content.

### C. Pre-rendered looping video

Render a web/honeycomb animation offline and play it as a background video.

Pros:
- Predictable visual quality, no runtime GPU cost.

Cons:
- Not interactive or scroll-reactive.
- Large asset, breaks the "coded" aesthetic the partner likes.

## Recommended Design

Proceed with **Approach A**.

### Visual layers (back to front)

| # | Name | Primitive | Approx z | Motion |
|---|------|-----------|----------|--------|
| 1 | Deep field web | `LineSegments` giant radial web | -4.0 | Very slow CCW yaw; wobbles in roll/pitch; scroll drives camera toward it |
| 2 | Honeycomb field | `LineSegments` hex grid, large radius | -2.2 | Slow CW yaw; gentle vertical drift tied to scroll; opacity lower than web |
| 3 | Energy motes | `Points` (512 particles) | -1.0 | Slow outward/inward drift, twinkle via size/opacity |
| 4 | Mid spiderweb | `LineSegments` dense web | -0.4 | Moderate CCW yaw; scale pulses with scroll velocity |
| 5 | Overlay web | `LineSegments` tight web | +0.8 | Fast CW rotation; strong pulse; reacts to scroll progress |

All layers are children of a root `<group>` that is tilted by scroll and by a
slow ambient bob. The camera sits at z ≈ 5.5 and is pushed forward on scroll
(so the world feels closer / larger as the user descends).

### Shader / material choices

- `LineBasicMaterial` with `transparent`, `blending: AdditiveBlending`, and
  `depthWrite: false` for every wire layer.
- `PointsMaterial` with `sizeAttenuation: true`, additive blending, and a
  generated radial gradient texture (canvas) for soft circular particles.
- A small vertex-displacement function on the giant web: in `useFrame`, update
  a `time` uniform or rotate sub-groups rather than mutating geometry.

### Motion equations (per frame)

Use `useFrame((state, delta) => ...)` where `delta` is clamped to avoid spikes.

- `t += delta * speed`
- `scroll = window.scrollY / (documentHeight - viewportHeight)` (memoized in a
  ref, updated by a passive scroll listener).
- `scrollVelocity` is derived from the delta of `scroll` and smoothed with an
  exponential moving average.
- Root group rotation is a sum of slow ambient sine waves plus scroll * k.
- Each layer multiplies `t` by a different factor and adds scroll * its own k.
- Camera z = base + scroll * depthK + scrollVelocity * velocityK.

### Reduced motion

When `prefers-reduced-motion: reduce` is detected:
- Render the existing SVG fallback (`WebHiveBackground`) instead of the Canvas.
- No animations run.

### Performance guardrails

- `dpr={[1, 1.25]}` on Canvas.
- `frameloop="demand"` with explicit `invalidate()` each frame.
- Geometry created once with `useMemo`.
- No new objects/array allocations inside `useFrame`.
- Particle count capped at 512 (mobile-friendly).
- Line segment counts capped: giant web 36x12 rings, mid web 48x16, overlay 28x10,
  honeycomb 3 rings (~61 hexagons).

### File changes

- Rewrite `components/launch/WebHiveThreeBackground.tsx` in place.
- No new files needed.
- No changes to `ProductShell.tsx` or the SVG fallback.
- No dependency changes.

### Testing / verification

- `npm run lint` passes.
- `npm run typecheck` passes.
- `npm run build` produces a static export.
- GitHub Actions `main` workflow passes.
- Manual visual check on the deployed Pages URL for smooth 60fps motion and
  clear layered overlap.

## Open Questions

1. Does the partner want mouse parallax as well, or is scroll + ambient motion
   enough for this pass?
2. Should the neon color stay `#39FF14` exclusively, or can it shift per page
   context (e.g., agent pages)?

For this iteration we will keep the existing single neon accent and skip mouse
parallax unless the partner requests it; this keeps scope focused on the core
"more dynamic / more layered" complaint.

## Approval

Once this design is approved, the next step is to invoke the `writing-plans`
skill to produce the implementation plan.
