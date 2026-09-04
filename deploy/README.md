# Production Compose (Option B — single UK/EU VPS)

Same ports/adapters as local: Next talks to Strapi via env URLs only.

**Not a full TLS stack** — put Caddy or Nginx + Let’s Encrypt in front of published ports, or terminate TLS at a load balancer.

## Services

| Service | Internal | Typical public |
| --- | --- | --- |
| `postgres` | 5432 | not published |
| `strapi` | 1337 | `https://cms.example` |
| `next` | 3000 | `https://example` |

## Quick start

```bash
cp .env.prod.example .env.prod
# edit secrets, PUBLIC_URL, NEXT_PUBLIC_*
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
```

First Strapi boot: open Admin over HTTPS and create the super-admin. Then create an API token for Next.

## Backups

Use the host’s Postgres volume snapshot **or**:

```bash
docker compose -f docker-compose.prod.yml --env-file .env.prod exec -T postgres \
  pg_dump -U "$DATABASE_USERNAME" "$DATABASE_NAME" | gzip > "ncp-pg-$(date +%F).sql.gz"
```

Retain ≥ 30 days off-box. Media: back up the `strapi_uploads` volume or use an S3-compatible upload provider.
