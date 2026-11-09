---
area: frontend
---

# Make the mobile hero render consistently in Firefox and Chrome

## Context

On Android, Firefox renders the homepage hero text larger than Chrome. Firefox
Android applies text inflation on top of the layout, while Chrome honours the
`-webkit-text-size-adjust: 100%` declaration that Tailwind's preflight emits.
Preflight does not emit the unprefixed `text-size-adjust` property, so Firefox
keeps inflating the hero copy. The inflated block is taller than the current
bottom-anchored portrait hero, so it pushes the heading up into the decorative
red logo. The same layout also overlaps at short portrait viewports in Chrome.

The viewport meta tag is already `width=device-width, initial-scale=1.0`.

## Acceptance criteria

- The root element sets both prefixed and unprefixed `text-size-adjust: 100%`.
- The viewport meta tag keeps `width=device-width` and does not disable zoom.
- Portrait hero text clears the decorative logo at 320x568, 375x667, 390x844
  and 412x915.
- Desktop, tablet and tall portrait layouts keep their existing composition.
- No horizontal page scroll at 320, 375 or 1440 pixels wide.
- Existing checks and tests pass, and production serves the fix.

## Verification

- Build the site and measure hero geometry in Playwright Chromium at the mobile
  viewports above and at 1440x900.
- Run `npm test` and `sh workflow/lint.sh` where the environment supports the
  browser binaries.
- Fetch the deployed HTML and hashed CSS after `sh scripts/deploy.sh` and check
  that they contain the new rule.

## Outcome

Filled in when the task is closed.
