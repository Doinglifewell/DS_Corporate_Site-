#!/bin/bash
# DeStore — Push fixed files to GitHub → triggers Vercel auto-deploy
# Run this from the folder where you downloaded the fixed HTML files
# Usage: bash deploy_to_github.sh

set -e

REPO="git@github.com:Doinglifewell/DeStore_Network_2.0.git"
BRANCH="main"
COMMIT_MSG="Platform audit: theme compliance, emoji → Lucide, renames, map fixes"

echo ""
echo "DeStore Platform — Deploy to Vercel via GitHub"
echo "==============================================="
echo ""

# Check we're in the right place
if [ ! -f "DS_ScanDashboard.html" ]; then
  echo "❌  Run this script from the folder containing the fixed HTML files."
  exit 1
fi

TMPDIR=$(mktemp -d)
echo "→ Cloning repo into temp dir..."
git clone "$REPO" "$TMPDIR" --depth 1 --branch "$BRANCH" -q

echo "→ Copying fixed files..."
cp *.html "$TMPDIR/"

echo "→ Committing..."
cd "$TMPDIR"
git add -A
git diff --cached --stat
git commit -m "$COMMIT_MSG"

echo "→ Pushing to $BRANCH..."
git push origin "$BRANCH"

echo ""
echo "✅  Pushed. Vercel will deploy automatically."
echo "   https://vercel.com/info-45087063s-projects/destore-network"
echo ""

# Clean up
rm -rf "$TMPDIR"
