#!/usr/bin/env python3
"""Build js/constellation-data.js for constellations.html.

Reads two databases from the Bhagol repo:

  docs/constellation-lines/constellation-lines.json  — IAU figures, keyed to
      Hipparcos stars, with a stereographic projection per constellation.
  docs/star-names/star-names.json  — Sanskrit star names with their textual
      attestations.

and emits a single minified `window.CONSTELLATION_DATA` payload. The web page
draws the charts itself from the projected coordinates, so the SVGs in the
Bhagol repo are not copied here.

Usage:
    python3 tools/build-constellation-data.py [path-to-bhagol]
"""

import json
import os
import re
import sys

BHAGOL = sys.argv[1] if len(sys.argv) > 1 else os.path.expanduser("~/dev/bhagol")
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                   "..", "js", "constellation-data.js")

LINES_JSON = os.path.join(BHAGOL, "docs/constellation-lines/constellation-lines.json")
NAMES_JSON = os.path.join(BHAGOL, "docs/star-names/star-names.json")

GREEK = "αβγδεζηθικλμνξοπρστυφχψω"
SUPERSCRIPT = {"1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵"}


# ---------------------------------------------------------------------------
# Sanskrit names -> Hipparcos numbers
# ---------------------------------------------------------------------------

def normalise_designation(text):
    """'phi1 Orionis' style input -> 'φ¹ Orionis' as the figure database spells it."""
    text = text.strip()
    # A digit straight after a Greek letter is a superscripted Bayer index.
    return re.sub(
        "([" + GREEK + "])([1-5])",
        lambda m: m.group(1) + SUPERSCRIPT[m.group(2)],
        text,
    )


DESIG_RE = re.compile(
    r"^([" + GREEK + r"][¹²³⁴⁵]?|[A-Za-z]|\d{1,3})\s+"
    r"([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)$"
)


def parse_star_refs(text):
    """Pull ('α', 'Ursae Majoris') pairs out of the free-text `bayer` field.

    The field ranges from a bare 'β Arietis' to
    'α, β, γ, δ, ε, ζ, η Ursae Majoris' to prose with parentheses, so bare
    letters inherit the genitive of the last fully-qualified token beside them.
    """
    if not text:
        return []
    text = re.sub(r"\([^)]*\)", " ", text)          # drop parentheticals
    text = text.split(":")[-1]                       # drop 'brightest members:'
    refs = []
    for alternative in text.split("/"):
        for group in re.split(r"\band\b|;|\bwith\b", alternative):
            tokens = [normalise_designation(t) for t in group.split(",")]
            genitive = None
            parsed = []
            for token in tokens:
                match = DESIG_RE.match(token)
                if match:
                    parsed.append((match.group(1), match.group(2)))
                    genitive = match.group(2)
                elif re.fullmatch(r"[" + GREEK + r"][¹²³⁴⁵]?|\d{1,3}", token):
                    parsed.append((token, None))     # genitive filled in below
            for letter, gen in parsed:
                refs.append((letter, gen or genitive))
    return [(letter, gen) for letter, gen in refs if gen]


def build_sanskrit_index(constellations, star_names):
    by_proper, by_designation, by_flamsteed = {}, {}, {}
    for con in constellations:
        for star in con["stars"]:
            if star.get("proper_name"):
                by_proper.setdefault(star["proper_name"].lower(), star["hip"])
            if star.get("designation"):
                by_designation.setdefault(star["designation"], star["hip"])
            if star.get("flamsteed"):
                key = (str(star["flamsteed"]), con["genitive"])
                by_flamsteed.setdefault(key, star["hip"])

    index = {}
    unmatched = []
    for entry in star_names:
        modern = entry.get("modern_star", {})
        hips = []

        common = (modern.get("common_name") or "").strip()
        if common.lower() in by_proper:
            hips.append(by_proper[common.lower()])

        for letter, genitive in parse_star_refs(modern.get("bayer")):
            designation = letter + " " + genitive
            hip = by_designation.get(designation) or by_flamsteed.get((letter, genitive))
            if hip and hip not in hips:
                hips.append(hip)

        if not hips:
            unmatched.append(entry["name_iast"])
            continue

        references = entry.get("references", [])
        record = {
            "iast": entry["name_iast"],
            "devanagari": entry["name_devanagari"],
            "category": entry["category"],
            "confidence": entry["identification_confidence"],
            "sources": sorted({r["text"] for r in references}),
        }
        if references:
            record["citation"] = references[0]["citation"]
        # Some names land on more than one star — either because the name is
        # collective (the seven stars of the Big Dipper) or because the
        # identification is split between candidates (Uttara-Bhādrapadā).
        # Either way the page should say so rather than imply a 1:1 name.
        if len(hips) > 1:
            record["shared"] = len(hips)
        for hip in hips:
            index.setdefault(str(hip), []).append(record)

    return index, unmatched


# ---------------------------------------------------------------------------
# Payload
# ---------------------------------------------------------------------------

def trim_constellation(con):
    stars = []
    for s in con["stars"]:
        star = {
            "hip": s["hip"],
            "x": round(s["x"], 2),
            "y": round(s["y"], 2),
            "ra": round(s["ra_deg"], 4),
            "dec": round(s["dec_deg"], 4),
            "mag": s["mag"],
        }
        if s["figure"]:
            star["fig"] = 1
        for src, dst in (("designation", "desig"), ("bayer", "bayer"),
                         ("proper_name", "name"), ("spectral", "sp")):
            if s.get(src):
                star[dst] = s[src]
        stars.append(star)

    out = {
        "id": con["id"],
        "abbr": con["abbr"],
        "latin": con["name_latin"],
        "genitive": con["genitive"],
        "english": con["name_english"],
        "ra": round(con["center"]["ra_deg"], 3),
        "dec": round(con["center"]["dec_deg"], 3),
        "w": con["chart"]["width"],
        "h": con["chart"]["height"],
        "segments": con["segments"],
        "stars": stars,
    }
    if con.get("name_devanagari"):
        out["devanagari"] = con["name_devanagari"]
    if con.get("name_iast"):
        out["iast"] = con["name_iast"]
    return out


def main():
    with open(LINES_JSON, encoding="utf-8") as fh:
        figures = json.load(fh)
    with open(NAMES_JSON, encoding="utf-8") as fh:
        star_names = json.load(fh)

    constellations = figures["constellations"]
    sanskrit, unmatched = build_sanskrit_index(constellations, star_names["stars"])

    payload = {
        "meta": {
            "generated": figures["generated"],
            "figureSet": figures["figure_set"],
            "epoch": figures["epoch"],
            "starCatalog": figures["star_catalog"],
            "fieldStarLimit": figures["field_star_limit_mag"],
            "sanskritGenerated": star_names["generated"],
        },
        "constellations": [trim_constellation(c) for c in constellations],
        "sanskritStars": sanskrit,
    }

    body = json.dumps(payload, separators=(",", ":"), ensure_ascii=False)
    with open(OUT, "w", encoding="utf-8") as fh:
        fh.write(
            "/*\n"
            " * constellation-data.js — generated, do not edit by hand.\n"
            " *\n"
            " * Built by tools/build-constellation-data.py from the Bhagol databases\n"
            " * (docs/constellation-lines, docs/star-names). Rerun that script to\n"
            " * refresh. Figures: IAU / Sky & Telescope (Alan MacRobert), CC BY 4.0,\n"
            " * traced by d3-celestial (BSD-3-Clause). Stars: Hipparcos (ESA 1997).\n"
            " */\n"
            "window.CONSTELLATION_DATA = "
        )
        fh.write(body)
        fh.write(";\n")

    named = sum(len(v) for v in sanskrit.values())
    print("constellations: %d" % len(constellations))
    print("stars: %d" % sum(len(c["stars"]) for c in constellations))
    print("Sanskrit names attached: %d entries over %d stars"
          % (named, len(sanskrit)))
    if unmatched:
        print("unmatched Sanskrit entries (%d): %s"
              % (len(unmatched), ", ".join(unmatched)))
    print("wrote %s (%.0f KB)" % (OUT, os.path.getsize(OUT) / 1024))


if __name__ == "__main__":
    main()
