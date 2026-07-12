# 187WEB

<p align="center">
  <a href="https://lumenhelix.com">
    <img src="docs/assets/lumenhelix-logo.svg" alt="LumenHelix Solutions" width="180">
  </a>
</p>

<h3 align="center">Command-driven AI web suite — build, launch, and ship research-grade web surfaces.</h3>

<p align="center">
  <a href="https://lumenhelixsolutions.github.io/187WEB/">
    <img src="https://img.shields.io/badge/Launch_Page-187WEB-00D4FF?style=flat-square&logo=githubpages&logoColor=white" alt="Launch Page">
  </a>
  <a href="https://lumenhelix.com">
    <img src="https://img.shields.io/badge/Built_by-LumenHelix-7C3AED?style=flat-square" alt="Built by LumenHelix">
  </a>
  <img src="https://img.shields.io/badge/license-Custom Noncommercial-8A95A8?style=flat-square" alt="License">
</p>

---

**187WEB** is part of the [LumenHelix Solutions](https://lumenhelix.com) portfolio — applied symbolic dynamics & reversible computation for deterministic, traceable AI systems.

187WEB is the LumenHelix command-driven AI webcraft ecosystem. Built on Next.js, React, TypeScript, Tailwind CSS, Prisma, and better-sqlite3, it exposes a short slash-command grammar — /187 craft, /187 seo, /187 launch, /187 research, and more — that turns intent into finished public pages, design systems, docs, and research artifacts.

## Why this exists

- **Ship faster.** One command generates a landing page, component kit, doc set, or research artifact instead of wiring boilerplate.
- **Launch with standards.** SEO, accessibility, inclusion, revenue architecture, and publish gates are built into the workflow, not afterthoughts.
- **Own your stack.** Local-first, deterministic, and open-core — run offline, audit every change, and deploy anywhere that serves static or Node sites.

## Quick start

Install and run 187WEB in under two minutes.

### macOS / Linux

```bash
# Clone
git clone https://github.com/lumenhelixsolutions/187WEB.git
cd 187WEB

# Install & run
npm install
npm run db:push
npm run db:seed
npm run dev
```

### Windows (PowerShell)

```powershell
# Clone
git clone https://github.com/lumenhelixsolutions/187WEB.git
Set-Location 187WEB

# Install & run
npm install
npm run db:push
npm run db:seed
npm run dev
```

### Windows (Git Bash / WSL)

```bash
git clone https://github.com/lumenhelixsolutions/187WEB.git
cd 187WEB
npm install
npm run db:push
npm run db:seed
npm run dev
```

> **Device note:** 187WEB is tested on Windows 11, macOS Sonoma, Ubuntu 22.04/24.04, and modern mobile browsers.

## Full documentation

Visit the launch page for architecture, API reference, and deployment guides:  
**https://lumenhelixsolutions.github.io/187WEB/**

## Features

| Feature | What it gives you |
|---------|-------------------|
| Command palette web builder | Use /187 craft, /187 kit, /187 docs, and /187 write to generate pages, design systems, docs, and copy. |
| Standards-first launch gate | Run /187 seo, /187 access-plus, /187 include, /187 revenue, /187 launch, and /187 publish before going live. |
| Research-grade labs | Ship reproducible experiments, dataset cards, API contracts, benchmarks, and Research Release Packets via /187 research, /187 labs, /187 data, and /187 crate. |
| KNOTstore memory layer | Pluggable agentic memory with SQLite, KNOT-point, and hybrid backends, plus a Vault-style preview at /knotstore. |

## Architecture at a glance

```
187WEB/
├── app/              Next.js App Router (pages, /187 explorer, install, knotstore)
├── components/187/   command palette and reference components
├── components/showcase/  ability cards, tabs, scenario demos
├── lib/              skill data, knotstore agentic memory layer
├── docs/             command, skills, install, research, standards
└── prisma/           SQLite schema, seed, and migrations
```

## Development

```bash
npm install
npm run db:push
npm run db:seed
npm run dev
```

## Roadmap

- [ ] Expand /187 skill packs for e-commerce and research lab templates
- [ ] Add one-command static export and GitHub Pages publish gate
- [ ] Integrate Obsidian vault sync for KNOTstore agent memory

## Support & consulting

Need deterministic AI systems with full traceability? LumenHelix builds reversible computation kernels, governance layers, and end-to-end AI integrations.

- **Website:** https://lumenhelix.com
- **Services:** AI diagnostics, B.Y.O. support packages, governance audits
- **Research:** TEN² kernel, R.U.B.I.C. boundary discipline, C.O.R.E. constraint lens

## License

Released under a custom noncommercial license with reserved Knotstore IP. See LICENSE for full terms.

---

<p align="center">
  <sub>Engineered by <a href="https://lumenhelix.com">LumenHelix Solutions</a> — Applied Symbolic Dynamics & Reversible Computation.</sub>
</p>
