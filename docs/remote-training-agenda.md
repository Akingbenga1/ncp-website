# NCP remote training agenda (Strapi)

One live remote session for the person(s) who will manage the CMS after handover (`project-answers.md` §12). Public website content for Events, News, and Market is edited **only in Strapi Admin** — the Next.js site reads published entries through ports (ContentPort / DirectoryPort). Members are Strapi Users; admins do not manage them on the public site.

**Duration:** ~60–75 minutes  
**Who should attend:** Theresa and/or designated EXCO content admins (extra accounts: **NH-7** / `docs/strapi-extra-admins.md`)  
**Prereqs:** Working Admin URL (local or production after **NH-1**), admin login, browser with two tabs (Admin + public site)

---

## Session goals

By the end, attendees can:

1. Publish and unpublish an **Event** and a **News Article**
2. Approve or reject a **Listing** suggestion (draft → publish / delete)
3. Find a **member** and perform a GDPR delete (demo on a test user if available)
4. Understand what they **cannot** change in Strapi (Home / About / Get involved page chrome — code-backed for launch)

---

## Agenda

| Time | Topic | Demo / exercise |
| --- | --- | --- |
| 0–5 min | Login + mental model | Admin vs public site; draft vs publish; ports read published only |
| 5–20 min | **Events** | Create draft → fill title/slug/`startsAt`/description → optional image → Publish → confirm `/events` and detail |
| 20–35 min | **News** | Create or edit article → date + body → Publish → confirm `/news` |
| 35–50 min | **Listings approval** | Open a draft from `/market/suggest` (or create draft) → edit → Publish or Delete → confirm `/market` |
| 50–60 min | **Members** | Settings → Users → open a user → fields overview → GDPR delete steps (use disposable test account) |
| 60–70 min | **Page copy / media** | Media Library upload; seed copy edit; what stays in code (About / Home / Get involved) |
| 70–75 min | Q&A + support window | Point to admin guide; 30-day how-to / bug support |

---

## Talk track (short)

### Mental model

- **Strapi Admin** = create and publish content.
- **Public site** = visitors and members; never a second admin CMS.
- Unpublished = invisible on the website. Publish = live.

### Events (ContentPort)

- Content Manager → **Event**
- Required: title, slug, `startsAt`, description
- Optional: endsAt, venue, summary, image
- URLs: `/events`, `/events/{slug}`

### News (ContentPort)

- Content Manager → **News Article**
- Required: title, slug, editorial **date**, body
- URLs: `/news`, `/news/{slug}`

### Listings (DirectoryPort)

- Content Manager → **Listing**
- Public suggest creates **drafts** only — nothing goes live until Publish
- Categories: business, community-group, church, association, service, other
- Starter seed: NCP org listing only until real listings (**NH-9**)
- URLs: `/market`, `/market/{slug}`, suggest at `/market/suggest`

### Members

- Users & Permissions → **Users** (not a public Admin UI on the site)
- Registration is free and instant on `/register`
- GDPR: delete user in Strapi → confirm they cannot log in
- Own profile edits: members use `/profile` only

### Page copy

- Events / News / Listings / member data = **CMS**
- Home, About, Get involved, legal pages, nav/footer contact = **code** for this launch — request text changes during the 30-day support window (or a follow-on if after)
- Social links: `data/site-contact.ts` (**NH-8**) — not editable in Strapi

---

## Trainer checklist (before the call)

- [ ] Admin URL ready (prefer production after NH-1; else local demo)
- [ ] At least one draft Listing ready to approve (or create live in session)
- [ ] Optional: test member account for GDPR demo
- [ ] Share screen; keep public site tab open for verify-after-publish
- [ ] Send `Project-documents/admin-guide.md` link/PDF before or after the call

---

## After the session (fill in journal)

Record in `Sprints/Sprint 8/Task 8.4/task8.4-journal.md`:

- Date / time / attendees
- What was demonstrated
- Open follow-ups (e.g. NH-7 accounts, NH-9 listings)
- Any how-to questions that belong in the admin guide

Until the call happens, Task 8.4 stays **Needs human (NH-11)** — schedule with Theresa / EXCO.
