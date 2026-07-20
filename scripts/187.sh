#!/usr/bin/env bash
# scripts/187.sh — 187WEB CLI entry script.
# Usage: 187 <alias|command> [target] [mode] [depth]
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
ALIASES_FILE="$REPO_DIR/config/187-aliases.json"
REF_FILE="$REPO_DIR/config/187-command-reference.json"

# Convert a Unix path to a Windows path when running under MSYS/Cygwin so that
# a native Windows Python interpreter can open the file.
_187_win_path() {
  local p="$1"
  if command -v cygpath >/dev/null 2>&1; then
    cygpath -w "$p" 2>/dev/null || printf '%s' "$p"
  elif command -v wslpath >/dev/null 2>&1; then
    wslpath -w "$p" 2>/dev/null || printf '%s' "$p"
  else
    printf '%s' "$p"
  fi
}

_187_json_get() {
  local file="$1" expr="$2"
  local val=""
  if command -v jq >/dev/null 2>&1 && [[ -f "$file" ]]; then
    val=$(jq -r "$expr" "$file" 2>/dev/null || true)
  fi
  if [[ -z "$val" ]] && [[ -f "$file" ]]; then
    local win_file
    win_file=$(_187_win_path "$file")
    if command -v python3 >/dev/null 2>&1; then
      val=$(python3 -c "import json,sys; d=json.load(open(r'$win_file')); $expr" 2>/dev/null || true)
    fi
    if [[ -z "$val" ]] && command -v python >/dev/null 2>&1; then
      val=$(python -c "import json,sys; d=json.load(open(r'$win_file')); $expr" 2>/dev/null || true)
    fi
  fi
  # Strip carriage returns that Windows Python may emit.
  val="${val//$'\r'/}"
  printf '%s' "$val"
}

resolve_alias() {
  local key="$1"
  _187_json_get "$ALIASES_FILE" "print(d.get('$key',''))"
}

get_grammar() {
  local grammar
  grammar=$(_187_json_get "$REF_FILE" "print(d.get('cli_grammar') or d.get('grammar',''))")
  [[ -z "$grammar" ]] && grammar="187 <alias|command> [target] [mode] [depth]"
  printf '%s' "$grammar"
}

show_help() {
  local grammar
  grammar=$(get_grammar)
  cat <<EOF
🔪 187WEB CLI

Grammar:
  $grammar

Subcommands:
  help                  Show this help message and command examples.
  menu, sel             Open the interactive selector.
  complete --line "..." --cursor N [--json]
                        Return registry-driven completion candidates.
  cap, doctor           Run capability / health check hint.

Examples:
  187 help
  187 menu
  187 sel
  187 scan ./src report deep
  187 ship my-landing release brief
  187 complete --line "/187 se" --cursor 7 --json

Run '187 menu' for the interactive tool breakdown.
EOF
}

print_menu_hint() {
  echo "🔪 187WEB → selector → run '187 help' to see commands."
}

print_cap_hint() {
  echo "🔪 187WEB → capability check → verify node, git, and jq|python3 are available."
}

run_complete() {
  "$REPO_DIR/scripts/187-complete.mjs" "$@"
}

main() {
  local cmd="${1:-}"
  shift || true

  case "$cmd" in
    ""|help|--help|-h)
      show_help
      ;;
    menu|sel)
      print_menu_hint
      ;;
    complete)
      run_complete "$@"
      ;;
    cap|doctor)
      print_cap_hint
      ;;
    *)
      local resolved
      resolved="$(resolve_alias "$cmd")"
      if [[ -z "$resolved" ]]; then
        echo "❌ Unknown alias/command: $cmd" >&2
        show_help >&2
        exit 1
      fi
      local target="${1:-}"
      local mode="${2:-}"
      local depth="${3:-}"
      echo "187WEB → $resolved → target=$target mode=$mode depth=$depth"
      ;;
  esac
}

main "$@"
