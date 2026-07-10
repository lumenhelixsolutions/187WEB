# 187WEB CLI Selector

**187WEB** — *A killer AI-powered web suite: spin sharper sites, ship smarter systems.*

The selector commands form the interactive front door of the CLI. Each selector is a small, focused tool that helps the user discover, choose, validate, install, or manage 187WEB capabilities.

## Selector commands

| Selector | Alias | ID | Purpose |
|---|---|---|---|
| `187menu` | `menu` | `187menu` | Open the interactive tool breakdown. |
| `187select` | `sel` | `187select` | Select skills, agents, abilities, or packs. |
| `187auto` | `ac` | `187auto` | Autocomplete and command suggestions. |
| `187preflight` | `pre` | `187preflight` | Run install/onboarding preflight. |
| `187cap` | `cap` | `187cap` | Detect local capabilities and missing runtimes. |
| `187pack` | `pack` | `187pack` | Explain or install a curated pack. |
| `187vault` | `vault` | `187vault` | Open Local Brain Kit commands. |

## 187menu / menu

Opens the top-level interactive menu. From here the user can navigate to any skill, module, selector, or pack without memorizing aliases.

```text
/187 menu
187 menu
```

## 187select / sel

Presents a filtered list of installable or runnable items. Use it when the user knows the domain but not the exact alias.

```text
/187 sel skills
/187 sel agents
/187 sel packs
187 sel research-lab
```

## 187auto / ac

Runs the autocomplete engine. It can be invoked interactively or programmatically.

```text
/187 ac
187 complete --line "/187 se" --cursor 7 --json
```

See [docs/187-AUTOCOMPLETE.md](187-AUTOCOMPLETE.md) for completion rules and candidate sources.

## 187preflight / pre

Checks prerequisites before installing a skill, pack, or runtime. Reports missing dependencies, version mismatches, and recommended next steps.

```text
/187 pre
187 pre install local-brain
```

## 187cap / cap

Detects what the local machine can already do: Node, Python, Git, Docker, Obsidian, CUDA, etc. Also surfaces missing capabilities that would block a pack.

```text
/187 cap
187 cap --json
```

## 187pack / pack

Explains or installs a curated pack. A pack is a bundle of skills, agents, abilities, templates, and configuration scoped to a workflow.

```text
/187 pack research-lab
/187 pack local-brain
/187 install research-lab
```

See [docs/187-INSTALL-PROFILES.md](187-INSTALL-PROFILES.md) for the install profile catalog.

## 187vault / vault

Opens the Local Brain Kit surface. It manages Obsidian vaults, templates, reports, and bridge files.

```text
/187 vault
187 vault init
187 vault sync
187 vault templates
187 vault report
```

## Example flows

### Onboarding a new workspace

```text
187 cap              # detect local capabilities
187 pre              # run preflight
187 pack core-suite  # install the core suite
187 doctor           # verify health
```

### Setting up research work

```text
187 sel packs              # choose a pack
187 install research-lab   # install research-lab pack
187 sci claim brief        # start using a research tool
```

### Local brain setup

```text
187 pre install local-brain
187 install local-brain
187 vault init
187 vault templates
```

## See also

- [187WEB Autocomplete](187-AUTOCOMPLETE.md)
- [187WEB Install Profiles](187-INSTALL-PROFILES.md)
- [187WEB Slash Command Reference](187-COMMANDS.md)
