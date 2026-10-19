/* Lightweight, deterministic intro. The page remains usable if scripts are delayed. */
const loader=document.getElementById("loader");
const fill=document.getElementById("loaderFill");
const pct=document.getElementById("loaderPercent");
const stat=document.getElementById("loaderStatus");
if (fill) fill.style.width="100%";
if (pct) pct.textContent="Ready";
if (stat) stat.textContent="Welcome to Urban Mark Creatives";
const hideLoader=()=>loader?.classList.add("hide");
window.addEventListener("load",()=>setTimeout(hideLoader,250),{once:true});
setTimeout(hideLoader,1800);

/* Mobile navigation */
const menu=document.getElementById("menu"),nav=document.getElementById("nav");
if(menu && nav){
 menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open))});
 nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menu.setAttribute("aria-expanded","false")}));
}

/* Reveal effects */
if("IntersectionObserver" in window){
 const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");observer.unobserve(e.target)}}),{threshold:.12});
 document.querySelectorAll(".reveal").forEach(e=>observer.observe(e));
}else{document.querySelectorAll(".reveal").forEach(e=>e.classList.add("show"))}

/* Scroll progress + active section */
const progress=document.getElementById("progress"),sections=[...document.querySelectorAll("main section[id]")],links=[...document.querySelectorAll("nav a[href^='#']")];
const updateScrollUI=()=>{
 const d=document.documentElement,maxScroll=d.scrollHeight-innerHeight;
 if(progress)progress.style.width=(maxScroll>0?Math.min(100,Math.max(0,scrollY/maxScroll*100)):0)+"%";
 let active="home";sections.forEach(s=>{if(scrollY>=s.offsetTop-150)active=s.id});
 links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+active));
};
addEventListener("scroll",updateScrollUI,{passive:true});
addEventListener("resize",updateScrollUI,{passive:true});
updateScrollUI();

/* Service controls: manual nudging without breaking the continuous CSS rail */
const track=document.getElementById("serviceTrack");
function nudge(px){if(!track)return;track.style.animation="none";track.style.transform="translateX("+px+"px)";setTimeout(()=>{track.style.transform="";track.style.animation="servicesMove 42s linear infinite"},1200)}
const serviceLeft=document.getElementById("serviceLeft"),serviceRight=document.getElementById("serviceRight");
if(serviceLeft)serviceLeft.addEventListener("click",()=>nudge(-300));
if(serviceRight)serviceRight.addEventListener("click",()=>nudge(300));

/* Portfolio filters: client-side only, no external dependency. */
const portfolioButtons=[...document.querySelectorAll(".portfolio-filter")];
const portfolioItems=[...document.querySelectorAll(".portfolio-grid .work")];
const portfolioCount=document.getElementById("portfolioCount");
portfolioButtons.forEach(button=>button.addEventListener("click",()=>{
 const filter=button.dataset.filter||"all";
 let visible=0;
 portfolioItems.forEach(item=>{
  const show=filter==="all"||item.dataset.category===filter;
  item.hidden=!show;
  if(show)visible++;
 });
 portfolioButtons.forEach(b=>b.setAttribute("aria-pressed",String(b===button)));
 if(portfolioCount)portfolioCount.textContent=`${visible} creative direction${visible===1?"":"s"}`;
}));

/* Cursor glow */
const glow=document.getElementById("cursorGlow");
if(glow && matchMedia("(pointer:fine)").matches){
 addEventListener("pointermove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"},{passive:true});
}

/* WhatsApp enquiry: visitors review and send the message themselves. */
document.getElementById("enquiry").addEventListener("submit",e=>{
 e.preventDefault();
 const n=document.getElementById("name").value.trim();
 const em=document.getElementById("email").value.trim();
 const s=document.getElementById("service").value||"General enquiry";
 const m=document.getElementById("message").value.trim();
 const message=`Hello Urban Mark Creatives,\\n\\nName: ${n}\\nEmail: ${em}\\nService: ${s}\\n\\nProject details:\\n${m}`;
 document.getElementById("status").textContent="Opening WhatsApp. Please review and send your message there.";
 window.open("https://wa.me/254746128860?text="+encodeURIComponent(message),"_blank","noopener,noreferrer");
});
const yearNode=document.getElementById("year");if(yearNode)yearNode.textContent=new Date().getFullYear();
