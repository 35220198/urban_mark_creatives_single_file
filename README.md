Urban Mark Creatives Website

A responsive business website for Urban Mark Creatives, a creative and technology agency based in Kiambu, Kenya. The website showcases web development, graphic design, branding, printing, merchandise, hosting, and digital marketing services.

Overview

Urban Mark Creatives provides creative and digital solutions for businesses, startups, NGOs, churches, schools, clinics, and other organizations in Kenya and beyond.

The website allows visitors to explore services, view portfolio examples, compare service packages, browse merchandise, and request quotations through WhatsApp.

Features
Responsive design — layouts for desktop, tablet, and mobile devices.
Service showcase — website development, graphic design, branding, marketing, and IT solutions.
Portfolio gallery — categorized examples of logos, branding, flyers, business cards, letterheads, and company profiles.
Website portfolio — showcases example website projects across multiple industries.
Service rate card — interactive categories with package descriptions, features, and prices in Kenyan shillings (KES).
Merchandise shop — displays printing products and branded merchandise with indicative prices.
Quotation form — collects customer details and opens a WhatsApp message with the enquiry.
Mobile navigation — collapsible navigation menu for smaller screens.
FAQ accordion — expandable answers to common customer questions.
Scroll animations — reveals selected elements as visitors scroll.
Contact options — WhatsApp, email, telephone, and social media links.
SEO basics — page title, meta description, semantic HTML, and favicon.
Technologies Used
HTML5
CSS3
Vanilla JavaScript
SVG graphics generated through JavaScript
WhatsApp click-to-chat links
Google Fonts are not required; the site uses system font stacks.
Project Structure
urban-mark-creatives/
├── index.html
├── style.css
├── script.js
├── art.js
├── logo.png
└── README.md


Important: The HTML currently references styles.css, not style.css. Ensure the stylesheet filename matches the reference in index.html. If your actual file is named style.css, change the stylesheet link to:

HTML
<link rel="stylesheet" href="style.css">


The art.js file is also required because script.js uses the ART object to render portfolio graphics, website previews, and merchandise illustrations.

Getting Started
1. Download or clone the project

Place all website files in one directory.

2. Check the filenames

Make sure the HTML, CSS, JavaScript, artwork, and logo files match the filenames referenced in the source code.

3. Run the website locally

The simplest option is to open index.html in a modern web browser.

For a more consistent development environment, use Visual Studio Code with the Live Server extension:

Open the project folder in Visual Studio Code.
Install the Live Server extension if necessary.
Right-click index.html.
Select Open with Live Server.
4. Test the website

Check that:

The navigation menu opens and closes correctly.
Service and portfolio tabs update their content.
Service prices and package details display correctly.
The FAQ accordion works.
The quotation form opens WhatsApp with the submitted information.
The website displays correctly on mobile devices.
All images, links, and contact details are correct.
Customization
Business information

Edit index.html to update:

Business name and description
Telephone numbers and email address
WhatsApp contact links
Social media links
About section and team information
SEO metadata and page title
Services and pricing

Edit the SVC, RT, and SHOP arrays in script.js.

SVC contains the main service cards.
RT contains service categories, packages, features, and pricing.
SHOP contains merchandise names and displayed prices.
FAQ contains frequently asked questions.
WEB contains website portfolio entries.
PF contains portfolio categories and example project names.
BLOG contains the featured blog cards.

Prices are displayed in Kenyan shillings (KES). Confirm all prices and package descriptions before publishing.

Website styling

Edit the CSS file to customize colours, typography, spacing, cards, buttons, and responsive breakpoints.

The main theme variables are defined in :root:

:root {
  --navy: #0a1d44;
  --navy2: #0f2a5e;
  --or: #e8661a;
  --or2: #c9500d;
  --teal: #1fb5b0;
  --bg: #f6f8fb;
  --ink: #0b1630;
  --mut: #5a6682;
  --line: #e3e8f0;
  --w: 1140px;
}

Logo and artwork

Replace logo.png with your current logo while keeping the filename unchanged, or update all references to match the new filename.

The art.js file should be maintained alongside script.js because the website relies on its artwork-rendering functions.

Quotation Form

The quotation form uses client-side JavaScript to collect the visitor's name, phone number, email, service selection, and project details. It then opens a WhatsApp chat with a prefilled enquiry.

The destination number is defined in script.js:

const WA = '254746128860';


Update this number if the official enquiry line changes.

Note: The form does not currently store submissions in a database or send emails directly. It relies on the visitor having access to WhatsApp and sending the prefilled message.

Deployment

The website can be hosted on any static web hosting service, including:

GitHub Pages
Netlify
Cloudflare Pages
cPanel hosting
Traditional web hosting with a custom domain
Deployment checklist
Confirm the stylesheet filename matches the HTML reference.
Upload index.html, the stylesheet, script.js, art.js, and logo.png.
Verify that all internal and external links work.
Test the WhatsApp quotation form.
Confirm that business contact information is correct.
Test the site on mobile and desktop.
Configure the domain and HTTPS.
Add a sitemap and robots.txt if appropriate.
Review SEO metadata, accessibility, and image loading.
Test the deployed website before sharing it publicly.
Security and Privacy
Do not place passwords, API keys, private credentials, or other secrets in client-side JavaScript.
Use HTTPS on the production website.
Review third-party links and external resources before deployment.
Add a privacy notice if customer information is collected or processed.
Use a server-side service if enquiries must be stored, emailed, or managed securely.
Browser Compatibility

The website is intended for modern versions of Chrome, Firefox, Safari, and Microsoft Edge.

Some interactions rely on JavaScript features such as IntersectionObserver, FormData, and template literals. Test the site on the browsers and devices used by your customers.

Maintenance

Regularly review:

Service packages and pricing
Portfolio projects and case studies
Business contact details
Merchandise availability
Blog links and featured content
Mobile responsiveness and page performance
Broken links and search visibility
Contact

Urban Mark Creatives

Location: Kiambu Town, Kenya
Telephone: +254 106 027 162
WhatsApp: +254 746 128 860
Email: URBANMARKCREATIVES@gmail.com
Portfolio: https://www.behance.net/simonndichu
Blog: https://urbanmarkcreatives.blogspot.com/
License

Unless a separate license is provided, the website source code, branding, artwork, and business content should be treated as proprietary to their respective owners. Obtain permission before reusing business assets or client work.
