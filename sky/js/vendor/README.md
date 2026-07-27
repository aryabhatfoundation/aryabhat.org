# Vendored libraries

The Sky Atlas promises it "works on a phone, in the dark, with cold hands".
Until these were copied here, every one of them was a CDN fetch at page load,
so at an actual camp site on a weak signal the pages drew nothing. They are
served from this domain now, which also means a night you looked at yesterday
still opens tonight from the browser cache.

`satellite.min.js` in the parent directory was already vendored for the same
reason; this directory extends that to the rest.

| File | Version | Source | Licence |
|---|---|---|---|
| `d3.min.js` | 3.5.17 | cdnjs | BSD-3-Clause |
| `d3.geo.projection.min.js` | 0.2.16 | cdnjs | BSD-3-Clause |
| `celestial.min.js` | d3-celestial (latest at fetch) | jsDelivr | BSD-3-Clause, © 2015-2020 Olaf Frohn |
| `suncalc.min.js` | 1.9.0 | cdnjs | BSD-2-Clause, © 2014 Vladimir Agafonkin |
| `astronomy.browser.min.js` | 2.1.19 | jsDelivr | MIT, © Don Cross |

The star, constellation and Milky Way catalogues d3-celestial reads at runtime
are in `../data/celestial/`, taken from <https://ofrohn.github.io/data/> — the
same files, previously fetched from GitHub Pages on every page view.

## Refreshing

Re-download from the URLs above and check the pages still draw. Nothing here is
patched, so a straight replacement is safe. `d3` is pinned at 3.x because
d3-celestial requires that major version; do not upgrade it independently.
