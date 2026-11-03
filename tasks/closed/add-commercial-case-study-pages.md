---
area: content
---

# Add case-study pages for MyHyve and Share a Coke

## Context

The first two Selected work cards need stronger evidence pages. The MyHyve card
currently uses a login screenshot and links to the public site; the Share a Coke
card links to an archive URL that no longer resolves. Both cards should lead to
local project pages that use only the contribution details already recorded in
`issues/commercial-project-details-need-input.md` and the closed tasks that
added them.

## Acceptance criteria

- The MyHyve card leads with the monthly support-ticket automation for stray
  orders and its role in surfacing misclassified maintenance work.
- The MyHyve login screenshot is replaced by an accessible workflow diagram
  showing the monthly check, ticket creation and support review, using
  fictional data and no internal details.
- The MyHyve card links to a case-study page covering the problem, the Angular
  and C# contribution, the post-rollout outcome, and a separate brief Angular
  19→21 and npm dependency-cleanup example.
- The Coca-Cola card keeps its existing campaign screenshot and links to a
  short project page with a larger screenshot, a “Completed campaign” label and
  a caption describing the contribution.
- The other cards, sections, homepage styles and site-wide navigation remain
  unchanged in intent.
- The new pages build and serve at local URLs without broken links or
  horizontal overflow at desktop and mobile widths.
- The work records any remaining evidence gaps without inventing details.

## Verification

- Run the existing Playwright checks and `sh workflow/lint.sh`.
- Verify both homepage links resolve to the new pages.
- Check both project pages at desktop and mobile widths in a browser.
- Confirm the workflow diagram has accessible text and the Coca-Cola image
  loads at its larger size.

## Outcome

Added `/work/myhyve/` and `/work/share-a-coke/` as static project pages and
wired them into Vite's multi-page build. The homepage's first two cards now link
to them; the MyHyve card uses an accessible three-step workflow diagram with
fictional data, and the Share a Coke card keeps its existing red campaign image.

The project pages reuse the site's palette, typography, navigation, footer and
container conventions. Content is limited to the contribution evidence already
recorded in the repository. Remaining gaps are recorded in
`issues/commercial-project-details-need-input.md`.

Verified with `npm run build`, `npm test` (22 passed, 1 external-link test
skipped by default), `sh workflow/lint.sh`, and Playwright screenshots at
1440×900, 375×812 and 320×568. Both project URLs returned 200, neither page
overflowed horizontally, and the homepage cards pointed at the expected routes.
Lighthouse against the local preview scored 1.0 for accessibility, best
practices and SEO on the homepage and both project pages. No console errors
were reported.

Limitations: the project pages do not add new first-hand evidence beyond what
was already recorded. Campaign dates beyond the M10c role, the markets covered,
a working campaign URL, MyHyve rollout timing, ticket volumes and C# component
details remain unverified and are tracked in
`issues/commercial-project-details-need-input.md`.
