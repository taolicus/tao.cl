# Project pages

The site has two static project pages in addition to the homepage:

- `/work/myhyve/` — "Modernising the MyHyve Ticketing Portal" case study.
- `/work/share-a-coke/` — "Building the Share a Coke Customisation
  Experience" case study.

Each page is a directory with its own `index.html`, so the public URLs keep a
trailing slash and work without a client-side router.

## Build and routing

`vite.config.js` declares all three HTML entry points through
`build.rollupOptions.input`. Without that, Vite would build only `index.html`
and the nested pages would be missing from `dist/`.

`public/sitemap.xml` lists both project URLs. The pages link back to the
homepage with root-relative paths, so they work from the site root in both
development and the static production build.

## Styling

`src/main.css` keeps the existing `source(none)` policy and adds
`@source "../work/**/*.html"` so utilities used on the project pages are
generated. The shared project-page classes are in the components layer:

- `.case-header`, `.case-back`, `.case-nav`, `.case-study`, `.case-kicker`,
  `.case-status`, `.case-meta`, `.case-lede`, `.case-glance`,
  `.case-glance-label`, `.case-copy`, `.case-figure`, `.case-caption`,
  `.case-workflow`, `.case-return` and `.case-note`.
- `.workflow`, `.workflow-title`, `.workflow-steps`, `.workflow-step`,
  `.workflow-step-label` and `.workflow-note` render the accessible three-step
  diagram used on the MyHyve card and case study.

`.case-glance` is a three-column list of technical highlights directly below
the page lede. `.case-return` repeats the Selected work link at the end of a
case study so a reader does not have to scroll back to the header.

The hero header rules still target `header`; `.case-header` overrides the
full-height flex layout for project pages without changing the homepage.

## Content rules

The project pages use only the contribution evidence recorded in
`issues/commercial-project-details-need-input.md` and the closed tasks that
added it. The MyHyve diagram uses fictional ticket data and omits internal
details. Do not add metrics, customer data or implementation specifics that are
not backed by that evidence.

Both pages use the same case-study shape: title and one-sentence summary, role
and dates, three "At a glance" highlights, then engineering problem,
contribution, outcome and limitations. The MyHyve page leads with the Angular
modernisation and dependency-security work; the monthly ticket automation is a
supporting example. The Share a Coke page leads with the market-configuration
and step-transition problem; the campaign's commercial results are explicitly
outside the page's claims.

Team work is stated as team work. The MyHyve page does not claim that Tao
verified or deployed the monthly ticket patch, and the Share a Coke page does
not claim that he designed the application architecture or owned the campaign's
reach.
