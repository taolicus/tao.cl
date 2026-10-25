---
area: devops
dependencies: [deploy-only-local-dist.md]
---

# Remove the one-time cleanup from the deploy script

## Context

`scripts/deploy.sh` currently deletes `~/tao.cl` and `~/deploy-tao-cl.sh` from
the remote server after every deploy. That cleanup was only needed once, after
the switch to local builds. Keeping it in the script is unnecessary and risks
unexpected data loss if the remote layout ever changes or the directory is
recreated for another purpose.

## Acceptance criteria

- Remove the `rm -rf ~/tao.cl ~/deploy-tao-cl.sh` cleanup step from
  `scripts/deploy.sh`.
- Update `README.md` so it no longer describes the cleanup as part of the
  routine workflow.
- Run the updated script to confirm deployment still works.

## Verification

- `sh scripts/deploy.sh` completes without errors and does not touch `~/tao.cl`
  or `~/deploy-tao-cl.sh`.
- Production at https://tao.cl/ still serves the latest content.
- `sh workflow/lint.sh` passes.

## Outcome

Removed the `rm -rf ~/tao.cl ~/deploy-tao-cl.sh` cleanup step from
`scripts/deploy.sh`. The one-time cleanup had already been performed, so it no
longer needs to run on every deploy. Updated `README.md` to remove the mention
of the cleanup from the routine workflow.

Ran the updated `scripts/deploy.sh` successfully; it builds, lints, pushes and
rsyncs `dist/` without touching the remote home directory. Production at
https://tao.cl/ continues to serve the latest content.
