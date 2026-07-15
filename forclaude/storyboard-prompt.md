# Task: Split the Executive Storyboard into a layout + index + step-detail route

## Read first

Before touching anything: `CLAUDE.md`, `CONTEXT.md`, and `docs/SESSION_HANDOFF.md` at the repo root. Follow their workflow rules exactly — in particular **Ask First**, **NO MAGIC**, and **No Scope Creep**. Do not assume a file/folder exists; verify it first.

## Context

The executive "storyboard" page currently renders one monolithic client component:

- Route: `src/app/(dashboard)/(workspace)/resource-intelligence/executive/storyboard/page.tsx` — just imports and renders `OwnerStoryboardClient`.
- `src/features/resource-intelligence/executive/storyboard/OwnerStoryboardClient.tsx` — renders, in one file: `StoryboardHeader`, a 5-column grid of 13 `StoryboardStepCard`s + `WorkspacePanel`, and a bottom-right "เข้าสู่ Executive Workspace" link (`ArrowRight` + `Link` to `/resource-intelligence/executive/daily-brief`).
- `src/features/resource-intelligence/executive/storyboard/components/StoryboardStepCard.tsx` — one component with a big `if (step.id === "01")` … `"13"` chain, each branch a bespoke card layout. Every card has a hover footer ("ดูข้อมูลทั้งหมด" + chevron) that currently does nothing (no link/onClick).
- `src/features/resource-intelligence/executive/storyboard/components/StoryboardHeader.tsx`, `WorkspacePanel.tsx`, `mock.ts` (types `StoryboardStep`/`StoryboardStepTone`, `storyboardSteps`, `trustPillars`, `profile`, `workspaceModules`).
- `src/app/(dashboard)/(workspace)/resource-intelligence/executive/storyboard/[step]/page.tsx` already exists as an **empty file** — it's the intended target for per-step detail, just never built.

Per `CLAUDE.md`, `features/organic/…` is **dead code left over from a rename** — "ห้ามยึดเป็นแบบ" (do not use it as the pattern to build on). The live convention is feature-first under `src/features/resource-intelligence/<role>/<page>/`, e.g. the sibling `src/features/resource-intelligence/executive/daily-brief/`.

## Goal

Turn the single-page storyboard into a **layout + index + dynamic detail route**, without changing what the storyboard visually communicates:

1. **`storyboard/layout.tsx`** (new) — wraps the route segment. Contains:
   - `StoryboardHeader`
   - `{children}`
   -ก่อนหน้า and ต่อไป button that navigate to the previous and next page.
   - the "เข้าสู่ Executive Workspace" CTA (same link target, same position/look)
   - Reproduce the outer shell from `OwnerStoryboardClient` (the `<main>` wrapper: `relative mx-auto flex min-h-screen flex-col …`, padding, shadow) so the page reads identically to today.

2. **`storyboard/page.tsx`** (index, currently the monolith) — will navigate to **`/resource-intelligence/executive/storyboard/1`**

3. **`storyboard/[step]/page.tsx`** (currently empty) — new detail page for a single step, keyed by `step.id` (e.g. `/storyboard/3`). just put a content from step there and make it widht and height full.

Everypage MUST fit the screen with no scroll needed.


## How I want to work

**Go step by step, and get my explicit approval before moving to the next step.** Suggested breakdown (adjust if you see a better split, but tell me why first):

1. Propose where the code should live (see open question below) and the exact file list you'll create/move/edit. Wait for approval.
2. Build `layout.tsx` + slim down `page.tsx` to the grid only. Show me the diff/result before wiring navigation.
3. Design and build `[step]/page.tsx`. Show me the plan for what it displays before writing the full implementation.
4. Wire the card hover-footer links to the new detail route.

**If anything is ambiguous or you're about to guess, stop and discuss it with me instead of assuming.** Concretely, these are open right now and I expect you to raise them rather than pick silently:

- **Where should the code live?** Move/rewrite `StoryboardHeader`, `StoryboardStepCard`, `WorkspacePanel`, `mock.ts` into a new `src/features/resource-intelligence/executive/storyboard/` (matching the `daily-brief` sibling and the feature-first convention), vs. keep importing from `features/organic/...` as `page.tsx` does today. CLAUDE.md says not to build on the organic dead code, so I lean toward migrating it — confirm before you move/delete anything in `features/organic`.
- **What does the `[step]` detail page actually show?** Options: (a) reuse the existing per-step branch content from `StoryboardStepCard` at a larger size, (b) a genuinely richer detail view per step (more data, closer to what the daily-brief/executive pages show), (c) something else. Don't invent new content for 13 steps without checking with me first.
- **Routing/param details**: is `step` the zero-padded id string (`"01"`–`"13"`) or a slug? What happens on an unknown/out-of-range `[step]` — 404 via `notFound()`, or redirect to the index?
- **Does the bottom-right "เข้าสู่ Executive Workspace" link belong in the layout on every step page, or only on the index?**

## Constraints (from CLAUDE.md)

- Files ≤ 300 lines; no `any`; no dead/commented-out code.
- Default to Server Components; `'use client'` only on leaf nodes that need it (check whether `StoryboardStepCard`/header truly need client-side state — `LiveDateTime` likely does).
- camelCase/PascalCase/kebab-case conventions as documented.
- Don't refactor unrelated code, don't add features beyond this restructuring.
- `npm run build` passing is not "done" — since this is pure UI/mock data with no external API dependency, do a manual click-through (index → click a card → detail page renders → back/nav works) before calling it complete.

Start with step 1 of the breakdown above: give me your proposed file list and the answers (or your recommendation) to the open questions, and wait for my go-ahead.
