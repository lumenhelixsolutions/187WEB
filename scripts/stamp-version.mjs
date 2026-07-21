/**
 * 187VERSION — stamp build identity for the whole site.
 * Writes lib/generated/site-build.json consumed by the app.
 * Run before every production build so deploys invalidate with a new stamp.
 */
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));

function git(cmd) {
  try {
    return execSync(cmd, { cwd: root, encoding: "utf8" }).trim();
  } catch {
    return "";
  }
}

const sha = process.env.GITHUB_SHA || git("git rev-parse HEAD") || "unknown";
const shortSha = sha === "unknown" ? "dev" : sha.slice(0, 7);
const branch =
  process.env.GITHUB_REF_NAME ||
  git("git rev-parse --abbrev-ref HEAD") ||
  "unknown";
const builtAt = new Date().toISOString();

const stamp = {
  name: "187WEB",
  version: pkg.version,
  packageName: pkg.name,
  builtAt,
  gitSha: sha,
  gitShort: shortSha,
  branch,
  channel: process.env.NEXT_PUBLIC_STATIC_EXPORT === "true" ? "pages" : "app",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  label: `v${pkg.version}+${shortSha}`,
};

const outDir = join(root, "lib", "generated");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "site-build.json");
writeFileSync(outPath, `${JSON.stringify(stamp, null, 2)}\n`, "utf8");

// Env-friendly one-liner for CI logs
console.log(`[187version] stamped ${stamp.label} @ ${stamp.builtAt} (${stamp.channel})`);
