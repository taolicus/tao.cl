---
area: content
dependencies:
  [
    add-myhyve-commercial-work-entry.md,
    remove-one-time-cleanup-from-deploy-script.md,
  ]
---

# Prepare tao.cl for Product Engineer job applications

## Context

The portfolio now reflects the Product Engineer positioning, the updated CV and
the MyHyve commercial work entry. Before using the site in job applications, the
production build needs a final verification pass, the agent-assisted workflow
should be discoverable from the page, and the commercial project section should
be prepared for stronger contribution evidence without inventing details.

## Acceptance criteria

1. Production verification
   - https://tao.cl/ serves the current Product Engineer portfolio.
   - Homepage title, positioning, commercial work, independent projects and
     contact links are present and reachable.
   - The current Product Engineer CV is downloadable, readable and consistent
     with the site's professional history.
   - Internal and external links return expected responses.
   - Desktop and mobile layouts are readable, navigable and free from obvious
     regressions.
   - Verification limitations are recorded accurately.

2. Discoverable workflow
   - The AI-assisted development paragraph in the Approach section links to
     https://github.com/taolicus/bootstrap unobtrusively.
   - The link is presented as a documented, actively maintained development
     workflow covering task scoping, persistent project context and
     verification.
   - Existing visual identity and concise writing style are preserved.

3. Commercial project contributions
   - Inspect the existing commercial project descriptions and
     `issues/commercial-project-details-need-input.md`.
   - Do not invent responsibilities, technical decisions, outcomes, metrics or
     ownership.
   - Preserve existing descriptions until first-hand evidence is available.
   - Record genuinely missing information in the existing issue.

## Verification

- Fetch and parse the production page; check links, headings and metadata.
- Download the production CV, extract text and compare dates/roles with the
  site.
- Run Lighthouse against production.
- Use a headless browser to check responsive layout metrics (scroll width vs
  viewport width) and capture screenshots for visual review.
- Run `npm run build`, `sh workflow/lint.sh` and `sh scripts/deploy.sh` after
  edits.

## Outcome

### 1. Production verification

Fetched and parsed https://tao.cl/ in a headless browser:

- Title: `Tao Zamorano — Product Engineer`; one `h1`: "Product Engineer".
- Meta description correctly states the 10+ year Product Engineer positioning.
- All expected sections are present: Work, Products, Approach, Background,
  Contact.
- Contact links include email, phone, CV PDF, GitHub and LinkedIn.
- Desktop (1440×900) and mobile (375×812) computed `scrollWidth` match the
  viewport width, so there is no horizontal overflow.
- CV PDF is downloadable, readable, and consistent with the site: Product
  Engineer title, 10+ years, Hyve (Sep 2025 – Oct 2026), M10c, Archetype,
  DataFlow, Bindex, Bootstrap workflow and independent projects.

Link checks (all reachable; some block automated requests):

- 200: tao.cl, CV PDF, myhyve.com, Coca-Cola archive, Archetype UK Digital,
  dataflow.cl, all product/source links, GitHub.
- 200 with a browser UA: alltypes.archetype.co, nwew archive.
- LinkedIn returns 999 (blocks automated requests) but works in a real browser.

Lighthouse against production: performance, accessibility, best practices, SEO
and agentic-browsing all at 1.0.

### 2. Discoverable workflow

Added an unobtrusive link in the Approach section's AI-assisted paragraph to
https://github.com/taolicus/bootstrap, described as an "actively maintained
Bootstrap workflow" covering task scoping, persistent context and explicit
verification. The link is underlined to keep accessibility scores at 1.0 and
opens in a new tab with screen-reader text.

### 3. Commercial project contributions

Inspected `issues/commercial-project-details-need-input.md` and the existing
descriptions. No first-hand engineering contribution evidence is available yet,
so the product-level descriptions were preserved unchanged. Added a "Notes from
latest review" section to the issue that lists the specific gaps for each
commercial project, so the missing information can be filled in when evidence is
available.

### Deployment

Built, linted and deployed with `sh scripts/deploy.sh`. The live site now
includes the Bootstrap workflow link.

### Limitations

- The reviewing model cannot visually inspect screenshots or colour rendering;
  desktop and mobile screenshots were captured for human review.
- LinkedIn blocks automated HEAD/GET requests; it was confirmed reachable with a
  browser user-agent.
- First-hand contribution detail for commercial projects is still pending and
  tracked in `issues/commercial-project-details-need-input.md`.
