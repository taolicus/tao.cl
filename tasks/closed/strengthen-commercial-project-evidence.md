---
area: content
dependencies: [prepare-portfolio-for-job-applications.md]
---

# Strengthen commercial project evidence on tao.cl

## Context

Verified firsthand evidence is now available for three commercial projects:
MyHyve (Hyve Managed Hosting), Coca-Cola Share a Coke (M10c), and the IBM
DataPower monitoring work at DataFlow. The other Archetype projects still lack
first-hand contribution detail, so their descriptions should stay unchanged
until evidence is provided.

## Acceptance criteria

- Update the MyHyve, Coca-Cola Share a Coke and DataFlow descriptions in the
  Work section using only the verified evidence.
- Keep role titles, dates, project links and images unchanged.
- Preserve the existing concise editorial style and do not invent metrics,
  leadership, discovery or outcomes.
- Update or resolve `issues/commercial-project-details-need-input.md` to
  reflect which projects are now documented and which still need input.
- Keep Background section entries concise and avoid duplicating detailed Work
  descriptions across the page or CV.
- Verify the rendered page at desktop and mobile sizes, run build/lint checks,
  and deploy.

## Verification

- Read the updated Work section in a headless browser and confirm the new text
  is present and proportional.
- Check responsive layout metrics (no horizontal overflow).
- Run `npm run build`, `sh workflow/lint.sh` and Lighthouse.
- Run `sh scripts/deploy.sh` and verify production.

## Outcome

Updated the Work section descriptions for MyHyve, Coca-Cola Share a Coke and
DataFlow using only the verified firsthand evidence, keeping titles, dates,
links and images unchanged.

**MyHyve Ticketing Portal**
- Described maintaining and modernising the Angular/C# support ticketing portal.
- Added the Angular v19→v21 upgrade, npm audit reduction from more than 50 to
  fewer than five with three of four critical findings resolved, and the
  introduction of Angular signals, rxResource and Tailwind CSS.
- Mentioned the proposed feature-oriented code organisation and the recurring
  monthly ticket workflow personally built and deployed, validated by Customer
  Experience.
- Avoided claiming all findings were eliminated or a full directory migration.

**Coca-Cola Share a Coke**
- Reframed the role as a frontend developer on a team-led React/TypeScript
  application.
- Listed production contributions: personalisation forms, 2D customised-product
  previews, multilingual interfaces and responsive layouts.
- Added the unshipped Three.js 3D can prototype as context, without implying it
  went live.

**DataFlow — IBM DataPower Monitoring**
- Retitled the card to "DataFlow — IBM DataPower Monitoring".
- Described independently designing, building and deploying an Ionic mobile
  monitoring app integrated with IBM DataPower.
- Included iterative improvements to navigation, information hierarchy and data
  visualisation from user/colleague feedback.
- Clarified that corporate website work and Node-RED prototypes were part of the
  role but the Ionic app was the shipped product.

**Background section**
- Updated the DataFlow entry to mention the Ionic mobile monitoring app and
  Node-RED prototypes while keeping it concise.
- Left Hyve and M10c entries unchanged to avoid duplicating detailed Work
  descriptions.

**Issue tracking**
- Updated `issues/commercial-project-details-need-input.md` to mark MyHyve,
  Share a Coke and DataFlow as resolved, and to keep the three Archetype
  projects as open questions until first-hand evidence is available.

**Verification and deployment**
- Built and linted locally; Lighthouse local preview: performance, accessibility,
  best practices and SEO all at 1.0.
- Checked desktop (1440px) and mobile (375px) layout metrics: no horizontal
  overflow.
- Deployed with `sh scripts/deploy.sh` and verified production content.
- Lighthouse production: performance, accessibility, best practices, SEO and
  agentic-browsing all at 1.0.

No metrics, leadership responsibilities or outcomes were invented.
