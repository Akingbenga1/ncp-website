# Task 2.1 journal

**Status:** completed

## Summary

Polished `/about`: mission glass panel (Connect / Inform / Engage), who-NCP draft copy, flyer pillars via `Pillars`, and a contact glass panel for Theresa + EXCO from shared `data/site-contact.ts`. No CMS/Strapi in the page.

## Acceptance criteria checklist

- [x] Draft copy on `/about`
- [x] Mission, who NCP is, pillars, contact present
- [x] UI DoD line — matches `current-design.md` + UI/UX Pro Max checklist
- [x] No Strapi / vendor SDKs in page

## Decision log

- Contact is static draft via `site-contact.ts` until optional `SiteSettingsPort` (Sprint 2.4 / later CMS). Page does not import adapters.
- Mission copy sits in `home2-glass` to match Home below-fold language; point-cards kept for Connect/Inform/Engage for continuity with existing interior pages.

## Needs human

None for this task. (Open: NH-1 domain; hosting; NH-7 at handover.)

## Files changed

- `app/about/page.tsx`
- `data/site-contact.ts`
- `app/globals.css` (about contact/mission)
- `Sprints/Sprint 2/Task 2.1/task2.1.md`

## Resume notes

Continue with Task 2.2 in this batch.

## Open questions

None.
