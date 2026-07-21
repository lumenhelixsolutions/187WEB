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
5. **Mouse parallax**: cursor position should gently tilt the root scene and
   shift layer positions so the background feels tracked and alive.
6. **Continuous motion**: layers must never feel static; they rotate, drift,
   and pulse even when the user is not scrolling.
7. **Interconnected network feel**: the web and honeycomb must read as one
   living data-net — with traveling pulses along spokes and thin connector
   filaments between web nodes and honeycomb cells.
8. **Performance first**: must stay at 60fps on mid-range devices, respect
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
- **Mouse-parallax via smoothed pointer refs** keeps the scene responsive without
  per-frame React state.
- **Traveling pulses on line geometry** can be simulated with a small `Points`
  system riding the same radial spokes.
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

| # | Name | Primitive | Approx z | Continuous motion | Scroll | Mouse |
|---|------|-----------|----------|-------------------|--------|-------|
| 1 | Deep field web | `LineSegments` giant radial web | -4.0 | Very slow CCW yaw; constant roll/pitch wobble | Drives camera forward | Subtle look-at tilt |
| 2 | Honeycomb field | `LineSegments` hex grid, large radius | -2.2 | Slow CW yaw; gentle vertical bob | Adds drift speed | Position shifts opposite cursor |
| 3 | Energy motes | `Points` (512 particles) | -1.0 | Perpetual outward/inward drift; twinkle | Density/speed modulated | Drift direction influenced |
| 4 | Mid spiderweb | `LineSegments` dense web | -0.4 | Moderate CCW yaw; scale pulse | Velocity amplifies pulse | Brightens near cursor |
| 5 | Overlay web | `LineSegments` tight web | +0.8 | Fast CW rotation; strong pulse | Reacts to scroll progress | Tilts toward cursor, intensity scales |
| 6 | Data pulses | `Points` (48 traveling dots) | mixed | Travel outward along giant-web spokes in loops | Speed up with scroll velocity | Spawn rate rises near cursor |

All layers are children of a root `<group>` that is continuously tilted by a
slow ambient bob, by scroll progress, and by smoothed mouse position. The
camera sits at z ≈ 5.5 and is pushed forward on scroll; mouse position nudges
the camera look target so the volume feels tracked.

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
- Root group rotation is a sum of slow ambient sine waves plus scroll * k plus
  mouse * mouseK.
- Each layer multiplies `t` by a different factor and adds scroll * its own k.
- Camera z = base + scroll * depthK + scrollVelocity * velocityK.
- Mouse values are normalized to [-1, 1] from the viewport center and lerped
  with a 0.08 factor so movement feels weighted, not twitchy.

### Interconnected network feel

- **Data pulses**: 48 small points ride the giant web's radial spokes outward
  from the center, looping back when they reach the rim. Their speed scales
  with scroll velocity and cursor proximity, making the net feel energized.
- **Connector filaments**: a static second `LineSegments` geometry joins each
  honeycomb cell center to the nearest giant-web intersection. These lines are
  very low opacity and pulse in sync with the overlay web so the two grids read
  as one connected organism.
- **Node highlights**: energy motes are attracted to the web spokes; their color
  matches the neon accent and they twinkle with a deterministic pseudo-random
  function based on particle index and time.

### Reduced motion

When `prefers-reduced-motion: reduce` is detected:
- Render the existing SVG fallback (`WebHiveBackground`) instead of the Canvas.
- No animations run.

### Performance guardrails

- `dpr={[1, 1.25]}` on Canvas.
- `frameloop="demand"` with explicit `invalidate()` each frame.
- Geometry created once with `useMemo`.
- No new objects/array allocations inside `useFrame`.
- Particle count capped at 512 motes + 48 pulses + 128 connector endpoints
  (mobile-friendly).
- Line segment counts capped: giant web 36x12 rings, mid web 48x16, overlay 28x10,
  honeycomb 3 rings (~61 hexagons), connector filaments ~128.

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

1. **Mouse parallax** — yes, included as a smoothed pointer-to-scene tilt and
   per-layer offset.
2. **Neon color** — keep the existing `#39FF14` accent globally for this pass.
   Page-specific tints can be added later without changing the layer system.

## Approval

Once this design is approved, the next step is to invoke the `writing-plans`
skill to produce the implementation plan.
