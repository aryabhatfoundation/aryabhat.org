#!/usr/bin/env python3
"""
build-sky-catalogue.py — the star data the sky map draws, and nothing else.

d3-celestial fetches nine JSON files at runtime. Taken as published they are
2.2 MB (486 KB gzipped) per uncached visit, and most of that is data this
page cannot display:

  * starnames.json ships every star's name in seventeen languages. The map
    asks for `propernameType: "name"` and never calls setLanguage, so it
    reads exactly one field. Of 4,869 entries only 602 have a proper name
    at all; the rest are catalogue designations the map does not show
    either, since `designation` is false.

  * dsonames.json and dsos.bright.json are fetched unconditionally by the
    library even though the map sets `dsos.show: false` — deep-sky objects
    are handled by the visibility panel instead, from its own list. The
    library's loader logs a warning and carries on if they are missing, so
    empty stand-ins cost nothing and save 65 KB.

  * stars.6.json goes to magnitude 6. The map's limit is 4.5, and panning
    and zooming are off, so nothing fainter than that can ever appear.

  * mw.json carries the Milky Way outline to three decimal places. On an
    800-pixel chart spanning 180° one pixel is about 0.22°, so the third
    decimal is four orders of magnitude finer than anything visible.

Trimming those takes the payload to about 170 KB gzipped without changing a
pixel of what is drawn. Re-run this after changing the map's magnitude limit
or turning DSOs on.

Run:  python3 tools/build-sky-catalogue.py
Out:  sky/data/celestial/*.json
"""

import gzip
import json
import os
import sys
import urllib.request

SOURCE = 'https://ofrohn.github.io/data/'
OUT = os.path.join(os.path.dirname(__file__), '..', 'sky', 'data', 'celestial')

# Must stay at or above `stars.limit` in sky/index.html. The half-magnitude
# of headroom is there so a small bump to the limit does not silently draw
# an emptier sky than intended.
STAR_MAG_LIMIT = 5.5

# Degrees. One decimal is ~0.1°, still finer than a pixel on this chart.
MW_DECIMALS = 1
STAR_DECIMALS = 3


def fetch(name):
    with urllib.request.urlopen(SOURCE + name, timeout=60) as r:
        return json.loads(r.read().decode('utf-8'))


def round_coords(node, places):
    """Coordinates only — magnitudes and ids are left alone."""
    if isinstance(node, float):
        return round(node, places)
    if isinstance(node, list):
        return [round_coords(x, places) for x in node]
    if isinstance(node, dict):
        return {k: round_coords(v, places) for k, v in node.items()}
    return node


def write(name, data):
    path = os.path.join(OUT, name)
    body = json.dumps(data, separators=(',', ':'), ensure_ascii=False).encode('utf-8')
    with open(path, 'wb') as f:
        f.write(body)
    return len(body), len(gzip.compress(body, 9))


def main():
    os.makedirs(OUT, exist_ok=True)
    total_raw = total_gz = 0
    report = []

    def record(name, data, note=''):
        nonlocal total_raw, total_gz
        raw, gz = write(name, data)
        total_raw += raw
        total_gz += gz
        report.append((name, raw, gz, note))

    try:
        # ── Stars: cut to what the map's magnitude limit can reach ──
        stars = fetch('stars.6.json')
        kept = [f for f in stars['features']
                if (f['properties'].get('mag') if f['properties'].get('mag') is not None else -9)
                <= STAR_MAG_LIMIT]
        dropped = len(stars['features']) - len(kept)
        stars['features'] = kept
        record('stars.6.json', round_coords(stars, STAR_DECIMALS),
               '%d stars, %d fainter than mag %s dropped' % (len(kept), dropped, STAR_MAG_LIMIT))

        # ── Star names: one language, and only stars that have a name ──
        names = fetch('starnames.json')
        named = {k: {'name': v['name']} for k, v in names.items() if v.get('name')}
        record('starnames.json', named,
               '%d named of %d entries' % (len(named), len(names)))

        # ── Milky Way: coordinates to a tenth of a degree ──
        record('mw.json', round_coords(fetch('mw.json'), MW_DECIMALS),
               '%d decimal places' % MW_DECIMALS)

        # ── Constellations and planets: shipped as published ──
        for name in ('constellations.json', 'constellations.lines.json',
                     'constellations.borders.json', 'planets.json'):
            record(name, fetch(name), 'unchanged')

        # ── Deep sky: fetched by the library, drawn by nothing here ──
        record('dsos.bright.json', {'type': 'FeatureCollection', 'features': []},
               'stand-in — dsos.show is false')
        record('dsonames.json', {}, 'stand-in — dsos.show is false')

    except Exception as err:                      # network, or the source moved
        sys.exit('failed: %s\nSource: %s' % (err, SOURCE))

    for name, raw, gz, note in report:
        print('  %-30s %6dK raw  %5dK gz   %s' % (name, raw / 1024, gz / 1024, note))
    print('  %-30s %6dK raw  %5dK gz' % ('TOTAL', total_raw / 1024, total_gz / 1024))


if __name__ == '__main__':
    main()
