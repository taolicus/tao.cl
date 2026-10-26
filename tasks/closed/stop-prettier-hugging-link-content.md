---
area: frontend
---

# Stop Prettier from hugging link content and stranding brackets

## Context

`index.html` was formatted at Prettier's default 80-column width. When an
inline element's start tag and content cannot share a line, the HTML printer
falls back to hugging the content to the broken tag and moving the bracket to
the next line. The committed file contained several instances:

- `>Download CV<span …>` after a broken start tag.
- `></a` and `</span\n>` line endings.
- A bare `>` on its own line for the Coca-Cola archive link, whose
  `web.archive.org` URL is longer than any sensible line width.
- Seven bare `/>` lines for images and meta tags with broken attributes.

These are hard to read and churn on every reformat. The fix has two parts: put
inline content on its own lines so Prettier keeps it there, and keep the
closing bracket attached to the last attribute so a long URL cannot strand it.

## Acceptance criteria

- The source contains no lone `>` or `/>` line, no `>text` immediately after a
  broken start tag, no tag name split from its `>` or from a following `<`, and
  no `></tag` line ending.
- `prettier --check` passes and a second `--write` changes nothing.
- Visible text, link accessible names, landmark structure and layout are
  unchanged.

## Verification

- Grep the source for each quirk pattern.
- `npx prettier --check` after two consecutive `--write` runs.
- Playwright against the built output: all link names still carry
  "(opens in a new tab)" and exclude the decorative arrow; landmarks and the
  first tab stop are unchanged; every `.reveal` still becomes visible.
- Compare the previous and current builds: full-page screenshots at 1280x900
  and 375x812, plus every element's box, tag, class and collapsed text.
- `npm run build` and `sh workflow/lint.sh`.

## Outcome

- Restructured every anchor whose content Prettier was hugging: the two CV
  links, the four `.visit` lines, the six product links (KXP, Two Idiots One
  Ship, Komikan), the Bootstrap link, and the footer GitHub and LinkedIn links.
  Each now has its text and `sr-only` hint on indented lines, which Prettier
  keeps as written. The ` (opens in a new tab)` sr-only strings no longer need
  a leading space; the line break supplies it.
- Added an HTML-only Prettier override setting `bracketSameLine: true`. This
  puts `>` and `/>` at the end of the last attribute line instead of on their
  own, which is the only way to keep the 149-character archive URL from
  stranding a bracket. It applies to the meta and image tags too, removing
  seven bare `/>` lines.
- No prose was reflowed: the HTML override keeps the default 80-column width.
  143 lines change, all bracket placement or the restructured links.

Verified by grepping the source for each quirk pattern (none remain) and by
running Prettier twice (`--check` clean, second `--write` a no-op). Playwright
against the built output confirms every link's accessible name is unchanged,
still ends with "(opens in a new tab)", and excludes the arrow; landmarks are
still `main`, `navigation` and `contentinfo`; the first tab stop is still
"See selected work"; every `.reveal` reaches opacity 1. Element-by-element
comparison of the previous and current builds shows identical text, positions
and sizes for all 132 elements apart from the two spinning logos, whose
animation phase differs between captures.

Full-page screenshots are not byte-identical: 76 pixels differ on a single
glyph of the mid-sentence Bootstrap link, and the hero CV link is 4px wider.
Both come from moving a whitespace run from the paragraph into the link,
because Prettier places `</a>` on its own line. Text position and glyphs are
unchanged; the only observable effect is a 4px longer hover underline under the
trailing space of that CV link. This is inherent to formatting an inline link
across lines and was accepted rather than reintroducing the hugging quirks.
