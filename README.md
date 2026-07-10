<div align="center">

<br>

<img src="public/images/187suite-hero.jpg" alt="187WEB — A killer AI-powered web suite" width="92%" />

<h1>187WEB</h1>
<p><strong>A killer AI-powered web suite: spin sharper sites, ship smarter systems.</strong></p>
<p>An AI-powered suite of web tools to die for.</p>
<p><a href="https://lumenhelixsolutions.github.io/187WEB/">Live Demo</a> · <a href="./docs/187-COMMANDS.md">/187 Commands</a> · <a href="./docs/INSTALL.md">Install</a></p>

</div>

## ◆ Licensing

This repository is available under the terms in [LICENSE](./LICENSE).

- You may use, remix, adapt, build on, and improve the work for noncommercial purposes.
- You may **not** use it commercially without prior written permission from **Lumen Helix Solutions**.
- **Knotstore intellectual property is excluded** from the license grant and remains the sole property of **Lumen Helix Solutions**.

For a plain-English explanation, see [LICENSE-INFO.md](./LICENSE-INFO.md).
For commercial licensing or permission requests, contact **Lumen Helix Solutions**.

## What 187WEB is

187WEB is a standalone-first AI webcraft ecosystem. It gives agentic systems a short command surface for building, documenting, testing, researching, launching, publishing, and maintaining web projects.

The public site is not just a landing page. It is the live showcase for the full 187WEB ecosystem: skills, command routing, selector/onboarding, module array, research lab stack, public data/API workflows, slash command reference, and installation profiles.

Live demo: **https://lumenhelixsolutions.github.io/187WEB/**

## Slash command reference

Canonical grammar:

```text
/187 <alias|command> [target] [mode] [depth]
```

CLI equivalent:

```text
187 <alias|command> [target] [mode] [depth]
```

Examples:

```text
/187 rpt this
/187 seo landing
/187 ch competitors
/187 sci claim table
/187 crate release packet
/187 install research-lab
```

Full reference: [`docs/187-COMMANDS.md`](./docs/187-COMMANDS.md)

## Ecosystem map

187WEB includes the selector/front door, control plane, core suite, Charlotte module array, Research Lab Stack, Local Brain optional pack, KNOTstore agentic memory preview, and a comprehensive `/187` command registry.

### Front door and selector

| Command | ID | Purpose |
|---|---|---|
| `/187` | `187COMMAND` | Universal command surface |
| `/187 menu` | `187MENU` | Interactive tool breakdown |
| `/187 sel` | `187SELECT` | Skill, agent, ability, and pack selection |
| `/187 ac` | `187AUTO` | Autocomplete |
| `/187 pre` | `187PREFLIGHT` | Install/onboarding preflight |
| `/187 cap` | `187CAP` | Capability detection |
| `/187 pack` | `187PACK` | Bundle/profile installer |
| `/187 install` | `187PACK` | Install one thing or the full suite |
| `/187 doctor` | `187CAP` | Health check |

### Core suite

| Alias | Skill | Purpose |
|---|---|---|
| `repo` | `187REPO` | Repo structure, installers, deployment |
| `craft` | `187CRAFT` | Design, UX, frontend |
| `vibe` | `187VIBE` | Onboarding, delight, community UX |
| `ship` | `187LAUNCH` | Launch strategy |
| `free` | `187FREE` | Free-tier architecture |
| `res` | `187RESEARCH` | Source maps and evidence |
| `seo` | `187SEO` | Search visibility |
| `rev` | `187REVENUE` | Offers and monetization |
| `docs` | `187DOCS` | README, docs, SOPs |
| `write` | `187WRITE` | Copy and content |
| `learn` | `187LEARN` | Lessons and education |
| `test` | `187TEST` | QA and rubrics |
| `ax` | `187ACCESS+` | Accessibility |
| `inc` | `187INCLUDE` | Inclusive UX |
| `ver` | `187VERSION` | Changelog and releases |
| `pub` | `187PUBLISH` | Docs/demo/public sync |

### THREAD / TUNE / CORD / CHAR / LAB

| Alias | Module | Purpose |
|---|---|---|
| `th` | `THREAD` | Prompt shaping and intent extraction |
| `tu` | `TUNE` | Output and model behavior profile |
| `co` | `CORD` | Expert role dispatch |
| `ch` | `CHAR` | Charlotte assisted research |
| `lb` | `LAB` | Local action box |

### Research Lab Stack

| Alias | Skill/Profile | Purpose |
|---|---|---|
| `sci` | `187SCI` | Scientific claim discipline |
| `labs` | `187LABS` | Protocols and experiments |
| `data` | `187DATA` | Dataset/public DB workflows |
| `api` | `187API` | OpenAPI and public API contracts |
| `bench` | `187BENCH` | Benchmarks and reproducibility |
| `nb` | `187NB` | Notebook protocol |
| `colab` | `187COLAB` | Google Colab execution profile |
| `gap` | `187GAP` | GAP computational algebra profile |
| `meta` | `187META` | Metadata and citation |
| `prov` | `187PROV` | Provenance and run lineage |
| `crate` | `187CRATE` | RO-Crate and release packets |
| `rrp` | `RRP` | Research Release Packet |

### KNOTstore

`lib/knotstore/` is the pluggable agentic memory layer for the 187WEB ecosystem. It supports SQLite, KNOT-point, and hybrid backends, and ships with a Vault-style preview at `/knotstore`.

## Install/onboarding model

187WEB does not require installing the entire ecosystem. Preflight/onboarding supports one skill, one agent, one module, one ability, one research/tool profile, one pack, or the full suite.

```bash
187 pre
187 cap
187 menu
187 install seo
187 install research-lab
187 doctor
```

## Quick start

```bash
git clone https://github.com/lumenhelixsolutions/187WEB.git
cd 187WEB
npm install
npm run dev
```

## Project structure

```text
187WEB/
├─ app/                         # Next.js App Router
│  ├─ page.tsx                  # 187WEB public showcase
│  ├─ 187/page.tsx              # complete /187 command reference
│  ├─ 187repo/page.tsx          # legacy redirect to /187
│  ├─ install/page.tsx          # preflight/install/onboarding surface
│  └─ knotstore/page.tsx        # Vault-style KNOTstore preview
├─ components/187/              # command palette and reference components
├─ components/showcase/         # launch-page showcase
├─ lib/knotstore/               # pluggable agentic data layer
├─ config/                      # command registry and aliases
├─ docs/                        # command, skills, install, research, standards
└─ .github/workflows/           # CI and GitHub Pages
```

## Deployment

After applying this upgrade:

```bash
npm run lint
npm run typecheck
npm run build
git add .
git commit -m "Upgrade 187WEB showcase and command reference"
git push origin main
```

<div align="center">

<strong>187WEB</strong> — <a href="LICENSE">Custom Noncommercial License with Reserved Knotstore IP</a> © 2026 Lumen Helix Solutions

</div>
