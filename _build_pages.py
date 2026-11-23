#!/usr/bin/env python3
"""Builds about.html, services.html, portfolio.html, contact.html from one shell."""
import os

OUT = os.path.dirname(os.path.abspath(__file__))

PIXEL = """<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '965331479743168');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=965331479743168&ev=PageView&noscript=1"
alt=""></noscript>
<!-- End Meta Pixel Code -->"""


def head(title, desc, canonical, og_image="images/hero.webp", extra_schema=""):
    return f"""<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="author" content="Urban Mark Creatives">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="https://urbanmarkcreatives.com/{canonical}">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="Urban Mark Creatives">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:image" content="https://urbanmarkcreatives.com/{og_image}">
<meta property="og:image:width" content="1376">
<meta property="og:image:height" content="768">
<meta property="og:url" content="https://urbanmarkcreatives.com/{canonical}">
<meta property="og:locale" content="en_KE">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{title}">
<meta name="twitter:description" content="{desc}">
<meta name="twitter:image" content="https://urbanmarkcreatives.com/{og_image}">
<meta name="twitter:site" content="@urbanmarkcreatives">

<meta name="theme-color" content="#062454">
<link rel="icon" href="images/favicon.png" type="image/png">
<link rel="apple-touch-icon" href="images/favicon.png">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://cdnjs.cloudflare.com">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer">
<link rel="stylesheet" href="style.css">

{PIXEL}
{extra_schema}
</head>"""


def header(page):
    return f"""<body data-page="{page}">
<a class="skip-link" href="#main">Skip to content</a>
<div class="scroll-progress" id="progress"></div>

<div class="topbar">
  <div class="wrap">
    <div class="topbar-links">
      <a href="tel:+254106027162" data-phone><i class="fa-solid fa-phone"></i><span>+254 106 027 162</span></a>
      <a href="mailto:URBANMARKCREATIVES@gmail.com" data-email><i class="fa-solid fa-envelope"></i><span>URBANMARKCREATIVES@gmail.com</span></a>
      <a href="https://wa.me/254746128860" target="_blank" rel="noopener" data-whatsapp><i class="fa-brands fa-whatsapp"></i><span>+254 746 128 860</span></a>
      <span data-location><i class="fa-solid fa-location-dot"></i> Kiambu Town, Kenya — Global Remote</span>
    </div>
    <button class="theme-btn" id="themeBtn" type="button" aria-label="Switch to dark theme">
      <i class="fa-solid fa-circle-half-stroke"></i> Theme
    </button>
  </div>
</div>

<header class="site-header">
  <div class="wrap nav-inner">
    <a class="brand" href="index.html">
      <img src="images/logo.png" alt="Urban Mark Creatives logo" data-brand-logo width="350" height="238">
      <span class="brand-text">
        <b data-brand-name>Urban Mark Creatives</b>
        <small data-brand-tagline>Your Ideas. Our Creativity. Your Growth!</small>
      </span>
    </a>
    <nav class="nav-links" data-nav aria-label="Main navigation"></nav>
    <div class="nav-actions">
      <a class="btn" href="contact.html">Get a free quote <i class="fa-solid fa-arrow-right"></i></a>
      <button class="burger" id="burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>

<div class="menu-backdrop" id="menuBackdrop"></div>
<aside class="mobile-menu" id="mobileMenu" aria-label="Mobile navigation">
  <div class="mobile-menu-head">
    <span class="brand-text"><b data-brand-name>Urban Mark Creatives</b></span>
    <button class="menu-close" id="menuClose" type="button" aria-label="Close menu"><i class="fa-solid fa-xmark"></i></button>
  </div>
  <nav data-mobile-nav></nav>
</aside>

<main id="main">"""


FOOTER = """</main>

<footer class="site-footer">
  <div class="wrap footer-grid">
    <div class="footer-brand">
      <a class="brand" href="index.html">
        <img src="images/logo.png" alt="Urban Mark Creatives logo" data-brand-logo width="350" height="238" loading="lazy">
        <span class="brand-text">
          <b data-brand-name>Urban Mark Creatives</b>
          <small data-brand-tagline>Your Ideas. Our Creativity. Your Growth!</small>
        </span>
      </a>
      <p data-footer-about></p>
      <div class="socials" data-socials></div>
    </div>
    <div class="footer-col">
      <h4>Quick links</h4>
      <div data-footer-links></div>
    </div>
    <div class="footer-col">
      <h4>Services</h4>
      <div data-footer-services></div>
    </div>
    <div class="footer-col">
      <h4>Contact</h4>
      <a class="contact-line" href="tel:+254106027162"><i class="fa-solid fa-phone"></i><span data-phone>+254 106 027 162</span></a>
      <a class="contact-line" href="https://wa.me/254746128860" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i><span data-whatsapp>+254 746 128 860</span></a>
      <a class="contact-line" href="mailto:URBANMARKCREATIVES@gmail.com"><i class="fa-solid fa-envelope"></i><span data-email>URBANMARKCREATIVES@gmail.com</span></a>
      <span class="contact-line"><i class="fa-solid fa-location-dot"></i><span data-location>Kiambu Town, Kenya — Global Remote</span></span>
    </div>
  </div>
  <div class="wrap footer-bottom">
    <span data-copyright>© 2026 Urban Mark Creatives. All rights reserved.</span>
    <div class="footer-legal">
      <div data-footer-legal style="display:flex;gap:1.2rem;flex-wrap:wrap"></div>
      <span data-credit>Designed &amp; Developed by Urban Mark Creatives</span>
    </div>
  </div>
</footer>

<a class="float-wa" href="https://wa.me/254746128860" target="_blank" rel="noopener" data-wa-float aria-label="Chat with us on WhatsApp">
  <i class="fa-brands fa-whatsapp"></i><span>Chat with us</span>
</a>
<button class="to-top" id="toTop" type="button" aria-label="Back to top"><i class="fa-solid fa-arrow-up"></i></button>

<div class="cookie-bar" id="cookieBar" hidden>
  <p>We use essential local storage to remember your theme and cookie choice, plus analytics pixels to understand what is working. No data is sold.</p>
  <button class="btn btn-sm" id="cookieOk" type="button">Accept</button>
</div>

<div class="toast" id="toast" role="status" aria-live="polite"></div>

<script src="art.js" defer></script>
<script src="app.js" defer></script>
</body>
</html>
"""


def page_hero(eyebrow, h1, lead, crumb):
    return f"""
<section class="page-hero">
  <div class="wrap">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="index.html">Home</a><i class="fa-solid fa-chevron-right"></i><span>{crumb}</span>
    </nav>
    <span class="eyebrow">{eyebrow}</span>
    <h1>{h1}</h1>
    <p>{lead}</p>
  </div>
</section>
"""


# ============================================================ ABOUT
about_body = page_hero(
    "About the studio",
    "A Kenyan studio built for global work.",
    "Urban Mark Creatives connects creative ideas with reliable technology, so companies get a brand, a website and printed materials that look and work as one.",
    "About",
) + """
<section class="sec">
  <div class="wrap">
    <div class="split">
      <div class="split-media reveal">
        <img src="images/studio.webp" alt="Inside the Urban Mark Creatives design studio" data-about-image width="1376" height="768">
        <div class="split-badge"><b>5+</b><span>Years<br>operating</span></div>
      </div>
      <div class="reveal reveal-d1">
        <span class="eyebrow">Our story</span>
        <h2 style="font-size:var(--step-3);margin-bottom:1rem" data-about-title>About Urban Mark Creatives</h2>
        <p style="color:var(--fg-soft);margin-bottom:.9rem" data-about-text1></p>
        <p style="color:var(--fg-soft)" data-about-text2></p>
        <div class="value-list" data-about-values></div>
      </div>
    </div>
  </div>
</section>

<section class="stats-strip" aria-label="Company statistics">
  <div class="wrap"><div class="stats-grid" data-stats></div></div>
</section>

<section class="sec sec-alt" id="team">
  <div class="wrap">
    <div class="sec-head center reveal">
      <span class="eyebrow">Leadership</span>
      <h2>The people you will actually work with</h2>
      <p>No account managers relaying messages. You deal with the founders who design and build your project.</p>
    </div>
    <div class="team-grid" data-team></div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sec-head center reveal">
      <span class="eyebrow">How we work</span>
      <h2>A process with no surprises</h2>
      <p>Three clear stages, a written scope before anything starts, and a fixed quote you can plan around.</p>
    </div>
    <div class="process-grid" data-process></div>
  </div>
</section>

<section class="sec sec-alt">
  <div class="wrap">
    <div class="sec-head center reveal">
      <span class="eyebrow">Who we work with</span>
      <h2>Every sector needs something different</h2>
      <p>Here is how we approach the organizations we work with most often.</p>
    </div>
    <div class="sector-grid" data-sectors></div>
  </div>
</section>

<section class="cta-band">
  <div class="wrap cta-inner">
    <div class="reveal">
      <span class="eyebrow" style="color:var(--orange-300)">Let's build something</span>
      <h2>Tell us what you want to improve, and we will help you scope it.</h2>
      <p>Message us on WhatsApp, call, or send the form. We reply within one business day with clear next steps.</p>
      <div class="btn-row">
        <a class="btn btn-white" href="https://wa.me/254746128860" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> WhatsApp us</a>
        <a class="btn btn-ghost" href="contact.html"><i class="fa-solid fa-arrow-right"></i> Get a free quote</a>
      </div>
    </div>
    <div class="cta-media reveal reveal-d1">
      <img src="images/studio.webp" alt="The Urban Mark Creatives studio" width="1376" height="768" loading="lazy">
    </div>
  </div>
</section>
"""

# ============================================================ SERVICES
services_body = page_hero(
    "Services",
    "Everything your brand needs, from one studio.",
    "Website design, mobile apps, brand identity, graphic design, digital marketing, hosting and AI automation — delivered remotely to clients in Kenya and worldwide.",
    "Services",
) + """
<section class="sec">
  <div class="wrap">
    <div class="sec-head center reveal">
      <span class="eyebrow">What we do</span>
      <h2>Six services, one standard</h2>
      <p>Each service is delivered by the same team that designs your brand, so nothing gets lost between suppliers.</p>
    </div>
    <div class="svc-grid" data-services></div>
  </div>
</section>

<section class="sec sec-alt" id="pricing">
  <div class="wrap">
    <div class="sec-head center reveal">
      <span class="eyebrow">Starting prices</span>
      <h2>Where projects usually begin</h2>
      <p>We confirm the exact price once we know your pages, content and features. Every quote is written and fixed before work starts.</p>
    </div>
    <div class="price-grid" data-pricing></div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sec-head center reveal">
      <span class="eyebrow">How we work</span>
      <h2>A process with no surprises</h2>
      <p>Three clear stages, a written scope before anything starts, and a fixed quote you can plan around.</p>
    </div>
    <div class="process-grid" data-process></div>
  </div>
</section>

<section class="sec sec-alt" id="faq">
  <div class="wrap">
    <div class="sec-head center reveal">
      <span class="eyebrow">Questions</span>
      <h2>Frequently asked questions</h2>
      <p>Something else? <a href="contact.html" style="color:var(--orange);font-weight:600">Speak with our team</a>.</p>
    </div>
    <div class="faq-list" data-faq></div>
  </div>
</section>

<section class="cta-band">
  <div class="wrap cta-inner">
    <div class="reveal">
      <span class="eyebrow" style="color:var(--orange-300)">Ready to start</span>
      <h2>Not sure which service you need? Tell us the goal.</h2>
      <p>We will suggest the right mix and send a written quote with a fixed price and timeline.</p>
      <div class="btn-row">
        <a class="btn btn-white" href="contact.html"><i class="fa-solid fa-arrow-right"></i> Get a free quote</a>
        <a class="btn btn-ghost" href="https://wa.me/254746128860" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> Ask on WhatsApp</a>
      </div>
    </div>
    <div class="cta-media reveal reveal-d1">
      <img src="images/svc-web.webp" alt="Website design project" width="1200" height="746" loading="lazy">
    </div>
  </div>
</section>
"""

# ============================================================ PORTFOLIO
portfolio_body = page_hero(
    "Selected work",
    "Portfolio and case studies.",
    "Logos, brand systems, print campaigns and websites — presented in realistic device mockups. Open any project to read the brief and the result.",
    "Portfolio",
) + """
<section class="sec">
  <div class="wrap">
    <div class="pf-toolbar">
      <div class="pills" data-pf-pills></div>
      <div class="search-box">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="search" id="pfSearch" placeholder="Search projects" aria-label="Search portfolio">
      </div>
    </div>
    <div class="pf-grid" data-portfolio></div>
    <p class="pf-empty" data-pf-empty hidden>No projects match that search. Try a different keyword.</p>
    <p class="center" style="margin-top:2.2rem">
      <span data-pf-count style="display:block;font-size:.82rem;color:var(--fg-mute);margin-bottom:1rem"></span>
      <button class="btn btn-outline" type="button" data-pf-more>Load more projects</button>
    </p>
  </div>
</section>

<section class="sec sec-alt" id="testimonials">
  <div class="wrap">
    <div class="sec-head center reveal">
      <span class="eyebrow">Client feedback</span>
      <h2>What clients say</h2>
      <p>Feedback from the organizations we have worked with across Kenya and beyond.</p>
    </div>
    <div class="testi-wrap reveal">
      <div class="testi-track" data-testimonials></div>
      <div class="testi-controls">
        <button class="testi-btn" type="button" data-testi-prev aria-label="Previous testimonial"><i class="fa-solid fa-arrow-left"></i></button>
        <div class="testi-dots" data-testi-dots></div>
        <button class="testi-btn" type="button" data-testi-next aria-label="Next testimonial"><i class="fa-solid fa-arrow-right"></i></button>
      </div>
    </div>
  </div>
</section>

<section class="cta-band">
  <div class="wrap cta-inner">
    <div class="reveal">
      <span class="eyebrow" style="color:var(--orange-300)">Your project next</span>
      <h2>Want work like this for your business?</h2>
      <p>Tell us what you are building. We will show you the closest project we have delivered and how we would approach yours.</p>
      <div class="btn-row">
        <a class="btn btn-white" href="contact.html"><i class="fa-solid fa-arrow-right"></i> Start a project</a>
        <a class="btn btn-ghost" href="https://wa.me/254746128860" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> WhatsApp us</a>
      </div>
    </div>
    <div class="cta-media reveal reveal-d1">
      <img src="images/mock-stationery.webp" alt="Brand stationery mockup" width="1200" height="654" loading="lazy">
    </div>
  </div>
</section>
"""

# ============================================================ CONTACT
contact_body = page_hero(
    "Contact",
    "Let's talk about your project.",
    "Call, WhatsApp or send the form. We reply within one business day with clear scope, timeline and pricing — no obligation.",
    "Contact",
) + """
<section class="sec">
  <div class="wrap">
    <div class="contact-grid">
      <div class="reveal">
        <span class="eyebrow">Get in touch</span>
        <h2 style="font-size:var(--step-3);margin-bottom:.8rem">We are easy to reach</h2>
        <p style="color:var(--fg-soft);margin-bottom:.4rem">Prefer WhatsApp? That is usually the fastest way to reach us. For detailed briefs, the form below works best.</p>
        <div class="contact-list" data-contact-list></div>
        <div class="socials" data-socials style="margin-top:1.6rem"></div>
      </div>

      <div class="contact-card reveal reveal-d1">
        <h3 style="font-size:var(--step-2);margin-bottom:.4rem">Send a free quote request</h3>
        <p style="font-size:.88rem;color:var(--fg-mute);margin-bottom:1.2rem">Tell us what you need and we will reply with clear scope, timeline and pricing.</p>
        <form data-lead-form novalidate>
          <div class="form-grid">
            <label class="field"><span>Name</span><input name="name" placeholder="Your name" required autocomplete="name"></label>
            <label class="field"><span>Phone / WhatsApp</span><input name="phone" placeholder="07xx xxx xxx" required autocomplete="tel"></label>
            <label class="field"><span>Email</span><input type="email" name="email" placeholder="you@company.com" autocomplete="email"></label>
            <label class="field"><span>What do you need</span><select name="service" data-service-options required></select></label>
            <label class="field field-full"><span>Project details</span><textarea name="details" rows="4" placeholder="Tell us about your organization, goals and timeline"></textarea></label>
          </div>
          <input type="text" name="website" tabindex="-1" autocomplete="off" class="hp" aria-hidden="true">
          <button class="btn btn-full" type="submit">Send my enquiry <i class="fa-solid fa-arrow-right"></i></button>
          <p class="form-note"><i class="fa-solid fa-lock"></i> This form opens WhatsApp with your details filled in — press send there to reach us. Nothing is stored on this site.</p>
        </form>
      </div>
    </div>
  </div>
</section>

<section class="sec sec-alt" id="faq">
  <div class="wrap">
    <div class="sec-head center reveal">
      <span class="eyebrow">Questions</span>
      <h2>Frequently asked questions</h2>
      <p>Still unsure? <a href="https://wa.me/254746128860" target="_blank" rel="noopener" style="color:var(--orange);font-weight:600">Message us on WhatsApp</a>.</p>
    </div>
    <div class="faq-list" data-faq></div>
  </div>
</section>

<section class="cta-band">
  <div class="wrap cta-inner">
    <div class="reveal">
      <span class="eyebrow" style="color:var(--orange-300)">Prefer to talk</span>
      <h2>Call us and we will scope it on the phone.</h2>
      <p>Mon–Fri, 8:00–18:00 EAT. Outside those hours, WhatsApp us and we will reply the next working morning.</p>
      <div class="btn-row">
        <a class="btn btn-white" href="tel:+254106027162"><i class="fa-solid fa-phone"></i> +254 106 027 162</a>
        <a class="btn btn-ghost" href="https://wa.me/254746128860" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
      </div>
    </div>
    <div class="cta-media reveal reveal-d1">
      <img src="images/mock-iphone.webp" alt="Mobile app project mockup" width="1200" height="654" loading="lazy">
    </div>
  </div>
</section>
"""

PAGES = [
    ("about.html", "about", "About Us | Kiambu Design &amp; Software Studio | Urban Mark Creatives",
     "Meet the team behind Urban Mark Creatives — a Kiambu-based design and software studio serving clients across Kenya and worldwide.",
     "about.html", "images/studio.webp", about_body),
    ("services.html", "services", "Services | Web Design, Branding, Apps &amp; SEO | Urban Mark Creatives",
     "Website design, mobile apps, brand identity, graphic design, digital marketing, hosting and AI automation for businesses in Kenya and beyond.",
     "services.html", "images/svc-web.webp", services_body),
    ("portfolio.html", "portfolio", "Portfolio &amp; Case Studies | Urban Mark Creatives",
     "Selected logos, brand systems, print campaigns and websites delivered by Urban Mark Creatives for clients in Kenya and worldwide.",
     "portfolio.html", "images/mock-macbook.webp", portfolio_body),
    ("contact.html", "contact", "Contact Us | Get a Free Quote | Urban Mark Creatives",
     "Talk to Urban Mark Creatives about your website, branding or print project. Call +254 106 027 162, WhatsApp us, or send a free quote request.",
     "contact.html", "images/hero.webp", contact_body),
]

for fname, page, title, desc, canon, og, body in PAGES:
    html = head(title, desc, canon, og) + header(page) + body + FOOTER
    with open(os.path.join(OUT, fname), "w", encoding="utf-8") as f:
        f.write(html)
    print("wrote", fname, len(html), "bytes")
