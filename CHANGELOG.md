# Changelog

All notable changes to the 187web / 187SKILLS project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-07-06

### Added

- **187SKILLS public suite** — 16 first-class skills and 2 subskills under universal contract v2.0.0:
  187REPO, 187CRAFT, 187VIBE, 187LAUNCH, 187FREE, 187RESEARCH, 187SEO, 187REVENUE,
  187DOCS, 187WRITE, 187LEARN, 187TEST, 187ACCESS+, 187INCLUDE, 187VERSION, 187PUBLISH.
- **Skill validation pipeline** — `scripts/validate-skills.py` enforces the universal skill contract.
- **Release validation** — `scripts/validate-suite-release.mjs` confirms every public skill name appears on required public surfaces.
- **Drift detection** — `scripts/check-docs-drift.mjs`, `scripts/check-adapter-drift.mjs`, and `scripts/check-showcase-sync.mjs` keep docs, adapters, and showcases in sync.
- **Model adapter generator** — `scripts/generate-model-adapters.py` distills canonical skills into Gemini, Kimi, ChatGPT, Ollama, and Hermes formats.
- **Per-skill public docs** — generated `docs/187FREE.md` through `docs/187PUBLISH.md` for each public skill.
- **CI gate** — `.github/workflows/ci.yml` now runs lint, typecheck, build, skill validation, and release validation.

### Changed

- Canonical skills `187repo`, `187craft`, `187vibe`, and `187launch` upgraded to full universal contract v2.0.0.
- `AGENTS.md`, `docs/INSTALL.md`, `docs/MODEL-ADAPTERS.md`, `.claude/skills/187web-ecosystem/SKILL.md`,
  and `.claude/skills/187web-manifest/SKILL.md` now surface the canonical uppercase skill roster.

### Fixed

- Adapter generator root resolution is now portable when run from any working directory.
- Windows console encoding issues in `validate-skills.py` resolved by using ASCII-only status markers.

## [0.1.0] - 2026-06-01

### Added

- Initial 187webdesign Next.js 15 starter with Prisma, Tailwind CSS, and TypeScript strict mode.
- Core `187webdesign` skill and landing-page showcase.
- 187web Ecosystem v2 skills: `187web-ecosystem`, `187web-manifest`, `widow-weaver`, `neuro-toxin`, `swarm-mind`, `agent-charlotte`, `silk-sandbox`.
- 27 manifest prompt skills under `.claude/skills/`.
- Bash and PowerShell installers plus `187repo` short-name orchestration scripts.
