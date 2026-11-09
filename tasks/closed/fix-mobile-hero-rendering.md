---
area: frontend
---

# Make the mobile hero render consistently in Firefox and Chrome

## Context

On Android, Firefox renders the homepage hero text larger than Chrome. Firefox
Android applies text inflation on top of the layout, while Chrome honours the
`-webkit-text-size-adjust: 100%` declaration that Tailwind's preflight emits.
Preflight does not emit the unprefixed `text-size-adjust` property, so Firefox
keeps inflating the hero copy. The inflated block is taller than the current
bottom-anchored portrait hero, so it pushes the heading up into the decorative
red logo. The same layout also overlaps at short portrait viewports in Chrome.

The viewport meta tag is already `width=device-width, initial-scale=1.0`.

## Acceptance criteria

- The root element sets both prefixed and unprefixed `text-size-adjust: 100%`.
- The viewport meta tag keeps `width=device-width` and does not disable zoom.
- Portrait hero text clears the decorative logo at 320x568, 375x667, 390x844
  and 412x915.
- Desktop, tablet and tall portrait layouts keep their existing composition.
- No horizontal page scroll at 320, 375 or 1440 pixels wide.
- Existing checks and tests pass, and production serves the fix.

## Verification

- Build the site and measure hero geometry in Playwright Chromium at the mobile
  viewports above and at 1440x900.
- Run `npm test` and `sh workflow/lint.sh` where the environment supports the
  browser binaries.
- Fetch the deployed HTML and hashed CSS after `sh scripts/deploy.sh` and check
  that they contain the new rule.

## Outcome

Root cause was twofold. Tailwind's preflight emits only
`-webkit-text-size-adjust: 100%`; Firefox Android ignores that prefix and keeps
inflating text, while Chrome heeds it. The portrait hero also anchored `#intro`
to the bottom of a fixed-height header with the absolutely positioned, spinning
logo behind it, so a taller text block pushed the heading up into the logo. The
same hero geometry let the logo extend the document scroll width past the
viewport despite `body { overflow-x: hidden }`.

Changes:

- `src/main.css`: `html` now sets both `-webkit-text-size-adjust` and
  `text-size-adjust` to `100%`, and clips horizontal overflow at the root so the
  rotating logo cannot widen the document. In portrait, `header` is a two-row
  grid with `minmax(34svh, 1fr)` reserved for the logo and `#intro` in the second
  row; the header grows when the copy is taller than the viewport.
- `tests/styles.spec.js`: updated the stale hero scale assertion to the current
  `text-7xl` desktop size, replaced the removed `#logo-container` test with
  checks for both text-size-adjust declarations, the zoom-safe viewport, and
  portrait hero clearance at 320, 375, 390 and 412px. Overflow coverage now
  includes 390 and 412px.
- `features/styling-conventions.md`: documented text autosizing, the portrait
  grid and root overflow clipping.
- `issues/mobile-landscape-hero-overflows.md`: recorded the separate landscape
  phone issue discovered during verification.

Verification performed on a remote Ubuntu host with Playwright Chromium 156 and
Firefox 157 at 320x568, 360x800, 375x667, 390x844, 412x915, 768x1024, 1024x768,
1440x900 and 844x390:

- Before: at 375x667 the heading started at y=179 while the visible logo
  reached about y=226; at 320x568 the heading started at y=32 and was hidden
  behind the logo. After: heading tops are 225 at 320px, 259 at 375px, 392 at
  390px and 463 at 412px, each below the logo's visible extent. The 390px and
  412px compositions are unchanged.
- Desktop and tablet heading positions are unchanged: y=288 at 1440x900, y=204
  at 1024x768 and y=716 at 768x1024, with 72px/72px/60px heading sizes.
- Root scroll width now equals client width at every tested size. Vertical
  scrolling was checked to the end of the page in both engines.
- `sh workflow/lint.sh` and Prettier pass. The full Chromium suite passes with
  `--timeout=120000` (32 passed, 1 external-link test skipped). The default
  30-second run timed out on two homepage link tests on the constrained remote
  host; isolated requests to all 15 internal homepage assets completed in under
  0.12 seconds each.
- `sh scripts/deploy.sh` built, pushed `95e02eb` and deployed `dist/`. The live
  HTML and CSS SHA-256 match the local build; the live CSS contains both
  text-size-adjust declarations, the portrait grid and `overflow-x: clip`.
  Live Playwright measurements match the local candidate.

Limitations: no Firefox Android or Android Chrome automation was available on
the device, so Android text inflation was not reproduced directly. The fix is
verified through the emitted CSS, Firefox/Chromium desktop engines at mobile
viewport sizes, and the documented Firefox Android property support. The
Playwright Firefox test-runner fixture timed out navigating on the remote host
even for a one-test smoke check, so cross-browser evidence comes from the
Playwright Firefox API with the same pages and viewports, not the test runner.
The landscape phone hero still clips vertically and remains open as a separate
issue.
