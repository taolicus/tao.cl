---
area: frontend
---

# The landscape phone hero overflows the viewport

## What was observed

At 667x375, the current hero puts `#intro h1` at `top: -62.5px` and the page
nav at `bottom: 437.5px`, while the header is 375px tall. The heading is clipped
off the top of the screen.

The rotated `#tao` logo also extends past the right edge. Before the root
`overflow-x: clip` added in `fix-mobile-hero-rendering.md`, that produced
`documentElement.scrollWidth` values of 793px in Chromium and 870px in Firefox
against a 667px viewport. The root clip now keeps page-level scroll width at the
viewport, but the vertical clipping remains.

This is separate from the portrait text-autosizing issue; it reproduces in both
browsers independently of that change.

## Open questions

- Should the landscape phone hero grow vertically and scroll, as the portrait
  hero now does, or should the copy scale down to fit one screen?
- How much of the logo's right-edge bleed is intentional, and should the header
  clip it horizontally without clipping the logo's vertical bleed?

## What would resolve it

Measure the visible logo extent and desktop composition, then choose a
landscape-phone layout that keeps the heading, copy, links and nav inside the
viewport without changing desktop. Add a Playwright viewport case for 667x375.

## Affects

`src/main.css` hero rules, `tests/styles.spec.js`, and the viewport notes in
`features/styling-conventions.md`.
