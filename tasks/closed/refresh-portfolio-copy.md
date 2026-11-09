---
area: content
---

# Refresh the homepage and case-study copy

## Context

`update.md` supplies replacement copy for the homepage introduction, the MyHyve
and Share a Coke cards, and both case studies. The wording foregrounds frontend
depth and cross-stack work while keeping the public claims qualitative: no audit
counts, architectural trade-offs, deployment scale or business impact are added.
The existing design, navigation, links, images and metadata stay as they are.

The supplied instructions say to leave the change local; the requester
explicitly asked for a commit and deployment, which takes precedence.

## Acceptance criteria

- The homepage keeps “I'm Tao.” and uses the supplied introduction, MyHyve and
  Share a Coke descriptions; other sections are unchanged.
- The MyHyve case study keeps its role, dates and title and uses the supplied
  introduction and three sections in order, with no separate results section.
- The Share a Coke case study keeps its label, role, dates and title, uses the
  supplied introduction and three sections in order, and keeps the screenshot
  after the Delivery section with the new caption.
- The Playwright copy assertions match the new text.
- No horizontal overflow at desktop and mobile widths.

## Verification

- `npm run build`, `npm test` and `sh workflow/lint.sh`.
- Render the homepage and both case studies at 1440px and 390px and check for
  wrapping and horizontal overflow.
- Deploy with `sh scripts/deploy.sh` and confirm the live pages serve the new
  copy.

## Outcome

Replaced the homepage introduction and both card descriptions, and rewrote the
MyHyve and Share a Coke case studies with the supplied titles, introductions and
three sections each. The Share a Coke screenshot now follows the Delivery
section with the new caption. Role, dates, labels, links, images, page metadata
and the other homepage sections are unchanged, and no metrics or new claims were
added. Updated the Playwright copy assertions and recorded the Share a Coke
Delivery section in the project-page feature notes.

`update.md` asked for a local-only change; the requester asked for a commit and
deployment, so the change was committed and deployed. `update.md` itself remains
untracked because it is a one-off brief rather than repository documentation.

Verified with `npm run build`, `npm test` (25 passed, 1 external-link test
skipped) and `sh workflow/lint.sh`. Reviewed the homepage and both case studies
at 1440px and 390px; scroll width matched the viewport on every page, and the
Share a Coke screenshot was confirmed to load at mobile width. Deployed with
`sh scripts/deploy.sh`; the live pages serve the new copy with no trace of the
replaced wording.
