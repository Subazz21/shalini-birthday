/* ==============================================================
   HAPPY BIRTHDAY SHALINI — interactions
   Edit the CONFIG block to personalize dates, letter text, etc.
============================================================== */
const CONFIG = {
  // Birthday is Aug 5. Update the year logic never needs touching —
  // it always counts to the next upcoming Aug 5.
  birthdayMonth: 8, // August
  birthdayDay: 5,
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
};

document.addEventListener('DOMContentLoaded', () => {
  initLoadingScreen();
  initWelcomePopup();
  initAmbientHearts();
  initCursorSparkle();
  initPetals();
  initDotNav();
  initScrollReveal();
  initCountdown();
  initMusicPlayer();
  initReasonCards();
  initTypewriter();
  initGiftBox();
  initCake();
  initNightSky();
  initFinalYear();
  initReplayButton();
});

/* ---------------- Loading screen ---------------- */
function initLoadingScreen(){
  const loader = document.getElementById('loading-screen');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.getElementById('welcome-popup').classList.add('show');
    }, 1600);
  });
  // fallback in case 'load' already fired
  setTimeout(() => {
    if (!loader.classList.contains('hidden')) {
      loader.classList.add('hidden');
      document.getElementById('welcome-popup').classList.add('show');
    }
  }, 3500);
}

/* ---------------- Welcome popup ---------------- */
function initWelcomePopup(){
  const popup = document.getElementById('welcome-popup');
  const btn = document.getElementById('enter-btn');
  btn.addEventListener('click', () => {
    popup.classList.add('hidden');
    popup.classList.remove('show');
    document.body.style.overflow = '';
    const audio = document.getElementById('bg-music');
    audio.play().then(() => {
      document.getElementById('music-player').classList.add('playing');
    }).catch(() => { /* autoplay blocked or no file present — that's fine */ });
    burst(150, 60);
  });
  document.body.style.overflow = 'hidden';
  setTimeout(() => { document.body.style.overflow = ''; }, 100);
}

/* ---------------- Ambient floating hearts ---------------- */
function initAmbientHearts(){
  if (CONFIG.reducedMotion) return;
  const layer = document.getElementById('hearts-layer');
  const symbols = ['❤','💕','💗'];
  setInterval(() => {
    const el = document.createElement('span');
    el.className = 'floating-heart';
    el.textContent = symbols[Math.floor(Math.random()*symbols.length)];
    const size = 12 + Math.random()*18;
    el.style.left = Math.random()*100 + 'vw';
    el.style.fontSize = size + 'px';
    el.style.setProperty('--drift', (Math.random()*160-80) + 'px');
    el.style.setProperty('--rot', (Math.random()*40-20) + 'deg');
    el.style.animationDuration = (8 + Math.random()*6) + 's';
    layer.appendChild(el);
    setTimeout(() => el.remove(), 15000);
  }, 1200);
}

/* ---------------- Cursor sparkle trail ---------------- */
function initCursorSparkle(){
  if (CONFIG.reducedMotion || matchMedia('(pointer:coarse)').matches) return;
  const layer = document.getElementById('sparkle-layer');
  let last = 0;
  window.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - last < 60) return;
    last = now;
    const s = document.createElement('span');
    s.className = 'sparkle';
    s.style.left = e.clientX + 'px';
    s.style.top = e.clientY + 'px';
    layer.appendChild(s);
    setTimeout(() => s.remove(), 700);
  });
}

/* ---------------- Falling petals (hero) ---------------- */
function initPetals(){
  if (CONFIG.reducedMotion) return;
  const container = document.querySelector('.petals-container');
  if (!container) return;
  setInterval(() => {
    const p = document.createElement('span');
    p.className = 'petal';
    p.textContent = Math.random() > 0.5 ? '🌸' : '✿';
    p.style.left = Math.random()*100 + '%';
    p.style.setProperty('--drift', (Math.random()*120-60) + 'px');
    p.style.animationDuration = (6 + Math.random()*5) + 's';
    p.style.fontSize = (12 + Math.random()*10) + 'px';
    container.appendChild(p);
    setTimeout(() => p.remove(), 12000);
  }, 900);
}

/* ---------------- Dot navigation + scrollspy ---------------- */
function initDotNav(){
  const dots = document.querySelectorAll('.dot');
  const sections = document.querySelectorAll('.page');
  const map = new Map();
  dots.forEach(d => map.set(d.getAttribute('href').slice(1), d));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
        dots.forEach(d => d.classList.remove('active'));
        const dot = map.get(entry.target.id);
        if (dot) dot.classList.add('active');
      }
    });
  }, { threshold: [0.5] });

  sections.forEach(s => io.observe(s));
}

/* ---------------- Generic scroll reveal ---------------- */
function initScrollReveal(){
  const items = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in'), i * 40 % 300);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(el => io.observe(el));
}

/* ---------------- Countdown to next Sept 2 ---------------- */
function initCountdown(){
  const dEl = document.getElementById('cd-days');
  const hEl = document.getElementById('cd-hours');
  const mEl = document.getElementById('cd-mins');
  const sEl = document.getElementById('cd-secs');
  if (!dEl) return;

  function nextBirthday(){
    const now = new Date();
    let year = now.getFullYear();
    let target = new Date(year, CONFIG.birthdayMonth - 1, CONFIG.birthdayDay, 0, 0, 0);
    if (target < now) target = new Date(year + 1, CONFIG.birthdayMonth - 1, CONFIG.birthdayDay, 0, 0, 0);
    return target;
  }

  function tick(){
    const diff = nextBirthday() - new Date();
    if (diff <= 0) return;
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    dEl.textContent = String(days).padStart(2,'0');
    hEl.textContent = String(hours).padStart(2,'0');
    mEl.textContent = String(mins).padStart(2,'0');
    sEl.textContent = String(secs).padStart(2,'0');
  }
  tick();
  setInterval(tick, 1000);
}

/* ---------------- Music player toggle ---------------- */
function initMusicPlayer(){
  const btn = document.getElementById('music-toggle');
  const audio = document.getElementById('bg-music');
  const player = document.getElementById('music-player');
  btn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().then(() => player.classList.add('playing')).catch(() => {
        alert('Add your song file to assets/music/song.mp3 to enable playback.');
      });
    } else {
      audio.pause();
      player.classList.remove('playing');
    }
  });
}

/* ---------------- Reason card flip ---------------- */
function initReasonCards(){
  document.querySelectorAll('.reason-card').forEach(card => {
    const toggle = () => card.classList.toggle('flipped');
    card.addEventListener('click', toggle);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });
}

/* ---------------- Typewriter for love letter ---------------- */
function initTypewriter(){
  const el = document.getElementById('letter-text');
  const cursor = document.getElementById('typewriter-cursor');
  if (!el) return;
  const fullText = el.textContent;
  el.textContent = '';

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        io.unobserve(entry.target);
        if (CONFIG.reducedMotion) { el.textContent = fullText; return; }
        let i = 0;
        const speed = 14;
        function type(){
          if (i <= fullText.length) {
            el.textContent = fullText.slice(0, i);
            i++;
            setTimeout(type, speed);
          } else {
            cursor.style.display = 'none';
          }
        }
        type();
      }
    });
  }, { threshold: 0.3 });
  io.observe(el);
}

/* ---------------- Gift box open ---------------- */
function initGiftBox(){
  const box = document.getElementById('gift-box');
  const msg = document.getElementById('gift-message');
  if (!box) return;
  box.addEventListener('click', () => {
    const opened = box.classList.toggle('open');
    if (opened) {
      msg.classList.add('show');
      burst(120, 55, box.getBoundingClientRect());
    } else {
      msg.classList.remove('show');
    }
  });
}

/* ---------------- Cake candles ---------------- */
function initCake(){
  const candles = document.querySelectorAll('.candle');
  const wishText = document.getElementById('wish-text');
  if (!candles.length) return;
  candles.forEach(c => {
    c.addEventListener('click', () => {
      if (c.dataset.lit === 'false') return;
      c.dataset.lit = 'false';
      const allOut = Array.from(candles).every(x => x.dataset.lit === 'false');
      if (allOut) {
        wishText.textContent = 'Your wish is on its way. 🤍';
        const rect = document.querySelector('.cake').getBoundingClientRect();
        burst(160, 70, rect);
      }
    });
  });
}

/* ---------------- Night sky: stars + constellation heart + wishes ---------------- */
function initNightSky(){
  const canvas = document.getElementById('stars-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const section = document.getElementById('nightsky');
  let stars = [];
  let shootingStars = [];
  let w, h;

  function resize(){
    w = canvas.width = section.clientWidth;
    h = canvas.height = section.clientHeight;
    stars = [];
    const count = Math.floor((w*h)/9000);
    for (let i=0;i<count;i++){
      stars.push({
        x: Math.random()*w, y: Math.random()*h,
        r: Math.random()*1.6+0.4,
        tw: Math.random()*Math.PI*2,
        speed: 0.02 + Math.random()*0.03
      });
    }
  }

  // heart constellation points (normalized 0-1, will scale to canvas)
  function heartPoints(){
    const pts = [];
    for (let t=0; t<Math.PI*2; t+=0.4){
      const x = 16*Math.pow(Math.sin(t),3);
      const y = 13*Math.cos(t) - 5*Math.cos(2*t) - 2*Math.cos(3*t) - Math.cos(4*t);
      pts.push({x, y});
    }
    return pts;
  }
  const heart = heartPoints();

  function draw(){
    ctx.clearRect(0,0,w,h);
    // twinkling stars
    stars.forEach(s => {
      s.tw += s.speed;
      const alpha = 0.4 + Math.sin(s.tw)*0.4;
      ctx.beginPath();
      ctx.fillStyle = `rgba(251,243,236,${Math.max(0,alpha)})`;
      ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
      ctx.fill();
    });

    // constellation heart, centered, scaled
    const cx = w/2, cy = h*0.42, scale = Math.min(w,h)/34;
    ctx.strokeStyle = 'rgba(242,166,179,0.5)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    heart.forEach((p, i) => {
      const x = cx + p.x*scale, y = cy - p.y*scale;
      if (i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
    });
    ctx.closePath();
    ctx.stroke();
    heart.forEach(p => {
      const x = cx + p.x*scale, y = cy - p.y*scale;
      ctx.beginPath();
      ctx.fillStyle = 'rgba(216,164,127,0.9)';
      ctx.shadowColor = 'rgba(216,164,127,0.8)';
      ctx.shadowBlur = 6;
      ctx.arc(x,y,2.2,0,Math.PI*2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // shooting stars (wishes)
    shootingStars = shootingStars.filter(s => s.life > 0);
    shootingStars.forEach(s => {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(255,255,255,${s.life})`;
      ctx.lineWidth = 2;
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x - s.vx*6, s.y - s.vy*6);
      ctx.stroke();
      s.x += s.vx; s.y += s.vy; s.life -= 0.02;
    });

    requestAnimationFrame(draw);
  }

  section.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    shootingStars.push({
      x: e.clientX - rect.left, y: e.clientY - rect.top,
      vx: -4 - Math.random()*2, vy: -2 - Math.random()*2, life: 1
    });
  });

  window.addEventListener('resize', resize);
  resize();
  draw();
}

/* ---------------- Final year in signature ---------------- */
function initFinalYear(){
  const sig = document.querySelector('.final-signature');
  if (sig) sig.textContent = sig.textContent.replace('{{year}}', new Date().getFullYear());
}

/* ---------------- Replay button ---------------- */
function initReplayButton(){
  const btn = document.getElementById('replay-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    burst(200, 70);
  });
}

/* ---------------- Confetti helper ---------------- */
function burst(count, spread, rect){
  if (typeof confetti !== 'function') return;
  const origin = rect
    ? { x: (rect.left + rect.width/2) / window.innerWidth, y: (rect.top) / window.innerHeight }
    : { x: 0.5, y: 0.6 };
  confetti({
    particleCount: count,
    spread: spread,
    origin,
    colors: ['#D8A47F', '#F2A6B3', '#F7C9D2', '#FBF3EC']
  });
}
