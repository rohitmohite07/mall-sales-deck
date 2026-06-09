# Nexus Seawoods — Interactive Sales Deck

A cinematic, single-page sales pitch tool for **Nexus Seawoods Mall, Navi Mumbai** — India's first large-scale transit-oriented mall. Built as a frontend screening assignment for a real estate / proptech company.

**Live Demo →** `https://mall-sales-deck-self.vercel.app/`
**GitHub →** `https://github.com/rohitmohite07/mall-sales-deck.git`

---

## What This Is

A browser-based interactive sales deck designed for a salesperson to pitch to:

- **Retail brands** — leasing floor space
- **Luxury / premium brands** — positioning in Navi Mumbai's emerging premium corridor
- **F&B operators** — restaurant, café, QSR, food court slots
- **Event organizers & sponsors** — activation zones, IP events, title sponsorships

The goal: make a prospect feel _"I need to be here"_ within 10 seconds of opening the link.

---

## Tech Stack

| Tool         | Version | Why                                                                       |
| ------------ | ------- | ------------------------------------------------------------------------- |
| React        | 19      | Component-based, modular section architecture                             |
| Vite         | 8       | Instant HMR, fast production builds                                       |
| Tailwind CSS | 4.3     | Utility-first styling; design tokens via `@theme` in CSS (no config file) |
| Vercel       | —       | Zero-config deployment, auto-deploy on push                               |

> **Tailwind v4 note:** No `tailwind.config.js` exists in this project. All brand tokens (`--color-gold`, `--font-display`, etc.) are defined inside `@theme {}` in `src/styles/hero.css` and picked up automatically by Tailwind.

---

## Project Structure

```
nexus-seawoods-sales-deck/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── videos/
│   │       └── mall-hero.mp4          ← hero background video (not in repo)
│   ├── components/
│   │   ├── Navbar.jsx                 ← fixed nav, smooth scroll, blur on scroll
│   │   ├── Hero.jsx                   ← fullscreen video, parallax, stats bar
│   │   ├── WhyThisMall.jsx            ← animated counters, 4 pillars, connectivity
│   │   ├── Retail.jsx                 ← floor tabs, brand chips, category chart
│   │   ├── Luxury.jsx                 ← category explorer, demographic strip
│   │   ├── Dining.jsx                 ← tier explorer, dwell-time story
│   │   ├── Events.jsx                 ← IP events, venue cards, sponsorship tiers
│   │   ├── Contact.jsx                ← enquiry form, map, footer
│   ├── styles/
│   │   ├── hero.css                   ← @theme tokens + hero-specific styles
│   │   ├── why-this-mall.css
│   │   ├── retail.css
│   │   ├── luxury.css
│   │   ├── dining.css
│   │   ├── events.css
│   │   ├── contact.css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                      ← imports Tailwind + all style files
├── index.html
├── package.json
└── vite.config.js
```

---

## Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/rohitmohite07/mall-sales-deck.git
cd mall-sales-deck

# 2. Install dependencies
npm install

# 3. Run dev server
npm run dev
```

---

## CSS Architecture

This project uses **Tailwind v4** with a deliberate separation of concerns:

| What                                                        | Where                                                            |
| ----------------------------------------------------------- | ---------------------------------------------------------------- |
| Design tokens (colours, fonts)                              | `@theme {}` block inside `src/styles/hero.css`                   |
| Tailwind utilities                                          | `className` props in JSX (`flex`, `items-center`, `gap-3`, etc.) |
| Pseudo-elements, `@keyframes`, `clamp()`, complex gradients | Per-section `.css` files in `src/styles/`                        |
| Shared component styles                                     | `src/styles/section-cta.css`                                     |

**Why not everything in Tailwind?**
Tailwind cannot express `::before`/`::after` pseudo-elements, custom `@keyframes` animations, `clamp()` font sizing, or `writing-mode` — these must live in plain CSS. Everything else is a Tailwind class.

`src/index.css` imports everything in order:

```css
@import "tailwindcss";
@import "./styles/hero.css";
@import "./styles/why-this-mall.css";
@import "./styles/retail.css";
@import "./styles/luxury.css";
@import "./styles/dining.css";
@import "./styles/events.css";
@import "./styles/contact.css";
```

---

## Sections

| Section       | ID          | Key Features                                                                  |
| ------------- | ----------- | ----------------------------------------------------------------------------- |
| Hero          | `#overview` | Fullscreen video, mouse parallax, scroll parallax, animated stats bar         |
| Why This Mall | `#overview` | `IntersectionObserver` counters, sticky left column, 4-pillar cards           |
| Retail        | `#retail`   | Floor-by-floor tab switcher, brand chip grid, horizontal category bar chart   |
| Luxury        | `#luxury`   | Sidebar category explorer, demographic strip, white-space opportunity callout |
| Dining        | `#dining`   | Dining tier explorer, dwell-time story cards, outlet grid                     |
| Events        | `#events`   | IP event explorer, venue cards, sponsorship tiers, live-event pulse badge     |
| Contact       | `#contact`  | 2-step enquiry form with validation, Google Maps embed, footer                |

---

## AI Tools Used

| Tool                      | How it was used                                                  |
| ------------------------- | ---------------------------------------------------------------- |
| **Claude (Anthropic)**    | Section architecture, component code, CSS, data research, README |
| **ChatGPT**               | Marketing copy refinement, CTA messaging                         |
| **Midjourney / DALL-E 3** | Generating supplementary visuals (atrium CGI, brand mockups)     |
| **RunwayML**              | AI-generated hero background video (Option B above)              |
| **Pexels**                | Free stock video for hero section (Option A above)               |

All AI usage is documented here in accordance with the assignment's requirement to demonstrate thoughtful AI integration.

---

## Data Sources

All statistics and brand data are sourced from public records:

| Stat                               | Source                                                 |
| ---------------------------------- | ------------------------------------------------------ |
| 971,742 sq ft GLA                  | Wikipedia / L&T Realty filings                         |
| 11M+ annual footfall               | SCAI (Shopping Centres Association of India)           |
| 38,000 weekend visitors            | SCAI / Occupi research                                 |
| 92% occupancy                      | SCAI 2024                                              |
| 13% YoY sales growth               | Nexus Select Trust investor reports                    |
| 56% international brands           | SCAI tenant mix data                                   |
| Metro Line 8 / Gold Line           | Maharashtra Metro Rail Corporation announcements, 2025 |
| The Gloss Box (3rd edition)        | Free Press Journal, Nov 2025                           |
| Denim & Sneaker Fest (4th edition) | PropNewsTime, Jun 2025                                 |
| Pokémon GO Fest                    | Accio / Niantic press, 2025                            |
| Techstination                      | Accio trends report, 2025                              |

---

## Deployment

The project is deployed on **Vercel** with automatic deployments on every push to `main`.

No environment variables required.

---

## Performance Notes

- All section animations use `IntersectionObserver` — no scroll event listeners firing constantly
- Images are lazy-loaded; video uses `playsInline muted autoPlay loop` for mobile compatibility
- CSS animations use `transform` and `opacity` only — GPU-accelerated, no layout thrashing
- Target: **Lighthouse score 90+** on desktop

---

## Assignment Context

Built as a screening assignment for a Frontend Engineer role. The brief asked for:

- A browser-based sales pitch tool for a large shopping mall
- Non-linear navigation, video-first, cinematic feel
- 90+ Lighthouse score, live deployment, clean GitHub history
- AI tool integration documented

**Mall chosen:** Nexus Seawoods, Navi Mumbai — selected for its unique "India's first transit-oriented mall" story, strong publicly available data, and proximity to the developer (enabling potential site visit for real assets).

---
