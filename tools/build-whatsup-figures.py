#!/usr/bin/env python3
"""Build js/whatsup-figures.js — the little star patterns whatsup.html draws.

whatsup.html used to carry its own table of star coordinates, typed out by
hand, for each of the fourteen patterns it shows. Those were the same stars
already in js/constellation-data.js, entered a second time: every one of the
98 positions matched a catalogue star to within two arcminutes. Two copies of
the same sky is one copy too many — a correction to the database would have
silently left the story player showing the old positions.

So the coordinates come from the database now, and what stays here is the
only part that was ever an editorial decision: WHICH stars each pattern
draws, and how they join up. whatsup deliberately shows simplified figures —
fewer stars than the full IAU tracing, because these are drawn small on a
phone and meant to be recognisable at a glance, not complete.

The story player is used outdoors on mobile data, so it does not load the
236 KB constellation database at runtime for fourteen small figures. This
script resolves the stars at build time and emits a 4 KB file instead.

Usage:
    python3 tools/build-whatsup-figures.py
"""

import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SOURCE = os.path.join(ROOT, "js", "constellation-data.js")
TARGET = os.path.join(ROOT, "js", "whatsup-figures.js")

# Which stars each pattern draws, by Hipparcos number, and how they connect.
#
#   hip     the stars, in the order the line indices refer to
#   bright  indices drawn as the large, gold "anchor" dots
#   lines   pairs of indices to join
#
# Three of these are not simply "one IAU constellation":
#   ursa     is the Big Dipper — seven stars of Ursa Major, not the whole Bear
#   taurus   borrows Elnath, which the IAU assigns to Auriga; it is the shared
#            star that used to be both β Tauri and γ Aurigae, and the bull's
#            horn does not read without it
#   pegasus  spans Pegasus and Andromeda on purpose: the Great Square and the
#            chain of stars leading off it are one thing to point at
FIGURES = {
    # Betelgeuse, Bellatrix, Alnitak, Alnilam, Mintaka, Saiph, Rigel
    "orion": {
        "hip": [27989, 25336, 26727, 26311, 25930, 27366, 24436],
        "bright": [0, 6],
        "lines": [[0, 1], [0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6], [5, 6]],
    },
    # Dubhe, Merak, Phecda, Megrez, Alioth, Mizar, Alkaid
    "ursa": {
        "hip": [54061, 53910, 58001, 59774, 62956, 65378, 67301],
        "bright": [],
        "lines": [[0, 1], [1, 2], [2, 3], [3, 0], [3, 4], [4, 5], [5, 6]],
    },
    # Caph, Schedar, γ Cassiopeiae, Ruchbah, Segin
    "cassiopeia": {
        "hip": [746, 3179, 4427, 6686, 8886],
        "bright": [],
        "lines": [[0, 1], [1, 2], [2, 3], [3, 4]],
    },
    # Elnath (Aur), Tianguan, Aldebaran, Hyadum I, Hyadum II, Ain
    "taurus": {
        "hip": [25428, 26451, 21421, 20205, 20455, 20889],
        "bright": [2],
        "lines": [[3, 2], [3, 4], [4, 5], [5, 0], [2, 1]],
    },
    # Castor, Pollux, Mebsuta, Tejat, Alhena, Wasat
    "gemini": {
        "hip": [36850, 37826, 32246, 30343, 31681, 35550],
        "bright": [0, 1],
        "lines": [[0, 1], [0, 2], [2, 3], [1, 5], [5, 4]],
    },
    # Regulus, η Leonis, Algieba, Adhafera, Rasalas, Algenubi, Zosma,
    # Chertan, Denebola
    "leo": {
        "hip": [49669, 49583, 50583, 50335, 48455, 47908, 54872, 54879, 57632],
        "bright": [0],
        "lines": [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [2, 6], [6, 8], [8, 7],
                  [7, 0], [6, 7]],
    },
    # Arcturus, Izar, δ Boötis, Nekkar, Seginus, ρ Boötis, Muphrid
    "bootes": {
        "hip": [69673, 72105, 74666, 73555, 71075, 71053, 67927],
        "bright": [0],
        "lines": [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [0, 6]],
    },
    # Acrab, Dschubba, Fang, Antares, Paikauhale, Larawag, Xamidimura,
    # ζ² Scorpii, η Scorpii, Sargas, κ Scorpii, Shaula
    "scorpius": {
        "hip": [78820, 78401, 78265, 80763, 81266, 82396, 82514, 82729, 84143,
                86228, 86670, 85927],
        "bright": [3],
        "lines": [[0, 1], [1, 2], [1, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8],
                  [8, 9], [9, 10], [10, 11]],
    },
    # Alnasl, Kaus Media, Kaus Australis, Kaus Borealis, φ Sagittarii, Nunki,
    # τ Sagittarii, Ascella — the Teapot
    "sagittarius": {
        "hip": [88635, 89931, 90185, 90496, 92041, 92855, 93864, 93506],
        "bright": [5],
        "lines": [[0, 1], [0, 2], [1, 2], [2, 7], [7, 4], [4, 1], [3, 1], [3, 4],
                  [4, 5], [5, 6], [6, 7]],
    },
    # Deneb, Sadr, Albireo, Fawaris, Aljanah
    "cygnus": {
        "hip": [102098, 100453, 95947, 97165, 102488],
        "bright": [0],
        "lines": [[0, 1], [1, 2], [3, 1], [1, 4]],
    },
    # Vega, ε² Lyrae, ζ¹ Lyrae, δ² Lyrae, Sulafat, Sheliak
    "lyra": {
        "hip": [91262, 91926, 91971, 92791, 93194, 92420],
        "bright": [0],
        "lines": [[0, 1], [0, 2], [1, 2], [2, 5], [5, 4], [4, 3], [3, 2]],
    },
    # Sirius, Mirzam, Wezen, Adhara, Aludra, Furud
    "canis": {
        "hip": [32349, 30324, 34444, 33579, 35904, 30122],
        "bright": [0],
        "lines": [[1, 0], [0, 2], [2, 3], [2, 4], [3, 5]],
    },
    # Capella, Menkalinan, Mahasim, Elnath, Hassaleh
    "auriga": {
        "hip": [24608, 28360, 28380, 25428, 23015],
        "bright": [0],
        "lines": [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]],
    },
    # Markab, Scheat, Alpheratz (And), Algenib, Mirach (And), Almach (And)
    "pegasus": {
        "hip": [113963, 113881, 677, 1067, 5447, 9640],
        "bright": [],
        "lines": [[0, 1], [1, 2], [2, 3], [3, 0], [2, 4], [4, 5]],
    },
}


def load_catalogue():
    """Every charted star from js/constellation-data.js, keyed by HIP."""
    with open(SOURCE, encoding="utf-8") as fh:
        text = fh.read()
    match = re.search(r"window\.CONSTELLATION_DATA\s*=\s*(\{.*\});?\s*$", text, re.S)
    if not match:
        raise SystemExit("could not find window.CONSTELLATION_DATA in " + SOURCE)
    data = json.loads(match.group(1))

    stars = {}
    for con in data["constellations"]:
        for star in con["stars"]:
            # A star can be charted in more than one constellation's frame;
            # the position is the same either way, so first one wins.
            stars.setdefault(star["hip"], star)
    return stars


def build():
    stars = load_catalogue()
    figures = {}
    missing = []

    for fid, spec in FIGURES.items():
        points = []
        for hip in spec["hip"]:
            star = stars.get(hip)
            if star is None:
                missing.append((fid, hip))
                continue
            # asterSVG() wants right ascension in hours, declination in degrees.
            points.append([round(star["ra"] / 15.0, 4), round(star["dec"], 4)])

        count = len(spec["hip"])
        for a, b in spec["lines"]:
            if a >= count or b >= count:
                raise SystemExit("%s: line (%d,%d) is out of range" % (fid, a, b))
        for i in spec["bright"]:
            if i >= count:
                raise SystemExit("%s: bright index %d is out of range" % (fid, i))

        figures[fid] = {"s": points, "b": spec["bright"], "l": spec["lines"]}

    if missing:
        raise SystemExit("stars not in the catalogue: "
                         + ", ".join("%s HIP %d" % m for m in missing))

    header = (
        "/*\n"
        " * whatsup-figures.js — generated, do not edit by hand.\n"
        " * Rerun tools/build-whatsup-figures.py to refresh.\n"
        " *\n"
        " * The star patterns whatsup.html draws. Positions come from\n"
        " * js/constellation-data.js, so this file and the constellation atlas\n"
        " * can never disagree about where a star is; which stars each pattern\n"
        " * uses, and how they join up, is set in the build script.\n"
        " *\n"
        " * s = [[right ascension in hours, declination in degrees], ...]\n"
        " * b = indices of the anchor stars, drawn large\n"
        " * l = pairs of indices to join with a line\n"
        " *\n"
        " * Stars: Hipparcos (ESA 1997) via VizieR.\n"
        " */\n"
    )
    payload = json.dumps(figures, separators=(",", ":"), ensure_ascii=False)
    with open(TARGET, "w", encoding="utf-8") as fh:
        fh.write(header + "window.WHATSUP_FIGURES = " + payload + ";\n")

    print("wrote %s — %d figures, %d stars, %d bytes"
          % (os.path.relpath(TARGET, ROOT), len(figures),
             sum(len(f["s"]) for f in figures.values()),
             os.path.getsize(TARGET)))


if __name__ == "__main__":
    sys.exit(build())
