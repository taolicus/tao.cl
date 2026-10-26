---
area: frontend
dependencies: [move-tailwind-utilities-to-css.md]
---

# Move hardcoded theme values to CSS variables

## Context

`src/main.css` still contains hardcoded colours, border colours and font sizes.
The user wants these moved into CSS variables, using Tailwind's `@theme` block
where it makes sense.

## Acceptance criteria

- Replace hardcoded theme values in `src/main.css` with CSS custom properties.
- Use Tailwind's `@theme` block for design tokens that map to utilities
  (colours, border colours, font sizes).
- Preserve the existing visual output.
- Run Prettier, build, lint and deploy.

## Verification

- Build and lint pass.
- Playwright checks confirm key computed values (link colour, muted text,
  image border radius, border opacity) match the previous output.
- Lighthouse production scores remain at 1.0.

## Outcome

Replaced hardcoded theme values in `src/main.css` with a Tailwind `@theme`
block:

```css
@theme {
  --color-brand: #f00;
  --color-surface: #000;
  --color-foreground: #fff;
  --color-muted: #a3a3a3;
  --color-border: rgb(255 255 255 / 0.15);
  --color-border-subtle: rgb(255 255 255 / 0.12);
  --text-meta: 0.95rem;
  --text-approach-heading: 1.2rem;
}
```

Used these variables throughout the base and component layers (e.g.
`color: var(--color-brand)`, `border: 1px solid var(--color-border-subtle)`),
and switched to Tailwind utilities for radius (`rounded-2xl`, `rounded`,
`rounded-sm`) and surface/foreground colours (`bg-surface`, `text-foreground`).

Verified with Playwright that link colour, muted text, image border radius and
border opacity match the previous output. `npm run build`,
`sh workflow/lint.sh` and `npx prettier --check .` pass. Deployed to production;
Lighthouse scores remain at 1.0 across performance, accessibility, best
practices and SEO.
