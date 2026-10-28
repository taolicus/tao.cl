---
# area: build
# dependencies: []
---

# Restore the Tailwind build config so production styles render again

## Context

Production (tao.cl) serves a stylesheet that begins with `@media source(none)`
wrapping every rule, so browsers drop all of it: the page renders unstyled on a
white background in Times, with default blue links.

The cause is known. Commit `931971e` ("Build and add dist") deleted the
tracked `vite.config.js`, which is what registers `@tailwindcss/vite`. Without
that plugin, `vite build` inlines `@import "tailwindcss" source(none);` as if
`source(none)` were a media condition, producing the invalid at-rule and no
utility CSS at all. Building `origin/main` with and without the config
reproduces the deployed asset names exactly (`index-B0mOVsuD.css`,
`index-CnjltCTc.js`).

`origin/main` is ahead of this checkout by five commits, including the job
title change and the new CV file that production is meant to serve, so the fix
must build on top of them rather than replace their content.

## Acceptance criteria

- `vite.config.js` is tracked again and registers `@tailwindcss/vite`.
- `npm run build` emits a stylesheet with no `@media source(none)` and with the
  site's own rules present.
- Production serves that stylesheet and the page renders styled: black
  background, sans-serif type, red links, site navigation laid out.

## Verification

- `git ls-files vite.config.js` lists the file; `npm run build` succeeds.
- `grep` the built CSS in `dist/assets/` for `@media source(` (must be absent)
  and for `.site-nav` (must be present).
- Load https://tao.cl/ and read computed styles (background, font-family) and a
  screenshot, on this desktop browser.
- `sh workflow/lint.sh`.

## Outcome
