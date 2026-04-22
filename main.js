// =============================================
// SCROLL REVEAL
// =============================================
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));


// =============================================
// NAV ATIVA conforme a seção visível
// =============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});


// =============================================
// SMOOTH SCROLL nos links da nav
// =============================================
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


// =============================================
// DISTORÇÃO DO GRID NO HERO
// =============================================
const heroGridLines = document.querySelector('.hero-grid-lines');

document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5);
  const y = (e.clientY / window.innerHeight - 0.5);

  const skewX = x * 8;
  const skewY = y * 8;
  const scaleX = 1 + Math.abs(x) * 0.08;
  const scaleY = 1 + Math.abs(y) * 0.08;

  heroGridLines.style.transform = `
    skew(${skewX}deg, ${skewY}deg)
    scale(${scaleX}, ${scaleY})
  `;
  heroGridLines.style.transition = 'transform 0.3s ease';
});


// =============================================
// DARK MODE
// =============================================
const btnDarkmode = document.getElementById('btnDarkmode');

btnDarkmode.addEventListener('click', () => {
  document.body.classList.toggle('dark');

  // dark ativo → mostra lua cheia (🌕); modo claro → mostra lua nova (🌑)
  if (document.body.classList.contains('dark')) {
    btnDarkmode.textContent = '🌕';
  } else {
    btnDarkmode.textContent = '🌑';
  }
});