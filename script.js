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

  // ── Modal Logic ──
  const headerCta = document.getElementById('headerCta');
  const footerCta = document.getElementById('footerCta');
  const contactModal = document.getElementById('contactModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  if (contactModal) {
    const openModal = (e) => {
      e.preventDefault();
      contactModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    if (headerCta) headerCta.addEventListener('click', openModal);
    if (footerCta) footerCta.addEventListener('click', openModal);

    closeModalBtn.addEventListener('click', () => {
      contactModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        contactModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ── Contact Form AJAX Submission ──
  const contactForm = document.querySelector('.contact-form');
  const successModal = document.getElementById('successModal');
  const closeSuccessBtns = [document.getElementById('closeSuccessBtn'), document.getElementById('successOkBtn')];

  if (contactForm && successModal) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Impede o redirecionamento
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Enviando...';
      submitBtn.disabled = true;

      const formData = new FormData(contactForm);

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })
      .then(async (response) => {
        if (response.ok) {
          // Sucesso: Limpa o formulário, fecha o modal de contato e abre o modal de sucesso
          contactForm.reset();
          if (contactModal) contactModal.classList.remove('active');
          document.body.style.overflow = 'hidden'; 
          successModal.classList.add('active');
        } else {
          const data = await response.json();
          alert(data.message || 'Ocorreu um erro ao enviar a mensagem. Tente novamente.');
        }
      })
      .catch(error => {
        alert('Ocorreu um erro de conexão ao enviar a mensagem. Tente novamente.');
      })
      .finally(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      });
    });

    // Handle Success Modal Close
    closeSuccessBtns.forEach(btn => {
      if (btn) {
        btn.addEventListener('click', () => {
          successModal.classList.remove('active');
          document.body.style.overflow = '';
        });
      }
    });

    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
});
