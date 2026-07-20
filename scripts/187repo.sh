#!/usr/bin/env bash
# 187repo.sh — Short-name orchestration menu for the 187SKILLS suite.
# Usage: ./187repo.sh [repo|craft|vibe|launch|free|research|seo|revenue|docs|learn|test|access|version|publish|full|power|init|package|help]
set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SKILL_DIR="$REPO_DIR/.claude/skills"

SKILLS=(187repo 187craft 187vibe 187launch 187free 187research 187seo 187revenue 187docs 187write 187learn 187test 187access-plus 187include 187version 187publish)

show_help() {
  cat <<'EOF'
🔪 187REPO — Short-name orchestration for the 187SKILLS suite

Commands:
  repo       → Show 187REPO orchestrator skill
  craft      → Show 187CRAFT design skill
  vibe       → Show 187VIBE delight skill
  launch     → Show 187LAUNCH go-to-market skill
  free       → Show 187FREE no-cost stack skill
  research   → Show 187RESEARCH source-backed research skill
  seo        → Show 187SEO ethical search skill
  revenue    → Show 187REVENUE ethical revenue skill
  docs       → Show 187DOCS documentation skill
  write      → Show 187WRITE drafting skill (187DOCS subskill)
  learn      → Show 187LEARN learning skill
  test       → Show 187TEST assessment skill
  access     → Show 187ACCESS+ accessibility skill
  include    → Show 187INCLUDE identity-safe language skill
  version    → Show 187VERSION versioning skill
  publish    → Show 187PUBLISH release sync skill
  full       → Show all 16 short-name skills
  power      → Run GitHub surgical strike (requires GITHUB_PAT)
  init       → Generate a local scaffold
  package    → Zip the skill library for distribution
  help       → Show this reference

Examples:
  ./187repo.sh power my-app --web
  ./187repo.sh init --cli ./my-cli
  ./187repo.sh full
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
    for s in "${SKILLS[@]}"; do
      print_skill "$s"
    done
    ;;
  free|--free)
    print_skill 187free
    ;;
  research|--research)
    print_skill 187research
    ;;
  seo|--seo)
    print_skill 187seo
    ;;
  revenue|--revenue)
    print_skill 187revenue
    ;;
  docs|--docs)
    print_skill 187docs
    ;;
  write|--write)
    print_skill 187write
    ;;
  learn|--learn)
    print_skill 187learn
    ;;
  test|--test)
    print_skill 187test
    ;;
  access|--access|access-plus|--access-plus)
    print_skill 187access-plus
    ;;
  include|--include)
    print_skill 187include
    ;;
  version|--version)
    print_skill 187version
    ;;
  publish|--publish)
    print_skill 187publish
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
