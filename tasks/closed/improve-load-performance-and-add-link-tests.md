---
area: frontend
---

# Improve load performance and add broken-link tests

## Context

A review of the built site and production headers found three avoidable costs:
CSS, JavaScript and SVG were served uncompressed; hashed assets had no explicit
cache policy; and the portfolio screenshots were 1400–1600px wide while
rendering at about 370px. The hero CV link was already fixed, but there was no
automated check for that class of broken link.

## Acceptance criteria

- nginx compresses CSS, JavaScript, SVG and XML, and sends immutable caching for
  content-hashed `/assets/` files plus revalidation for the HTML document.
- Portfolio images use committed 800w and 1200w WebP variants through
  `srcset`/`sizes`, with the original as the largest candidate.
- `npm test` builds the site and fails when an internal link, asset, `srcset`
  candidate or in-page anchor does not resolve.
- Production serves the new headers and image variants.

## Verification

- Run `npm test` and `sh workflow/lint.sh`.
- Fetch production headers with `curl` and confirm compression and cache
  policies.
- Load the deployed page at desktop and mobile widths and confirm the browser
  selects an appropriate `srcset` candidate.

## Outcome

- Added `gzip_types` and `gzip_vary` to the `tao.cl` nginx vhost. CSS, JS, SVG
  and XML now compress on the wire; HTML was already compressed.
- Added `Cache-Control: public, max-age=31536000, immutable` for `/assets/` and
  `Cache-Control: no-cache` for the HTML document. The previous vhost is backed
  up on the server as `/etc/nginx/sites-available/tao.cl.bak.20261103180459`.
- Added committed 800w and 1200w WebP variants for the three portfolio
  screenshots and wired them through `srcset`/`sizes`. Generated with
  `scripts/generate-responsive-images.mjs`, which uses Playwright Chromium and
  is exposed as `npm run images`.
- Added a Playwright suite (`tests/links.spec.js`, `playwright.config.js`) that
  builds the site and checks internal links, assets, `srcset` candidates and
  in-page anchors. Third-party checks are opt-in with
  `CHECK_EXTERNAL_LINKS=1`.

Verified with `npm test` (2 passed, external test skipped by default),
`sh workflow/lint.sh` (ok), and the deploy script. Production headers now show
`content-encoding: gzip` and `vary: Accept-Encoding` for text assets,
`cache-control: public, max-age=31536000, immutable` for `/assets/`, and
`cache-control: no-cache` for the document.

The three screenshots transferred 265,012 bytes before the change. Production
Playwright checks at 390px wide selected the 800w variants at DPR 2
(107,644 bytes total) and the 1200w variants at DPR 3 (171,866 bytes total). A
live crawl of all 14 internal link and asset paths found no failures.

Lighthouse was not re-run; the expected gains are byte and repeat-visit
improvements rather than a score change, since the performance score was
already at 1.0.
