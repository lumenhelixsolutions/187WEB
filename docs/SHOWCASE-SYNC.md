# 187WEB Showcase Sync Runbook

This runbook keeps every public surface of 187WEB telling the same story: README, AGENTS, docs, app pages, and the GitHub Pages demo.

## Purpose

A visitor should be able to land anywhere — GitHub, the docs folder, or any route in the Next.js app — and get the same answer to the same question. This runbook defines the standard questions and the files that must stay in sync.

## Public-surface standard questions

Every public surface must answer these questions clearly:

1. **What is 187WEB?**
2. **What can it do?**
3. **What skills exist?**
4. **What aliases are available?**
5. **How does standalone-first work?**
6. **How do THREAD / TUNE / CORD / CHAR / LAB fit?**
7. **How do I install or use it?**
8. **Where are the docs?**
9. **What are the demo abilities?**
10. **What files construct the system?**

## Files that must stay in sync

| File | Surface |
|---|---|
| `README.md` | GitHub landing and project overview |
| `AGENTS.md` | Agent context and active skill suite |
| `config/187-brand.json` | Canonical brand, taglines, and usage rules |
| `config/187-aliases.json` | Short-name alias resolution |
| `lib/skill-showcase-data.ts` | Skill roster for pages and adapters |
| `docs/187SKILLS.md` | Operating layer documentation |
| `docs/187-NAMES.md` | Alias reference |
| `docs/187-MODULES.md` | Module reference |
| `docs/187-KERNEL.md` | Behavior cycle and autonomy levels |
| `docs/187-CHAR.md` | Shared scout documentation |
| `docs/INSTALL.md` | Installation instructions |
| `docs/ROUTING.md` | Skill routing guide |
| `app/page.tsx` or `components/showcase/Showcase.tsx` | Dark showcase landing |
| `app/install/page.tsx` | CLI installer page |
| `app/187repo/page.tsx` | Slash-command reference |
| `app/187*/page.tsx` | Individual skill showcase pages |
| `app/187/page.tsx` | 187WEB overview and command grammar |
| `app/187kit/page.tsx` | Templates and kit surface |
| `app/187demo/page.tsx` | Demo abilities index |
| `scripts/187repo.sh` / `scripts/187repo.ps1` | CLI command lists |

## Verification commands

Run these before declaring a sync pass complete:

```bash
npm run lint
npm run typecheck
npm run build
```

Fix any error or warning introduced by the sync pass before continuing.

## Sync checklist

- [ ] Brand copy uses "187WEB" (all caps, no space) and the primary tagline.
- [ ] Skill roster matches `lib/skill-showcase-data.ts` and `config/187-aliases.json`.
- [ ] Command grammar `187 <alias> [target] [mode] [depth]` appears on overview surfaces.
- [ ] Modules THREAD / TUNE / CORD / CHAR / LAB are defined consistently.
- [ ] Install paths point to `/install`, `install.sh`, and `install.ps1`.
- [ ] Docs links are relative and resolve from the docs folder.
- [ ] All new routes are reachable and linked from `/187` or `/187demo`.
