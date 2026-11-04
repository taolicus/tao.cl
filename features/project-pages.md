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
  `.case-status`, `.case-meta`, `.case-lede`, `.case-copy`, `.case-figure`,
  `.case-caption` and `.case-return`.

`.case-return` repeats the Selected work link at the end of a case study so a
reader does not have to scroll back to the header.

The hero header rules still target `header`; `.case-header` overrides the
full-height flex layout for project pages without changing the homepage.

## Content rules

The project pages use only contribution evidence confirmed by Tao. Do not add
metrics, customer data or implementation specifics that are not backed by that
evidence.

Both pages use the same case-study shape: title, role and dates, an opening
paragraph, then two or three short sections describing the work. The homepage
cards summarise the same achievements. The MyHyve card and page use qualitative
security wording and do not publish audit counts, severity breakdowns,
unresolved findings or dependency details. The Share a Coke page keeps
commercial implementation details out of the public copy and uses the campaign
screenshot only as historical evidence with its supplied caption.

Team work is stated as team work. The MyHyve page does not claim that Tao
verified or deployed work owned by colleagues, and the Share a Coke page does
not claim that he designed the application architecture or owned the campaign's
reach.
