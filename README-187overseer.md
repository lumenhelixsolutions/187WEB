# 187 K2.7 Command-Line Runner Pack

Goal: let you drop the master runbook into the command line instead of pasting a giant prompt.

This pack gives you:

```text
187overseer.sh      Bash/Git Bash/Linux/macOS runner
187overseer.ps1     PowerShell runner
187-overseer-prompt.txt  The small startup wrapper
```

## Required repo location

Put your master runbook here:

```text
docs/runbooks/187web_master_overseer_repo_upgrade_runbook.md
```

Run from the repo root:

```text
187WEB/
```

## Bash / Git Bash

If your K2.7 Code CLI command is `k2`, run:

```bash
K2_CMD="k2" ./187overseer.sh
```

If the command is different, replace `k2`:

```bash
K2_CMD="your-k27-command-here" ./187overseer.sh
```

Dry run only, no K2 execution:

```bash
./187overseer.sh --dry
```

Custom runbook path:

```bash
K2_CMD="k2" ./187overseer.sh --runbook docs/runbooks/187web_master_overseer_repo_upgrade_runbook.md
```

## PowerShell

```powershell
.\187overseer.ps1 -K2Cmd "k2"
```

Dry run:

```powershell
.\187overseer.ps1 -DryRun
```

Custom runbook path:

```powershell
.\187overseer.ps1 -K2Cmd "k2" -Runbook "docs/runbooks/187web_master_overseer_repo_upgrade_runbook.md"
```

## What it does

The runner creates:

```text
.187-overseer-session-prompt.txt
```

That file contains:

```text
1. the compact 187OVERSEER startup instruction
2. the full runbook
3. Phase 0 only instruction
```

Then it pipes that prompt into your K2.7 command.

## Safety behavior

The startup prompt tells K2.7:

```text
Start Phase 0 only.
Default autonomy is L1 READ_ONLY_REPORT.
Do not create, edit, delete, move, commit, push, publish, deploy, or send anything yet.
```

## If stdin piping does not work

Some coding agents do not accept stdin. In that case:

```text
1. Run the script with --dry / -DryRun.
2. Open .187-overseer-session-prompt.txt.
3. Drop that file into K2.7 Code manually.
```

That is still one generated file, not repeated copy/paste.
