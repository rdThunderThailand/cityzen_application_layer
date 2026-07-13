# CityZen Application Layer

Application layer ของ CityZen ที่รันบน **Thunder Core** (repo: `../Thunder_Core`) — Thunder เป็นเจ้าของ identity/tenant/membership/role, repo นี้เป็นเจ้าของ UI + workspace ของ sub-app

Sub-app แรก: **Organic Intelligence** (POC สำหรับ BDI Hackathon — **Demo Day 17 ก.ค. 2026**)

> **อ่านก่อนเริ่มงานทุกครั้ง:**
>
> 1. [`CONTEXT.md`](CONTEXT.md) — ศัพท์ + มติการออกแบบทั้งหมด (role model, auth, data policy, demo scope)
> 2. [`docs/SESSION_HANDOFF.md`](docs/SESSION_HANDOFF.md) — session ก่อนทำอะไรไว้ ค้างอะไรอยู่
>
> **จบงาน feature/การเปลี่ยนแปลงใหญ่:** เพิ่ม entry บนสุดของ SESSION_HANDOFF.md เสมอ

## Workflow Rules

- **Ask First (Pre-Execution Review):** ก่อนเขียนโค้ดหรือเปลี่ยนโครงสร้างหลัก ต้องเสนอ 2–3 ทางเลือกและรอการอนุมัติ
- **Risk tags:** R0 = irreversible (ขออนุญาตก่อน) / R1 = costly (ระบุเหตุผล) / R2 = easy (ทำได้เลย)
- **NO MAGIC:** ห้ามเดาว่ามีไฟล์/โฟลเดอร์อยู่ ถ้าไม่แน่ใจให้ถาม
- **Verify Before Done:** ต้องมีหลักฐานการทดสอบก่อนบอกว่าเสร็จ — ฟีเจอร์ที่พึ่ง external API (Thunder Core ฯลฯ) `npm run build` ผ่านอย่างเดียว**ไม่นับว่าเสร็จ** ต้องมี manual E2E checklist หรือระบุชัดว่ายังไม่ได้ verify กับ Thunder จริง
- **No Scope Creep:** ทำแค่ที่สั่ง ห้ามเพิ่มฟีเจอร์เอง ห้าม refactor โค้ดที่ไม่เกี่ยว

## Tech Stack

- **npm only** (มี `package-lock.json` — ห้ามใช้ pnpm/yarn)
- Next.js 16 App Router, React 19, Tailwind CSS v4
- Supabase ผ่าน `@supabase/ssr` (auth เท่านั้น — ดู Data Policy), JWT ด้วย `jose`
- ต้อง validate ข้อมูลเมื่อไหร่ → Zod v4

## Structure & Feature-First Convention

```
src/
  app/                      ← routing เท่านั้น — page.tsx (import client จาก features)
    (auth)/login/           ← login ตรง (UI) → loginAction (Server Action ใน features/auth)
    (auth)/register/        ← UI ค้าง ยังไม่ wire (identity เป็นของ Thunder — ไม่มี sign-up)
    (auth)/auth/launch/     ← แลก launch token จาก Thunder → cityzen_session
    (dashboard)/(platform)/overview/        ← CityZen hub (เลือก sub-app)
    (dashboard)/(workspace)/resource-intelligence/   ← sub-app: Organic Intelligence
      executive/…  manager/…  operator/…
    api/webhooks/thunder/   ← Thunder→CityZen webhook receiver (self-auth ด้วย WEBHOOK_SECRET)
    no-access/
    page.tsx                ← "/" redirect ไป home ของ role
  features/resource-intelligence/<role>/<page>/
    <Prefix>Client.tsx      ← entry ของหน้า
    components/             ← section ย่อย (Header, KpiCards, …)
    mock.ts                 ← mock data ของหน้า (typed) — หน้าที่ wire แล้วดึงจาก hospitality_waste แทน
  features/auth/            ← loginAction / logoutAction (Server Actions)
  lib/                      ← thunder.ts (API client), app-session.ts (JWT), roles.ts, supabase-db.ts (DB client factory), directory-cache.ts
  utils/supabase/           ← client.ts / server.ts
  proxy.ts                  ← middleware: auth guard + liveness + role/path guard
```

> **หมายเหตุ:** `features/organic/…` เก่ายังหลงเหลือ (`owner/storyboard`) จากก่อน rename — dead code รอลบ ห้ามยึดเป็นแบบ

- **`page.tsx` ทำแค่ import + render client** — logic/components/actions ทั้งหมดอยู่ `src/features/`
- ตัวอย่าง pattern ที่ยึด: `../Thunder_Core/src/app/(dashboard)/(workspace)/[tenant_id]/assets/officer/general/page.tsx` กับ feature คู่กันที่ `../Thunder_Core/src/features/tenant-assets/officer/general/`
- Sub-app ใหม่ในอนาคต (water, energy, …) = โฟลเดอร์ใหม่ใต้ `app/` + `features/` — ห้ามแตะ `/organic`

## Auth & RBAC (สรุป — รายละเอียดใน CONTEXT.md)

> **วิธี login/auth ทำงานยังไง (flow + diagram):** [`docs/AUTHENTICATION_FLOW.md`](docs/AUTHENTICATION_FLOW.md) — เอกสารอธิบาย end-to-end auth flow (launch / login ตรง / per-request guard / logout) พร้อม mermaid diagram · ค่า canonical (role table, token schema, cookie) อยู่ที่ [`docs/AUTH_CONTRACT.md`](docs/AUTH_CONTRACT.md)

- 2 ทางเข้า จบที่ cookie `cityzen_session` (JWT HS256, 8 ชม.) เสมอ:
  - **Launch จาก Thunder**: `/auth/launch?token=` (launch token อายุ 1 นาที)
  - **Login ตรง**: `/login` (Supabase password) → `/auth/session`
- Role resolve **ครั้งเดียว**ตอนสร้าง session จาก `membership_roles[].roles.code` ของ Thunder:
  `admin_company`/`company_admin` → Organization Owner, `operator*` → Operator, `executive_viewer` → Executive Viewer (`viewer_auditor` → ไม่มีสิทธิ์ → /no-access)
- Thunder platform `super_admin` = **god mode**: ข้าม role/prefix guard ทั้งหมด (`isSuperAdmin` claim ใน App Session, เช็คแยกจาก `resolveCityzenRole` — ดู `isThunderSuperAdmin` ใน `src/lib/roles.ts`)
  (priority เมื่อมีหลาย role: `owner` > `executive_viewer` > `operator`)
- **ห้ามใช้ claim `role` จาก launch token ทำ RBAC** — นั่นคือ platform role ของ Thunder
- ไม่มี membership → หน้า `/no-access`
- `proxy.ts` guard ทั้ง auth และ prefix ต่อ role (`/organic/executive` เฉพาะ Executive Viewer ฯลฯ)

## Data Policy (Hackathon)

- **ส่วนใหญ่ยัง mock** — `mock.ts` ต่อ feature สำหรับหน้าที่ยังไม่ wire
- **Data-plane จริงมีแล้ว (บางส่วน):** Supabase project แยก (`wmcliqjttbpihjcosmmc`, schema `core`/`disaster_ops`) ต่อผ่าน service-role — executive daily-brief อ่าน KPI/incident จริงจากตรงนี้ · **วิธีต่อ DB + security model + ช่องโหว่ tenant-scoping:** [`docs/DATA_ACCESS.md`](docs/DATA_ACCESS.md)
- Supabase project เดียวกับ Thunder = **auth เท่านั้น** (คนละ project กับ data-plane) — ห้ามสร้างตาราง domain ในนั้น

## Environment Variables (`.env` — มี `.env.local.example`)

| ตัวแปร                                                       | ใช้ทำอะไร                                                                  |
| ------------------------------------------------------------ | -------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project เดียวกับ Thunder (auth)                                   |
| `SUPABASE_JWT_SECRET`                                        | verify launch token จาก Thunder                                            |
| `THUNDER_CORE_API_URL`                                       | base URL ของ Thunder Core (`/api/core/v1`) — dev = `http://localhost:3001` |
| `APP_SESSION_SECRET`                                         | เซ็น `cityzen_session`                                                     |

## Conventions

- camelCase (vars/functions), PascalCase (components/types), kebab-case (files), SCREAMING_SNAKE (constants)
- Boolean: is/has/should/can prefix; arrow functions; public API บนสุด helpers ล่าง
- ไฟล์ ≤ 300 บรรทัด; ไม่มี `any`, dead code, commented-out code
- Default = Server Components; `'use client'` เฉพาะ leaf nodes; mutations = Server Actions + `useActionState`
- ไม่ส่ง raw errors จาก Thunder/Supabase ออก frontend
- **ไม่ใส่ Claude เป็น contributor** — ไม่มี "Co-Authored-By: Claude" ใน commits
- **Destructive mutations ต้องมี confirm step** (`window.confirm` / AlertDialog / 2-step button)
- **Optimistic updates ต้องระบุ error strategy** เป็น comment กำกับ (fire-and-forget หรือ rollback + toast)

## UI/UX

- เรียก `/ui-ux-pro-max` หรือ `/frontend-design` ทุกครั้งที่ทำ UI ใหม่
- Executive/Owner = web desktop-first, Operator = **mobile-first**
