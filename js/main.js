/* Qiming Yang — Academic Homepage interactions */

(function () {
  'use strict';

  /* ---------- Mobile nav ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.masthead__nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });

    nav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Active nav on scroll ---------- */
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollY = window.scrollY + 80;
    let current = '';

    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollY) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === '#' + current
      );
    });
  }

  let ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        updateActiveNav();
        ticking = false;
      });
      ticking = true;
    }
  });
  updateActiveNav();

  /* ---------- Publication abstract toggles ---------- */
  document.querySelectorAll('.pub__toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const abstract = btn.closest('.pub__main').nextElementSibling;
      if (!abstract || !abstract.classList.contains('pub__abstract')) return;

      const isHidden = abstract.hasAttribute('hidden');
      if (isHidden) {
        abstract.removeAttribute('hidden');
        btn.setAttribute('aria-expanded', 'true');
        btn.textContent = 'Hide';
      } else {
        abstract.setAttribute('hidden', '');
        btn.setAttribute('aria-expanded', 'false');
        btn.textContent = 'Abstract';
      }
    });
  });
})();
