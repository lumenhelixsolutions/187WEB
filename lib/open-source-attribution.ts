/**
 * Repos and open-source used by 187WEB (187VERSION + About attribution).
 * Keep claim-safe: "used in this project" not "endorsed by".
 */

export type AttributionKind = "runtime" | "dev" | "docs" | "inspiration" | "infra" | "org";

export type OpenSourceItem = {
  name: string;
  href: string;
  kind: AttributionKind;
  role: string;
  license?: string;
};

export const OPEN_SOURCE_USED: OpenSourceItem[] = [
  // Org / product surfaces
  {
    name: "LumenHelix Lab",
    href: "https://lumenhelix.com",
    kind: "org",
    role: "Lab home and product narrative",
  },
  {
    name: "LumenHelixLab on GitHub",
    href: "https://github.com/LumenHelixLab",
    kind: "org",
    role: "Canonical GitHub organization",
  },
  {
    name: "187WEB repository",
    href: "https://github.com/LumenHelixLab/187WEB",
    kind: "org",
    role: "This suite (skills, showcase, installers)",
  },

  // App runtime
  {
    name: "Next.js",
    href: "https://github.com/vercel/next.js",
    kind: "runtime",
    role: "App Router, static export for GitHub Pages",
    license: "MIT",
  },
  {
    name: "React",
    href: "https://github.com/facebook/react",
    kind: "runtime",
    role: "UI runtime (React 19)",
    license: "MIT",
  },
  {
    name: "TypeScript",
    href: "https://github.com/microsoft/TypeScript",
    kind: "dev",
    role: "Typed application and skill surfaces",
    license: "Apache-2.0",
  },
  {
    name: "Tailwind CSS",
    href: "https://github.com/tailwindlabs/tailwindcss",
    kind: "runtime",
    role: "Utility styling system",
    license: "MIT",
  },
  {
    name: "GSAP (GreenSock)",
    href: "https://github.com/greensock/GSAP",
    kind: "runtime",
    role: "Timelines, ScrollTrigger, Flip (Motion Lab)",
    license: "Standard GreenSock license / npm terms",
  },
  {
    name: "three.js",
    href: "https://github.com/mrdoob/three.js",
    kind: "runtime",
    role: "WebGL renderer for WebHive and 3D demos",
    license: "MIT",
  },
  {
    name: "React Three Fiber",
    href: "https://github.com/pmndrs/react-three-fiber",
    kind: "runtime",
    role: "React renderer for Three.js",
    license: "MIT",
  },
  {
    name: "Drei",
    href: "https://github.com/pmndrs/drei",
    kind: "runtime",
    role: "R3F helpers (lines, controls, etc.)",
    license: "MIT",
  },
  {
    name: "React Three Postprocessing",
    href: "https://github.com/pmndrs/react-postprocessing",
    kind: "runtime",
    role: "Bloom and post effects on WebHive",
    license: "MIT",
  },
  {
    name: "Prisma",
    href: "https://github.com/prisma/prisma",
    kind: "runtime",
    role: "Optional Postgres data layer (non-Pages builds)",
    license: "Apache-2.0",
  },
  {
    name: "Zod",
    href: "https://github.com/colinhacks/zod",
    kind: "runtime",
    role: "Schema validation at boundaries",
    license: "MIT",
  },
  {
    name: "better-sqlite3",
    href: "https://github.com/WiseLibs/better-sqlite3",
    kind: "runtime",
    role: "Local/KNOTstore SQLite backend option",
    license: "MIT",
  },

  // Tooling
  {
    name: "Vitest",
    href: "https://github.com/vitest-dev/vitest",
    kind: "dev",
    role: "Unit tests",
    license: "MIT",
  },
  {
    name: "ESLint",
    href: "https://github.com/eslint/eslint",
    kind: "dev",
    role: "Lint pipeline",
    license: "MIT",
  },
  {
    name: "Prettier",
    href: "https://github.com/prettier/prettier",
    kind: "dev",
    role: "Code formatting",
    license: "MIT",
  },
  {
    name: "tsx",
    href: "https://github.com/privatenumber/tsx",
    kind: "dev",
    role: "TypeScript script runner",
    license: "MIT",
  },

  // Standards & docs inspiration
  {
    name: "Keep a Changelog",
    href: "https://keepachangelog.com/",
    kind: "docs",
    role: "Changelog structure",
  },
  {
    name: "Semantic Versioning",
    href: "https://semver.org/",
    kind: "docs",
    role: "Version bump policy",
  },
  {
    name: "WCAG",
    href: "https://www.w3.org/WAI/standards-guidelines/wcag/",
    kind: "docs",
    role: "Access skill reference standard",
  },

  // Ecosystem / related (portfolio context)
  {
    name: "assistant-ui",
    href: "https://github.com/assistant-ui/assistant-ui",
    kind: "inspiration",
    role: "Chatbot UI patterns referenced in portfolio skill docs",
    license: "MIT",
  },
  {
    name: "Obsidian",
    href: "https://obsidian.md/",
    kind: "infra",
    role: "Local vault workflows for skill notes and Claudian-style weave",
  },
  {
    name: "GitHub Pages",
    href: "https://pages.github.com/",
    kind: "infra",
    role: "Static showcase hosting",
  },
  {
    name: "Node.js",
    href: "https://github.com/nodejs/node",
    kind: "infra",
    role: "Runtime for CLI, CI, and Next tooling",
    license: "MIT",
  },
];

export function attributionsByKind(kind: AttributionKind): OpenSourceItem[] {
  return OPEN_SOURCE_USED.filter((i) => i.kind === kind);
}
