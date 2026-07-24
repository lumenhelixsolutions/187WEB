import { MOTION_REGISTRY, type MotionRegistryEntry, type MotionSkillId } from "./motion-registry";

/**
 * Collapses the 207 raw registry entries into the ~24 genuinely DISTINCT
 * motion techniques they're variations of. The raw catalog is heavily
 * duplicated (nine draggable variants, twenty cursor-follow variants,
 * thirteen media players, …) and a chunk of it isn't motion at all
 * (Mapbox, video players, form validators) — so a flat 207-card grid of
 * near-identical previews was dishonest twice over: it inflated the count
 * and it forced non-motion entries into fake animations.
 *
 * Each technique carries a hand-written `blurb` describing its ACTUAL
 * mechanism (this is what makes the preview "match" — the description is
 * faithful to what the member entries really do), a `section` for grouping,
 * and the real member entries so the duplicates are shown honestly as
 * "N variations of this technique" rather than N separate discoveries.
 *
 * Assignment is a priority-ordered keyword matcher over each entry's
 * name+logic+command, with a hand-curated override map for entries the
 * keywords missort. Verified: all 207 land in a technique, none in OTHER.
 */

export type TechniqueSection = "core" | "3d" | "integration";

export interface TechniqueDef {
  id: string;
  label: string;
  /** Faithful one-line description of the real mechanism. */
  blurb: string;
  section: TechniqueSection;
}

export interface Technique extends TechniqueDef {
  entries: MotionRegistryEntry[];
  /** Skills that own at least one member, most-frequent first. */
  skills: MotionSkillId[];
}

const DEFS: TechniqueDef[] = [
  // — core motion —
  { id: "text-reveal", section: "core", label: "Text reveal", blurb: "Text split into characters, words, or lines that animate in on a stagger — the SplitText family, plus scramble decode and clip reveals." },
  { id: "draw-svg", section: "core", label: "SVG draw-on", blurb: "An SVG stroke draws itself along its path (DrawSVGPlugin / stroke-dashoffset) — underlines, signatures, and scroll-driven path followers." },
  { id: "morph-svg", section: "core", label: "SVG morph", blurb: "One vector shape tweens into another (MorphSVGPlugin) — play↔pause, hamburger↔close, pills that expand." },
  { id: "clip-wipe", section: "core", label: "Clip-path wipe", blurb: "Clip-path reveals and page transitions — curtains, quad shutters, circular masks, and staggered column wipes." },
  { id: "pixelate", section: "core", label: "Pixel dissolve", blurb: "Blur + pixelation disintegration — retro dissolve transitions and sharpen-on-scroll image reveals." },
  { id: "scroll-scrub", section: "core", label: "Scroll scrub", blurb: "Progress bound directly to scroll position — progress bars, percentages, and frame-by-frame video/canvas scrubbing." },
  { id: "scroll-pin", section: "core", label: "Scroll pinning", blurb: "Elements pinned while the page scrolls past — sticky card stacks, horizontal sections, and scroll-spy navigation." },
  { id: "parallax", section: "core", label: "Parallax", blurb: "Layered depth: foreground and background move at different scroll speeds." },
  { id: "marquee", section: "core", label: "Marquee", blurb: "Infinite looping tickers — CSS-keyframe or draggable, with scroll-direction reversal." },
  { id: "stagger-cascade", section: "core", label: "Stagger cascade", blurb: "A set of elements enters in sequence — dropping cards, batched reveals, breathing logo walls." },
  { id: "carousel", section: "core", label: "Carousel", blurb: "Sliding content — 2D sliders, 3D cylindrical and orbital carousels, Swiper/Flickity integrations." },
  { id: "drag-inertia", section: "core", label: "Drag + inertia", blurb: "Draggable surfaces with momentum (InertiaPlugin) — infinite grids, Tinder swipes, freeform sticker canvases." },
  { id: "cursor-follow", section: "core", label: "Cursor follow", blurb: "Custom cursors that lead, lag, or trail the pointer — magnetic buttons, image trails, spotlights, and macOS-style docks." },
  { id: "tilt-3d", section: "core", label: "3D tilt", blurb: "Perspective tilt that tracks the pointer, plus hardware-accelerated cube flips." },
  { id: "orbit-rotate", section: "core", label: "Orbit / rotate", blurb: "Continuous rotation — orbiting tiles, circular text, card tornadoes, and breathing logo grids." },
  { id: "counter", section: "core", label: "Counter", blurb: "Numbers that count up or tick — odometers, countdowns, live clocks, reading-time estimates." },
  { id: "physics", section: "core", label: "Physics", blurb: "Real physics — gravity, bounce, and collisions (Physics2D / Matter.js) driving confetti and falling text." },
  { id: "flip-layout", section: "core", label: "Flip layout", blurb: "Shared-element layout morphs — the Flip plugin animates smoothly between two DOM states." },
  { id: "loader", section: "core", label: "Loaders", blurb: "Loading states — skeleton shimmers, geometric step loaders, percentage counters, splash sequences." },
  { id: "hover-fx", section: "core", label: "Hover micro-fx", blurb: "Micro-interaction button effects — elastic pulses, directional slide fills, skewed backgrounds." },
  // — 3d / webgl —
  { id: "webgl-3d", section: "3d", label: "WebGL / 3D", blurb: "True 3D via Three.js — morphing meshes, 50k-point clouds, GLSL shaders, and volumetric cursor light." },
  { id: "audio-react", section: "3d", label: "Audio-reactive", blurb: "Geometry driven by live audio frequency data — column visualizers and WebGL orb fields." },
  // — integrations / non-motion (represented honestly) —
  { id: "toggle-ui", section: "integration", label: "Toggles & overlays", blurb: "Interactive UI state — accordions, tabs, theme toggles, mega-menus, modals, and lightboxes." },
  { id: "media-embed", section: "integration", label: "Media players", blurb: "Media integrations — custom HLS, Vimeo, and Lottie playback controllers." },
  { id: "map", section: "integration", label: "Maps", blurb: "Interactive maps — Mapbox globe projections and proximity store locators." },
  { id: "ui-utility", section: "integration", label: "DOM utilities", blurb: "Interface utilities — filters, clipboard, share intents, form validation, scroll-spy, badges, and clocks." },
];

const OVERRIDE: Record<number, string> = {
  22: "counter", 177: "counter", 87: "counter", 130: "counter", 35: "counter", 184: "loader",
  71: "ui-utility", 99: "ui-utility", 100: "ui-utility", 156: "ui-utility", 187: "ui-utility",
  164: "ui-utility", 85: "ui-utility", 135: "ui-utility", 119: "ui-utility", 188: "ui-utility",
  193: "ui-utility", 63: "ui-utility", 158: "ui-utility", 20: "ui-utility", 109: "ui-utility",
  38: "media-embed", 55: "media-embed", 118: "media-embed", 143: "scroll-scrub",
  28: "pixelate", 53: "pixelate", 102: "pixelate", 197: "pixelate", 33: "pixelate", 42: "clip-wipe",
  76: "webgl-3d", 204: "webgl-3d", 167: "ui-utility", 126: "ui-utility",
  141: "morph-svg", 166: "morph-svg", 185: "morph-svg", 178: "morph-svg", 74: "morph-svg", 58: "morph-svg",
  46: "audio-react", 146: "cursor-follow", 96: "hover-fx", 183: "hover-fx", 79: "hover-fx",
  128: "ui-utility", 150: "ui-utility", 192: "text-reveal", 129: "scroll-pin", 40: "scroll-pin",
  24: "orbit-rotate", 17: "carousel", 106: "orbit-rotate", 11: "marquee", 149: "loader", 75: "loader",
  189: "cursor-follow", 97: "cursor-follow", 172: "ui-utility", 171: "marquee",
  115: "scroll-pin", 175: "scroll-pin", 174: "ui-utility", 29: "scroll-pin",
  116: "media-embed", 138: "scroll-scrub", 179: "scroll-scrub", 23: "scroll-pin", 56: "scroll-pin",
  165: "scroll-pin", 133: "scroll-pin", 25: "scroll-pin", 44: "clip-wipe", 68: "text-reveal",
  196: "text-reveal", 4: "pixelate", 176: "physics", 181: "physics", 66: "physics",
  52: "clip-wipe", 104: "carousel", 107: "stagger-cascade", 152: "media-embed", 207: "audio-react",
  202: "webgl-3d", 203: "webgl-3d", 200: "webgl-3d", 199: "webgl-3d", 201: "webgl-3d",
  205: "webgl-3d", 206: "webgl-3d", 198: "webgl-3d",
};

const MATCHER: Array<[string, string[]]> = [
  ["text-reveal", ["splittext", "split text", "scramble", "charstagger", "char-stagger", "character", "per-word", "typewriter", "typing-intro", "clip-path text", "varfont", "variable weight", "rotating word", "fittext", "text squeeze", "fluid viewport"]],
  ["draw-svg", ["drawsvg", "draw svg", "drawsvgplugin", "stroke-draw", "stroke draw", "draws 0", "underline", "path follower", "motionpath", "line draws", "line-draw"]],
  ["morph-svg", ["morphsvg", "morph", "hamburger", "burger"]],
  ["clip-wipe", ["clip-path", "clippath", "clip path", "wipe", "curtain", "shutter", "reveal-mask", "maskwindow", "page transition", "fan-out", "side nav", "sidenav"]],
  ["pixelate", ["pixel", "pixelate", "pixelated", "disintegrat", "noise overlay", "grain"]],
  ["scroll-scrub", ["scrub", "progress bar", "progressbar", "progress number", "percentage", "frame-sequence", "frame sequence", "video scrub", "scroll-progress", "scroll percentage"]],
  ["scroll-pin", ["pin ", "pinned", "pin wrapper", "sticky", "pin each", "pin container", "scroll-spy", "scrollspy", "scroll snap", "scrollsnap", "locomotive", "lenis", "section theming", "scroll direction", "fixed nav", "header"]],
  ["parallax", ["parallax"]],
  ["marquee", ["marquee", "ticker"]],
  ["stagger-cascade", ["stagger", "cascade", "drop card", "dropstack", "dropcards", "bounce-physics loader", "reveal engine", "reveal batch", "logo wall", "breathing logo"]],
  ["carousel", ["carousel", "slider", "slide transition", "swiper", "flickity", "slideshow", "autocycle", "looper", "centerloop", "gsapslider", "infslider"]],
  ["drag-inertia", ["draggable", "drag", "swipe", "inertia", "tinder", "flick", "sticker", "split comparator", "beforeafter", "stackcards", "stack-drag"]],
  ["cursor-follow", ["cursor", "magnetic", "quickto", "mouse-follow", "pointer trail", "trail", "spotlight", "torch", "dock", "appledock", "coordinate", "velocity", "refraction", "face tracker", "mascotface"]],
  ["tilt-3d", ["tilt", "perspective3d", "perspective 3d", "rotatex", "cube flip", "cube3d", "3d card", "mouse-tilt"]],
  ["orbit-rotate", ["orbit", "rotate:360", "rotate 360", "rotating icon", "circular text", "radialtxt", "spin", "tornado", "helical", "revolve"]],
  ["counter", ["odometer", "countdown", "count-up", "numeric", "displaycount", "clock", "reading duration", "readtime", "timetable", "date-difference"]],
  ["physics", ["physics", "gravity", "confetti", "falling", "emoji rain", "matter.js", "matterfall", "snowfall", "particle emitter"]],
  ["flip-layout", ["flip.getstate", "flip.from", "flip state", "gridflip", "flipscroll", "layout state flip"]],
  ["loader", ["loader", "loading", "preloader", "skeleton", "shimmer", "splash"]],
  ["webgl-3d", ["three.js", "webgl", "glsl", "shader", "plane geometry", "point cloud", "pointcloud", "mesh", "fiberorb", "morphsphere", "noiseterrain", "volumefog", "holo", "sketchline"]],
  ["audio-react", ["audio", "waveform", "frequency", "howler", "visualizer", "column visualizer", "gridvisual", "pixel grid", "pixelgrid"]],
  ["hover-fx", ["glow", "pulse", "neon", "elastic pulse", "ripple", "shine", "gradient border", "slant", "diagonal", "direction-sensing", "dirbtn"]],
  ["toggle-ui", ["toggle", "checkbox-hack", "accordion", "tab system", "csstabs", "tabautoplay", "theme system", "darkmode", "mega-menu", "meganav", "mega nav", "multinav", "fullnav", "aria-expanded", "aria", "max-height", "modal", "lightbox", "zoom lens", "expand"]],
  ["media-embed", ["hls", "vimeo", "lottie", "video", "player", "showreel", "media driver"]],
  ["map", ["mapbox", "globe", "geolocation", "locator", "store finder"]],
  ["ui-utility", ["filter", "list.js", "search", "validator", "form", "share", "clipboard", "copy", "back-to-top", "backtop", "tooltip", "badge", "copyright", "qr", "calendar", "datepicker", "minigame", "game", "title swap", "visibilitychange", "drawcanvas", "drawing canvas"]],
];

function techniqueIdFor(entry: MotionRegistryEntry): string {
  if (OVERRIDE[entry.id]) return OVERRIDE[entry.id];
  const text = `${entry.name} ${entry.logic} ${entry.command}`.toLowerCase();
  for (const [id, keywords] of MATCHER) {
    if (keywords.some((kw) => text.includes(kw))) return id;
  }
  return "ui-utility"; // safe honest bucket; verified never reached, but never crash
}

function buildTechniques(): Technique[] {
  const byId = new Map<string, MotionRegistryEntry[]>();
  for (const def of DEFS) byId.set(def.id, []);
  for (const entry of MOTION_REGISTRY) {
    const id = techniqueIdFor(entry);
    (byId.get(id) ?? byId.get("ui-utility"))!.push(entry);
  }
  return DEFS.map((def) => {
    const entries = byId.get(def.id)!;
    const skillCount = new Map<MotionSkillId, number>();
    for (const e of entries) skillCount.set(e.owner, (skillCount.get(e.owner) ?? 0) + 1);
    const skills = [...skillCount.entries()].sort((a, b) => b[1] - a[1]).map(([s]) => s);
    return { ...def, entries, skills };
  });
}

export const TECHNIQUES: Technique[] = buildTechniques();

export const TECHNIQUE_SECTIONS: Array<{ id: TechniqueSection; label: string }> = [
  { id: "core", label: "Core motion" },
  { id: "3d", label: "3D & WebGL" },
  { id: "integration", label: "Integrations & UI" },
];

export const TECHNIQUE_COUNT = TECHNIQUES.length;
export const VARIATION_COUNT = MOTION_REGISTRY.length;
