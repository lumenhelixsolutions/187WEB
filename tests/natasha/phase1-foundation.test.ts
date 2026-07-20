/**
 * Phase 1 foundation tests — NATASHA identity, deprecation routers, reserved names allowlist.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(__dirname, "../..");

function read(rel: string) {
  return fs.readFileSync(path.join(root, rel), "utf8");
}

function exists(rel: string) {
  return fs.existsSync(path.join(root, rel));
}

describe("NATASHA Phase 1 foundation", () => {
  it("ecosystem skill is v3 NATASHA Integration", () => {
    const sk = read(".claude/skills/187web-ecosystem/SKILL.md");
    expect(sk).toMatch(/skill_version:\s*3\.0\.0/);
    expect(sk).toMatch(/NATASHA/i);
    expect(sk).toMatch(/THREAD/);
    expect(sk).toMatch(/SCOUT/);
    expect(sk).toMatch(/TENSION/);
    expect(sk).toMatch(/COMPRESS/);
    expect(sk).toMatch(/SPARK/);
    // Active operator must not be Charlotte
    expect(sk).not.toMatch(/organized around\s+\*\*Charlotte\*\*/i);
    expect(sk).toMatch(/natasha-scout/);
    expect(sk).toMatch(/neuro-tension/);
  });

  it("agent-charlotte is a deprecation router to natasha-scout", () => {
    const sk = read(".claude/skills/agent-charlotte/SKILL.md");
    expect(sk).toMatch(/status:\s*deprecated/);
    expect(sk).toMatch(/deprecated:\s*true/);
    expect(sk).toMatch(/natasha-scout/);
    expect(sk).toMatch(/DEPRECATED/i);
  });

  it("neuro-toxin is a deprecation router to neuro-tension", () => {
    const sk = read(".claude/skills/neuro-toxin/SKILL.md");
    expect(sk).toMatch(/status:\s*deprecated/);
    expect(sk).toMatch(/deprecated:\s*true/);
    expect(sk).toMatch(/neuro-tension/);
  });

  it("replacement skills exist and are active", () => {
    for (const id of [
      "natasha-scout",
      "neuro-tension",
      "token-web",
      "idea-spark",
    ]) {
      const sk = read(`.claude/skills/${id}/SKILL.md`);
      expect(sk).toMatch(/status:\s*active/);
      expect(sk).toMatch(new RegExp(`name:\\s*${id}`));
    }
  });

  it("migration document exists with alias table", () => {
    const doc = read("docs/migrations/CHARLOTTE-TO-NATASHA.md");
    expect(doc).toMatch(/NATASHA/);
    expect(doc).toMatch(/agent-charlotte/);
    expect(doc).toMatch(/natasha-scout/);
    expect(doc).toMatch(/compatibility window/i);
  });

  it("reserved-names allowlist and checker exist", () => {
    expect(exists("config/reserved-names-allowlist.json")).toBe(true);
    expect(exists("scripts/check-reserved-names.mjs")).toBe(true);
    const allow = JSON.parse(
      read("config/reserved-names-allowlist.json"),
    ) as { transitional_paths?: string[] };
    expect(Array.isArray(allow.transitional_paths)).toBe(true);
  });

  it("natasha-scout forbids fingerprint spoofing and auth bypass", () => {
    const sk = read(".claude/skills/natasha-scout/SKILL.md");
    expect(sk.toLowerCase()).toMatch(/fingerprint/);
    expect(sk).toMatch(/No authentication bypass|no authentication bypass/i);
    expect(sk).not.toMatch(/spoof Canvas\/WebGL fingerprints to reduce bot/i);
  });
});
