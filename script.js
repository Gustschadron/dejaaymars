const LINKS = {
  instagram:  "https://instagram.com/mars.deejay",
  tiktok:     "https://tiktok.com/@mars.dj",
  soundcloud: "https://soundcloud.com/lars-cornet-880652158",
  booking:    "https://superform.be/artist/mars/",
  release:    "https://soundcloud.com/lars-cornet-880652158"
};

document.getElementById('nav-book').href = LINKS.booking;
document.getElementById('nav-cta-btn').href = LINKS.release;
document.getElementById('hero-listen').href = LINKS.release;
document.getElementById('release-listen').href = LINKS.release;

const ICONS = {
  instagram: '<svg class="plat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1"/></svg>',
  tiktok: '<svg class="plat-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 5.2c-.7-.7-1.1-1.7-1.1-2.7h-3v13.4c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5c.3 0 .5 0 .8.1v-3c-.3 0-.5-.1-.8-.1-3 0-5.5 2.5-5.5 5.5s2.5 5.5 5.5 5.5 5.5-2.5 5.5-5.5V9.2c1.1.8 2.5 1.3 4 1.3v-3c-1 0-2-.4-2.9-1.3z"/></svg>',
  soundcloud: '<svg class="plat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 15v3M5 13v5M8 11v7M11 9v9M14 8a4 4 0 0 1 4 4v4H11"/><path d="M18 12a3 3 0 0 1 3 3v1h-3"/></svg>',
  booking: '<svg class="plat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/></svg>',
  release: '<svg class="plat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none"/></svg>'
};

const ROWS = [
    { key:'release',    name:'Pluto EP',   tag:'Stream nu' },
    { key:'booking',    name:'Booking',    tag:'Boek Mars' },
    { key:'instagram',  name:'Instagram',  tag:'Follow' },
    { key:'tiktok',     name:'TikTok',     tag:'Follow' },
    { key:'soundcloud', name:'SoundCloud', tag:'Listen' },
];

const listEl = document.getElementById('link-list');
ROWS.forEach((row, i) => {
  const a = document.createElement('a');
  a.className = 'track-row';
  a.href = LINKS[row.key];
  a.target = row.key === 'booking' ? '_self' : '_blank';
  a.rel = 'noopener';
  a.innerHTML = `
    <span class="track-num">${String(i+1).padStart(2,'0')}</span>
    <span class="track-name">${ICONS[row.key]}${row.name}</span>
    <span class="track-tag"><span class="txt">${row.tag}</span><span class="arrow">→</span></span>
  `;
  listEl.appendChild(a);
});

const footLinks = document.getElementById('foot-links');
['instagram','tiktok','soundcloud'].forEach(k=>{
  const a=document.createElement('a');
  a.href=LINKS[k]; a.target='_blank'; a.rel='noopener';
  a.textContent = k;
  footLinks.appendChild(a);
});

document.getElementById('year').textContent = new Date().getFullYear();

const bc = document.getElementById('barcode');
for(let i=0;i<28;i++){
  const bar = document.createElement('i');
  const h = 14 + Math.random()*20;
  bar.style.height = h+'px';
  bar.style.opacity = Math.random() > 0.3 ? 1 : 0.35;
  bc.appendChild(bar);
}

// scroll reveal
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
},{threshold:0.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// particle canvas
const canvas = document.getElementById('frost');
const ctx = canvas.getContext('2d');
let W, H, particles;
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function resize(){
  W = canvas.width = window.innerWidth;
  H = canvas.height = document.documentElement.scrollHeight;
}
function initParticles(){
  const count = Math.min(90, Math.floor(W/16));
  particles = Array.from({length:count}, ()=>({
    x: Math.random()*W,
    y: Math.random()*H,
    r: Math.random()*1.8 + 0.4,
    speed: Math.random()*0.35 + 0.08,
    drift: (Math.random()-0.5)*0.3,
    alpha: Math.random()*0.5 + 0.15
  }));
}
resize(); initParticles();
window.addEventListener('resize', ()=>{ resize(); initParticles(); });

function tick(){
  ctx.clearRect(0,0,W,H);
  ctx.fillStyle = '#eaf6fb';
  particles.forEach(p=>{
    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fill();
    if(!prefersReduced){
      p.y -= p.speed;
      p.x += p.drift;
      if(p.y < -10){ p.y = H+10; p.x = Math.random()*W; }
    }
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(tick);
}
tick();