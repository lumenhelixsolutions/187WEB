# scripts/completions/187.zsh — zsh completion for the 187WEB CLI.
# Install by copying to a directory on $fpath, e.g.:
#   cp 187.zsh /usr/local/share/zsh/site-functions/_187

_187_complete() {
  local repo_dir
  repo_dir="$(cd "$(dirname "${(%):-%x}")/../.." && pwd)"

  local -a candidates
  candidates=(${(f)"$("$repo_dir/scripts/187-complete.mjs" --line "$BUFFER" --cursor "$CURSOR" 2>/dev/null)"})

  _describe -t commands "187 commands" candidates
}

compdef _187_complete 187
