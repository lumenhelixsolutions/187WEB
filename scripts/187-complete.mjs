#!/usr/bin/env node
// scripts/187-complete.mjs — 187WEB CLI completion helper.
// Usage: node 187-complete.mjs --line "..." --cursor N [--json]

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const REPO_DIR = join(__dirname, "..");
const REF_FILE = join(REPO_DIR, "config", "187-command-reference.json");
const ALIASES_FILE = join(REPO_DIR, "config", "187-aliases.json");

function parseArgs(argv) {
  const args = { line: undefined, cursor: NaN, json: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--line" && i + 1 < argv.length) {
      args.line = argv[++i];
    } else if (a === "--cursor" && i + 1 < argv.length) {
      args.cursor = parseInt(argv[++i], 10);
    } else if (a === "--json") {
      args.json = true;
    }
  }
  return args;
}

function loadJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function getCandidates() {
  const ref = loadJson(REF_FILE);
  const aliases = loadJson(ALIASES_FILE);
  const set = new Set();

  for (const cmd of ref.commands || []) {
    if (cmd.alias) set.add(cmd.alias);
    // Also surface any literal subcommand tokens from the full cmd string,
    // e.g. "vault init" exposes "init" so it can be completed after "vault".
    if (cmd.cmd) {
      const parts = cmd.cmd.trim().split(/\s+/);
      for (let i = 1; i < parts.length; i++) {
        const tok = parts[i];
        if (!tok) continue;
        if (tok === "187") continue;
        if (tok.startsWith("<") || tok.startsWith("[") || tok.startsWith("--") || tok.includes("...")) continue;
        set.add(tok);
      }
    }
  }

  for (const key of Object.keys(aliases || {})) {
    set.add(key);
  }

  return Array.from(set).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
}

function normalizeLine(line) {
  // Git Bash (MSYS2/Cygwin) converts a leading "/187" path into a Windows
  // path such as "C:/Program Files/Git/187". Reverse that so completions
  // are computed against the intended "/187 <alias>" surface.
  if (typeof line !== "string") return "";
  return line.replace(
    /^[A-Za-z]:\\\/?(?:Program\s+Files(?:\s*\(x86\))?\\Git|Users\\[^\\]+\\AppData\\Local\\Programs\\Git)\\187(\s|$)/,
    "/187$1"
  ).replace(
    /^[A-Za-z]:\/(?:Program\s+Files(?:\s*\(x86\))?\/Git|Users\/[^\/]+\/AppData\/Local\/Programs\/Git)\/187(\s|$)/,
    "/187$1"
  );
}

function extractPartial(line, cursor) {
  line = normalizeLine(line);
  if (cursor === undefined || Number.isNaN(cursor) || cursor < 0) {
    cursor = line.length;
  }
  const prefix = line.slice(0, cursor);
  const tokens = prefix.split(/\s+/);
  let partial = tokens[tokens.length - 1] || "";

  // Strip a leading "/187" or "/187"-style prefix so the token to complete
  // is the alias/subcommand, not the command surface itself.
  if (partial.startsWith("/187")) {
    partial = partial.slice(4);
  }

  return partial;
}

function filterCandidates(candidates, partial) {
  if (!partial) return candidates;
  const lower = partial.toLowerCase();
  return candidates.filter((c) => c.toLowerCase().startsWith(lower));
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.line === undefined || Number.isNaN(args.cursor)) {
    console.error("Usage: 187-complete.mjs --line \"...\" --cursor N [--json]");
    process.exit(1);
  }

  const candidates = getCandidates();
  const partial = extractPartial(args.line, args.cursor);
  const filtered = filterCandidates(candidates, partial);

  if (args.json) {
    console.log(JSON.stringify(filtered.map((c) => ({ label: c }))));
  } else {
    for (const c of filtered) {
      console.log(c);
    }
  }
}

main();
