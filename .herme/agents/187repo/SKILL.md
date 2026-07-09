---
name: 187repo
description: >-
  Use when generating a new repository, deploying to GitHub, creating an installer site, or routing the 187SKILLS suite.
model_adapter: hermes
---

> **Hermes adapter:** Use `system.md` as the system message for Hermes-based local LLMs (Ollama, lm-studio, etc.). Source: [`../../.claude/skills/187repo/SKILL.md`](../../.claude/skills/187repo/SKILL.md).

# 187REPO — Short-Name Orchestrator

**Suite:** Short-name entry point for the mature 187web ecosystem. Canonical
skills: [`187web-ecosystem`](../187web-ecosystem/SKILL.md) (Charlotte v2
orchestration) · [`187web-manifest`](../187web-manifest/SKILL.md) (manifest
compiler + 27 prompts).

Think of `187repo` as the fast alias. It does not replace the existing skills;
it loads them and adds repo-generation, deployment, and installer conventions.

## When to use this

- User says "187", "187repo", "generate repo", "deploy to GitHub", "viral repo",
  "GitHub Pages", or "installer".
- You need the 7 archetype scaffolds.
- You are running Power Mode (GitHub API surgical strike).

## Short-name map

| Short name | Mature skill(s) it delegates to | Role |
|---|---|---|
| `187repo` | `187web-ecosystem` + `187web-manifest` | Orchestration, compiler, deployment |
| `187craft` | `187webdesign` + 187webdev-* suite | Design, UX, frontend, QA |
| `187vibe` | `agent-charlotte`, `widow-weaver`, `neuro-toxin`, `swarm-mind`, `silk-sandbox` | Delight, community, tuning, execution |
| `187launch` | `187launch` | Go-to-market intelligence |
| `187free` | `187free` | No-cost / open-source / local-first stacks |
| `187research` | `187research` | Source-backed research and reproducible labs |
| `187seo` | `187seo` | Ethical SEO and search visibility |
| `187revenue` | `187revenue` | Ethical revenue systems |
| `187docs` | `187docs` + `187write` | Documentation architecture and writing |
| `187learn` | `187learn` + `187test` | Courses, lessons, quizzes, surveys |
| `187test` | `187test` | Knowledge checks and rubrics |
| `187access-plus` | `187access-plus` + `187include` | Accessibility and inclusion review |
| `187include` | `187include` | Identity-safe language and forms |
| `187version` | `187version` | Versioning, changelogs, releases |
| `187publish` | `187publish` | Final docs/showcase/adapter sync |

## The 7 archetypes

| Flag | Stack | Owned by |
|---|---|---|
| `--cli` | Go single-file binary | `187repo` scaffold |
| `--agent` | Python FastAPI + RAG | `187vibe` + `187craft` |
| `--kv` | ~150-line Node.js DB engine | `187repo` scaffold |
| `--edge` | Node.js/Fastify middleware | `187repo` scaffold |
| `--ui` | Headless React primitives | `187craft` |
| `--full` | Next.js + tRPC + Prisma monorepo | `187repo` + `187craft` |
| `--web` | Next.js 15 + Tailwind award site | `187craft` + `187webdesign` |

## Power Mode (GitHub surgical strike)

1. Export `GITHUB_PAT` (fine-grained token with `repo` and `pages` scope).
2. Run `scripts/187power.sh <repo-name> [--cli|--agent|--kv|--edge|--ui|--full|--web]`.
3. The script creates the repo, pushes the scaffold, injects 20 topics, and
   enables Pages.
4. **Manually upload the Social Preview (OG image)** — the GitHub API cannot do
   this.

## Installer site

This repo already hosts an installer at [`/install`](../../../app/install/page.tsx)
and cross-platform installers at [`install.sh`](../../../install.sh) /
[`install.ps1`](../../../install.ps1).

## Slash commands

| Command | Action |
|---|---|
| `/187 help` | Show this reference |
| `/187 init` | Start scaffold generation |
| `/187 cli` / `/187 agent` / `/187 kv` / `/187 edge` / `/187 ui` / `/187 full` / `/187 web` | Generate archetype |
| `/187 power` | Deploy to GitHub (Power Mode) |
| `/187 installer` | Open/generate installer page |
| `/187 free` | No-cost stack scouting |
| `/187 research` | Source-backed research plan |
| `/187 seo` | SEO / AEO / GEO audit |
| `/187 revenue` | Ethical revenue architecture |
| `/187 docs` | Documentation system |
| `/187 learn` | Course / learning path |
| `/187 test` | Quiz / survey / rubric |
| `/187 access` | Accessibility + inclusion review |
| `/187 version` | Version bump + changelog |
| `/187 publish` | Release sync gate |

## Tone

Direct, authoritative, surgical. No filler. Ready-to-run code.

