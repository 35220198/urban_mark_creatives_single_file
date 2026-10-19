
/* Loader never depends on YouTube, so the HTML opens even if the YouTube API is unavailable. */
const loader=document.getElementById("loader"),fill=document.getElementById("loaderFill"),pct=document.getElementById("loaderPercent"),stat=document.getElementById("loaderStatus");
const messages=["Initialising creative engine...","Loading visual system...","Preparing services...","Optimising responsive experience...","Finalising Urban Mark..."];
let load=0;
const loading=setInterval(()=>{
 load=Math.min(100,load+Math.floor(Math.random()*5)+2);
 fill.style.width=load+"%";pct.textContent=load+"%";stat.textContent=messages[Math.min(4,Math.floor(load/21))];
 if(load===100){clearInterval(loading);setTimeout(()=>{loader.classList.add("hide");},500)}
},100);

/* Background soundtrack: start silently where autoplay is permitted, then enable audio on the visitor's first interaction. */
let musicYT=null;
function onYouTubeIframeAPIReady(){
  musicYT=new YT.Player("ytMusic",{
    videoId:"A8ri9nw6LA4",
    playerVars:{autoplay:1,controls:0,playsinline:1,rel:0,modestbranding:1,loop:1,playlist:"A8ri9nw6LA4"},
    events:{onReady:function(e){
      try{e.target.setVolume(38);e.target.mute();e.target.playVideo();}catch(err){}
    }}
  });
}
let musicEnabled=false;
function enableBackgroundSound(){
  if(musicEnabled)return;
  musicEnabled=true;
  try{musicYT?.unMute();musicYT?.setVolume(38);musicYT?.playVideo();}catch(e){}
  removeEventListener("pointerdown",enableBackgroundSound);
  removeEventListener("keydown",enableBackgroundSound);
  removeEventListener("touchstart",enableBackgroundSound);
}
addEventListener("pointerdown",enableBackgroundSound,{passive:true,once:true});
addEventListener("keydown",enableBackgroundSound,{passive:true,once:true});
addEventListener("touchstart",enableBackgroundSound,{passive:true,once:true});

/* Mobile navigation */
const menu=document.getElementById("menu"),nav=document.getElementById("nav");
menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",open)});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

/* Reveal effects */
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(e=>observer.observe(e));

/* Scroll progress + active section */
const progress=document.getElementById("progress"),sections=[...document.querySelectorAll("main section[id]")],links=[...document.querySelectorAll("nav a[href^='#']")];
addEventListener("scroll",()=>{
 const d=document.documentElement;progress.style.width=(scrollY/(d.scrollHeight-innerHeight)*100)+"%";
 let active="home";sections.forEach(s=>{if(scrollY>=s.offsetTop-150)active=s.id});
 links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+active));
},{passive:true});

/* Service controls: manual nudging without breaking the continuous CSS rail */
const track=document.getElementById("serviceTrack");
function nudge(px){track.style.animation="none";track.style.transform="translateX("+px+"px)";setTimeout(()=>{track.style.transform="";track.style.animation="servicesMove 42s linear infinite"},1200)}
document.getElementById("serviceLeft").onclick=()=>nudge(-300);
document.getElementById("serviceRight").onclick=()=>nudge(300);

/* Cursor glow */
const glow=document.getElementById("cursorGlow");
addEventListener("pointermove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"},{passive:true});

/* WhatsApp enquiry */
document.getElementById("enquiry").addEventListener("submit",e=>{
 e.preventDefault();
 const n=document.getElementById("name").value,em=document.getElementById("email").value,s=document.getElementById("service").value||"General enquiry",m=document.getElementById("message").value;
 const text=`Hello Urban Mark Creatives,%0A%0AName: ${encodeURIComponent(n)}%0AEmail: ${encodeURIComponent(em)}%0AService: ${encodeURIComponent(s)}%0A%0AProject details:%0A${encodeURIComponent(m)}`;
 document.getElementById("status").textContent="Opening WhatsApp...";
 window.open("https://wa.me/254746128860?text="+text,"_blank");
});
document.getElementById("year").textContent=new Date().getFullYear();
