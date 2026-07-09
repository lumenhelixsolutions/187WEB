#!/usr/bin/env bash
# 187power.sh — GitHub surgical strike for 187web archetypes.
# Usage: 187power.sh <repo-name> [--cli|--agent|--kv|--edge|--ui|--full|--web] [description]
set -euo pipefail

REPO_NAME="${1:-}"
TEMPLATE="${2:---full}"
DESC="${3:-A 187repos zero-bloat project.}"

if [[ -z "$REPO_NAME" ]]; then
  echo "Usage: 187power.sh <repo-name> [--cli|--agent|--kv|--edge|--ui|--full|--web] [description]" >&2
  exit 1
fi

if [[ -z "${GITHUB_PAT:-}" ]]; then
  echo "❌ GITHUB_PAT is not set. Export a fine-grained token with 'repo' and 'pages' scope:" >&2
  echo "   export GITHUB_PAT=ghp_..." >&2
  exit 1
fi

if ! command -v gh >/dev/null 2>&1; then
  echo "❌ GitHub CLI (gh) is required: https://cli.github.com/" >&2
  exit 1
fi

export GH_TOKEN="$GITHUB_PAT"

TOPICS=(
  187repos zero-bloat educational nextjs react typescript
  tailwindcss design-system award-winning web-design accessibility
  performance conversion opensource starter-kit boilerplate
  best-practices ui-ux responsive claude-skill
)
TOPIC_STRING="$(IFS=,; echo "${TOPICS[*]}")"

scaffold_root() {
  mkdir -p .github/workflows

  cat > README.md <<EOF
# $REPO_NAME

$DESC

## Quick start

\`\`\`bash
# Clone and install
git clone https://github.com/\$GITHUB_USER/$REPO_NAME.git
cd $REPO_NAME
\`\`\`

## License

MIT
EOF

  cat > .cursorrules <<'EOF'
# AI Context Map — 187repos

- This is a zero-bloat, educational starter.
- Prefer small, readable files over clever abstractions.
- Every public function needs a one-line comment explaining why it exists.
- Run the pre-ship checklist before any PR.
EOF

  cat > CONTRIBUTING.md <<'EOF'
# Contributing

1. Keep changes minimal and focused.
2. Add or update tests for new behavior.
3. Run the linter and type-checker before opening a PR.
4. Reference the issue or brief in your commit message.
EOF

  cat > .github/workflows/ci.yml <<'EOF'
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
EOF
}

TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT
cd "$TMP_DIR"

echo "🔪 187power: creating $REPO_NAME ($TEMPLATE)"
git init -q -b main

case "$TEMPLATE" in
  --cli|--agent|--kv|--edge|--ui|--full|--web)
    scaffold_root
    echo "Archetype: $TEMPLATE" >> README.md
    ;;
  *)
    echo "❌ Unknown template: $TEMPLATE" >&2
    exit 1
    ;;
esac

git add .
git config user.email "187repo@localhost"
git config user.name "187repo"
git commit -q -m "chore: initial 187repo scaffold ($TEMPLATE)"

gh repo create "$REPO_NAME" --public --source=. --remote=origin --push

GITHUB_USER="$(gh api user --jq .login)"
REPO_SLUG="$GITHUB_USER/$REPO_NAME"
HOMEPAGE="https://$GITHUB_USER.github.io/$REPO_NAME"

echo "⚡ Configuring $REPO_SLUG..."
gh repo edit "$REPO_SLUG" --description "$DESC" --homepage "$HOMEPAGE"
gh repo edit "$REPO_SLUG" --add-topic "$TOPIC_STRING"

# Enable GitHub Pages if possible
if gh api "repos/$REPO_SLUG/pages" --method POST -f source='{"branch":"main","path":"/"}' >/dev/null 2>&1; then
  echo "✅ Pages enabled: $HOMEPAGE"
else
  echo "⚠️  Pages could not be enabled automatically. Enable manually in repo settings."
fi

echo ""
echo "✅ $REPO_SLUG is live."
echo "🚀 Homepage: $HOMEPAGE"
echo "📝 Remember to upload the Social Preview (OG image) manually — GitHub API does not support it."
