# 187WEB Install Profiles

**187WEB** — *A killer AI-powered web suite: spin sharper sites, ship smarter systems.*

187WEB can install individual skills, agents, abilities, curated packs, or entire capability bundles. Every install follows the same flow: preflight, plan, confirm, install, verify.

## Installable units

| Unit | What it is | Example |
|---|---|---|
| **Skill** | A single capability such as 187SEO, 187CRAFT, or 187DOCS. | `/187 install seo` |
| **Agent** | A persona or subagent with a scoped role card. | `/187 install char` |
| **Ability** | A cross-cutting behavior such as autocomplete, preflight, or vault sync. | `/187 install ac` |
| **Pack** | A curated bundle of skills, agents, abilities, templates, and config for a workflow. | `/187 install research-lab` |

## Install grammar

```text
/187 install <alias|pack>
187 install <alias|pack>
```

- `<alias>` — any alias from `config/187-aliases.json` that resolves to an installable skill, agent, or ability.
- `<pack>` — a named pack such as `core-suite`, `research-lab`, or `local-brain`.

## Examples

```text
/187 install craft
/187 install 187docs
/187 install research-lab
/187 install local-brain
187 install ax
187 install pack local-brain
```

## Curated packs

### research-lab

The `research-lab` pack installs the scientific and reproducibility toolkit:

- `/187 sci` — scientific claim discipline
- `/187 labs` — experiment protocols
- `/187 data` — dataset cards and schemas
- `/187 api` — endpoint contracts
- `/187 bench` — benchmarks and evals
- `/187 nb` — notebook protocol
- `/187 colab` — Colab profiles
- `/187 gap` — GAP algebra workflows
- `/187 meta` — metadata and citation
- `/187 prov` — provenance and lineage
- `/187 crate` / `/187 rrp` — research release packaging

```text
/187 install research-lab
```

### local-brain

The `local-brain` pack installs the Local Brain Kit for Obsidian vault management:

- `/187 vault init` — create a starter vault
- `/187 vault sync` — sync templates, reports, docs, and bridges
- `/187 vault templates` — list/copy templates
- `/187 vault report` — create a vault health/context report

```text
/187 install local-brain
187 vault init
```

## Preflight and verification

Before installing, run preflight to check prerequisites:

```text
/187 pre
/187 pre install research-lab
```

After installing, run the doctor to verify health:

```text
/187 doctor
```

## See also

- [Installation guide](INSTALL.md)
- [187WEB CLI Selector](187-CLI-SELECTOR.md)
- [187WEB Slash Command Reference](187-COMMANDS.md)
- [187SKILLS — Operating Layer](187SKILLS.md)


### natasha

Full NATASHA core + domain skills:

- THREAD, COMPRESS, TENSION, SPARK, CORD, SCOUT, LAB
- 187QUANTUM, 187CHAIN
- Local Brain templates

```text
/187 install natasha
```

### qchain-lab

Narrow quantum + Web3 lab pack:

- 187QUANTUM, 187CHAIN, LAB profiles `lab:quantum` / `lab:evm`

```text
/187 install qchain-lab
```
