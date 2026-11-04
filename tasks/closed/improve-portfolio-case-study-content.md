---
area: content
dependencies: [strengthen-commercial-project-evidence.md]
---

# Improve the MyHyve and Share a Coke case studies for technical recruiters

## Context

The two project pages currently lead with the monthly ticket automation (MyHyve)
and the campaign itself (Share a Coke). Both understate the engineering work:
the MyHyve page mentions the Angular and dependency-security work only at the
end, and the Share a Coke page lists UI features without explaining the
configuration and state-management problem behind them.

First-hand evidence for both projects is recorded in
`issues/commercial-project-details-need-input.md` and the outcome of
`strengthen-commercial-project-evidence.md`. The rewrite must stay within that
evidence and the contribution details supplied in `improvements.md`.

## Acceptance criteria

- The MyHyve page is retitled "Modernising the MyHyve Ticketing Portal" and
  leads with the Angular 19→21 upgrade, the npm audit reduction and the
  cross-stack feature, with the monthly automation as a smaller example.
- The Share a Coke page is retitled "Building the Share a Coke Customisation
  Experience" and explains the market-configuration and step-transition problem
  before listing the UI work.
- Both pages state Tao's individual contribution separately from team work and
  claim no invented metrics, architecture or deployment responsibility.
- Each page opens with role, dates, a one-sentence summary and three technical
  highlights, keeps the existing visual language, and links back to Selected
  work at the end.
- The homepage work cards describe the same achievements as the case studies.
- Metadata, headings, the MyHyve workflow diagram and the Playwright
  expectations match the new content.

## Outcome

Rewrote both case studies and aligned the homepage cards, metadata and tests.

**MyHyve** — retitled "Modernising the MyHyve Ticketing Portal" and leads with
the Angular 19→21 upgrade, the npm audit reduction and the cross-stack
notification feature. The monthly automation is now a supporting example, with
the diagram changed to one aggregated monthly ticket. The page states that
colleagues verified and deployed that patch.

**Share a Coke** — retitled "Building the Share a Coke Customisation Experience"
and leads with market configuration, conditional steps and selection
persistence. It separates Tao's component and state-flow work from the lead
developer's review and the testers' manual testing, and claims no commercial
results. The campaign screenshot remains as historical evidence at the end.

**Shared** — added an "At a glance" list and a return link to each page, kept
the existing palette and typography, updated the homepage work cards and
metadata, and documented the new page structure in `features/project-pages.md`.

Verification: `npm run build`, `npm test` (24 passed, external-link check
skipped) and `sh workflow/lint.sh` pass. Both pages were rendered at 1440px,
375px and 320px with no horizontal overflow; the highlights sit inside the
first desktop viewport.

Tao confirmed the facts retained from earlier published content: the Tailwind
replacement of Sass, the portal running on Angular 21, the npm audit figures and
the market-configuration statement on the Share a Coke page.

Deployed with `sh scripts/deploy.sh` after rebasing onto two upstream commits.
The live MyHyve, Share a Coke and homepage content was checked at tao.cl, with
the new stylesheet loaded and no console errors.
