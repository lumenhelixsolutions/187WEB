import type { MotionRegistryEntry } from "./motion-registry";

/**
 * Maps each registry entry to one of a small set of lightweight CSS-driven
 * preview archetypes. This is a classifier, not a literal reproduction —
 * 207 bespoke implementations isn't tractable, so entries sharing a visual
 * family (stagger, drag, morph, scroll-fill, ...) share one preview
 * component. Priority-ordered: earlier rules win on multi-keyword matches,
 * so the most distinctive pattern wins over generic ones (e.g. "stagger
 * drag list" matches `drag`, not `stagger-grid`).
 */
export type PreviewKind =
  | "morph"
  | "draw-path"
  | "split-text"
  | "flip"
  | "drag"
  | "parallax"
  | "rotate-icon"
  | "toggle"
  | "fade"
  | "marquee"
  | "scroll"
  | "wipe"
  | "stagger-grid"
  | "carousel"
  | "loader"
  | "particle"
  | "cursor"
  | "orbit3d"
  | "glow-pulse"
  | "counter"
  | "button"
  | "fallback";

const RULES: Array<[PreviewKind, string[]]> = [
  ["morph", ["morph"]],
  ["draw-path", ["drawsvg", "stroke-draw", "draw svg", "svg path", "path cursor", "stroke wipe", "svg stroke", "draws", "underline"]],
  ["split-text", ["splittext", "split text", "scramble", "kinetic type", "text reveal", "letter", "character stagger"]],
  ["flip", ["flip"]],
  ["drag", ["draggable", "drag", "swipe", "inertia"]],
  ["parallax", ["parallax"]],
  ["rotate-icon", ["rotating icon", "circular text", "rotator"]],
  ["toggle", ["checkbox-hack", "animated pill", "attribute toggler", "theme system", "tab system", "accordion"]],
  ["fade", ["cross-fade", "vimeo", "hls", "lottie"]],
  ["marquee", ["marquee"]],
  ["scroll", ["scrolltrigger", "scrub", "pin ", "pinned", "scroll-driven", "scroll progress", "scrollytelling", "scroll"]],
  ["wipe", ["clip-path", "wipe", "curtain", "page transition", "reveal transition"]],
  ["stagger-grid", ["stagger", "grid", "masonry", "mosaic"]],
  ["carousel", ["carousel", "slider", "slides", "cards stack", "deck"]],
  ["loader", ["loader", "loading", "preloader", "skeleton"]],
  ["particle", ["particle", "confetti", "physics", "burst", "noise", "canvas"]],
  ["cursor", ["cursor", "magnetic", "quickto", "mouse"]],
  ["orbit3d", ["orbit", "carousel 3d", "rotate3d", "sphere", "cube"]],
  ["glow-pulse", ["glow", "pulse", "neon", "spotlight", "blur"]],
  ["counter", ["count", "counter", "odometer"]],
  ["button", ["button", "ripple", "click"]],
];

export function classifyPreview(entry: MotionRegistryEntry): PreviewKind {
  const text = `${entry.name} ${entry.logic} ${entry.command}`.toLowerCase();
  for (const [kind, keywords] of RULES) {
    if (keywords.some((kw) => text.includes(kw))) return kind;
  }
  return "fallback";
}
