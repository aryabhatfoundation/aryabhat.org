"""Distances for bright stars, recovered from the Hipparcos-derived bright list.

Shared by build-star-data.py and build-constellation-data.py so the matching
rule — including how close doubles are handled — lives in exactly one place.

The list carries rectangular coordinates in units of 0.001 parsec, so distance
is just their length. Rows are matched to catalogue stars by position, with
magnitude as a second check.
"""

import io
import math

# A bright star is alone within a few arcminutes, and the magnitudes have to
# agree too, so a hit inside these tolerances is unambiguous.
MATCH_DEG = 0.12
MATCH_MAG = 0.35

# Past about a kiloparsec the Hipparcos parallax is smaller than its own error
# — 1 mas against roughly 1 mas — so 1/parallax stops being a measurement and
# starts being noise. The list duly contains l Puppis at ten million parsecs.
# Beyond this limit a row has a position and a magnitude but no usable
# distance, and callers should say nothing rather than quote the number.
MAX_PC = 1000.0


def usable_distance(row):
    """True when this row's distance rests on a parallax worth trusting."""
    return bool(row) and 0 < row["pc"] <= MAX_PC


def load(path):
    """Rows of {names, mag, ra, dec, pc}, bucketed by declination for lookup."""
    rows = []
    with io.open(path, encoding="utf-8") as fh:
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
                "pc": math.sqrt(x * x + y * y + z * z) / 1000.0,
            })

    buckets = {}
    for row in rows:
        buckets.setdefault(int(math.floor(row["dec"])), []).append(row)
    return buckets


def separation_deg(ra1, dec1, ra2, dec2):
    r1, d1, r2, d2 = map(math.radians, (ra1, dec1, ra2, dec2))
    dot = (math.sin(d1) * math.sin(d2)
           + math.cos(d1) * math.cos(d2) * math.cos(r1 - r2))
    return math.degrees(math.acos(max(-1.0, min(1.0, dot))))


def match(buckets, ra_deg, dec_deg, mag):
    """The bright-list row for this star, or None if nothing matches safely."""
    close = []
    band = int(math.floor(dec_deg))
    for offset in (-1, 0, 1):
        for row in buckets.get(band + offset, ()):
            if (abs(row["dec"] - dec_deg) <= MATCH_DEG
                    and separation_deg(row["ra"], row["dec"], ra_deg, dec_deg) <= MATCH_DEG):
                close.append(row)
    if not close:
        return None
    close.sort(key=lambda r: separation_deg(r["ra"], r["dec"], ra_deg, dec_deg))

    agreeing = [r for r in close if abs(r["mag"] - mag) <= MATCH_MAG]
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
