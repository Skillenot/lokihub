/*
  LokiHub 
*/
  document.getElementById('sudoku').onclick = function() {
    window.location.href = '/sudoku/index.html';
  };

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('mainNav');
  const lokiCat = document.getElementById('lokiCat');

  // Handle scroll to show liquid glass navbar
  const onScroll = () => {
    if (window.scrollY > 50) {
      nav.classList.add('nav--compact');
    } else {
      nav.classList.remove('nav--compact');
    }
  };

  window.addEventListener('scroll', onScroll);

  // Loki cat interactions
  if (lokiCat) {
    let originalBubbleText = '';
    const speechBubble = document.querySelector('.bubble-text');

    if (speechBubble) {
      originalBubbleText = speechBubble.textContent;
    }

    lokiCat.addEventListener('mouseenter', () => {
      if (speechBubble) {
        speechBubble.textContent = '¡Miau! 🐱';
        speechBubble.style.transform = 'scale(1.05)';
      }
    });

    lokiCat.addEventListener('mouseleave', () => {
      if (speechBubble) {
        speechBubble.textContent = originalBubbleText;
        speechBubble.style.transform = 'scale(1)';
      }
    });

    // Click effect for Loki cat
    lokiCat.addEventListener('click', () => {
      lokiCat.style.transform = 'scale(0.95)';
      setTimeout(() => {
        lokiCat.style.transform = 'scale(1)';
      }, 150);
    });
  }

  // Navigation button handlers
  const navButtons = {
    contacto: () => {
      console.log('Contacto clicked');
      // You can replace this with actual contact functionality
      alert('📧 Contacto: lokihub@gmail.com');
    },
    github: () => {
      console.log('Github clicked');
      window.open('https://github.com/lokihub', '_blank');
    },
    finance: () => {
      console.log('Finance clicked');
      alert('💰 LokiFinance - Próximamente disponible');
    },
    nube: () => {
      console.log('Nube clicked');
      alert('☁️ LokiNube - Tu almacenamiento en la nube');
    }
  };

  // Attach nav button handlers
  Object.keys(navButtons).forEach(buttonId => {
    const button = document.getElementById(buttonId);
    if (button) {
      button.addEventListener('click', navButtons[buttonId]);
    }
  });

  // Application pill handlers


  // Attach app pill handlers
  Object.keys(appHandlers).forEach(appId => {
    const app = document.getElementById(appId);
    if (app) {
      app.addEventListener('click', appHandlers[appId]);
    }
  });

  // Hero button handlers
  const heroLogin = document.getElementById('heroLogin');
  const deviceButton = document.getElementById('deviceButton');

  if (heroLogin) {
    heroLogin.addEventListener('click', () => {
      console.log('Comenzar ahora clicked');
      alert('🚀 ¡Bienvenido a LokiHub! Próximamente disponible.');
    });
  }

  if (deviceButton) {
    deviceButton.addEventListener('click', () => {
      console.log('Explorar proyectos clicked');
      // Hacer scroll a la sección de app-pills
      const appPillsSection = document.querySelector('.app-pills');
      if (appPillsSection) {
        appPillsSection.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      } else {
        alert('🔍 Explora nuestros increíbles proyectos y aplicaciones.');
      }
    });
  }

  // smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // entrance animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements for scroll animations
  document.querySelectorAll('.app-pill, .created-by').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // particle effect hero button
  document.querySelectorAll('.primary-button, .secondary-button').forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px) scale(1.02)';
    });

    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // App pills ripple
  document.querySelectorAll('.app-pill').forEach(pill => {
    pill.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  console.log('🐱 LokiHub loaded successfully!');
});

// ripple CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }

  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);