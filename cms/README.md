# NCP Strapi CMS

Concrete CMS/API adapter for the NCP production site. The Next.js app (repo root) consumes this API via ports/adapters — **never** import Strapi SDK types into UI pages.

## Local prerequisites

- Node 20–26
- PostgreSQL (default). Local Docker example:

```bash
docker run -d --name ncp-postgres \
  -e POSTGRES_USER=strapi \
  -e POSTGRES_PASSWORD=strapi \
  -e POSTGRES_DB=ncp_strapi \
  -p 5434:5432 \
  postgres:16-alpine
```

Use host port **5434** in `DATABASE_PORT` when local 5432 is already taken (common on Windows).

## Setup

```bash
cp .env.example .env
# set DATABASE_PASSWORD and generate real APP_KEYS / salts for anything beyond throwaway local
npm install
npm run develop
```

- Admin: http://localhost:1337/admin  
- API: http://localhost:1337/api  

Point the Next app at this API with `NEXT_PUBLIC_STRAPI_URL=http://localhost:1337` (see root `.env.example`).

## Database swap

Change `DATABASE_CLIENT` (`postgres` → `mysql`) and credentials only. No Next or port rewrites.
