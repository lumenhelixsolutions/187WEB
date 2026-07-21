---
name: 187gsap
description: GSAP skillset for CHARLOTTE and the motion lab — core, timeline, ScrollTrigger, plugins, React, performance, and reduced-motion safety.
origin: motion-lab
---

# 187GSAP

187GSAP is the crew's animation skillset. It covers the full GSAP surface so CHARLOTTE can invoke the right subset for any motion need, from a single micro-interaction to a scroll-driven narrative.

## Sub-skills

- **gsap-core** — `gsap.to()` / `from()` / `fromTo()`, easing, duration, stagger, defaults.
- **gsap-timeline** — sequencing, position parameter, labels, nesting, playback control.
- **gsap-scrolltrigger** — scroll-linked animation, pinning, scrub, start/end triggers, `ScrollTrigger.refresh()`.
- **gsap-plugins** — ScrollToPlugin, ScrollSmoother, Flip, Draggable, Inertia, Observer, SplitText, ScrambleText, SVG plugins, CustomEase, EasePack, GSDevTools.
- **gsap-react** — `useGSAP()` hook, refs, `gsap.context()`, cleanup, SSR safety.
- **gsap-performance** — transform-only motion, `will-change`, batching, avoiding layout thrash, reduced-motion fallbacks.

## When to invoke

- A page or component needs entrance, exit, or state-transition animation.
- Scroll progress should drive animation, pinning, or camera moves.
- The user mentions timeline, stagger, easing, ScrollTrigger, tween, or GSAP directly.
- CHARLOTTE is orchestrating a motion-hero, scroll-story, or micro-interaction chain.

## Output contract

1. **Motion intent** — what moves, why, and the feeling/timing goal.
2. **Target spec** — selectors, refs, or scopes (React-safe).
3. **Timeline / ScrollTrigger map** — tweens, position parameters, labels, start/end, scrub, pin.
4. **Plugin list** — which GSAP plugins are registered and why.
5. **Performance notes** — transform-only props, `will-change` plan, invalidation strategy.
6. **Reduced-motion fallback** — `prefers-reduced-motion` handling and alternative static states.
7. **Next actions** — concrete, assignable implementation steps.

## Templates

### gsap-timeline.md

Use for a new timeline-driven animation.

```ts
import { gsap } from "gsap";

const tl = gsap.timeline({
  defaults: { duration: 0.6, ease: "power2.out" },
});

tl.from(".hero-headline", { y: 24, autoAlpha: 0 })
  .from(".hero-subhead", { y: 16, autoAlpha: 0 }, "-=0.4")
  .from(".hero-cta", { scale: 0.95, autoAlpha: 0 }, "-=0.3");
```

### scrolltrigger-map.md

Use when scroll progress drives the animation.

```ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".narrative-section",
    start: "top top",
    end: "+=150%",
    scrub: 0.5,
    pin: true,
  },
});

tl.to(".panel-1", { xPercent: -100 })
  .to(".panel-2", { xPercent: -100 }, "<");
```

### gsap-react.md

Use inside a React component.

```tsx
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export function AnimatedCard() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".card", { y: 20, opacity: 0, duration: 0.5 });
    },
    { scope: container },
  );

  return <div ref={container} className="card">...</div>;
}
```

## Routes

- **187MOTION** for reusable R3F/GSAP hooks.
- **187SCROLL** when scroll drives a 3D camera or scene.
- **187HERO** for immersive 3D hero scenes.
- **187TYPE** for kinetic typography.
- **187ACCESS+** for vestibular or photosensitive safety checks.
- **187PUBLISH** for the final ship gate.
