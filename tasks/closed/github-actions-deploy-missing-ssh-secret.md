---
area: ci
---

# Remove the unconfigured GitHub Actions deploy workflow

## Context

`.github/workflows/deploy.yml` (added in `d8a4c87`) ran on every push to
`main`: lint, build, then rsync `dist/` to the server. Every run failed at
the ssh-agent step because `SSH_PRIVATE_KEY` was empty. `gh secret list` shows
no repository secrets, so `SSH_HOST` and `SSH_USER` are unset as well.

Production is deployed with `scripts/deploy.sh`, which uses a local SSH host
alias `tao`. Putting a private key into GitHub secrets is not a quick fix and
is not the path this repository uses.

## Acceptance criteria

- The failing workflow is gone, so pushes to `main` no longer start a red
  Actions run.
- The recorded deploy path remains `scripts/deploy.sh`.

## Verification

- `.github/workflows/deploy.yml` is removed.
- `sh workflow/lint.sh` passes.

## Outcome

Removed `.github/workflows/deploy.yml`. Fifteen consecutive "Build and Deploy"
runs on `main`, from `40487520444` through `40963696672`, failed in the Setup
SSH step with an empty `ssh-private-key`. Lint and build in those runs
succeeded; only the unconfigured deploy failed. No repository secrets exist,
so the workflow cannot be pointed at a different secret name.

Did not add `SSH_PRIVATE_KEY`, `SSH_HOST`, or `SSH_USER`. Deploys stay on
`scripts/deploy.sh`. Not verified: a post-removal push was not waited on to
confirm Actions stays idle; the workflow file is what schedules those runs, and
it is no longer in the tree.
