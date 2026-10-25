---
area: content
dependencies: [product-engineer-positioning.md]
---

# Add an independent product section describing kxp, asteroids and komikan

## Context

The portfolio only shows commercial client work. Tao's independent products
demonstrate product ownership: each is a complete, deployed web product with a
Go backend, a browser interface and an operating deployment. They must be
presented separately from commercial delivery so a reader can tell the
difference between client feature work and end-to-end product work.

Repository evidence:

- **Kachipun Tournament (kxp)** — real-time online rock-paper-scissors tournament
  on a shared countdown; invite links, global matchmaking, CPU and arcade modes;
  single Go binary with an embedded UI; server-authoritative rules; SSE updates.
  Live at https://kxp.pifia.net.
- **Two Idiots, One Ship (asteroids)** — two-player co-op Asteroids in the
  browser; pilot and gunner share one ship, lives and score; Go server with
  fixed-timestep authoritative simulation; canvas client with touch controls;
  HTTP POST input and SSE state. Live at https://asteroids.pifia.net.
- **Komikan** — web version of a traditional Mapuche board game; one puma
  against twelve dogs; Go server, configurable rules engine, room links,
  server-decided moves and live updates. Live at https://komikan.tequionet.org.

Do not claim user numbers, commercial outcomes, awards or design ownership that
the repositories do not show. Do not add screenshots that cannot be verified.

## Acceptance criteria

- A distinct "Independent products" section appears after the commercial work.
- Each product has a concise description grounded in its repository, and links
  to both the live product and its source repository.
- The section makes the kind of ownership demonstrated explicit: rules,
  protocol, interface, tests and deployment as one product.
- Commercial work and independent work remain visually and textually distinct.
- Descriptions stay readable on mobile and do not overflow their containers.

## Verification

- Read the rendered section through a browser accessibility snapshot and DOM
  check; confirm all six destinations (three live, three source) return the
  expected pages.
- Check the narrow (375px) layout for overflow.
- Run `npm run build` and `sh workflow/lint.sh`.

## Outcome

Implemented alongside the page restructure in the positioning task, because the
section structure and shared styles were part of the same HTML rewrite. Kept as
a separate task for its distinct acceptance criteria and verification.

The page now has a distinct independent-products section after the commercial
work, with one entry for Kachipun Tournament, Two Idiots, One Ship and Komikan.
Each description is grounded in the repository README and links to both the live
product and its source. The section intro states the ownership being shown:
rules, protocol, interface, tests and hosting as one product.

Verified in the browser: the section follows the commercial work, all six
destinations return HTTP 200, links carry `rel="noopener"` and new-tab text, and
there is no horizontal overflow at 375px. Descriptions remain readable in the
single-column mobile layout.

This outcome was committed with the positioning change rather than in a separate
commit; the working history is therefore one commit for both tasks.

