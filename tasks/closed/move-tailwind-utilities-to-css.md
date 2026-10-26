---
area: frontend
dependencies: [remove-background-section.md]
---

# Move Tailwind utilities from markup to CSS

## Context

The HTML currently carries most layout and typography utilities directly on
element class attributes. The user wants these moved into `src/main.css`, using
bare element selectors combined with section IDs, Tailwind's predefined
breakpoints and tokens, and proper `@layer` organisation.

## Acceptance criteria

- Remove Tailwind utility classes from `index.html` and express the same styles
  in `src/main.css`.
- Use section IDs with nested bare element selectors (e.g. `#home > p`).
- Prefer predefined Tailwind breakpoints and sizing tokens over arbitrary
  bracket values.
- Keep semantic component classes where they help (`.project`, `.product`,
  `.skip-link`, `.site-nav`).
- Use utility classes directly in markup only when the class name conflicts with
  a Tailwind utility (e.g. `sr-only`).
- Preserve the existing visual output and responsive behaviour.
- Add Playwright to the project to simplify verification.
- Build, lint, deploy and verify production.

## Verification

- Confirm the page structure, headings and navigation are unchanged.
- Confirm no horizontal overflow at desktop (1440px) and mobile (375px).
- Run `npm run build`, `sh workflow/lint.sh` and Lighthouse.
- Deploy with `sh scripts/deploy.sh` and verify production.

## Outcome

Moved almost all Tailwind utilities from `index.html` into `src/main.css`,
organised under `@layer base` and `@layer components`. Styles now use section
IDs combined with nested bare element selectors (e.g. `#home > p`,
`#work h2`, `#contact > div > p:nth-of-type(1) a`).

Used predefined Tailwind breakpoints and sizing tokens (`max-w-4xl`,
`max-w-2xl`, `max-w-56`, `sm:max-w-sm`, `sm:py-24`, etc.) instead of arbitrary
bracket values. Kept semantic component classes (`.project`, `.product`,
`.skip-link`, `.site-nav`) and left `sr-only` as a Tailwind utility class in
the markup because the class name conflicts with a custom definition.

Added `@playwright/test` and Chromium to the project to make layout and content
verification easier going forward.

Verified:

- Page structure, headings and navigation are unchanged.
- No horizontal overflow at desktop (1440px) or mobile (375px).
- `npm run build` and `sh workflow/lint.sh` pass.
- Lighthouse local preview: performance, accessibility, best practices and SEO
  all at 1.0.
- Deployed with `sh scripts/deploy.sh`; production Lighthouse reports
  performance, accessibility, best practices, SEO and agentic-browsing all at
  1.0.
