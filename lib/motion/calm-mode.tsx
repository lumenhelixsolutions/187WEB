"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "187web-calm-mode";

type CalmModeContextValue = {
  /** User-requested calm: pauses decorative auto-motion (mascot wander, marquees). */
  calm: boolean;
  setCalm: (v: boolean) => void;
  toggle: () => void;
  /** True when calm OR prefers-reduced-motion. */
  motionSuppressed: boolean;
  reducedMotion: boolean;
};

const CalmModeContext = createContext<CalmModeContextValue | null>(null);

export function CalmModeProvider({ children }: { children: ReactNode }) {
  const [calm, setCalmState] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "1") setCalmState(true);
    } catch {
      /* ignore */
    }
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onMq = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onMq);
    setReady(true);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  const setCalm = useCallback((v: boolean) => {
    setCalmState(v);
    try {
      window.localStorage.setItem(STORAGE_KEY, v ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => setCalm(!calm), [calm, setCalm]);

  const value = useMemo(
    () => ({
      calm: ready ? calm : false,
      setCalm,
      toggle,
      motionSuppressed: reducedMotion || calm,
      reducedMotion,
    }),
    [calm, ready, reducedMotion, setCalm, toggle]
  );

  return <CalmModeContext.Provider value={value}>{children}</CalmModeContext.Provider>;
}

export function useCalmMode() {
  const ctx = useContext(CalmModeContext);
  if (!ctx) {
    return {
      calm: false,
      setCalm: () => {},
      toggle: () => {},
      motionSuppressed: false,
      reducedMotion: false,
    } satisfies CalmModeContextValue;
  }
  return ctx;
}

/**
 * Persistent Calm Mode control — WCAG pause/stop/hide for decorative motion.
 * Rendered as a puzzle-piece (the 187 suite's "skills snap together" motif):
 * an SVG piece whose fill reflects state, with the label in a tooltip + an
 * always-present hover chip so it stays discoverable and accessible despite
 * being icon-first. Sized ≥44px for the WCAG target.
 */
// Classic jigsaw piece (viewBox 0 0 48 48): a knob bumps up off the top edge
// and out off the right edge, flat left + bottom — the unmistakable puzzle
// silhouette (the 187 suite's "skills snap together" motif). Body ~8..40, so
// the state dot centers near (22, 27).
const PUZZLE_PATH = "M8 12 H18 C18 3 30 3 30 12 H40 V22 C49 22 49 34 40 34 V40 H8 Z";

export function CalmModeToggle({ className = "" }: { className?: string }) {
  const { calm, toggle, reducedMotion } = useCalmMode();
  const [popping, setPopping] = useState(false);
  // ON (calm) rests still & green; OFF dances to invite the click. When the
  // OS already forces reduced motion the dance would be frozen anyway, so we
  // present the rested green state and skip the "off/dancing" affordance.
  const rested = calm || reducedMotion;
  const label = reducedMotion
    ? "System prefers reduced motion — decorative motion already off"
    : calm
      ? "Calm Mode on — click to allow decorative motion"
      : "Calm Mode off — click to pause decorative motion";
  const short = reducedMotion ? "Motion reduced" : calm ? "Calm Mode on" : "Calm Mode";

  const onClick = () => {
    setPopping(true);
    window.setTimeout(() => setPopping(false), 460);
    toggle();
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={calm}
      aria-label={short}
      title={label}
      className={`group relative inline-flex h-14 w-14 items-center justify-center rounded-xl transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39FF14] ${className}`}
    >
      <svg
        viewBox="0 0 48 48"
        aria-hidden
        style={{ color: rested ? "#39FF14" : undefined }}
        className={`h-12 w-12 origin-center transition-transform group-hover:scale-110 group-active:scale-95 ${
          popping ? "calm-pop" : rested ? "calm-rest" : "calm-dance"
        }`}
      >
        <path
          d={PUZZLE_PATH}
          fill="currentColor"
          fillOpacity={rested ? 0.22 : 0.16}
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
        <circle cx="23" cy="27" r={rested ? 3.5 : 2.75} fill="currentColor" />
      </svg>
      {/* discoverability chip — appears on hover/focus, aria-hidden so it's not announced twice */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-full top-1/2 mr-2 -translate-y-1/2 whitespace-nowrap rounded-md border border-white/10 bg-black/85 px-2 py-1 text-[11px] font-semibold text-white/90 opacity-0 shadow-lg backdrop-blur transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        {short}
      </span>
    </button>
  );
}
