# Deploying grndwork (static, free)

This is a **pure static site**. No backend required. Emails are sent directly from the browser to **Supabase** using the public `anon` key + Row-Level-Security.

Recommended host: **Vercel** (free, auto HTTPS, custom domain).
Also works on: Netlify, Cloudflare Pages, GitHub Pages.

---

## 1. One-time Supabase setup (required — do this BEFORE first deploy)

Open Supabase Dashboard → **SQL Editor** → run this:

```sql
-- Lock down the waitlist table so the public anon key can ONLY insert rows,
-- and cannot read, update, or delete anyone's data.
alter table public.waitlist enable row level security;

create policy "Anyone can join waitlist (insert only)"
  on public.waitlist
  for insert
  to anon
  with check (true);
```

Verify it worked: Dashboard → **Authentication → Policies** → `waitlist` should list one INSERT policy for role `anon`.

> Your service-role key (server-side) still has full access — only browser/anon access is restricted to insert-only. Reads are blocked for the public.

## 2. Push to GitHub

```bash
git init && git add . && git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<you>/grndwork.git
git push -u origin main
```

## 3. Deploy on Vercel (free)

1. Go to https://vercel.com → **New Project** → import the GitHub repo.
2. Vercel will auto-detect the config in `vercel.json` (builds `frontend/`).
3. Add **Environment Variables**:
   - `REACT_APP_SUPABASE_URL` = `https://<your-ref>.supabase.co`
   - `REACT_APP_SUPABASE_ANON_KEY` = your **anon / public** key
4. Click **Deploy**. You'll get a free `https://<project>.vercel.app` URL.

Done. Every form submission lands in your Supabase `waitlist` table.

## 4. (Optional) Custom domain

Vercel → Project → Settings → Domains → add your domain, follow DNS instructions. HTTPS is free and automatic.

---

## Local dev
```bash
cd frontend
cp .env.example .env      # fill in your Supabase URL + anon key
yarn install
yarn start                # http://localhost:3000
```

## What happened to the backend?
The FastAPI backend in `/backend` is no longer needed for the static deploy. You can safely delete the `backend/` folder before pushing to GitHub — nothing on the live site depends on it.
