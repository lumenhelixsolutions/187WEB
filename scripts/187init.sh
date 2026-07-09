#!/usr/bin/env bash
# 187init.sh — Local scaffold generator for 187web archetypes.
# Usage: 187init.sh [--cli|--agent|--kv|--edge|--ui|--full|--web] <target-dir>
set -euo pipefail

TEMPLATE="${1:---full}"
TARGET="${2:-.}"

scaffold_root() {
  mkdir -p "$TARGET/.github/workflows"

  cat > "$TARGET/README.md" <<EOF
# $(basename "$TARGET")

A 187repos zero-bloat project.

## Quick start

\`\`\`bash
cd $(basename "$TARGET")
# Add your run command here
\`\`\`

## License

MIT
EOF

  cat > "$TARGET/.cursorrules" <<'EOF'
# AI Context Map — 187repos

- This is a zero-bloat, educational starter.
- Prefer small, readable files over clever abstractions.
- Every public function needs a one-line comment explaining why it exists.
- Run the pre-ship checklist before any PR.
EOF

  cat > "$TARGET/CONTRIBUTING.md" <<'EOF'
# Contributing

1. Keep changes minimal and focused.
2. Add or update tests for new behavior.
3. Run the linter and type-checker before opening a PR.
4. Reference the issue or brief in your commit message.
EOF

  cat > "$TARGET/.github/workflows/ci.yml" <<'EOF'
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

case "$TEMPLATE" in
  --cli|--agent|--kv|--edge|--ui|--full|--web)
    mkdir -p "$TARGET"
    scaffold_root
    echo "Archetype: $TEMPLATE" >> "$TARGET/README.md"
    ;;
  *)
    echo "❌ Unknown template: $TEMPLATE" >&2
    echo "Usage: 187init.sh [--cli|--agent|--kv|--edge|--ui|--full|--web] <target-dir>" >&2
    exit 1
    ;;
esac

echo "✅ Scaffolded $TEMPLATE project to $TARGET"
