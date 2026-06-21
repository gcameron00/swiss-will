# Implementation plan

A phased plan for building out the Swiss Will site from the current placeholder
shell to a complete, accurate reference.

## Status

- ✅ **Phase 0 — Shell (this PR):** project scaffold, shared layout, navigation,
  styling, placeholder pages, docs, and Cloudflare Pages config.

---

## Phase 1 — Foundation polish

- [ ] Replace placeholder copy on the home and About pages with final wording.
- [ ] Add Open Graph / Twitter Card meta tags and a social share image.
- [ ] Add `robots.txt` and `sitemap.xml`.
- [ ] Add favicon variants (PNG fallbacks, `apple-touch-icon`).
- [ ] Decide on and document a content tone/style guide.

## Phase 2 — Content build-out

- [ ] **Intestate succession:** statutory order, parentela system, spousal
      shares, with article references to the ZGB/CC.
- [ ] **Wills:** forms (holographic, public, oral), formal requirements,
      revocation, the disposable portion and current forced-heirship fractions.
- [ ] **Inheritance contracts:** formalities, types (positive/renunciation),
      typical use cases, how they interact with wills.
- [ ] Cross-cutting topics: forced heirship in depth, the surviving spouse,
      usufruct, advancements/gifts, international/cross-border estates.
- [ ] A glossary of key terms (DE/FR/IT/EN where helpful).
- [ ] Source list / further reading with links to official resources.

## Phase 3 — UX & navigation

- [ ] Decide whether shared header/footer should be templated (see below).
- [ ] Add breadcrumbs on deep pages.
- [ ] Add an on-page table of contents for long articles.
- [ ] Optional: a simple "which option fits me?" interactive decision guide.
- [ ] Optional: search across pages (e.g. a prebuilt client-side index).

## Phase 4 — Internationalisation (optional)

- [ ] Evaluate German / French / Italian translations (Switzerland's languages).
- [ ] Define a URL strategy (`/de/`, `/fr/`, `/it/`) and `hreflang` tags.

## Phase 5 — Quality & operations

- [ ] Add HTML/CSS/JS linting and formatting (e.g. Prettier, html-validate).
- [ ] Add a link checker in CI.
- [ ] Run Lighthouse for performance/accessibility/SEO and track scores.
- [ ] Verify the custom domain, HTTPS, and caching on Cloudflare Pages.
- [ ] Add basic privacy-friendly analytics (optional).

---

## Decision: templating shared markup

The header and footer are currently duplicated across pages. Options if this
becomes a maintenance burden:

1. **Keep duplication** — simplest; fine while pages are few.
2. **Tiny build step** — use a static-site generator or an HTML include tool to
   compose pages from partials. Keeps output static; adds a build command.
3. **Client-side injection** — fetch/inject a shared header/footer with JS.
   Avoid for the primary nav (hurts no-JS users and SEO).

Recommended: revisit at Phase 3 and adopt **option 2** only if page count grows
enough to justify a build step.

## Definition of done (per content page)

- Accurate, plainly written, and reviewed against an authoritative source.
- References cited (article numbers / official links).
- Passes accessibility and link checks.
- "Not legal advice" disclaimer present.
