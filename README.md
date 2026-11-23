# Urban Mark Creatives — static website

100% static. HTML5, CSS3 and vanilla JavaScript only. **No PHP, no database, no build step.**
Upload the folder as-is to GitHub Pages and it works.

---

## 1. Files

| File | Purpose |
|---|---|
| `index.html` | Homepage — hero, services, portfolio, process, about, team, testimonials, pricing, sectors, FAQ, CTA |
| `about.html` | Story, values, team, process, sectors |
| `services.html` | All six services, pricing, process, FAQ |
| `portfolio.html` | Filterable case studies in 3D device mockups, testimonials |
| `contact.html` | Contact details, quote form, FAQ |
| `privacy-policy.html` | Legal template (review before relying on it) |
| `terms-of-service.html` | Legal template (review before relying on it) |
| `admin.html` | Content dashboard — glassmorphism login, 12 tabs, export `data.json` |
| `style.css` | Full design system (~2,650 lines) |
| `app.js` | Data binding, UI, portfolio modal, tracking, admin engine (~1,530 lines) |
| `art.js` | Particle canvas engine, scroll reveal, counters, 3D tilt |
| `data.json` | **All site content** — the single source of truth |
| `sitemap.xml` | Search engine sitemap |
| `robots.txt` | Crawl rules (`admin.html` disallowed) |
| `images/` | 19 optimised WebP/PNG assets (~1.1 MB total) |

---

## 2. Deploy to GitHub Pages

```bash
# 1. Create a new repository on GitHub (e.g. umc-website), then:
git init
git add .
git commit -m "Urban Mark Creatives — static site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/umc-website.git
git push -u origin main
```

Then in the repository: **Settings → Pages → Source: Deploy from a branch → Branch: `main` / `(root)` → Save.**

The site goes live at `https://YOUR-USERNAME.github.io/umc-website/` in about a minute.

> `index.html` must sit in the repository **root** (not in a subfolder), or the homepage will not load.

---

## 3. Connect your Namecheap domain

### In GitHub
1. **Settings → Pages → Custom domain** → enter `urbanmarkcreatives.com` → **Save**.
2. Wait for the DNS check, then tick **Enforce HTTPS**.
3. This creates a `CNAME` file in your repo — commit it and leave it there.

### In Namecheap
Go to **Domain List → your domain → Advanced DNS** and add:

| Type | Host | Value | TTL |
|---|---|---|---|
| A Record | `@` | `185.199.108.153` | Automatic |
| A Record | `@` | `185.199.109.153` | Automatic |
| A Record | `@` | `185.199.110.153` | Automatic |
| A Record | `@` | `185.199.111.153` | Automatic |
| CNAME Record | `www` | `YOUR-USERNAME.github.io.` | Automatic |

- Delete any existing **A** or **CNAME** records on `@` and `www` first (including Namecheap's parking page).
- The trailing dot on the CNAME value matters.
- DNS propagates in 30 minutes to 24 hours.

### If you use the apex domain **and** www
Set the custom domain in GitHub to `urbanmarkcreatives.com`, then add a second entry
**Domain List → Redirect Domain** pointing `www` → apex (or simply keep the CNAME above).

---

## 4. Editing content

### Option A — Admin dashboard (recommended)
1. Open `https://your-domain/admin.html`
2. Default login — **username** `admin` · **password** `urbanmarkcreatives2026`
   *(change it immediately in the **Account** tab)*
3. Edit any tab, then click **Save & Preview Live**.
   The change appears instantly **in that browser only**.
4. Click **Export data.json** and upload the downloaded file to your repository, replacing the old one.

GitHub Pages redeploys in ~1 minute and every visitor sees the change.

### Option B — Edit `data.json` directly
Every headline, service, price, team member, testimonial, FAQ and tracking ID lives in `data.json`.
Edit it in any text editor, commit, push.

### Publishing order (important)
`localStorage` (the browser draft) always wins over `data.json` for **you**.
So while you have unsaved local edits, your own browser shows the draft while visitors see `data.json`.
Use **Reset** in the dashboard to drop the local draft and match the published file.

---

## 5. Tracking

Configured in `data.json` → `tracking`, editable in the **Tracking** tab.

| Field | Default | Behaviour |
|---|---|---|
| `metaPixelId` | `965331479743168` | Active. Base code is hard-coded in every `<head>` with a `<noscript>` fallback. |
| `googleTagId` | `""` | GA4 / Google Ads. Script injected only when filled. |
| `tiktokPixelId` | `""` | TikTok Pixel. Script injected only when filled. |
| `linkedinPartnerId` | `""` | LinkedIn Insight Tag. Script injected only when filled. |

**Events fired automatically**

| Event | Trigger |
|---|---|
| `PageView` | Every page load (Meta base code) |
| `Lead` | Quote / enquiry form submitted |
| `Contact` | WhatsApp, phone or email link clicked |
| `ViewContent` | Portfolio case study opened |

---

## 6. SEO

- Unique `<title>`, `<meta name="description">`, canonical and Open Graph / Twitter Card tags on every page.
- `ProfessionalService` JSON-LD in `index.html` — Kiambu address, both founders, six services, contact number.
- `sitemap.xml` with image entries; `robots.txt` disallows `admin.html`.
- Semantic HTML5 landmarks, lazy-loaded images with explicit `width`/`height` (no layout shift).
- SEO Manager tab in the dashboard for the homepage title, description and share image.

**Before going live:** update every `https://urbanmarkcreatives.com` occurrence in the HTML files,
`sitemap.xml` and `robots.txt` if you deploy to a different domain.

---

## 7. Performance notes

- Total page weight ≈ **1.6 MB** (19 images at ~1.1 MB, compressed WebP).
- No frameworks, no jQuery, no build tooling — two small JS files, one CSS file.
- Particle canvases pause when off-screen and are disabled for `prefers-reduced-motion`.
- Fonts and Font Awesome load from CDN with `preconnect`.

---

## 8. Browser support

Chrome, Edge, Firefox, Safari and Samsung Internet (last 2 versions).
Uses `backdrop-filter` (glassmorphism), CSS `color-mix()`, `grid-template-rows` animation and
`IntersectionObserver`. Older browsers degrade gracefully — content stays readable, effects drop off.

---

## 9. Known limits (by design)

A static site has no server, so:

- **The quote form does not email you by itself.** It validates, fires the `Lead` pixel event, then
  opens WhatsApp with the message pre-filled — you press send there. This is stated on screen.
  To send real email instead, point the form at your own endpoint (Formspree, an Apps Script web app, etc.).
- **The admin login is a convenience gate, not security.** The password lives in that browser's
  `localStorage`. It stops someone casually poking at the editor on your machine; it does not protect
  a public URL. Never store anything sensitive in `data.json`.
- **Admin changes are per-browser until you export `data.json`.** That export step is what publishes
  to the world.

---

© 2026 Urban Mark Creatives.
