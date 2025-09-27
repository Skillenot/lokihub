/*
  LokiHub — Interacciones y Parallax mejorados (versión pulida)
  - Menú responsive, parallax, tilt, reveal
  - Navegación de cards por data-href
*/

// Links rápidos (apps)
document.getElementById('sudoku').onclick = () => {
  window.location.href = '/sudoku';
};

document.getElementById('nube').onclick = () => {
  window.location.href = '#';
};

document.getElementById('nubenav').onclick = () => {
  window.location.href = '#';
};

document.addEventListener('DOMContentLoaded', () => {
  const nav       = document.getElementById('mainNav');
  const lokiCat   = document.getElementById('lokiCat');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  // Compact nav on scroll
  const onScroll = () => {
    if (window.scrollY > 50) nav.classList.add('nav--compact');
    else nav.classList.remove('nav--compact');
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Hamburger menu
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', String(open));
      const hidden = getComputedStyle(navLinks).display === 'none';
      navLinks.style.display = hidden ? 'flex' : 'none';
    });
  }

  // Loki cat bubble
  if (lokiCat) {
    const speechBubble = document.querySelector('.bubble-text');
    const originalText = speechBubble ? speechBubble.textContent : '';

    lokiCat.addEventListener('mouseenter', () => {
      if (!speechBubble) return;
      speechBubble.textContent = '¡Miau! 🐱';
      speechBubble.style.transform = 'scale(1.05)';
    });

    lokiCat.addEventListener('mouseleave', () => {
      if (!speechBubble) return;
      speechBubble.textContent = originalText;
      speechBubble.style.transform = 'scale(1)';
    });

    lokiCat.addEventListener('click', () => {
      lokiCat.style.transform = 'scale(0.96)';
      setTimeout(() => (lokiCat.style.transform = 'scale(1)'), 150);
    });
  }

  // Botones de navegación externos
  const navButtons = {
    github:  () => window.open('https://github.com/lokihub', '_blank'),
    finance: () => alert('LokiFinance - Próximamente disponible'),
  };
  Object.keys(navButtons).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', navButtons[id]);
  });

  // App handlers "Pronto"
  const appHandlers = {
    lokifinance:   () => alert('💰 LokiFinance llegará pronto.'),
    lokichat:      () => alert('💬 LokiChat llegará pronto.'),
    proximamente:  () => alert('🚀 Nuevos proyectos en camino.'),
  };
  Object.keys(appHandlers).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', appHandlers[id]);
  });

  // Smooth scroll anclas
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      const target = href ? document.querySelector(href) : null;
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Reveal on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible'));
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Ripple en pills
  document.querySelectorAll('.app-pill').forEach(pill => {
    pill.addEventListener('click', function(e) {
      const rect   = this.getBoundingClientRect();
      const size   = Math.max(rect.width, rect.height);
      const x      = e.clientX - rect.left - size / 2;
      const y      = e.clientY - rect.top  - size / 2;
      const ripple = document.createElement('span');

      ripple.style.width  = size + 'px';
      ripple.style.height = size + 'px';
      ripple.style.left   = x + 'px';
      ripple.style.top    = y + 'px';
      ripple.className    = 'ripple';

      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.3);
      transform: scale(0);
      animation: ripple-animation .6s linear;
      pointer-events: none;
    }
    @keyframes ripple-animation {
      to { transform: scale(4); opacity: 0; }
    }
  `;
  document.head.appendChild(rippleStyle);

  // Parallax simple
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  const parallax = () => {
    const y = window.scrollY;
    parallaxEls.forEach(el => {
      const speed = parseFloat(el.getAttribute('data-speed')) || 0.1;
      el.style.transform = `translateY(${y * speed}px)`;
    });
  };
  window.addEventListener('scroll', parallax);
  parallax();

  // Tilt tarjeta showcase
  const tilt = document.querySelector('.tilt');
  if (tilt) {
    tilt.addEventListener('mousemove', (e) => {
      const rect = tilt.getBoundingClientRect();
      const rx = (e.clientY - rect.top  - rect.height / 2) / 30;
      const ry = (e.clientX - rect.left - rect.width  / 2) / -30;
      tilt.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    tilt.addEventListener('mouseleave', () => {
      tilt.style.transform = 'rotateX(0) rotateY(0)';
    });
  }

  // Canvas estrellitas
  const canvas = document.getElementById('stars');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w, h, stars;

    const init = () => {
      w = canvas.width  = window.innerWidth;
      h = canvas.height = window.innerHeight;
      stars = Array.from({ length: Math.round((w * h) / 18000) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + .2,
        a: Math.random() * 0.5 + 0.2
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#fff';
      stars.forEach(s => {
        ctx.globalAlpha = s.a;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(draw);
    };

    window.addEventListener('resize', init);
    init();
    draw();
  }

  // Navegación por cards (data-href)
  document.querySelectorAll('.card[data-href]').forEach(card => {
    card.addEventListener('click', () => {
      const href = card.getAttribute('data-href');
      if (href) window.location.href = href;
    });
  });
});
