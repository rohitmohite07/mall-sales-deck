import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: "~1M", sup: "sq ft", label: "Gross Leasable Area", delay: "0s" },
  { value: "11M+", sup: "/yr", label: "Annual Footfall", delay: "0.1s" },
  { value: "38K", sup: "/wknd", label: "Weekend Visitors", delay: "0.2s" },
  { value: "56%", sup: "", label: "International Brands", delay: "0.3s" },
  { value: "92%", sup: "", label: "Mall Occupancy Rate", delay: "0.4s" },
  { value: "13%", sup: "YoY", label: "Sales Growth (2024)", delay: "0.5s" },
];

const PILLARS = [
  {
    number: "01",
    icon: "🚉",
    title: "Born from the Station",
    body: "India's first large-scale transit-oriented mall, built directly above Seawoods–Darave railway station on Mumbai's Harbour Line. Over 50,000 daily commuters walk straight into the mall — zero friction, zero commute.",
    tag: "Transit-Oriented Development",
  },
  {
    number: "02",
    icon: "🗺️",
    title: "A City Within a City",
    body: "Nexus Seawoods isn't just a mall. The 40-acre L&T Grand Central complex integrates premium retail, Cinepolis IMAX (11 screens, 2,300 seats), WeWork offices, corporate towers, and residential blocks — all under one roof.",
    tag: "Integrated Urban Development",
  },
  {
    number: "03",
    icon: "✈️",
    title: "The Future is Coming to You",
    body: "Metro Line 8 (Gold Line) — approved in late 2025 — will pass through Seawoods linking CSMIA and Navi Mumbai International Airport. Direct airport-to-mall access in under 14 minutes. The catchment is about to explode.",
    tag: "Infrastructure Upside",
  },
  {
    number: "04",
    icon: "📍",
    title: "Unmatched Catchment Area",
    body: "Primary catchment spans Seawoods, Nerul, Belapur, Vashi, Sanpada, and Jui Nagar. Secondary catchment reaches Kharghar, Panvel, Chembur, and Ghatkopar — covering the entire Mumbai Metropolitan Region via Palm Beach Road and MTHL.",
    tag: "MMR Catchment",
  },
];

const CONNECTIVITY = [
  {
    mode: "🚆",
    label: "Harbour Line",
    detail: "CST in 32 min · Andheri in 45 min",
  },
  {
    mode: "🚇",
    label: "Metro Line 8",
    detail: "Airport link · Under construction",
  },
  {
    mode: "🛣️",
    label: "Palm Beach Road",
    detail: "South Mumbai via MTHL in 20 min",
  },
  { mode: "✈️", label: "NMIA Airport", detail: "10–12 km · 14 min via metro" },
];

//  INTERSECTION OBSERVER HOOK
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

//  ANIMATED COUNTER
function AnimatedNumber({ value, inView }) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const match = value.match(/^~?([\d.]+)(.*)$/);
    console.log(value, match);

    if (!match) {
      () => setDisplay(value);
      return;
    }

    const target = parseFloat(match[1]);
    const suffix = match[2];
    const duration = 1600;
    const steps = 50;
    let current = 0;

    const interval = setInterval(() => {
      current += 1;
      const progress = current / steps;
      // ease-out curve
      const eased = 1 - Math.pow(1 - progress, 3);
      const num = target * eased;
      setDisplay((num % 1 === 0 ? Math.round(num) : num.toFixed(1)) + suffix);
      if (current >= steps) {
        setDisplay(value);
        clearInterval(interval);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [inView, value]);

  return <>{display}</>;
}

export default function WhyThisMall() {
  const [sectionRef, sectionInView] = useInView(0.1);
  const [statsRef, statsInView] = useInView(0.2);
  const [pillarsRef, pillarsInView] = useInView(0.1);
  const [connectRef, connectInView] = useInView(0.2);

  return (
    <section ref={sectionRef} className="why-section" id="why">
      {/* BACKGROUND DECORATIONS */}
      <div className="why-bg-grid" aria-hidden="true" />
      <div className="why-bg-radial" aria-hidden="true" />
      <div className="why-bg-line" aria-hidden="true" />

      {/* SECTION HEADER */}

      <div
        className={`why-header ${sectionInView ? "why-visible" : "why-hidden"}`}
      >
        {/* Eyebrow */}
        <div className="flex items-center gap-3.5 mb-6">
          <div
            className="w-10 h-px"
            style={{ background: "var(--color-gold)" }}
          />
          <span className="eyebrow-text">The Case for Nexus Seawoods</span>
        </div>

        {/* Headline */}
        <h2 className="why-headline">
          Not Just a Mall.
          <br />
          <em>A City That Shops.</em>
        </h2>

        {/* Sub */}
        <p className="why-sub">
          Navi Mumbai's most visited destination. India's first transit-oriented
          mall. A 40-acre integrated urban development that turns every commuter
          into a customer — and every customer into a community.
        </p>
      </div>

      {/* STATS GRID */}

      <div ref={statsRef} className="stats-grid">
        {STATS.map((s) => (
          <div
            key={s.label}
            className={`stat-card ${statsInView ? "stat-card--visible" : "stat-card--hidden"}`}
            style={{ transitionDelay: s.delay }}
          >
            {/* Top accent line */}
            <div className="stat-card-bar" />

            <div className="flex items-end gap-1 mb-2">
              <span className="stat-card-value">
                <AnimatedNumber value={s.value} inView={statsInView} />
              </span>
              {s.sup && <span className="stat-card-sup">{s.sup}</span>}
            </div>
            <span className="stat-card-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* 4 PILLARS */}

      <div ref={pillarsRef} className="pillars-wrap">
        <div
          className={`pillar-left ${pillarsInView ? "why-visible" : "why-hidden"}`}
        >
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-6 h-px"
              style={{ background: "var(--color-gold)" }}
            />
            <span className="eyebrow-text">Why This Property</span>
          </div>
          <h3 className="pillar-heading">
            Four reasons
            <br />
            <em>
              this deal
              <br />
              makes itself.
            </em>
          </h3>
          <p className="pillar-sub">
            From unrivalled transit access to a future airport corridor, every
            macro trend points to Nexus Seawoods.
          </p>

          <div className="occupancy-callout">
            <span className="occupancy-num">92%</span>
            <div>
              <p className="occupancy-label">Current Occupancy</p>
              <p className="occupancy-note">Limited prime slots available</p>
            </div>
          </div>
        </div>

        <div className="pillar-cards">
          {PILLARS.map((p, i) => (
            <div
              key={p.number}
              className={`pillar-card ${pillarsInView ? "pillar-card--visible" : "pillar-card--hidden"}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="pillar-number">{p.number}</span>
                <span className="pillar-icon">{p.icon}</span>
              </div>
              <h4 className="pillar-title">{p.title}</h4>
              <p className="pillar-body">{p.body}</p>
              <div className="pillar-tag">{p.tag}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CONNECTIVITY STRIP */}

      <div
        ref={connectRef}
        className={`connect-strip ${connectInView ? "why-visible" : "why-hidden"}`}
      >
        <p className="connect-heading">Connected to Everything That Matters</p>

        <div className="connect-grid">
          {CONNECTIVITY.map((c) => (
            <div key={c.label} className="connect-item">
              <span className="connect-icon">{c.mode}</span>
              <div>
                <p className="connect-label">{c.label}</p>
                <p className="connect-detail">{c.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Divider + CTA */}
        <div className="connect-cta-wrap">
          <div className="connect-divider" />
          <button className="btn-primary">
            <span className="relative z-10">View Full Catchment Report →</span>
          </button>
        </div>
      </div>
    </section>
  );
}
