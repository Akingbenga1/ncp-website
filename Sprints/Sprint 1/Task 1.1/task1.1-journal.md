# Task 1.1 journal

## Status

`completed`

## Summary

Treated the root Next.js app as the production frontend. Added `.env.example` (Strapi URL, API token placeholder, generic `DATABASE_*`, Stripe/mail placeholders). Rewrote README for Next + Strapi monorepo layout. Confirmed `npm run build` succeeds.

## Acceptance criteria checklist

- [x] Dev runs from root
- [x] Env template exists (no secrets committed)

## Decision log

- Kept Next on port **3001** (existing script) to avoid clashing with common 3000 usage; documented in README.
- `DATABASE_*` lives in the root `.env.example` for discoverability; Strapi will consume them from `cms/.env` (Task 1.2). Next app must not import DB clients.

## Needs human

None.

## Files changed

- `.env.example` (new)
- `README.md`
- `Sprints/Sprint 1/Task 1.1/task1.1.md`
- `Sprints/progress.md`, `Sprints/Sprint 1/progress.md`

## Resume notes

Continue with Task 1.2 (Strapi scaffold).

## Open questions

None.
