# Riverhouse Website — Client Handover Checklist

## 1. Code Repository
- **GitHub**: https://github.com/RamaiahApoorva/riverhouse-website
- Transfer ownership or add client as collaborator
- Client runs `npm install` then `npm run dev` to start

## 2. Supabase Access
- **Project ID**: `ttkiylxbficyjdnkcqds`
- Transfer Supabase project ownership to client's org
- Share or transfer:
  - Dashboard login credentials
  - Database schema (especially `profiles` table with `id`, `role` columns)
  - Row Level Security (RLS) policies
  - Service role key (for backend/admin operations)

## 3. Stripe Account
- Current integration is a **demo placeholder** — no real charges happen
- Client needs their own Stripe account
- Replace `pk_test_YOUR_STRIPE_PUBLISHABLE_KEY` in `src/pages/Payments.jsx` with their key
- **Production requires a backend** to create PaymentIntents (current code only tokenizes cards client-side)

## 4. Environment Variables
Credentials are currently hardcoded. Before going to production, move to a `.env` file:

```
VITE_SUPABASE_URL=https://ttkiylxbficyjdnkcqds.supabase.co
VITE_SUPABASE_ANON_KEY=<anon key from supabase dashboard>
VITE_STRIPE_PUBLISHABLE_KEY=<stripe publishable key>
```

Files to update:
- `src/lib/supabase.js` — replace hardcoded URL and key with `import.meta.env.VITE_*`
- `src/pages/Payments.jsx` — replace hardcoded Stripe key with `import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY`

## 5. Hosting
No hosting is configured yet. Options:
- **Vercel** — `npm run build`, deploy `dist/` folder
- **Netlify** — same process
- **Railway** — works with Vite out of the box

## 6. Incomplete / Known Limitations
- [ ] Stripe payments are frontend-only (needs backend for real charges)
- [ ] Secrets are hardcoded (move to `.env` before production)
- [ ] Admin role must be set manually in Supabase (`profiles.role = 'admin'`)
- [ ] No email/notification system for booking confirmations
- [ ] No custom domain configured

## 7. Commands Reference
| Command | What it does |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server (port 5173) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | Run OxLint |
