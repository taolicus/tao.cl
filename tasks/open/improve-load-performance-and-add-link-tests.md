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

Filled in when the task is closed.
