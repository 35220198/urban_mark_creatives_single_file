#!/usr/bin/env python3
"""Builds privacy-policy.html and terms-of-service.html."""
import os, importlib.util

HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("bp", os.path.join(HERE, "_build_pages.py"))
bp = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bp)

LEGAL = [
    ("privacy-policy.html", "privacy-policy", "Privacy Policy",
     "How Urban Mark Creatives collects, uses and protects the information you send through this website.",
     "Privacy Policy"),
    ("terms-of-service.html", "terms-of-service", "Terms of Service",
     "The terms that apply to projects, payments and deliverables from Urban Mark Creatives.",
     "Terms of Service"),
]

for fname, slug, title, desc, crumb in LEGAL:
    body = bp.page_hero(
        "Legal",
        title + ".",
        desc,
        crumb,
    ) + f"""
<section class="sec">
  <div class="wrap wrap-narrow">
    <div class="contact-card" data-legal="{slug}">
      <h2 data-legal-title style="font-size:var(--step-2);margin-bottom:1.2rem">{title}</h2>
      <div data-legal style="color:var(--fg-soft);line-height:1.75"></div>
      <p style="margin-top:1.6rem;font-size:.82rem;color:var(--fg-mute)">
        Last updated 23 November 2026. Questions? Email
        <a href="mailto:URBANMARKCREATIVES@gmail.com" style="color:var(--orange);font-weight:600">URBANMARKCREATIVES@gmail.com</a>
        or call <a href="tel:+254106027162" style="color:var(--orange);font-weight:600">+254 106 027 162</a>.
      </p>
    </div>
  </div>
</section>
"""
    html = bp.head(title + " | Urban Mark Creatives", desc, fname) + \
        bp.header("legal").replace('<body data-page="legal">', f'<body data-page="legal" data-legal="{slug}">') + \
        body + bp.FOOTER
    with open(os.path.join(HERE, fname), "w", encoding="utf-8") as f:
        f.write(html)
    print("wrote", fname, len(html), "bytes")
