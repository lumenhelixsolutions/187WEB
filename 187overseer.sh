#!/usr/bin/env bash
# 187overseer.sh
# Pipe the 187 master runbook into K2.7 Code as a Phase-0-only overseer prompt.

set -euo pipefail

RUNBOOK="docs/runbooks/187web_master_overseer_repo_upgrade_runbook.md"
PROMPT_FILE=".187-overseer-session-prompt.txt"
STARTUP_FILE="187-overseer-prompt.txt"
DRY_RUN=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --runbook)
      RUNBOOK="${2:-}"
      shift 2
      ;;
    --dry)
      DRY_RUN=1
      shift
      ;;
    --help|-h)
      cat <<'EOF'
Usage:
  K2_CMD="k2" ./187overseer.sh
  ./187overseer.sh --dry
  K2_CMD="your-k27-command" ./187overseer.sh --runbook docs/runbooks/187web_master_overseer_repo_upgrade_runbook.md

Environment:
  K2_CMD   Command used to start K2.7 Code with stdin support.
EOF
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      exit 1
      ;;
  esac
done

if [[ ! -f "$RUNBOOK" ]]; then
  echo "Runbook not found: $RUNBOOK" >&2
  echo "Expected path: docs/runbooks/187web_master_overseer_repo_upgrade_runbook.md" >&2
  exit 1
fi

if [[ ! -f "$STARTUP_FILE" ]]; then
  cat > "$STARTUP_FILE" <<'EOF'
You are running inside K2.7 Code.

Act as 187OVERSEER for this repo.

Use the 187KERNEL behavior:
Detect → Read → Interpret → Report → Plan → Act within approved scope → Verify → Handoff → Log.

Default autonomy is L1 READ_ONLY_REPORT.

Human-in-the-loop means scoped consent and meaningful review, not micromanagement.

Use risk-triggered gates:
- baseline clarity, consent, accessibility awareness, inclusion awareness, privacy awareness, docs/version awareness always apply
- deep gates activate only when the surface or risk requires them

Start Phase 0 only.

Do not create, edit, delete, move, commit, push, publish, deploy, or send anything yet.

Produce:
1. docs/reports/187report-master-overseer-upgrade.md content
2. docs/audits/187skills-master-overseer-audit.md content
3. a short approval menu for Phase 1, Phase 2, and Phase 3

Stop after the Phase 0 report and wait for approval.

Below is the master runbook to read and follow.

--- BEGIN 187 MASTER RUNBOOK ---
EOF
fi

{
  cat "$STARTUP_FILE"
  printf '\n\n'
  cat "$RUNBOOK"
  printf '\n\n--- END 187 MASTER RUNBOOK ---\n'
} > "$PROMPT_FILE"

echo "Created prompt: $PROMPT_FILE"

if [[ "$DRY_RUN" -eq 1 ]]; then
  echo "Dry run complete. Drop $PROMPT_FILE into K2.7 Code."
  exit 0
fi

if [[ -z "${K2_CMD:-}" ]]; then
  echo "K2_CMD is not set."
  echo "Set it like:"
  echo '  K2_CMD="k2" ./187overseer.sh'
  echo "Or run:"
  echo "  ./187overseer.sh --dry"
  exit 1
fi

echo "Piping $PROMPT_FILE into: $K2_CMD"
# shellcheck disable=SC2086
$K2_CMD < "$PROMPT_FILE"
