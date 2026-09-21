# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```
npm install      # install dependencies
npm run dev      # start dev server (port 5173)
npm run build    # production build to dist/
npm run preview  # preview production build
npm run lint      # run oxlint (rules in .oxlintrc.json)
```

There is no test suite/framework configured in this repo.

## Architecture

React 19 + Vite SPA using React Router 7 and Tailwind CSS v4, backed directly by Supabase (Postgres + Auth + Storage) with no custom backend/API layer — pages call the Supabase client from `src/lib/supabase.js` directly.

- **Routing**: all routes are defined in `src/App.jsx`. `/admin` is gated by an inline `AdminRoute` wrapper that checks `useAuth()` for `user` + `isAdmin`.
- **Auth**: `src/context/AuthContext.jsx` wraps the app (in `App.jsx`) and exposes `user`, `profile`, `isAdmin`, `signUp`, `signIn`, `signOut` via `useAuth()`. `profile` is fetched from the Supabase `profiles` table on session load/change. `isAdmin` is simply `profile?.role === 'admin'` — there is no admin UI to grant this; it's set by hand in the Supabase dashboard.
- **Booking**: there is no in-house booking/payment flow anymore. Every "Book a Class" link/button (Navbar, Footer, Home CTAs) is a plain external `<a>` to `BOOKING_URL` from `src/lib/booking.js`, which points at the studio's Time2Book page (`https://time2book.me/theriverhousestudio`). Time2Book handles scheduling and real payments outside this codebase.
- **Admin dashboard** (`src/pages/Admin.jsx`): tabbed UI for CRUD on `classes`, a read-only "Bookings" tab reading the `bookings` table (**stale** — nothing writes to it anymore since bookings now happen in Time2Book), and a media uploader for the homepage hero (`ImageUploader` component — handles both images and, for the `hero-video` key specifically, video) that uploads to the `site-images` Supabase Storage bucket and updates the `site_images` table (`key`, `image_url`, `alt_text`). That bucket and its RLS policies (public read, admin-only write) didn't exist until this was set up — before that, uploads would have failed silently.
- **Hero video**: `Home.jsx` renders a looping autoplay/muted background `<video>` behind the hero text when `site_images` row `hero-video` has an `image_url` set, with a dark scrim overlay and light text so it stays legible over arbitrary video content; falls back to the original animated decorative circles + light text when no video is set.
- **Supabase tables in use**: `profiles` (`id`, `role`, `full_name`, `avatar_url`), `classes`, `site_images` (`key`, `image_url`, `alt_text`). `bookings` still exists but is effectively dead — kept only for the Admin tab's historical view.
- **Styling**: Tailwind v4 via `@tailwindcss/vite` (no `tailwind.config.js` — theme tokens are defined in `src/index.css` under `@theme`, e.g. the `brown-*` color scale and `font-sans`/`font-serif`). Animation is done with `framer-motion`, used heavily and consistently across pages (fade/slide-up entrance variants, staggered children).
- **Credentials**: the Supabase URL/anon key are hardcoded in `src/lib/supabase.js`. Per `HANDOVER.md`, these are meant to move to `VITE_*` env vars before production but that migration hasn't happened yet.

See `HANDOVER.md` for the full list of known gaps (frontend-only payments, hardcoded secrets, manual admin role assignment, no email notifications, no hosting configured).
