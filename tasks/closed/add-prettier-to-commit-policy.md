---
area: workflow
dependencies: [move-tailwind-utilities-to-css.md]
---

# Add Prettier formatting to the commit policy

## Context

VS Code runs Prettier on save, which can leave formatting-only changes in the
working tree. The commit policy should require running Prettier before a commit
so that formatting is always applied and does not appear as a separate,
unexpected diff later.

## Acceptance criteria

- Update `workflow/commit-policy.md` to require Prettier formatting before
  committing.
- Run Prettier across the repository and commit any resulting formatting
  changes.
- Push the updated policy and formatting commit.

## Verification

- `workflow/commit-policy.md` mentions Prettier.
- `npx prettier --check .` passes.
- `sh workflow/lint.sh` passes.
- The working tree is clean after commit and push.

## Outcome

Updated `workflow/commit-policy.md` to require running Prettier on changed files
before staging, so formatting matches the project's configuration and is not
left as an uncommitted diff after an editor save.

Ran `npx prettier --write .` across the repository, which reformatted
`index.html`, `src/main.css`, `prettier.config.js`, `AGENTS.md`, several closed
task files and workflow files. Verified the build, lint and Prettier check all
pass, and that the mobile layout still has no horizontal overflow.
