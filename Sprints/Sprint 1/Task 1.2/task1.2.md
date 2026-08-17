# Task 1.2 — Strapi scaffold (concrete CMS adapter) + first admin

## Steps

- [x] Create Strapi app under `cms/`
- [x] Configure concrete DB via env (default: PostgreSQL); MySQL-swappable later via config only
- [x] Record connection vars in `.env.example` / `cms/.env.example`; note Strapi API URL for Next
- [x] Ensure no DB vendor code in Next app
- [x] Smoke: Strapi starts; admin created and login verified via `/admin/login`

## Acceptance criteria

- [x] Admin logs into Strapi
- [x] No DB vendor code in Next app

## Core-feature DoD

Port/contract defined → concrete adapter implemented → UI wired to port only → Decision log notes adapters → no vendor types in UI.

(Skeleton CMS only this task — ports come in 1.4.)
