# 187power.ps1 - GitHub surgical strike for 187web archetypes.
# Usage: .\187power.ps1 <repo-name> [--cli|--agent|--kv|--edge|--ui|--full|--web] [description]
param(
  [Parameter(Mandatory=$true)][string]$RepoName,
  [string]$Template = "--full",
  [string]$Description = "A 187repos zero-bloat project."
)

$ErrorActionPreference = "Stop"

if (-not $env:GITHUB_PAT) {
  Write-Error "GITHUB_PAT is not set. Export a fine-grained token with 'repo' and 'pages' scope."
}
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  Write-Error "GitHub CLI (gh) is required: https://cli.github.com/"
}

$env:GH_TOKEN = $env:GITHUB_PAT

$Topics = @(
  "187repos","zero-bloat","educational","nextjs","react","typescript",
  "tailwindcss","design-system","award-winning","web-design","accessibility",
  "performance","conversion","opensource","starter-kit","boilerplate",
  "best-practices","ui-ux","responsive","claude-skill"
)
$TopicString = $Topics -join ","

function Scaffold-Root($target) {
  New-Item -ItemType Directory -Force -Path (Join-Path $target ".github\workflows") | Out-Null
  @"
# $RepoName

$Description

## Quick start

\`\`\`bash
git clone https://github.com/\`$GITHUB_USER/$RepoName.git
cd $RepoName
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

$tmp = New-Item -ItemType Directory -Path (Join-Path $env:TEMP (New-Guid).ToString())
Push-Location $tmp

git init -q -b main
Scaffold-Root $tmp
"Archetype: $Template" | Add-Content (Join-Path $tmp "README.md")

git add .
git config user.email "187repo@localhost"
git config user.name "187repo"
git commit -q -m "chore: initial 187repo scaffold ($Template)"

gh repo create $RepoName --public --source=. --remote=origin --push

$user = gh api user --jq ".login"
$repoSlug = "$user/$RepoName"
$homepage = "https://$user.github.io/$RepoName"

Write-Host "Configuring $repoSlug..."
gh repo edit $repoSlug --description $Description --homepage $homepage
gh repo edit $repoSlug --add-topic $TopicString

try {
  gh api "repos/$repoSlug/pages" --method POST -f source='{ "branch": "main", "path": "/" }' | Out-Null
  Write-Host "[OK] Pages enabled: $homepage"
} catch {
  Write-Host "[WARN] Pages could not be enabled automatically. Enable manually in repo settings." -ForegroundColor Yellow
}

Pop-Location
Remove-Item -Recurse -Force $tmp

Write-Host ""
Write-Host "[OK] $repoSlug is live." -ForegroundColor Green
Write-Host "Homepage: $homepage"
Write-Host "NOTE: Remember to upload the Social Preview (OG image) manually."
