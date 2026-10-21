const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const WA='254746128860';

/* ---------- Data ---------- */
const SVC=[['Graphics Design','Design from KES 1,000','Logos, flyers, posters, social media graphics and company profiles, set up properly for print and screen.','Design'],
['Web Development','Websites from KES 15,000','Focused landing pages from KES 15,000, business websites from KES 25,000, and ecommerce with M-Pesa integration.','Websites'],
['Digital Marketing','Plans scoped to your goal','Local SEO, paid ads and social media management for businesses that want more enquiries.',''],
['Branding & Print','Branding from KES 9,500','Brand identity, signage and branded merchandise, so your business looks the same everywhere it shows up.','Brand'],
['Business Consulting','Free first consultation','Practical guidance on branding, positioning and growth, delivered in a free 30-minute call before you spend money.',''],
['IT Solutions','Support scoped on request','Business email, cloud setup, connecting the systems you already use, and technical support when something breaks.','Hosting']];
const PF={Logos:['Logos',['Kiambu Fresh Wash','Savanna Trails Tours','Mlima Coffee House','Mama Pilau Kitchen','Karuri Heights Realty','Sauti FM Radio','Blue Heron Travel','Zuri Salon & Spa']],
Branding:['Branding',['Branded Cap','Paper Cups','Kraft Bag','Shop Signage','Enamel Mug','Thermal Flask','Staff T-Shirt','Project Report']],
Fliers:['Fliers',['Grand Opening','Summer Sale','Online Classes','Farm Produce','Auto Service','Tech Expo','Coffee Festival','Beauty Week']],
Cards:['Cards',['Navy & Orange','Green & Gold','Maroon','Blue & Sky','Black & Orange','Teal & Cream','Purple & Pink','Brown & Gold']],
Letterheads:['Letterheads',['Corporate Navy','Agri Green','Maroon Classic','Blue Modern','Black & Orange','Clinic Teal','School Purple','Hardware Brown']],
Profiles:['Profiles',['Power Systems','Consulting','Construction','Logistics','Energy','Mining','Education','Health']]};
const WEB=[['Savanna Trails Safaris','Travel','A premium safari platform with tour packages, enquiry forms and WhatsApp booking.'],['Mlima Farms','Agriculture','A produce and farm-supplies website with product catalogue and order enquiries.'],['Karuri Logistics','Corporate','A corporate site presenting fleet, routes and quotation requests.'],['Kiambu Medicare Clinic','Healthcare','A clinic website with services, doctors and appointment enquiries.'],['Zuri Boutique Store','E-commerce','An online fashion store with M-Pesa checkout and delivery tracking.'],['Hillcrest Academy','Education','A school website with admissions, news, fees and parent information.']];
const WHO=[['Businesses and startups','Leads, sales and credibility.','See business sites'],['NGOs and nonprofits','Donors, partners and programme visibility.','See NGO work'],['Churches and ministries','Members, events and community engagement.','Explore web development'],['Schools and training institutions','Admissions, parents and student information.','See school sites'],['Healthcare providers','Patient confidence and appointment enquiries.','See clinic sites'],['Professionals and community organizations','Reputation and easier communication.','See law and consulting sites']];
const RT={
Brand:[['Starter Identity','The essentials to launch your business.',['4 logo concepts; choose 1 final','4 revision rounds','AI, EPS, SVG, PDF, JPG, PNG files','1 double-sided business card','1 letterhead in Word and PDF'],'Starting from','KES 9,500'],
['SME Brand System','For a business ready to market consistently.',['Everything in Starter Identity','Primary, secondary and icon logos','6 social post templates','Detailed Brand Guide'],'Starting from','KES 25,000'],
['Corporate Rebrand','A fresh identity for an established business.',['Everything in SME Brand System','Brand strategy session (90 min)','Audience, positioning and key messages','15-20 page brand guide'],'Starting from','KES 55,000']],
Websites:[['Landing Page','One focused page for your offer or campaign.',['One mobile-friendly page','Enquiry or WhatsApp button','Analytics setup','SEO foundations'],'Starting from','KES 15,000'],
['Business Website','A clear home for your business or organisation.',['Core business pages','Mobile-friendly design','Content structure','Contact and enquiry setup'],'Starting from','KES 25,000'],
['Point of Sale System','Run sales, stock and branch operations.',['Point of sale and receipts','Inventory and purchasing','Multi-branch reporting','Roles and audit trails'],'Priced after scoping','Custom quote']],
Ecommerce:[['Starter Store','A focused store with a simple checkout.',['Up to 50 products','Mobile-first storefront','Basic checkout setup','Launch support'],'Fixed price','KES 45,000'],
['Growth Store','More ways to pay and clearer sales reporting.',['Larger catalogue','M-Pesa and broader payments','Analytics and event tracking','Post-launch refinement'],'Fixed price','KES 85,000'],
['Commerce Platform','Custom workflow, integrations and behaviour.',['Custom operational logic','Advanced fulfilment flow','Integration planning','Phased delivery'],'Starting from','KES 150,000']],
Apps:[['Launch App','For MVPs and test concepts.',['Android or iOS','Core features, login and profiles','Basic admin dashboard','Delivery in 30 days'],'Fixed price','KES 100,000'],
['Growth App','For growing startups.',['Android and iOS, one codebase','Interactive prototype first','M-Pesa verified server-side','Delivery in 60 to 90 days'],'Fixed price','KES 300,000'],
['Business App','For apps that carry daily operations.',['Third-party integrations and roles','Live tracking or offline mode','Analytics dashboards','3 months post-launch support'],'Fixed price','KES 600,000']],
Design:[['Social Media Poster','Perfect for Instagram, Facebook and WhatsApp.',['Custom design','HQ digital format (JPG/PNG)','2 rounds of revisions','24 hour turnaround'],'Fixed price','KES 2,500'],
['Event Poster/Flier','High-resolution design for print and digital.',['Print ready PDF with bleeds','Source file included','3 rounds of revisions','Social media resize'],'Fixed price','KES 3,500'],
['Campaign Series','Consistent branding across a full campaign.',['3 unique designs','All source files','Priority support','Unlimited revisions'],'Fixed price','KES 8,000'],
['Logo Express','Logo only, fast.',['3 concepts; choose 1','2 revision rounds','JPG, transparent PNG, print PDF','Colour and B/W exports'],'Fixed price','KES 2,500'],
['Letterhead Design','A single design to get started fast.',['Print-ready 300dpi PDF','Editable Word template','Preview file','Usage instructions'],'Price range','KES 1,000 to 3,000'],
['Company Profile','1 to 10 pages; larger profiles scale up.',['Layout and copy polish','Print and PDF versions','Photos and icons placed','Tender-ready formatting'],'Starting from','KES 5,000']],
Hosting:[['Mailbox Lite','Professional email on your own domain.',['Clean webmail and mobile sync','Proper anti-spam'],'Fixed price','KES 1,000'],
['Managed Web Hosting','Annual hosting bundle with business mailboxes.',['SSL included','Daily backups','Business mailboxes'],'Fixed price','KES 14,000 / year'],
['VPS Starter','4 cores and 8 GB RAM for production sites.',['Production-ready','Managed server setup available'],'Fixed price','KES 14,000 / year']],
Care:[['Business Care Plan','Your site stays secure, backed up and current.',['Core and plugin updates','Weekly off-site backups','Uptime and SSL monitoring','Up to 4 content edits a month'],'Fixed price','KES 5,000'],
['Growth Care Plan','Maintenance plus active work on rankings.',['Everything in Business','Up to 10 content edits a month','Monthly on-page SEO','Google Business Profile updates'],'Fixed price','KES 10,000'],
['Professional Care Plan','For busy sites and online stores.',['Everything in Growth','Daily off-site backups','Staging copy for testing','Up to 8 hours dev work a month'],'Fixed price','KES 25,000']],
Training:[['Graphic Design: Basic','Photoshop and Illustrator, 1 month, 12 sessions.',['Photoshop essentials','Illustrator fundamentals','Typography and colour theory','Logo design basics'],'Fixed price','KES 25,000'],
['Graphic Design: Pro','2 months, 16 sessions.',['Everything in Basic','Advanced photo manipulation','Brand identity design','UI/UX design elements'],'Fixed price','KES 35,000'],
['Premiere Pro: Basic','2 weeks, 6 sessions.',['Interface overview','Basic video editing','Audio and transitions','Video export'],'Fixed price','KES 20,000']]};
const SHOP=[['Custom Engraved Door Plates','From KES 1,250 each','plate'],['Branded Skin-Feel Thermal Flask','From KES 2,050 each','flask'],['Custom Branded Pens','From KES 80 each','pens'],['A4 Document Printing (20 pages)','From KES 290 per job','docs'],['Company Profile Printing','From KES 457 each','book'],['Spiral Binding Services','From KES 200 per document','spiral'],['Architectural Plan Printing','From KES 150 per sheet','plan'],['Tent Card Printing (10 per pack)','From KES 850 per pack','tent'],['Presentation Folders (30 per pack)','From KES 5,400 per pack','folder'],['Branded Kraft Bags (50 per pack)','From KES 7,500 per pack','bag'],['Branded Enamel Mugs (2 per pack)','From KES 1,700 per pack','mug'],['A3 Flyer Printing','From KES 15 each','flyers'],['Funeral Programme Printing','From KES 390 per booklet','funeral'],['Custom Receipt Books','From KES 468 per book','receipt'],['Branded T-Shirts','From KES 780','tshirt'],['Roll-up Banner Printing','From KES 10,000','banner']];
const FAQ=[['What makes Urban Mark Creatives a strong choice in Kenya?','One team handles your logo, website and printed material so everything matches, with clear scope and pricing agreed before work starts.'],['How much does website design cost in Kenya?','Landing pages start from KES 15,000, business websites from KES 25,000 and ecommerce from KES 45,000. You get a fixed quote before you commit.'],['Do you offer graphic design services?','Yes. Logos, fliers, posters, business cards, company profiles, letterheads and social media graphics.'],['How long does a website project take?','Landing pages take about 1 to 2 weeks and business sites 3 to 5 weeks, depending on content readiness and feedback speed.'],['Can you redesign my existing website?','Yes. We review what you have, keep what works, and rebuild the rest for speed, clarity and enquiries.'],['What are your payment terms?','Work is split into milestones. A deposit starts the project and the balance is paid before final files or launch. M-Pesa is accepted.'],['Do you provide hosting and domain registration?','Yes, managed web hosting, business email and domain setup are available.'],['Where are you located and who do you serve?','We are based in Kiambu Town and work fully remotely with clients across Kenya and beyond, over calls and WhatsApp.']];
const BLOG=[['How to Prepare Logo Files for Print in Kenya: Formats, Bleed and Colour','A short checklist so your logo prints sharp on shirts, banners, stamps and signage.'],['What a Small Business Website Should Include Before You Launch','Pages, WhatsApp buttons, speed and SEO basics every Kenyan business site needs.'],['Business Card Design Tips: Size, Paper and What Details to Include','Make the card people keep: layout, finishing and contact-first design.']];

/* ---------- Render ---------- */
const openTab=(name)=>{const b=$$('#rt-tabs button').find(x=>x.dataset.k===name);b&&b.click()};
$('#svc').innerHTML=SVC.map(s=>`<a class="card reveal" href="#${s[3]?'rates':'contact'}" data-tab="${s[3]}"><h3>${s[0]}</h3><span class="pr">${s[1]}</span><p>${s[2]}</p></a>`).join('');
const pfTabs=$('#pf-tabs');pfTabs.innerHTML=Object.keys(PF).map((k,i)=>`<button class="${i?'':'on'}" data-k="${k}">${k.toUpperCase()}</button>`).join('');
const showPF=k=>{const names=PF[k][1];$('#pf').innerHTML=names.map((n,i)=>`<div class="tile reveal in"><div>${ART.pf(k,i)}</div><div class="m"><small>${k.toUpperCase()}</small><h4>${n}</h4></div></div>`).join('')};
pfTabs.onclick=e=>{const b=e.target.closest('button');if(!b)return;$$('button',pfTabs).forEach(x=>x.classList.remove('on'));b.classList.add('on');showPF(b.dataset.k)};showPF('Logos');
$('#web').innerHTML=WEB.map((w,i)=>`<div class="card reveal"><div>${ART.site(i)}</div><span class="pk">${w[1].toUpperCase()}</span><h4 style="font-size:1.1rem">${w[0]}</h4><p>${w[2]}</p><a class="btn" href="#contact">Get a similar site</a></div>`).join('');
$('#whoList').innerHTML=WHO.map(w=>`<div class="reveal"><b>${w[0]}</b><span>${w[1]}</span><a href="#contact">${w[2]} &rarr;</a></div>`).join('');
const rtTabs=$('#rt-tabs');rtTabs.innerHTML=Object.keys(RT).map((k,i)=>`<button class="${i?'':'on'}" data-k="${k}">${k.toUpperCase()}</button>`).join('');
const showRT=k=>{$('#rt').innerHTML=RT[k].map(p=>`<div class="card"><span class="pk">PACKAGE</span><h4 style="font-size:1.1rem">${p[0]}</h4><p>${p[1]}</p><ul>${p[2].map(f=>`<li>${f}</li>`).join('')}</ul><div class="foot"><small>${p[3].toUpperCase()}</small><b>${p[4]}</b><br><a class="pr" href="https://wa.me/${WA}?text=${encodeURIComponent('Hello, I would like a quote for: '+p[0])}" target="_blank" rel="noopener">Request quote &rarr;</a></div></div>`).join('')};
rtTabs.onclick=e=>{const b=e.target.closest('button');if(!b)return;$$('button',rtTabs).forEach(x=>x.classList.remove('on'));b.classList.add('on');showRT(b.dataset.k)};showRT('Brand');
$('#shopGrid').innerHTML=SHOP.map((s,i)=>`<div class="tile reveal"><div>${ART.shop(s[2],i)}</div><div class="m"><h4>${s[0]}</h4><b>${s[1]}</b></div></div>`).join('');
$('#faq').className='faq';$('#faq').innerHTML=FAQ.map(f=>`<button>${f[0]}</button><div class="a">${f[1]}</div>`).join('');
$('#faq').onclick=e=>{const b=e.target.closest('button');if(!b)return;const was=b.classList.contains('open');$$('#faq button').forEach(x=>x.classList.remove('open'));if(!was)b.classList.add('open')};
$('#blogList').innerHTML=BLOG.map(b=>`<div class="card reveal"><time>21 Oct 2026</time><h4 style="font-size:1.05rem">${b[0]}</h4><p>${b[1]}</p><span class="rd">Read article &rarr;</span></div>`).join('');

/* ---------- Interactions ---------- */
document.addEventListener('click',e=>{const a=e.target.closest('[data-tab]');if(a&&a.dataset.tab)setTimeout(()=>openTab(a.dataset.tab),50);
 const d=e.target.closest('.dd>button');if(d&&innerWidth<=980)d.parentElement.classList.toggle('open');
 if(e.target.closest('nav a'))$('#menu').classList.remove('show')});
$('#burger').onclick=()=>$('#menu').classList.toggle('show');
$('#quoteForm').onsubmit=e=>{e.preventDefault();const f=Object.fromEntries(new FormData(e.target));
 const msg=`Hello Urban Mark Creatives,%0AName: ${f.name}%0APhone: ${f.phone}%0AEmail: ${f.email||'-'}%0AService: ${f.service}%0ADetails: ${f.details||'-'}`;
 window.open(`https://wa.me/${WA}?text=${msg}`,'_blank')};
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.1});
$$('.reveal').forEach(el=>io.observe(el));

