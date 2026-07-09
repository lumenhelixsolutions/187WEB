# Install 187web

The fastest way to wire the 187web ecosystem into your environment.

- **Marketing page:** `/install`
- **Bash installer:** `install.sh`
- **PowerShell installer:** `install.ps1`

## Quick start

### Linux / macOS / Git Bash

```bash
git clone https://github.com/lumenhelixsolutions/187webDESIGN.git
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
git clone https://github.com/lumenhelixsolutions/187webDESIGN.git
cd 187webDESIGN
.\install.ps1
```

Then enable the `cd` hook:

```powershell
.\install-compiler-hook.ps1
```

## Short-name suite

After install, the following short-name entry points are on your PATH:

| Command | Skill | Purpose |
|---|---|---|
| `187repo.sh` / `187repo.ps1` | `187repo` | Orchestration, manifest compiler, GitHub deploy |
| `187craft` | `187craft` | Design + frontend (loads `187webdesign` / 187webdev suite) |
| `187vibe` | `187vibe` | Delight + community + research |
| `187launch` | `187launch` | Go-to-market intelligence |
| `187power.sh` / `187power.ps1` | `187repo` | Create repo, push scaffold, enable Pages |
| `187init.sh` / `187init.ps1` | `187repo` | Generate a local archetype scaffold |

## What gets installed

- `~/.187web/prompts/MANIFEST.xml` — the 27-prompt master manifest.
- `~/.187web/bin/187web-compiler.sh` / `.ps1` — the hardware-aware compiler.
- `~/.187web/bin/install-compiler-hook.sh` / `.ps1` — the optional shell hook installer.
- `~/.187web/bin/187repo.sh` / `.ps1` — short-name orchestration menu.
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
