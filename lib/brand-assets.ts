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
  /** 187WEB spider orb — primary product mark */
  orb: withBase("/images/187web_primary_brand_mark_iconic_mascot_logo.png"),
  /** Metallic 187WEB wordmark + taglines — hero / README header */
  headerLockup: withBase("/images/187web_header_text_lockup.png"),
  /** Full 187WEB header infographic with first-class skill modules */
  headerInfographic: withBase("/images/187web_header_infographic.jpg"),
  /** NATASHA technical blueprint — mascot geometry / vibe board */
  blueprint: withBase("/images/187web_technical_blueprint_coordinate_grid.png"),
  /** LumenHelix DNA lightbulb — org mark */
  bulb: withBase("/images/lumenhelix-logo-bulb.png"),
  /** LUMENhelix /lab wordmark */
  labWordmark: withBase("/images/lumenhelixlab-text-logo.png"),
  /** Full-reference mascot image — spider-bot with 187 orb and pillars */
  mascotReference: withBase("/images/187web_mascot_reference.jpg"),
  /** KNOTstore agent-memory layer logo */
  knotstoreLogo: withBase("/images/KNOTSTORELOGO.png"),
} as const;

export type BrandAssetKey = keyof typeof brandAssets;

/** Docs-tree mirrors for README and GitHub rendering (relative from repo root). */
export const brandAssetsDocs = {
  orb: "docs/assets/187orblogo.png",
  headerLockup: "docs/assets/header.png",
  blueprint: "docs/assets/natasha-tech-blueprint.png",
  bulb: "docs/assets/lumenhelix-logo-bulb.png",
  labWordmark: "docs/assets/lumenhelixlab-text-logo.png",
} as const;
