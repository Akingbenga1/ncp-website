# Extra Strapi administrators (NH-7)

Volunteer / EXCO admins manage content in **Strapi Admin**, not in the Next UI. The public site stays port-backed (ContentPort / DirectoryPort / MemberPort).

## When to create accounts

- **Now:** one Super Admin / Administrator (already created at first Strapi bootstrap).
- **Handover:** additional Administrators only after the client confirms **names + emails** (**NH-7**).

Do not invent emails or share a single shared password across people.

## Create an admin (Strapi Admin UI)

1. Sign in as an existing Super Admin / Administrator.
2. Go to **Settings → Administration panel → Users** (or **Admin users**).
3. **Invite user** / **Add new user**.
4. Enter the person’s **email** and **firstname/lastname**.
5. Assign role **Super Admin** only if they must manage other admins; prefer **Author** / custom role with Content Manager access for Events, News, Listings, and Users (members) if a tighter role exists — for NCP launch, **Administrator** with Content Manager + Users is the default per `admin-guide.md`.
6. Send the invite **or** set a one-time temporary password.

## Secure handoff

| Do | Don’t |
| --- | --- |
| Send invite link or temporary password via a **password manager share** / Signal / in person | Paste passwords into Slack, WhatsApp group chats, email body long-term, or git |
| Ask them to **change password** immediately on first login | Reuse the bootstrap super-admin password |
| Confirm they can open production Admin over **HTTPS** | Leave Admin on HTTP in production |
| Revoke access when someone leaves EXCO | Leave unused admin accounts active |

Production Admin URL (after deploy): `https://cms.<domain>/admin` (or the host’s Strapi URL) — see `docs/production-go-live.md`.

## Verify

1. New admin signs out/in on a private window.
2. They can open Content Manager → Event / News Article / Listing.
3. They can list Users (members) for GDPR support.
4. They **cannot** need the Next.js repo or server SSH for day-to-day content.

## Blocked without human

Collect and store (password manager note, not git):

| Field | Example |
| --- | --- |
| Full name | |
| Email | |
| Role | Administrator |
| Created on | _date_ |
| Invite sent by | |

Until NH-7 names/emails arrive, keep the single launch admin only.
