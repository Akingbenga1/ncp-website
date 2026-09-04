# NCP 30-day post-launch support

Support for Nigerian Community Peterborough after the production site goes live (`project-answers.md` §12).

## Window

| Field | Value |
| --- | --- |
| **Duration** | 30 calendar days |
| **Start** | Date of first production HTTPS go-live on the agreed domain (see `docs/production-go-live.md`) — **gated on NH-1** |
| **End** | Start date + 30 days |
| **Recorded in** | `Sprints/progress.md` → **Support window** |

Until NH-1 completes, treat this document as the agreed policy; do not invent a fake start date.

When go-live happens, update `Sprints/progress.md` with concrete `YYYY-MM-DD` start and end.

## In scope

- Bugs on **delivered** features (broken page, publish not showing, login/register, donation Checkout when keys configured, search, suggest listing, password reset when mail configured)
- How-to questions covered by `Project-documents/admin-guide.md` and training (`docs/remote-training-agenda.md`)
- Small copy fixes for **code-backed** pages (Home / About / Get involved / legal) when requested during the window
- Env / deploy help that unblocks an already-built feature (e.g. pointing `NEXT_PUBLIC_SITE_URL` after domain confirm)

## Out of scope (unless separately agreed)

- New features or redesign
- Ongoing content writing or photo sourcing
- Extra design variants (`/home-2` etc.)
- Paid membership, member-managed listings, multilingual, apps, forums (`project-answers.md` §13)
- Support after the 30-day end date
- Work blocked only on missing client inputs without a workaround (Stripe live keys **NH-3**, charity number **NH-2**, etc.) — we can advise; we cannot invent credentials

## How to raise a request

1. Email or message the delivery contact agreed at handover (same channel used for training).
2. Include: page URL, what you expected, what happened, screenshot if useful, and whether it is Admin (Strapi) or the public site.
3. For CMS how-tos, check `Project-documents/admin-guide.md` first.

## Response expectation

- Acknowledge within 1–2 business days during the window.
- Fix or guidance for in-scope items before the window ends when feasible; critical production outages prioritized.

## Related

- Admin guide: `Project-documents/admin-guide.md`
- Training: `docs/remote-training-agenda.md`
- Go-live: `docs/production-go-live.md`
- Stripe live smoke: `docs/stripe-live-smoke.md`
