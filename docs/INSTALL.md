# Install 187web

The fastest way to wire the 187web ecosystem into your environment.

- **Marketing page:** `/install`
- **Bash installer:** `install.sh`
- **PowerShell installer:** `install.ps1`

## Quick start

### Linux / macOS / Git Bash

```bash
git clone https://github.com/lumenhelixsolutions/187WEB.git
cd 187webDESIGN
./install.sh
```

Then reload your shell and enable the `cd` hook:

```bash
source ~/.bashrc   # or ~/.zshrc
install-compiler-hook.sh
```

### Windows

```powershell
git clone https://github.com/lumenhelixsolutions/187WEB.git
cd 187webDESIGN
.\install.ps1
```

Then enable the `cd` hook:

```powershell
.\install-compiler-hook.ps1
```

## Short-name suite

After install, the following short-name entry points are on your PATH. Run `187repo.sh full` (or `.\187repo.ps1 full`) to print every skill back-to-back.

| Command | Skill | Purpose |
|---|---|---|
| `187repo.sh` / `187repo.ps1` | **187REPO** | Orchestration, manifest compiler, GitHub deploy |
| `187craft` | **187CRAFT** | Design + frontend (loads `187webdesign` / 187webdev suite) |
| `187vibe` | **187VIBE** | Delight + community + research |
| `187launch` | **187LAUNCH** | Go-to-market intelligence |
| `free` | **187FREE** | No-cost stack and free-tier optimization |
| `research` | **187RESEARCH** | Source-backed research and evidence synthesis |
| `seo` | **187SEO** | Ethical, sustainable search optimization |
| `revenue` | **187REVENUE** | Ethical revenue and monetization planning |
| `docs` | **187DOCS** | Living documentation architecture |
| `write` | **187WRITE** | Drafting assistant (`187DOCS` subskill) |
| `learn` | **187LEARN** | Curriculum and knowledge capture |
| `test` | **187TEST** | Assessment, QA, and eval gates |
| `access` | **187ACCESS+** | Accessibility and inclusive design |
| `include` | **187INCLUDE** | Identity-safe, inclusive language |
| `version` | **187VERSION** | Versioning, tagging, and release metadata |
| `publish` | **187PUBLISH** | Release sync and distribution |
| `187power.sh` / `187power.ps1` | **187REPO** | Create repo, push scaffold, enable Pages |
| `187init.sh` / `187init.ps1` | **187REPO** | Generate a local archetype scaffold |

The full public suite is: **187REPO 187CRAFT 187VIBE 187LAUNCH 187FREE 187RESEARCH 187SEO 187REVENUE 187DOCS 187WRITE 187LEARN 187TEST 187ACCESS+ 187INCLUDE 187VERSION 187PUBLISH**.

## What gets installed

- `~/.187web/prompts/MANIFEST.xml` — the 27-prompt master manifest.
- `~/.187web/bin/187web-compiler.sh` / `.ps1` — the hardware-aware compiler.
- `~/.187web/bin/install-compiler-hook.sh` / `.ps1` — the optional shell hook installer.
- `~/.187web/bin/187repo.sh` / `.ps1` — short-name orchestration menu for the full 187SKILLS suite.
- `~/.187web/bin/187power.sh` / `.ps1` — GitHub surgical-strike deploy script.
- `~/.187web/bin/187init.sh` / `.ps1` — local scaffold generator.
- A PATH entry so all of the above are available everywhere.

## Environment variables

| Variable | Purpose |
|---|---|
| `E187WEB_POWER_MODE` | Force `high`, `low`, or `standard` power mode. |
| `E187WEB_CWD` | Override the directory used for folder routing. |
| `E187WEB_RELAY_URL` | Telemetry relay URL (default `http://localhost:18780`). |

## Updating

Pull the latest changes and rerun the installer:

```bash
git pull
./install.sh
```

## Uninstalling

Remove the installed files and the hook:

```bash
rm -rf ~/.187web
```

On Windows, also remove `%USERPROFILE%\.187web` from your user PATH.
