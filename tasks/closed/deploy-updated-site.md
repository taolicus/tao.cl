# Deploy the updated static build to production

## Context

The latest portfolio changes are on `origin/main` but have not yet been
deployed to production. Production at https://tao.cl/ still serves the previous
build and does not yet include the Product Engineer CV, the 10+ year positioning
or the Hyve role.

The repository contains no deploy script, server configuration or credentials.
`README.md` documents the supported process: build locally and copy the contents
of `dist/` to the nginx web root. This step needs access to the VPS.

## Acceptance criteria

- https://tao.cl/ serves the latest Product Engineer title, description, page
  sections, Hyve role and the new CV link.
- `Tao_Zamorano_Product_Engineer_CV.pdf`, `robots.txt`, `sitemap.xml`, `og.png`
  and the WebP portfolio images all return HTTP 200 from the production domain.
- A Lighthouse run against production reports accessibility, best practices and
  SEO without failures.

## Verification

- Fetch the production HTML with a cache-busting query and compare the title,
  description and section headings with `dist/index.html`.
- Request each static asset from the production domain and check its status.
- Run Lighthouse against https://tao.cl/ on desktop.

## Outcome

Production at https://tao.cl/ was deployed using `scripts/deploy.sh`. The
remote server pulled the latest `origin/main`, built the site and rsynced
`~/tao.cl/dist/` to `/var/www/tao.cl`.

Verified that https://tao.cl/ serves the Product Engineer title, 10+ year
description, Hyve role, MyHyve commercial-work entry and the new CV link.
`Tao_Zamorano_Product_Engineer_CV.pdf`, the MyHyve WebP, `robots.txt`,
`sitemap.xml` and `og.png` all return HTTP 200 from the production domain.

Lighthouse against production reports accessibility, best practices and SEO all
at 1.0 with no failures.
