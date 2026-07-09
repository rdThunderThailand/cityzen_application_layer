# AUTH_CONTRACT — สัญญากลางระหว่าง Thunder Core ↔ CityZen

> **สถานะ:** Spec นี้คือ source of truth ของ contract ข้ามระบบ 3 เรื่อง: Role Resolution, Launch Token Schema, Cookie Security
> ถ้าโค้ดฝั่งใดฝั่งหนึ่งขัดกับเอกสารนี้ = bug (แก้โค้ดหรือแก้เอกสารพร้อม PR เดียวกัน ห้ามปล่อยให้แยกทาง)
>
> อัปเดตล่าสุด: 2026-07-08 · อ้างอิงโค้ด: cityzen `src/lib/roles.ts`, `src/lib/app-session.ts` · Thunder `src/lib/core/ApplicationService.ts` (`launchApplication`)

---

## 1. Role Resolution — ชุดเดียว ใช้ทั้งสองฝั่ง

### 1.1 หลักการ

- **Source of truth = DB ของ Thunder:** `memberships` → `membership_roles` → `roles.code` ของ tenant ที่กำลังเข้าใช้
- **ห้ามใช้** claim `role` ใน launch token ทำ RBAC ฝั่ง CityZen — ค่านั้นคือ _platform role_ ของ Thunder (`roles.role_type`) ใส่มาเพื่อ debug/แสดงผลเท่านั้น
- **ห้ามใช้** `app_metadata.role` จาก Supabase JWT — Thunder middleware เองก็ query DB สดทุกครั้ง (ดู `Thunder_Core/src/middleware.ts` → `resolveRole()`)
- CityZen resolve role **ครั้งเดียว** ตอนสร้าง session แล้ว bake ลง `cityzen_session` (ดู §3) — ยอมรับ trade-off สิทธิ์ค้างได้สูงสุดเท่าอายุ session

### 1.2 ตาราง mapping (canonical)

Thunder `roles.code` (ระดับ membership ใน tenant) → CityZen role:

| Thunder `roles.code`              | CityZen role          | หมายเหตุ                                                                                    |
| --------------------------------- | --------------------- | ------------------------------------------------------------------------------------------- |
| `admin_company` & `company_admin` | `owner`               | seed ของ Thunder ใช้ code นี้                                                               |
| `department_admin`                | `owner`               | `UserRole` type ของ Thunder ใช้ code นี้ — **รับทั้งสองแบบ**                                |
| `executive_viewer`                | `executive_viewer`    |                                                                                             |
| `operator*` (prefix match)        | `operator`            | ครอบคลุม `operator`, `operator_supervisor`, …                                               |
| `viewer_auditor`                  | _(ไม่มีสิทธิ์)_       | → `/no-access`                                                                              |
| `super_admin`                     | _(ไม่ map เป็น role)_ | เช็คแยกเป็น `isSuperAdmin` (god mode, ข้าม prefix guard) — role claim fallback เป็น `owner` |
| อื่นๆ / ไม่รู้จัก                 | _(ไม่มีสิทธิ์)_       | fail closed → `/no-access`                                                                  |

### 1.3 Priority เมื่อ 1 membership มีหลาย role

```
owner > executive_viewer > operator
```

### 1.4 กติกาเพิ่มเติม

- ไม่มี membership ใน tenant ที่ระบุ → `null` → `/no-access`
- `/me/memberships` ของ Thunder filter `status IN (invited, active)` มาแล้ว — CityZen ไม่เช็ค status ซ้ำ
- Thunder ฝั่ง platform ใช้ priority ของตัวเองจาก `roles.role_type` (super_admin 100 > executive_viewer 70 > company_admin 50 > viewer_auditor 20 > operator 10) — **คนละแกนกับตารางข้างบน** อย่าเอามาปนกัน: `role_type` = tier ของ platform, `code` = persona ใน tenant

### 1.5 ที่อยู่ของ implementation

| ฝั่ง    | ไฟล์                                                               | หน้าที่                                         |
| ------- | ------------------------------------------------------------------ | ----------------------------------------------- |
| CityZen | `src/lib/roles.ts` — `resolveCityzenRole`, `isThunderSuperAdmin`   | mapping ตาม §1.2–1.4 (canonical implementation) |
| Thunder | `src/middleware.ts` — `resolveRole` + `src/utils/supabase/rbac.ts` | platform-tier resolution (คนละแกน — ดู §1.4)    |

**เมื่อ role model เปลี่ยน (เพิ่ม/เปลี่ยน code):** แก้ตาราง §1.2 ในไฟล์นี้ + `roles.ts` ฝั่ง CityZen ใน PR เดียวกัน แล้วแจ้งทีม Thunder

---

## 2. Launch Token Schema

Token ที่ Thunder ออกให้ตอนกด Launch app → CityZen แลกเป็น `cityzen_session` ที่ `/auth/launch?token=`

### 2.1 รูปแบบ

| คุณสมบัติ  | ค่า                                                                   |
| ---------- | --------------------------------------------------------------------- |
| ชนิด       | JWT (JWS compact)                                                     |
| Algorithm  | `HS256`                                                               |
| Secret     | `SUPABASE_JWT_SECRET` — **ต้องตั้งค่าตรงกันทั้งสอง repo/เซิร์ฟเวอร์** |
| อายุ       | **1 นาที** (`exp = iat + 60s`) — ใช้แลกทันทีเท่านั้น ไม่มี refresh    |
| การส่ง     | query string: `<app.url>?token=<jwt>`                                 |
| ผู้เซ็น    | Thunder `ApplicationService.launchApplication()`                      |
| ผู้ verify | CityZen `src/app/(auth)/auth/launch/route.ts`                         |

### 2.2 Claims

| Claim       | Type   | Required | ความหมาย                                                                            |
| ----------- | ------ | -------- | ----------------------------------------------------------------------------------- |
| `sub`       | string | ✅       | Supabase user id (uuid)                                                             |
| `email`     | string | ✅       | อีเมลผู้ใช้                                                                         |
| `tenant_id` | string | ✅       | tenant ที่ launch — **ห้ามเป็น null** (เคยมี bug นี้ ดู SESSION_HANDOFF 2026-07-07) |
| `app_id`    | string | ✅       | application id ใน registry ของ Thunder                                              |
| `app_name`  | string | ✅       | ชื่อ app (แสดงผล)                                                                   |
| `role`      | string | ✅       | **platform role ของ Thunder — informational เท่านั้น ห้ามใช้ทำ RBAC** (§1.1)        |
| `aud`       | string | ✅       | ต้องเป็น `"authenticated"` — CityZen reject ถ้าไม่ตรง                               |
| `iat`/`exp` | number | ✅       | ใส่โดย jose อัตโนมัติ                                                               |

### 2.3 กติกา verify ฝั่ง CityZen (ตามลำดับ)

1. ไม่มี `token` ใน query → redirect `/login`
2. verify signature ด้วย `SUPABASE_JWT_SECRET` + จำกัด `algorithms: ["HS256"]` — fail → `/login?error=invalid_launch`
3. `aud !== "authenticated"` → `/login?error=invalid_launch`
4. เอา **token ตัวเดิม** ยิง Thunder `/me` + `/me/memberships` (Thunder รับ launch token เป็น bearer ได้เพราะ secret เดียวกัน) — fail → ถือว่าไม่มี membership (fail closed)
5. resolve role ตาม §1 — ไม่มี role และไม่ใช่ super_admin → `/no-access`
6. mint `cityzen_session` (§3) → redirect `/`

### 2.4 ข้อจำกัดที่รู้อยู่แล้ว (accepted for POC)

- Token อยู่ใน URL → โผล่ใน browser history / access log ได้ — บรรเทาด้วยอายุ 1 นาที; upgrade path = POST form หรือ one-time code exchange
- ไม่มี `jti`/replay protection — ภายใน 1 นาที token ใช้ซ้ำได้; upgrade path = one-time nonce ใน Thunder
- ใช้ secret ร่วมกับ Supabase (`SUPABASE_JWT_SECRET`) — ผูกชะตากัน; upgrade path = แยก `LAUNCH_TOKEN_SECRET` เมื่อหลุด POC

---

## 3. App Session (`cityzen_session`) + Cookie Security Attributes

### 3.1 JWT

| คุณสมบัติ | ค่า                                                     |
| --------- | ------------------------------------------------------- |
| Algorithm | `HS256`                                                 |
| Secret    | `APP_SESSION_SECRET` (CityZen เท่านั้น — คนละตัวกับ §2) |
| อายุ      | **8 ชั่วโมง** ไม่มี refresh — หมดแล้ว login/launch ใหม่ |

Claims: `sub`, `email`, `tenant_id`, `role` (CityZen role ตาม §1), `isSuperAdmin?`, `app_name?`, `profile?`, `memberships?` (snapshot จาก Thunder ณ ตอน mint — ไม่ sync ต่อ)

### 3.2 Cookie attributes (มาตรฐานที่ทั้งสอง repo ต้องยึด)

| Attribute  | ค่า                                | เหตุผล                                                                                                                                         |
| ---------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| ชื่อ       | `cityzen_session`                  |                                                                                                                                                |
| `httpOnly` | `true`                             | JS อ่านไม่ได้ — กัน XSS ขโมย session                                                                                                           |
| `sameSite` | `lax`                              | กัน CSRF ขั้นพื้นฐาน + ยังรองรับ top-level redirect จาก Thunder (launch flow ต้องใช้ `lax` — `strict` จะทำ cookie หายตอน redirect ข้าม origin) |
| `secure`   | `true` เมื่อ `NODE_ENV=production` | dev บน http ได้, prod บังคับ https                                                                                                             |
| `path`     | `/`                                |                                                                                                                                                |
| `maxAge`   | `28800` (8 ชม. = อายุ JWT)         | cookie กับ token หมดอายุพร้อมกัน                                                                                                               |

- จุดตั้ง cookie มีที่เดียว: `setAppSessionCookie()` ใน `src/lib/app-session.ts` — **ห้าม set cookie นี้จากที่อื่น**
- ฝั่ง Thunder ใช้ cookie ของ `@supabase/ssr` (`sb-*`) ซึ่ง httpOnly/secure โดย library — attributes ตารางนี้คือ baseline ขั้นต่ำที่ session cookie ใหม่ใดๆ ในทั้งสอง repo ต้องไม่ต่ำกว่า

### 3.3 การ revoke

ปัจจุบัน: ไม่มี server-side revocation — ถอนสิทธิ์ใน Thunder จะมีผลกับ CityZen เมื่อ session หมดอายุ (สูงสุด 8 ชม.) หรือ user logout
Upgrade path เมื่อมี Supabase ของตัวเอง: เก็บ `session_id` + เช็ค denylist (ดู FUTURE notes)

---

## ภาคผนวก: Environment variables ที่เกี่ยวข้อง

| ตัวแปร                 | ใช้ที่  | หน้าที่                                       | ต้องตรงกันข้าม repo? |
| ---------------------- | ------- | --------------------------------------------- | -------------------- |
| `SUPABASE_JWT_SECRET`  | ทั้งสอง | เซ็น/verify launch token                      | ✅ **ต้องตรงกัน**    |
| `APP_SESSION_SECRET`   | CityZen | เซ็น/verify `cityzen_session`                 | ❌ CityZen เท่านั้น  |
| `THUNDER_CORE_API_URL` | CityZen | เรียก `/me`, `/me/memberships`, login gateway | —                    |
