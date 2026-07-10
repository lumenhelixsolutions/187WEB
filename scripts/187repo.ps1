# 187repo.ps1 - Short-name orchestration menu for the 187SKILLS suite.
# Usage: .\187repo.ps1 [repo|craft|vibe|launch|free|research|seo|revenue|docs|write|learn|test|access|include|version|publish|full|power|init|package|help]
param([string]$Command = "help", [Parameter(ValueFromRemainingArguments=$true)]$Remaining)

$RepoDir = Split-Path -Parent $MyInvocation.MyCommand.Path | Split-Path -Parent
$SkillDir = Join-Path $RepoDir ".claude\skills"
$Skills = @("187repo","187craft","187vibe","187launch","187free","187research","187seo","187revenue","187docs","187write","187learn","187test","187access-plus","187include","187version","187publish")

function Show-Help {
  Write-Host "187REPO - Short-name orchestration for the 187SKILLS suite" -ForegroundColor Green
  Write-Host ""
  Write-Host "Commands:"
  Write-Host "  repo, craft, vibe, launch"
  Write-Host "  free, research, seo, revenue"
  Write-Host "  docs, write, learn, test"
  Write-Host "  access, include, version, publish"
  Write-Host "  full, power, init, package, help"
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
  "free" { Print-Skill "187free" }
  "research" { Print-Skill "187research" }
  "seo" { Print-Skill "187seo" }
  "revenue" { Print-Skill "187revenue" }
  "docs" { Print-Skill "187docs" }
  "write" { Print-Skill "187write" }
  "learn" { Print-Skill "187learn" }
  "test" { Print-Skill "187test" }
  "access" { Print-Skill "187access-plus" }
  "access-plus" { Print-Skill "187access-plus" }
  "include" { Print-Skill "187include" }
  "version" { Print-Skill "187version" }
  "publish" { Print-Skill "187publish" }
  "full" { $Skills | ForEach-Object { Print-Skill $_ } }
  "power" { & "$RepoDir\scripts\187power.ps1" @Remaining }
  "init" { & "$RepoDir\scripts\187init.ps1" @Remaining }
  "package" { Package-Skills }
  default { Show-Help }
}
