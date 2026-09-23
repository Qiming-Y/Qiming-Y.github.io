/* Progressive enhancement: the complete profile remains readable without JS. */
(() => {
  'use strict';

  const header = document.querySelector('.nav');
  const burger = document.querySelector('.nav__burger');
  const menu = document.querySelector('.nav__menu');
  const mobile = window.matchMedia('(max-width: 820px)');

  if (header && burger && menu) {
    header.classList.add('nav--enhanced');
    const closeMenu = (returnFocus = false) => {
      menu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Open navigation');
      if (returnFocus) burger.focus();
    };
    burger.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    menu.addEventListener('click', event => {
      const link = event.target.closest('a');
      if (!link || !mobile.matches) return;
      closeMenu();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
      }
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.classList.contains('open')) closeMenu(true);
    });
    document.addEventListener('click', event => {
      if (!header.contains(event.target)) closeMenu();
    });
    header.addEventListener('focusout', event => {
      if (!header.contains(event.relatedTarget)) closeMenu();
    });
    mobile.addEventListener('change', () => closeMenu());
  }

  const sections = [...document.querySelectorAll('.section[id]')];
  const links = [...document.querySelectorAll('.nav__link, .sidebar__index a')];
  let scheduled = false;
  const updateNavigation = () => {
    const offset = (header?.getBoundingClientRect().height || 76) + 36;
    let activeId = '';
    sections.forEach(section => {
      if (section.getBoundingClientRect().top <= offset) activeId = section.id;
    });
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 3) {
      activeId = sections[sections.length - 1]?.id || '';
    }
    links.forEach(link => {
      const active = link.getAttribute('href') === '#' + activeId;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scheduled = false;
  };
  const scheduleNavigation = () => {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(updateNavigation);
    }
  };
  window.addEventListener('scroll', scheduleNavigation, { passive: true });
  window.addEventListener('resize', scheduleNavigation);
  window.addEventListener('load', scheduleNavigation);
  updateNavigation();

  const tools = document.querySelector('.publication-tools');
  if (tools) {
    const papers = [...document.querySelectorAll('.pub[data-status]')];
    const headings = [...document.querySelectorAll('[data-publication-heading]')];
    const filters = [...tools.querySelectorAll('[data-filter]')];
    const status = tools.querySelector('.publication-count');
    filters.forEach(button => {
      const filter = button.dataset.filter;
      const count = papers.filter(paper => filter === 'all' || paper.dataset.status === filter).length;
      button.querySelector('span').textContent = String(count).padStart(2, '0');
      button.addEventListener('click', () => {
        filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
        papers.forEach(paper => { paper.hidden = filter !== 'all' && paper.dataset.status !== filter; });
        headings.forEach(heading => { heading.hidden = filter !== 'all' && heading.dataset.publicationHeading !== filter; });
        status.textContent = filter === 'all' ? 'Showing all ' + count + ' papers' :
          'Showing ' + count + (filter === 'published' ? ' published / accepted papers' : ' papers under review');
        scheduleNavigation();
      });
    });
    status.textContent = 'Showing all ' + papers.length + ' papers';
    tools.hidden = false;
  }
})();
