/* ============================================================
   Sky-High Properties — Filter Engine
   js/filter-engine.js
   Used by both properties.html and resale.html
   ============================================================ */

(function () {
  'use strict';

  // ── State ────────────────────────────────────────────────
  const state = {
    keyword:    '',
    listing:    'all',
    type:       'all',
    beds:       'any',
    possession: 'any',
    maxBudget:  100000000,  // 10 Cr default max
    area:       'all',
    ageBracket: 'all',
  };

  // ── Detect page mode ─────────────────────────────────────
  const isResalePage = document.body.classList.contains('page-resale');
  const dataSource   = isResalePage ? (typeof RESALE_PROPERTIES !== 'undefined' ? RESALE_PROPERTIES : [])
                                    : (typeof PROPERTIES !== 'undefined' ? PROPERTIES : []);

  // ── DOM refs ──────────────────────────────────────────────
  const grid          = document.getElementById('propertiesGrid');
  const countEl       = document.getElementById('resultsCount');
  const noResults     = document.getElementById('noResults');
  const activeFilters = document.getElementById('activeFilters');
  const sidebar       = document.querySelector('.filter-sidebar');
  const overlay       = document.querySelector('.filter-overlay');
  const mobileToggle  = document.querySelector('.filter-mobile-toggle');
  const clearBtn      = document.querySelector('.filter-clear-btn');
  const applyBtn      = document.querySelector('.filter-apply-btn');

  if (!grid) return; // Not a listing page

  // ── Build cards from data ─────────────────────────────────
  function buildCard(p) {
    const isResale = isResalePage;
    return `
    <div class="property-card-wrap"
         data-type="${p.typeFilter}"
         data-listing="${p.listing}"
         data-beds="${p.beds}"
         data-possession="${p.possession}"
         data-price="${p.priceRaw}"
         data-area="${p.area.toLowerCase()}"
         ${isResale ? `data-age="${p.ageBracket}"` : ''}
    >
      <article class="property-card" style="animation: pageIn 0.6s var(--ease-premium) both;">
        <div class="property-card__image">
          <img src="${p.image}" alt="${p.title}" loading="lazy">
          <div class="property-card__badges">
            ${p.badge ? `<span class="badge ${p.badge === 'Featured' ? 'badge--cyan' : p.badge === 'New' ? 'badge--orange' : 'badge--dark'}">${p.badge}</span>` : ''}
            ${isResale ? '<span class="badge badge--outline">Resale</span>' : ''}
          </div>
        </div>
        <div class="property-card__body">
          <p class="property-card__type">${p.type}</p>
          <h3 class="property-card__title">
            <a href="${p.detailPage || '#'}">${p.title}</a>
          </h3>
          <p class="property-card__location">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            ${p.area}, ${p.city}
          </p>
          <p class="property-card__price">${p.price}</p>
          ${isResale && p.ageOfProperty ? `<p class="property-card__age"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${p.ageOfProperty} old</p>` : ''}
          <div class="property-card__specs">
            <span class="property-card__spec">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
              ${p.beds} Beds
            </span>
            <span class="property-card__spec">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h16M4 6h16M4 18h16"/></svg>
              ${p.baths} Baths
            </span>
            <span class="property-card__spec">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
              ${p.carpet}
            </span>
          </div>
          <a href="${p.detailPage || '#'}" class="property-card__link">
            View Property <span>→</span>
          </a>
        </div>
      </article>
    </div>`;
  }

  // ── Initial render ────────────────────────────────────────
  function renderAll() {
    if (!grid) return;
    grid.innerHTML = dataSource.map(buildCard).join('') + `
      <div class="no-results" id="noResults">
        <div class="no-results__icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </div>
        <p class="no-results__title">No properties found</p>
        <p class="no-results__text">Try adjusting your filters to see more results.</p>
        <button class="btn btn--primary" onclick="document.querySelector('.filter-clear-btn').click()">Clear Filters</button>
      </div>`;
  }

  // ── Apply filters ─────────────────────────────────────────
  function applyFilters() {
    const cards = grid.querySelectorAll('.property-card-wrap');
    let visible = 0;

    cards.forEach(card => {
      const type       = card.dataset.type;
      const listing    = card.dataset.listing;
      const beds       = parseInt(card.dataset.beds) || 0;
      const possession = card.dataset.possession;
      const price      = parseInt(card.dataset.price) || 0;
      const area       = (card.dataset.area || '').toLowerCase();
      const age        = card.dataset.age;
      const title      = card.querySelector('.property-card__title')?.textContent?.toLowerCase() || '';
      const loc        = card.querySelector('.property-card__location')?.textContent?.toLowerCase() || '';
      const combined   = title + ' ' + loc + ' ' + type + ' ' + area;

      let show = true;

      // keyword
      if (state.keyword) {
        if (!combined.includes(state.keyword.toLowerCase())) show = false;
      }
      // listing
      if (state.listing !== 'all') {
        if (listing !== state.listing) show = false;
      }
      // type
      if (state.type !== 'all') {
        if (type !== state.type) show = false;
      }
      // beds
      if (state.beds !== 'any') {
        const min = state.beds === '4+' ? 4 : parseInt(state.beds);
        if (beds < min) show = false;
      }
      // possession
      if (state.possession !== 'any') {
        if (possession !== state.possession) show = false;
      }
      // budget
      if (price > 0 && price > state.maxBudget) show = false;

      // area
      if (state.area !== 'all') {
        if (!area.includes(state.area.toLowerCase())) show = false;
      }

      // age (resale)
      if (isResalePage && state.ageBracket !== 'all') {
        if (age !== state.ageBracket) show = false;
      }

      if (show) {
        card.style.display = '';
        card.classList.remove('hidden');
        visible++;
      } else {
        card.style.display = 'none';
        card.classList.add('hidden');
      }
    });

    // Update count
    const noResEl = document.getElementById('noResults');
    if (countEl) {
      countEl.innerHTML = `<strong>${visible}</strong> propert${visible === 1 ? 'y' : 'ies'} found`;
    }
    if (noResEl) {
      noResEl.classList.toggle('visible', visible === 0);
    }

    updateActiveFilterTags();
  }

  // ── Active filter tags ────────────────────────────────────
  function formatBudget(val) {
    if (val >= 10000000) return '₹' + (val / 10000000).toFixed(1) + ' Cr';
    if (val >= 100000)   return '₹' + (val / 100000).toFixed(0) + ' L';
    return '₹' + val;
  }

  function updateActiveFilterTags() {
    if (!activeFilters) return;
    const tags = [];

    if (state.keyword)               tags.push({ label: `"${state.keyword}"`, key: 'keyword', reset: '' });
    if (state.listing !== 'all')     tags.push({ label: state.listing === 'buy' ? 'Buy' : 'Rent', key: 'listing', reset: 'all' });
    if (state.type !== 'all')        tags.push({ label: state.type.charAt(0).toUpperCase() + state.type.slice(1), key: 'type', reset: 'all' });
    if (state.beds !== 'any')        tags.push({ label: `${state.beds}+ Beds`, key: 'beds', reset: 'any' });
    if (state.possession !== 'any')  tags.push({ label: state.possession.replace(/-/g, ' '), key: 'possession', reset: 'any' });
    if (state.area !== 'all')        tags.push({ label: state.area, key: 'area', reset: 'all' });
    if (state.ageBracket !== 'all')  tags.push({ label: `Age: ${state.ageBracket} yrs`, key: 'ageBracket', reset: 'all' });
    if (state.maxBudget < 100000000) tags.push({ label: `Max ${formatBudget(state.maxBudget)}`, key: 'maxBudget', reset: 100000000 });

    activeFilters.innerHTML = tags.map(t => `
      <span class="active-filter-tag">
        ${t.label}
        <span class="active-filter-tag__remove"
              onclick="clearOneFilter('${t.key}', '${t.reset}')">✕</span>
      </span>
    `).join('');
  }

  window.clearOneFilter = function (key, reset) {
    const val = isNaN(reset) ? reset : Number(reset);
    state[key] = val;
    // sync UI
    syncUIFromState();
    applyFilters();
  };

  function syncUIFromState() {
    // keyword
    const ki = document.getElementById('filterKeyword');
    if (ki) ki.value = state.keyword;

    // pills
    document.querySelectorAll('[data-filter-pill]').forEach(pill => {
      const group = pill.dataset.filterPill;
      const val   = pill.dataset.value;
      pill.classList.toggle('active', state[group] === val);
    });

    // selects
    const selects = {
      filterBeds:       'beds',
      filterPossession: 'possession',
      filterArea:       'area',
      filterAgeBracket: 'ageBracket',
    };
    Object.entries(selects).forEach(([id, key]) => {
      const el = document.getElementById(id);
      if (el) el.value = state[key];
    });

    // budget
    const br = document.getElementById('filterBudget');
    if (br) {
      br.value = state.maxBudget;
      updateBudgetDisplay(state.maxBudget);
    }
  }

  function updateBudgetDisplay(val) {
    const disp = document.getElementById('budgetDisplay');
    if (disp) disp.textContent = formatBudget(val);
  }

  // ── Wire up controls ──────────────────────────────────────
  function setupControls() {

    // Keyword search (live)
    const ki = document.getElementById('filterKeyword');
    if (ki) {
      ki.addEventListener('input', e => {
        state.keyword = e.target.value.trim();
        applyFilters();
      });
    }

    // Pills (listing, type)
    document.querySelectorAll('[data-filter-pill]').forEach(pill => {
      pill.addEventListener('click', () => {
        const group = pill.dataset.filterPill;
        const val   = pill.dataset.value;
        state[group] = val;
        // Deactivate siblings
        document.querySelectorAll(`[data-filter-pill="${group}"]`).forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        applyFilters();
      });
    });

    // Selects
    const selectMap = {
      filterBeds:       'beds',
      filterPossession: 'possession',
      filterArea:       'area',
      filterAgeBracket: 'ageBracket',
    };
    Object.entries(selectMap).forEach(([id, key]) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('change', e => {
          state[key] = e.target.value;
          applyFilters();
        });
      }
    });

    // Budget range slider
    const br = document.getElementById('filterBudget');
    if (br) {
      br.addEventListener('input', e => {
        const val = parseInt(e.target.value);
        state.maxBudget = val;
        updateBudgetDisplay(val);
        applyFilters();
      });
    }

    // Clear all
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        Object.assign(state, {
          keyword: '', listing: 'all', type: 'all', beds: 'any',
          possession: 'any', maxBudget: 100000000, area: 'all', ageBracket: 'all',
        });
        syncUIFromState();
        applyFilters();
      });
    }

    // Apply (for mobile)
    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        applyFilters();
        closeMobileFilter();
      });
    }

    // Mobile toggle
    if (mobileToggle && sidebar) {
      mobileToggle.addEventListener('click', () => {
        sidebar.classList.toggle('mobile-open');
        if (overlay) overlay.classList.toggle('visible');
        document.body.style.overflow = sidebar.classList.contains('mobile-open') ? 'hidden' : '';
      });
    }

    // Overlay click
    if (overlay) {
      overlay.addEventListener('click', closeMobileFilter);
    }
  }

  function closeMobileFilter() {
    if (sidebar) sidebar.classList.remove('mobile-open');
    if (overlay) overlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  // ── Read URL params on load ───────────────────────────────
  function readURLParams() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('type'))    state.type    = params.get('type');
    if (params.get('area'))    state.area    = params.get('area');
    if (params.get('listing')) state.listing = params.get('listing');
    if (params.get('beds'))    state.beds    = params.get('beds');
    syncUIFromState();
  }

  // ── Init ──────────────────────────────────────────────────
  renderAll();
  setupControls();
  readURLParams();
  applyFilters();

})();
