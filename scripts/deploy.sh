#!/bin/sh
# Deploy tao.cl to production.
#
# Assumes an SSH host alias "tao" is configured locally and the remote server's
# nginx web root is at /var/www/tao.cl. The repository itself does not need to
# live on the server: this script builds locally and rsyncs only dist/.
set -e

cd "$(dirname "$0")/.."

npm run build
sh workflow/lint.sh
git push

# Deploy only the built static site.
rsync -av --delete dist/ tao:/var/www/tao.cl/

# Remove the old server-side repository clone and the obsolete remote script.
ssh tao 'rm -rf ~/tao.cl ~/deploy-tao-cl.sh'
