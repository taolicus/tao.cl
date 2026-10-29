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

## Outcome

`vite.config.js` was restored with its original content (registering
`@tailwindcss/vite`) on top of the five newer commits from `origin/main`, and
committed as `9183a79`. `npm run build` again emits
`dist/assets/index-DA2ZU65P.css` (14.83 kB) with no `@media source(` rule and
with `.site-nav` present; before the fix the same build produced
`index-B0mOVsuD.css` with every rule wrapped in the invalid at-rule.

Deployed with `sh scripts/deploy.sh`, which removed the broken
`index-B0mOVsuD.css` / `index-CnjltCTc.js` from the server. Verified on this
desktop browser against https://tao.cl/ with a cache-busted fetch: stylesheet
`index-DA2ZU65P.css` parses with 19 top-level rules, `html`/`body` background
`rgb(0, 0, 0)`, body font `ui-sans-serif, system-ui, sans-serif`, text white,
links `rgb(255, 0, 0)`, `.site-nav` `display: flex`, and no console errors.
The screenshot shows the intended black page with the red logo and grey nav.
The new CV link `/Tao_Zamorano_Frontend_Software_Engineer_CV.pdf` returns 200.
`sh workflow/lint.sh` passes.

Not verified: other devices/viewport widths were not checked; verification was
desktop only, since that is the environment available here.

Left coherent: the server's build copy at `/home/tao/tao.cl` (the tree that
produced the broken deploy) was pulled to `9183a79` and rebuilt, so a repeat
build there now produces working CSS.

Follow-up resolved in
[github-actions-deploy-missing-ssh-secret.md](github-actions-deploy-missing-ssh-secret.md):
the unconfigured deploy workflow was removed. Production is updated with
`scripts/deploy.sh`.
