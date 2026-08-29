#!/usr/bin/env bash
#
# Publish dist/ to the gh-pages branch, which GitHub Pages serves from its root
# at https://webspirio.github.io/order-pharm/
#
# Pages is in BRANCH mode here, not Actions mode, so nothing runs the ship gate
# on the way to production — this script does, and refuses to publish without
# it. That is the whole reason it exists rather than three lines in a README.
#
# The branch is a build artifact with orphan history: it holds the contents of
# dist/ and no source. It is force-pushed every time, so never edit it by hand.
#
# Usage:  pnpm deploy          (runs pnpm verify first)
#         SKIP_VERIFY=1 pnpm deploy   (only when you have just run it yourself)

set -euo pipefail

REPO_URL="https://github.com/webspirio/order-pharm.git"
BRANCH="gh-pages"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$ROOT"

if [ "${SKIP_VERIFY:-}" != "1" ]; then
  echo "==> pnpm verify"
  pnpm verify
else
  echo "==> skipping verify (SKIP_VERIFY=1); building only"
  pnpm build
fi

if [ ! -f dist/.nojekyll ]; then
  echo "dist/.nojekyll is missing. Pages would run Jekyll and 404 every" >&2
  echo "_astro/ asset. It lives in public/.nojekyll — restore it." >&2
  exit 1
fi

SHA="$(git rev-parse --short HEAD)"
SRC_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT

# `dist/.` and not `dist/*`: the glob silently misses dotfiles, and .nojekyll is
# the one file whose absence breaks every stylesheet and script on the site.
cp -R dist/. "$STAGE"/

cd "$STAGE"
git init -q -b "$BRANCH"
git add -A
git commit -q -m "Deploy Ellery Health — built from ${SRC_BRANCH} @ ${SHA}

Static build output, served by GitHub Pages from this branch's root.
Build artifact with orphan history: no source here, force-pushed on every
deploy. Rebuild from the source branch instead of editing this."

echo "==> pushing $(git ls-files | wc -l | tr -d ' ') files to ${BRANCH}"
git push -f "$REPO_URL" "${BRANCH}:${BRANCH}"

echo
echo "Published. https://webspirio.github.io/order-pharm/"
echo "Pages takes a moment to rebuild; check with:"
echo "  gh api repos/webspirio/order-pharm/pages --jq .status"
