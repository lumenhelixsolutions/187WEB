# scripts/completions/187.fish — fish completion for the 187WEB CLI.

function __187_complete
    set -l repo_dir (cd (dirname (status -f))/../..; pwd)
    set -l line (commandline -b)
    set -l cursor (commandline -C)
    "$repo_dir/scripts/187-complete.mjs" --line "$line" --cursor "$cursor" 2>/dev/null
end

complete -c 187 -f -a "(__187_complete)"
