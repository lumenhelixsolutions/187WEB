#!/usr/bin/env node
/**
 * Verify that every routed first-class skill has a public app showcase page
 * and that the homepage and 187repo command page mention every first-class skill.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { projectRoot, FIRST_CLASS_SKILLS, SUBSKILLS } from "./lib/suite-constants.mjs";

const root = fileURLToPath(projectRoot());

let errors = 0;

// Every routed first-class skill needs app/187<route>/page.tsx.
for (const skill of FIRST_CLASS_SKILLS.filter((s) => s.route)) {
  const pagePath = join(root, "app", `187${skill.route}`, "page.tsx");
  if (!existsSync(pagePath)) {
    console.error(`❌ missing showcase page for ${skill.name}: app/187${skill.route}/page.tsx`);
    errors++;
  }
}

// Home page and command reference should mention all first-class skills and subskills.
const home = readFileSync(join(root, "app/page.tsx"), "utf8");
const commands = readFileSync(join(root, "app/187repo/page.tsx"), "utf8");

for (const skill of [...FIRST_CLASS_SKILLS, ...SUBSKILLS]) {
  if (!home.includes(skill.name)) {
    console.error(`❌ ${skill.name} not mentioned in app/page.tsx`);
    errors++;
  }
  if (!commands.includes(skill.name)) {
    console.error(`❌ ${skill.name} not mentioned in app/187repo/page.tsx`);
    errors++;
  }
}

if (errors) {
  console.error(`\n${errors} showcase sync error(s)`);
  process.exit(1);
}

console.log("✅ Showcase sync check passed");
