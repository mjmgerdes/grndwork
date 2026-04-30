# Deploying grndwork for free

Stack: React (CRA) frontend + FastAPI backend + Supabase Postgres (waitlist).
Free path: **Vercel** (frontend) + **Render** (backend) + **Supabase** (already free).

---

## 1. Push to GitHub
From Emergent: Profile → Save to GitHub (requires paid Emergent subscription for export).
Or locally:
```bash
git init && git add . && git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<you>/grndwork.git
git push -u origin main
```

## 2. Deploy the backend on Render (free tier)

1. Go to https://render.com → New → Blueprint
2. Connect your GitHub repo. Render will detect `render.yaml` in the repo root.
3. On the Environment Variables screen, set:
   - `DATABASE_URL` = your Supabase **Transaction Pooler** URI
     (`postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres`)
   - `CORS_ORIGINS` = `*` for now (tighten to your Vercel URL after step 3)
4. Click **Apply**. The build runs `alembic upgrade head` so your `waitlist` table is created automatically.
5. Once live, note the URL (e.g. `https://grndwork-api.onrender.com`) — test: `https://…/api/` should return `{"message":"grndwork API"}`.

> Render free instances sleep after 15 min idle (first request may take ~30s to wake).

## 3. Deploy the frontend on Vercel (free)

1. Go to https://vercel.com → New Project → import your GitHub repo.
2. **Root Directory** → `frontend`.
3. Framework preset is auto-detected (Create React App).
4. Environment Variables:
   - `REACT_APP_BACKEND_URL` = your Render URL from step 2 (no trailing slash).
5. Deploy. You'll get a `https://<project>.vercel.app` URL.

## 4. Lock down CORS (recommended)

Back in Render → your service → Environment:
```
CORS_ORIGINS=https://grndwork.vercel.app,https://<your-custom-domain>
```
Save → service auto-redeploys.

## 5. Custom domain (optional, free)

- Buy a domain (e.g. Namecheap/Cloudflare, ~$10/yr).
- In Vercel → Project → Settings → Domains → add your domain, follow DNS instructions.

---

## Local dev
```bash
# Backend
cd backend
cp .env.example .env           # fill in DATABASE_URL
pip install -r requirements.txt
alembic upgrade head
uvicorn server:app --reload --port 8001

# Frontend
cd frontend
cp .env.example .env           # set REACT_APP_BACKEND_URL=http://localhost:8001
yarn install
yarn start
```

## Notes
- MongoDB is optional. If `MONGO_URL` is unset, the backend simply skips Mongo init — `/api/status` becomes a no-op. All core (waitlist) flows run on Supabase Postgres.
- Do **not** commit `.env` files. Only `.env.example` should be in Git.
