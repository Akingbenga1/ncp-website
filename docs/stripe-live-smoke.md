# Stripe live smoke via PaymentPort (NH-3)

Controlled charge path for go-live. **UI and server actions never import the Stripe SDK** — only `PaymentPort.createCheckout` (bound at composition root).

## Prerequisites

1. **NCP Stripe account** (not a developer account) — `project-answers.md` §6.
2. Live keys in Next host env (never commit):
   - `STRIPE_SECRET_KEY=sk_live_…`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_…` (if/when client-side Elements are used; Checkout redirect works with secret alone today)
3. `NEXT_PUBLIC_SITE_URL=https://…` set to the public site (NH-1) so success/cancel URLs are correct.
4. Dashboard: enable Checkout; confirm GBP; set brand name to NCP.

Optional: `STRIPE_WEBHOOK_SECRET` when webhook handling is added later — not required for createCheckout redirect smoke.

## Smoke procedure (preferred — through the site)

1. Deploy or run Next with the live env above.
2. Confirm `node scripts/check-production-env.mjs` notes live Stripe when key is set.
3. Open `/donation` over HTTPS.
4. Choose **£10** (or smallest comfortable amount), **one-off**, submit card form.
5. Expect redirect to Stripe Checkout (`checkout.stripe.com`) — URL comes from PaymentPort, opaque to the UI.
6. Complete with a real card (or Stripe live test if account allows) for a **minimal** amount.
7. Land on `/donation/success`; confirm payment in Stripe Dashboard → Payments.
8. Refund the smoke payment in Dashboard unless NCP keeps it as a real donation.

## If keys are missing

- `isPaymentCheckoutConfigured()` is false → donate form shows bank/unavailable message (no fake disabled CTA).
- Record **Needs human NH-3** and do not invent developer-account live keys.

## Adapter boundary (do not break)

| Layer | Allowed |
| --- | --- |
| `app/donation`, `DonateForm` | PaymentPort / composition only |
| `lib/actions/donate.ts` | `getAppServices().payments.createCheckout` |
| `lib/adapters/stripe` | Stripe SDK (concrete adapter) |
| Ports / domain | No Stripe types |

## Sign-off

| Check | Result |
| --- | --- |
| Live keys on NCP account | _pending NH-3_ |
| Checkout session created via port | _pending_ |
| Success return URL on production origin | _needs NH-1 + NH-3_ |
| Dashboard shows payment | _pending_ |
