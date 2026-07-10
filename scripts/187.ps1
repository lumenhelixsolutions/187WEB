# scripts/187.ps1 — 187WEB CLI entry script.
# Usage: 187 <alias|command> [target] [mode] [depth]
param(
  [Parameter(Position=0)][string]$Command = "help",
  [Parameter(ValueFromRemainingArguments=$true)]$Remaining
)

$ErrorActionPreference = "Stop"

$RepoDir = Split-Path -Parent $MyInvocation.MyCommand.Path | Split-Path -Parent
$AliasesFile = Join-Path $RepoDir "config\187-aliases.json"
$RefFile = Join-Path $RepoDir "config\187-command-reference.json"

function Resolve-Alias([string]$Key) {
  $val = ""
  if (Test-Path $AliasesFile) {
    try {
      $json = Get-Content $AliasesFile -Raw | ConvertFrom-Json
      $val = $json.$Key
    } catch {
      $val = ""
    }
  }
  return $val
}

function Get-Grammar {
  $grammar = "187 <alias|command> [target] [mode] [depth]"
  if (Test-Path $RefFile) {
    try {
      $ref = Get-Content $RefFile -Raw | ConvertFrom-Json
      if ($ref.cli_grammar) { $grammar = $ref.cli_grammar }
      elseif ($ref.grammar) { $grammar = $ref.grammar }
    } catch {
      # fall back to default
    }
  }
  return $grammar
}

function Show-Help {
  $grammar = Get-Grammar
  Write-Host "187WEB CLI" -ForegroundColor Green
  Write-Host ""
  Write-Host "Grammar:"
  Write-Host "  $grammar"
  Write-Host ""
  Write-Host "Subcommands:"
  Write-Host "  help                  Show this help message and command examples."
  Write-Host "  menu, sel             Open the interactive selector."
  Write-Host "  complete --line `"...`" --cursor N [--json]"
  Write-Host "                        Return registry-driven completion candidates."
  Write-Host "  cap, doctor           Run capability / health check hint."
  Write-Host ""
  Write-Host "Examples:"
  Write-Host "  187 help"
  Write-Host "  187 menu"
  Write-Host "  187 sel"
  Write-Host "  187 scan .\src report deep"
  Write-Host "  187 ship my-landing release brief"
  Write-Host "  187 complete --line `"/187 se`" --cursor 7 --json"
  Write-Host ""
  Write-Host "Run '187 menu' for the interactive tool breakdown."
}

function Show-MenuHint {
  Write-Host "187WEB → selector → run '187 help' to see commands."
}

function Show-CapHint {
  Write-Host "187WEB → capability check → verify node, git, and PowerShell are available."
}

function Invoke-Complete($ArgsList) {
  $helper = Join-Path $RepoDir "scripts\187-complete.mjs"
  & node $helper @ArgsList
}

switch ($Command) {
  "help" { Show-Help }
  "menu" { Show-MenuHint }
  "sel" { Show-MenuHint }
  "complete" { Invoke-Complete $Remaining }
  "cap" { Show-CapHint }
  "doctor" { Show-CapHint }
  default {
    $resolved = Resolve-Alias $Command
    if (-not $resolved) {
      Write-Host "Unknown alias/command: $Command" -ForegroundColor Red
      Show-Help
      exit 1
    }
    $target = if ($Remaining.Count -gt 0) { $Remaining[0] } else { "" }
    $mode = if ($Remaining.Count -gt 1) { $Remaining[1] } else { "" }
    $depth = if ($Remaining.Count -gt 2) { $Remaining[2] } else { "" }
    Write-Host "187WEB → $resolved → target=$target mode=$mode depth=$depth"
  }
}
