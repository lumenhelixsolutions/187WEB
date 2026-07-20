# 187WEB Command Grammar

**187WEB** — *A killer AI-powered web suite: spin sharper sites, ship smarter systems.*

This doc defines the grammar shared by the slash command surface and the CLI.

## Slash grammar

```text
/187 <alias|command> [target] [mode] [depth]
```

Use the leading slash inside chat, agent prompts, and any web UI that exposes the 187WEB command surface.

## CLI grammar

```text
187 <alias|command> [target] [mode] [depth]
```

The CLI form drops the leading slash. Every alias and every mode/depth token behaves the same way in both forms.

## Tokens

| Token | Required | Description |
|---|---|---|
| `187` / `/187` | yes | The command prefix. |
| `<alias\|command>` | yes | Short name that resolves to a skill, selector, module, or pack via `config/187-aliases.json` and `config/187-command-reference.json`. |
| `[target]` | no | The page, file, URL, question, or component to operate on. |
| `[mode]` | no | How the skill should coordinate. Defaults to `solo`. |
| `[depth]` | no | How detailed the output should be. Defaults to `brief`. |

## Modes

| Mode | Description | Default |
|---|---|---|
| **solo** | One skill handles the whole request. | yes |
| **assist** | Primary skill owns the work; may ask another skill for a second opinion. | |
| **flow** | Skills chain in a predefined order; each step hands off cleanly to the next. | |
| **release** | Full publish gate: 187PUBLISH coordinates 187VERSION, 187DOCS, 187SEO, 187ACCESS+, and 187INCLUDE. | |

## Depths

| Depth | Description | Default |
|---|---|---|
| **brief** | Quick answer, decision, or pointer. | yes |
| **report** | Structured findings with context, recommendations, and next actions. | |
| **deep** | Full exploration with alternatives, evidence, and implementation detail. | |

## Examples

```text
/187 rpt this
/187 seo landing
/187 ch competitors
/187 sci claim table
/187 crate release packet
/187 install research-lab
187 craft hero assist report
187 seo audit brief
187 publish release deep
```

## See also

- [187WEB Slash Command Reference](187-COMMANDS.md)
- [187WEB Autocomplete](187-AUTOCOMPLETE.md)
- [187WEB Short-Name Reference](187-NAMES.md)
- [187WEB Modules](187-MODULES.md)
