# tao.cl

Personal portfolio for [Tao Zamorano](https://tao.cl/), a London-based Product
Engineer with a commercial background in frontend and backend web development.

The site is a single, statically built page. It presents selected commercial
work, independent products, an approach to building software and a short
career background, then links to the CV, GitHub, LinkedIn and contact details.

## Stack

- **Vite** for local development and the production build.
- **Tailwind CSS 4** through the official Vite plugin.
- **Plain HTML and CSS**, with a small vanilla JavaScript module for the scroll
  reveal.
- **No frontend framework and no runtime dependencies.**

The page is deliberately progressive: content is visible without JavaScript,
the reveal effect only hides content once the script has loaded, and motion is
removed when `prefers-reduced-motion` is set. Portfolio screenshots are served
as lazy-loaded WebP with reserved dimensions.

## Project layout

```text
index.html              The page content and metadata
src/main.css            Tailwind import, link styles, layout and motion
src/main.js             Scroll reveal with an IntersectionObserver
src/img/                Logo, social-card source and portfolio screenshots
public/                 Current CV, robots.txt, sitemap.xml and social image
scripts/                Deployment helpers
workflow/               Agent-assisted work rules, templates and lint
issues/, tasks/, features/
                        Work items and durable project notes
```

## Local development

Requires Node.js and npm.

```sh
npm ci
npm run dev
```

Vite serves the site at `http://localhost:5173/` and reloads on changes.

```sh
npm run build
npm run preview
```

`npm run build` writes the static site to `dist/`; `npm run preview` serves that
build locally. The only build output that should be published is the contents of
`dist/`.

## Deployment

The live site is a static build served by nginx from a VPS; the response headers
at <https://tao.cl/> show `server: nginx/1.18.0 (Ubuntu)`. There is no
server-side component to run.

A deploy is performed with:

```sh
sh scripts/deploy.sh
```

The script builds the site, runs `sh workflow/lint.sh`, pushes the current
branch, then SSHs to the remote server to pull the repository, build there and
rsync `~/tao.cl/dist/` to `/var/www/tao.cl`. It assumes an SSH host alias
`tao` is configured locally and the remote server has the repository clone at
`~/tao.cl`.

`robots.txt` and `sitemap.xml` are copied from `public/` and assume the site is
served from `https://tao.cl/`. The social image at `public/og.png` was rendered
from `src/img/og.svg` with `rsvg-convert -w 1200 -h 630`.

## Working method

The repository uses an agent-assisted development workflow bootstrapped from
[taolicus/bootstrap](https://github.com/taolicus/bootstrap). Work is recorded as
files under `issues/`, `tasks/open/`, `tasks/closed/` and `features/`, so the
reasoning and the outcome remain inspectable after the change. `sh
workflow/lint.sh` checks the work-item invariants, and completed tasks record
what was verified and what was not.

## Licence

The site code is released under the ISC licence; see [LICENSE](LICENSE).

The ISC licence does **not** cover the portfolio screenshots, client names,
logos, campaign imagery or other third-party marks shown on the page. Those
remain the property of their respective owners and are included only to
describe work Tao delivered. Coca-Cola Share a Coke and National Women's
Enterprise Week link to archived copies because the original live pages are no
longer available.
