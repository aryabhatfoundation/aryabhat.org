document.addEventListener("DOMContentLoaded", function () {
    // 1. Inject Header
    var headerHTML = `
    <div class="row">
        <div class="six columns offset-by-two ">
          <img class="value-img" style="filter: drop-shadow(4px 4px 2px rgba(0, 0,100, 1));" src="images/title.svg">
        </div>
        <div class="six columns logo">
          <img class="value-img" width="300" height="100"
            style="filter: drop-shadow(1px 2px 2px rgba(205, 205, 255, 1));" src="images/aryabhat.svg">
        </div>
    </div>`;

    var headerElement = document.querySelector('.header');
    if (headerElement) {
        headerElement.innerHTML = headerHTML;
    }

    // 2. Inject Navbar
    var navLinks = [
        { href: "index.html", text: "Home" },
        { href: "quiz.html", text: "Astronomy Quiz" },
        { href: "sky.html", text: "Sky Map" },
        { href: "download.html", text: "Download" },
        { href: "photos.html", text: "Photos" },
        { href: "contact.html", text: "Contact Us" }
    ];

    var currentFile = window.location.pathname.split('/').pop() || 'index.html';

    var navListHTML = '<div class="container"><ul class="navbar-list">';

    navLinks.forEach(function (link) {
        var isCurrent = currentFile === link.href;
        var activeClass = isCurrent ? 'navbar-item current' : 'navbar-item';
        // Note: previously text color class logic might have been different, but 'current' class handles styling now.
        // There was a specific active class or style in CSS? 
        // CSS: .navbar-link.active { color: #ffcc33; } 
        // Step 206 change: .navbar-link.active styling.
        // So we might need adding 'active' class to the <a> tag itself if it is current.

        var linkClass = isCurrent ? 'navbar-link active' : 'navbar-link';

        navListHTML += `<li class="${activeClass}"><a class="${linkClass}" href="${link.href}">${link.text}</a></li>`;
    });

    navListHTML += '</ul></div>';

    var navbarElement = document.querySelector('.navbar');
    if (navbarElement) {
        navbarElement.innerHTML = navListHTML;
    }
});
