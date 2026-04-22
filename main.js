// =============================================
// DETECÇÃO DE DISPOSITIVO
// Adiciona classe 'is-mobile' ou 'is-desktop' no body
// =============================================
function detectDevice() {
  const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent)
    || window.innerWidth <= 820;

  document.body.classList.remove('is-mobile', 'is-desktop');
  document.body.classList.add(isMobile ? 'is-mobile' : 'is-desktop');
}

detectDevice();
window.addEventListener('resize', detectDevice);


// =============================================
// MENU HAMBURGUER (mobile)
// =============================================
const nav = document.querySelector('nav');

const hamburger = document.createElement('button');
hamburger.className = 'btn-hamburger';
hamburger.setAttribute('aria-label', 'Abrir menu');
hamburger.innerHTML = '<span></span><span></span><span></span>';
nav.appendChild(hamburger);

const mobileMenu = document.createElement('div');
mobileMenu.className = 'mobile-menu';
mobileMenu.innerHTML = `
  <ul>
    <li><a href="#sobre">Sobre</a></li>
    <li><a href="#skills">Skills</a></li>
    <li><a href="#projetos">Projetos</a></li>
    <li><a href="#contato">Contato</a></li>
  </ul>
`;
document.body.appendChild(mobileMenu);

hamburger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});


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