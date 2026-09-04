# Nigerian Community Peterborough (NCP)

Production website: **Next.js** frontend at the repo root + **Strapi** CMS in `cms/`.

## Prerequisites

- Node.js 20+ (22/24 OK)
- For the CMS: PostgreSQL (default) — or configure another SQL engine via env only

## Frontend (Next.js)

```bash
npm install
npm run dev
```

Dev server: [http://localhost:3001](http://localhost:3001) (`next dev --webpack -p 3001`).

```bash
npm run build
npm start
```

Copy `.env.example` → `.env.local` and set `NEXT_PUBLIC_STRAPI_URL` / tokens as needed. Never commit real secrets.

## CMS (Strapi)

See `cms/README.md` (created with the Strapi app). Typical local flow:

```bash
cd cms
cp .env.example .env   # if present
npm run develop
```

Admin UI defaults to [http://localhost:1337/admin](http://localhost:1337/admin).

## Docs

- Sprint / task plan: `Project-documents/jira-task.md`
- Visual system: `Project-documents/current-design.md`
- Hosting / backups: `Project-documents/hosting-plan.md`
- Production go-live: `docs/production-go-live.md`
- VPS Compose (Option B): `deploy/`

```bash
node scripts/check-production-env.mjs
```

Local CMS Postgres often uses host port **5434** when 5432 is occupied — see `cms/README.md`.
