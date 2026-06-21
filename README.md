# Swiss Will

A placeholder website describing the options for **inheritance and estate
planning in Switzerland**.

> ⚠️ **Placeholder & not legal advice.** The current content is illustrative and
> exists to establish the site shell and layout. It will be replaced with
> accurate, sourced material. Nothing here is legal advice.

## Overview

The site is intentionally simple: hand-written **HTML, CSS, and vanilla
JavaScript** with **no framework** and **no build step**. It is designed to be
deployed as static files to **Cloudflare Pages**.

The aim is a clear, fast, accessible reference covering the main routes for
passing on a Swiss estate:

- **No will (intestate succession)** — the statutory order of succession.
- **Writing a will** — holographic and public wills, the disposable portion.
- **Inheritance contract (Erbvertrag)** — a binding, notarised agreement.

## Project structure

```
.
├── index.html                         # Home page
├── 404.html                           # Custom not-found page
├── about/
│   └── index.html                     # About the project
├── options/
│   ├── index.html                     # Options overview
│   ├── intestate/index.html           # No will
│   ├── will/index.html                # Writing a will
│   └── inheritance-contract/index.html# Inheritance contract
├── assets/
│   ├── css/styles.css                 # Single stylesheet (design tokens + layout)
│   ├── js/main.js                     # Progressive enhancement (nav, year)
│   └── favicon.svg                    # Site icon
├── _headers                           # Cloudflare Pages response headers
├── _redirects                         # Cloudflare Pages redirects
├── README.md
└── docs/
    ├── IMPLEMENTATION_PLAN.md          # Phased build-out plan
    └── ARCHITECTURE.md                # Conventions & design decisions
```

Each page uses clean URLs via folder `index.html` files (e.g. `/options/will/`).

## Local development

No tooling is required — open `index.html` directly in a browser, or serve the
folder over HTTP so that root-relative paths (`/assets/...`, `/options/...`)
resolve correctly:

```bash
# Python 3 (built in on most systems)
python3 -m http.server 8080
# then visit http://localhost:8080

# …or with Node
npx serve .
```

Serving over HTTP (rather than `file://`) is recommended because the site uses
absolute paths.

## Deployment — Cloudflare Pages

This repository is a ready-to-deploy static site.

1. In the Cloudflare dashboard, create a **Pages** project and connect this Git
   repository.
2. Build settings:
   - **Framework preset:** None
   - **Build command:** _(leave empty)_
   - **Build output directory:** `/` (the repository root)
3. Deploy. Pushes to the production branch publish automatically; pull requests
   get preview deployments.

`_headers` and `_redirects` at the repository root are picked up by Cloudflare
Pages automatically.

## Conventions

- Two-space indentation for HTML/CSS/JS.
- Root-relative links (`/about/`, `/assets/...`).
- CSS custom properties (design tokens) live at the top of `styles.css`.
- JavaScript is **progressive enhancement only** — the site is fully usable
  with JS disabled.
- Light and dark themes follow the user's system preference.

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the rationale and
[`docs/IMPLEMENTATION_PLAN.md`](docs/IMPLEMENTATION_PLAN.md) for the roadmap.

## Disclaimer

Swiss succession law is governed by the Civil Code (ZGB/CC) and may change. This
project is informational only and is **not a substitute for advice from a
qualified notary or lawyer**.
