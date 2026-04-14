/* ═══════════════════════════════════════════════════════════════
   MEHDI EL MOUSSAOUI — PORTFOLIO
   script.js  (Updated 2026)
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── 1. LOADING SCREEN ─────────────────────────────────────── */
  const loader     = document.getElementById('loader');
  const loaderFill = document.getElementById('loader-fill');
  const loaderPct  = document.getElementById('loader-pct');

  let progress = 0;
  const loadInterval = setInterval(() => {
    progress += Math.random() * 12 + 2;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadInterval);
      loaderFill.style.width = '100%';
      loaderPct.textContent  = '100%';
      setTimeout(() => {
        loader.classList.add('hidden');
        animateCounters();
      }, 400);
    } else {
      loaderFill.style.width = progress + '%';
      loaderPct.textContent  = Math.floor(progress) + '%';
    }
  }, 60);


  /* ─── 2. CUSTOM CURSOR ──────────────────────────────────────── */
  const cursor      = document.getElementById('cursor');
  const cursorTrail = document.getElementById('cursor-trail');

  let mouseX = 0, mouseY = 0;
  let trailX = 0, trailY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  function animateTrail() {
    trailX += (mouseX - trailX) * 0.1;
    trailY += (mouseY - trailY) * 0.1;
    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top  = trailY + 'px';
    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  document.addEventListener('mousedown', () => cursor.classList.add('click'));
  document.addEventListener('mouseup',   () => cursor.classList.remove('click'));

  const hoverTargets = document.querySelectorAll(
    'a, button, .project-card, .stack-item, .service-card, .soft-skill, .lang-item, .skill-card'
  );
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });


  /* ─── 3. NAVBAR ─────────────────────────────────────────────── */
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    updateActiveNav();
    toggleBackToTop();
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    let currentId = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) {
        currentId = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentId) link.classList.add('active');
    });
  }


  /* ─── 4. SCROLL REVEAL ──────────────────────────────────────── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


  /* ─── 5. HERO COUNTERS ──────────────────────────────────────── */
  function animateCounters() {
    document.querySelectorAll('.stat-num[data-count]').forEach(counter => {
      const target   = parseInt(counter.dataset.count, 10);
      const duration = 1600;
      const step     = duration / target;
      let current    = 0;
      const tick = () => {
        current++;
        counter.textContent = current;
        if (current < target) setTimeout(tick, step);
      };
      setTimeout(tick, 400);
    });
  }


  /* ─── 6. SMOOTH SCROLL ──────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* ─── 7. BACK TO TOP ────────────────────────────────────────── */
  const backBtn = document.getElementById('back-to-top');
  function toggleBackToTop() {
    backBtn.classList.toggle('visible', window.scrollY > 500);
  }
  backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


  /* ─── 8. TILT ON PROJECT CARDS ──────────────────────────────── */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const rotateX = ((e.clientY - rect.top  - rect.height/2) / (rect.height/2)) * -4;
      const rotateY = ((e.clientX - rect.left - rect.width/2)  / (rect.width/2))  *  4;
      card.style.transform = `translateY(-5px) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });


  /* ─── 9. STACK ITEM GLOW ────────────────────────────────────── */
  document.querySelectorAll('.stack-item').forEach(item => {
    item.addEventListener('mousemove', e => {
      const rect = item.getBoundingClientRect();
      item.style.setProperty('--glow-x', ((e.clientX - rect.left) / rect.width * 100) + '%');
      item.style.setProperty('--glow-y', ((e.clientY - rect.top)  / rect.height * 100) + '%');
    });
  });


  /* ─── 10. HERO TAG TYPING ───────────────────────────────────── */
  const heroTag = document.querySelector('.hero-tag');
  if (heroTag) {
    const text    = 'Available for Internship 2026';
    const dotHTML = '<span class="hero-tag-dot"></span>';
    heroTag.innerHTML = dotHTML;
    let i = 0;
    const type = () => {
      if (i < text.length) {
        heroTag.innerHTML = dotHTML + text.substring(0, i + 1);
        i++;
        setTimeout(type, 55);
      }
    };
    setTimeout(type, 1000);
  }


  /* ─── 11. SCROLL PROGRESS BAR ───────────────────────────────── */
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position:fixed;top:0;left:0;height:2px;z-index:9999;
    background:linear-gradient(90deg,#7c6bff,#f5a623);
    width:0%;transition:width .1s linear;pointer-events:none;
  `;
  document.body.appendChild(progressBar);
  window.addEventListener('scroll', () => {
    const pct = (window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = pct + '%';
  });


  /* ─── 12. CONSOLE EASTER EGG ────────────────────────────────── */
  console.log('%c MEHDI EL MOUSSAOUI ', 'background:#f5a623;color:#0d0c1a;font-family:monospace;font-size:16px;font-weight:bold;padding:8px 16px;');
  console.log('%c Mobile, Flutter & Web Developer | Tangier, Morocco ', 'color:#7c6bff;font-family:monospace;font-size:12px;');
  console.log('%c mehdielmoussaoui25@gmail.com | +212 771 189 375 ', 'color:#666;font-family:monospace;font-size:11px;');
  console.log('%c LinkedIn: linkedin.com/in/mehdi-el-moussaoui-471174372 ', 'color:#4ef0b8;font-family:monospace;font-size:11px;');

});