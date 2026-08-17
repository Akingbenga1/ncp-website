# Task 1.2 journal

## Status

`completed`

## Summary

Scaffolded Strapi 5.52 under `cms/` with PostgreSQL via env (`DATABASE_*`). Local Docker Postgres published on host **5434** (5432 already used by another local Postgres). Created first admin and verified login against `http://localhost:1337`. Next app has no `pg`/Strapi imports.

## Acceptance criteria checklist

- [x] Admin logs into Strapi
- [x] No DB vendor code in Next app

## Decision log

- CMS lives in **`cms/`** monorepo folder (not nested git).
- **PostgreSQL** is the default concrete engine; `config/database.ts` already supports mysql/sqlite via `DATABASE_CLIENT` only.
- Local Docker maps **5434→5432** to avoid clashing with host Postgres on 5432.

## Needs human

- **NH-1 / hosting:** Production Strapi + managed Postgres credentials when deploying (see Task 1.3 / `hosting-plan.md`). Local admin is fine for build work.
- Extra admin emails (**NH-7**) later at handover.

## Credentials / env vars (local only)

| Item | Value / location |
| --- | --- |
| Strapi URL | `http://localhost:1337` |
| Admin email | `admin@ncp.local` |
| Admin password | `NcpAdmin!2026` (local throwaway — rotate before any shared env) |
| DB | Docker `ncp-postgres`, user/db `strapi` / `ncp_strapi`, host port **5434** |
| Secrets | `cms/.env` (gitignored) |

## Files changed

- `cms/` (new Strapi app)
- `cms/.env.example`, `cms/README.md`
- Root `.env.example`, `.gitignore`, `README.md`
- Task checklist / this journal

## Resume notes

Task 1.3 is documentation-only (hosting plan already drafted). After 1.3, next batch starts at **Task 1.4** (port skeleton).

## Open questions

None for local scaffold.
