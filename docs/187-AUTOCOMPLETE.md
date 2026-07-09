# 187WEB Autocomplete

**187WEB** — *A killer AI-powered web suite: spin sharper sites, ship smarter systems.*

The `/187` command surface autocompletes before it explains. Typing `/187` followed by a few characters should surface the matching command, alias, or pack without requiring the user to memorize the full table.

## Deterministic completion command

The CLI exposes a deterministic completion endpoint:

```bash
187 complete --line "/187 se" --cursor 7 --json
```

- `--line` — the full input line typed so far.
- `--cursor` — zero-based cursor position in the line.
- `--json` — return candidates as JSON with `alias`, `command`, `status`, and `purpose` fields.

## How candidates are derived

Completion candidates come from two registry files:

1. **`config/187-command-reference.json`** — canonical command table. Each `cmd` and `alias` is indexed for prefix matching.
2. **`config/187-aliases.json`** — alias map. Additional short names (`ui`, `launch`, `sync`, `a11y`, etc.) resolve to the same command IDs and are merged into the candidate list.

The completer:

- Matches the token after `/187` by prefix.
- Returns both the canonical command form and any registered alias.
- Ranks exact alias matches first, then canonical commands, then additional aliases.
- Includes `status` so the UI can badge core, selector, module, research, optional-pack, and legacy candidates differently.

## Examples

Typing `/187 s` returns every registered alias and subcommand that starts with `s`:

```text
scan
sci
search
sel
seo
ship
silk-sandbox
src
std
swarm-mind
sync
```

Core surface matches are shown first by convention in the UI, but the registry returns all prefix matches.

Typing `/187 se` should suggest:

```text
search   /187 seo      core
sel      /187 sel      selector
seo      /187 seo      core
```

Typing `/187 c` returns:

```text
cap
ch
cmd
co
colab
complete
craft
crate
```

Typing `/187 a` returns:

```text
a11y
ac
agent-charlotte
api
ax
```

## CLI selector integration

Autocomplete feeds directly into the selector layer. Use `/187 ac` or `187auto` to open the interactive suggestion pane. See [docs/187-CLI-SELECTOR.md](187-CLI-SELECTOR.md) for the full selector reference.

## See also

- [187WEB CLI Selector](187-CLI-SELECTOR.md)
- [187WEB Slash Command Reference](187-COMMANDS.md)
- [187WEB Command Grammar](187-COMMAND-GRAMMAR.md)
