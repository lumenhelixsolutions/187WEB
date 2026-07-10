# 187WEB Slash Command Reference

**187WEB** — *A killer AI-powered web suite: spin sharper sites, ship smarter systems.*

This is the canonical reference for every slash command in the 187WEB surface.

## Command grammar

```text
/187 <alias|command> [target] [mode] [depth]
```

- **`<alias|command>`** — required short name that resolves to a skill, selector, module, or pack.
- **`[target]`** — optional page, file, URL, question, or component to operate on.
- **`[mode]`** — optional coordination style: `solo`, `assist`, `flow`, `release`.
- **`[depth]`** — optional output detail: `brief`, `report`, `deep`.

The same grammar works in the CLI without the leading slash. See [docs/187-COMMAND-GRAMMAR.md](187-COMMAND-GRAMMAR.md) for full grammar rules and [docs/187-AUTOCOMPLETE.md](187-AUTOCOMPLETE.md) for completion behavior.

## Commands by category

### front-door

| Command | Alias | Status | Purpose |
|---|---|---|---|
| `/187` | `187` | core | Open the universal 187WEB command surface. |
| `/187 help` | `help` | core | Show help and command examples. |
| `/187 menu` | `menu` | selector | Open the interactive tool breakdown. |
| `/187 sel` | `sel` | selector | Select skills, agents, abilities, or packs. |
| `/187 ac` | `ac` | selector | Autocomplete and command suggestions. |
| `/187 complete --line "..."` | `complete` | selector | Return registry-driven completion candidates. |
| `/187 pre` | `pre` | selector | Run install/onboarding preflight. |
| `/187 cap` | `cap` | selector | Detect local capabilities and missing runtimes. |
| `/187 pack <name>` | `pack` | selector | Explain or install a curated pack. |
| `/187 install <alias\|pack>` | `install` | selector | Install one skill, agent, ability, or pack after an install plan. |
| `/187 explain <alias>` | `explain` | core | Explain a skill, alias, or pack. |
| `/187 doctor` | `doctor` | selector | Check repo, CLI, docs, adapters, and capability health. |

### control-plane

| Command | Alias | Status | Purpose |
|---|---|---|---|
| `/187 cmd` | `cmd` | core | Route ambiguous or universal requests. |
| `/187 rpt` | `rpt` | core | Create a compact report or approval artifact. |
| `/187 scan` | `scan` | core | Inspect a repo, page, app, docs set, or external surface. |
| `/187 kit` | `kit` | core | Use templates, prefab demos, patterns, and module kits. |
| `/187 std` | `std` | core | Score against 187WEB quality standards. |
| `/187 flow` | `flow` | core | Turn a goal into a scoped workflow. |
| `/187 kern` | `kern` | core | Show the shared lifecycle contract. |

### core-suite

| Command | Alias | Status | Purpose |
|---|---|---|---|
| `/187 repo` | `repo` | core | Repo generation, installers, deployment, orchestration. |
| `/187 craft` | `craft` | core | Design, UX, frontend, components, polish. |
| `/187 vibe` | `vibe` | core | Onboarding, retention, delight, community UX. |
| `/187 ship` | `ship` | core | Launch strategy, campaign planning, outreach. |
| `/187 free` | `free` | core | Free-tier and open-source solution planning. |
| `/187 res` | `res` | core | Research, source maps, evidence collection. |
| `/187 seo` | `seo` | core | Search visibility, metadata, content readiness. |
| `/187 rev` | `rev` | core | Pricing, revenue ops, affiliate/coupon/commerce workflows. |
| `/187 docs` | `docs` | core | README, SOP, API docs, implementation docs. |
| `/187 write` | `write` | core | Copywriting, editing, plain language, content structure. |
| `/187 learn` | `learn` | core | Courses, lessons, study paths, education flows. |
| `/187 test` | `test` | core | Tests, quizzes, surveys, rubrics, checks. |
| `/187 ax` | `ax` | core | Accessibility, disability access, inclusive UX. |
| `/187 inc` | `inc` | core | Inclusive language, identity-safe copy, pronoun-aware UX. |
| `/187 ver` | `ver` | core | SemVer, changelog, release notes, migration notes. |
| `/187 pub` | `pub` | core | Sync docs, demo, README, adapters, public launch surface. |

### modules

| Command | Alias | Status | Purpose |
|---|---|---|---|
| `/187 th` | `th` | module | Intent extraction, prompt shaping, rewrite/refactor. |
| `/187 tu` | `tu` | module | Output profile, model behavior, inference tuning. |
| `/187 co` | `co` | module | Role dispatch, expert/subagent routing. |
| `/187 ch` | `ch` | module | Charlotte scout with compact Q&A before context/source scouting. |
| `/187 lb` | `lb` | module | Local action box for tests, commands, isolated runs. |

### research-lab

Stack overview, claim taxonomy, and Research Release Packet layout: [`187-RESEARCH-LAB.md`](./187-RESEARCH-LAB.md)

| Command | Alias | Status | Purpose |
|---|---|---|---|
| `/187 sci` | `sci` | research | Scientific claim discipline and release gates. |
| `/187 labs` | `labs` | research | Experiment protocols, lab templates, run logs. |
| `/187 data` | `data` | research | Dataset cards, schemas, public DB workflows. |
| `/187 api` | `api` | research | OpenAPI, public API routes, endpoint contracts. |
| `/187 bench` | `bench` | research | Benchmarks, evals, reproducibility tests. |
| `/187 nb` | `nb` | research | Notebook protocol and release checks. |
| `/187 colab` | `colab` | research | Google Colab execution profiles and notebook templates. |
| `/187 gap` | `gap` | research | GAP computational algebra workflows. |
| `/187 meta` | `meta` | research | Metadata, citation, software/dataset identity. |
| `/187 prov` | `prov` | research | Provenance, run lineage, source-to-result trace. |
| `/187 crate` | `crate` | research | RO-Crate and Research Release Packet packaging. |
| `/187 rrp` | `rrp` | research | Create a Research Release Packet. |

### local-brain

| Command | Alias | Status | Purpose |
|---|---|---|---|
| `/187 vault` | `vault` | optional-pack | Open Local Brain Kit commands. |
| `/187 vault init` | `vault init` | optional-pack | Create a starter Obsidian vault. |
| `/187 vault sync` | `vault sync` | optional-pack | Sync templates, reports, docs, and bridge files. |
| `/187 vault templates` | `vault templates` | optional-pack | List/copy Obsidian templates. |
| `/187 vault report` | `vault report` | optional-pack | Create a vault health/context report. |

### legacy

| Command | Alias | Status | Purpose |
|---|---|---|---|
| `/187 widow-weaver` | `widow-weaver` | legacy | Legacy route to THREAD. |
| `/187 neuro-toxin` | `neuro-toxin` | legacy | Legacy route to TUNE. |
| `/187 swarm-mind` | `swarm-mind` | legacy | Legacy route to CORD. |
| `/187 agent-charlotte` | `agent-charlotte` | legacy | Legacy route to CHAR. |
| `/187 silk-sandbox` | `silk-sandbox` | legacy | Legacy route to LAB. |

## Examples

```text
/187 rpt this
/187 seo landing
/187 ch competitors
/187 sci claim table
/187 crate release packet
/187 install research-lab
/187 craft hero assist report
/187 seo audit brief
/187 publish release deep
```

## See also

- [187WEB Command Grammar](187-COMMAND-GRAMMAR.md)
- [187WEB Autocomplete](187-AUTOCOMPLETE.md)
- [187WEB Short-Name Reference](187-NAMES.md)
- [187WEB Modules](187-MODULES.md)
- [187SKILLS — Operating Layer](187SKILLS.md)
