## Task

Read the reference image `forclaude/CardWMapGreen.png` first — look at it carefully before writing any code. Also read the existing component `@CardWMap.tsx` — this is the direct structural reference; `CardWMapGreen.png` shows a variant that looks almost identical to what `CardWMap.tsx` already renders. Before building anything, briefly describe:

1. What `CardWMap.tsx` currently does (props, structure, how it uses its mock map image).
2. What's actually different in `CardWMapGreen.png` compared to `CardWMap.tsx`'s current output — color/tone changes, different stat values, a different accent, different labels, etc. Call out specifically what changes and what stays the same.

This confirms the build is based on a real diff between the existing component and the image, not a guess.

## Key detail: the mock map image

`CardWMap.tsx` currently uses a static mock map image asset, `mockmap2.png`, as its map visual (not an SVG or a live map integration). Check where this asset lives (likely under a `public/` images folder or similar — locate its actual import path in `CardWMap.tsx`) and follow the exact same approach for the new variant: reuse the same image-based mock pattern. Do **not** replace the image-based approach with hand-rolled SVG or a real map library — match `CardWMap.tsx`'s existing technique exactly, including the same `mockmap2.png` asset, unless the reference image `CardWMapGreen.png` clearly shows a visually different map image (in which case flag this and ask before sourcing/creating a new image asset — do not fabricate a new map image yourself).

## What to build

Decide, based on your comparison above, whether this should be:

- **(a) A new prop/variant on `CardWMap.tsx` itself** (e.g. a `tone`/`accent` prop that swaps colors, following the config-Record pattern already used elsewhere in this codebase), if the only difference from the image is a color/tone/content change and the structure is otherwise identical — this is the preferred approach if it fits, since it avoids duplicating a whole component for a palette change.
- **(b) A new sibling component `CardWMapGreen.tsx`**, only if the structural differences are significant enough that a shared variant prop would be awkward.

State which approach you're taking and why before implementing it.

Either way, follow `CardWMap.tsx`'s existing conventions exactly: the project's `cn` utility for Tailwind class merging, exported prop interfaces, config `Record`s at module top for any label/color/status mapping (no inline color conditionals in JSX), `className` merge + `...props` spread, named + default export, and the same overflow-safe patterns (`truncate`/`min-w-0`/`shrink-0`) already in use.

## Scope restriction

- If going with approach (a): modify only `CardWMap.tsx`, additively — existing usages of `CardWMap` (with no new prop set) must render exactly as they do today. No breaking changes to its existing prop interface.
- If going with approach (b): create only `CardWMapGreen.tsx` as a new sibling file next to `CardWMap.tsx`. Do not modify `CardWMap.tsx` in this case unless it's to export shared config/types so the new component can reuse them instead of duplicating label/color logic.
- Do not modify `CardData.tsx` or any other existing card component.
- Do not touch any dashboard page files (`war-room`, `decision`, `communication`, `outcome`, `daily-brief`, or any other route) as part of this task — this is a component-only build. Do not wire it into any page yet unless explicitly asked.
- Do not create, generate, or replace any image assets — reuse `mockmap2.png` as-is unless told otherwise.

## Hard requirements

1. TypeScript strict; export any new/extended prop interfaces and union types.
2. No new chart/map libraries, no hand-rolled SVG replacing the existing image-based mock — stay consistent with `CardWMap.tsx`'s current technique.
3. All colors/labels/status logic in config Records at module top, matching the pattern already used in `CardWMap.tsx` and `CardData.tsx`.
4. Zero regressions to existing `CardWMap` usages if approach (a) is chosen.
5. Show the final full changed/new file(s), plus a short standalone usage example demonstrating the green variant with representative data matching `CardWMapGreen.png`.