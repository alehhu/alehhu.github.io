#!/usr/bin/env bash
# Single entry point for local work: pulls the latest changes (best-effort),
# installs/updates dependencies only if needed, then starts the admin editor
# together with a live-reloading preview of the site.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [ -d .git ] && git rev-parse --abbrev-ref --symbolic-full-name '@{u}' >/dev/null 2>&1; then
  echo "Checking for updates..."
  git pull --ff-only || echo "  (skipped: local changes or diverged history — pull manually if needed)"
fi

STAMP="node_modules/.install-stamp"
if [ ! -d node_modules ] || [ ! -f "$STAMP" ] || [ package-lock.json -nt "$STAMP" ]; then
  echo "Installing dependencies..."
  npm install
  touch "$STAMP"
fi

echo "Starting admin editor + live site preview..."
exec node admin/server.js
