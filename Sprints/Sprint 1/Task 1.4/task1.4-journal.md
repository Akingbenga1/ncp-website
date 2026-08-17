# Task 1.4 journal

**Status:** completed

## Summary

Added hexagonal port skeleton under `lib/`: domain types, port interfaces for all core features, no-op adapters, and a composition-root factory (`createAppServices` / `getAppServices`). UI remains free of Strapi/Stripe imports.

## Acceptance criteria checklist

- [x] Ports exist (interfaces + domain types)
- [x] UI does not import Strapi/Stripe
- [x] Composition root binds concrete adapters (noop for now)
- [x] Core-feature DoD line for skeleton

## Decision log

- **Ports & Adapters (hexagonal):** Core features need swappable CMS/payment/mail without UI rewrites — ports are the smell fix, not over-engineering.
- **Factory Method** via `createAppServices(overrides?)`: single place to bind adapters; overrides enable tests and gradual Strapi/Stripe swap.
- **No-op adapters** (not null): keep call sites typed and safe until Sprint 3–6; mutating ops throw clearly; reads return empty/null.
- **Separate AuthPort vs MemberPort:** session/auth vs profile edit map cleanly to later Strapi user flows.
- **Layout:** `lib/domain`, `lib/ports`, `lib/adapters/noop`, `lib/composition` — UI imports `@/lib/ports` or `getAppServices()` only.

## Needs human

None for this task.

## Files changed

- `lib/domain/*`
- `lib/ports/*`
- `lib/adapters/noop/*`
- `lib/composition/create-app.ts`, `lib/composition/index.ts`
- `lib/index.ts`
- `Sprints/Sprint 1/Task 1.4/task1.4.md`

## Resume notes

Continue with Task 1.5 (site chrome).

## Open questions

None.
