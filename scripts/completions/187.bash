# scripts/completions/187.bash — bash completion for the 187WEB CLI.
# Source this file or install it to a bash completion directory.

_187_complete() {
  local repo_dir
  repo_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

  local candidates
  candidates=$("$repo_dir/scripts/187-complete.mjs" --line "$COMP_LINE" --cursor "$COMP_POINT" 2>/dev/null)
  if [[ -z "$candidates" ]]; then
    return
  fi

  mapfile -t COMPREPLY <<< "$candidates"
}

complete -F _187_complete 187
