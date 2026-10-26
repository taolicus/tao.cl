---
area: frontend
dependencies: [refine-page-landmarks-and-reveal-failsafe.md]
---

# Remove the dead skip link and stop Tailwind scanning prose

## Context

Two loose ends from the previous landmark pass:

- Moving `<main>` above the hero left the skip link pointing at the start of the
  page. Activating it now does nothing visible, which is worse than not offering
  it: nothing precedes `main`, so there is no repeated block to bypass and WCAG
  2.4.1 has nothing to satisfy. The `tabindex="-1"` on `main` and the `#main` id
  existed only to be that target.
- The build gained `.hidden` and `.inline` rules because Tailwind's automatic
  source detection scans every non-ignored file, including task notes and code
  comments. Utilities should come from markup, not from prose.

## Acceptance criteria

- No skip link, no `#main` id, no `tabindex` on `main`.
- The first focusable element is the first hero call to action.
- Landmarks remain `main`, `navigation` and `contentinfo`.
- The built CSS contains no utility class contributed by documentation or code
  comments. Tailwind still scans the page itself, so body copy can match a
  utility name by accident; such a rule is inert and acceptable.
- The page renders identically to the previous build apart from the removed
  control.

## Verification

- Playwright: assert the skip link is absent, tab order starts at "See selected
  work", and the landmark roles are unchanged.
- Inspect the built CSS `@layer utilities` block: it should hold `.sr-only` and
  no documentation-derived leftovers.
- Full-page screenshot comparison against the previous build at 1280x900 and
  375x812.
- `npm run build`, `npx prettier --check .` and `sh workflow/lint.sh`.

## Outcome

- Removed the skip link, the `#main` id and `tabindex="-1"`. With `<main>`
  starting at the hero there is no repeated block to bypass, so activating the
  link did nothing visible. The first focusable element is now "See selected
  work".
- Removed the `.skip-link` component rules, whose only consumer was that link.
- Scoped Tailwind's sources: `@import "tailwindcss" source(none)` plus
  `@source "../index.html"`. Documentation and code comments no longer
  contribute utilities, so `.hidden` (from a task note) and `.inline` (from a
  `main.js` comment) are gone. The utilities layer now holds `.sr-only` plus
  `.fixed`, which matches the word "fixed" in the Timestep product copy and is
  inert.
- Build CSS fell from 16.63 kB to 14.91 kB (3.88 kB to 3.61 kB gzipped), most of
  it prose-derived utilities that nothing referenced.

Verified with Playwright against the built output: no `.skip-link`, no `#main`,
`main` has no `tabindex`, landmarks remain `main`/`navigation`/`contentinfo` with
no `banner` or `region`, the first Tab lands on "See selected work", and all
`.reveal` elements reach opacity 1 after scrolling. Full-page screenshots are
byte-identical to the previous build at 1280x900 and 375x812, confirming the
removed control was invisible in the default state. `npm run build`,
`npx prettier --check .` and `sh workflow/lint.sh` pass.
