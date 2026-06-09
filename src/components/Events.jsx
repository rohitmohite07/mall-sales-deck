import { useEffect, useRef, useState } from "react";

const EVENT_STATS = [
  { value: "50+", label: "Events Per Year" },
  { value: "3", label: "Signature IP Festivals" },
  { value: "38K", label: "Weekend Footfall per Event" },
  { value: "10K+", label: "Attendees per Major Event" },
];

// events
const SIGNATURE_EVENTS = [
  {
    id: "glossbox",
    edition: "3rd Edition · Nov 2025",
    name: "The Gloss Box",
    category: "Beauty Festival",
    color: "#e8b4c8",
    icon: "✦",
    tagline: "Navi Mumbai's Biggest Beauty Festival",
    description:
      "Nexus Seawoods' own IP event — now in its third edition. A month-long beauty festival running through November, bringing MAC, Sephora, Nykaa, Tira, Forest Essentials, Kama Ayurveda, SUGAR, The Body Shop, Tata Cliq, Renee, and Maybelline under one roof. Live demos, expert makeover zones, 2X reward points, and Shop & Win prizes. The event has grown every year since its 2023 debut.",
    brands: [
      "MAC",
      "Sephora",
      "Nykaa",
      "Tira",
      "Forest Essentials",
      "SUGAR",
      "Kama Ayurveda",
      "Maybelline",
    ],
    metrics: [
      { label: "Editions run", value: "3" },
      { label: "Brands involved", value: "12+" },
      { label: "Duration", value: "30 days" },
    ],
  },
  {
    id: "denimsneaker",
    edition: "4th Edition · Jun 2025",
    name: "Denim & Sneaker Fest",
    category: "Fashion Festival",
    color: "#a8c5da",
    icon: "◈",
    tagline: "Back-to-College Fashion Event",
    description:
      "Now in its 4th edition, timed to the back-to-school and college season. Features sneaker customisation workshops, denim upcycling sessions, DIY stations, product launches from international and domestic fashion brands, and themed visual merchandising across all common areas. Drives repeat visits during the summer shopping dip.",
    brands: [
      "Levi's",
      "Nike",
      "Adidas",
      "Superdry",
      "Puma",
      "H&M",
      "Calvin Klein",
      "Tommy Hilfiger",
    ],
    metrics: [
      { label: "Editions run", value: "4" },
      { label: "Season", value: "June" },
      { label: "Activation type", value: "DIY + Retail" },
    ],
  },
  {
    id: "techstination",
    edition: "2025 Edition",
    name: "Techstination",
    category: "Tech Festival",
    color: "#a8d4b8",
    icon: "◇",
    tagline: "Navi Mumbai's Tech Deals Festival",
    description:
      "A tech-focused shopping festival featuring deals, product launches, and giveaways from Samsung, OnePlus, and other electronics brands. Drives high-value electronics transactions during the event window and brings a younger, tech-savvy demographic that supplements the core family audience.",
    brands: ["Samsung", "OnePlus", "Croma", "Reliance Digital", "HP", "Dyson"],
    metrics: [
      { label: "Focus", value: "Electronics" },
      { label: "Key brands", value: "Samsung, OnePlus" },
      { label: "Audience", value: "18–35 Tech" },
    ],
  },
  {
    id: "pokemon",
    edition: "2025",
    name: "Pokémon GO Fest",
    category: "Gaming × AR",
    color: "#f0d080",
    icon: "◉",
    tagline: "India's First Mall-Based AR Gaming Event",
    description:
      "Nexus Seawoods was one of five Nexus Malls chosen by Niantic to host Pokémon GO Fest 2025 — India's first large-scale AR gaming event inside a shopping mall. Featured Volcanion's in-game debut, physical pop-up zones, and drove 10,000+ attendees in a single weekend. Proof of concept for gaming-led footfall events.",
    brands: ["Niantic", "Pokémon GO", "Nexus Select Trust"],
    metrics: [
      { label: "Attendees", value: "10,000+" },
      { label: "Format", value: "AR + Physical" },
      { label: "Unique angle", value: "India First" },
    ],
  },
];

// Activation zones / venue spaces
const VENUES = [
  {
    name: "Central Atrium",
    area: "~8,000 sq ft",
    icon: "🏛",
    capacity: "2,000+ standing",
    best_for: "Launches, concerts, brand activations, festive décor",
    note: "Prime visibility from all 4 floors",
  },
  {
    name: "Cinepolis Foyer",
    area: "~3,500 sq ft",
    icon: "🎬",
    capacity: "500–800 standing",
    best_for: "Film premieres, OTT launch events, gaming activations",
    note: "Next to 11-screen IMAX multiplex",
  },
  {
    name: "Kiosk Corridors",
    area: "Across all 4 floors",
    icon: "🛍",
    capacity: "Pop-up format",
    best_for: "Product sampling, brand pop-ups, beauty demos",
    note: "High footfall corridors near anchor stores",
  },
  {
    name: "Food Court Piazza",
    area: "~5,000 sq ft",
    icon: "🍽",
    capacity: "1,200 seated",
    best_for: "F&B launches, chef events, food festivals",
    note: "Adjacent to Hard Rock Cafe",
  },
];

// Sponsorship tiers
const SPONSORSHIP_TIERS = [
  {
    tier: "Title Sponsor",
    color: "#c9a84c",
    perks: [
      "Naming rights to the event",
      "Central atrium branding",
      "All digital and OOH assets",
      "Dedicated activation zone",
      "PR and press coverage",
      "Social media integration",
    ],
  },
  {
    tier: "Co-Sponsor",
    color: "#a8c5da",
    perks: [
      "Co-branding on all collateral",
      "Kiosk activation zone",
      "Inclusion in digital campaigns",
      "On-ground sampling rights",
      "Event-day announcements",
    ],
  },
  {
    tier: "Category Sponsor",
    color: "#c8a4d4",
    perks: [
      "Category exclusivity",
      "Branded product zone",
      "Social media mentions",
      "Footfall data post-event",
    ],
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

export default function Events() {
  const [headerRef, headerInView] = useInView(0.1);
  const [statsRef, statsInView] = useInView(0.2);
  const [eventsRef, eventsInView] = useInView(0.08);
  const [venuesRef, venuesInView] = useInView(0.1);
  const [sponsorRef, sponsorInView] = useInView(0.1);
  const [ctaRef, ctaInView] = useInView(0.2);

  const [activeEvent, setActiveEvent] = useState(0);

  return (
    <section id="events" className="events-section">
      {/* ── BACKGROUNDS ── */}
      <div className="ev-bg-grid" aria-hidden="true" />
      <div className="ev-bg-glow" aria-hidden="true" />
      <div className="ev-bg-vline" aria-hidden="true" />

      {/* HEADER */}
      <div
        ref={headerRef}
        className={`ev-header ${headerInView ? "ev-visible" : "ev-hidden"}`}
      >
        <div className="flex items-center gap-3.5 mb-6">
          <div
            className="w-10 h-px"
            style={{ background: "var(--color-gold)" }}
          />
          <span className="eyebrow-text">Events & Activations</span>
          <span className="eyebrow-badge">50+ Events/Year</span>
        </div>

        <div className="ev-headline-wrap">
          <h2 className="ev-headline">
            The Mall That
            <br />
            <em>Never Stops</em>
            <br />
            Performing.
          </h2>
          <div>
            <p className="ev-sub">
              Nexus Seawoods runs 50+ events annually — from its own IP
              festivals like The Gloss Box (3rd edition, Nov 2025) and Denim &
              Sneaker Fest (4th edition, Jun 2025), to Pokémon GO Fest,
              Techstination, Diwali spectacles, and live music nights. Every
              event is a new reason for 38,000 weekend visitors to show up.
            </p>
            {/* Live event callout */}
            <div className="ev-live-badge">
              <span className="ev-live-dot" />
              <span>Denim &amp; Sneaker Fest — Live Now · Jun 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* STATS ROW */}
      <div ref={statsRef} className="ev-stats-row">
        {EVENT_STATS.map((s, i) => (
          <div
            key={s.label}
            className={`ev-stat ${statsInView ? "ev-visible" : "ev-hidden"}`}
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <span className="ev-stat-value">{s.value}</span>
            <span className="ev-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* SIGNATURE IP EVENTS — card + detail layout */}
      <div
        ref={eventsRef}
        className={`ev-events-wrap ${eventsInView ? "ev-visible" : "ev-hidden"}`}
      >
        <div className="flex items-center gap-3 mb-8">
          <div
            className="w-6 h-px"
            style={{ background: "var(--color-gold)" }}
          />
          <span className="eyebrow-text">Signature IP Events</span>
        </div>

        <div className="ev-layout">
          {/* Left: event selector cards */}
          <div className="ev-cards">
            {SIGNATURE_EVENTS.map((e, i) => (
              <button
                key={e.id}
                onClick={() => setActiveEvent(i)}
                className={`ev-card ${activeEvent === i ? "ev-card--active" : ""}`}
                style={{ "--ev-color": e.color }}
              >
                <div
                  className="ev-card-left-bar"
                  style={{
                    background: activeEvent === i ? e.color : "transparent",
                  }}
                />
                <div className="ev-card-body">
                  <div className="flex items-center justify-between mb-1">
                    <span className="ev-card-category">{e.category}</span>
                    <span className="ev-card-edition">{e.edition}</span>
                  </div>
                  <p className="ev-card-name">{e.name}</p>
                  <p className="ev-card-tagline">{e.tagline}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Right: event detail panel */}
          <div className="ev-detail">
            {/* Top accent */}
            <div
              className="ev-detail-topbar"
              style={{ background: SIGNATURE_EVENTS[activeEvent].color }}
            />

            {/* Header */}
            <div className="ev-detail-header">
              <span
                className="ev-detail-icon"
                style={{ color: SIGNATURE_EVENTS[activeEvent].color }}
              >
                {SIGNATURE_EVENTS[activeEvent].icon}
              </span>
              <div>
                <p className="ev-detail-tag">
                  {SIGNATURE_EVENTS[activeEvent].category} ·{" "}
                  {SIGNATURE_EVENTS[activeEvent].edition}
                </p>
                <h3 className="ev-detail-name">
                  {SIGNATURE_EVENTS[activeEvent].name}
                </h3>
              </div>
            </div>

            {/* Description */}
            <p className="ev-detail-desc">
              {SIGNATURE_EVENTS[activeEvent].description}
            </p>

            {/* Key metrics */}
            <div className="ev-metrics">
              {SIGNATURE_EVENTS[activeEvent].metrics.map((m) => (
                <div key={m.label} className="ev-metric">
                  <span
                    className="ev-metric-value"
                    style={{ color: SIGNATURE_EVENTS[activeEvent].color }}
                  >
                    {m.value}
                  </span>
                  <span className="ev-metric-label">{m.label}</span>
                </div>
              ))}
            </div>

            {/* Participating brands */}
            <div className="ev-detail-brands">
              <p className="ev-brands-label">Participating Brands</p>
              <div className="flex flex-wrap gap-2">
                {SIGNATURE_EVENTS[activeEvent].brands.map((b) => (
                  <span key={b} className="ev-brand-chip">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VENUE SPACES */}
      <div ref={venuesRef} className="ev-venues-wrap">
        <div
          className={`flex items-center gap-3 mb-8 ${venuesInView ? "ev-visible" : "ev-hidden"}`}
        >
          <div
            className="w-6 h-px"
            style={{ background: "var(--color-gold)" }}
          />
          <span className="eyebrow-text">Activation Venues</span>
        </div>

        <div className="ev-venues-grid">
          {VENUES.map((v, i) => (
            <div
              key={v.name}
              className={`ev-venue-card ${venuesInView ? "ev-visible" : "ev-hidden"}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="ev-venue-top">
                <span className="ev-venue-icon">{v.icon}</span>
                <span className="ev-venue-area">{v.area}</span>
              </div>
              <h4 className="ev-venue-name">{v.name}</h4>
              <p className="ev-venue-capacity">{v.capacity}</p>
              <div className="ev-venue-divider" />
              <p className="ev-venue-best">
                <span className="ev-venue-best-label">Best for: </span>
                {v.best_for}
              </p>
              <p className="ev-venue-note">{v.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SPONSORSHIP TIERS */}
      <div ref={sponsorRef} className="ev-sponsor-wrap">
        <div
          className={`ev-sponsor-header ${sponsorInView ? "ev-visible" : "ev-hidden"}`}
        >
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-6 h-px"
              style={{ background: "var(--color-gold)" }}
            />
            <span className="eyebrow-text">Sponsorship Opportunities</span>
          </div>
          <h3 className="ev-sponsor-heading">
            Put Your Brand
            <br />
            <em>in the Centre of It All.</em>
          </h3>
          <p className="ev-sponsor-sub">
            Every event is a co-branding opportunity. From title sponsorship of
            The Gloss Box to category activation at Techstination — 38,000
            weekend visitors see your brand, not just a banner.
          </p>
        </div>

        <div className="ev-tiers">
          {SPONSORSHIP_TIERS.map((t, i) => (
            <div
              key={t.tier}
              className={`ev-tier-card ${sponsorInView ? "ev-visible" : "ev-hidden"}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="ev-tier-bar" style={{ background: t.color }} />
              <h4 className="ev-tier-name" style={{ color: t.color }}>
                {t.tier}
              </h4>
              <ul className="ev-tier-perks">
                {t.perks.map((p) => (
                  <li key={p} className="ev-tier-perk">
                    <span
                      className="ev-tier-dot"
                      style={{ background: t.color }}
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* CTA STRIP */}
      <div
        ref={ctaRef}
        className={`ev-cta-strip ${ctaInView ? "ev-visible" : "ev-hidden"}`}
      >
        <div>
          <p className="ev-cta-heading">Want to activate at Nexus Seawoods?</p>
          <p className="ev-cta-sub">
            50+ events a year. 38,000 weekend visitors. India's first transit
            mall. Your brand deserves a bigger stage.
          </p>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <button className="btn-primary">
            <span className="relative z-10">Book an Activation →</span>
          </button>
          <button className="btn-secondary">Download Events Calendar</button>
        </div>
      </div>
    </section>
  );
}
