# Task 1.7 journal

**Status:** completed

## Summary

Polished production Home `/`: immersive composition kept; hero names Nigerian Community Peterborough; draft copy uses connect / inform / engage and flyer pillars; CTAs point at real/stub routes (`/about`, `/donation`, `/events`, `/market`, `/get-involved`). Corrected “Enquireies” → “Enquiries” in UI and `current-design.md`.

## Acceptance criteria checklist

- [x] Immersive home per `current-design.md`
- [x] Draft NCP copy; no lorem
- [x] CTAs to real/stub routes (not vendor SDKs)
- [x] UI DoD line — matches `current-design.md` + UI/UX Pro Max checklist

## Decision log

- Hero kicker = full org name (brand-level signal); place line stays `h1` per locked composition.
- Hero quick links use page routes (not in-page hashes) so they match primary IA stubs.
- Feature-flow CTAs map 1:1 to IA: Get involved, Market, Donation, Events.
- Design-doc typo “Enquireies” fixed to production English “Enquiries”.

## Needs human

None for this task. (Open from earlier sprints: NH-1 domain; hosting; NH-7 at handover.)

## Files changed

- `app/page.tsx`
- `components/Home2FeatureFlow.tsx`
- `Project-documents/current-design.md`
- `Sprints/Sprint 1/Task 1.7/task1.7.md`

## Smoke test results

- CTA hrefs resolve to existing stub/page routes.
- No vendor SDK imports on Home.
- Linter clean on touched TSX.

## Resume notes

Sprint 1 complete. Next: **Continue Sprint 2 from Task 2.1**.

## Open questions

None.
