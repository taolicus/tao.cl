---
area: frontend
dependencies: [move-theme-values-to-variables.md]
---

# Prefer Tailwind `@apply` utilities over explicit CSS rules

## Context

`src/main.css` still contains many explicit CSS declarations that map directly
to Tailwind utilities. The user wants these expressed via `@apply` where doing
so does not introduce extra conflicts.

## Acceptance criteria

- Convert explicit layout, spacing, typography and colour rules in
  `src/main.css` to `@apply` utilities.
- Keep explicit rules only where Tailwind has no equivalent or where using
  `@apply` would require arbitrary values that add noise.
- Preserve the existing visual output.
- Run Prettier, build, lint, deploy and verify production.

## Verification

- Build and lint pass.
- Playwright checks confirm no horizontal overflow and key computed styles match.
- Lighthouse production scores remain at 1.0.

## Outcome

Converted most explicit CSS rules in `src/main.css` to Tailwind `@apply`
utilities:

- Layout/spacing: `.project a`, `.project .description`, `.product`,
  `.product-links`, `.skip-link`, `.product img`, footer rules, etc.
- Typography: `.project .year`, `.project .visit`, `.product-meta`,
  `.approach-heading`, contact link sizes.
- Effects: `.js .reveal`, hover/focus states.

Kept a few explicit declarations where `@apply` would introduce arbitrary values
or where no direct utility exists:

- `clamp()` font sizes for project and product headings.
- `text-decoration-color` offset using `underline-offset-[0.18em]` (kept as a
  single arbitrary value rather than multiple custom properties).

Verified with Playwright that the mobile layout has no horizontal overflow and
that key computed values (link colour `#f00`, muted text `#a3a3a3`, image
`border-radius: 16px`, border opacity `0.12`) match the previous output.
`npm run build`, `sh workflow/lint.sh` and `npx prettier --check .` pass.
Deployed to production; Lighthouse scores remain at 1.0 across performance,
accessibility, best practices and SEO.
