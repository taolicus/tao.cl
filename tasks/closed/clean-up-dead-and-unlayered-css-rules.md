---
area: frontend
dependencies: []
---

# Remove dead hero rules and put every style in a cascade layer

## Context

`src/main.css` mixes `@layer base`, `@layer components` and unlayered rules.
Unlayered rules beat every layer regardless of specificity or order, which makes
the file read differently from how it resolves:

- `#home h1 { text-6xl }` and `#intro h1 { text-9xl }` have equal specificity
  (1,0,1). `#intro` is unlayered, so it always wins; the heading renders at
  128px on desktop and 60px in portrait, and the `text-6xl` never applies.
- `#home > p`, `#home > p:nth-of-type(1)`, `#home > p:nth-of-type(2)` and
  `#home > div:last-child a` match no elements. `<header id="home">` contains
  `#intro` and `#logo-container` only.
- The commented-out `#home` block at lines 66-76 documents a layout that no
  longer exists.
- `#tao` is declared in both `@layer components` and unlayered code, so neither
  declaration shows the effective rule.

The tail of the file (`#tao`/`#signature` animation, `header`, `#intro`,
`#logo-container`, orientation media queries) is unlayered. Moving it into the
layer must keep the animation order intact: the base `spin` rule precedes the
portrait and landscape overrides, and layering them together preserves that
order. Leaving the base animation unlayered while layering the overrides would
make the base win.

## Acceptance criteria

- Dead selectors and the commented-out block are removed.
- Every rule except the reduced-motion block lives in `@layer base` or
  `@layer components`; `prefers-reduced-motion` stays unlayered so it outranks
  everything.
- Rendered output is unchanged: heading size, logo geometry, animation name,
  grid layout and colours all match the previous computed values.
- `#tao` has one source of layout declarations.

## Verification

- Capture computed styles before and after at 1440x900, 375x667 and 667x375:
  `#intro h1` font-size, `#logo-container` and `#tao` rectangles,
  `#tao` animation-name, `.work-item` grid-template-columns, link and muted
  colours.
- `tests/styles.spec.js` passes unchanged.
- `npm run build`, `npm test`, `npx prettier --check .` and
  `sh workflow/lint.sh` pass.

## Outcome

Removed the commented hero block, `#home h1`, `#home > p`, both
`#home > p:nth-of-type()` rules and `#home > div:last-child`. Also removed two
rules that were dead for the same reason but not obvious from reading:

- `#tao { h-auto w-full }` was always overridden by the unconditional
  `#tao` rule later in the file (`h-svh w-auto`), so it never applied.
- `#signature { h-auto w-12 }` duplicated `footer & img` exactly.

Moved the logo animation, `header`, `#intro`, `#logo-container`, `#tao` and both
orientation media queries into `@layer components`, in their existing order so
`spin` still precedes `spin-portrait` and `spin-landscape`. `.js .reveal` and
the reduced-motion block remain unlayered.

Verified by computed-style comparison before and after; every value is
identical:

| Measurement           | 1440x900            | 667x375         | 375x667          |
| --------------------- | ------------------- | --------------- | ---------------- |
| `#intro h1` font-size | 128px               | 128px           | 60px             |
| `#logo-container` box | 649,0 776x900       | 428,0 224x375   | 0,0 360x291      |
| `#tao` box            | 563,-112 1125x1125  | 293,-47 469x469 | -36,-117 396x396 |
| `#tao` animation      | spin-landscape      | spin-landscape  | spin-portrait    |
| `.work-item` columns  | 453.195px 370.805px | 612px           | 320px            |

The heading now has a single effective rule instead of a layered one losing to
an unlayered one. Build output went from 16.00 kB to 15.89 kB. `npm test`
passes (9 passed, 1 skipped).
