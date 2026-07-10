<div align="center">

<br>

<img src="public/images/187suite-hero.jpg" alt="187WEB — command-driven web suite" width="92%" />

<h1>187WEB</h1>
<p><strong>Type one command. Ship the whole surface.</strong></p>
<p>A command-driven web suite for building public pages, launching with standards, and shipping research-grade artifacts.</p>
<p><a href="https://lumenhelixsolutions.github.io/187WEB/">Live Demo</a> · <a href="https://lumenhelixsolutions.github.io/187WEB/187">/187 Reference</a> · <a href="./docs/INSTALL.md">Install</a> · <a href="./docs/187-COMMANDS.md">Command Docs</a></p>

</div>

## What 187WEB does

187WEB is a standalone-first AI webcraft ecosystem. It gives agentic systems a short command surface for turning intent into finished work.

In 10 seconds, a visitor can name three things it does:

1. **Build public web surfaces** — landing pages, design systems, component kits, docs, and copy, driven by `/187 craft`, `/187 kit`, `/187 docs`, `/187 write`, `/187 repo`.
2. **Launch with standards wired in** — SEO/access/inclusion audits, revenue architecture, go-to-market plans, and a publish gate via `/187 seo`, `/187 access-plus`, `/187 include`, `/187 revenue`, `/187 launch`, `/187 publish`.
3. **Ship research-grade labs** — reproducible experiments, dataset cards, public API contracts, provenance, benchmarks, and Research Release Packets via `/187 research`, `/187 labs`, `/187 data`, `/187 crate`.

Live demo: **https://lumenhelixsolutions.github.io/187WEB/**

## Slash command grammar

```text
/187 <alias|command> [target] [mode] [depth]
```

CLI equivalent:

```text
187 <alias|command> [target] [mode] [depth]
```

Example chains:

```text
/187 craft design landing-page
/187 seo audit brief
/187 launch plan ph
/187 publish gate

/187 research climate-models deep
/187 labs protocol
/187 crate release packet

/187 free mvp hosting
/187 repo init --web
/187 kit apply landing
```

Full reference: [`docs/187-COMMANDS.md`](./docs/187-COMMANDS.md) or open [`/187`](https://lumenhelixsolutions.github.io/187WEB/187) on the live site.

## Ability map

Skills are grouped by the job they do:

| Group | Skills |
|---|---|
| **Build** | `187CRAFT` · `187REPO` · `187KIT` · `187DOCS` · `187WRITE` · `187ACCESS+` · `187INCLUDE` |
| **Research** | `187RESEARCH` · `187FREE` · `187SEO` · `187TEST` |
| **Launch** | `187LAUNCH` · `187REVENUE` · `187VIBE` · `187LEARN` |
| **Operate** | `187COMMAND` · `187REPORT` · `187SCAN` · `187STANDARD` · `187FLOW` · `187VERSION` · `187PUBLISH` |
| **Modules** | `THREAD` · `TUNE` · `CORD` · `CHAR` · `LAB` |
| **Research Lab** | `187SCI` · `187LABS` · `187DATA` · `187API` · `187BENCH` · `187NB` · `187COLAB` · `187GAP` · `187META` · `187PROV` · `187CRATE` · `RRP` |

Each skill page on the live site lists triggers, use cases, outputs, routing, templates, and related skills.

## Install / onboarding

187WEB does not require installing the entire ecosystem. Preflight supports one skill, one agent, one module, one ability, one research profile, one pack, or the full suite.

```bash
187 pre
187 cap
187 menu
187 install seo
187 install research-lab
187 doctor
```

See [`docs/INSTALL.md`](./docs/INSTALL.md) for the full install guide.

## Quick start

```bash
git clone https://github.com/lumenhelixsolutions/187WEB.git
cd 187WEB
npm install
npm run dev
```

Then open http://localhost:3000 and try `/187` in the command palette.

## Project structure

```text
187WEB/
├─ app/                         # Next.js App Router
│  ├─ page.tsx                  # 187WEB public showcase
│  ├─ 187/page.tsx              # /187 command + ability explorer
│  ├─ install/page.tsx          # preflight/install/onboarding surface
│  ├─ 187<ID>/page.tsx          # individual skill showcase pages
│  └─ knotstore/page.tsx        # Vault-style KNOTstore preview
├─ components/187/              # command palette and reference components
├─ components/showcase/         # ability cards, tabs, scenario demos
├─ lib/
│  ├─ skill-showcase-data.ts    # canonical skill data
│  └─ knotstore/                # pluggable agentic data layer
├─ docs/                        # command, skills, install, research, standards
└─ .github/workflows/           # CI and GitHub Pages
```

## Verification

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## KNOTstore

`lib/knotstore/` is the pluggable agentic memory layer for the 187WEB ecosystem. It supports SQLite, KNOT-point, and hybrid backends, and ships with a Vault-style preview at `/knotstore`.

## ◆ Licensing

This repository is available under the terms in [LICENSE](./LICENSE).

- You may use, remix, adapt, build on, and improve the work for noncommercial purposes.
- You may **not** use it commercially without prior written permission from **Lumen Helix Solutions**.
- **Knotstore intellectual property is excluded** from the license grant and remains the sole property of **Lumen Helix Solutions**.

For a plain-English explanation, see [LICENSE-INFO.md](./LICENSE-INFO.md). For commercial licensing or permission requests, contact **Lumen Helix Solutions**.

<div align="center">

<strong>187WEB</strong> — <a href="LICENSE">Custom Noncommercial License with Reserved Knotstore IP</a> © 2026 Lumen Helix Solutions

</div>
