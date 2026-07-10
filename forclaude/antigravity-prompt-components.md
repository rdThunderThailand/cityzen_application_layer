## Task

Read the reference image `forclaude/CardDataLong.png` first — look at it carefully before writing any code. It shows the target design for a new reusable card component.

Also read `@CardData.tsx` — use it as the **structural and stylistic reference**: same conventions (Tailwind via the project's `cn` utility, `lucide-react` icons, config `Record`s at module top for label/color/status mapping, exported prop interfaces, string-literal union types, `className` merge + `...props` spread, named + default export, `truncate`/`min-w-0`/`shrink-0` overflow handling). Match `CardData.tsx`'s patterns as closely as the new design allows — do not invent a different styling approach or a different way of structuring config/props than what `CardData.tsx` already establishes.

## What to build

A new component, `CardDataLong.tsx`, placed as a sibling file next to `CardData.tsx` (same folder). It should look like `forclaude/CardDataLong.png` — a **wider/longer variant** of the card pattern (confirm the exact layout differences from the image: e.g. horizontal orientation, longer content area, different item arrangement — describe what you see in the image and build to match it, don't assume it's identical to any existing variant).

- Reuse as much of `CardData.tsx`'s existing logic/types as sensibly possible (e.g. if it uses a similar status/tone system, extend or import the existing config Records rather than duplicating them — check whether `CardData.tsx` already exports its `statusConfig`/`toneConfig`/types, and if not, consider whether they should be exported so `CardDataLong` can share them instead of redefining the same labels/colors twice).
- Fully data-driven via props — no hardcoded demo content baked into the component itself.
- Export a clear prop interface (e.g. `CardDataLongProps`) and, if needed, an item-level interface, following the naming convention already used in `CardData.tsx` (`CardDataItemProps`, `CardDataProps`, etc. — pick names that read as a natural extension, e.g. `CardDataLongItemProps`, `CardDataLongProps`).

## Where to use it

Open:

```
src/app/(dashboard)/(workspace)/resource-intelligence/executive/daily-brief/tabs/tabs1Panel.tsx
```

Find the existing usage of `CardMetricWLineChart` in this file. **Replace it with `CardDataLong`**, using the same underlying data currently passed to `CardMetricWLineChart` — this data comes from:

```
migration/executive/daily-brief/seed_data_within_day.ts
```

Read this file to see the actual shape/fields of the data currently feeding `CardMetricWLineChart`. You may adapt/reshape that data as needed to fit `CardDataLong`'s prop shape (e.g. remapping field names, splitting/combining values, deriving new fields from existing ones), but keep it representative of the same information — don't invent unrelated content or pull from a different seed file. If a small amount of the data doesn't map cleanly onto the new component's shape, adjust what's necessary (either via a small mapping/transform function in `tabs1Panel.tsx`, or by extending `seed_data_within_day.ts` with additional fields if genuinely needed) and note what you changed and why.

If you extend `seed_data_within_day.ts` with new fields, that file may also be modified as part of this task (see Scope restriction below) — but do not create a separate new seed file for this; keep using this one.

## Scope restriction

- Create only one new file: `CardDataLong.tsx` (in the same folder as `CardData.tsx`).
- Modify only `tabs1Panel.tsx` to swap the `CardMetricWLineChart` usage for `CardDataLong`. Do not change other tabs, other panels, the sidebar/header/footer, or any other file.
- You may modify `migration/executive/daily-brief/seed_data_within_day.ts` **only** to add fields needed by `CardDataLong` — do not remove or rename existing fields still used elsewhere, and do not restructure the file beyond what's needed.
- Do not modify `CardData.tsx` itself unless the only change is exporting existing config Records/types so `CardDataLong` can import and reuse them (no behavior change to `CardData.tsx`'s own rendering).
- Do not delete `CardMetricWLineChart` itself or its file — just stop using it in `tabs1Panel.tsx`. (If it turns out to be unused anywhere else in the codebase after this change, mention that in your summary but don't delete it unless asked.)

## Hard requirements

1. TypeScript strict; export all new prop interfaces and any new union types.
2. Reuse existing config Records/types from `CardData.tsx` instead of duplicating label/color logic, where the design overlaps.
3. No layout regressions elsewhere in `tabs1Panel.tsx` — only the specific card/section using `CardMetricWLineChart` should change.
4. Before finalizing, briefly describe what `forclaude/CardDataLong.png` actually shows (layout, what's different from `CardData.tsx`'s existing variants) so it's clear the build was based on the image, not assumed.
5. Show the final full `CardDataLong.tsx` and the diff/updated section of `tabs1Panel.tsx`.