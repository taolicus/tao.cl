---
area: frontend
dependencies: [strengthen-commercial-project-evidence.md]
---

# Remove the Background section

## Context

The professional history is now sufficiently covered by the Work section
project cards and the CV download. The separate Background timeline is
redundant and can be removed to shorten the page.

## Acceptance criteria

- Remove the Background section from `index.html`.
- Remove the "Background" link from the site navigation.
- Remove the now-unused CSS rules (`.background-list`, `.role`, `.dates`).
- Preserve all other sections, links and behaviour.
- Build, lint, deploy and verify production.

## Verification

- Confirm the page no longer contains a Background section or navigation link.
- Confirm desktop and mobile layouts still have no horizontal overflow.
- Run `npm run build`, `sh workflow/lint.sh` and Lighthouse.
- Deploy with `sh scripts/deploy.sh` and verify production.

## Outcome

Removed the Background section from `index.html` and the "Background" link from
the site navigation. Removed the now-unused CSS rules (`.background-list`,
`.role`, `.dates`) from `src/main.css`.

Verified the page still renders correctly:

- Navigation now lists Work, Products, Approach and Contact.
- No horizontal overflow at desktop (1440px) or mobile (375px).
- `npm run build` and `sh workflow/lint.sh` pass.
- Lighthouse local preview: performance, accessibility, best practices and SEO
  all at 1.0.
- Deployed with `sh scripts/deploy.sh`; production Lighthouse reports
  performance, accessibility, best practices, SEO and agentic-browsing all at
  1.0.
