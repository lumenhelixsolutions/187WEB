#!/usr/bin/env bash
# 187repo.sh — Short-name orchestration menu for the 187web ecosystem.
# Usage: ./187repo.sh [repo|craft|vibe|launch|full|power|init|package|help]
set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SKILL_DIR="$REPO_DIR/.claude/skills"

show_help() {
  cat <<'EOF'
🔪 187REPO — Short-name orchestration

Commands:
  repo      → Show 187REPO orchestrator skill
  craft     → Show 187CRAFT design skill
  vibe      → Show 187VIBE delight skill
  launch    → Show 187LAUNCH go-to-market skill
  full      → Show all four short-name skills
  power     → Run GitHub surgical strike (requires GITHUB_PAT)
  init      → Generate a local scaffold
  package   → Zip the skill library for distribution
  help      → Show this reference

Examples:
  ./187repo.sh power my-app --web
  ./187repo.sh init --cli ./my-cli
EOF
}

print_skill() {
  local name="$1"
  local file="$SKILL_DIR/$name/SKILL.md"
  if [[ ! -f "$file" ]]; then
    echo "❌ Skill not found: $file" >&2
    exit 1
  fi
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  cat "$file"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
}

package_skills() {
  local out="$REPO_DIR/187web-skills.zip"
  rm -f "$out"
  (cd "$REPO_DIR" && zip -r "$out" .claude/skills -x "*.git*" -x "*.zip" -x "node_modules/*")
  echo "✅ Packaged skills to $out"
}

cmd="${1:-}"
shift || true

case "$cmd" in
  help|--help|-h|"")
    show_help
    ;;
  repo|--repo)
    print_skill 187repo
    ;;
  craft|--craft)
    print_skill 187craft
    ;;
  vibe|--vibe)
    print_skill 187vibe
    ;;
  launch|--launch)
    print_skill 187launch
    ;;
  full|--full)
    for s in 187repo 187craft 187vibe 187launch; do
      print_skill "$s"
    done
    ;;
  power|--power)
    "$REPO_DIR/scripts/187power.sh" "$@"
    ;;
  init|--init)
    "$REPO_DIR/scripts/187init.sh" "$@"
    ;;
  package|--package)
    package_skills
    ;;
  *)
    echo "❌ Unknown command: $cmd" >&2
    show_help >&2
    exit 1
    ;;
esac
