#!/usr/bin/env python3
"""Build js/star-data.js for stars.html.

Selects the stars worth a page of their own — everything brighter than
magnitude 2.5, plus every star the Sanskrit texts name, however faint — and
emits one record each with its designation, home constellation, distance and
the Sanskrit names attested for it, with the texts that attest them.

Sources, all read locally:

  docs/constellation-lines/constellation-lines.json
      Positions, magnitudes, spectral types, designations (Hipparcos).
  docs/constellation-lines/sources/constellation-boundaries-b1875.dat
      Roman (1987) boundary table, used to settle which constellation a star
      belongs to rather than which figure happens to chart it.
  docs/star-names/star-names.json
      Sanskrit names with their verses.
  tools/src/main/resources/data/stardata_names.txt
      Hipparcos-derived bright-star list; supplies rectangular coordinates
      (units of 0.001 pc) from which distance is recovered, plus alternate
      common names.

Charts are not duplicated here: stars.html draws its finder charts from
js/constellation-data.js, which it loads alongside this file.

Usage:
    python3 tools/build-star-data.py [path-to-source-databases]
"""

import io
import json
import math
import os
import re
import sys

# Local checkout holding docs/constellation-lines, docs/star-names and
# tools/src/main/resources/data. Override by passing a path as the first argument.
DEFAULT_SOURCE_ROOT = os.environ.get("CONSTELLATION_SOURCE", "~/dev/bhagol")

SOURCE_ROOT = sys.argv[1] if len(sys.argv) > 1 else os.path.expanduser(DEFAULT_SOURCE_ROOT)
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                   "..", "js", "star-data.js")

LINES_JSON = os.path.join(SOURCE_ROOT, "docs/constellation-lines/constellation-lines.json")
NAMES_JSON = os.path.join(SOURCE_ROOT, "docs/star-names/star-names.json")
BOUNDARIES = os.path.join(SOURCE_ROOT,
                          "docs/constellation-lines/sources/constellation-boundaries-b1875.dat")
BRIGHT_TXT = os.path.join(SOURCE_ROOT, "tools/src/main/resources/data/stardata_names.txt")

# Every star this bright gets a page; fainter ones only if a text names them.
MAG_LIMIT = 2.5

# Distance match: a bright star is alone within a few arcminutes, and the
# magnitudes have to agree too, so a hit is unambiguous.
MATCH_DEG = 0.12
MATCH_MAG = 0.35

GREEK_WORD = {
    "α": "alpha", "β": "beta", "γ": "gamma", "δ": "delta", "ε": "epsilon",
    "ζ": "zeta", "η": "eta", "θ": "theta", "ι": "iota", "κ": "kappa",
    "λ": "lambda", "μ": "mu", "ν": "nu", "ξ": "xi", "ο": "omicron",
    "π": "pi", "ρ": "rho", "σ": "sigma", "τ": "tau", "υ": "upsilon",
    "φ": "phi", "χ": "chi", "ψ": "psi", "ω": "omega",
}
SUPERSCRIPT_DIGIT = {"¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5"}


# ---------------------------------------------------------------------------
# Constellation membership (Roman 1987)
# ---------------------------------------------------------------------------

# IAU 1976 precession, J2000 -> B1875.0, the equinox the boundaries are drawn in.
_T = (1875.0013 - 2000.0) / 100.0


def to_b1875(ra_deg, dec_deg):
    t = _T
    zeta = math.radians((2306.2181 * t + 0.30188 * t * t + 0.017998 * t ** 3) / 3600.0)
    z = math.radians((2306.2181 * t + 1.09468 * t * t + 0.018203 * t ** 3) / 3600.0)
    theta = math.radians((2004.3109 * t - 0.42665 * t * t - 0.041833 * t ** 3) / 3600.0)

    ra, dec = math.radians(ra_deg), math.radians(dec_deg)
    a = math.cos(dec) * math.sin(ra + zeta)
    b = math.cos(theta) * math.cos(dec) * math.cos(ra + zeta) - math.sin(theta) * math.sin(dec)
    c = math.sin(theta) * math.cos(dec) * math.cos(ra + zeta) + math.cos(theta) * math.sin(dec)
    return (math.degrees(math.atan2(a, b) + z) % 360.0,
            math.degrees(math.asin(max(-1.0, min(1.0, c)))))


def load_boundaries():
    rows = []
    with io.open(BOUNDARIES, encoding="utf-8") as fh:
        for line in fh:
            if not line.strip():
                continue
            rows.append((float(line[0:8]), float(line[8:16]),
                         float(line[16:26]), line[26:].strip()))
    return rows


def constellation_of(ra_deg, dec_deg, boundaries):
    """Roman's algorithm: the first boundary arc that contains the position."""
    ra_h, dec = to_b1875(ra_deg, dec_deg)
    ra_h /= 15.0
    for ra_lo, ra_hi, dec_lo, abbr in boundaries:
        if dec < dec_lo or ra_h < ra_lo or ra_h >= ra_hi:
            continue
        return abbr
    return None


# ---------------------------------------------------------------------------
# Distance and alternate names
# ---------------------------------------------------------------------------

def load_bright_list():
    """Rows of {names, mag, ra, dec, pc} from the Hipparcos-derived bright list."""
    rows = []
    with io.open(BRIGHT_TXT, encoding="utf-8") as fh:
        for line in fh:
            parts = line.strip().split(",")
            if len(parts) < 7:
                continue
            try:
                mag, dec, ra = float(parts[1]), float(parts[2]), float(parts[3])
                x, y, z = float(parts[4]), float(parts[5]), float(parts[6])
            except ValueError:
                continue
            rows.append({
                "names": [n.strip() for n in parts[0].split("|") if n.strip()],
                "mag": mag, "ra": ra, "dec": dec,
                # Rectangular coordinates are in units of 0.001 parsec.
                "pc": math.sqrt(x * x + y * y + z * z) / 1000.0,
            })
    return rows


def separation_deg(ra1, dec1, ra2, dec2):
    r1, d1, r2, d2 = map(math.radians, (ra1, dec1, ra2, dec2))
    dot = (math.sin(d1) * math.sin(d2)
           + math.cos(d1) * math.cos(d2) * math.cos(r1 - r2))
    return math.degrees(math.acos(max(-1.0, min(1.0, dot))))


def match_bright_row(star, bright):
    close = [r for r in bright
             if abs(r["dec"] - star["dec_deg"]) <= MATCH_DEG
             and separation_deg(r["ra"], r["dec"], star["ra_deg"], star["dec_deg"]) <= MATCH_DEG]
    if not close:
        return None
    close.sort(key=lambda r: separation_deg(r["ra"], r["dec"],
                                            star["ra_deg"], star["dec_deg"]))

    agreeing = [r for r in close if abs(r["mag"] - star["mag"]) <= MATCH_MAG]
    if agreeing:
        return agreeing[0]

    # No magnitude agrees: this is a close double the bright list splits into
    # components while the figure database carries the combined magnitude. The
    # components sit at one distance, so that distance is still safe to use —
    # but only if they actually agree, otherwise these are unrelated stars.
    spread = max(r["pc"] for r in close) - min(r["pc"] for r in close)
    if spread <= 0.01 * max(r["pc"] for r in close):
        return close[0]
    return None


# ---------------------------------------------------------------------------
# Sanskrit names
# ---------------------------------------------------------------------------

def normalise_designation(text):
    """'phi1 Orionis' -> 'φ¹ Orionis', the spelling the figure database uses."""
    return re.sub(
        "([" + "".join(GREEK_WORD) + "])([1-5])",
        lambda m: m.group(1) + "¹²³⁴⁵"[int(m.group(2)) - 1],
        text.strip(),
    )


DESIG_RE = re.compile(
    r"^([" + "".join(GREEK_WORD) + r"][¹²³⁴⁵]?|[A-Za-z]|\d{1,3})\s+"
    r"([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)$"
)


def parse_star_refs(text):
    """('α', 'Ursae Majoris') pairs out of the free-text `bayer` field."""
    if not text:
        return []
    text = re.sub(r"\([^)]*\)", " ", text)
    text = text.split(":")[-1]
    refs = []
    for alternative in text.split("/"):
        for group in re.split(r"\band\b|;|\bwith\b", alternative):
            genitive, parsed = None, []
            for token in (normalise_designation(t) for t in group.split(",")):
                match = DESIG_RE.match(token)
                if match:
                    parsed.append((match.group(1), match.group(2)))
                    genitive = match.group(2)
                elif re.fullmatch(r"[" + "".join(GREEK_WORD) + r"][¹²³⁴⁵]?|\d{1,3}", token):
                    parsed.append((token, None))
            for letter, gen in parsed:
                refs.append((letter, gen or genitive))
    return [(letter, gen) for letter, gen in refs if gen]


def build_sanskrit_index(constellations, star_names):
    """HIP -> list of attested Sanskrit names, each with its verses."""
    by_proper, by_designation, by_flamsteed = {}, {}, {}
    for con in constellations:
        for star in con["stars"]:
            if star.get("proper_name"):
                by_proper.setdefault(star["proper_name"].lower(), star["hip"])
            if star.get("designation"):
                by_designation.setdefault(star["designation"], star["hip"])
            if star.get("flamsteed"):
                by_flamsteed.setdefault((str(star["flamsteed"]), con["genitive"]), star["hip"])

    index, unmatched = {}, []
    for entry in star_names:
        modern = entry.get("modern_star", {})
        hips = []

        common = (modern.get("common_name") or "").strip()
        if common.lower() in by_proper:
            hips.append(by_proper[common.lower()])
        for letter, genitive in parse_star_refs(modern.get("bayer")):
            hip = (by_designation.get(letter + " " + genitive)
                   or by_flamsteed.get((letter, genitive)))
            if hip and hip not in hips:
                hips.append(hip)

        if not hips:
            unmatched.append(entry["name_iast"])
            continue

        # The name, which texts attest it, and how firm the identification is.
        # The verses themselves are deliberately not carried over: the page
        # names its sources but does not reproduce the shlokas.
        record = {
            "iast": entry["name_iast"],
            "devanagari": entry["name_devanagari"],
            "category": entry["category"],
            "confidence": entry["identification_confidence"],
            "sources": sorted({r["text"] for r in entry.get("references", []) if r.get("text")}),
        }
        # A name landing on several stars is either collective or a contested
        # identification; either way the page should not imply a 1:1 naming.
        if len(hips) > 1:
            record["shared"] = len(hips)
        for hip in hips:
            index.setdefault(hip, []).append(record)

    return index, unmatched


# ---------------------------------------------------------------------------
# Slugs
# ---------------------------------------------------------------------------

def slugify(text):
    text = (text or "").lower()
    text = "".join(SUPERSCRIPT_DIGIT.get(ch, ch) for ch in text)
    text = "".join(GREEK_WORD.get(ch, ch) for ch in text)
    return re.sub(r"[^a-z0-9]+", "-", text).strip("-")


# ---------------------------------------------------------------------------
# Assembly
# ---------------------------------------------------------------------------

def pick_home_entry(occurrences):
    """A star charted in several figures: the entry that designates it is its own."""
    for star, con in occurrences:
        if star.get("designation"):
            return star, con
    for star, con in occurrences:
        if star.get("proper_name"):
            return star, con
    return occurrences[0]


def main():
    with io.open(LINES_JSON, encoding="utf-8") as fh:
        figures = json.load(fh)
    with io.open(NAMES_JSON, encoding="utf-8") as fh:
        names_db = json.load(fh)

    constellations = figures["constellations"]
    by_abbr = {}
    for con in constellations:
        by_abbr.setdefault(con["abbr"], con)

    boundaries = load_boundaries()
    bright = load_bright_list()
    sanskrit, unmatched_names = build_sanskrit_index(constellations, names_db["stars"])

    # Candidates: bright enough on their own, or named in the texts.
    occurrences = {}
    for con in constellations:
        for star in con["stars"]:
            if star["mag"] <= MAG_LIMIT or star["hip"] in sanskrit:
                occurrences.setdefault(star["hip"], []).append((star, con))

    stars, no_distance, disagreements = [], [], []
    for hip, found in occurrences.items():
        star, home_con = pick_home_entry(found)

        # Membership from the IAU boundaries, cross-checked against the genitive
        # in the star's own designation where it has one.
        abbr = constellation_of(star["ra_deg"], star["dec_deg"], boundaries)
        by_boundary = by_abbr.get(abbr)
        designation = star.get("designation")
        genitive = designation.split(" ", 1)[1] if designation and " " in designation else None
        if genitive and by_boundary and by_boundary["genitive"] != genitive:
            disagreements.append((star.get("proper_name") or designation,
                                  genitive, by_boundary["genitive"]))
        member = by_boundary or home_con

        # The figure to draw as a finder chart: its own constellation's if that
        # chart includes it, otherwise whichever figure does.
        chart = member if any(s["hip"] == hip for s in member["stars"]) else home_con

        record = {
            "hip": hip,
            "mag": star["mag"],
            "ra": round(star["ra_deg"], 4),
            "dec": round(star["dec_deg"], 4),
            "con": member["id"],
            "chart": chart["id"],
        }
        if designation:
            record["desig"] = designation
        if star.get("bayer"):
            record["bayer"] = star["bayer"]
        if star.get("proper_name"):
            record["name"] = star["proper_name"]
        if star.get("spectral"):
            record["sp"] = star["spectral"]

        row = match_bright_row(star, bright)
        if row:
            record["pc"] = round(row["pc"], 2)
            alt = [n for n in row["names"]
                   if n.lower() != (star.get("proper_name") or "").lower()]
            if alt:
                record["alt"] = alt
        else:
            no_distance.append(star.get("proper_name") or designation or ("HIP %d" % hip))

        if hip in sanskrit:
            record["sanskrit"] = sanskrit[hip]

        label = record.get("name") or designation or ("HIP %d" % hip)
        record["slug"] = slugify(label)
        stars.append(record)

    # Brightest first — the order the page reads in.
    stars.sort(key=lambda s: s["mag"])

    payload = {
        "meta": {
            "generated": figures["generated"],
            "magLimit": MAG_LIMIT,
            "starCatalog": figures["star_catalog"],
            "distanceSource": "Hipparcos parallaxes",
        },
        "stars": stars,
    }

    body = json.dumps(payload, separators=(",", ":"), ensure_ascii=False)
    with io.open(OUT, "w", encoding="utf-8") as fh:
        fh.write(
            "/*\n"
            " * star-data.js — generated, do not edit by hand.\n"
            " * Rerun tools/build-star-data.py to refresh.\n"
            " *\n"
            " * Stars: Hipparcos (ESA 1997) via VizieR; proper names as approved by\n"
            " * the IAU Working Group on Star Names; membership from the Roman (1987)\n"
            " * boundary table; distances from Hipparcos parallaxes. Sanskrit names\n"
            " * and verses: Sūrya Siddhānta, Bṛhat Saṃhitā, Siddhānta Śiromaṇi and\n"
            " * the Vedic corpus.\n"
            " */\n"
            "window.STAR_DATA = "
        )
        fh.write(body)
        fh.write(";\n")

    named = sum(1 for s in stars if s.get("sanskrit"))
    print("stars selected: %d (mag <= %s, plus Sanskrit-named)" % (len(stars), MAG_LIMIT))
    print("  with a Sanskrit name: %d" % named)
    print("  with a distance: %d" % sum(1 for s in stars if "pc" in s))
    if no_distance:
        print("  no distance match: %s" % ", ".join(no_distance))
    if disagreements:
        print("  MEMBERSHIP DISAGREEMENT (boundary vs designation):")
        for label, gen, found in disagreements:
            print("    %s — designation says %s, boundaries say %s" % (label, gen, found))
    else:
        print("  membership: boundary lookup agrees with every designation")
    if unmatched_names:
        print("  Sanskrit entries not tied to a single star: %s" % ", ".join(unmatched_names))
    print("wrote %s (%.0f KB)" % (OUT, os.path.getsize(OUT) / 1024))


if __name__ == "__main__":
    main()
