---
area: content
---

# Update the Hyve and Share a Coke portfolio copy

## Context

The MyHyve and Share a Coke entries still carry detail that should not be
published: quantitative security findings and commercial implementation
specifics. The supplied replacement copy reframes both entries around the
delivered engineering work and keeps the security wording qualitative.

## Acceptance criteria

- The homepage cards use the supplied MyHyve and Share a Coke descriptions.
- Both case studies use the supplied headings and body copy, keep the existing
  header, metadata, screenshot and return-link treatment, and drop the obsolete
  workflow diagram.
- Page metadata, social preview descriptions, tests and durable feature notes
  describe the new content.
- The public pages contain no audit counts, severity breakdowns, unresolved
  findings, dependency identification, payment configuration or private
  validation detail.
- The site builds, the relevant Playwright checks pass, and the change is
  deployed and verified on the live site.

## Verification

- Build with `npm run build`; run `npm test` and `sh workflow/lint.sh`.
- Render the homepage and both case studies at desktop and mobile widths and
  check for horizontal overflow.
- Search the generated `dist/` for the removed details.
- Deploy with `sh scripts/deploy.sh` and confirm the live pages serve the new
  copy.

## Outcome

Replaced the homepage cards and both case studies with the supplied copy,
updated page metadata and social-preview descriptions, removed the obsolete
MyHyve workflow diagram and its unused styles, and aligned the Playwright checks
and feature notes. Updated the commercial-details issue so it records only the
public-level evidence.

Verified with `npm run build`, `npm test` (25 passed, external-link check
skipped) and `sh workflow/lint.sh`. Reviewed the homepage and both case studies
at 1440px and 390px with no horizontal overflow. Deployed with
`sh scripts/deploy.sh` and confirmed the live pages, metadata and screenshot
caption match the supplied copy.

The repository's older history and closed task records still contain pre-change
wording; removing that from public GitHub history is the separate follow-up
rewrite.
