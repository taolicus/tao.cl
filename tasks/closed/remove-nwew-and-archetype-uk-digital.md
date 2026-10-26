---
area: content
dependencies: [strengthen-commercial-project-evidence.md]
---

# Remove National Women's Enterprise Week and Archetype UK Digital Team

## Context

The portfolio currently shows three Archetype projects. Two of them (National
Women's Enterprise Week and Archetype UK Digital Team) lack first-hand
contribution evidence and are being removed to keep the Work section focused on
projects with stronger evidence.

## Acceptance criteria

- Remove the National Women's Enterprise Week project card from the Work
  section.
- Remove the Archetype UK Digital Team project card from the Work section.
- Delete the now-unused portfolio images (`nwew.webp` and
  `archetype-uk-digital.webp`).
- Update `issues/commercial-project-details-need-input.md` so it no longer
  tracks the removed projects.
- Preserve Archetype All Types and all other projects.
- Build, lint, deploy and verify production.

## Verification

- Confirm only the intended projects remain in the Work section.
- Confirm no broken image references remain.
- Run `npm run build`, `sh workflow/lint.sh` and Lighthouse.
- Deploy with `sh scripts/deploy.sh` and verify production.

## Outcome

Removed the National Women's Enterprise Week and Archetype UK Digital Team
project cards from the Work section, along with their portfolio images
(`nwew.webp` and `archetype-uk-digital.webp`).

Updated `issues/commercial-project-details-need-input.md` so it only tracks
Archetype All Types as the remaining project awaiting first-hand contribution
evidence, and notes that the two removed projects are no longer in the
portfolio.

Verified:

- Only MyHyve, Coca-Cola Share a Coke, Archetype All Types and DataFlow remain
  in the Work section.
- No broken image references remain in `dist/`.
- `npm run build` and `sh workflow/lint.sh` pass.
- Lighthouse production scores: performance, accessibility, best practices, SEO
  and agentic-browsing all at 1.0.
