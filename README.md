# The Wire — Job Board

A minimal job board web app: browse open roles, view full job details, and post a new listing. Built with Next.js (App Router) and Tailwind CSS.

**Live demo:** _add your Vercel URL here after deployment_

## Why this project

A job board is a real, common business need — it has read flows (browsing, filtering by role), write flows (posting a job), and a natural data model (jobs, with fields like title, company, salary, tags). That makes it a good small-scale demonstration of a full app: pages, API routes, forms, and a deploy pipeline.

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14 (App Router) | File-based routing, built-in API routes, first-class Vercel support |
| Styling | Tailwind CSS | Fast to iterate, keeps styling co-located with markup |
| Data | In-memory store seeded from `data/jobs.json` | No database setup needed for a demo; swappable for Postgres/Mongo later |
| Hosting | Vercel | Zero-config deploys for Next.js, generous free tier |
| CI/CD | GitHub Actions | Native to GitHub, no third-party CI account needed |

## Project structure

```
jobboard/
├── app/
│   ├── page.js              # Home page — job listings
│   ├── jobs/[id]/page.js    # Job detail page (dynamic route)
│   ├── post/page.js         # Post-a-job page
│   ├── api/jobs/route.js    # API route: GET (list), POST (create)
│   ├── layout.js            # Root layout (header/footer)
│   ├── not-found.js         # Custom 404 page
│   └── globals.css          # Tailwind + global styles
├── components/
│   └── PostJobForm.js       # Client component: job posting form
├── lib/
│   └── jobs.js              # Data access helpers
├── data/
│   └── jobs.json            # Seed data
├── .github/workflows/
│   └── ci-cd.yml            # CI/CD pipeline definition
├── vercel.json              # Vercel build configuration
└── package.json
```

## Running locally

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## API

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/jobs` | Returns all job listings as JSON |
| `POST` | `/api/jobs` | Creates a new job listing. Requires `title`, `company`, `location` in the JSON body |

## CI/CD pipeline

Defined in `.github/workflows/ci-cd.yml`, triggered on every push/PR to `main`:

1. **Build & Lint job (CI)** — checks out the code, installs dependencies with `npm ci`, runs `npm run lint`, then `npm run build`. If any step fails, the pipeline stops here and nothing deploys.
2. **Deploy job (CD)** — runs only after the build/lint job succeeds, and only on a push to `main` (not on pull requests). Uses the Vercel CLI to pull project settings, build, and deploy to production.

This means: a broken build or lint failure can never reach production, and every successful merge to `main` auto-deploys.

### Required GitHub secrets

Set these in the GitHub repo under **Settings → Secrets and variables → Actions**:

| Secret | Where to get it |
|---|---|
| `VERCEL_TOKEN` | Vercel dashboard → Settings → Tokens |
| `VERCEL_ORG_ID` | Root of `.vercel/project.json` after running `vercel link` locally once |
| `VERCEL_PROJECT_ID` | Same file as above |

## Deployment

The app deploys to Vercel automatically via GitHub Actions on every push to `main`. See the setup guide provided alongside this project for the exact one-time setup commands (`vercel login`, `vercel link`, adding secrets).

## Possible next steps

- Replace the in-memory store with a real database (e.g. Postgres via Vercel Postgres or Supabase) so posted jobs persist across deploys.
- Add authentication so only verified companies can post.
- Add search/filter by tag, location, or job type on the listings page.
- Add automated tests (e.g. Playwright) as a step in the CI job.
