# Coding-Agent Target Profiles

The handoff architecture is model-neutral. Adapt only executor mechanics.

## Claude Code
Canonical skills live under `.claude/skills/`. Read repository instructions and skill contracts first. Use branches/worktrees when supported. Keep generated files generated.

## Kimi Code
Preserve the same phases, bounded specialist tasks, file ownership, phase reports, and observed validation.

## Grok coding agents
Treat `.claude/skills/` as canonical and `.grok/skills/` as a generated adapter when generator support exists. Do not create Grok-only architectural drift. Require Phase 0 before implementation.

## Codex and other agents
Read AGENTS and repository instructions. Adapt worktree and tool terminology while preserving branch discipline, bounded context, tests, and evidence.

## Local models
Use COMPRESS packets with explicit token budgets. Prefer sequential roles when parallel agents are unavailable. Record model, quantization, context size, and TENSION profile.
