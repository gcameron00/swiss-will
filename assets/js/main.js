/* ==========================================================================
   Swiss Will — site JavaScript
   Progressive enhancement only. The site works fully without JS.
   ========================================================================== */
(function () {
  "use strict";

  /**
   * Mobile navigation toggle.
   * The nav is visible by default (no-JS friendly via CSS); on small screens
   * CSS hides it and this handler toggles the `is-open` class.
   */
  function initNavToggle() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".site-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    // Close the menu after following a link (small screens).
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /**
   * Highlight the current page in the nav based on the URL path.
   * Looks for `data-nav` attributes that match `document.body.dataset.page`.
   */
  function initActiveNav() {
    var page = document.body.getAttribute("data-page");
    if (!page) return;
    var link = document.querySelector('.site-nav a[data-nav="' + page + '"]');
    if (link) link.setAttribute("aria-current", "page");
  }

  /** Stamp the current year into any element with [data-year]. */
  function initYear() {
    var year = String(new Date().getFullYear());
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = year;
    });
  }

  function init() {
    initNavToggle();
    initActiveNav();
    initYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
