# Task 1.4 — Application port skeleton + composition root

## Steps

- [x] Create `lib/domain/` domain types for Events, News, Listings, Member/Auth, Payment, Search, Mail
- [x] Create `lib/ports/` interfaces: `ContentPort`, `DirectoryPort`, `AuthPort` / `MemberPort`, `PaymentPort`, `SearchPort`, `MailPort`
- [x] Add no-op adapters under `lib/adapters/noop/` (stubs OK)
- [x] Add composition-root factory that binds adapters (`lib/composition/`)
- [x] Ensure UI / pages do not import Strapi or Stripe
- [x] Record pattern choice in journal Decision log

## Acceptance criteria

- [x] Ports exist (interfaces + domain types)
- [x] UI does not import Strapi/Stripe
- [x] Composition root binds concrete adapters (noop for now)
- [x] Core-feature DoD: Port/contract defined → concrete adapter implemented → UI wired to port only → Decision log notes adapters → no vendor types in UI
