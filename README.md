
# 🚲 Bike Catalog — React SPA

A fast, modern bike catalog where users can browse bikes, like their favorites, and discuss them with comments.  

## 💡 Why would you want this app?

- **Instant feedback that feels native**  
  Likes and comments update optimistically, so the UI responds immediately while requests run in the background. Users get the *“it just works”* experience.

- **Clear value for shops & communities**  
  Perfect for a small bike store or a hobby community: showcase bikes, surface the **most liked** models, and keep conversations near the products.

- **Straightforward to extend**  
  The codebase is modular (hooks + feature folders), making it easy to add features like filtering, wishlists, or admin-only reports.

- **Production-friendly UX details**  
  Sticky header, resilient rendering while data loads, safe fallbacks, pagination-ready grids, and a responsive layout so it looks good on mobile and desktop.

## ✨ Features

- **Browse & Details**: Bike cards with image, price, type, and a dedicated details page.
- **Likes**: Per-user like guard (one like per user per bike), live like counts, and a “Most Liked” view.
- **Comments**: Threaded comment list per bike with instant (optimistic) add.
- **Auth-aware UI**: Buttons and actions gated by authentication (and optional admin capabilities for edit/delete).
- **CRUD for bikes** *(if you enable admin)*: Create, edit, and delete bikes with navigation flows and confirmations.
- **Responsive UI**: Works well from phone to desktop.
- **Accessible-ish defaults**: Semantic HTML and keyboard focus on interactive elements.

> Optional / easy add-ons:
> - Filter & sort (by price, type, like count)  
> - Image gallery per bike  
> - Favorites / collections  
> - Admin analytics (top liked, most commented, recent activity)

---

## 🧱 Tech Stack

- **React** + hooks (memoized selectors, transitions/optimistic updates)
- **React Router** (SPA navigation)
- **Custom data hook**: `useRequest` for GET/POST/DELETE with minimal ceremony
- **Plain CSS** (reset/layout/typography/responsive)  
- **Flexible backend**: Works with a simple REST API (e.g., SoftUni Practice Server / JSON service) — just configure the `BASE_URL`

## 🗂 Project structure (high level)

# Bike_Catalog_ReactJS
Bike_Catalog_ReactJS is ReactJS front-end application where you are able to like your favorite bike.

A modern React single‑page application (SPA) for browsing, filtering, and managing a catalog of bikes. Includes user authentication, likes/favorites, and an admin-friendly flow for adding/editing bikes. Built with React, React Router, and a clean component architecture.

> Demo: 🔧 Add link (e.g., Netlify/Vercel)  
> Backend: 🔧 Add link (e.g., SoftUni Practice Server / custom Express API)

## ✨ Features

- **Bike listing & details**: Browse bikes with images, price, type, and description.
- **Filtering & search**: Filter by type (e.g., Road/MTB/Urban) and search by model name.
- **Likes/Favorites**: Authenticated users can like/favorite bikes; popular bikes are highlighted.
- **Authentication**: Login/registration with token-based auth (JWT or session token).
- **CRUD (optional)**: Admin or authorized users can create, update, and delete bikes.
- **Responsive UI**: Works great on desktop and mobile.
- **State management**: Lightweight local state with hooks; easy to plug Redux/Zustand if needed.

---

## 🗂 Project Structure

```text
Bike_Catalog_ReactJS/
├─ public/                  # Static assets, index.html, favicon
├─ src/
│  ├─ api/                  # API clients (fetch/axios wrappers)
│  ├─ components/           # Reusable UI components (Card, Filters, Header, Footer)
│  ├─ features/
│  │  ├─ bikes/             # Bike list, details, create/edit forms
│  │  └─ auth/              # Login, Register, auth guards
│  ├─ hooks/                # Custom hooks (useAuth, useBikes, useFetch)
│  ├─ pages/                # Route-level pages (Home, Catalog, BikeDetails, Profile)
│  ├─ routes/               # Router configuration
│  ├─ services/             # Domain services (e.g., BikesService, LikesService)
│  ├─ styles/               # Global styles, theme
│  ├─ utils/                # Helpers (formatters, validators)
│  ├─ App.jsx               # Root component
│  ├─ main.jsx              # Entry point
│  └─ config.js             # 🔧 API base URLs, env wiring
├─ .env.example             # Environment variables (sample)
├─ package.json
└─ README.md
