import { useEffect, useRef, useState } from "react";

const LUXURY_CATEGORIES = [
  {
    id: "beauty",
    label: "Beauty & Cosmetics",
    icon: "✦",
    headline: "India's Premier Beauty Destination",
    description:
      "Navi Mumbai's most concentrated premium beauty corridor — Sephora, MAC, Forest Essentials, Kama Ayurveda, The Body Shop, and RAS Luxury Skincare's Navi Mumbai flagship all under one roof. The Gloss Box beauty event drew MAC, Sephora, Nykaa, Tira, and SUGAR together for Navi Mumbai's biggest beauty showcase.",
    brands: [
      { name: "Sephora", note: "Flagship" },
      { name: "MAC Cosmetics", note: "Flagship" },
      { name: "The Body Shop", note: "Premium" },
      { name: "Forest Essentials", note: "Luxury Ayurveda" },
      { name: "Kama Ayurveda", note: "Premium" },
      { name: "Nykaa", note: "Multi-brand" },
      { name: "RAS Luxury", note: "Farm-to-Face®" },
      { name: "Parcos", note: "Niche Fragrances" },
    ],
    accent: "#e8b4c8",
  },
  {
    id: "jewellery",
    label: "Jewellery & Timepieces",
    icon: "◈",
    headline: "Fine Jewellery & Swiss Timepieces",
    description:
      "From Swarovski crystals to Tanishq diamonds, Nexus Seawoods is Navi Mumbai's premier fine jewellery destination. Tissot and Daniel Wellington anchor the premium watch corridor, alongside Helios — India's largest watch speciality retailer.",
    brands: [
      { name: "Tanishq", note: "India's No.1" },
      { name: "Mia by Tanishq", note: "Modern Fine" },
      { name: "Swarovski", note: "Crystal Luxury" },
      { name: "Orra", note: "Diamond" },
      { name: "CaratLane", note: "Diamond" },
      { name: "Tissot", note: "Swiss Watch" },
      { name: "Daniel Wellington", note: "Premium Watch" },
      { name: "Helios", note: "Watch Specialist" },
    ],
    accent: "#c9a84c",
  },
  {
    id: "fashion",
    label: "Premium Fashion",
    icon: "◇",
    headline: "International Premium Apparel",
    description:
      "Calvin Klein, Tommy Hilfiger, Superdry, and Marks & Spencer anchor the premium fashion offering — international labels that signal lifestyle aspiration to Navi Mumbai's growing upper-middle-class demographic of IT professionals and corporate executives.",
    brands: [
      { name: "Calvin Klein", note: "International" },
      { name: "Tommy Hilfiger", note: "International" },
      { name: "Marks & Spencer", note: "British Premium" },
      { name: "Superdry", note: "British Premium" },
      { name: "Mango", note: "European" },
      { name: "Rare Rabbit", note: "Indian Premium" },
      { name: "Hidesign", note: "Leather Luxury" },
      { name: "Sunglass Hut", note: "Eyewear Luxury" },
    ],
    accent: "#a8c5da",
  },
  {
    id: "lifestyle",
    label: "Luxury Lifestyle",
    icon: "◉",
    headline: "Premium Lifestyle & Experiences",
    description:
      "From Dyson's cutting-edge home technology to Hard Rock Cafe's flagship dining experience, the lifestyle offering at Nexus Seawoods caters to aspirational Navi Mumbai consumers who demand more than just shopping.",
    brands: [
      { name: "Dyson", note: "Home Technology" },
      { name: "Hard Rock Cafe", note: "Dining Flagship" },
      { name: "Starbucks", note: "Premium Café" },
      { name: "Hamleys", note: "Premium Toys" },
      { name: "William Penn", note: "Luxury Stationery" },
      { name: "Bodhi Thai Spa", note: "Wellness" },
      { name: "Myo Thai Spa", note: "Wellness" },
      { name: "The Bombay Store", note: "Indian Artisan" },
    ],
    accent: "#c8a4d4",
  },
];

const DEMOGRAPHICS = [
  { label: "Avg Household Income", value: "₹8–15L", sub: "per annum" },
  { label: "Primary Profile", value: "IT & Corporate", sub: "professionals" },
  { label: "Age Bracket", value: "25–45", sub: "core shoppers" },
  { label: "Catchment Population", value: "~1M", sub: "within 5–7 km" },
];

// INTERSECTION OBSERVER HOOK
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export default function Luxury() {
  const [headerRef, headerInView] = useInView(0.1);
  const [demoRef, demoInView] = useInView(0.2);
  const [catsRef, catsInView] = useInView(0.08);
  const [ctaRef, ctaInView] = useInView(0.2);

  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="luxury" className="luxury-section">
      {/* ── BACKGROUNDS ── */}
      <div className="lux-bg-gradient" aria-hidden="true" />
      <div className="lux-bg-grid" aria-hidden="true" />
      <div className="lux-bg-line" aria-hidden="true" />

      {/* HEADER */}

      <div
        ref={headerRef}
        className={`lux-header ${headerInView ? "lx-visible" : "lx-hidden"}`}
      >
        <div className="flex items-center gap-3.5 mb-6">
          <div
            className="w-10 h-px"
            style={{ background: "var(--color-gold)" }}
          />
          <span className="eyebrow-text">Luxury & Premium</span>
          <span className="eyebrow-badge">Navi Mumbai's Finest</span>
        </div>

        <div className="lux-headline-wrap">
          <h2 className="lux-headline">
            Premium Brands.
            <br />
            <em>Aspirational Audience.</em>
          </h2>
          <p className="lux-headline-aside">
            Nexus Seawoods serves Navi Mumbai's most affluent demographic — IT
            professionals and corporate executives with household incomes of
            ₹8–15 lakh annually, actively seeking premium and international
            brand experiences close to home.
          </p>
        </div>
      </div>

      {/* DEMOGRAPHIC STRIP */}

      <div ref={demoRef} className="demo-strip">
        {DEMOGRAPHICS.map((d, i) => (
          <div
            key={d.label}
            className={`demo-card ${demoInView ? "lx-visible" : "lx-hidden"}`}
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <span className="demo-value">{d.value}</span>
            <span className="demo-sub">{d.sub}</span>
            <span className="demo-label">{d.label}</span>
          </div>
        ))}
      </div>

      {/* LUXURY CATEGORY EXPLORER */}

      <div
        ref={catsRef}
        className={`cats-wrap ${catsInView ? "lx-visible" : "lx-hidden"}`}
      >
        <div className="flex items-center gap-3 mb-8">
          <div
            className="w-6 h-px"
            style={{ background: "var(--color-gold)" }}
          />
          <span className="eyebrow-text">Premium Brand Portfolio</span>
        </div>

        {/* Category selector — vertical left sidebar + right content panel */}
        <div className="cats-layout">
          {/* tab list */}
          <div className="cats-tabs">
            {LUXURY_CATEGORIES.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(i)}
                className={`cat-tab ${activeCategory === i ? "cat-tab--active" : ""}`}
                style={{
                  "--tab-accent": cat.accent,
                }}
              >
                <span className="cat-tab-icon">{cat.icon}</span>
                <span className="cat-tab-label">{cat.label}</span>
                {activeCategory === i && (
                  <span className="cat-tab-arrow">→</span>
                )}
              </button>
            ))}
          </div>

          {/* content panel */}
          <div className="cats-panel">
            {/* Accent bar using category colour */}
            <div
              className="cats-panel-bar"
              style={{ background: LUXURY_CATEGORIES[activeCategory].accent }}
            />

            {/* Header */}
            <div className="cats-panel-header">
              <span
                className="cats-panel-icon"
                style={{ color: LUXURY_CATEGORIES[activeCategory].accent }}
              >
                {LUXURY_CATEGORIES[activeCategory].icon}
              </span>
              <div>
                <p className="cats-panel-tag">
                  {LUXURY_CATEGORIES[activeCategory].label}
                </p>
                <h3 className="cats-panel-headline">
                  {LUXURY_CATEGORIES[activeCategory].headline}
                </h3>
              </div>
            </div>

            {/* Description */}
            <p className="cats-panel-desc">
              {LUXURY_CATEGORIES[activeCategory].description}
            </p>

            {/* Brand cards */}
            <div className="brand-cards-grid">
              {LUXURY_CATEGORIES[activeCategory].brands.map((b) => (
                <div key={b.name} className="brand-card">
                  <p className="brand-card-name">{b.name}</p>
                  <p
                    className="brand-card-note"
                    style={{ color: LUXURY_CATEGORIES[activeCategory].accent }}
                  >
                    {b.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* OPPORTUNITY CALLOUT */}

      <div
        ref={ctaRef}
        className={`lux-opportunity ${ctaInView ? "lx-visible" : "lx-hidden"}`}
      >
        <div className="lux-opp-left">
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-6 h-px"
              style={{ background: "var(--color-gold)" }}
            />
            <span className="eyebrow-text">The White Space</span>
          </div>
          <h3 className="lux-opp-heading">
            Navi Mumbai is Ready
            <br />
            <em>for True Luxury.</em>
          </h3>
          <p className="lux-opp-body">
            Despite an affluent catchment of nearly 1 million residents with
            household incomes of ₹8–15L, there is no Gucci, Louis Vuitton, or
            standalone luxury watch boutique within the MMR eastern corridor.
            Nexus Seawoods is the natural home for the first true luxury brand
            to plant its flag in Navi Mumbai.
          </p>
          <p className="lux-opp-body" style={{ marginTop: "16px" }}>
            With 13% year-on-year sales growth in 2024 and Metro Line 8 bringing
            airport-linked footfall, the timing for a luxury entry has never
            been stronger.
          </p>
        </div>

        <div className="lux-opp-right">
          <div className="lux-opp-stat">
            <span className="lux-opp-stat-val">0</span>
            <span className="lux-opp-stat-label">
              International luxury boutiques
              <br />
              in Navi Mumbai currently
            </span>
          </div>
          <div className="lux-opp-divider" />
          <div className="lux-opp-stat">
            <span className="lux-opp-stat-val">1M</span>
            <span className="lux-opp-stat-label">
              Affluent residents
              <br />
              within 5–7 km catchment
            </span>
          </div>
          <div className="lux-opp-divider" />
          <div className="lux-opp-stat">
            <span className="lux-opp-stat-val">13%</span>
            <span className="lux-opp-stat-label">
              Year-on-year sales
              <br />
              growth in 2024
            </span>
          </div>
        </div>
      </div>

      {/* CTA STRIP */}
      <div className="lux-cta-strip">
        <div>
          <p className="lux-cta-heading">Interested in a premium slot?</p>
          <p className="lux-cta-sub">
            Be the first international luxury brand to anchor Navi Mumbai's
            premium corridor.
          </p>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <button className="btn-primary">
            <span className="relative z-10">Enquire About Luxury Space →</span>
          </button>
          <button className="btn-secondary">Download Brand Deck</button>
        </div>
      </div>
    </section>
  );
}
