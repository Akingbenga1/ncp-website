# Task 2.3 journal

**Status:** completed

## Summary

Finalized chrome logo: SVG mark recreated with brand gradient (`#007b3d` → `#004825`) and Nigeria cutout in the P; `SiteLogo` now serves `/images/logo.svg`. Immersive header passes `immersive` for a soft drop-shadow halo so the mark stays readable on photo heroes; wordmark remains white via existing immersive CSS.

## Acceptance criteria checklist

- [x] Logo consistent in chrome (`Header` → `SiteLogo`)
- [x] Readable on light + immersive headers

## Decision log

- SVG over PNG for crisp scaling and exact brand tokens (flyer recreation retained).
- Immersive halo via CSS filter on mark only — avoids a second asset and keeps one composition root for the logo.

## Needs human

None for this task. (NH-8 social URLs still open for footer later.)

## Files changed

- `public/images/logo.svg`
- `components/SiteLogo.tsx`
- `components/Header.tsx`
- `app/globals.css` (immersive mark filter)
- `Sprints/Sprint 2/Task 2.3/task2.3.md`

## Resume notes

Batch complete. Next: **Continue Sprint 2 from Task 2.4**.

## Open questions

None.
