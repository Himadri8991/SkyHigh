/* ============================================================
   Sky-High Properties — Scroll Animations
   js/animations.js
   ============================================================ */

(function () {
  'use strict';

  // ── Preloader ────────────────────────────────────────────
  const preloader = document.getElementById('preloader');

  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('hidden');
        preloader.addEventListener('transitionend', () => {
          if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
        }, { once: true });
      }, 2800); // Slower, elegant reveal
    });

    // Failsafe: always hide after 4s regardless
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 4000);
  }

  // ── IntersectionObserver for scroll reveals ───────────────
  const revealElements = document.querySelectorAll('[data-reveal]');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target); // Only fire once
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ── Stagger children of a parent ─────────────────────────
  // Add data-stagger to a parent to auto-stagger its [data-reveal] children
  document.querySelectorAll('[data-stagger]').forEach(parent => {
    const children = parent.querySelectorAll('[data-reveal]');
    children.forEach((child, i) => {
      child.style.transitionDelay = `${i * 80}ms`;
    });
  });

  // ── Image reveal with clip-path ───────────────────────────
  const imageRevealElements = document.querySelectorAll('.image-reveal');

  if (imageRevealElements.length > 0) {
    const imgObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            imgObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    imageRevealElements.forEach(el => imgObserver.observe(el));
  }

  // ── Testimonial Slider ────────────────────────────────────
  const testimonialItems = document.querySelectorAll('.testimonial-item');
  const prevBtn = document.querySelector('.testimonial__prev');
  const nextBtn = document.querySelector('.testimonial__next');

  if (testimonialItems.length > 0) {
    let currentIndex = 0;

    function showTestimonial(index) {
      testimonialItems.forEach(item => item.classList.remove('active'));
      testimonialItems[index].classList.add('active');
    }

    showTestimonial(0);

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % testimonialItems.length;
        showTestimonial(currentIndex);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
        showTestimonial(currentIndex);
      });
    }

    // Auto-rotate every 5 seconds
    let autoRotate = setInterval(() => {
      currentIndex = (currentIndex + 1) % testimonialItems.length;
      showTestimonial(currentIndex);
    }, 5000);

    // Pause on hover
    const testimonialContent = document.querySelector('.testimonials-content');
    if (testimonialContent) {
      testimonialContent.addEventListener('mouseenter', () => clearInterval(autoRotate));
      testimonialContent.addEventListener('mouseleave', () => {
        autoRotate = setInterval(() => {
          currentIndex = (currentIndex + 1) % testimonialItems.length;
          showTestimonial(currentIndex);
        }, 5000);
      });
    }
  }

  // ── Property Gallery (detail page) ───────────────────────
  const galleryMain = document.querySelector('.gallery__main img');
  const galleryThumbs = document.querySelectorAll('.gallery__thumb');

  if (galleryMain && galleryThumbs.length > 0) {
    galleryThumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        galleryMain.src = thumb.querySelector('img').src;
        galleryThumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
    });
  }

})();
