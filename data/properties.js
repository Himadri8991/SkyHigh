/* ============================================================
   Sky-High Properties — Property Data (Updated)
   data/properties.js
   ============================================================ */

// ── Property Listing (New / Developer Properties) ────────────
const PROPERTIES = [
  {
    id: "quality-house-for-sale",
    slug: "quality-house-for-sale",
    title: "Quality House For Sale",
    type: "Villa",
    typeFilter: "villa",
    listing: "buy",                        // "buy" | "rent"
    location: "Joka",
    area: "Joka",
    city: "Kolkata",
    price: "On Request",
    priceRaw: 0,
    beds: 4,
    baths: 3,
    carpet: "2,400 sq.ft.",
    possession: "ready",                   // "ready" | "under-construction" | "new-launch"
    possessionLabel: "Ready to Move",
    status: "Available",
    badge: "Featured",
    featured: true,
    image: "https://skyhighinteriorandproperties.com/wp-content/uploads/2025/06/p9-1024x595.jpg",
    gallery: [
      "https://skyhighinteriorandproperties.com/wp-content/uploads/2025/06/p9-1024x595.jpg"
    ],
    description: "A premium quality villa available for sale in the sought-after Joka locality of Kolkata. This well-planned property offers spacious interiors, quality finishes, and easy access to key areas of the city.",
    amenities: ["Car Parking", "Security System", "Power Backup", "Garden", "Piped Gas", "CCTV"],
    highlights: ["Ready to Move", "South-Facing", "Vaastu Compliant"],
    nearbyPlaces: ["IIM Calcutta (2 km)", "AMRI Hospital (3 km)", "Diamond Harbour Road"],
    detailPage: "properties/quality-house-for-sale.html"
  },
  {
    id: "diamond-family-home",
    slug: "diamond-family-home",
    title: "Diamond Family Home",
    type: "House",
    typeFilter: "house",
    listing: "buy",
    location: "Rajarhat",
    area: "Rajarhat",
    city: "Kolkata",
    price: "On Request",
    priceRaw: 0,
    beds: 3,
    baths: 2,
    carpet: "1,800 sq.ft.",
    possession: "ready",
    possessionLabel: "Ready to Move",
    status: "Available",
    badge: "New",
    featured: true,
    image: "https://skyhighinteriorandproperties.com/wp-content/uploads/2025/06/p14-1024x569.jpg",
    gallery: [
      "https://skyhighinteriorandproperties.com/wp-content/uploads/2025/06/p14-1024x569.jpg"
    ],
    description: "A beautiful family home in the rapidly developing Rajarhat area of Kolkata. Modern architecture and premium fittings with excellent connectivity to New Town's tech corridor.",
    amenities: ["Covered Parking", "24/7 Security", "Power Backup", "Lift", "Intercom", "Water Storage"],
    highlights: ["Ready to Move", "East-Facing", "Low Maintenance"],
    nearbyPlaces: ["New Town IT Hub (5 km)", "Kolkata Airport (12 km)", "City Centre 2 (8 km)"],
    detailPage: "properties/diamond-family-home.html"
  }
];

// ── Resale Properties ────────────────────────────────────────
const RESALE_PROPERTIES = [
  {
    id: "resale-newtown-3bhk-apt",
    slug: "resale-newtown-3bhk-apt",
    title: "Spacious 3BHK in New Town Action Area 1",
    type: "Apartment",
    typeFilter: "apartment",
    listing: "buy",
    location: "New Town",
    area: "Action Area 1",
    city: "Kolkata",
    price: "₹ 75 Lakh",
    priceRaw: 7500000,
    beds: 3,
    baths: 2,
    carpet: "1,350 sq.ft.",
    ageOfProperty: "4 years",
    ageBracket: "0-5",       // "0-5" | "5-10" | "10+"
    possession: "ready",
    possessionLabel: "Ready to Move",
    status: "Available",
    badge: "",
    featured: true,
    image: "https://skyhighinteriorandproperties.com/wp-content/uploads/2025/06/p9-1024x595.jpg",
    description: "Well-maintained 3BHK apartment in the heart of New Town Action Area 1. Excellent connectivity, modern complex with all amenities. Ideal for families or investment.",
    amenities: ["Car Parking", "Lift", "Security", "Power Backup", "Club House", "Swimming Pool"],
    highlights: ["4 Years Old", "Maintained", "Corner Unit"],
    nearbyPlaces: ["Eco Park (3 km)", "New Town IT Hub (2 km)", "City Centre 2 (6 km)"]
  },
  {
    id: "resale-ballygunge-2bhk",
    slug: "resale-ballygunge-2bhk",
    title: "Premium 2BHK in Ballygunge",
    type: "Apartment",
    typeFilter: "apartment",
    listing: "buy",
    location: "Ballygunge",
    area: "Ballygunge",
    city: "Kolkata",
    price: "₹ 90 Lakh",
    priceRaw: 9000000,
    beds: 2,
    baths: 2,
    carpet: "1,100 sq.ft.",
    ageOfProperty: "8 years",
    ageBracket: "5-10",
    possession: "ready",
    possessionLabel: "Ready to Move",
    status: "Available",
    badge: "Featured",
    featured: true,
    image: "https://skyhighinteriorandproperties.com/wp-content/uploads/2025/06/p14-1024x569.jpg",
    description: "A premium 2BHK flat in one of Kolkata's most prestigious addresses — Ballygunge. Surrounded by top schools, hospitals, and the best of south Kolkata's conveniences.",
    amenities: ["Covered Parking", "24/7 Security", "CCTV", "Intercom", "Lift", "Power Backup"],
    highlights: ["Prime Location", "High Floor", "South Facing"],
    nearbyPlaces: ["Ballygunge Station (1 km)", "CMRI Hospital (2 km)", "South City Mall (3 km)"]
  }
];

// ── Location Areas in Kolkata ────────────────────────────────
const KOLKATA_AREAS = [
  "Alipore", "Ballygunge", "Barrackpore", "Bhawanipur",
  "Dumdum", "Garia", "Howrah", "Jadavpur", "Joka",
  "Kasba", "Lake Town", "New Town", "Rajarhat",
  "Salt Lake", "Shyambazar", "Tollygunge"
];

// ── Helper Functions ────────────────────────────────────────

function filterProperties(arr, filters = {}) {
  return arr.filter(p => {
    // keyword
    if (filters.keyword) {
      const kw = filters.keyword.toLowerCase();
      const haystack = `${p.title} ${p.location} ${p.area} ${p.type}`.toLowerCase();
      if (!haystack.includes(kw)) return false;
    }
    // listing type
    if (filters.listing && filters.listing !== 'all') {
      if (p.listing !== filters.listing) return false;
    }
    // property type
    if (filters.type && filters.type !== 'all') {
      if (p.typeFilter !== filters.type) return false;
    }
    // beds (min)
    if (filters.beds && filters.beds !== 'any') {
      const minBeds = filters.beds === '4+' ? 4 : parseInt(filters.beds);
      if (p.beds < minBeds) return false;
    }
    // possession
    if (filters.possession && filters.possession !== 'any') {
      if (p.possession !== filters.possession) return false;
    }
    // max budget
    if (filters.maxBudget && p.priceRaw > 0) {
      if (p.priceRaw > filters.maxBudget) return false;
    }
    // area
    if (filters.area && filters.area !== 'all') {
      if (p.area.toLowerCase() !== filters.area.toLowerCase()) return false;
    }
    // age bracket (resale)
    if (filters.ageBracket && filters.ageBracket !== 'all') {
      if (p.ageBracket !== filters.ageBracket) return false;
    }
    return true;
  });
}

function getFeaturedProperties() {
  return PROPERTIES.filter(p => p.featured);
}

function getFeaturedResale() {
  return RESALE_PROPERTIES.filter(p => p.featured);
}

// ── Amenity Icons Map ───────────────────────────────────────
const AMENITY_ICONS = {
  "Car Parking":      `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  "Covered Parking":  `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  "Security System":  `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  "24/7 Security":    `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  "Security":         `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  "Power Backup":     `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  "Lift":             `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M9 10l3-3 3 3"/><path d="M9 14l3 3 3-3"/></svg>`,
  "Garden":           `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22V12"/><path d="M12 12C10 6 4 6 4 6s0 8 8 6"/><path d="M12 12c2-6 8-6 8-6s0 8-8 6"/></svg>`,
  "Club House":       `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>`,
  "Swimming Pool":    `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M2 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M8 4l4-2 4 2"/><line x1="12" y1="2" x2="12" y2="12"/></svg>`,
  "CCTV":             `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>`,
  "Intercom":         `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 012 2.18 2 2 0 014 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`,
  "Piped Gas":        `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/></svg>`,
  "Water Storage":    `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
};

function getAmenityIcon(name) {
  return AMENITY_ICONS[name] || `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`;
}
