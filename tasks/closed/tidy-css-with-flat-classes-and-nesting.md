---
area: frontend
dependencies: [prefer-tailwind-apply-in-css.md]
---

# Tidy main.css with flat classes and native nesting

## Context

`src/main.css` is functional but mixes flat selectors with DOM-mirroring
combinators. The user wants it tidied using flat classes for primary elements
and native nesting for closely related states, pseudo-elements and responsive
adjustments, keeping nesting shallow and avoiding DOM-mirroring.

## Acceptance criteria

- Refactor `src/main.css` to use flat classes for primary components and native
  nesting for states/pseudo-elements/responsive tweaks.
- Keep nesting to one level by default; use a second level only where it
  improves readability.
- Preserve existing behaviour, specificity, cascade order and responsive
  styling.
- No HTML changes or new dependencies.
- Run Prettier, build, lint, deploy and verify production for visual
  regressions.

## Verification

- Build and lint pass.
- Playwright confirms no horizontal overflow and key computed styles match the
  previous output.
- Lighthouse production scores remain at 1.0.

## Outcome

Refactored `src/main.css` to use flat classes for primary components
(`.project`, `.product`, `.skip-link`, `.site-nav`, `.approach-heading`,
`.product-meta`, `.product-links`) and native nesting for related states and
pseudo-elements.

Key changes:

- Grouped component states under their parent selector
  (`.project a { &:hover .visit { ... } &:focus-visible img { ... } }`).
- Used nested `&:first-child`, `&:hover`, `&:focus` and `&.reveal-active`.
- Kept section-level rules flat (`#home > p`, `#contact > div > p`) to avoid
  DOM-mirroring nesting.
- Preserved the existing cascade order, specificity and responsive breakpoints.
- No HTML changes or new dependencies.

Verified with Playwright that mobile and desktop layouts have no horizontal
overflow and that key computed values (link colour, muted text, image border
radius, border opacity, navigation colour) match the previous output.
`npm run build`, `sh workflow/lint.sh` and `npx prettier --check .` pass.
Deployed to production; Lighthouse scores remain at 1.0 across performance,
accessibility, best practices and SEO.
