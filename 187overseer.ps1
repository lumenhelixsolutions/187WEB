# 187overseer.ps1
# Pipe the 187 master runbook into K2.7 Code as a Phase-0-only overseer prompt.

param(
  [string]$K2Cmd = "",
  [string]$Runbook = "docs/runbooks/187web_master_overseer_repo_upgrade_runbook.md",
  [switch]$DryRun
)

$PromptFile = ".187-overseer-session-prompt.txt"
$StartupFile = "187-overseer-prompt.txt"

if (!(Test-Path $Runbook)) {
  Write-Error "Runbook not found: $Runbook"
  Write-Host "Expected path: docs/runbooks/187web_master_overseer_repo_upgrade_runbook.md"
  exit 1
}

if (!(Test-Path $StartupFile)) {
@"
You are running inside K2.7 Code.

Act as 187OVERSEER for this repo.

Use the 187KERNEL behavior:
Detect → Read → Interpret → Report → Plan → Act within approved scope → Verify → Handoff → Log.

Default autonomy is L1 READ_ONLY_REPORT.

Human-in-the-loop means scoped consent and meaningful review, not micromanagement.

Use risk-triggered gates:
- baseline clarity, consent, accessibility awareness, inclusion awareness, privacy awareness, docs/version awareness always apply
- deep gates activate only when the surface or risk requires them

Start Phase 0 only.

Do not create, edit, delete, move, commit, push, publish, deploy, or send anything yet.

Produce:
1. docs/reports/187report-master-overseer-upgrade.md content
2. docs/audits/187skills-master-overseer-audit.md content
3. a short approval menu for Phase 1, Phase 2, and Phase 3

Stop after the Phase 0 report and wait for approval.

Below is the master runbook to read and follow.

--- BEGIN 187 MASTER RUNBOOK ---
"@ | Set-Content -Path $StartupFile -Encoding UTF8
}

$Startup = Get-Content -Raw $StartupFile
$Book = Get-Content -Raw $Runbook

@"
$Startup

$Book

--- END 187 MASTER RUNBOOK ---
"@ | Set-Content -Path $PromptFile -Encoding UTF8

Write-Host "Created prompt: $PromptFile"

if ($DryRun) {
  Write-Host "Dry run complete. Drop $PromptFile into K2.7 Code."
  exit 0
}

if ([string]::IsNullOrWhiteSpace($K2Cmd)) {
  Write-Host "K2Cmd is not set."
  Write-Host 'Run like: .\187overseer.ps1 -K2Cmd "k2"'
  Write-Host "Or dry run: .\187overseer.ps1 -DryRun"
  exit 1
}

Write-Host "Piping $PromptFile into: $K2Cmd"
Get-Content -Raw $PromptFile | Invoke-Expression $K2Cmd
