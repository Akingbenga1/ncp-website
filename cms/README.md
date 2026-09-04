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

## Content types (Sprint 3–4)

| Type | API path | Draft & publish |
| --- | --- | --- |
| Event | `/api/events` | yes |
| News Article | `/api/news-articles` | yes |
| Listing | `/api/listings` | yes |

**Members** live as Strapi Users & Permissions **Users** (custom fields: displayName, phone, locality, involvement, consentGiven). Public register/login is via AuthPort on the Next app. Admins list/delete members in Strapi Admin (see `Project-documents/admin-guide.md` → Members).

Enable **Public** or **API Token** `find` / `findOne` for these types before the Next ContentPort / DirectoryPort adapters can read published entries. Create a Read-only API token in Admin → Settings → API Tokens and put it in root `STRAPI_API_TOKEN`. Listing **create** on the token is needed for public suggest-a-listing.

On bootstrap, `cms/src/index.ts` grants Public `find` / `findOne` for Event, News Article, and Listing (drafts remain unpublished).

### Launch seed content

On bootstrap, `cms/src/bootstrap/seed-launch-content.ts` creates **2 Events**, **2 News Articles**, and **1 starter Listing** if their slugs are missing (idempotent; does not overwrite admin edits). Entries are **published** so the Next port-backed pages can show them.

| Type | Slugs |
| --- | --- |
| Event | `community-meet-greet`, `ncp-autumn-family-day` |
| News | `welcome-new-ncp-website`, `membership-registration-open` |
| Listing | `nigerian-community-peterborough` (real NCP org — no invented businesses) |

Replace copy and add images in Admin → Content Manager when NCP provides final text/photos (NH-9).

Full admin guide (CRUD, listing approval, members, port-backed site): `Project-documents/admin-guide.md`.  
Remote training agenda: `docs/remote-training-agenda.md`.  
Extra administrators at handover (**NH-7**): `docs/strapi-extra-admins.md`.  
30-day post-launch support: `docs/post-launch-support.md`.

## Database swap

Change `DATABASE_CLIENT` (`postgres` → `mysql`) and credentials only. No Next or port rewrites.
