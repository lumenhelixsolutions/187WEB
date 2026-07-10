#!/usr/bin/env node
/**
 * Check that each public skill has a corresponding docs/ page and that the
 * docs page is not older than the canonical skill.
 */
import { readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { projectRoot, PUBLIC_SKILLS } from "./lib/suite-constants.mjs";

const root = fileURLToPath(projectRoot());

let errors = 0;

for (const skill of PUBLIC_SKILLS.filter((s) => s.docs)) {
  const docPath = join(root, "docs", `${skill.docs}.md`);
  const skillPath = join(root, ".claude/skills", skill.id, "SKILL.md");

  try {
    readFileSync(docPath, "utf8");
  } catch {
    console.error(`❌ missing docs page for ${skill.name}: docs/${skill.docs}.md`);
    errors++;
    continue;
  }

  try {
    const docMtime = statSync(docPath).mtimeMs;
    const skillMtime = statSync(skillPath).mtimeMs;
    if (docMtime < skillMtime) {
      console.error(
        `❌ docs/${skill.docs}.md is older than .claude/skills/${skill.id}/SKILL.md — regenerate docs`
      );
      errors++;
    }
  } catch {
    // ignore stat errors; missing file caught above
  }
}

if (errors) {
  console.error(`\n${errors} docs drift error(s)`);
  process.exit(1);
}

console.log("✅ Docs drift check passed");
