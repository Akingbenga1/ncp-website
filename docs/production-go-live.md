# Production go-live checklist (NCP)

Deploy without changing Next ports or UI — **env + host config only**. Full topology: `Project-documents/hosting-plan.md`.

## Before DNS

1. Confirm production domain with Theresa (**NH-1**). Candidate: `naijacp.co.uk` — not locked until confirmed.
2. Choose host shape:
   - **Option A:** Next on Vercel (EU) + Strapi + managed Postgres (Railway / Render / Fly / Neon EU)
   - **Option B:** Single UK/EU VPS — see `deploy/docker-compose.prod.yml`
3. Provision managed PostgreSQL with **daily automated backups** (30-day retain minimum).
4. Generate Strapi secrets (`APP_KEYS`, salts, JWT) — never reuse `.env.example` placeholders.
5. Create Strapi **API token** (read Events/News/Listings; Listing create for suggest; password-reset issue if used).

## Environment (production)

Copy from root `.env.example` and `cms/.env.example`. Required for a public site:

| Var | Where | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Next | `https://your-domain` (no trailing slash) |
| `NEXT_PUBLIC_STRAPI_URL` | Next | `https://cms.` or `https://api.` origin |
| `STRAPI_API_TOKEN` | Next | Server-only |
| `DATABASE_*` / `DATABASE_SSL` | Strapi | Managed Postgres; `DATABASE_SSL=true` when required |
| `PUBLIC_URL` | Strapi | Same HTTPS origin as the CMS (admin + media URLs) |
| Stripe / Mail / Bank | Next | Optional until NH-3 / NH-6 / NH-4 |

Validate presence (no secret values printed):

```bash
node scripts/check-production-env.mjs
```

## DNS / HTTPS

| Record | Target |
| --- | --- |
| Apex / `www` | Next host (Vercel or reverse proxy) |
| `cms` or `api` | Strapi host |

- Terminate TLS at the edge; force HTTPS.
- Enable HSTS only after DNS is stable.
- Strapi Admin only over HTTPS.

## Deploy steps (Option A — typical)

1. Deploy Strapi → point `DATABASE_*` at managed Postgres → first admin created in UI.
2. Seed/publish content; create API token → put in Next env.
3. Deploy Next with production env; set Stripe success/cancel URLs to `NEXT_PUBLIC_SITE_URL`.
4. Point DNS; smoke Home, Events, Market, Search, Donate (bank), Login.

## Deploy steps (Option B — Compose)

```bash
cd deploy
cp .env.prod.example .env.prod   # fill secrets
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d
```

Put Caddy/Nginx (or host TLS) in front of `next` (:3000) and `strapi` (:1337). See compose comments.

## Backups

| Asset | Cadence | Owner at handover |
| --- | --- | --- |
| PostgreSQL | Daily + before major content edits | Hosting admin / EXCO tech contact |
| Media uploads | Daily or versioned bucket | Same |
| Env / secrets | On change | Password manager — never git |

Quarterly restore drill to staging recommended.

## Smoke after go-live

- [ ] `https://domain` loads Home over HTTPS
- [ ] `/events`, `/news`, `/market`, `/search` return content or empty states (not 500)
- [ ] `/sitemap.xml` and `/robots.txt` use production origin
- [ ] Strapi Admin login over HTTPS
- [ ] Session cookie `Secure` on production login
- [ ] Stripe Checkout one-off smoke (PaymentPort) — see `docs/stripe-live-smoke.md` (NH-3)

## Blocked without human

- **NH-1** — agreed domain (+ hosting account to actually provision)
- Managed DB + backup retention confirmation
