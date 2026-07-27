document.addEventListener("DOMContentLoaded", function () {
    // 1. Inject Header
    // Logo + wordmark drop-shadows follow design.md §1.6:
    // layered WHITE halo + dark depth shadow. Never gold (reserved
    // for interactive accents), never cool/warm tints (drift toward
    // metallic / amber).
    var headerHTML = `
    <div class="row">
        <div class="six columns offset-by-two ">
          <img class="value-img" style="filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.5)) drop-shadow(2px 3px 3px rgba(0, 0, 0, 0.5));" src="/images/title.svg">
        </div>
        <div class="six columns logo">
          <img class="value-img" width="300" height="100"
            style="filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.7)) drop-shadow(0 0 12px rgba(255, 255, 255, 0.22)) drop-shadow(2px 3px 4px rgba(0, 0, 0, 0.5));" src="/images/aryabhat.svg">
        </div>
    </div>`;

    var headerElement = document.querySelector('.header');
    if (headerElement) {
        headerElement.innerHTML = headerHTML;
    }

    // 2. Inject Navbar
    //
    // Hrefs are root-absolute: not every page sits at the root any more, and
    // a relative "index.html" from /sky/ would point inside the section.
    //
    // "Sky" is one item covering a whole section — the sky map, the evening
    // show, the constellation atlas and the star list. Those four used to be
    // reachable two different ways with no visible relationship between
    // them; they share a sub-nav of their own now (sky/js/sky-nav.js), and
    // the top bar just says which section you are in. `prefix` marks an item
    // that owns a directory rather than a single file.
    var navLinks = [
        { href: "/index.html", text: "Home", also: ["/", "/oldindex.html"] },
        { href: "/quiz.html", text: "Astronomy Quiz" },
        { href: "/sky/", text: "Sky", prefix: "/sky/" },
        { href: "/download.html", text: "Download" },
        { href: "/photos.html", text: "Photos" },
        { href: "/contact.html", text: "Contact Us" }
    ];

    // "/sky/" and "/sky/index.html" are the same page; normalise so either
    // spelling matches.
    var path = window.location.pathname;
    if (path === '' || path === '/') path = '/index.html';

    var navListHTML = '<div class="container"><ul class="navbar-list">';

    navLinks.forEach(function (link) {
        var isCurrent = link.prefix
            ? path.indexOf(link.prefix) === 0
            : path === link.href || (link.also || []).indexOf(path) !== -1;
        var activeClass = isCurrent ? 'navbar-item current' : 'navbar-item';
        var linkClass = isCurrent ? 'navbar-link active' : 'navbar-link';

        navListHTML += `<li class="${activeClass}"><a class="${linkClass}" href="${link.href}">${link.text}</a></li>`;
    });

    navListHTML += '</ul></div>';

    var navbarElement = document.querySelector('.navbar');
    if (navbarElement) {
        navbarElement.innerHTML = navListHTML;
    }
});
