Urban Mark Creatives Website
Description

Urban Mark Creatives is a web design, graphic design and print studio based in Kiambu, Kenya, working with clients in Kenya and worldwide. This is the company website: a fast, responsive, single-page site with a built-in private admin dashboard for editing content without touching code.

The layout follows the "Website Design Company Kenya | Graphics & Web Development" format: services mega-menu, quote form, portfolio by category, website showcase, pricing tabs, print shop, FAQ, blog and a WhatsApp enquiry button.

Features
Responsive on phones, tablets and desktops
Sparkle effect on every click or tap
Portfolio with six categories: Logos, Branding, Fliers, Cards, Letterheads, Profiles
Realistic mockup images, all using corporate and global brand names
Pricing tabs: Brand, Websites, E-commerce, Apps, Design, Hosting
Quote form that opens WhatsApp with the enquiry filled in
Private admin dashboard (see below)
Files
File	Purpose
index.html	Page structure and SEO details
style.css	All styling, responsive rules and effects
script.js	Content, page rendering, interactions and admin panel
art.js	Drawn fallback graphics, used only if an image file is missing
images/	64 portfolio, website and shop images (JPG)
logo.png	Company logo
Run locally

Keep index.html and the images folder together. From this folder run:

python -m http.server 8000

Then open http://localhost:8000

Admin panel

Open http://localhost:8000/#admin (or yoursite.com/#admin). You can also press Ctrl + Shift + A, or triple-click the logo.

Default password: urbanmarkcreatives2026. Change it under Settings after signing in.

Tabs: Overview, Services, Portfolio, Websites, Pricing, Shop, Industries, FAQ, Blog, Photos, Leads, Settings.

Important limits:

Edits are saved in the browser you use, so other visitors will not see them. Use Settings > Export backup regularly.
The password check runs in the page code, so it keeps casual visitors out but is not strong security. Sharing changes with all visitors needs a backend such as Firebase or Supabase.
Replacing images with real photos

Replace any file in images/ with your own photo using the same name, for example logos-1.jpg, cards-3.jpg, web-2.jpg or shop-5.jpg. Or upload a photo for any item from the admin panel (Portfolio, Websites, Shop and Photos tabs).

Naming: logos-, branding-, fliers-, cards-, letterheads-, profiles- (1 to 8), web- (1 to 6), shop- (1 to 10).

Publishing

Upload the whole folder to any static host (cPanel, Netlify, GitHub Pages, Vercel).

Contact

WhatsApp +254 746 128 860 | +254 106 027 162 | URBANMARKCREATIVES@gmail.com
