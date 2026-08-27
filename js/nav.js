/* ============================================================
   Sky-High Properties — Navigation JS
   js/nav.js
   ============================================================ */

(function () {
  'use strict';

  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile');
  const mobileLinks = document.querySelectorAll('.nav__mobile-link');
  const currentPath = window.location.pathname;

  // ── Sticky / Scroll Behavior ──────────────────────────────
  const isTransparentNav = nav && nav.classList.contains('nav--transparent');

  function handleScroll() {
    if (!isTransparentNav) return; // Internal pages should always remain solid

    if (window.scrollY > 60) {
      nav.classList.add('nav--scrolled');
      nav.classList.remove('nav--transparent');
    } else {
      nav.classList.remove('nav--scrolled');
      nav.classList.add('nav--transparent');
    }
  }

  if (nav) {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // ── Active nav link ──────────────────────────────────────
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkPath = new URL(href, window.location.href).pathname;
    if (
      (linkPath === '/' && currentPath === '/') ||
      (linkPath !== '/' && currentPath.startsWith(linkPath))
    ) {
      link.classList.add('active');
    }
  });

  // ── Mobile Menu ──────────────────────────────────────────
  let menuOpen = false;

  function openMenu() {
    menuOpen = true;
    hamburger.classList.add('open');
    mobileMenu.style.display = 'flex';
    requestAnimationFrame(() => mobileMenu.classList.add('open'));
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menuOpen = false;
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (!menuOpen) mobileMenu.style.display = '';
    }, 400);
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      menuOpen ? closeMenu() : openMenu();
    });
  }

  if (mobileLinks) {
    mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
  }

  // Close on ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menuOpen) closeMenu();
  });

  // ── Back to Top ──────────────────────────────────────────
  const backToTop = document.querySelector('.back-to-top');

  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

})();
