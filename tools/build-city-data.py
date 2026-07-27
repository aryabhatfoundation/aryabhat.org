#!/usr/bin/env python3
"""
build-city-data.py — the full place database the Sky Atlas falls back to.

sky/js/sky-places.js ships a short curated list (the places most visitors
actually pick, plus India's dark-sky sites and observatory towns). That list
answers almost every search. This script builds the long tail behind it:
every place in the bhagol catalogue, trimmed to what a sky page needs.

Source is bhagol's catalogs/cities.csv — the same file its Android and iOS
apps ship, carried over from HinduCalendar. Its columns are:

    [0] city  [1] lat  [2] lon  [3] country code  [4] IANA zone
    [5] DST?  [6] GMT offset  [7] country

A sky page needs only where a place *is* and what to call it, so we keep
name, lat, lon and country and drop the rest. Coordinates go to three
decimals: ~110 m, which is four orders of magnitude finer than anything
sunset or a horizon altitude cares about, and it roughly halves the file.

Places already in the curated list are dropped here rather than shipped
twice — sky-places.js searches the curated list first and merges.

Run:  python3 tools/build-city-data.py
Out:  sky/data/cities.csv
"""

import csv
import os
import re
import sys

SOURCE = os.path.expanduser('~/dev/bhagol/catalogs/cities.csv')
OUT = os.path.join(os.path.dirname(__file__), '..', 'sky', 'data', 'cities.csv')
CURATED = os.path.join(os.path.dirname(__file__), '..', 'sky', 'js', 'sky-places.js')


def curated_names():
    """The names sky-places.js already carries, so we don't ship them twice."""
    try:
        with open(CURATED, encoding='utf-8') as f:
            source = f.read()
    except FileNotFoundError:
        return set()
    # Entries read: p('Bhopal', 23.2599, 77.4126),
    return {m.lower() for m in re.findall(r"p\('([^']+)'", source)}


def main():
    if not os.path.exists(SOURCE):
        sys.exit('source not found: %s\n'
                 'Clone bhagol next to this repo, or edit SOURCE above.' % SOURCE)

    skip = curated_names()
    rows, dropped, malformed = [], 0, 0

    with open(SOURCE, encoding='utf-8-sig', newline='') as f:
        for cols in csv.reader(f):
            if len(cols) < 8:
                malformed += 1
                continue
            name = cols[0].strip()
            try:
                lat, lon = float(cols[1]), float(cols[2])
            except ValueError:
                # One malformed line should cost one city, not the table.
                malformed += 1
                continue
            if not name:
                malformed += 1
                continue
            if name.lower() in skip:
                dropped += 1
                continue
            rows.append((name, round(lat, 3), round(lon, 3), cols[7].strip()))

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, 'w', encoding='utf-8', newline='') as f:
        # The source is ordered by size, which is the tie-break a person
        # expects when two places share a name. Keep that order.
        csv.writer(f, lineterminator='\n').writerows(rows)

    size = os.path.getsize(OUT)
    print('%d places -> %s (%.0f KB)' % (len(rows), os.path.relpath(OUT), size / 1024))
    print('%d already curated, %d unusable rows skipped' % (dropped, malformed))


if __name__ == '__main__':
    main()
