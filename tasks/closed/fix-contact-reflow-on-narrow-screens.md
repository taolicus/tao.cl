---
area: frontend
dependencies: []
---

# Stop the contact email from overflowing the viewport on narrow screens

## Context

`src/main.css` sets `.contact-primary a` to `text-4xl` (36px). The address
`taozamorano@gmail.com` measures 376px at that size, and `#contact > div` is
`flex flex-col items-center`, so the `<p>` is a max-content flex item with no
width constraint for `overflow-wrap` to act against. Measured on the built page:
a 320px viewport produces 340px of content (35px of page-level horizontal
scroll), and 375px produces 8px against a 360px content box.

`#logo-container` also mixes units with its parent: `header` is `h-svh` but the
child is `h-screen`/`w-screen`, so on mobile landscape the 100vh child can
exceed the visible header by the browser-chrome height. `w-screen` on a flex
item with default `flex-shrink` is a no-op anyway; it measured 224px at a 667px
viewport.

## Acceptance criteria

- No horizontal page scroll at 320, 375 or 1440 CSS pixels wide.
- The email address keeps its `text-4xl sm:text-5xl` scale and wraps at narrow
  widths instead of shrinking.
- Full-height blocks use viewport units consistent with their parent
  (`svh`), so the logo container never exceeds the header.
- Layout above the `sm` breakpoint is unchanged.

## Verification

- `tests/styles.spec.js` asserts `scrollWidth <= clientWidth` at 320, 375 and 1440. The 320px case must fail before the fix.
- Compare `#logo-container` and `#tao` bounding boxes at 1440px and 667x375
  before and after.
- `npm run build`, `npm test`, `npx prettier --check .` and
  `sh workflow/lint.sh` pass.

## Outcome

Added `tests/styles.spec.js` first and confirmed it failed at 320px (335px of
content in a 305px content box) and 375px, then fixed the layout:

- `.contact-primary` gained `max-w-full`; `max-w-full` is what gives
  `overflow-wrap` a width to wrap against in a centred flex column.
- `.contact-primary a` gained `break-words`, keeping `text-4xl sm:text-5xl`.
- `#logo-container` and `#tao` changed `h-screen` to `h-svh`.

Measured after the change: 320px `scrollWidth` 305 equals `clientWidth` (was
340), 375px 360 equals 360 (was 368), 1440px unchanged. The address stays 36px
and wraps to two lines (83px high); it does not shrink.

Desktop and landscape geometry is unchanged: `#logo-container` 776x900 at x=649
and `#tao` 1125x1125 at x=563 at 1440x900, identical before and after.

`w-screen` was kept. The audit's claim that it is a no-op was wrong: switching
to `w-full` narrowed the container by 4px and moved its clip edge, because the
declaration sets the flex base size. Only the height was inconsistent.

The 1440px assertion covers "no change above `sm`". Headless Chromium cannot
reproduce dynamic browser chrome, so the `svh` benefit on mobile landscape is
reasoned from the unit mismatch rather than observed on a device. `npm test`
passes (9 passed, 1 skipped: external links need `CHECK_EXTERNAL_LINKS=1`).
