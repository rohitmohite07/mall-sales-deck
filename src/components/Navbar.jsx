import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  "Overview",
  "Retail",
  "Luxury",
  "Dining",
  "Events",
  "Contact",
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("Overview");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      setNavScrolled(window.scrollY > 60);

      const sections = [
        { id: "overview", label: "Overview" },
        { id: "retail", label: "Retail" },
        { id: "luxury", label: "Luxury" },
        { id: "dining", label: "Dining" },
        { id: "events", label: "Events" },
        { id: "contact", label: "Contact" },
      ];

      sections.forEach((section) => {
        const el = document.getElementById(section.id);

        if (!el) return;

        const top = el.offsetTop;
        const height = el.offsetHeight;

        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveNav(section.label);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`nav-base ${navScrolled ? "nav-scrolled" : "nav-top"}`}>
      {/* Logo */}
      <a href="#" className="nav-logo">
        <span className="nav-dot" />
        Nexus Seawoods
      </a>

      {/* Desktop */}
      <ul className="hidden lg:flex gap-9 list-none">
        {NAV_ITEMS.map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase()}`}
              onClick={() => setActiveNav(item)}
              className={`nav-link ${
                activeNav === item ? "nav-link--active" : ""
              }`}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      {/* Desktop CTA */}
      <button className="hidden lg:block btn-nav-cta">Book a Tour</button>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden text-white"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile / Tablet Menu */}
      <div
        className={`absolute top-full -translate-y-7 left-0 w-full bg-black/95 backdrop-blur-xl border-t border-white/10 transition-all duration-300 lg:hidden ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <ul className="flex flex-col py-6">
          {NAV_ITEMS.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className={`block px-6 py-4 nav-link ${
                  activeNav === item ? "nav-link--active" : ""
                }`}
                onClick={() => {
                  setActiveNav(item);
                  setMobileOpen(false);
                }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        <div className="px-6 pb-6">
          <button className="btn-nav-cta w-full">Book a Tour</button>
        </div>
      </div>
    </nav>
  );
}
