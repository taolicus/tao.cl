---
area: frontend
---

# Make the hero page content, reduce landmark noise and fail open when the reveal script breaks

## Context

Reviewing the rendered markup found four confirmed problems rather than
hypothetical ones:

- `<header>` is a direct child of `<body>`, so it maps to the `banner`
  landmark. The h1, the two intro paragraphs and the three call-to-action links
  therefore read as site chrome rather than page content, and "Skip to
  content" jumps past the introduction.
- Every `<section>` carries `aria-labelledby`, which promotes it to a `region`
  landmark. On a one-page site that produces banner, navigation, main, four
  regions and contentinfo, more landmark noise than the page needs when
  `.site-nav` already covers in-page movement.
- The inline `onerror` on the module script only fires when the file fails to
  fetch. If `src/main.js` loads and then throws before the observer is wired
  up, `.js` stays on `<html>` and `.js .reveal { opacity: 0 }` keeps every
  project and product invisible.
- Small markup defects: the decorative arrows in `.visit` are read out by
  assistive technology, the contact section holds a commented-out paragraph,
  and the hero's nested wrappers are unexplained.

Class names are deliberately left alone: the structural CSS selectors are out of
scope here.

## Acceptance criteria

- `<header id="home">` is a descendant of `<main>` and no `banner` landmark
  exists.
- No `<section>` is an accessible `region`; the h2 ids that only existed for
  `aria-labelledby` are gone.
- If the reveal module never reports ready, every `.reveal` element is visible
  within two seconds without JavaScript needing to run.
- The `.visit` arrows are hidden from the accessibility tree while remaining
  visible on screen.
- The contact section contains no commented-out markup, and the hero wrappers
  are documented in place.
- The page renders identically at desktop and 375px widths.

## Verification

- Playwright against the production preview: assert `main#main header#home`
  exists, `getByRole("banner")` and `getByRole("region")` count zero, and the
  accessible name of each project link excludes the arrow.
- Block `src/main.js` with a route abort, wait two seconds and assert every
  `.reveal` computes to opacity 1.
- Compare screenshots before and after at desktop and 375px.
- `npm run build`, `npx prettier --check .` and `sh workflow/lint.sh`.

## Outcome

- Moved `<main id="main" tabindex="-1">` above `<header id="home">`. A `<header>`
  inside `<main>` is generic, so the hero is now page content and no `banner`
  landmark exists. Everything else stayed where it was: the section nav still
  renders below the hero, and all `#home` structural CSS still matches. The skip
  link still targets and focuses `main`, but with nothing preceding it the jump
  is now minimal; it is retained as a consistent affordance rather than removed.
- Dropped `aria-labelledby` from the four sections and removed the h2 ids that
  only existed to support it. The accessible landmark set is now `main`,
  `navigation` and `contentinfo`; section ids used as anchors are unchanged.
- Replaced the inline `onerror` on the module script with a 1.5s failsafe in the
  head script. It drops `.js` unless `src/main.js` sets `js-ready`, which it now
  does as its last statement. This covers a 404, a parse error and a thrown
  exception, and does not depend on an inline event handler. A late module that
  runs after the timeout leaves the content visible instead of re-hiding it.
- Wrapped the four `.visit` arrows in `aria-hidden="true"` spans. The glyph still
  renders; link names remain "Visit the site (opens in a new tab)".
- Removed the commented-out paragraph in the contact section and documented the
  hero's two wrappers in place.
- Deliberately unchanged: the whole-card link structure, the structural CSS
  selectors, the JSON-LD, and the `sr-only` utility.

Verified with Playwright against `vite preview` (port 4189, fresh build):
`main#main > header#home` present, zero `banner` and `region` roles, one each of
`main`/`navigation`/`contentinfo`, all four anchor targets present, all four
project link names free of the arrow but still carrying the new-tab hint, and all
seven `.reveal` elements at opacity 1 after scrolling. At both 1280x900 and
375x812 there is no horizontal overflow and `#home` sits at the top at full
viewport height. The failsafe was exercised three ways — module aborted, module
throwing on parse, module delayed by 2s — and in every case `.js` was dropped and
every reveal was visible, with no re-hide when the delayed module eventually ran.
A before/after render comparison was run by building `HEAD` in a temporary
worktree and capturing full-page screenshots of both builds with animations
disabled: the PNGs are byte-identical at 1280x900 and 375x812, so the render did
not change. `npm run build`, `npx prettier --check .` and `sh workflow/lint.sh`
pass.

One inert side effect: the built CSS gained `.hidden` and `.inline` rules.
Tailwind scans every non-ignored file, so the word "hidden" in this task document
and "inline" in the new `main.js` comment become utility candidates. Neither
class appears in the markup, so nothing changes on screen. Scoping Tailwind's
sources was left alone as out of scope.
