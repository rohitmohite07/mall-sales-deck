import { useEffect, useRef, useState } from "react";
import heroVideo from "../assets/videos/mall-hero.mp4";

const STATS = [
  { value: "1.2M", label: "Sq. Ft. of Experience" },
  { value: "11M+", label: "Annual Visitors" },
  { value: "500+", label: "Brands & Outlets" },
  { value: "99%", label: "Occupancy Rate" },
];

export default function Hero() {
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMouse = (e) =>
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 10,
      });
    window.addEventListener("mousemove", onMouse);
    return () => window.removeEventListener("mousemove", onMouse);
  }, []);

  return (
    <>
      <section className="relative w-full h-screen min-h-175 overflow-hidden flex items-end">
        {/* Video layer */}
        <div className="absolute inset-0 z-0">
          <div
            className={`skeleton-loader ${videoLoaded ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          >
            <span className="skeleton-text">NEXUS</span>
          </div>

          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            onCanPlay={() => setVideoLoaded(true)}
            className="video-bg"
            style={{ transform: `translateY(${scrollY * 0.12}px)` }}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        </div>

        {/* Overlays */}
        <div className="overlay-bottom" />
        <div className="overlay-left" />
        <div className="grain-texture" />
        <div className="accent-vline" />

        {/* India-first badge */}
        <div className="india-badge">
          <div className="india-pill">India's First Transit Mall</div>
          <p
            className="text-sm italic text-right"
            style={{
              color: "rgba(245,240,232,0.4)",
              fontFamily: "var(--font-display)",
            }}
          >
            Est. 2017 · Navi Mumbai
          </p>
        </div>

        {/* Main content — mouse parallax wrapper */}
        <div
          className="relative z-10 w-full hero-enter"
          style={{
            transform: `translate(${mousePos.x * 0.25}px, ${mousePos.y * 0.15}px)`,
            transition: "transform 0.9s ease-out",
          }}
        >
          <div className="px-20 max-md:px-6">
            <div
              className="flex items-center gap-3.5 mb-5 animate-rise"
              style={{ animationDelay: "0.2s" }}
            >
              <div
                className="w-10 h-px"
                style={{ background: "var(--color-gold)" }}
              />
              <span className="eyebrow-text">
                Navi Mumbai · Maharashtra · India
              </span>
              <span className="eyebrow-badge">Sales Deck 2026</span>
            </div>

            {/* Headline */}
            <h1
              className="hero-title animate-rise"
              style={{ animationDelay: "0.35s" }}
            >
              Where <em>Mumbai</em> Meets
              <span className="block font-semibold">The Future of Retail.</span>
            </h1>

            {/* Subheading */}
            <p
              className="hero-sub animate-rise"
              style={{ animationDelay: "0.5s" }}
            >
              India's first large-scale transit-oriented mall. 1.2
              million&nbsp;sq.&nbsp;ft. of curated retail, dining, and
              entertainment — built directly above Seawoods–Darave Railway
              Station.
            </p>

            {/* CTAs */}
            <div
              className="flex items-center gap-5 mb-16 animate-rise"
              style={{ animationDelay: "0.65s" }}
            >
              <button className="btn-primary">
                <span className="relative z-10">Explore Opportunities</span>
              </button>
              <button className="btn-secondary">Watch Film ↗</button>

              {/* Scroll indicator */}
              <div className="flex items-center gap-2.5 ml-auto cursor-pointer">
                <div
                  className="relative w-px h-12 overflow-hidden"
                  style={{ background: "rgba(245,240,232,0.18)" }}
                >
                  <div className="scroll-fill" />
                </div>
                <span className="scroll-label">Scroll</span>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div
            className="stats-bar animate-rise"
            style={{ animationDelay: "0.9s" }}
          >
            {STATS.map((s) => (
              <div className="stat-item" key={s.label}>
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
