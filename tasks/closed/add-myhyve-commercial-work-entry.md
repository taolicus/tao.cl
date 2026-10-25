---
area: content
dependencies: [update-cv-and-add-hyve-experience.md]
---

# Add MyHyve to the Selected commercial work section

## Context

The Hyve Managed Hosting role is already in the Background section and linked
from the CV. Tao also wants it showcased in the Selected commercial work section
with a landing-page screenshot he dropped in the repository root.

## Acceptance criteria

- The MyHyve Ticketing Portal appears as the first item under "Selected
  commercial work".
- The entry links to https://www.myhyve.com, shows an accurate role/year line,
  and describes the work without inventing outcomes.
- The screenshot is converted to a display-sized WebP and placed alongside the
  other portfolio images in `src/img/portfolio/`.
- The original root screenshot is removed after conversion.

## Verification

- Confirm the new card renders first in the Work section, with correct link,
  image dimensions and lazy-loading attributes.
- Run `npm run build` and `sh workflow/lint.sh`.
- Confirm the new WebP asset is copied to `dist/` and returns 200 from the
  preview server.
- Re-run Lighthouse and check for no regressions.

## Outcome

Added MyHyve Ticketing Portal as the first entry in the Selected commercial work
section. The card links to https://www.myhyve.com, shows the role line
"Mid-Level Engineer at Hyve Managed Hosting · 2025 – 2026", and describes the
work in Angular with C#, Sentry, GitLab and Playwright, matching the CV.

Converted the supplied 3042×1694 PNG screenshot to a 1600×891 WebP
(`src/img/portfolio/myhyve.webp`, ~63 KB) and removed the original file from the
repository root. The image has `width`, `height`, `loading="lazy"` and
`decoding="async"` attributes consistent with the other portfolio items.

Updated the Work section intro to mention Hyve Managed Hosting alongside M10c,
Archetype and DataFlow.

`npm run build` and `sh workflow/lint.sh` pass. Lighthouse against the local
preview reports performance, accessibility, best practices and SEO all at 1.0
with no regressions. The new WebP asset returns 200 from the preview server.

Production deployment remains unperformed; tracked in
`tasks/open/deploy-updated-site.md`.
