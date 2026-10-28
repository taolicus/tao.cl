---
# area: ci
# dependencies: []
---

# GitHub Actions deploy fails because the SSH secret is empty

## What was observed

`.github/workflows/deploy.yml` (added in `d8a4c87`) is the declared deploy
path: on every push to `main` it lints, builds, and rsyncs `dist/` to the
server. All three runs so far failed in about 13 seconds at the ssh-agent step:

> The ssh-private-key argument is empty. Maybe the secret has not been
> configured, or you are using a wrong secret name in your workflow file.

Runs: `40570376248`, `40488458405`, `4048750444` on
`taolicus/tao.cl`. Because CI never deploys, production has been updated by
hand instead — on 2026-10-28 the build came from a clone at `/home/tao/tao.cl`
on the server, which is also what deployed the unstyled site (see
`tasks/open/restore-tailwind-build-config.md`).

## What would resolve it

Add the `SSH_PRIVATE_KEY` (and `SSH_HOST`, `SSH_USER`) repository secrets so
the workflow can authenticate, or remove the workflow if manual deploys from
`scripts/deploy.sh` are the intended path.

## Affects

`.github/workflows/deploy.yml`, GitHub repository settings, and how
production gets updated.
