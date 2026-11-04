// =============================================
// MOTION DESIGN
// Camada de animações (vanilla JS, sem bibliotecas).
// Respeita prefers-reduced-motion e dispositivos touch.
// =============================================
(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var body = document.body;
  var root = document.documentElement;


  // ---------- INTRO (cortina) — roda uma vez por sessão ----------
  var intro = document.getElementById('intro');

  function endIntro() {
    body.classList.remove('intro-active');
    if (intro) intro.classList.add('done');
  }

  function runIntro() {
    if (!intro || reduce) { endIntro(); return; }

    var seen = false;
    try { seen = sessionStorage.getItem('vg_intro') === '1'; } catch (e) {}
    if (seen) { endIntro(); return; }
    try { sessionStorage.setItem('vg_intro', '1'); } catch (e) {}

    setTimeout(function () {
      intro.classList.add('open');
      body.classList.remove('intro-active'); // libera as animações do hero
    }, 1900);

    setTimeout(function () { intro.classList.add('done'); }, 2900);
  }

  runIntro();


  // ---------- PROGRESSO DE SCROLL + PARALLAX ----------
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.pageYOffset || root.scrollTop || 0;
      var max = root.scrollHeight - window.innerHeight;
      root.style.setProperty('--progress', max > 0 ? Math.min(1, y / max).toFixed(4) : 0);
      if (y < window.innerHeight * 1.5) root.style.setProperty('--sy', Math.round(y));
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();


  // ---------- ENTRADAS EM CASCATA ----------
  var grid = document.querySelector('.projetos-container');
  if (grid) {
    var cols = getComputedStyle(grid).gridTemplateColumns.split(' ').length || 1;
    grid.querySelectorAll('.anim-in').forEach(function (card, i) {
      card.style.setProperty('--i', i % cols);
    });
  }

  var targets = document.querySelectorAll('.anim-in, #sobre h2, #skills h2, #projetos h2, #contato h2');

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add('in'); });
  }


  // ---------- ROTATOR DE PALAVRAS NO HERO ----------
  var rot = document.getElementById('rotWord');

  if (rot && !reduce) {
    var words = [
      'interfaces com motion design',
      'agentes e fluxos de IA',
      'automações com n8n',
      'sites e landing pages',
      'jogos no Roblox'
    ];
    var k = 0;

    setInterval(function () {
      if (document.hidden) return;
      rot.classList.add('out');

      setTimeout(function () {
        k = (k + 1) % words.length;
        rot.textContent = words[k];
        rot.classList.remove('out');
        rot.classList.add('pre');
        void rot.offsetWidth;          // força o reflow para o "pre" valer
        rot.classList.remove('pre');
      }, 450);
    }, 2600);
  }


  // ---------- BRILHO QUE SEGUE O CURSOR NO HERO ----------
  var hero = document.getElementById('hero');

  if (hero && fine && !reduce) {
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      hero.style.setProperty('--my', (e.clientY - r.top) + 'px');
      hero.classList.add('glow-on');
    });

    hero.addEventListener('mouseleave', function () {
      hero.classList.remove('glow-on');
    });
  }


  // ---------- TILT 3D (card de perfil e cards de projeto) ----------
  function tilt(el, max) {
    el.addEventListener('pointermove', function (e) {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      var r = el.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width;
      var y = (e.clientY - r.top) / r.height;
      el.style.setProperty('--ry', ((x - 0.5) * max * 2).toFixed(2) + 'deg');
      el.style.setProperty('--rx', ((0.5 - y) * max * 2).toFixed(2) + 'deg');
      el.style.setProperty('--px', (x * 100).toFixed(1) + '%');
      el.style.setProperty('--py', (y * 100).toFixed(1) + '%');
    });

    el.addEventListener('pointerleave', function () {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    });
  }

  if (fine && !reduce) {
    document.querySelectorAll('.profile-card').forEach(function (el) { tilt(el, 5); });
    document.querySelectorAll('.projeto-card').forEach(function (el) { tilt(el, 4); });
  }
})();
