# Aura & Co. Hair Studio

> **Editorial luxury hair salon website & booking platform** — a client-pitch production demo built to make prospective luxury salon owners say *"I want this."* Full Indian context (₹ INR, Pune / Koregaon Park), high-end editorial aesthetics, an interactive 5-step booking wizard, and a live Admin Management Console that updates in real time.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

---

## Table of Contents

- [Overview](#overview)
- [Key Highlights](#key-highlights)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Routes](#routes)
- [Environment Variables](#environment-variables)
- [Rebranding in 5 Minutes](#rebranding-in-5-minutes)
- [State Management](#state-management)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Aura & Co. is a complete, production-quality single-page application for a luxury hair atelier. It combines:

- A **public-facing marketing & e-commerce site** (services, stylists, gallery, shop, journal, offers, quiz).
- A **5-step bespoke booking wizard** with real-time price/duration computation.
- An **Admin Console** (`/admin`) with KPIs, revenue charts, appointment management, and a dynamic service manager — all synchronized with the public site through a shared persisted store.

No backend server is required for the demo: bookings, cart, quiz answers, custom services, and theme preference persist in `localStorage` via Zustand's `persist` middleware.

---

## Key Highlights

### 1. Editorial Luxury Design Language

- **Palette**: Warm Ivory `#F6F1EA`, Deep Espresso `#1B1512`, Champagne Gold `#B8935A`, Soft Blush `#E9D5CB`, Muted Sage `#8A9A86`.
- **Typography**: **Cormorant Garamond** (high-contrast display serifs) paired with **Plus Jakarta Sans** (crisp geometric body).
- **Details**: Film-grain texture overlay, bespoke arch masks, custom editorial cursor, micro-interactions via Motion — zero generic template aesthetics.
- **Dark mode** supported (`toggleDarkMode` in the store).

### 2. 5-Step Bespoke Booking Wizard (`/book`)

| Step | Name | Features |
|------|------|----------|
| 1 | Services | Category filters, multi-select, real-time price & duration totals |
| 2 | Master Stylist | Pick a specific stylist or "Any Available Master", specialty badges & tier ratings |
| 3 | Date & Slot | 14-day interactive picker, Morning/Afternoon/Evening slot groups, weekend demand badges |
| 4 | Client Dossier | Indian mobile validation (`+91`), hair texture notes, beverage preference (Kashmiri Kahwa, Cortado, Cold Brew, Chamomile) |
| 5 | Confirmation | Booking voucher with `AUR-XXXX` reference, Add-to-Calendar (`.ics`), WhatsApp dispatch, cash/UPI on arrival |

### 3. Live Admin Console (`/admin`)

- **Shared persisted state** — appointments booked on the public site appear instantly in Admin without reloads.
- **KPIs**: today's chair count, confirmed vs. pending appointments, pipeline revenue in ₹.
- **Revenue visualizer**: interactive Recharts area trend of weekly salon revenue.
- **Actions**: toggle status (`confirmed` / `completed` / `cancelled`), delete records.
- **Dynamic service manager**: add custom services with custom pricing/durations that immediately register in the booking catalog.

### 4. Eleven Production-Quality Pages

| Route | Page | What's inside |
|-------|------|---------------|
| `/` | Home | Hero with marquee, signature services (arch cards), Before/After slider, stylist cards, Google reviews carousel, consultation FAQ |
| `/services` | Services | Filterable catalog, search, duration, ₹ pricing, instant "Add to Booking" |
| `/stylists` | Stylists | Team grid with accolades and specialties |
| `/stylists/[slug]` | Stylist Detail | Portfolio, accolades, Instagram handle, direct booking link |
| `/gallery` | Gallery | Masonry grid with tabs (Balayage, Bridal, Cuts, Men's Grooming) |
| `/offers` | Offers | Bridal & festive packages, Glow Membership tiers (monthly/yearly toggle), gift cards |
| `/style-quiz` | Style & Texture Quiz | 4-question diagnostic recommending rituals and home products |
| `/shop` | Bespoke Shop | Haircare products, slide-out cart drawer, quantity adjusters, free-shipping calculation |
| `/journal` | Journal | Editorial hair-care articles with reading time and author bios |
| `/about` | About | Atelier origin story, timeline from 2012, four core tenets, brand partnerships |
| `/contact` | Contact | Validated form, live open/closed status badge, studio hours, simulated Koregaon Park map |
| `/admin` | Admin Demo | Full salon operations control room |

### 5. Polish & Usability

- **Cmd + K / Ctrl + K command palette** — instant search across services, stylists, pages, plus quick WhatsApp connect.
- **Floating actions** — persistent WhatsApp concierge button and smart mobile sticky booking bar.
- **SEO & Schema.org** — `HairSalon` JSON-LD and OpenGraph tags in `index.html`.
- **Page transitions** — Motion (`AnimatePresence`) route fade/slide animations.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | React 19 + Vite 8 + TypeScript (strict, zero `any`) |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`), custom serif typography & film-grain utilities |
| State | Zustand 5 with `persist` middleware (localStorage) |
| Animation | Motion (Framer's successor) |
| Charts | Recharts (smooth area curves for revenue trends) |
| Icons | lucide-react |
| Utilities | clsx, tailwind-merge |
| AI (optional) | `@google/genai` (Gemini) — requires `GEMINI_API_KEY` |
| Lint / Typecheck | `tsc --noEmit` |
| Package manager | npm (a `bun.lock` is also present; either works) |

---

## Quick Start

### Prerequisites

- **Node.js** 20+ (22 LTS recommended)
- **npm** 10+ (or bun)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/aura-and-co-hair-studio.git
cd aura-and-co-hair-studio

# 2. Install dependencies
npm install

# 3. Configure environment (optional for local demo)
cp .env.example .env
# edit .env and set GEMINI_API_KEY / APP_URL if you need Gemini features

# 4. Start the dev server (http://localhost:3000)
npm run dev
```

### Production Build

```bash
npm run build     # type-aware production build → dist/
npm run preview   # serve the production build locally
npm run lint      # TypeScript check (tsc --noEmit)
```

---

## Project Structure

```
aura-and-co-hair-studio/
├── config/
│   └── site.ts              # Single source of truth: brand, hours, contact, theme, nav
├── data/                    # Typed content collections
│   ├── faq.ts               # Consultation FAQ entries
│   ├── gallery.ts           # Masonry gallery items & filter tabs
│   ├── images.ts            # Curated image URLs (swap for client photography)
│   ├── journal.ts           # Editorial articles with authors & reading time
│   ├── offers.ts            # Packages, memberships, gift cards
│   ├── products.ts          # Shop catalog
│   ├── reviews.ts           # Google-style reviews
│   ├── services.ts          # Service catalog (price, duration, category)
│   └── stylists.ts          # Master stylist profiles
├── lib/
│   ├── bookingSlots.ts      # 14-day picker + Morning/Afternoon/Evening slot groups
│   └── utils.ts             # cn() classname helper and misc utilities
├── store/
│   └── useBookingStore.ts   # Zustand store: theme, cart, wizard, bookings, quiz, services
├── src/
│   ├── components/
│   │   ├── home/            # HomeHero, SignatureServices, HomeStylists, MarqueeAndStats, ...
│   │   ├── layout/          # Navbar, Footer, FloatingActions
│   │   └── ui/              # BeforeAfterSlider, CartDrawer, CommandPalette, CustomCursor
│   ├── pages/               # 12 route-level page components (incl. AdminPage)
│   ├── App.tsx              # History-API router + global chrome
│   ├── main.tsx             # Entry point
│   └── index.css            # Tailwind v4 theme tokens, fonts, film-grain, arch-mask
├── .env.example             # GEMINI_API_KEY, APP_URL
├── .gitignore               # Ignores node_modules/, dist/, .env*, logs, etc.
├── index.html               # SEO meta, OpenGraph, HairSalon JSON-LD
├── metadata.json            # App metadata / capability flags
├── package.json
├── tsconfig.json            # Path aliases: @/, @/config, @/data, @/lib, @/store
├── vite.config.ts           # React + Tailwind plugins, path aliases, HMR config
└── README.md
```

---

## Routes

The app uses a lightweight History-API router implemented in `src/App.tsx` (no react-router dependency):

```
/                 Home
/services         Service catalog
/stylists         Stylist team
/stylists/:slug   Stylist detail
/gallery          Gallery masonry
/book             5-step booking wizard
/offers           Offers & memberships
/style-quiz       Style & texture quiz
/shop             Bespoke shop + cart drawer
/journal          Journal
/about            About
/contact          Contact
/admin            Admin console (footer & floating actions hidden)
```

> **Note**: Because routing uses `history.pushState`, deep links like `/admin` require either the Vite dev server or a host configured with an SPA fallback (all paths → `index.html`). See [Deployment](#deployment).

---

## Environment Variables

Copy `.env.example` to `.env`:

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Optional* | Gemini API key for AI-powered features (`@google/genai`). |
| `APP_URL` | Optional | Public URL of the deployed app (self-referential links, callbacks). |

\* The core demo (booking, admin, shop, quiz) works fully without any API key — all data lives in `localStorage`.

`DISABLE_HMR=true` is honored by `vite.config.ts` to disable file watching (used by AI Studio agent tooling); you normally don't set this yourself.

---

## Rebranding in 5 Minutes

The entire salon identity, pricing, currency, contact channels, and hours are decoupled from UI code.

### 1. Brand Config — `config/site.ts`

```ts
export const siteConfig = {
  name: "Your Salon Name",
  tagline: "Your Custom Tagline",
  city: "Mumbai, India",
  currency: { symbol: "₹", code: "INR", locale: "en-IN" },
  contact: {
    phone: "+91 98220 00000",
    whatsapp: "919822000000",
    email: "concierge@yoursalon.in",
  },
  address: {
    full: "Plot 12, Waterfield Road, Bandra West, Mumbai 400050",
    googleMapsUrl: "https://maps.google.com/?q=...",
  },
  hours: [ /* per-day open/close/isOpen */ ],
  socials: { instagram: "...", facebook: "...", /* ... */ },
  navLinks: [ /* header navigation */ ],
};
```

### 2. Theme Tokens — `src/index.css` + `config/site.ts → theme`

```css
:root {
  --primary: #B8935A;       /* Accent Gold */
  --primary-hover: #9E7B45;
  --bg-main: #F6F1EA;       /* Warm Ivory */
  --text-main: #1B1512;     /* Deep Espresso */
}
```

### 3. Imagery — `data/images.ts`

Replace the Unsplash links with high-resolution photography of the client's actual salon interior, stylists, and real client transformations.

### 4. Content — `data/*.ts`

Swap services, prices, stylist bios, journal articles, offers, products, reviews, and FAQ entries — all plain typed TypeScript data files, no CMS required.

---

## State Management

All client state lives in a single Zustand store (`store/useBookingStore.ts`) persisted to `localStorage` under the key `aura-hair-studio-storage-v1`:

| Domain | Key state | Notes |
|--------|-----------|-------|
| Theme | `isDarkMode` | Toggles `.dark` on `<html>` |
| Command palette | `isCommandPaletteOpen` | Opened via Cmd/Ctrl + K |
| Cart | `cart`, `isCartOpen` | Add/remove/quantity/clear |
| Booking wizard | `wizard` | step, selected services/stylist/date/slot, client details, last booking |
| Appointments | `bookings` | Shared by public `/book` and `/admin`; statuses: `confirmed`, `pending`, `completed`, `cancelled` |
| Service catalog | `customServices` | Admin-added services merge with `data/services.ts` |
| Style quiz | `quizAnswers` | 4-question diagnostic |

**Because the store is shared and persisted, a booking created on `/book` immediately appears in the `/admin` console — and vice versa — without a page reload or backend.**

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server on **port 3000**, bound to `0.0.0.0` |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | TypeScript type-check (`tsc --noEmit`) |
| `npm run clean` | Remove `dist/` and `server.js` |

---

## Deployment

Any static host works. Ensure **SPA fallback** (rewrite all routes to `/index.html`) so deep links like `/admin` resolve.

**Netlify** — add `public/_redirects`:

```
/*    /index.html   200
```

**Vercel** — `vercel.json`:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

**GitHub Pages / Cloudflare Pages** — configure the framework preset or equivalent 404 → `index.html` rewrite.

```bash
npm run build
# upload the dist/ folder to your host
```

---

## Contributing

1. Fork the repository and create a feature branch: `git checkout -b feature/amazing-feature`
2. Install deps: `npm install`
3. Make your changes and verify: `npm run lint`
4. Commit using clear messages: `git commit -m "Add amazing feature"`
5. Push and open a Pull Request.

Please keep the design system intact: reuse tokens from `config/site.ts` and `src/index.css`, prefer typed data files in `data/`, and avoid introducing `any`.

---

## License

MIT © Aura & Co. Hair Studio — demo project for portfolio/client-pitch use.
