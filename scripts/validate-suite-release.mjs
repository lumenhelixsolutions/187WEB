#!/usr/bin/env node
/**
 * Verify that every first-class 187SKILLS member is represented in the
 * mandatory public surfaces listed by docs/runbooks/187web_master_repo_evolution_sprint.md.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { projectRoot, FIRST_CLASS_SKILLS } from "./lib/suite-constants.mjs";

const root = fileURLToPath(projectRoot());

const surfaces = [
  { file: "README.md", label: "README" },
  { file: "AGENTS.md", label: "AGENTS" },
  { file: "CHANGELOG.md", label: "CHANGELOG" },
  { file: "docs/INSTALL.md", label: "INSTALL docs" },
  { file: "docs/MODEL-ADAPTERS.md", label: "MODEL-ADAPTERS" },
  { file: "docs/ROUTING.md", label: "ROUTING" },
  { file: "app/page.tsx", label: "home page" },
  { file: "app/187/page.tsx", label: "187 command reference" },
  { file: ".claude/skills/187web-ecosystem/SKILL.md", label: "ecosystem skill" },
  { file: ".claude/skills/187web-manifest/SKILL.md", label: "manifest skill" },
];

const contents = Object.fromEntries(
  surfaces.map((s) => {
    try {
      return [s.label, readFileSync(join(root, s.file), "utf8")];
    } catch {
      return [s.label, ""];
    }
  })
);

let errors = 0;

for (const skill of FIRST_CLASS_SKILLS) {
  for (const [label, text] of Object.entries(contents)) {
    if (!text.includes(skill.name)) {
      console.error(`❌ ${skill.name} missing from ${label}`);
      errors++;
    }
  }
}

if (errors) {
  console.error(`\n${errors} release sync error(s)`);
  process.exit(1);
}

console.log("✅ All first-class skills present in mandatory release surfaces");
