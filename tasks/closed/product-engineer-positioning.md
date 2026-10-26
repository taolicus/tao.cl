---
area: content
---

# Reposition the homepage around Product Engineer experience and direction

## Context

The homepage currently describes Tao as a "Full-Stack Web Developer" and lists
commercial projects without role, context or a clear career direction. The CV
(September 2025) records 9+ years of commercial web development: M10c, Archetype,
DataFlow and Bindex. The goal is to lead with **Product Engineer** while keeping
that evidence accurate: substantial feature delivery across frontend and backend,
and a growing focus on end-to-end product responsibility.

Preserve the existing black-and-red visual identity, animated logo, and
single-page structure. Do not add a framework or a generic portfolio template.
Do not invent project outcomes, metrics or responsibilities.

## Acceptance criteria

- The page title, meta description, hero headline and introduction lead with
  Product Engineer and state the commercial engineering background accurately.
- The hero explains who Tao is, what he does and where he is based within a few
  seconds of reading.
- The commercial work section names M10c, Archetype and DataFlow, gives each
  project a role/context line, and links to the live work.
- A compact background section records the roles and dates from the September
  2025 CV without adding unsupported claims.
- An approach section states the engineering philosophy: simple maintainable
  architectures, pragmatic technology choices, minimal unnecessary complexity
  and effective AI-assisted development, without presenting Tao as an AI
  engineer or Go specialist.
- CV, GitHub, LinkedIn, email and phone are reachable from the page, and the CV
  filename and date are visible.
- Metadata includes title, description, canonical URL, Open Graph, Twitter card
  and theme colour.

## Verification

- Inspect the served page at `http://localhost:5173/` with browser accessibility
  snapshots and DOM checks: one `h1`, section headings, copy, links and metadata.
- Confirm each external URL resolves (HTTP 200 or expected redirect).
- Run `npm run build` and `sh workflow/lint.sh`.
- Review the desktop and narrow (375px) layout for overflow and legibility.

## Outcome

Repositioned the single page around Product Engineer while keeping the black,
red and animated-logo identity. The hero now states the role, the commercial
background, the current product focus and the technology split between
commercial and independent work. Added commercial work context, an approach
section, a background timeline from the September 2025 CV, and a contact section
with the CV, GitHub, LinkedIn, email and phone.

Added title, description, canonical, Open Graph, Twitter and Person metadata,
plus a generated 1200×630 social card (`public/og.png`, source
`src/img/og.svg`).

Verified with a browser accessibility snapshot and DOM checks: one `h1`, ordered
`h2`/`h3` headings, all contact links present, no horizontal overflow at 912px or
375px, and focus outlines visible on tab navigation. `npm run build`,
`sh workflow/lint.sh` and Lighthouse pass (accessibility 1.0, best practices
1.0, SEO 0.83 with only `robots.txt` remaining for the accessibility task).

Two commercial links are dead: the Coca-Cola customisation page returns 404 and
`www.nwew.co.uk` presents a broken HTTPS certificate. Both now link to Wayback
Machine captures and are labelled "View archived site". The other commercial and
product links return 200. Coca-Cola and LinkedIn block automated HEAD requests
in some cases; Coca-Cola was checked directly and the archive link returns 200.

Visual appearance was not reviewed by the model because it cannot read image
output. Screenshots were captured for the user and DOM/computed-style checks
were used instead.
