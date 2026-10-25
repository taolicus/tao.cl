# Current CV and commercial project details need Tao's input

## What was observed

- The linked CV, `public/Tao Zamorano - Resume - Sep 2025.pdf`, is dated
  September 2025 and still describes Tao as a "Full-Stack Web Developer". The
  website now positions him as a Product Engineer, so the two documents do not
  agree.
- The CV records what each employer did in general terms but not what Tao
  personally owned on each portfolio project. The site therefore describes the
  products and Tao's team/role, not individual outcomes or metrics.
- `public/` contains three resume files: a June 2025 Markdown file, a June 2025
  PDF and the September 2025 PDF. The site links only the September 2025 PDF.
  It is not clear whether the older files are intentionally kept.
- The production deployment is a static nginx site; no deploy script, server
  configuration or hosting instructions exist in this repository. Only the live
  response headers establish the nginx/VPS detail.

## Open questions

- Should the CV be refreshed to the Product Engineer framing, and which file
  should the site link?
- For Coca-Cola Share a Coke, Archetype All Types, National Women's Enterprise
  Week, Archetype UK Digital and DataFlow, what did Tao personally build or own,
  and are there verifiable outcomes worth stating?
- Are the older resume files still needed?
- Should the deployment process be documented in this repository, and can it be
  added without exposing credentials or host details?

## What would resolve it

An updated CV plus one or two sentences of first-hand contribution detail per
commercial project. A decision on the older resume files and on whether the
deployment recipe belongs in the public repository.

## Affects

`index.html`, `public/`, `tasks/closed/repository-readme-and-licensing.md`, and
future CV updates.
