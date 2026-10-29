---
# area: content
# dependencies: []
---

# Improve the homepage for recruiter and hiring-manager conversion

## Context

The live homepage is visually strong but makes a recruiter work to find the
candidate's positioning and best evidence. The hero leads with a greeting and a
generic role line, the philosophy section comes before the work, dates do not
match the CV, and the weak Archetype entry has no personal contribution. The
Bootstrap agent workflow is only a link inside Approach despite being the most
job-relevant independent project.

The CV and social card have already been updated locally but are not deployed.
The live CV also still uses the older Frontend Software Engineer title.

Constraint: do not deploy or push this work yet. Do not invent impact metrics,
testimonials, availability, or contribution details that are not already
supported by the site or CV.

## Acceptance criteria

- The hero states the role, location, specialism, and availability, with CV,
  email, LinkedIn and GitHub calls to action.
- Selected work appears before Approach, and the navigation order matches.
- Work entries use month/year dates that match the CV, use active ownership
  language, and no longer include the unsupported Archetype entry.
- Work entries no longer make the whole card an external link; only the explicit
  visit link leaves the page.
- Bootstrap appears as an independent project, and the Approach copy is shorter
  and more specific.
- Contact makes email the primary action and repeats the CV download.
- `sh workflow/lint.sh` and the production build pass.
- The built page is served locally and the section order, links and content are
  verified from the served output.

## Verification

- `node node_modules/vite/bin/vite.js build`
- Serve the build locally and inspect the rendered HTML and generated CSS.
- `sh workflow/lint.sh`

## Outcome

Implemented locally; not deployed or pushed.

The hero now states the role, specialism, London location and role availability,
with CV, email, LinkedIn and GitHub calls to action. The page order is Selected
work → Independent projects → Approach → Contact, and the navigation matches.

The Hyve, Coca-Cola and DataFlow entries were tightened around ownership and
results, with dates aligned to the CV. The Archetype All Types entry was removed
because no first-hand contribution evidence is available; the open issue now
records that it can be restored if evidence is supplied. Work cards are no
longer wrapped in external links; only the explicit visit links leave the page.
Bootstrap was added as the first independent project, the Approach copy was
shortened, and Contact now makes email primary and repeats the CV download.
Page descriptions were updated to match the new positioning.

Verified with `node node_modules/vite/bin/vite.js build`, `sh workflow/lint.sh`,
and a local Vite preview: section order, hash targets, CV/asset links, generated
utility CSS and the absence of the invalid `@media source(...)` rule were
checked. No browser was available in this environment, so phone and desktop
layout were not checked visually and computed styles were not inspected in a
browser. The availability line should be confirmed before publication.

Deployment remains pending.
