"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { brandAssets } from "@/lib/brand-assets";
import { gsap, registerGsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { useClientMounted } from "@/lib/motion/useClientMounted";

type Mode = "follow" | "wander" | "off";

function resolveMode(pathname: string | null): Mode {
  if (!pathname) return "wander";
  // Showcase: tiny cursor companion
  if (pathname.includes("/showcase")) return "follow";
  // Landing hero already has the shield — still allow small wander elsewhere on /
  return "wander";
}

/**
 * 187VIBE spider companion:
 * - Showcase: tiny CORE mascot follows the pointer (lagged, spider-y).
 * - Rest of site: medium/small CORE mascot drops on silk, swings, slides, scurries —
 *   random + scroll/click triggers. Transform-only; honors reduced-motion.
 */
export function SpiderVibe() {
  const mounted = useClientMounted();
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const mode = resolveMode(pathname);

  if (!mounted || reduced || mode === "off") return null;

  return mode === "follow" ? <SpiderMouseFollower /> : <SpiderWanderer />;
}

/** Tiny mascot that tracks the cursor with elastic lag. */
function SpiderMouseFollower() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const silkRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    if (!wrapRef.current || !imgRef.current) return;
    registerGsap();
    const wrap = wrapRef.current;
    const img = imgRef.current;
    const silk = silkRef.current;

    gsap.set(wrap, { xPercent: -50, yPercent: -50, x: window.innerWidth / 2, y: window.innerHeight / 2 });
    gsap.set(img, { scale: 0, opacity: 0 });
    gsap.to(img, { scale: 1, opacity: 0.92, duration: 0.55, ease: "back.out(1.6)", delay: 0.2 });

    const xTo = gsap.quickTo(wrap, "x", { duration: 0.55, ease: "power3.out" });
    const yTo = gsap.quickTo(wrap, "y", { duration: 0.7, ease: "power3.out" });
    const rotTo = gsap.quickTo(img, "rotation", { duration: 0.45, ease: "power2.out" });

    let lastX = window.innerWidth / 2;

    const onMove = (e: PointerEvent) => {
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      xTo(e.clientX);
      yTo(e.clientY);
      rotTo(gsap.utils.clamp(-18, 18, dx * 0.35));
      if (silk) {
        gsap.set(silk, {
          attr: {
            x1: e.clientX,
            y1: 0,
            x2: e.clientX,
            y2: Math.max(8, e.clientY - 28),
          },
        });
      }
    };

    const onLeave = () => {
      gsap.to(img, { opacity: 0.35, scale: 0.85, duration: 0.35 });
    };
    const onEnter = () => {
      gsap.to(img, { opacity: 0.92, scale: 1, duration: 0.35 });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[45]" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full overflow-visible opacity-40">
        <line
          ref={silkRef}
          x1="0"
          y1="0"
          x2="0"
          y2="0"
          stroke="rgba(57,255,20,0.35)"
          strokeWidth="1"
          strokeDasharray="3 5"
        />
      </svg>
      <div ref={wrapRef} className="fixed left-0 top-0 will-change-transform">
        {/* eslint-disable-next-line @next/next/no-img-element -- basePath-safe */}
        <img
          ref={imgRef}
          src={brandAssets.mascotCore}
          alt=""
          width={72}
          height={72}
          className="h-10 w-10 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)] sm:h-12 sm:w-12"
          draggable={false}
        />
      </div>
    </div>
  );
}

type Trick =
  | "silkDrop"
  | "swingIn"
  | "scurrySide"
  | "zipAcross"
  | "bounceCorner"
  | "rappelOut";

const TRICKS: Trick[] = ["silkDrop", "swingIn", "scurrySide", "zipAcross", "bounceCorner", "rappelOut"];

/** Medium/small mascot with random spider-like GSAP sequences. */
function SpiderWanderer() {
  const rootRef = useRef<HTMLDivElement>(null);
  const silkRef = useRef<HTMLDivElement>(null);
  const spiderRef = useRef<HTMLImageElement>(null);
  const busyRef = useRef(false);
  const lastScrollRef = useRef(0);

  const playTrick = useCallback((trick: Trick) => {
    if (busyRef.current || !spiderRef.current || !silkRef.current || !rootRef.current) return;
    const spider = spiderRef.current;
    const silk = silkRef.current;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    // Keep clear of nav (~80px) and edges
    const pad = 24;
    const size = Math.min(88, Math.max(56, vw * 0.08));
    busyRef.current = true;
    registerGsap();

    const tl = gsap.timeline({
      onComplete: () => {
        busyRef.current = false;
        gsap.set([spider, silk], { clearProps: "all" });
        gsap.set(spider, { opacity: 0, visibility: "hidden" });
        gsap.set(silk, { opacity: 0, scaleY: 0 });
      },
    });

    gsap.set(spider, {
      visibility: "visible",
      width: size,
      height: size,
      opacity: 0,
      rotation: 0,
      scale: 1,
      x: 0,
      y: 0,
      left: "auto",
      top: "auto",
      right: "auto",
      bottom: "auto",
    });
    gsap.set(silk, { opacity: 0, scaleY: 0, transformOrigin: "top center" });

    const side = Math.random() > 0.5 ? "left" : "right";
    const xEdge = side === "left" ? pad : vw - size - pad;
    const midX = pad + Math.random() * (vw - size - pad * 2);
    const midY = 100 + Math.random() * (vh * 0.45);

    switch (trick) {
      case "silkDrop": {
        // Drop from ceiling on a silk line, bob, climb back up
        gsap.set(spider, { position: "fixed", left: midX, top: -size, opacity: 1 });
        gsap.set(silk, {
          position: "fixed",
          left: midX + size / 2 - 0.5,
          top: 0,
          width: 1,
          height: midY + size / 2,
          opacity: 0.55,
          background: "linear-gradient(to bottom, transparent, rgba(57,255,20,0.45))",
        });
        tl.to(silk, { scaleY: 1, opacity: 0.55, duration: 0.35, ease: "power2.out" })
          .to(spider, { top: midY, duration: 0.85, ease: "bounce.out" }, "-=0.1")
          .to(spider, { y: 6, duration: 0.35, yoyo: true, repeat: 2, ease: "sine.inOut" })
          .to(spider, { top: -size - 20, duration: 0.7, ease: "power2.in" }, "+=0.4")
          .to(silk, { scaleY: 0, opacity: 0, duration: 0.4, ease: "power2.in" }, "-=0.55");
        break;
      }
      case "swingIn": {
        // Pendulum swing from a top anchor
        const anchorX = midX;
        gsap.set(spider, {
          position: "fixed",
          left: anchorX,
          top: 80,
          opacity: 1,
          transformOrigin: "50% 0%",
          rotation: side === "left" ? -55 : 55,
        });
        gsap.set(silk, {
          position: "fixed",
          left: anchorX + size / 2,
          top: 0,
          width: 1,
          height: 80 + size / 2,
          opacity: 0.5,
          scaleY: 1,
          background: "rgba(57,255,20,0.4)",
        });
        tl.fromTo(
          spider,
          { rotation: side === "left" ? -60 : 60, opacity: 0 },
          { rotation: 0, opacity: 1, duration: 0.9, ease: "elastic.out(1, 0.45)" }
        )
          .to(spider, { rotation: side === "left" ? 12 : -12, duration: 0.4, yoyo: true, repeat: 1, ease: "sine.inOut" })
          .to(spider, { x: side === "left" ? -vw : vw, opacity: 0, duration: 0.65, ease: "power2.in" }, "+=0.25")
          .to(silk, { opacity: 0, duration: 0.3 }, "-=0.5");
        break;
      }
      case "scurrySide": {
        // Crawl along the edge then dart off
        const y = 120 + Math.random() * (vh - 220);
        gsap.set(spider, {
          position: "fixed",
          left: side === "left" ? -size : vw + 8,
          top: y,
          opacity: 1,
          rotation: side === "left" ? 8 : -8,
        });
        const restX = side === "left" ? pad + 8 : vw - size - pad - 8;
        tl.to(spider, { left: restX, duration: 0.55, ease: "power2.out" })
          .to(spider, {
            y: "+=10",
            rotation: side === "left" ? -6 : 6,
            duration: 0.18,
            yoyo: true,
            repeat: 5,
            ease: "steps(2)",
          })
          .to(
            spider,
            {
              left: side === "left" ? -size - 20 : vw + 40,
              duration: 0.5,
              ease: "power3.in",
            },
            "+=0.35"
          );
        break;
      }
      case "zipAcross": {
        // Zip on a horizontal silk
        const y = 140 + Math.random() * (vh * 0.35);
        gsap.set(silk, {
          position: "fixed",
          left: 0,
          top: y + size / 2,
          width: vw,
          height: 1,
          opacity: 0,
          scaleY: 1,
          background: "linear-gradient(90deg, transparent, rgba(57,255,20,0.35), transparent)",
        });
        gsap.set(spider, {
          position: "fixed",
          left: -size,
          top: y,
          opacity: 1,
          rotation: 12,
        });
        tl.to(silk, { opacity: 0.6, duration: 0.25 })
          .to(spider, { left: vw + size, duration: 1.1, ease: "power1.inOut", rotation: -8 })
          .to(silk, { opacity: 0, duration: 0.3 }, "-=0.2");
        break;
      }
      case "bounceCorner": {
        // Pop into a corner, wiggle legs (rotate), hop out
        const cornerX = Math.random() > 0.5 ? pad : vw - size - pad;
        const cornerY = Math.random() > 0.5 ? 96 : vh - size - pad;
        gsap.set(spider, {
          position: "fixed",
          left: cornerX,
          top: cornerY,
          scale: 0,
          opacity: 1,
        });
        tl.to(spider, { scale: 1, duration: 0.4, ease: "back.out(2)" })
          .to(spider, { rotation: 15, duration: 0.12, yoyo: true, repeat: 5, ease: "power1.inOut" })
          .to(spider, { scale: 0, opacity: 0, duration: 0.35, ease: "back.in(1.4)" }, "+=0.5");
        break;
      }
      case "rappelOut": {
        // Appear mid, rappel down a short line, scuttle off-screen
        gsap.set(spider, { position: "fixed", left: midX, top: midY * 0.4, opacity: 0, scale: 0.6 });
        gsap.set(silk, {
          position: "fixed",
          left: midX + size / 2,
          top: 0,
          width: 1,
          height: midY * 0.4 + size / 2,
          opacity: 0.5,
          scaleY: 1,
          background: "rgba(57,255,20,0.35)",
        });
        tl.to(spider, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" })
          .to(spider, { top: midY, duration: 0.65, ease: "power2.inOut" })
          .to(spider, {
            left: xEdge > vw / 2 ? vw + size : -size,
            top: midY + 40,
            rotation: xEdge > vw / 2 ? 20 : -20,
            duration: 0.7,
            ease: "power2.in",
          })
          .to(silk, { opacity: 0, duration: 0.25 }, "-=0.5");
        break;
      }
    }
  }, []);

  useEffect(() => {
    registerGsap();
    // Initial entrance after a beat
    const start = window.setTimeout(() => {
      playTrick(TRICKS[Math.floor(Math.random() * TRICKS.length)]);
    }, 2200);

    // Random cadence (8–18s)
    let timer = window.setTimeout(function tick() {
      playTrick(TRICKS[Math.floor(Math.random() * TRICKS.length)]);
      timer = window.setTimeout(tick, 8000 + Math.random() * 10000);
    }, 10000);

    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastScrollRef.current) > 480) {
        lastScrollRef.current = y;
        if (Math.random() > 0.45) {
          playTrick(TRICKS[Math.floor(Math.random() * TRICKS.length)]);
        }
      }
    };

    let clickCooldown = 0;
    const onClick = () => {
      const now = Date.now();
      if (now - clickCooldown < 4000) return;
      clickCooldown = now;
      if (Math.random() > 0.55) playTrick(TRICKS[Math.floor(Math.random() * TRICKS.length)]);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("click", onClick, { passive: true });

    return () => {
      window.clearTimeout(start);
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("click", onClick);
    };
  }, [playTrick]);

  return (
    <div ref={rootRef} className="pointer-events-none fixed inset-0 z-[44] overflow-hidden" aria-hidden="true">
      <div ref={silkRef} className="pointer-events-none fixed origin-top opacity-0" />
      {/* eslint-disable-next-line @next/next/no-img-element -- basePath-safe */}
      <img
        ref={spiderRef}
        src={brandAssets.mascotCore}
        alt=""
        width={96}
        height={96}
        className="pointer-events-none fixed object-contain opacity-0 will-change-transform"
        style={{ visibility: "hidden" }}
        draggable={false}
      />
    </div>
  );
}
