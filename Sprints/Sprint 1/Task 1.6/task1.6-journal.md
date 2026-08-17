# Task 1.6 journal

**Status:** completed

## Summary

Primary nav now matches production IA: Home, About, Events, News, Market, Donation, Get involved, plus a Search affordance. Experimental `/home-*` stay out of primary chrome. Stub routes added so links resolve. Horizontal nav starts at 1024px to fit the denser IA.

## Acceptance criteria checklist

- [x] Labels match production IA + Search
- [x] Mobile ≥44px; `aria-current`
- [x] Experimental homes out of primary IA
- [x] UI DoD line

## Decision log

- Nav config in `data/primary-nav.ts` — single source for IA labels/hrefs.
- Search: SVG icon link to `/search` (label visible in mobile menu; visually hidden on desktop, `aria-label` retained).
- Stub pages via shared `StubPage` — on-brand placeholders until Sprints 3–6 wire ports.
- Desktop breakpoint raised to 1024px for horizontal nav (7 links + search).

## Needs human

None.

## Files changed

- `data/primary-nav.ts`
- `components/Header.tsx`
- `components/StubPage.tsx`
- `app/events/page.tsx`, `app/news/page.tsx`, `app/market/page.tsx`, `app/donation/page.tsx`, `app/search/page.tsx`
- `app/globals.css`
- `Sprints/Sprint 1/Task 1.6/task1.6.md`

## Resume notes

Continue Sprint 1 from Task 1.7 (Home production polish).

## Open questions

None.
