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

Filled in when the task is closed: what was done, what was verified, what was
not, and what remains.
