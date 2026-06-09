import { useEffect, useRef, useState } from "react";

const DINING_STATS = [
  { value: "40+", label: "Restaurants & Cafés" },
  { value: "1,200", label: "Seat Food Court" },
  { value: "Only", label: "Hard Rock Café in Navi Mumbai" },
  { value: "11%", label: "of GLA Dedicated to F&B" },
];

// Dining tiers
const DINING_TIERS = [
  {
    id: "signature",
    tier: "01",
    label: "Signature Dining",
    tagline: "Destination restaurants that drive footfall",
    color: "#c9a84c",
    description:
      "Navi Mumbai's most sought-after dining addresses. Hard Rock Cafe — the only one in Navi Mumbai — anchors the entertainment floor alongside Punjab Grill's regal North Indian experience. These are the restaurants people plan their evening around, not just visit after shopping.",
    outlets: [
      {
        name: "Hard Rock Cafe",
        cuisine: "American · Continental · Live Music",
        note: "Only one in Navi Mumbai",
      },
      {
        name: "Punjab Grill",
        cuisine: "North Indian · Mughlai · Kebabs",
        note: "Fine Dining",
      },
      {
        name: "Copper Chimney",
        cuisine: "Indian · Dal Makhani · Tandoor",
        note: "Heritage Brand",
      },
      {
        name: "Barbeque Nation",
        cuisine: "Live Grill · Buffet · Indian",
        note: "Most Popular",
      },
      {
        name: "Toscano",
        cuisine: "Italian · Mediterranean",
        note: "Premium Casual",
      },
      {
        name: "California Pizza Kitchen",
        cuisine: "Pizza · Pasta · American",
        note: "International Chain",
      },
    ],
  },
  {
    id: "casual",
    tier: "02",
    label: "Casual & All-Day",
    tagline: "High-traffic, high-frequency everyday dining",
    color: "#a8c5da",
    description:
      "The everyday dining layer — Starbucks for the morning commuter, Chili's for a weekday lunch, Pop Tate's for post-movie drinks. These outlets benefit directly from the 50,000 daily commuters who pass through the station and are the backbone of weekday F&B revenue.",
    outlets: [
      {
        name: "Starbucks",
        cuisine: "Specialty Coffee · Beverages",
        note: "Premium Café",
      },
      {
        name: "Chili's",
        cuisine: "Tex-Mex · Burgers · American",
        note: "International",
      },
      {
        name: "Nando's",
        cuisine: "Peri-Peri Chicken · Portuguese",
        note: "International",
      },
      {
        name: "Pop Tate's",
        cuisine: "Bar · American · Casual",
        note: "Popular Hangout",
      },
      {
        name: "Aromas Cafe",
        cuisine: "Café · Bistro · Continental",
        note: "Casual Dine",
      },
      {
        name: "Jamie's Pizzeria",
        cuisine: "Pizza · Italian · Artisan",
        note: "Jamie Oliver",
      },
    ],
  },
  {
    id: "quickbites",
    tier: "03",
    label: "Quick Bites & QSR",
    tagline: "Global QSR brands serving peak-hour volumes",
    color: "#a8d4b8",
    description:
      "The quick-service layer drives the highest transaction volumes. McDonald's, KFC, Burger King, and Pizza Hut cater to the family audience and the post-cinema crowd. Strategically positioned near Cinepolis on the entertainment floor to capture peak-time footfall.",
    outlets: [
      {
        name: "McDonald's",
        cuisine: "Burgers · Fries · Beverages",
        note: "Global QSR",
      },
      { name: "KFC", cuisine: "Fried Chicken · Wraps", note: "Global QSR" },
      {
        name: "Burger King",
        cuisine: "Burgers · Whopper · Fries",
        note: "Global QSR",
      },
      {
        name: "Pizza Hut",
        cuisine: "Pizza · Pasta · Sides",
        note: "Global QSR",
      },
      {
        name: "Sbarro",
        cuisine: "New York Pizza · Pasta",
        note: "Italian QSR",
      },
      {
        name: "Cinnabon",
        cuisine: "Cinnamon Rolls · Bakery",
        note: "Dessert QSR",
      },
    ],
  },
  {
    id: "foodcourt",
    tier: "04",
    label: "Food Court & Street",
    tagline: "1,200-seat multi-cuisine hub",
    color: "#c8a4d4",
    description:
      "The 1,200-seat food court is the beating heart of the F&B floor — Navi Mumbai's largest. It covers 10+ cuisine types: North Indian, South Indian, Chinese, Lebanese, Thai, Italian, and more. Supported by street-food kiosks including Chaayos, Cinnabon, Belgian Waffles, Baskin Robbins, and Keventers.",
    outlets: [
      {
        name: "Shiv Sagar",
        cuisine: "South Indian · Vegetarian",
        note: "Heritage Brand",
      },
      { name: "Chaayos", cuisine: "Chai · Snacks · Indian", note: "Kiosk" },
      { name: "Keventers", cuisine: "Milkshakes · Desserts", note: "Kiosk" },
      { name: "Belgian Waffles", cuisine: "Waffles · Desserts", note: "Kiosk" },
      {
        name: "Baskin Robbins",
        cuisine: "Ice Cream · Desserts",
        note: "Kiosk",
      },
      {
        name: "Biryani House",
        cuisine: "Biryani · North Indian",
        note: "Food Court",
      },
    ],
  },
];

// Why F&B matters — the dwell time story
const DWELL_POINTS = [
  {
    icon: "⏱",
    stat: "2.5×",
    label: "Longer dwell time",
    body: "Shoppers who visit a restaurant stay 2.5× longer in the mall than those who don't — directly increasing retail sales per visit.",
  },
  {
    icon: "📅",
    stat: "3×",
    label: "Visit frequency",
    body: "F&B-led malls see 3× higher visit frequency. The lunch crowd and post-work dinner crowd are repeat visitors who didn't come to shop but do.",
  },
  {
    icon: "🌆",
    stat: "6 PM+",
    label: "Evening economy",
    body: "Hard Rock Cafe and Punjab Grill anchor the evening economy — keeping the mall buzzing post-cinema and converting Friday night diners into Saturday shoppers.",
  },
  {
    icon: "🚉",
    stat: "50K",
    label: "Daily commuters",
    body: "50,000 daily commuters above the railway station create a built-in breakfast, lunch, and chai-break audience that no standalone restaurant can match.",
  },
];

//  INTERSECTION OBSERVER HOOK
function useInView(threshold = 0.1) {
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

export default function Dining() {
  const [headerRef, headerInView] = useInView(0.1);
  const [statsRef, statsInView] = useInView(0.2);
  const [dwellRef, dwellInView] = useInView(0.1);
  const [tiersRef, tiersInView] = useInView(0.08);
  const [ctaRef, ctaInView] = useInView(0.2);

  const [activeTier, setActiveTier] = useState(0);

  return (
    <section id="dining" className="dining-section">
      {/* ── BACKGROUNDS ── */}
      <div className="din-bg-lines" aria-hidden="true" />
      <div className="din-bg-radial" aria-hidden="true" />
      <div className="din-bg-vline" aria-hidden="true" />

      {/* HEADER */}
      <div
        ref={headerRef}
        className={`din-header ${headerInView ? "dn-visible" : "dn-hidden"}`}
      >
        <div className="flex items-center gap-3.5 mb-6">
          <div
            className="w-10 h-px"
            style={{ background: "var(--color-gold)" }}
          />
          <span className="eyebrow-text">Dining & F&B</span>
          <span className="eyebrow-badge">40+ Outlets</span>
        </div>

        <div className="din-headline-wrap">
          <h2 className="din-headline">
            Food Doesn't
            <br />
            <em>Follow Footfall.</em>
            <br />
            It Creates It.
          </h2>
          <div className="din-headline-right">
            <p className="din-sub">
              Nexus Seawoods is Navi Mumbai's largest food and entertainment hub
              — home to 40+ restaurants, the only Hard Rock Cafe in Navi Mumbai,
              a 1,200-seat food court, and a full street-food kiosk corridor.
              F&B isn't an amenity here. It's an anchor.
            </p>
            <div className="din-unique-tag">
              <span className="din-unique-icon">★</span>
              <span>Only Hard Rock Cafe in Navi Mumbai</span>
            </div>
          </div>
        </div>
      </div>

      {/* STATS ROW */}
      <div ref={statsRef} className="din-stats-row">
        {DINING_STATS.map((s, i) => (
          <div
            key={s.label}
            className={`din-stat ${statsInView ? "dn-visible" : "dn-hidden"}`}
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <span className="din-stat-value">{s.value}</span>
            <span className="din-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* DWELL TIME STORY — 4 cards */}
      <div ref={dwellRef} className="dwell-wrap">
        <div
          className={`dwell-header ${dwellInView ? "dn-visible" : "dn-hidden"}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-6 h-px"
              style={{ background: "var(--color-gold)" }}
            />
            <span className="eyebrow-text">The F&B Advantage</span>
          </div>
          <h3 className="dwell-heading">
            Why dining is your
            <br />
            <em>highest-ROI activation.</em>
          </h3>
        </div>

        <div className="dwell-cards">
          {DWELL_POINTS.map((d, i) => (
            <div
              key={d.label}
              className={`dwell-card ${dwellInView ? "dn-visible" : "dn-hidden"}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="dwell-card-top">
                <span className="dwell-icon">{d.icon}</span>
                <span className="dwell-stat">{d.stat}</span>
              </div>
              <p className="dwell-label">{d.label}</p>
              <p className="dwell-body">{d.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* DINING TIER EXPLORER — tab switcher */}
      <div
        ref={tiersRef}
        className={`tiers-wrap ${tiersInView ? "dn-visible" : "dn-hidden"}`}
      >
        <div className="flex items-center gap-3 mb-8">
          <div
            className="w-6 h-px"
            style={{ background: "var(--color-gold)" }}
          />
          <span className="eyebrow-text">Dining Portfolio</span>
        </div>

        {/* Tier tabs — horizontal */}
        <div className="tier-tabs">
          {DINING_TIERS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActiveTier(i)}
              className={`tier-tab ${activeTier === i ? "tier-tab--active" : ""}`}
              style={{ "--tier-color": t.color }}
            >
              <span className="tier-tab-num">{t.tier}</span>
              <div className="tier-tab-text">
                <span className="tier-tab-label">{t.label}</span>
                <span className="tier-tab-tagline">{t.tagline}</span>
              </div>
              {/* Active indicator bar */}
              <div
                className="tier-tab-bar"
                style={{
                  background: activeTier === i ? t.color : "transparent",
                }}
              />
            </button>
          ))}
        </div>

        {/* Active tier panel */}
        <div className="tier-panel">
          {/* Left: description */}
          <div className="tier-panel-left">
            <div
              className="tier-panel-accent"
              style={{ background: DINING_TIERS[activeTier].color }}
            />
            <p className="tier-panel-num">{DINING_TIERS[activeTier].tier}</p>
            <h3 className="tier-panel-title">
              {DINING_TIERS[activeTier].label}
            </h3>
            <p className="tier-panel-desc">
              {DINING_TIERS[activeTier].description}
            </p>
          </div>

          {/* Right: outlet cards */}
          <div className="tier-outlets">
            {DINING_TIERS[activeTier].outlets.map((o) => (
              <div key={o.name} className="outlet-card">
                {/* Coloured left bar per tier */}
                <div
                  className="outlet-bar"
                  style={{ background: DINING_TIERS[activeTier].color }}
                />
                <div className="outlet-content">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="outlet-name">{o.name}</p>
                    <span
                      className="outlet-note"
                      style={{ color: DINING_TIERS[activeTier].color }}
                    >
                      {o.note}
                    </span>
                  </div>
                  <p className="outlet-cuisine">{o.cuisine}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA STRIP */}
      <div
        ref={ctaRef}
        className={`din-cta-strip ${ctaInView ? "dn-visible" : "dn-hidden"}`}
      >
        <div className="flex-1">
          <p className="din-cta-heading">Looking for an F&B slot?</p>
          <p className="din-cta-sub">
            40+ outlets, 50,000 daily commuters, and Navi Mumbai's highest dwell
            time. Limited F&B positions available.
          </p>
        </div>
        <div className="flex items-center gap-4 flex-wrap flex-1">
          <button className="btn-primary">
            <span className="relative z-10">Enquire About F&B Space →</span>
          </button>
          <button className="btn-secondary">Download F&B Deck</button>
        </div>
      </div>
    </section>
  );
}
