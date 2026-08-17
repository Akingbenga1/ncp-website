# Task 1.3 journal

## Status

`completed`

## Summary

Wrote `Project-documents/hosting-plan.md` covering Next + Strapi + PostgreSQL topology, UK/EU-friendly PaaS vs VPS options, HTTPS, backups, env checklist, and Needs-human go-live items. Linked from root README.

## Acceptance criteria checklist

- [x] Notes under `Project-documents/` or README

## Decision log

- Recommend **split PaaS** (Next on Vercel/Netlify + Strapi + managed Postgres in UK/EU region) as fastest launch; VPS as cost/control alternative.
- Postgres remains default concrete DB; MySQL called out as config-only swap.

## Needs human

- **NH-1** production domain
- Hosting account choice (Option A vs B) and managed DB + backup retention confirmation

## Files changed

- `Project-documents/hosting-plan.md` (new)
- `README.md` (link)
- Task checklist / this journal

## Resume notes

Sprint 1 batch 1 done. Next session: **Continue Sprint 1 from Task 1.4** (application port skeleton + composition root).

## Open questions

None blocking development.
