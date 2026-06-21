# Architecture & conventions

This document records the design decisions behind the Swiss Will site so that
future contributors stay consistent.

## Goals

- **Simplicity** — no framework, no build step, no dependencies to maintain.
- **Speed** — static files served from Cloudflare's edge.
- **Accessibility** — semantic HTML, keyboard support, sufficient contrast.
- **Resilience** — works with JavaScript disabled.

## Tech choices

| Concern        | Choice                                            |
| -------------- | ------------------------------------------------- |
| Markup         | Static HTML, one file per page                     |
| Styling        | Single `styles.css` with CSS custom properties     |
| Scripting      | Vanilla JS, progressive enhancement only           |
| Theming        | `prefers-color-scheme` (system light/dark)         |
| Hosting        | Cloudflare Pages (static, no build command)        |
| URLs           | Folder `index.html` for clean paths                |

## Page structure

Every page shares the same skeleton so the look stays uniform:

1. `<head>` — charset, viewport, `color-scheme`, title, description, favicon,
   stylesheet, deferred script.
2. Skip link (`.skip-link`) for keyboard users.
3. `header.site-header` — brand, mobile nav toggle, primary `nav.site-nav`.
4. `main#main` — page content inside `.container`.
5. `footer.site-footer` — copyright (year stamped by JS) and disclaimer.

The `<body>` carries a `data-page` attribute (`home`, `options`, `about`, …).
`main.js` reads it and sets `aria-current="page"` on the matching nav link.

### A note on shared markup

Because there is no build step or framework, the header and footer are currently
**duplicated** in each HTML file. This is a deliberate trade-off for
zero-tooling simplicity. If duplication becomes painful, see the
"Templating" item in the implementation plan for options (HTML includes via a
small build step, or client-side injection).

## CSS conventions

- Design tokens (colours, spacing, radius, shadow) are defined as custom
  properties in `:root` and overridden in a `prefers-color-scheme: dark` block.
- Layout uses a `.container` (max-width + centered) and fl/grid utilities such
  as `.card-grid`.
- Component classes are named by role: `.site-header`, `.card`, `.btn`, `.note`.
- Avoid IDs for styling; use them only as link/scroll targets.

## JavaScript conventions

- Wrapped in an IIFE with `"use strict"`.
- Each feature is a small, named `init*` function guarded against missing
  elements, so a page without a given component simply skips it.
- No globals are leaked; no external libraries.

## Accessibility checklist

- One `<h1>` per page; headings in order.
- All interactive elements reachable and operable by keyboard.
- Visible focus styles (`:focus-visible`).
- Decorative images use empty `alt`.
- Colour is never the only signal.
