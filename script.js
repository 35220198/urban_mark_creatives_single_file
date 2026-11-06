const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const h53=(s,seed=0)=>{let a=0xdeadbeef^seed,b=0x41c6ce57^seed;for(let i=0,c;i<s.length;i++){c=s.charCodeAt(i);a=Math.imul(a^c,2654435761);b=Math.imul(b^c,1597334677)}a=Math.imul(a^a>>>16,2246822507)^Math.imul(b^b>>>13,3266489909);b=Math.imul(b^b>>>16,2246822507)^Math.imul(a^a>>>13,3266489909);return(4294967296*(2097151&b)+(a>>>0)).toString(36)};
const DEFPW='15eu33iqjpk';
const ls={get:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));return true}catch{alert('Browser storage is full. Remove some photos.');return false}}};

/* ---------- Default content (edited live from the admin panel) ---------- */
const DEF={
cfg:{years:'5+',projects:'100+',phone:'+254106027162',phoneD:'+254 106 027 162',email:'URBANMARKCREATIVES@gmail.com',wa:'254746128860',waD:'+254 746 128 860',
h1:'Premier Web Design & Corporate Brand Development in Kenya',lead:'Urban Mark Creatives builds world-class web applications, distinctive brand systems, and high-quality marketing collateral for corporate enterprises, startups, NGOs, and global institutions.'},
SVC:[['Graphics Design','Design from KES 1,000','Logos, flyers, posters, corporate identity, and tender-ready company profiles.','Design'],['Web Engineering','Websites from KES 15,000','Conversion landing pages, corporate portals, and custom e-commerce with automated M-Pesa.','Websites'],['Digital Marketing','Goal-Oriented Campaigns','Google Search Engine Optimization (SEO), PPC advertising, and brand strategy.',''],['Branding & Print','Branding from KES 9,500','Corporate brand guidelines, high-volume apparel printing, and physical signage.','Brand'],['Strategic Consulting','Free 30-min Strategy Call','Executive guidance on market positioning, architecture, and brand scaling.',''],['Cloud Infrastructure','Support on Request','Managed business email hosting, high-performance cloud VPS, and technical support.','Hosting']],
PF:{Logos:['Logos',['Aero Dynamics','Horizon Explorer','Highland Coffee','Apex Catering','Vanguard Realty','Nexus Broadcast','Blue Ocean Logistics','Aura Cosmetics']],Branding:['Branding',['Aero Dynamics Mug','Horizon Paper Cups','Highland Coffee Bag','Apex Shop Signage','Vanguard Thermal Flask','Nexus Staff T-Shirt','Aura Notebook','Blue Ocean Tote']],Fliers:['Fliers',['Grand Opening','Tech Expo 2026','Leadership Summit','Green Energy Forum','Auto Show','Cloud Connect','Investor Day','Fashion Week']],Cards:['Cards',['Northwind & Co.','Halcyon Capital','Meridian Travel','Atlas Freight','Helix Health','Orion Energy','Summit Legal','Lumen Studios']],Letterheads:['Letterheads',['Titan Engineering','Verdant Foods','Oxford Heights','Solace Spa','Pioneer Mining','Zenith Telecom','Crestline Homes','Cobalt Systems']],Profiles:['Profiles',['Lumen Studios','Summit Legal','Orion Energy','Helix Health','Atlas Freight','Meridian Travel','Halcyon Capital','Northwind & Co.']]},
WEB:[['Meridian Travel','Travel','A premium travel platform with tour packages, booking engines, and WhatsApp integration.'],['Verdant Foods','Agriculture','A produce export platform featuring automated order inquiries and product catalogs.'],['Atlas Freight Global','Corporate','An enterprise freight website with fleet tracking and automated quotation workflows.'],['Helix Health Center','Healthcare','A modern medical clinic web app with appointment scheduling and doctor portals.'],['Maison Lumière Store','E-commerce','A fashion e-commerce application with M-Pesa STK push checkout and order tracking.'],['Oxford Heights Academy','Education','An academic institution portal with admissions management and parent resource hubs.']],
WHO:[['Corporate Enterprises & Startups','High converting platforms, brand authority, and digital presence.','Explore Enterprise Work'],['NGOs & International Non-Profits','Donor engagement, program transparency, and global visibility.','Explore Non-Profit Portfolios'],['Churches & Global Ministries','Community portals, live streaming hubs, and event management.','Explore Ministry Web Systems'],['Schools & Academic Institutions','Student admissions portals, fee schedules, and academic news.','Explore Education Portals'],['Medical & Healthcare Providers','Patient trust, service breakdowns, and appointment inquiries.','Explore Healthcare Sites'],['Consulting & Professional Firms','Authority positioning, executive profiles, and client intake.','Explore Firm Websites']],
RT:{Brand:[['Starter Identity','Essential suite to establish your brand presence.',['4 custom logo concepts','4 revision iterations','Vector AI, EPS, SVG, PDF, PNG files','1 double-sided business card design','1 letterhead (Word & PDF)'],'Starting from','KES 9,500'],['SME Brand System','Comprehensive brand ecosystem for market-ready ventures.',['Everything in Starter Identity','Primary, secondary & emblem logos','6 custom social media templates','Full Brand Guidelines Document'],'Starting from','KES 25,000'],['Corporate Rebrand','Complete identity architecture for established enterprises.',['Everything in SME Brand System','90-min Executive Positioning Session','Audience messaging framework','20-page Corporate Brand Styleguide'],'Starting from','KES 55,000']],
Websites:[['Landing Page','Focused single-page app for targeted campaigns.',['Responsive mobile-first layout','Direct WhatsApp & Lead Capture','Google Analytics setup','Core SEO Optimization'],'Starting from','KES 15,000'],['Business Web Application','Complete web portal for companies and institutions.',['Multi-page architectural layout','Responsive performance engine','Structured content system','Lead capture & CRM integration'],'Starting from','KES 25,000'],['Custom Enterprise Portal','Advanced software applications and operational portals.',['Custom operational logic','Multi-branch databases','Role-based access control','Audit trails & API integrations'],'Quote on Scoping','Custom Estimate']],
Ecommerce:[['Starter Online Store','Launch your online sales engine with M-Pesa checkout.',['Up to 50 product listings','Mobile-optimized storefront','M-Pesa STK integration','Store launch support'],'Fixed Investment','KES 45,000'],['Growth E-commerce App','Advanced store features with custom payment gateways.',['Unlimited product catalog','M-Pesa, Card & Paypal Checkout','Sales analytics dashboard','Post-launch optimization'],'Fixed Investment','KES 85,000']],
Apps:[['MVP Launch App','Cross-platform app launch for validated concepts.',['Android & iOS platforms','User authentication & profiles','Basic management dashboard','30-day turnaround'],'Fixed Investment','KES 100,000'],['Enterprise Mobile App','Full scale mobile software with backend integration.',['Native Android & iOS performance','Custom server-side API','Real-time sync & notifications','90-day post launch warranty'],'Fixed Investment','KES 300,000']],
Design:[['Social Media Graphics','High-impact creative graphics for digital channels.',['Custom design','HQ digital format','2 revision rounds','24-hour turnaround'],'Fixed price','KES 2,500'],['Corporate Profile Design','Executive publication layout for tenders & investors.',['Custom page layouts','Print-ready & web PDF','Professional typesetting','Fast delivery'],'Starting from','KES 5,000']],
Hosting:[['Business Mail Lite','Professional domain email hosting.',['Webmail & mobile sync','Anti-spam protection'],'Annual price','KES 1,000 / yr'],['Managed Cloud Hosting','Complete enterprise cloud hosting bundle.',['Free SSL certificate','Automated daily backups','Dedicated business mailboxes'],'Annual price','KES 14,000 / yr']]},
SHOP:[['Custom Engraved Door Plates','From KES 1,250 each','plate'],['Branded Skin-Feel Thermal Flask','From KES 2,050 each','flask'],['Custom Branded Pens','From KES 80 each','pens'],['A4 Document Printing','From KES 290 per job','docs'],['Company Profile Printing','From KES 457 each','book'],['Spiral Binding Services','From KES 200 per doc','spiral'],['Architectural Blueprint Printing','From KES 150 per sheet','plan'],['Branded Kraft Gift Bags','From KES 7,500 (50 pack)','bag'],['Branded Enamel Mugs','From KES 1,700 (2 pack)','mug'],['Branded Executive Apparel','From KES 780 each','tshirt']],
FAQ:[['Why partner with Urban Mark Creatives in Kenya?','We unite branding, software engineering, and print production under one roof, ensuring total visual and technical consistency without contractor friction.'],['What are the investment rates for web design in Kenya?','Conversion landing pages start from KES 15,000, corporate web applications from KES 25,000, and fully integrated e-commerce from KES 45,000.'],['How fast can a web application be deployed?','Landing pages are deployed within 1 to 2 weeks. Larger portals and stores take 3 to 6 weeks depending on scope.'],['Do you accept M-Pesa?','Yes. We accept M-Pesa, bank wire and card payments, with a deposit to start and the balance on delivery.']],
BLOG:[['How to brief a logo designer','A short checklist that saves two rounds of revisions.'],['5 things every company website needs','Speed, clarity, proof, a clear call to action and mobile first.'],['Print vs digital: where to spend first','Matching your budget to where your customers actually look.']]};
const RTL={Brand:'Brand',Websites:'Websites',Ecommerce:'E-commerce',Apps:'Mobile Apps',Design:'Design',Hosting:'Hosting'};
const NORM={'E-commerce':'Ecommerce',Care:'Hosting'};
let S=Object.assign(structuredClone(DEF),ls.get('umc_state',{})),PH=ls.get('umc_photos',{}),pfCat='Logos',rtCat='Brand';
S.cfg=Object.assign({},DEF.cfg,S.cfg);
const save=()=>ls.set('umc_state',S),savePh=()=>ls.set('umc_photos',PH);
const fb=(el,t,a,b)=>{el.outerHTML=t==='pf'?ART.pf(a,b):t==='site'?ART.site(+a):ART.shop(a)};
const pic=(k,f,t,a,b=0)=>PH[k]?`<img src="${PH[k]}" alt="" loading="lazy">`:`<img src="images/${f}.jpg" alt="" loading="lazy" onerror="fb(this,'${t}','${a}',${b})">`;

/* ---------- Render ---------- */
const tile=(media,tag,title,price)=>`<div class="tile reveal"><div class="ph">${media}</div><div class="m"><small>${esc(tag)}</small><h4>${esc(title)}</h4>${price?`<b>${esc(price)}</b>`:''}</div></div>`;
function renderSite(){
$('.hero h1').textContent=S.cfg.h1;$('.lead').textContent=S.cfg.lead;
$('#statYears').textContent=S.cfg.years;$('#statProjects').textContent=S.cfg.projects;
const hero=$('.hero');if(PH.hero){hero.style.backgroundImage=`url(${PH.hero})`;hero.classList.add('photo')}else{hero.style.backgroundImage='';hero.classList.remove('photo')}
const ceo=$('.ceo img');if(PH.ceo)ceo.src=PH.ceo;
$('#svc').innerHTML=S.SVC.map(([t,p,d,tab])=>`<div class="card reveal"><h3>${esc(t)}</h3><span class="pr">${esc(p)}</span><p>${esc(d)}</p><a class="btn outline" href="${tab?'#rates':'#contact'}" ${tab?`data-tab="${tab}"`:''}>${tab?'View rates':'Talk to us'}</a></div>`).join('');
$('#pf-tabs').innerHTML=Object.keys(S.PF).map(k=>`<button class="${k===pfCat?'on':''}" data-pf="${k}">${esc(S.PF[k][0])}</button>`).join('');
const names=(S.PF[pfCat]||['',[]])[1];
$('#pf').innerHTML=names.map((n,i)=>tile(pic(`pf:${pfCat}:${i}`,`${pfCat.toLowerCase()}-${i+1}`,'pf',pfCat,i),pfCat,n)).join('');
$('#web').innerHTML=S.WEB.map(([t,tag,d],i)=>`<div class="card reveal">${pic('web:'+i,'web-'+(i+1),'site',i)}<h4>${esc(t)}</h4><small class="pk">${esc(tag.toUpperCase())}</small><p>${esc(d)}</p><a class="btn" href="#contact">Request similar</a></div>`).join('');
$('#whoList').innerHTML=S.WHO.map(([a,b,c])=>`<div class="reveal"><b>${esc(a)}</b><span>${esc(b)}</span><a href="#contact">${esc(c)} &rarr;</a></div>`).join('');
$('#rt-tabs').innerHTML=Object.keys(S.RT).map(k=>`<button class="${k===rtCat?'on':''}" data-rt="${k}">${RTL[k]||k}</button>`).join('');
$('#rt').innerHTML=(S.RT[rtCat]||[]).map(([n,d,f,l,p])=>`<div class="card reveal"><h3>${esc(n)}</h3><p>${esc(d)}</p><ul>${f.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><div class="foot"><small>${esc(l)}</small><b>${esc(p)}</b></div><a class="btn" href="https://wa.me/${S.cfg.wa}?text=${encodeURIComponent('Hello, I am interested in: '+n)}" target="_blank" rel="noopener">Order this package</a></div>`).join('');
$('#shopGrid').innerHTML=S.SHOP.map(([n,p,k],i)=>tile(pic('shop:'+i,'shop-'+(i+1),'shop',k),'Print',n,p)).join('');
const fq=$('#faq');fq.className='faq';fq.innerHTML=S.FAQ.map(([q,a])=>`<button>${esc(q)}</button><div class="a">${esc(a)}</div>`).join('');
$('#blogList').innerHTML=S.BLOG.map(([t,d])=>`<a class="card reveal" href="https://urbanmarkcreatives.blogspot.com/" target="_blank" rel="noopener"><h3>${esc(t)}</h3><p>${esc(d)}</p><span class="pr">Read article &rarr;</span></a>`).join('');
applyCfg();watchReveal();
}
let applied={...DEF.cfg};
function applyCfg(){
const pairs=[['phoneD'],['phone'],['email'],['waD'],['wa']].filter(([k])=>applied[k]!==S.cfg[k]);
if(!pairs.length)return;
const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;const nodes=[];while(n=w.nextNode())nodes.push(n);
pairs.forEach(([k])=>{nodes.forEach(t=>{if(t.nodeValue.includes(applied[k]))t.nodeValue=t.nodeValue.split(applied[k]).join(S.cfg[k])});$$('a[href]').forEach(a=>{const h=a.getAttribute('href');if(h.includes(applied[k]))a.setAttribute('href',h.split(applied[k]).join(S.cfg[k]))})});
pairs.forEach(([k])=>applied[k]=S.cfg[k]);
}
let io;function watchReveal(){io=io||new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.08});$$('.reveal:not(.in)').forEach(e=>io.observe(e))}
$$('.sec .wrap > h2,.sec .wrap > .sub,.steps > div,.aboutgrid > *').forEach(e=>e.classList.add('reveal'));

/* ---------- Interactions ---------- */
function setTab(t){t=NORM[t]||t;if(S.RT[t]){rtCat=t;renderSite()}}
document.addEventListener('click',e=>{
const a=e.target.closest('[data-tab]');if(a)setTab(a.dataset.tab);
const p=e.target.closest('[data-pf]');if(p){pfCat=p.dataset.pf;renderSite()}
const r=e.target.closest('[data-rt]');if(r){rtCat=r.dataset.rt;renderSite()}
const q=e.target.closest('.faq button');if(q){const o=q.classList.contains('open');$$('.faq button').forEach(b=>b.classList.remove('open'));if(!o)q.classList.add('open')}
const d=e.target.closest('.dd > button');if(d&&innerWidth<=768){const x=d.parentElement;$$('.dd').forEach(y=>y!==x&&y.classList.remove('open'));x.classList.toggle('open')}
if(e.target.closest('nav a')||e.target.closest('.herolinks a'))$('#menu').classList.remove('show');
spark(e.clientX,e.clientY);
});
$('#burger').addEventListener('click',()=>$('#menu').classList.toggle('show'));
function spark(x,y){
const n=matchMedia('(prefers-reduced-motion:reduce)').matches?4:16,cs=['#fff','#ffd36b','#e8661a','#1fb5b0','#7fd1d6'];
for(let i=0;i<n;i++){const s=document.createElement('i'),g=Math.random()*6.283,r=30+Math.random()*70;s.className='spk';s.style.cssText=`--x:${x}px;--y:${y}px;--dx:${Math.cos(g)*r}px;--dy:${Math.sin(g)*r}px;--s:${7+Math.random()*12}px;--c:${cs[i%cs.length]}`;document.body.appendChild(s);s.addEventListener('animationend',()=>s.remove())}
}
$('#quoteForm').addEventListener('submit',e=>{e.preventDefault();const f=Object.fromEntries(new FormData(e.target));
const L=ls.get('umc_leads',[]);L.unshift({...f,at:new Date().toLocaleString()});ls.set('umc_leads',L);
const m=`Hello Urban Mark Creatives,%0AName: ${encodeURIComponent(f.name)}%0APhone: ${encodeURIComponent(f.phone)}%0AEmail: ${encodeURIComponent(f.email||'-')}%0AService: ${encodeURIComponent(f.service)}%0ADetails: ${encodeURIComponent(f.details||'-')}`;
window.open(`https://wa.me/${S.cfg.wa}?text=${m}`,'_blank');e.target.reset()});

/* ---------- Private admin (open with #admin, Ctrl+Shift+A, or triple-click the logo) ---------- */
const adm=$('#adm');let tab='Overview',cur=null,clicks=[];
const authed=()=>sessionStorage.getItem('umc_auth')==='1';
const pwHash=()=>ls.get('umc_pw',DEFPW);
function openAdmin(){adm.hidden=false;document.body.style.overflow='hidden';drawAdmin()}
function closeAdmin(){adm.hidden=true;document.body.style.overflow='';if(location.hash==='#admin')history.replaceState(null,'',location.pathname)}
addEventListener('keydown',e=>{if(e.ctrlKey&&e.shiftKey&&e.key.toLowerCase()==='a'){e.preventDefault();openAdmin()}});
addEventListener('hashchange',()=>{if(location.hash==='#admin')openAdmin()});
if(location.hash==='#admin')openAdmin();
$$('.brand').forEach(b=>b.addEventListener('click',()=>{const t=Date.now();clicks=clicks.filter(x=>t-x<800);clicks.push(t);if(clicks.length>=3){clicks=[];openAdmin()}}));
const photoCtl=k=>`<div class="pc"><span>${PH[k]?`<img src="${PH[k]}" alt="">`:'<i>Using generated art</i>'}</span><label class="btn sm">Upload photo<input type="file" accept="image/*" data-ph="${k}" hidden></label>${PH[k]?`<button data-phx="${k}">Remove</button>`:''}</div>`;
const inp=(f,l,v,k='t',i='')=>`<label>${l}${k==='a'?`<textarea rows="3" data-f="${f}" data-i="${i}" data-k="a">${esc(v)}</textarea>`:k==='l'?`<textarea rows="4" data-f="${f}" data-i="${i}" data-k="l">${esc(v.join('\n'))}</textarea>`:`<input data-f="${f}" data-i="${i}" data-k="t" value="${esc(v)}">`}</label>`;
function listEd(arr,fields,blank,pp){cur={arr,blank,pp};return arr.map((r,i)=>`<div class="er"><div class="eh"><b>#${i+1}</b><button data-del="${i}">Delete</button></div>${fields.map(([f,l,k])=>inp(f,l,r[f],k,i)).join('')}${pp?photoCtl(pp+':'+i):''}</div>`).join('')+`<button class="btn" data-add>+ Add item</button>`}
const TABS=['Overview','Services','Portfolio','Websites','Pricing','Shop','Industries','FAQ','Blog','Photos','Leads','Settings'];
function body(){
const c=S.cfg;cur=null;
if(tab==='Overview')return`<div class="stat"><div><b>${S.SVC.length}</b>Services</div><div><b>${S.SHOP.length}</b>Shop items</div><div><b>${ls.get('umc_leads',[]).length}</b>Leads</div><div><b>${Object.keys(PH).length}</b>Photos</div></div>`+[['h1','Hero headline',c.h1,'a'],['lead','Hero paragraph',c.lead,'a'],['years','Years operating',c.years],['projects','Projects delivered',c.projects],['phoneD','Phone (display)',c.phoneD],['phone','Phone (link, no spaces)',c.phone],['waD','WhatsApp (display)',c.waD],['wa','WhatsApp (digits only)',c.wa],['email','Email',c.email]].map(([f,l,v,k])=>inp(f,l,v,k||'t','cfg')).join('');
if(tab==='Services')return listEd(S.SVC,[[0,'Title'],[1,'Price line'],[2,'Description','a'],[3,'Pricing tab link (Brand, Websites, Design, Hosting or empty)']],['New service','From KES 0','Description','']);
if(tab==='Portfolio'){const n=S.PF[pfCat][1];return`<p><select data-pfsel>${Object.keys(S.PF).map(k=>`<option ${k===pfCat?'selected':''}>${k}</option>`).join('')}</select></p>`+listEd(n.map(x=>[x]),[[0,'Item name']],['New item'],'pf:'+pfCat)}
if(tab==='Websites')return listEd(S.WEB,[[0,'Name'],[1,'Sector'],[2,'Description','a']],['New Client','Sector','Description'],'web');
if(tab==='Pricing')return`<p><select data-rtsel>${Object.keys(S.RT).map(k=>`<option ${k===rtCat?'selected':''} value="${k}">${RTL[k]||k}</option>`).join('')}</select></p>`+listEd(S.RT[rtCat],[[0,'Package name'],[1,'Description','a'],[2,'Features (one per line)','l'],[3,'Price label'],[4,'Price']],['New package','Description',['Feature'],'Starting from','KES 0']);
if(tab==='Shop')return listEd(S.SHOP,[[0,'Product'],[1,'Price line']],['New product','From KES 0','plate'],'shop');
if(tab==='Industries')return listEd(S.WHO,[[0,'Sector'],[1,'Description','a'],[2,'Link text']],['New sector','Description','Explore']);
if(tab==='FAQ')return listEd(S.FAQ,[[0,'Question'],[1,'Answer','a']],['New question','Answer']);
if(tab==='Blog')return listEd(S.BLOG,[[0,'Title'],[1,'Summary','a']],['New article','Summary']);
if(tab==='Photos')return`<div class="note">Uploaded photos replace the generated art. Use the Portfolio, Websites and Shop tabs for per-item photos.</div><h4>Hero background</h4>${photoCtl('hero')}<h4 style="margin-top:18px">Director photo (About)</h4>${photoCtl('ceo')}`;
if(tab==='Leads'){const L=ls.get('umc_leads',[]);return L.length?`<table><tr><th>When</th><th>Name</th><th>Phone</th><th>Service</th><th>Details</th></tr>${L.map(l=>`<tr><td>${esc(l.at)}</td><td>${esc(l.name)}</td><td>${esc(l.phone)}</td><td>${esc(l.service)}</td><td>${esc(l.details||'')}</td></tr>`).join('')}</table><p><button class="btn" data-clearleads>Clear leads</button></p>`:'<p>No enquiries yet. Form submissions made in this browser appear here.</p>'}
return`<div class="note"><b>Storage:</b> changes are saved in this browser only. Visitors on other devices will not see them until the content is moved to a server. Use Export to keep a backup.</div><label>New password<input type="password" id="npw" autocomplete="new-password"></label><p><button class="btn" data-setpw>Change password</button></p><p class="row"><button class="btn" data-export>Export backup</button><label class="btn outline">Import backup<input type="file" accept=".json" data-import hidden></label><button class="btn outline" data-reset>Reset to defaults</button></p>`}
function drawAdmin(){
if(!authed()){adm.innerHTML=`<div class="alogin"><form id="alf"><img src="logo.png" alt="Urban Mark Creatives"><h3>Admin sign in</h3><p style="color:var(--mut);margin:6px 0 14px">Enter the admin password to edit the site.</p><input type="password" id="apw" placeholder="Password" autocomplete="current-password" required><p id="aer" style="color:#dc2626;font-weight:700;margin:8px 0" hidden>Wrong password.</p><button class="btn full" type="submit">Sign in</button><button class="btn outline full" type="button" data-close>Back to site</button></form></div>`;$('#apw').focus();return}
adm.innerHTML=`<div class="ashell"><aside class="aside"><h5>Urban Mark Admin</h5>${TABS.map(t=>`<button class="${t===tab?'on':''}" data-t="${t}">${t}</button>`).join('')}<button data-close>&larr; View site</button><button data-out>Sign out</button></aside><main class="amain"><div class="atop"><h3>${tab}</h3><span id="sv" style="color:var(--teal);font-weight:700"></span></div>${body()}</main></div>`}
const flash=()=>{const s=$('#sv');if(s){s.textContent='Saved';setTimeout(()=>s&&(s.textContent=''),1200)}};
const bump=()=>{save()&&(flash(),renderSite())};
adm.addEventListener('submit',e=>{if(e.target.id!=='alf')return;e.preventDefault();if(h53($('#apw').value)===pwHash()){sessionStorage.setItem('umc_auth','1');drawAdmin()}else $('#aer').hidden=false});
adm.addEventListener('input',e=>{const t=e.target,f=t.dataset.f;if(f===undefined)return;const v=t.dataset.k==='l'?t.value.split('\n').filter(Boolean):t.value;
if(t.dataset.i==='cfg')S.cfg[f]=v;else if(cur){const r=tab==='Portfolio'?S.PF[pfCat][1]:null;if(r)r[+t.dataset.i]=v;else cur.arr[+t.dataset.i][+f]=v}bump()});
adm.addEventListener('change',async e=>{const t=e.target;
if(t.dataset.ph){const k=t.dataset.ph,f=t.files[0];if(!f)return;PH[k]=await prep(f,k==='hero'?1600:900);savePh()&&(renderSite(),drawAdmin())}
else if(t.dataset.pfsel!==undefined){pfCat=t.value;renderSite();drawAdmin()}
else if(t.dataset.rtsel!==undefined){rtCat=t.value;renderSite();drawAdmin()}
else if(t.dataset.import!==undefined){try{const j=JSON.parse(await t.files[0].text());S=Object.assign(structuredClone(DEF),j.S);PH=j.PH||{};save();savePh();renderSite();drawAdmin()}catch{alert('Invalid backup file.')}}});
adm.addEventListener('click',e=>{const t=e.target.closest('button');if(!t)return;const d=t.dataset;
if(d.close!==undefined)closeAdmin();
else if(d.out!==undefined){sessionStorage.removeItem('umc_auth');drawAdmin()}
else if(d.t){tab=d.t;drawAdmin()}
else if(d.del!==undefined&&cur){const i=+d.del;if(!confirm('Delete this item?'))return;(tab==='Portfolio'?S.PF[pfCat][1]:cur.arr).splice(i,1);if(cur.pp){const p=cur.pp+':',m={};Object.keys(PH).forEach(k=>{if(k.startsWith(p)){const n=+k.slice(p.length);if(n<i)m[k]=PH[k];else if(n>i)m[p+(n-1)]=PH[k]}else m[k]=PH[k]});PH=m;savePh()}bump();drawAdmin()}
else if(d.add!==undefined&&cur){(tab==='Portfolio'?S.PF[pfCat][1]:cur.arr).push(tab==='Portfolio'?cur.blank[0]:structuredClone(cur.blank));bump();drawAdmin()}
else if(d.phx){delete PH[d.phx];savePh();renderSite();drawAdmin()}
else if(d.setpw!==undefined){const v=$('#npw').value;if(v.length<8)return alert('Use at least 8 characters.');ls.set('umc_pw',h53(v));$('#npw').value='';alert('Password changed.')}
else if(d.export!==undefined){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify({S,PH})],{type:'application/json'}));a.download='umc-backup.json';a.click()}
else if(d.reset!==undefined){if(confirm('Reset all content and photos to defaults?')){localStorage.removeItem('umc_state');localStorage.removeItem('umc_photos');S=structuredClone(DEF);PH={};renderSite();drawAdmin()}}
else if(d.clearleads!==undefined){ls.set('umc_leads',[]);drawAdmin()}});
const prep=(f,max)=>new Promise(r=>{const i=new Image,u=URL.createObjectURL(f);i.onload=()=>{const s=Math.min(1,max/Math.max(i.width,i.height)),c=document.createElement('canvas');c.width=i.width*s;c.height=i.height*s;c.getContext('2d').drawImage(i,0,0,c.width,c.height);URL.revokeObjectURL(u);r(c.toDataURL('image/jpeg',.82))};i.src=u});

renderSite();
