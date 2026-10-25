---
area: devops
dependencies: [add-production-deployment-script.md]
---

# Deploy only the local build, removing the remote repository

## Context

The current `scripts/deploy.sh` builds locally for verification but then relies
on a repository clone at `~/tao.cl` on the VPS, where it runs `git pull`,
`npm ci`, `npm run build` and `rsync`s the resulting `dist/`. The user wants the
repo removed from the remote server: build locally, deploy only the built
static site, and clean up the remote clone afterwards.

## Acceptance criteria

- `scripts/deploy.sh` builds locally, lints, pushes, and deploys only `dist/`
  to `/var/www/tao.cl`.
- After a successful deploy, the remote `~/tao.cl` repository clone and the
  obsolete `~/deploy-tao-cl.sh` script are removed.
- `README.md` documents the new workflow.
- Run the updated script, verify production, and close the deploy task.

## Verification

- `sh scripts/deploy.sh` completes without errors.
- Production at https://tao.cl/ serves the latest content and static assets.
- SSHing to `tao` shows no `~/tao.cl` directory and no `~/deploy-tao-cl.sh`.
- Lighthouse against production reports no regressions.

## Outcome

Rewrote `scripts/deploy.sh` to build locally and deploy only the resulting
`dist/` directory:

```sh
npm run build
sh workflow/lint.sh
git push
rsync -av --delete dist/ tao:/var/www/tao.cl/
ssh tao 'rm -rf ~/tao.cl ~/deploy-tao-cl.sh'
```

The remote repository clone and the obsolete `~/deploy-tao-cl.sh` are now
removed after a successful deploy. Updated `README.md` to document the new
workflow.

Ran the updated script successfully. Production at https://tao.cl/ continues to
serve the latest content, and the CV PDF, MyHyve WebP, `robots.txt`,
`sitemap.xml` and `og.png` all return HTTP 200. Verified on the server that
`~/tao.cl` and `~/deploy-tao-cl.sh` no longer exist.

Lighthouse against production reports performance, accessibility, best
practices and SEO all at 1.0.
