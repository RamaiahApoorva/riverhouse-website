# Riverhouse Website — Client Handover Checklist

## 1. Code Repository
- **GitHub**: https://github.com/RamaiahApoorva/riverhouse-website
- Transfer ownership or add client as collaborator
- Client runs `npm install` then `npm run dev` to start

## 2. Supabase Access
- **Project ID**: `nmcoslvgusbrwltdgpta` (org: theriverhousestudio)
- Transfer Supabase project ownership to client's org
- Share or transfer:
  - Dashboard login credentials
  - Database schema (especially `profiles` table with `id`, `role` columns)
  - Row Level Security (RLS) policies
  - Service role key (for backend/admin operations)

## 3. Booking & Payments
- Booking and payments no longer happen on this site — all "Book a Class" links/buttons go out to Time2Book (`src/lib/booking.js` → `BOOKING_URL`, currently `https://time2book.me/theriverhousestudio`)
- The old in-house booking flow (`Booking.jsx`, `Payments.jsx`, Stripe demo integration) was removed since Time2Book handles scheduling and real payments
- The Supabase `bookings` table and Admin "Bookings" tab still exist from the old flow but nothing writes to `bookings` anymore — new bookings only show up in Time2Book, not the Admin dashboard

## 4. Environment Variables
Credentials are currently hardcoded. Before going to production, move to a `.env` file:

```
VITE_SUPABASE_URL=https://nmcoslvgusbrwltdgpta.supabase.co
VITE_SUPABASE_ANON_KEY=<anon key from supabase dashboard>
```

Files to update:
- `src/lib/supabase.js` — replace hardcoded URL and key with `import.meta.env.VITE_*`

## 5. Hosting
No hosting is configured yet. Options:
- **Vercel** — `npm run build`, deploy `dist/` folder
- **Netlify** — same process
- **Railway** — works with Vite out of the box

## 6. Incomplete / Known Limitations
- [ ] Secrets are hardcoded (move to `.env` before production)
- [ ] Admin role must be set manually in Supabase (`profiles.role = 'admin'`)
- [ ] Admin "Bookings" tab reads a now-unused `bookings` table (real bookings live in Time2Book)
- [ ] Hero images (`site_images` rows `hero-1`/`hero-2`) have no image uploaded yet
- [ ] Hero background video (`site_images` row `hero-video`) has no video uploaded yet — homepage falls back to animated decorative circles until one is added via Admin → Site Images
- [ ] No custom domain configured

## 8. Storage Setup (fixed 2026-09, was previously broken)
The `site-images` Supabase Storage bucket did not exist and had zero RLS policies — the Admin image-upload feature would have failed silently for anyone. This has been fixed:
- Bucket `site-images` created: public read, 100MB file size limit, accepts images and video (`mp4`/`webm`/`mov`)
- RLS policies added on `storage.objects`: public `SELECT`, admin-only `INSERT`/`UPDATE`/`DELETE`
- Upload a hero video the same way as hero images — Admin → Site Images → "hero-video" slot

## 7. Commands Reference
| Command | What it does |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server (port 5173) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | Run OxLint |
