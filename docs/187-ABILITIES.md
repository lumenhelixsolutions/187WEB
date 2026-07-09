# 187WEB Abilities Index

**187WEB** — *A killer AI-powered web suite: spin sharper sites, ship smarter systems.*

This index maps high-level abilities to the slash commands, app routes, and documentation that implement them.

## Abilities

| Ability | Commands | App route | Docs |
|---|---|---|---|
| **Slash command surface** | `/187 <alias\|command> [target] [mode] [depth]` | `/187` | [187-COMMANDS.md](187-COMMANDS.md), [187-COMMAND-GRAMMAR.md](187-COMMAND-GRAMMAR.md) |
| **Skill showcases** | `/187 craft`, `/187 seo`, `/187 repo`, `/187 learn`, `/187 test`, etc. | `/187demo`, `/187ai-eye` | [187SKILLS.md](187SKILLS.md) |
| **Templates and kits** | `/187 kit`, `/187 pack <name>` | `/templates`, `/187kit` | [187-MODULES.md](187-MODULES.md), [187-INSTALL-PROFILES.md](187-INSTALL-PROFILES.md) |
| **Resilience states** | `loading.tsx`, `error.tsx`, `not-found.tsx` | `/resilience` | [ROUTING.md](ROUTING.md) |
| **Install flow** | `/187 install`, `/187 pre`, `/187 pack`, `/187 cap` | `/install` | [INSTALL.md](INSTALL.md), [187-INSTALL-PROFILES.md](187-INSTALL-PROFILES.md) |
| **Research lab tools** | `/187 sci`, `/187 labs`, `/187 data`, `/187 bench`, `/187 rrp` | `/187research` | [187RESEARCH.md](187RESEARCH.md) |

## Slash commands

The universal command surface covers every skill, selector, module, and pack. Start at `/187` or see the full reference in [docs/187-COMMANDS.md](187-COMMANDS.md).

## Skill showcases

Each core skill has a dedicated route or shared demo surface:

| Skill | Route | Docs |
|---|---|---|
| 187REPO | `/187repo` | [187SKILLS.md](187SKILLS.md), repo runbooks |
| 187CRAFT | `/187demo` | [187SKILLS.md](187SKILLS.md) |
| 187VIBE | `/187demo` | [187SKILLS.md](187SKILLS.md) |
| 187LAUNCH | `/187publish` | [187PUBLISH.md](187PUBLISH.md) |
| 187FREE | `/187free` | [187FREE.md](187FREE.md) |
| 187RESEARCH | `/187research` | [187RESEARCH.md](187RESEARCH.md) |
| 187SEO | `/187seo` | [187SEO.md](187SEO.md) |
| 187REVENUE | `/187revenue` | [187REVENUE.md](187REVENUE.md) |
| 187DOCS | `/187docs` | [187DOCS.md](187DOCS.md) |
| 187WRITE | `/187docs` | [187WRITE.md](187WRITE.md) |
| 187LEARN | `/187learn` | [187LEARN.md](187LEARN.md) |
| 187TEST | `/187test` | [187TEST.md](187TEST.md) |
| 187ACCESS+ | `/187access` | [187ACCESS.md](187ACCESS.md) |
| 187INCLUDE | `/187access` | [187INCLUDE.md](187INCLUDE.md) |
| 187VERSION | `/187version` | [187VERSION.md](187VERSION.md) |
| 187PUBLISH | `/187publish` | [187PUBLISH.md](187PUBLISH.md) |

## Templates

The template system is surfaced through `/187 kit` and the `/templates` route. Kits include prefab demos, design tokens, module scaffolds, and pre-ship checklists. See [docs/187-MODULES.md](187-MODULES.md) for module kits and [docs/187-INSTALL-PROFILES.md](187-INSTALL-PROFILES.md) for pack-level template bundles.

## Resilience states

The `/resilience` route demonstrates loading, empty, error, and offline states. These states are part of the 187WEB resilience design system and are wired into `loading.tsx`, `error.tsx`, and `not-found.tsx` at the app root.

## Install flow

The install flow begins at `/install` and is driven by `/187 pre`, `/187 cap`, `/187 pack`, and `/187 install`. See [docs/INSTALL.md](INSTALL.md) for the full installation guide and [docs/187-INSTALL-PROFILES.md](187-INSTALL-PROFILES.md) for available profiles.

## Research lab tools

The research-lab ability provides scientific claim discipline, dataset cards, benchmarks, notebook protocols, provenance, and research release packaging. It is surfaced at `/187research` and through commands such as `/187 sci`, `/187 labs`, `/187 data`, `/187 bench`, and `/187 rrp`.

## See also

- [187WEB Slash Command Reference](187-COMMANDS.md)
- [187WEB Command Grammar](187-COMMAND-GRAMMAR.md)
- [187WEB Autocomplete](187-AUTOCOMPLETE.md)
- [187WEB CLI Selector](187-CLI-SELECTOR.md)
- [187WEB Install Profiles](187-INSTALL-PROFILES.md)
- [187WEB Modules](187-MODULES.md)
- [187SKILLS — Operating Layer](187SKILLS.md)
