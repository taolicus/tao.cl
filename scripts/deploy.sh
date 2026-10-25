#!/bin/sh
# Deploy tao.cl to production.
#
# Assumes an SSH host alias "tao" is configured locally and the remote server
# has the repository clone at ~/tao.cl with the web root at /var/www/tao.cl.
set -e

cd "$(dirname "$0")/.."

npm run build
sh workflow/lint.sh
git push

ssh tao 'bash -lc "cd ~/tao.cl && git pull && npm ci && npm run build && rsync -av --exclude .git --delete ~/tao.cl/dist/ /var/www/tao.cl"'
