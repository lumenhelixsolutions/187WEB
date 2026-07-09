# 187init.ps1 - Local scaffold generator for 187web archetypes.
# Usage: .\187init.ps1 [--cli|--agent|--kv|--edge|--ui|--full|--web] <target-dir>
param(
  [string]$Template = "--full",
  [string]$Target = "."
)

$ErrorActionPreference = "Stop"

function Scaffold-Root($target) {
  New-Item -ItemType Directory -Force -Path (Join-Path $target ".github\workflows") | Out-Null
  $name = Split-Path -Leaf (Resolve-Path $target)
  @"
# $name

A 187repos zero-bloat project.

## Quick start

\`\`\`bash
cd $name
# Add your run command here
\`\`\`

## License

MIT
"@ | Set-Content (Join-Path $target "README.md")

  @"
# AI Context Map - 187repos

- This is a zero-bloat, educational starter.
- Prefer small, readable files over clever abstractions.
- Every public function needs a one-line comment explaining why it exists.
- Run the pre-ship checklist before any PR.
"@ | Set-Content (Join-Path $target ".cursorrules")

  @"
# Contributing

1. Keep changes minimal and focused.
2. Add or update tests for new behavior.
3. Run the linter and type-checker before opening a PR.
4. Reference the issue or brief in your commit message.
"@ | Set-Content (Join-Path $target "CONTRIBUTING.md")

  @"
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Validate
        run: echo "Add your lint/test/build steps here"
"@ | Set-Content (Join-Path $target ".github\workflows\ci.yml")
}

$valid = @("--cli","--agent","--kv","--edge","--ui","--full","--web")
if ($valid -notcontains $Template) {
  Write-Error "Unknown template: $Template. Use: --cli, --agent, --kv, --edge, --ui, --full, --web"
}

New-Item -ItemType Directory -Force -Path $Target | Out-Null
Scaffold-Root $Target
"Archetype: $Template" | Add-Content (Join-Path $Target "README.md")

Write-Host "[OK] Scaffolded $Template project to $(Resolve-Path $Target)" -ForegroundColor Green
