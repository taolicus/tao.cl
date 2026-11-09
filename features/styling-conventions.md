# Styling conventions

`src/main.css` is the only hand-written stylesheet. Utilities come from the page
markup (`@source "../index.html"`), and almost all styling is expressed there
with `@apply`.

## Palette

Colours are declared once in `@theme` and consumed as utilities or variables:

| Token                   | Value                           | Role                                     |
| ----------------------- | ------------------------------- | ---------------------------------------- |
| `--color-brand`         | `oklch(62.796% 0.25768 29.234)` | Links, hero heading, accent              |
| `--color-surface`       | `oklch(0% 0 0)`                 | Page background                          |
| `--color-foreground`    | `oklch(100% 0 0)`               | Body text on surface                     |
| `--color-body`          | `oklch(87% 0 0)`                | Introductory paragraphs (212,212,212)    |
| `--color-muted`         | `oklch(71.5% 0 0)`              | Metadata, nav, quiet links (163,163,163) |
| `--color-border`        | `rgb(255 255 255 / 0.15)`       | Section rules                            |
| `--color-border-subtle` | `rgb(255 255 255 / 0.12)`       | Image borders                            |

Use `text-body` and `text-muted`. Do not reach for Tailwind's `neutral` or
`gray` ramps: they bypass the tokens, and `neutral-400` is `oklch(70.8% 0 0)`,
which is a different grey from `--color-muted` even though it looks identical.

The accent must stay `oklch(62.796% 0.25768 29.234)`. Rounding the hue to `29.2`
shifts the blue channel to 1 and the colour is no longer `#f00`.

### Contrast

Measured against `--color-surface`: accent 5.25:1, body 14.17:1, muted 8.33:1.
Selected text uses `--color-surface` on `--color-brand`, which is the same 5.25:1
pair. White on the accent would be 4.0:1 and fails AA for body-sized text, so do
not restore `text-foreground` in `::selection`.

Tailwind v4 requires Safari 16.4+, Chrome 111+ and Firefox 128+, which is above
the `oklch()` floor, so no fallback is needed. Two things do not work here:

- a hex-then-OKLCH pair inside `@theme`, because custom properties are only
  validated at computed-value time, so an unsupported value makes `var()`
  invalid rather than falling back;
- relative colour syntax such as `oklch(from ...)`, which needs Chrome 119+.
  Use `color-mix()` if a value must be derived from a token.

The build keeps `oklch()` rather than downlevelling it, so the source and the
output match.

## Cascade

`@layer base` holds element defaults; `@layer components` holds everything
scoped to the page. There are two deliberate exceptions outside the layers:

- `@media (prefers-reduced-motion: reduce)` must outrank animation and
  transition declarations, which only works unlayered.
- `.js .reveal` is paired with that block and stays with it.

Unlayered rules beat every layer regardless of specificity. Keep new rules inside
a layer, or they will silently win over both utilities and components. This is
why `#intro h1` and `#home h1` used to disagree: the unlayered one always won.

## Viewport units

`header` uses `svh`, not `vh`, so the full-height block matches the visible area
when mobile browser chrome is showing. `#tao` keeps the full-height `svh` size
and is positioned around the hero rather than taking part in its flow.

In portrait the hero is a two-row grid. The first row reserves at least `34svh`
for the logo and the second row holds `#intro`; when the copy is taller than the
viewport the header grows to fit instead of pushing the text up over the logo.

## Text autosizing

Tailwind's preflight sets only `-webkit-text-size-adjust: 100%`. Firefox Android
does not use that prefix for text inflation, so it can enlarge the hero copy
while Chrome leaves it alone. `html` therefore sets both the prefixed and
unprefixed `text-size-adjust: 100%`.

Do not add `user-scalable=no` or `maximum-scale` to the viewport tag to control
text size; they block pinch zoom. The viewport stays `width=device-width,
initial-scale=1.0`.

## Reflow

The page must not scroll horizontally at 320px. Centred flex columns size their
children to max-content, so a long unbreakable string needs a constrained parent
(`max-w-full`) before `break-words` can do anything. `.contact-primary` is the
case that taught us this.

The rotating `#tao` logo extends past the right edge at every width. `body`
alone cannot keep the document scroll width at the viewport, so `html` uses
`overflow-x: clip`. Unlike `hidden`, the root clip does not stop vertical
scrolling.

## Breakpoints

Tailwind's defaults; `md` is `48rem`, which matches the one hand-written
`@media (min-width: 48rem)` on `.work-item`. That rule stays explicit because a
two-column `minmax()` template through `@apply` would need an arbitrary value.

## Deliberately left alone

- `--color-border` and `--color-border-subtle` stay separate; merging them is a
  visible change with no maintenance gain.
- The `max-w-4xl px-5 py-20 sm:py-24` container appears both on `#work` and on
  the wrapper divs of `#approach`, `#projects` and `#contact`. A shared class
  would mean putting utilities back in the markup for one repeated line.
- `text-balance` on `body` and `font-extralight` body copy are identity choices
  that check out on contrast (14.17:1).
- `#projects > div > div > .project:first-child` still mirrors DOM depth. Fixing
  it properly needs a class in the markup, because `:first-of-type` would also
  match the first game card.

`tests/styles.spec.js` pins the overflow, heading scale, text colours and
selection contrast so these rules cannot regress silently.
