/**
 * Canonical brand media paths (files live under public/images/).
 *
 * GitHub Pages serves the site under /187WEB (basePath). next/image unoptimized
 * export was emitting bare /images/... URLs (404 on Pages). Always prefix with
 * the public base path when set.
 */
function withBase(path: string): string {
  const base = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export const brandAssets = {
  /** Official 187WEB badge icon — nav mark, favicon contexts */
  orb: withBase("/images/187web_badge_icon.png"),
  /** Official 187WEB wordmark */
  wordmark: withBase("/images/187web_wordmark.png"),
  /** Wordmark + tagline strip (legacy / alternate) */
  wordmarkTagline: withBase("/images/187web_wordmark_tagline.png"),
  /** Horizontal lockup */
  headerLockup: withBase("/images/187web_lockup_horizontal.png"),
  /** Large hero badge (same official badge asset) */
  heroBadge: withBase("/images/187web_hero_badge.png"),
  /** CORE mascot — primary product figure */
  mascotCore: withBase("/images/187web_mascot_core.png"),
  /** Full-figure mascot alias for older call sites */
  mascotReference: withBase("/images/187web_mascot_core.png"),
  /** Hologram background mascot for animated hive layer */
  mascotHoloBg: withBase("/images/187web_mascot_holo_bg.png"),
  /** Wireframe / hologram line art for agent recolors */
  mascotWireframe: withBase("/images/187web_mascot_wireframe.png"),
  /** Red blueprint mascot — alternate */
  mascotBlueprint: withBase("/images/187web_mascot_blueprint.png"),
  /** NATASHA technical blueprint grid */
  blueprint: withBase("/images/187web_technical_blueprint_coordinate_grid.png"),
  /** LumenHelix Lab DNA lightbulb — org icon */
  bulb: withBase("/images/lumenhelix-logo-bulb.png"),
  /** LUMENhelix /lab wordmark */
  labWordmark: withBase("/images/lumenhelixlab-text-logo.png"),
  /** Triangle icon for Flip sampler */
  triangleIcon: withBase("/images/187web_triangle_icon.png"),
  /** KNOTstore logo */
  knotstoreLogo: withBase("/images/KNOTSTORELOGO.png"),
} as const;

export type BrandAssetKey = keyof typeof brandAssets;

/** Docs-tree mirrors for README and GitHub rendering (relative from repo root). */
export const brandAssetsDocs = {
  orb: "docs/assets/187orblogo.png",
  headerLockup: "docs/assets/header.png",
  wordmark: "docs/assets/header.png",
  blueprint: "docs/assets/natasha-tech-blueprint.png",
  bulb: "docs/assets/lumenhelix-logo-bulb.png",
  labWordmark: "docs/assets/lumenhelixlab-text-logo.png",
  mascotReference: "docs/assets/natasha187mascot.png",
  mascotCore: "docs/assets/natasha187mascot.png",
} as const;
