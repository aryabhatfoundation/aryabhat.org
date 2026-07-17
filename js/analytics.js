// Google Analytics 4 — centralized for aryabhat.org
// Single source of truth for the GA4 measurement ID. Loaded via
// <script src="/js/analytics.js"></script> in the <head> of every page.
(function () {
  var GA_MEASUREMENT_ID = 'G-840CCL34DC';

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);
})();
