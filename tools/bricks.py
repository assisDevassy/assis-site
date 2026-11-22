"""Code-drawn toy bricks for the site. No images, no credits, free to iterate.

brick(color, studs, unit) returns an inline <svg> string.
build() replaces {{brick:<color>:<studs>[:<unit>]}} tokens in tools/index.src.html
and writes index.html at the repo root.

Run: python3 tools/bricks.py
"""
import os
import re
from pathlib import Path

COLORS = {
    "y": "#F7C51E",  # Script
    "b": "#2E93E6",  # Agent
    "r": "#E23B32",  # Human
    "g": "#3FA73B",  # Files
    "o": "#F28A1E",  # Schedule
    "c": "#E2E2D8",  # Model
}


def _shade(hex_, amt):
    n = int(hex_[1:], 16)
    rgb = [(n >> 16) & 255, (n >> 8) & 255, n & 255]
    out = []
    for v in rgb:
        v = v * (1 + amt) if amt < 0 else v + (255 - v) * amt
        out.append(max(0, min(255, round(v))))
    return "#" + "".join(f"{v:02x}" for v in out)


def brick(col, studs, unit=40):
    base = COLORS.get(col, col)
    dark, light = _shade(base, -0.18), _shade(base, 0.3)
    u = unit
    w, h = studs * u, u * 1.2
    sw, sh = u * 0.6, u * 0.26
    parts = []
    for i in range(studs):
        sx = i * u + (u - sw) / 2
        parts.append(f'<rect x="{sx:.1f}" y="0" width="{sw:.1f}" height="{sh + u*.1:.1f}" rx="{u*.07:.1f}" fill="{base}"/>')
        parts.append(f'<rect x="{sx:.1f}" y="0" width="{sw:.1f}" height="{u*.08:.1f}" rx="{u*.04:.1f}" fill="{light}" opacity=".7"/>')
    parts.append(f'<rect y="{sh:.1f}" width="{w:.1f}" height="{h:.1f}" rx="{u*.1:.1f}" fill="{base}"/>')
    parts.append(f'<rect y="{sh + h*.72:.1f}" width="{w:.1f}" height="{h*.28:.1f}" rx="{u*.1:.1f}" fill="{dark}" opacity=".55"/>')
    parts.append(f'<rect x="{u*.08:.1f}" y="{sh + u*.06:.1f}" width="{w - u*.16:.1f}" height="{u*.07:.1f}" rx="{u*.035:.1f}" fill="#fff" opacity=".28"/>')
    vb_h = sh + h
    return (f'<svg class="brick" viewBox="0 0 {w:.0f} {vb_h:.1f}" width="{w:.0f}" height="{vb_h:.1f}" '
            f'aria-hidden="true" focusable="false">' + "".join(parts) + "</svg>")


def build():
    root = Path(__file__).resolve().parent.parent
    src = (root / "tools" / "index.src.html").read_text()

    def rep(m):
        bits = m.group(1).split(":")
        col, studs = bits[0], int(bits[1])
        unit = int(bits[2]) if len(bits) > 2 else 40
        return brick(col, studs, unit)

    out = re.sub(r"\{\{brick:([^}]+)\}\}", rep, src)
    # Contact address: set SITE_EMAIL yourself before building, e.g.
    #   SITE_EMAIL=me@mydomain.com python3 tools/bricks.py
    email = os.environ.get("SITE_EMAIL")
    if email:
        out = out.replace("{{email}}", email)
    else:
        print("SITE_EMAIL not set: contact links keep the {{email}} placeholder")
    (root / "index.html").write_text(out)
    print("wrote index.html", len(out), "bytes")


if __name__ == "__main__":
    build()
