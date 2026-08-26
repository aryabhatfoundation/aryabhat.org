#!/usr/bin/env python3
"""Shrink the scanned PDFs the site hands out.

The circulars, bylaws and sanction letters are photocopies: every page is one
full-page colour JPEG at 200 dpi, which is print-scanner default and about four
times what a screen reader needs. /quiz/ alone linked 6.7 MB of them, and a quiz
registration surge is exactly when a few thousand people fetch that page — the
site has done 400 MB in a day on the strength of it.

What this does, per page:

  * a page with a real text layer is copied through untouched. Rasterising it
    would destroy selectable text AND usually make the file bigger.
  * a page with no text is a scan, so it is re-rendered at 150 dpi greyscale
    JPEG. 150 dpi stays legible at print size (checked against the original
    before this was written); the scans measure 0.1-4.0 mean saturation, i.e.
    they are grey already and the colour channels carry nothing.

Then the whole document is rewritten with garbage collection on, which is what
recovers the ~1 MB of unsubset fonts sitting in files like NVS_2025-26.pdf.

A file is only replaced if the result is at least 15% smaller, so re-running is
safe and idempotent. Originals are recoverable from git.

    python3 tools/shrink-pdfs.py --check     # report, write nothing
    python3 tools/shrink-pdfs.py             # rewrite in place
    python3 tools/shrink-pdfs.py --dpi 130   # squeeze harder

Needs pymupdf and pillow.
"""
import argparse
import io
import os
import sys

import pymupdf
from PIL import Image

ROOTS = ("files", "docs")
MIN_GAIN = 0.15          # skip a rewrite that saves less than this


def shrink(path, dpi, quality):
    """Return (new_bytes, pages_rasterised, pages_kept) or None if it got worse."""
    src = pymupdf.open(path)
    out = pymupdf.open()
    rasterised = kept = 0
    for page in src:
        if page.get_text().strip():
            out.insert_pdf(src, from_page=page.number, to_page=page.number)
            kept += 1
            continue
        pix = page.get_pixmap(dpi=dpi)
        img = Image.open(io.BytesIO(pix.tobytes("png"))).convert("L")
        buf = io.BytesIO()
        img.save(buf, "JPEG", quality=quality, optimize=True, progressive=True)
        new = out.new_page(width=page.rect.width, height=page.rect.height)
        new.insert_image(new.rect, stream=buf.getvalue())
        rasterised += 1
    data = out.tobytes(garbage=4, deflate=True, deflate_images=True,
                       deflate_fonts=True, clean=True)
    src.close()
    out.close()
    return data, rasterised, kept


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dpi", type=int, default=150)
    ap.add_argument("--quality", type=int, default=65)
    ap.add_argument("--check", action="store_true", help="report only")
    ap.add_argument("paths", nargs="*", help="defaults to every PDF under files/ and docs/")
    args = ap.parse_args()

    paths = args.paths
    if not paths:
        for root in ROOTS:
            for dirpath, _, names in os.walk(root):
                paths += [os.path.join(dirpath, n) for n in names if n.lower().endswith(".pdf")]
    paths.sort(key=lambda p: -os.path.getsize(p))

    before = after = 0
    changed = 0
    for p in paths:
        old = os.path.getsize(p)
        before += old
        try:
            data, rast, kept = shrink(p, args.dpi, args.quality)
        except Exception as exc:                      # a broken PDF must not stop the run
            print(f"  {'SKIP':>6}  {p}: {exc}")
            after += old
            continue
        gain = 1 - len(data) / old
        if gain < MIN_GAIN:
            after += old
            continue
        after += len(data)
        changed += 1
        print(f"  {old/1024:8.0f} -> {len(data)/1024:7.0f} KB  ({gain*100:4.0f}% off)  "
              f"{rast} scanned, {kept} text  {p}")
        if not args.check:
            with open(p, "wb") as fh:
                fh.write(data)

    verb = "would save" if args.check else "saved"
    print(f"\n  {changed} of {len(paths)} files rewritten at {args.dpi} dpi q{args.quality}; "
          f"{before/1048576:.1f} MB -> {after/1048576:.1f} MB, {verb} {(before-after)/1048576:.1f} MB")
    return 0


if __name__ == "__main__":
    sys.exit(main())
