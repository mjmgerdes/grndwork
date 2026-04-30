# grndwork — PRD

## Problem Statement (original)
Modern, minimal, dark-themed landing page for grndwork — a platform that helps students figure out their career path and land internships/jobs. YC/early-stage startup aesthetic: dark navy/black, soft blue + white accents, subtle gradients, lots of whitespace, no stock photos.

## User Choices
- Email capture → **Supabase** Postgres table `waitlist` (name, email, school, graduation_year, career_interest)
- Brand: text wordmark `grndwork`
- Palette: default soft blue + white on dark navy
- Success message: "You're on the list. We'll reach out soon."

## Architecture
- **Backend** FastAPI (`/app/backend/server.py`)
  - SQLAlchemy async + asyncpg, connected to Supabase Postgres via Transaction Pooler
  - Alembic migrations under `/app/backend/alembic/`
  - Endpoints: `GET /api/`, `POST /api/waitlist`, `GET /api/waitlist/count`, legacy `/api/status`
- **Frontend** React (CRA) + Tailwind + shadcn/ui + framer-motion + sonner
  - Landing page composed of: Header, Hero, Problem, Features (bento), HowItWorks (3-step), Vision, Waitlist form, Footer
  - Fonts: Outfit (headings) + Plus Jakarta Sans (body)
  - Waitlist uses react-hook-form + zod validation

## Core Requirements (static)
- Hero: headline "Discover your path. Land your future." + primary/secondary CTA
- Problem statement block
- 4 feature cards (direction, internships, tracking, networking)
- 3 how-it-works steps
- Vision/social proof block
- Waitlist form (name, email, school, grad year, career interest) → Supabase

## User Personas
- Undergrad student exploring careers
- Early-stage student looking for first internship

## Implementation Log
### 2025-12 — MVP complete
- Supabase Postgres + Alembic waitlist table created and migrated
- Full landing page built and shipped
- testing_agent_v3 iteration_1: backend 100%, frontend 100% (only minor polish notes, all addressed)

## Backlog
### P1
- Email confirmation after waitlist signup (Resend integration)
- Admin view to export waitlist CSV
- Duplicate-email handling (return friendly "already on the list")

### P2
- Referral tracking (each user gets a share link)
- Social proof counter ("437 students already on the list")
- Dynamic OG image / share card
- Mobile nav drawer (hamburger menu below md)

## Next Tasks
- Add duplicate-email uniqueness constraint + friendly error
- Wire transactional email on signup (Resend) when user is ready
