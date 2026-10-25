---
area: content
dependencies: [product-engineer-positioning.md]
---

# Update CV and add Hyve Managed Hosting experience

## Context

Tao supplied a new CV titled *Product Engineer*, dated October 2026, currently in
the repository root. It records more than ten years of commercial experience and
adds a recent role at Hyve Managed Hosting maintaining the company's support
ticketing system (myhyve.com) with Angular, C#, Sentry, GitLab and Playwright.
The site still links to the September 2025 CV and lacks the Hyve role.

## Acceptance criteria

- The new CV is moved to `public/` and outdated resume files are removed.
- `index.html` links to the new CV, shows its filename and October 2026 date, and
  updates all experience counts from 9+ to 10+ years.
- The Hyve Managed Hosting role appears in the Background section with accurate
  dates, role title and a link to https://www.myhyve.com.
- Commercial skills text reflects the Angular and C# experience without inventing
  outcomes.
- The repository work items stay coherent: the old issue is narrowed to
  project-level contribution details, and a task records this update.

## Verification

- Confirm `public/` contains only the new CV plus existing static assets.
- Confirm all references to the old CV filename are gone from `index.html`.
- Run `npm run build` and `sh workflow/lint.sh`.
- Fetch the local preview and verify the Hyve link resolves (200/expected).
- Review the rendered page for heading order, link text and no horizontal
  overflow.

## Outcome

Moved the new CV to `public/Tao_Zamorano_Product_Engineer_CV.pdf`, removed the
three outdated resume files, and updated `index.html` to link to the new file
with the filename and October 2026 date visible.

Updated the hero copy and metadata from 9+ to 10+ years of commercial web
development, added Angular and C# to the commercial skills line, and added C# to
the pragmatic-technology paragraph.

Added the Hyve Managed Hosting role to the Background section with the title
"Mid-Level Engineer · Hyve Managed Hosting", dates Sep 2025 – Oct 2026, and a
link to https://www.myhyve.com. The role description sticks to the CV wording:
maintained the company's support ticketing system, working primarily in Angular
alongside C#, Sentry, GitLab and Playwright.

Updated the open issue to focus on the remaining project-level contribution
detail questions, and updated the production deploy task to include the new CV
asset.

`npm run build` and `sh workflow/lint.sh` pass. Lighthouse scores against the
local preview were 1.0 for performance, accessibility, best practices and SEO.
The new CV PDF, social image, robots.txt, sitemap.xml and portfolio assets all
return 200 from the preview server.

Production deployment remains unperformed; it is tracked in
`tasks/open/deploy-updated-site.md`.
