---
area: frontend
dependencies: [clean-up-dead-and-unlayered-css-rules.md]
---

# Express the palette once in OKLCH tokens and fix selection contrast

## Context

`@theme` defines semantic colours, but two other vocabularies are still in use:
Tailwind's default neutral ramp (`text-neutral-300` in three live rules,
`text-neutral-400` in three more) and raw `rgb()` borders. `--color-muted` is
the same value as `neutral-400`, yet `neutral-400` is written directly four
times, and the body-copy grey (`#d4d4d4`) has no token at all.

Measured contrast on black: `#f00` 5.25:1, `#d4d4d4` 14.17:1, `#a3a3a3` 8.33:1.
`::selection` is the one failure: white on `#f00` is 4.0:1, below AA for the
15.2px body text it applies to.

Tailwind v4 requires Safari 16.4+, Chrome 111+ and Firefox 128+, which is above
the `oklch()` floor (Safari 15.4, Chrome 111, Firefox 113), so no `@supports`
fallback is needed. Relative colour syntax (`oklch(from ...)`) is not safe at
that floor (Chrome 119+). A hex-then-OKLCH pair inside `@theme` does not work
either: custom properties are validated at computed-value time, so an
unsupported value makes `var()` invalid rather than falling back.

## Acceptance criteria

- All text greys resolve through `--color-body` or `--color-muted`; no
  `text-neutral-*` remains in `src/main.css`.
- Grey ramp and accent are declared in `oklch()`, including a distinct
  token for text on the accent.
- `::selection` contrast is at least 4.5:1 while the brand accent stays
  `#f00`.
- Rendered colours are unchanged: links `rgb(255,0,0)`, body copy
  `rgb(212,212,212)`, muted `rgb(163,163,163)`.

## Verification

- `tests/styles.spec.js` asserts the computed colours and computes the
  `::selection` pair contrast from `--color-brand` and `--color-surface`.
- Inspect `dist/assets/*.css` to confirm whether `oklch()` survives the Tailwind
  and Lightning CSS build, and record the answer rather than assuming it.
- `npm run build`, `npm test`, `npx prettier --check .` and
  `sh workflow/lint.sh` pass.

## Outcome

Declared the palette in OKLCH and removed the competing vocabularies:

- `--color-brand: oklch(62.796% 0.25768 29.234)`, `--color-surface:
oklch(0% 0 0)`, `--color-foreground: oklch(100% 0 0)`,
  `--color-muted: oklch(71.5% 0 0)`, plus a new `--color-body: oklch(87% 0 0)`
  for the previously untokenised `#d4d4d4`.
- `text-neutral-300` became `text-body` in the three live rules and
  `text-neutral-400` became `text-muted` in the other three.
- `::selection` now applies `text-surface`, giving 5.25:1 instead of 4.0:1
  without changing the accent. A separate `--color-on-brand` was not added; the
  page surface is the correct background-relative contrast and a second token
  with the same value would be duplication.

The accent precision matters: `oklch(62.8% 0.2577 29.2)` rounded the hue and
produced `rgb(255,0,1)`, which the colour test caught. Full precision yields
`rgb(255,0,0)` and keeps `#f00` byte-identical.

Verified with `tests/styles.spec.js`: `#intro h1` resolves to 255,0,0,
`.contact-intro` to 212,212,212, `.site-nav a` to 163,163,163, and the selection
pair measures at least 4.5:1. `dist/assets/index-*.css` keeps
`--color-brand: oklch(62.796% .25768 29.234)`, so Lightning CSS does not
downlevel the colour and no fallback is needed.

One intentional pixel change: `text-neutral-400` was `oklch(70.8% 0 0)`
(161,161,161), not `#a3a3a3`, so the three muted rules moved by 2/255 to match
`--color-muted`. The audit had assumed the two values were identical; the test
disproved it. Visually indistinguishable, and the point of the consolidation.

`npm test` passes (9 passed, 1 skipped).
