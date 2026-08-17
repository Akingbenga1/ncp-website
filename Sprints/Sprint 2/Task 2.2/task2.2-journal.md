# Task 2.2 journal

**Status:** completed

## Summary

Production-toned `/get-involved`: three paths (Member / Volunteer / Support) with CTAs to `#membership-enquiry` or `/donation`. Labelled `MembershipEnquiryForm` intercepts submit (no fake “sent”); interim actions are Email Theresa / Call EXCO. Donate side panel links to `/donation`. Contact from `site-contact.ts`.

## Acceptance criteria checklist

- [x] UI DoD line
- [x] Form does not hardcode Strapi/Stripe or claim successful send
- [x] Support → `/donation`; member/volunteer → enquiry anchor

## Decision log

- Form is UI-only until AuthPort + MailPort wire (Sprint 5–6). `preventDefault` + honest note; no noop success toast.
- CTAs point at real routes/anchors, not Stripe/Strapi SDKs.
- Shared `site-contact` keeps About / Get involved contacts aligned (Footer remains Task 2.4).

## Needs human

None for this task.

## Files changed

- `app/get-involved/page.tsx`
- `components/MembershipEnquiryForm.tsx`
- `app/globals.css` (form select, actions, path CTA, donate contrast)
- `data/site-contact.ts` (shared)
- `Sprints/Sprint 2/Task 2.2/task2.2.md`

## Resume notes

Continue with Task 2.3 in this batch.

## Open questions

None.
