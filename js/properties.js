/* ============================================================
   Sky-High Properties — Property Filter & Search
   js/properties.js
   ============================================================ */

(function () {
  'use strict';

  // ── Property Grid Filter ─────────────────────────────────
  const filterBtns = document.querySelectorAll('.filter-nav__btn');
  const propertyCards = document.querySelectorAll('.property-card-wrap');

  if (filterBtns.length > 0 && propertyCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter cards
        propertyCards.forEach(card => {
          const type = card.getAttribute('data-type');
          const show = filter === 'all' || type === filter;

          if (show) {
            card.style.display = '';
            requestAnimationFrame(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(16px)';
            setTimeout(() => {
              if (card.style.opacity === '0') card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // ── Search Bar ───────────────────────────────────────────
  const searchForm = document.querySelector('.search-bar__form');

  if (searchForm) {
    searchForm.addEventListener('submit', e => {
      e.preventDefault();
      const type = searchForm.querySelector('[name="type"]')?.value || 'all';
      const location = searchForm.querySelector('[name="location"]')?.value || 'all';
      const purpose = searchForm.querySelector('[name="purpose"]')?.value || 'all';

      // Build URL to properties page with filters
      const params = new URLSearchParams();
      if (type !== 'all') params.set('type', type);
      if (location !== 'all') params.set('location', location);
      if (purpose !== 'all') params.set('purpose', purpose);

      const query = params.toString();
      window.location.href = `properties.html${query ? '?' + query : ''}`;
    });
  }

  // ── Apply URL Params to filter (on properties page) ──────
  function applyURLFilters() {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');

    if (type && filterBtns.length > 0) {
      const matchBtn = [...filterBtns].find(b => b.getAttribute('data-filter') === type);
      if (matchBtn) matchBtn.click();
    }
  }

  if (document.querySelector('.properties-grid')) {
    applyURLFilters();
  }

  // ── Enquiry form (contact page & detail page) ────────────
  const enquiryForms = document.querySelectorAll('.enquiry-form');

  enquiryForms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          showFormSuccess(form);
        } else {
          showFormError(form);
        }
      } catch (err) {
        showFormError(form);
      }

      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    });
  });

  function showFormSuccess(form) {
    const msg = form.querySelector('.form-success') || createMessage(form, 'success');
    msg.textContent = '✓ Your enquiry has been sent! We\'ll contact you shortly.';
    msg.style.display = 'block';
    form.reset();
    setTimeout(() => { msg.style.display = 'none'; }, 6000);
  }

  function showFormError(form) {
    const msg = form.querySelector('.form-error') || createMessage(form, 'error');
    msg.textContent = '✗ Something went wrong. Please WhatsApp or call us directly.';
    msg.style.display = 'block';
    setTimeout(() => { msg.style.display = 'none'; }, 6000);
  }

  function createMessage(form, type) {
    const el = document.createElement('div');
    el.className = `form-${type}`;
    el.style.cssText = `
      padding: 0.75rem 1rem;
      border-radius: 6px;
      margin-top: 1rem;
      font-size: 0.875rem;
      font-weight: 500;
      background: ${type === 'success' ? '#ecfdf5' : '#fef2f2'};
      color: ${type === 'success' ? '#065f46' : '#991b1b'};
      border: 1px solid ${type === 'success' ? '#6ee7b7' : '#fca5a5'};
      display: none;
    `;
    form.appendChild(el);
    return el;
  }

})();
