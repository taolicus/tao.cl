#!/bin/sh
# Deploy tao.cl to production.
#
# Assumes an SSH host alias "tao" is configured locally and the remote server's
# nginx web root is at /var/www/tao.cl. The repository itself does not need to
# live on the server: this script builds locally and copies only dist/.
set -e

ORIG_DIR="$(cd "$(dirname "$0")/.." && pwd)"

# Build in Termux internal storage (native modules don't work on FUSE)
TMPDIR="${TMPDIR:-/data/data/com.termux/files/usr/tmp}"
BUILD_DIR="$TMPDIR/tao.cl.build.$$"
echo "Building in internal storage: $BUILD_DIR"
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR"

cleanup() {
  rm -rf "$BUILD_DIR"
}
trap cleanup EXIT HUP INT TERM

# Copy source files
if command -v rsync >/dev/null 2>&1; then
  rsync -a --exclude='node_modules' --exclude='dist' --exclude='.git' "$ORIG_DIR/" "$BUILD_DIR/"
else
  cp -a "$ORIG_DIR/." "$BUILD_DIR/"
  rm -rf "$BUILD_DIR/node_modules" "$BUILD_DIR/dist" "$BUILD_DIR/.git"
fi

cd "$BUILD_DIR"

# Install dependencies
npm ci --no-audit --no-fund

# Build
node node_modules/vite/bin/vite.js build

# Copy dist back
rm -rf "$ORIG_DIR/dist"
cp -r dist "$ORIG_DIR/"
cd "$ORIG_DIR"

sh workflow/lint.sh
git push

# Deploy only the built static site.
if command -v rsync >/dev/null 2>&1; then
  rsync -av --delete dist/ tao:/var/www/tao.cl/
else
  echo "rsync not found; attempting deployment with scp (less efficient)"
  ssh tao "mkdir -p /var/www/tao.cl"
  scp -r dist/* tao:/var/www/tao.cl/
fi
