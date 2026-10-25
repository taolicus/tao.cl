---
area: frontend
dependencies: [product-engineer-positioning.md, independent-products.md]
---

# Fix accessibility, progressive enhancement and resilience issues in the page

## Context

Baseline inspection found confirmed problems rather than hypothetical ones:

- The page has two `h1` elements (one wrapping an image) and uses `h2` for what
  are visually project headings. Heading order does not describe the content.
- `.reveal { opacity: 0 }` hides every project when JavaScript is unavailable.
  The reveal script is the only thing that makes them visible.
- Links have no visible focus style beyond the browser default being overridden
  by the reset; the computed outline is `none`.
- `.year` is `#666` on black, a contrast ratio of about 3.7:1, below 4.5:1 for
  normal text.
- The spinning logo ignores `prefers-reduced-motion`.
- Project images have no dimensions, so the page shifts as they load, and they
  are not lazy-loaded.
- External links open in a new tab without `rel="noopener"` or any indication.
- No meta description; `/robots.txt` is not served by the dev fallback.
- Lighthouse baseline: SEO 0.67 (missing meta description, invalid robots.txt).

## Acceptance criteria

- One `h1`; sections use `h2` and projects use `h3`; landmarks are semantic
  (`header`, `nav`, `main`, `footer`) and sections are labelled.
- A keyboard user can see focus on every interactive element, including the
  logo link and project links.
- With JavaScript disabled, all page content is visible and readable.
- `prefers-reduced-motion: reduce` stops the logo rotation and reveal motion.
- Normal text meets WCAG AA contrast (4.5:1); the year/meta text is included.
- Images reserve their aspect ratio before loading; below-the-fold images are
  lazy-loaded.
- External links are safe (`rel="noopener"`) and screen-reader users are told
  when a link opens a new tab.
- The page does not overflow horizontally at 375px and remains usable at desktop
  width.
- `robots.txt` and a sitemap are served; Lighthouse SEO no longer reports the
  meta-description or robots failures.

## Verification

- Browser DOM checks: heading outline, computed focus styles, computed contrast
  ratio, image dimensions/loading attributes, `rel` and accessible names.
- Load the page with JavaScript disabled and confirm computed opacity of every
  project is 1.
- Emulate the reduced-motion media query and confirm animation/transition values.
- Check `scrollWidth <= innerWidth` in a 375px-wide frame.
- Run `npm run build`, `sh workflow/lint.sh` and Lighthouse before/after.
- Visual screenshots are captured for desktop and 375px, but the reviewing model
  cannot inspect images; user-visible confirmation may be requested.

## Outcome

Completed the accessibility and resilience pass:

- Reworked the document outline to one `h1`, `h2` sections and `h3` items,
  with `header`, `nav`, `main` and `footer` landmarks and labelled sections.
- Added a visible skip link that moves focus to `main`, plus a white
  `:focus-visible` outline on every link. Tabbing through the skip link, hero,
  navigation and project cards confirmed the outline on each.
- Removed the JavaScript dependency from content visibility: `.reveal` now only
  hides content when a `js` class is present, and the class is removed if the
  module fails to load. Removing `js` showed every project at opacity 1.
- Added `prefers-reduced-motion` handling for the logo spin, scroll behaviour and
  reveal transitions. Verified in headless Chrome with
  `--force-prefers-reduced-motion`: animation duration 0.01ms, one iteration,
  reveal opacity 1, scroll behaviour `auto`.
- Raised the year/meta text from `#666` to `#a3a3a3` (8.33:1 on black) and kept
  all normal text above 4.5:1. Lighthouse accessibility reports 1.0.
- Added intrinsic image dimensions, lazy loading and async decoding for
  below-the-fold images.
- Converted the five portfolio screenshots to WebP at display-appropriate
  widths: 2.3 MB of JPEG/PNG became about 430 KB of WebP, with dimensions
  updated. The 1 MB PNG is now an 82 KB WebP.
- Added `rel="noopener"` and screen-reader new-tab text to every `_blank` link.
- Added `robots.txt` and `sitemap.xml`; Lighthouse SEO rose from 0.67 to 1.0.
- Trimmed the mobile hero so the primary call to action fits within a 375×812
  viewport, and confirmed there is no horizontal overflow.

Verified on the production preview (`vite preview`) as well as the dev server:
Lighthouse accessibility 1.0, best practices 1.0, SEO 1.0 with no failures;
`npm run build` and `sh workflow/lint.sh` pass. Visual screenshots were captured,
but the reviewing model cannot read images, so visual confirmation remains a
user check.

