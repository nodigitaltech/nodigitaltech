/* ============================================
   script.js — devenshivay Landing Page
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ── DOM Refs ──
  const header     = document.getElementById('header');
  const hamburger  = document.getElementById('hamburger');
  const mainNav    = document.getElementById('mainNav');
  const overlay    = document.getElementById('navOverlay');
  const navLinks   = document.querySelectorAll('.nav__link');
  const fadeEls    = document.querySelectorAll('.fade-in');

  // ── Mobile Menu Toggle ──
  function toggleMenu(forceClose) {
    const shouldClose = forceClose === true || mainNav.classList.contains('open');

    mainNav.classList.toggle('open', !shouldClose);
    overlay.classList.toggle('active', !shouldClose);
    hamburger.classList.toggle('active', !shouldClose);
    hamburger.setAttribute('aria-expanded', String(!shouldClose));
    document.body.style.overflow = shouldClose ? '' : 'hidden';
  }

  hamburger.addEventListener('click', () => toggleMenu());
  overlay.addEventListener('click', () => toggleMenu(true));

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mainNav.classList.contains('open')) toggleMenu(true);
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('open')) {
      toggleMenu(true);
    }
  });

  // ── Header Scroll Shadow ──
  let lastScroll = 0;

  function onScroll() {
    const scrollY = window.scrollY;
    header.classList.toggle('scrolled', scrollY > 20);
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Intersection Observer: Fade-In on Scroll ──
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    fadeEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: just show everything
    fadeEls.forEach((el) => el.classList.add('visible'));
  }

  // ── Smooth Scroll for Anchor Links ──
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  // ── Staggered Fade-In for Service Cards ──
  const serviceCards = document.querySelectorAll('.service-card.fade-in');

  if ('IntersectionObserver' in window && serviceCards.length) {
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Add stagger delay
            const card = entry.target;
            const siblings = Array.from(card.parentElement.children);
            const cardIndex = siblings.indexOf(card);
            card.style.transitionDelay = `${cardIndex * 0.12}s`;
            card.classList.add('visible');
            cardObserver.unobserve(card);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    serviceCards.forEach((card) => cardObserver.observe(card));
  }

  // ── Staggered Fade-In for Highlight Items ──
  const highlightItems = document.querySelectorAll('.highlight');

  if ('IntersectionObserver' in window && highlightItems.length) {
    highlightItems.forEach((item, index) => {
      item.classList.add('fade-in');

      const hlObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.style.transitionDelay = `${index * 0.1}s`;
              entry.target.classList.add('visible');
              hlObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );

      hlObserver.observe(item);
    });
  }
});
