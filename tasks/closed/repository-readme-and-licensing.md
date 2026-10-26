---
area: repository
---

# Document the site architecture, local development and asset licensing

## Context

The repository has no README and no LICENSE file, while `package.json` declares
ISC. That leaves the public repository without an explanation of the site or a
clear statement about the commercial screenshots and client marks it contains.
The site is deployed as a static build behind nginx on a VPS; there is no
deployment configuration or script in this repository. Do not invent a
deployment process.

The project uses the agent-assisted workflow bootstrapped from
https://github.com/taolicus/bootstrap. Document that briefly as a working
practice, not as the subject of the repository.

## Acceptance criteria

- A README explains what the site is, the stack (Vite, Tailwind CSS, static HTML,
  a small progressive-enhancement script), and the page structure.
- Local development, build and preview commands are documented.
- Deployment is described only as far as the repository and live headers
  support: a static build served by nginx; no deploy script is present.
- The README mentions the agent-assisted workflow and its bootstrap origin in a
  short paragraph focused on how work is recorded, not on AI tooling.
- A LICENSE file matches the ISC declaration in `package.json`.
- The licence situation for portfolio screenshots, client names, logos and other
  third-party assets is stated plainly: the ISC licence covers the site code,
  not those assets.
- `package.json` description and author metadata are no longer empty.

## Verification

- Read the README as a standalone document and follow the commands from a clean
  checkout with `npm ci`.
- Check `LICENSE`, `package.json` and the README agree on the licence.
- Run `npm run build` and `sh workflow/lint.sh`.

## Outcome

Added `README.md` covering the site's purpose, stack, layout, local commands,
static nginx deployment, image/social-card generation, workflow and licence.

Added an ISC `LICENSE` matching `package.json`, with a clear statement that the
portfolio screenshots, client names, logos and campaign imagery remain the
property of their owners and are not covered by the code licence. The README
also explains why the Coca-Cola and National Women's Enterprise Week links point
to archived copies.

Filled in the `description` and `author` fields in `package.json`.

Verified `npm ci`, `npm run dev`, `npm run build`, `npm run preview` and
`sh workflow/lint.sh` in this environment. The live nginx response header was
used for the deployment description; no deployment script or server
configuration is claimed because none exists in the repository.
