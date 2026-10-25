# Deploy the updated static build to production

## Context

The portfolio changes are committed and pushed to `origin/main` through
`c865829`. Production at https://tao.cl/ still serves the September 2025 build:
the page title is the old "Full-Stack Web Developer" version and nginx reports
`Last-Modified: Fri, 05 Sep 2025`.

The repository contains no deploy script, server configuration or credentials.
`README.md` documents the supported process: build locally and copy the contents
of `dist/` to the nginx web root. This step needs access to the VPS.

## Acceptance criteria

- https://tao.cl/ serves the new Product Engineer title, description and page
  sections.
- `robots.txt`, `sitemap.xml`, `og.png` and the WebP portfolio images all return
  HTTP 200 from the production domain.
- A Lighthouse run against production reports accessibility, best practices and
  SEO without failures.

## Verification

- Fetch the production HTML with a cache-busting query and compare the title,
  description and section headings with `dist/index.html`.
- Request each static asset from the production domain and check its status.
- Run Lighthouse against https://tao.cl/ on desktop.

## Outcome

Filled in when the task is closed.
