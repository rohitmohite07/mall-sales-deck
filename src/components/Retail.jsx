import { useEffect, useRef, useState } from "react";

const RETAIL_STATS = [
  { value: "500+", label: "Brands & Stores" },
  { value: "56%", label: "International Brands" },
  { value: "38%", label: "National Chains" },
  { value: "59%", label: "Fashion & Lifestyle" },
];

// Floor-by-floor breakdown
const FLOORS = [
  {
    floor: "Ground Floor",
    tag: "GF",
    theme: "Fashion · Beauty · Anchors",
    description:
      "The grand entrance level anchored by Lifestyle and Shoppers Stop. Home to premium international fashion, beauty flagships, and footwear — the first impression that sets the tone for the entire visit.",
    brands: [
      "H&M",
      "Marks & Spencer",
      "Forever 21",
      "Lifestyle",
      "Shoppers Stop",
      "Sephora",
      "MAC Cosmetics",
      "The Body Shop",
      "Aldo",
      "Charles & Keith",
      "Clarks",
    ],
    color: "var(--color-gold)",
  },
  {
    floor: "First Floor",
    tag: "FF",
    theme: "Apparel · Lifestyle · Sports",
    description:
      "A diverse mix of premium domestic and international apparel labels, sportswear flagships, and lifestyle stores catering to Navi Mumbai's young, aspirational demographic.",
    brands: [
      "Calvin Klein",
      "Tommy Hilfiger",
      "Superdry",
      "Mango",
      "Levi's",
      "Nike",
      "Adidas",
      "Puma",
      "Asics",
      "Rare Rabbit",
      "Blackberrys",
      "Park Avenue",
    ],
    color: "#a8c5da",
  },
  {
    floor: "Second Floor",
    tag: "SF",
    theme: "Electronics · Home · Jewellery",
    description:
      "Technology, home goods, and fine jewellery — from flagship electronics stores to India's most trusted jewellery brands. A complete lifestyle destination beyond fashion.",
    brands: [
      "Croma",
      "Samsung",
      "Reliance Digital",
      "OnePlus",
      "Dyson",
      "HP World",
      "Tanishq",
      "Orra",
      "Swarovski",
      "CaratLane",
      "Hidesign",
      "Baggit",
    ],
    color: "#c8a4d4",
  },
  {
    floor: "Third Floor",
    tag: "TF",
    theme: "Entertainment · Dining · Cinema",
    description:
      "The experiential crown of Nexus Seawoods. Cinepolis with IMAX & 4DX (11 screens, 2,300 seats), Namco arcade, Snow World, Hard Rock Cafe, and a 1,200-seat food court.",
    brands: [
      "Cinepolis IMAX",
      "Cinepolis 4DX",
      "Namco",
      "Snow World",
      "Smaash",
      "Hard Rock Cafe",
      "Starbucks",
      "Punjab Grill",
      "Hamleys",
      "Burger King",
    ],
    color: "#d4a8a8",
  },
];

// Category mix for the visual bar chart
const CATEGORY_MIX = [
  { label: "Fashion & Lifestyle", pct: 59, color: "var(--color-gold)" },
  { label: "F&B & Dining", pct: 11, color: "#a8c5da" },
  { label: "Leisure & Entertain", pct: 17, color: "#c8a4d4" },
  { label: "Food & Grocery", pct: 7, color: "#a8d4b8" },
  { label: "Home & Electronics", pct: 6, color: "#d4a8a8" },
];

// Anchor stores with sq ft
const ANCHORS = [
  { name: "Lifestyle", area: "50,854 sq ft", icon: "🛍️", tier: "Anchor" },
  { name: "Shoppers Stop", area: "19,394 sq ft", icon: "👜", tier: "Anchor" },
  { name: "H&M", area: "32,669 sq ft", icon: "👗", tier: "International" },
  {
    name: "Cinepolis",
    area: "85,000 sq ft",
    icon: "🎬",
    tier: "Entertainment",
  },
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

// ANIMATED WIDTH BAR
function AnimatedBar({ pct, color, inView, delay = "0s" }) {
  return (
    <div className="cat-bar-track">
      <div
        className="cat-bar-fill"
        style={{
          width: inView ? `${pct}%` : "0%",
          background: color,
          transitionDelay: delay,
        }}
      />
    </div>
  );
}

export default function Retail() {
  const [headerRef, headerInView] = useInView(0.1);
  const [statsRef, statsInView] = useInView(0.2);
  const [floorsRef, floorsInView] = useInView(0.1);
  const [anchorRef, anchorInView] = useInView(0.2);
  const [catRef, catInView] = useInView(0.2);

  const [activeFloor, setActiveFloor] = useState(0);

  return (
    <section id="retail" className="retail-section">
      {/* BACKGROUND */}
      <div className="retail-bg-dot" aria-hidden="true" />
      <div className="retail-bg-line" aria-hidden="true" />

      {/* HEADER */}
      <div
        ref={headerRef}
        className={`retail-header ${headerInView ? "r-visible" : "r-hidden"}`}
      >
        <div className="flex items-center gap-3.5 mb-6">
          <div
            className="w-10 h-px"
            style={{ background: "var(--color-gold)" }}
          />
          <span className="eyebrow-text">Retail & Tenant Mix</span>
          <span className="eyebrow-badge">500+ Brands</span>
        </div>

        <h2 className="retail-headline">
          Every Brand
          <br />
          <em>Wants to Be Here.</em>
        </h2>

        <p className="retail-sub">
          From international fashion powerhouses to India's most-loved homegrown
          labels — Nexus Seawoods hosts the MMR's most curated tenant mix across
          four experiential floors. 56% international, 38% national. 92%
          occupancy. The numbers speak for themselves.
        </p>
      </div>

      {/* QUICK STATS ROW */}

      <div ref={statsRef} className="retail-stats-row">
        {RETAIL_STATS.map((s, i) => (
          <div
            key={s.label}
            className={`retail-stat ${statsInView ? "r-visible" : "r-hidden"}`}
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <span className="retail-stat-value">{s.value}</span>
            <span className="retail-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* FLOOR-BY-FLOOR  (tab switcher) */}

      <div
        ref={floorsRef}
        className={`floors-wrap ${floorsInView ? "r-visible" : "r-hidden"}`}
      >
        {/* Section label */}
        <div className="flex items-center gap-3 mb-8">
          <div
            className="w-6 h-px"
            style={{ background: "var(--color-gold)" }}
          />
          <span className="eyebrow-text">Floor by Floor</span>
        </div>

        {/* Tab buttons */}
        <div className="floor-tabs">
          {FLOORS.map((f, i) => (
            <button
              key={f.tag}
              onClick={() => setActiveFloor(i)}
              className={`floor-tab ${activeFloor === i ? "floor-tab--active" : ""}`}
            >
              <span className="floor-tab-tag">{f.tag}</span>
              <span className="floor-tab-name">{f.floor}</span>
            </button>
          ))}
        </div>

        {/* Active floor detail */}
        <div className="floor-detail">
          <div className="floor-detail-left">
            <div
              className="floor-accent-bar"
              style={{ background: FLOORS[activeFloor].color }}
            />
            <p className="floor-theme">{FLOORS[activeFloor].theme}</p>
            <h3 className="floor-title">{FLOORS[activeFloor].floor}</h3>
            <p className="floor-desc">{FLOORS[activeFloor].description}</p>
          </div>

          <div className="floor-brands-grid">
            {FLOORS[activeFloor].brands.map((brand) => (
              <div key={brand} className="brand-chip">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ANCHOR STORES */}

      <div ref={anchorRef} className="anchors-wrap">
        <div className="flex items-center gap-3 mb-8">
          <div
            className="w-6 h-px"
            style={{ background: "var(--color-gold)" }}
          />
          <span className="eyebrow-text">Anchor Stores</span>
        </div>

        <div className="anchors-grid">
          {ANCHORS.map((a, i) => (
            <div
              key={a.name}
              className={`anchor-card ${anchorInView ? "r-visible" : "r-hidden"}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="anchor-top">
                <span className="anchor-icon">{a.icon}</span>
                <span className="anchor-tier">{a.tier}</span>
              </div>
              <h4 className="anchor-name">{a.name}</h4>
              <p className="anchor-area">{a.area}</p>
              {/* Animated width fill */}
              <div className="anchor-bar-track">
                <div
                  className="anchor-bar-fill"
                  style={{
                    width: anchorInView
                      ? `${Math.round((parseInt(a.area.replace(/,/g, "")) / 85000) * 100)}%`
                      : "0%",
                    transitionDelay: `${i * 0.1 + 0.3}s`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORY MIX — horizontal bar chart */}

      <div
        ref={catRef}
        className={`cat-wrap ${catInView ? "r-visible" : "r-hidden"}`}
      >
        <div className="cat-left">
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-6 h-px"
              style={{ background: "var(--color-gold)" }}
            />
            <span className="eyebrow-text">Category Mix</span>
          </div>
          <h3 className="cat-heading">
            A Curated
            <br />
            <em>Ecosystem.</em>
          </h3>
          <p className="cat-sub">
            Retail space is allocated strategically — fashion dominates the
            floor plan while dining, entertainment, and electronics create the
            dwell time that keeps shoppers staying longer and spending more.
          </p>
        </div>

        <div className="cat-chart">
          {CATEGORY_MIX.map((c, i) => (
            <div key={c.label} className="cat-row">
              <div className="cat-row-top">
                <span className="cat-label">{c.label}</span>
                <span className="cat-pct" style={{ color: c.color }}>
                  {c.pct}%
                </span>
              </div>
              <AnimatedBar
                pct={c.pct}
                color={c.color}
                inView={catInView}
                delay={`${i * 0.1}s`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM CTA */}

      <div className="retail-cta-strip">
        <div>
          <p className="retail-cta-heading">Interested in a retail slot?</p>
          <p className="retail-cta-sub">
            Limited prime floor space available. 92% occupancy means the window
            is narrow.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="btn-primary">
            <span className="relative z-10">Enquire About Space →</span>
          </button>
          <button className="btn-secondary">Download Leasing Deck</button>
        </div>
      </div>
    </section>
  );
}
