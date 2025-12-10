# Bike_Catalog_ReactJS
Bike_Catalog_ReactJS is ReactJS front-end application where you are able to like your favorite bike.

A modern React single‑page application (SPA) for browsing, filtering, and managing a catalog of bikes. Includes user authentication, likes/favorites, and an admin-friendly flow for adding/editing bikes. Built with React, React Router, and a clean component architecture.

> Demo: 🔧 Add link (e.g., Netlify/Vercel)  
> Backend: 🔧 Add link (e.g., SoftUni Practice Server / custom Express API)

---

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
