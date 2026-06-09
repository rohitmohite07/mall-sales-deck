import { useRef, useState } from "react";

const ENQUIRY_TYPES = [
  {
    id: "retail",
    label: "Retail Leasing",
    icon: "🛍",
    desc: "Floor space, anchor slots, kiosks",
  },
  {
    id: "luxury",
    label: "Luxury / Premium",
    icon: "✦",
    desc: "Premium brand positioning",
  },
  {
    id: "fnb",
    label: "F&B Outlet",
    icon: "🍽",
    desc: "Restaurant, café, QSR, food court",
  },
  {
    id: "events",
    label: "Event / Activation",
    icon: "◈",
    desc: "Brand activation, sponsorship, IP event",
  },
  {
    id: "sponsorship",
    label: "Sponsorship",
    icon: "◇",
    desc: "Title, co-sponsor, category rights",
  },
  { id: "other", label: "Other", icon: "◉", desc: "General enquiry" },
];

const CONTACT_DETAILS = [
  {
    icon: "📍",
    label: "Address",
    value:
      "Plot No. R1, Seawoods Station Rd, Sector 40, Nerul East, Navi Mumbai — 400706",
    link: "https://maps.google.com/?q=Nexus+Seawoods+Mall+Navi+Mumbai",
    linkLabel: "Open in Maps →",
  },
  {
    icon: "🚆",
    label: "By Train",
    value:
      "Seawoods–Darave Station, Harbour Line. The mall is directly above — no exit needed.",
    link: null,
  },
  {
    icon: "🌐",
    label: "Official Website",
    value: "nexusselecttrust.com/nexus-seawood",
    link: "https://www.nexusselecttrust.com/nexus-seawood",
    linkLabel: "Visit Site →",
  },
  {
    icon: "🕐",
    label: "Mall Hours",
    value: "Monday – Sunday: 11:00 AM – 10:00 PM",
    link: null,
  },
];

const QUICK_FACTS = [
  { value: "~1M", label: "Sq Ft GLA" },
  { value: "500+", label: "Brands" },
  { value: "92%", label: "Occupancy" },
  { value: "11M+", label: "Annual Visitors" },
];

// INTERSECTION OBSERVER HOOK
import { useEffect } from "react";

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

export default function Contact() {
  const [headerRef, headerInView] = useInView(0.1);
  const [formRef, formInView] = useInView(0.08);
  const [detailsRef, detailsInView] = useInView(0.1);
  const [footerRef, footerInView] = useInView(0.15);

  // Form state
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!selected) e.type = "Please select an enquiry type.";
    if (!formData.name.trim()) e.name = "Name is required.";
    if (!formData.company.trim()) e.company = "Company is required.";
    if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = "Valid email required.";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <section id="contact" className="contact-section">
      {/* ── BACKGROUNDS ── */}
      <div className="ct-bg-grid" aria-hidden="true" />
      <div className="ct-bg-glow" aria-hidden="true" />
      <div className="ct-bg-vline" aria-hidden="true" />

      {/* HEADER */}
      <div
        ref={headerRef}
        className={`ct-header ${headerInView ? "ct-visible" : "ct-hidden"}`}
      >
        <div className="flex items-center gap-3.5 mb-6">
          <div
            className="w-10 h-px"
            style={{ background: "var(--color-gold)" }}
          />
          <span className="eyebrow-text">Get in Touch</span>
          <span className="eyebrow-badge">Limited Slots Available</span>
        </div>

        <div className="ct-headline-wrap">
          <h2 className="ct-headline">
            Let's Build
            <br />
            <em>Something Here.</em>
          </h2>
          <p className="ct-sub">
            Whether you're exploring a retail lease, planning a brand
            activation, or looking for a luxury anchor position — the team at
            Nexus Seawoods is ready to talk. 92% occupancy means the window is
            narrow. Reach out before the right slot is gone.
          </p>
        </div>

        {/* Quick facts strip under header */}
        <div className="ct-quick-facts">
          {QUICK_FACTS.map((q) => (
            <div key={q.label} className="ct-quick-fact">
              <span className="ct-quick-value">{q.value}</span>
              <span className="ct-quick-label">{q.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN LAYOUT — form left, details right */}
      <div className="ct-layout">
        {/* ── LEFT: ENQUIRY FORM ── */}
        <div
          ref={formRef}
          className={`ct-form-wrap ${formInView ? "ct-visible" : "ct-hidden"}`}
        >
          {submitted ? (
            /* ── SUCCESS STATE ── */
            <div className="ct-success">
              <div className="ct-success-icon">✓</div>
              <h3 className="ct-success-heading">Enquiry Received.</h3>
              <p className="ct-success-body">
                Thank you, <strong>{formData.name}</strong>. The Nexus Seawoods
                leasing team will be in touch within 2 business days.
              </p>
              <button
                className="btn-secondary"
                style={{ marginTop: "24px" }}
                onClick={() => {
                  setSubmitted(false);
                  setSelected(null);
                  setFormData({
                    name: "",
                    company: "",
                    email: "",
                    phone: "",
                    message: "",
                  });
                }}
              >
                Submit Another Enquiry
              </button>
            </div>
          ) : (
            <>
              {/* Step 1: Enquiry type selector */}
              <p className="ct-step-label">
                01 — What are you enquiring about?
              </p>
              {errors.type && <p className="ct-error">{errors.type}</p>}
              <div className="ct-type-grid">
                {ENQUIRY_TYPES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelected(t.id)}
                    className={`ct-type-btn ${selected === t.id ? "ct-type-btn--active" : ""}`}
                  >
                    <div className="ct-type-top">
                      <span className="ct-type-icon">{t.icon}</span>
                      {selected === t.id && (
                        <span className="ct-type-check">✓</span>
                      )}
                    </div>
                    <p className="ct-type-label">{t.label}</p>
                    <p className="ct-type-desc">{t.desc}</p>
                  </button>
                ))}
              </div>

              {/* Step 2: Contact details */}
              <p className="ct-step-label" style={{ marginTop: "40px" }}>
                02 — Your Details
              </p>

              <div className="ct-fields">
                {/* Name + Company row */}
                <div className="ct-row-2">
                  <div className="ct-field-wrap">
                    <label className="ct-label">Full Name *</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ravi Mehta"
                      className={`ct-input ${errors.name ? "ct-input--error" : ""}`}
                    />
                    {errors.name && <p className="ct-error">{errors.name}</p>}
                  </div>
                  <div className="ct-field-wrap">
                    <label className="ct-label">Company / Brand *</label>
                    <input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Acme Retail Pvt. Ltd."
                      className={`ct-input ${errors.company ? "ct-input--error" : ""}`}
                    />
                    {errors.company && (
                      <p className="ct-error">{errors.company}</p>
                    )}
                  </div>
                </div>

                {/* Email + Phone row */}
                <div className="ct-row-2">
                  <div className="ct-field-wrap">
                    <label className="ct-label">Email Address *</label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ravi@acmeretail.com"
                      className={`ct-input ${errors.email ? "ct-input--error" : ""}`}
                    />
                    {errors.email && <p className="ct-error">{errors.email}</p>}
                  </div>
                  <div className="ct-field-wrap">
                    <label className="ct-label">Phone Number</label>
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="ct-input"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="ct-field-wrap">
                  <label className="ct-label">Message / Requirements</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your brand, the kind of space you're looking for, preferred floor, size requirements, etc."
                    className="ct-input ct-textarea"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="ct-submit-row">
                <button className="btn-primary" onClick={handleSubmit}>
                  <span className="relative z-10">Submit Enquiry →</span>
                </button>
                <p className="ct-disclaimer">
                  By submitting you agree to be contacted by the Nexus Seawoods
                  leasing team. No spam, ever.
                </p>
              </div>
            </>
          )}
        </div>

        {/* ── RIGHT: CONTACT DETAILS + MAP ── */}
        <div
          ref={detailsRef}
          className={`ct-details-wrap ${detailsInView ? "ct-visible" : "ct-hidden"}`}
        >
          {/* Contact info cards */}
          <div className="ct-info-cards">
            {CONTACT_DETAILS.map((d) => (
              <div key={d.label} className="ct-info-card">
                <div className="ct-info-top">
                  <span className="ct-info-icon">{d.icon}</span>
                  <span className="ct-info-label">{d.label}</span>
                </div>
                <p className="ct-info-value">{d.value}</p>
                {d.link && (
                  <a
                    href={d.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ct-info-link"
                  >
                    {d.linkLabel}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Embedded map placeholder — styled consistently */}
          <div className="ct-map-wrap">
            <iframe
              title="Nexus Seawoods Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.5!2d73.0182944!3d19.0215722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c3b1b1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sNexus%20Seawoods!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: "grayscale(1) invert(0.9) contrast(0.85)",
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="ct-map-overlay">
              <div className="ct-map-pin">
                <span className="ct-map-pin-dot" />
              </div>
              <p className="ct-map-label">Nexus Seawoods</p>
              <p className="ct-map-sub">Seawoods–Darave, Navi Mumbai</p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER STRIP */}
      <div
        ref={footerRef}
        className={`ct-footer ${footerInView ? "ct-visible" : "ct-hidden"}`}
      >
        <div className="ct-footer-left">
          <p className="ct-footer-logo">Nexus Seawoods</p>
          <p className="ct-footer-tagline">
            India's First Transit-Oriented Mall · Est. 2017 · Navi Mumbai
          </p>
          <p className="ct-footer-copy">
            © 2025 Nexus Select Trust. All rights reserved.
            <br />
            This sales deck is for presentation purposes only.
          </p>
        </div>

        <div className="ct-footer-right">
          <p className="ct-footer-nav-label">Explore</p>
          <div className="ct-footer-nav">
            {[
              "Overview",
              "Retail",
              "Luxury",
              "Dining",
              "Events",
              "Contact",
            ].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="ct-footer-nav-link"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className="ct-footer-right">
          <p className="ct-footer-nav-label">Built by</p>
          <p className="ct-footer-built">
            Designed & developed as a frontend screening assignment.
            <br />
            by Rohit Mohite
          </p>
          <p className="ct-footer-nav-label" style={{ marginTop: "16px" }}>
            Ownership
          </p>
          <p className="ct-footer-built">
            Owned & operated by Nexus Select Trust (BSE: 543725).
          </p>
        </div>
      </div>
    </section>
  );
}
