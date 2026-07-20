#!/usr/bin/env node
/**
 * Fail if reserved Charlotte / CHAR / agent-charlotte strings appear
 * outside the NATASHA migration allowlist.
 *
 * Usage: node scripts/check-reserved-names.mjs
 * Exit 0 = clean; 1 = violations.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const allowPath = path.join(root, "config", "reserved-names-allowlist.json");

const SKIP_DIR = new Set([
  "node_modules",
  ".next",
  ".git",
  "dist",
  "coverage",
  ".turbo",
  "out",
  // Model adapters are generated from .claude/skills (Phase 7 regenerate)
  ".chatgpt",
  ".grok",
  ".gemini",
  ".kimi",
  ".herme",
  ".ollama",
  ".codex",
]);

const TEXT_EXT = new Set([
  ".md",
  ".mdx",
  ".ts",
  ".tsx",
  ".js",
  ".mjs",
  ".cjs",
  ".json",
  ".yml",
  ".yaml",
  ".txt",
  ".html",
  ".css",
  ".ps1",
  ".sh",
  ".py",
]);

function loadAllowlist() {
  const raw = JSON.parse(fs.readFileSync(allowPath, "utf8"));
  const prefixes = [
    ...(raw.allowed_path_prefixes || []),
    ...(raw.transitional_paths || []),
  ].map((p) => p.replace(/\\/g, "/"));
  return {
    prefixes,
    patterns: (raw.forbidden_patterns || []).map((p) => ({
      id: p.id,
      re: new RegExp(p.regex, "g"),
      message: p.message,
    })),
  };
}

function isAllowed(rel) {
  const n = rel.replace(/\\/g, "/");
  return allow.prefixes.some((p) => {
    if (p.endsWith("/")) return n.startsWith(p) || n === p.slice(0, -1);
    return n === p || n.startsWith(p + "/");
  });
}

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIR.has(ent.name)) continue;
    const abs = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(abs, out);
    else {
      const ext = path.extname(ent.name).toLowerCase();
      if (TEXT_EXT.has(ext) || ent.name === "SKILL.md") out.push(abs);
    }
  }
  return out;
}

const allow = loadAllowlist();
const files = walk(root);
const violations = [];

for (const abs of files) {
  const rel = path.relative(root, abs).replace(/\\/g, "/");
  if (isAllowed(rel)) continue;
  let text;
  try {
    text = fs.readFileSync(abs, "utf8");
  } catch {
    continue;
  }
  // Skip binary-ish
  if (text.includes("\u0000")) continue;

  for (const { id, re, message } of allow.patterns) {
    re.lastIndex = 0;
    if (!re.test(text)) continue;
    re.lastIndex = 0;
    const lines = text.split(/\r?\n/);
    lines.forEach((line, i) => {
      re.lastIndex = 0;
      if (re.test(line)) {
        violations.push({
          file: rel,
          line: i + 1,
          id,
          message,
          snippet: line.trim().slice(0, 160),
        });
      }
    });
  }
}

if (violations.length === 0) {
  console.log("reserved-names:check OK (0 violations outside allowlist)");
  process.exit(0);
}

console.error(`reserved-names:check FAILED (${violations.length} hit(s)):\n`);
for (const v of violations.slice(0, 50)) {
  console.error(`  ${v.file}:${v.line} [${v.id}] ${v.message}`);
  console.error(`    ${v.snippet}`);
}
if (violations.length > 50) {
  console.error(`  … and ${violations.length - 50} more`);
}
console.error(
  "\nAdd path to config/reserved-names-allowlist.json only with justification,",
);
console.error("or migrate wording to NATASHA / SCOUT / neuro-tension.");
process.exit(1);
