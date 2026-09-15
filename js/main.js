/* Qiming Yang — Light Academic Homepage */

(function () {
  'use strict';

  /* Mobile nav */
  const burger = document.querySelector('.nav__burger');
  const menu = document.querySelector('.nav__menu');
  if (burger && menu) {
    burger.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
    });
    menu.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Active nav on scroll */
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.nav__link');
  function updateNav() {
    const y = window.scrollY + 90;
    let cur = '';
    sections.forEach(s => { if (s.offsetTop <= y) cur = s.id; });
    navLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + cur);
    });
  }
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => { updateNav(); ticking = false; });
      ticking = true;
    }
  });
  updateNav();

  /* Abstract toggles */
  document.querySelectorAll('.pub__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const abs = btn.closest('.pub__row').parentElement.querySelector('.pub__abs');
      if (!abs) return;
      const hidden = abs.hasAttribute('hidden');
      if (hidden) {
        abs.removeAttribute('hidden');
        btn.setAttribute('aria-expanded', 'true');
        btn.textContent = 'Hide';
      } else {
        abs.setAttribute('hidden', '');
        btn.setAttribute('aria-expanded', 'false');
        btn.textContent = 'Abstract';
      }
    });
  });
})();
