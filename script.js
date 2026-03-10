/* ═══════════════════════════════════════════════════════════════
   MEHDI EL MOUSSAOUI — PORTFOLIO
   script.js
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
        // Trigger hero counter animation after load
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

  // Smooth trailing cursor
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

  // Hover effect on interactive elements
  const hoverTargets = document.querySelectorAll(
    'a, button, .project-card, .stack-item, .service-card, .soft-skill, .lang-item'
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

  // Scroll sticky
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    updateActiveNav();
    toggleBackToTop();
  });

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile nav on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Active nav link highlight based on scroll
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    let currentId = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentId) {
        link.classList.add('active');
      }
    });
  }


  /* ─── 4. SCROLL REVEAL ──────────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Don't unobserve — keep visible once revealed
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObserver.observe(el));


  /* ─── 5. SKILL BAR ANIMATION ────────────────────────────────── */
  const skillItems = document.querySelectorAll('.skill-item');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.skill-bar-fill');
        if (fill && !fill.style.width) {
          setTimeout(() => {
            fill.style.width = fill.dataset.width;
          }, 200);
        }
      }
    });
  }, { threshold: 0.2 });

  skillItems.forEach(item => skillObserver.observe(item));


  /* ─── 6. HERO COUNTERS ──────────────────────────────────────── */
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-num[data-count]');
    counters.forEach(counter => {
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


  /* ─── 7. SMOOTH SECTION LINKS ───────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top    = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* ─── 8. BACK TO TOP ────────────────────────────────────────── */
  const backBtn = document.getElementById('back-to-top');

  function toggleBackToTop() {
    backBtn.classList.toggle('visible', window.scrollY > 500);
  }

  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ─── 9. TILT EFFECT ON PROJECT CARDS ──────────────────────── */
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const midX   = rect.width  / 2;
      const midY   = rect.height / 2;
      const rotateX = ((y - midY) / midY) * -5;
      const rotateY = ((x - midX) / midX) * 5;
      card.style.transform = `translateY(-5px) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  /* ─── 10. STACK ITEM HOVER GLOW ─────────────────────────────── */
  const stackItems = document.querySelectorAll('.stack-item');

  stackItems.forEach(item => {
    item.addEventListener('mousemove', e => {
      const rect = item.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width)  * 100;
      const y = ((e.clientY - rect.top)  / rect.height) * 100;
      item.style.setProperty('--glow-x', x + '%');
      item.style.setProperty('--glow-y', y + '%');
    });
  });


  /* ─── 11. MARQUEE PAUSE ON HOVER ────────────────────────────── */
  // Handled via CSS (section:hover .marquee-track)


  /* ─── 12. TYPING EFFECT IN HERO (optional enhancement) ──────── */
  const heroTag = document.querySelector('.hero-tag');
  if (heroTag) {
    const text     = 'Available for Internship 2026';
    const dotHTML  = '<span class="hero-tag-dot"></span>';
    heroTag.innerHTML = dotHTML; // reset
    let i = 0;
    const type = () => {
      if (i < text.length) {
        heroTag.innerHTML = dotHTML + text.substring(0, i + 1);
        i++;
        setTimeout(type, 55);
      }
    };
    // Start typing after loader
    setTimeout(type, 1000);
  }


  /* ─── 13. SERVICE CARD ENTRANCE STAGGER ─────────────────────── */
  const serviceCards = document.querySelectorAll('.service-card');
  const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity  = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        serviceObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  serviceCards.forEach(card => {
    card.style.opacity   = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    serviceObserver.observe(card);
  });


  /* ─── 14. ACTIVE SECTION PROGRESS INDICATOR ─────────────────── */
  // Thin progress bar at top of page
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 2px; z-index: 9999;
    background: linear-gradient(90deg, #c8f04a, #4af0c8);
    width: 0%; transition: width 0.1s linear; pointer-events: none;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop    = window.pageYOffset;
    const docHeight    = document.body.scrollHeight - window.innerHeight;
    const scrollPct    = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPct + '%';
  });


  /* ─── 15. CONSOLE EASTER EGG ────────────────────────────────── */
  console.log('%c MEHDI EL MOUSSAOUI ', 'background:#c8f04a;color:#0a0a0a;font-family:monospace;font-size:16px;font-weight:bold;padding:8px 16px;');
  console.log('%c Mobile & Web Developer | Tangier, Morocco ', 'color:#4af0c8;font-family:monospace;font-size:12px;');
  console.log('%c mehdielmoussaoui25@gmail.com | +212 771 189 375 ', 'color:#666;font-family:monospace;font-size:11px;');

});