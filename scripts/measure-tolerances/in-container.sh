#!/bin/bash
# Runs inside the image built from the Dockerfile next to this file.
# Expects the repo mounted read-only at /src and a browser name as $1.
set -e
browser="$1"

useradd -m runner 2>/dev/null || true
mkdir -p /app && cp -r /src/. /app/ && rm -rf /app/node_modules /app/dist
chown -R runner /app

su runner -c "HOME=/home/runner bash -c '
set -e
cd /app
npm ci --no-audit --no-fund >/dev/null 2>&1
npm run build >/dev/null 2>&1
node scripts/measure-tolerances/prepare.js
xvfb-run --auto-servernum npx karma start ./karma.conf.cjs \
  --single-run --no-auto-watch --browsers $browser 2>&1
'"
