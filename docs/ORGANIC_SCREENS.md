# Organic Intelligence — Screen Scaffold (for UX/UI)

Empty skeletons for the 3 Demo Day screens. This doc tells the UX/UI team what
each screen is and **where to plug UI in**. All data is mock-only for the POC.

## How the wiring works (feature-first)

- `src/app/organic/<role>/<page>/page.tsx` — routing only, a one-line re-export. **Do not put UI here.**
- `src/features/organic/<role>/<page>/<Prefix>Client.tsx` — **the entry component. Build the screen here.**
- `src/features/organic/<role>/<page>/mock.ts` — typed mock data for the screen. Shapes are placeholders; adjust freely.
- Split large screens into `components/` next to the Client (e.g. Header, KpiCards).
- Access control is already enforced by `src/proxy.ts` (role → path prefix). Do not re-check roles in the UI.

## Screens

### Executive · Daily Brief
- **Route:** `/organic/executive/daily-brief`  ·  **Role:** Executive Viewer  ·  **Device:** desktop-first
- **Build in:** `src/features/organic/executive/daily-brief/DailyBriefClient.tsx`
- **Mock:** `mock.ts` → `DailyBrief` (date, headline, kpis[])
- **Purpose:** at-a-glance daily summary of organic-waste operations.
- **Interactions:** none yet (read-only view).

### Owner · Dashboard
- **Route:** `/organic/owner/dashboard`  ·  **Role:** Organization Owner  ·  **Device:** desktop-first
- **Build in:** `src/features/organic/owner/dashboard/OwnerDashboardClient.tsx`
- **Mock:** `mock.ts` → `OwnerDashboard` (tenantName, isReadyForPickup, kpis[])
- **Purpose:** org overview + trigger pickup readiness.
- **Interactions:** **"แจ้งพร้อมรับ" (mark ready-for-pickup) button** — flips `isReadyForPickup`. Wire to a Server Action when leaving mock. Destructive/outward actions need a confirm step (see CLAUDE.md).

### Operator · Tasks
- **Route:** `/organic/operator/tasks`  ·  **Role:** Operator  ·  **Device:** MOBILE-FIRST
- **Build in:** `src/features/organic/operator/tasks/OperatorTasksClient.tsx`
- **Mock:** `mock.ts` → `PickupTask[]` (id, location, status)
- **Purpose:** operator's pickup task list for the day.
- **Interactions:** **"complete pickup" per task** (pending → completed). Wire to a Server Action when leaving mock.

## Notes
- Call `/ui-ux-pro-max` or `/frontend-design` before building UI (CLAUDE.md rule).
- Keep files ≤ 300 lines, no `any`, `'use client'` only on leaf interactive nodes.
