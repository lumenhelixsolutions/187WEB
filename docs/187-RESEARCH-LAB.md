# 187WEB Research Lab Stack

The research-lab layer of the `/187` command surface: scientific standards, public data and API workflows, notebooks, Colab/GAP execution profiles, reproducibility, and release packaging.

Command registry: [`187-COMMANDS.md`](./187-COMMANDS.md) (`research-lab` section) · Skill: [`187RESEARCH`](./187RESEARCH.md) · Source: [`.claude/skills/187research`](../.claude/skills/187research/SKILL.md)

## Stack

| Layer | Command | Role |
|---|---|---|
| `187RESEARCH` | `/187 res` | Source maps and evidence collection (core) |
| `187SCI` | `/187 sci` | Scientific claim discipline and release gates |
| `187LABS` | `/187 labs` | Experiment protocols, lab templates, run logs |
| `187DATA` | `/187 data` | Dataset cards, schemas, public DB workflows |
| `187API` | `/187 api` | OpenAPI, public API routes, endpoint contracts |
| `187BENCH` | `/187 bench` | Benchmarks, evals, reproducibility tests |
| `187NB` | `/187 nb` | Notebook protocol and release checks |
| `187COLAB` | `/187 colab` | Google Colab execution profiles and templates |
| `187GAP` | `/187 gap` | GAP computational algebra workflows |
| `187META` | `/187 meta` | Metadata, citation, software/dataset identity |
| `187PROV` | `/187 prov` | Provenance, run lineage, source-to-result trace |
| `187CRATE` | `/187 crate` | RO-Crate and Research Release Packet packaging |
| `RRP` | `/187 rrp` | Create a Research Release Packet |

All entries above `187RESEARCH` carry the `research` status in [`config/187-command-reference.json`](../config/187-command-reference.json).

## Claim taxonomy

`/187 sci` labels every claim before release:

```text
proved      formal or exhaustive verification
measured    directly observed in a benchmark or experiment
modeled     produced by a stated model with stated assumptions
inferred    derived from measured/modeled results
inherited   sourced from cited external work
speculative flagged as untested
```

## Research Release Packet

`/187 crate` and `/187 rrp` package a release as:

```text
research-release-packet/
├─ README.md
├─ CLAIMS.md
├─ NON-CLAIMS.md
├─ METHODS.md
├─ SOURCES.md
├─ DATASET-CARD.md
├─ API.md
├─ openapi.yaml
├─ RUN-MANIFEST.md
├─ BENCHMARKS.md
├─ ENVIRONMENT.md
├─ CITATION.cff
├─ codemeta.json
├─ ro-crate-metadata.json
├─ spdx.json
├─ notebooks/
├─ gap/
├─ data/
├─ results/
└─ figures/
```

Every packet ships `CLAIMS.md` and `NON-CLAIMS.md` together: what the release asserts, and what it explicitly does not.
