---
area: devops
dependencies: [update-cv-and-add-hyve-experience.md, add-myhyve-commercial-work-entry.md]
---

# Add a production deployment script to the repository

## Context

The live site runs on a VPS served by nginx. The deployment procedure currently
lives only on the server as `~/deploy-tao-cl.sh`, which pulls the repo, builds,
and rsyncs `~/tao.cl/dist/` to `/var/www/tao.cl`. The agent needs a way to run
this procedure from the local repository after completing work.

## Acceptance criteria

- Inspect the server's existing `deploy-tao-cl.sh`.
- Add a runnable script to this repository that performs the same deployment
  after local build and lint checks.
- The script must not embed credentials or host details beyond the existing
  `tao` SSH host alias.
- Document the script in `README.md`.
- Run the script to deploy the latest changes and verify production.

## Verification

- Confirm `scripts/deploy.sh` is executable and passes `sh -n`.
- Confirm `npm run build`, `sh workflow/lint.sh` and the remote deploy complete
  without errors.
- Fetch https://tao.cl/ and confirm the latest content (Hyve role, new CV,
  MyHyve work entry) is served.
- Run Lighthouse against production and confirm no regressions.

## Outcome

Inspected the server's existing `~/deploy-tao-cl.sh`, which runs `git pull`,
`npm i`, `npm run build` and `rsync`s `~/tao.cl/dist/` to `/var/www/tao.cl`.

Added `scripts/deploy.sh` to the repository. The script:

1. Builds the site locally (`npm run build`).
2. Runs `sh workflow/lint.sh`.
3. Pushes the current branch.
4. SSHs to the `tao` host and runs the remote procedure inside a login shell
   (`bash -lc ...`) so the Volta-managed `npm` is available, then rsyncs the
   built `dist/` to `/var/www/tao.cl`.

Documented the script in `README.md` under the Deployment section and added
`scripts/` to the project layout.

Ran the script successfully. Production at https://tao.cl/ now serves the
latest content: 10+ year positioning, the Product Engineer CV, the Hyve
Background role and the MyHyve commercial-work entry. The CV PDF, new WebP
asset, `robots.txt`, `sitemap.xml` and `og.png` all return 200.

Lighthouse against production reports performance, accessibility, best
practices and SEO all at 1.0.
