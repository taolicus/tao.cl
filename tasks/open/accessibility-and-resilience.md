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

Filled in when the task is closed.
