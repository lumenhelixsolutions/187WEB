# 187repo.ps1 - Short-name orchestration menu for the 187web ecosystem.
# Usage: .\187repo.ps1 [repo|craft|vibe|launch|full|power|init|package|help]
param([string]$Command = "help", [Parameter(ValueFromRemainingArguments=$true)]$Remaining)

$RepoDir = Split-Path -Parent $MyInvocation.MyCommand.Path | Split-Path -Parent
$SkillDir = Join-Path $RepoDir ".claude\skills"

function Show-Help {
  Write-Host "187REPO - Short-name orchestration" -ForegroundColor Green
  Write-Host "Commands: repo, craft, vibe, launch, full, power, init, package, help"
}

function Print-Skill($name) {
  $file = Join-Path $SkillDir "$name\SKILL.md"
  if (-not (Test-Path $file)) { throw "Skill not found: $file" }
  Get-Content $file | Write-Host
}

function Package-Skills {
  $out = Join-Path $RepoDir "187web-skills.zip"
  if (Test-Path $out) { Remove-Item $out }
  $source = Join-Path $RepoDir ".claude\skills"
  Compress-Archive -Path $source -DestinationPath $out
  Write-Host "[OK] Packaged skills to $out" -ForegroundColor Green
}

switch ($Command) {
  "help" { Show-Help }
  "repo" { Print-Skill "187repo" }
  "craft" { Print-Skill "187craft" }
  "vibe" { Print-Skill "187vibe" }
  "launch" { Print-Skill "187launch" }
  "full" { "187repo","187craft","187vibe","187launch" | ForEach-Object { Print-Skill $_ } }
  "power" { & "$RepoDir\scripts\187power.ps1" @Remaining }
  "init" { & "$RepoDir\scripts\187init.ps1" @Remaining }
  "package" { Package-Skills }
  default { Show-Help }
}
