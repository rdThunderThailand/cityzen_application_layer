# แผนพัฒนา: Thunder Core ↔ CityZen Integration (Directory Cache)

> สรุปจาก grilling session 2026-07-08 — decision ทั้งหมดบันทึกไว้ใน [`CONTEXT.md`](../CONTEXT.md) (Language + Relationships) และ ADR ที่เกี่ยวข้อง (`docs/adr/0001-0003`) เอกสารนี้คือแผนลงมือทำเป็นขั้นๆ ไม่ใช่ spec — แก้ spec ที่ CONTEXT.md/ADR แล้วอัปเดตที่นี่ตาม

## ขอบเขต

**เฉพาะ Identity Mirror** — sync membership/user/tenant identity จาก Thunder มาไว้ local cache ฝั่ง cityzen เพื่อไม่ต้องยิงข้าม service ทุก request และแก้ปัญหาสิทธิ์ค้าง 8 ชม.

**ไม่รวม** การย้าย domain data (Incidents/Decisions/Resources) ออกจาก mock — นั่นเป็นแผนแยก คนละ sync lifecycle (ตกลงกันแล้วใน [CONTEXT.md](../CONTEXT.md) § Flagged ambiguities)

## Decision ที่ปิดแล้ว (อ้างอิง)

| เรื่อง | Decision | อ้างอิง |
|---|---|---|
| Transport vs Storage schema | Thunder ส่ง full snapshot, cityzen เก็บ typed column เท่าที่ใช้จริง | [ADR 0001](adr/0001-directory-cache-transport-vs-storage-schema.md) |
| Webhook payload | Notify-then-pull (`event`+id เท่านั้น, ไม่พก field ข้อมูล) | CONTEXT.md § Notify-then-pull |
| Build order | Webhook pipeline (sender+stub receiver) ทำได้เลย ไม่รอ Supabase อีกทีม | [ADR 0002](adr/0002-webhook-notify-then-pull-decouple-from-supabase.md) |
| Secret | `WEBHOOK_SECRET` แยกใหม่ ไม่ derive จาก auth secret เดิม | CONTEXT.md § WEBHOOK_SECRET |
| Delivery target discovery | Fan-out ผ่าน app registry (`applications.url` + fixed path) ไม่ใช่ env var ต่อ app | [ADR 0003](adr/0003-webhook-fanout-via-app-registry.md) |

## Phase 0 — Webhook pipeline (เริ่มได้ทันที, ไม่ผูกกับ Supabase อีกทีม)

**Thunder Core:**
- [ ] `WEBHOOK_SECRET` env var (ทั้งสอง repo ต้องตรงกัน — เขียน checklist กัน incident แบบ `SUPABASE_JWT_SECRET` ซ้ำ)
- [ ] Emit event ที่จุดแก้ `membership_roles`/`memberships` (อย่างน้อย: created, updated, revoked)
- [ ] Fan-out resolver: ใช้ query เดียวกับ `getTenantApplications()` (owned ∪ invited) หา apps ปลายทางของ `tenant_id`
- [ ] Sender: POST ไป `${app.url}/api/webhooks/thunder` พร้อม HMAC signature (header) + retry/backoff ถ้า fail
- [ ] Payload = notify-then-pull เท่านั้น (`event`, `tenant_id`, `user_id`, `occurred_at`) — ห้ามใส่ field ข้อมูลจริง

**cityzen (Stub Receiver):**
- [ ] Route handler `POST /api/webhooks/thunder`
- [ ] Verify HMAC signature ด้วย `WEBHOOK_SECRET` — ไม่ตรง reject 401 ทันที
- [ ] Idempotency check เบื้องต้น (ยังไม่มี cache ให้เทียบ `updated_at` แต่ log event ให้ตรวจสอบได้)
- [ ] Log + ตอบ 200 — **ไม่เขียนอะไรลง DB จริง** (ยังไม่มี table)

**Definition of done ของ Phase 0:** ยิง test event จาก Thunder → เห็น log ที่ cityzen ครบ พร้อม signature ผ่าน — พิสูจน์ pipeline ทำงานจริงโดยไม่ต้องมี Supabase เลย

> **อัปเดต 2026-07-08 (grill session):** Phase 1/2 ปรับใหญ่จาก grilling — decision ทั้งหมดอยู่ใน CONTEXT.md (terms: JWT-vs-Cache split, MEMBERSHIP_DIRECTORY_CACHE, Liveness check, Cold populate/Warm update, Build-now-plug-link-later) + [ADR 0004](adr/0004-stateful-membership-liveness-check-for-revocation.md) (revoke), [ADR 0002 §Clarification](adr/0002-webhook-notify-then-pull-decouple-from-supabase.md) (payload identity fields), [ADR 0005](adr/0005-webhook-payload-jose-jwt.md) (jose)

## Phase 1 — Directory Cache (**build now, plug link later** — ไม่บล็อกอีกทีมแล้ว)

- [ ] Config seam: env `CITYZEN_DIRECTORY_DB_URL`/key — dev ชี้ Supabase ที่มี/local, production swap ตอนอีกทีมพร้อม (zero code change)
- [ ] Migration cache tables (cityzen เป็นเจ้าของ prefix `cityzen_`): `user_directory_cache`, `tenant_directory_cache`, `org_directory_cache`, **`membership_directory_cache`** (PK composite `(user_id, tenant_id)`, cols `status` enum + `role_codes` + `synced_at`) — typed column เท่าที่ใช้ (§ ADR 0001)
- [ ] **Payload enrichment ฝั่ง Thunder** (decision B): `emitMembershipEvent` created/updated ส่ง `status`+`role_codes` เพิ่มใน JWT claims (invite→invited, accept→active, update→data.status; role จาก membership_roles) — revoked ไม่ต้องเพิ่ม (self-describing)
- [ ] Cold populate: `/auth/launch`+`/auth/session` upsert snapshot ลง cache (upsert ทับ ไม่ compare)
- [ ] Warm update (receiver): Phase 0 stub → upsert จริง — revoked set `status='suspended'` จาก event, created/updated upsert `status`+`role_codes` จาก payload (**ไม่ pull** — ดู ADR 0002 §Clarification)

**Definition of done ของ Phase 1:** login/launch populate cache, webhook event เปลี่ยน `membership_directory_cache` ได้จริง (revoke→suspended, role-change→role_codes ใหม่) — เทสต์บน dev DB ก่อน link จริงมา

## Phase 2 — ย้าย display ออกจาก JWT + guard อ่าน cache (ผูกกับ Phase 1)

- [ ] `cityzen_session` = identity proof เปล่า (`sub`, `tenant_id`, `isSuperAdmin`, `role` fallback) — ตัด `profile`/`memberships` ออก (cookie size, §3 [AUTH_CONTRACT.md](AUTH_CONTRACT.md))
- [ ] จุดที่ใช้ display (name/avatar/tenant) → อ่าน `*_directory_cache`
- [ ] **Liveness check ใน proxy.ts** (ADR 0004): helper `assertMembershipActive(userId, tenantId)` query `membership_directory_cache` ต่อ request → `status !== 'active'` เด้ง `/no-access`, resolve role จาก `role_codes` สด (revoke + role-change near-real-time) — ห่อ helper เดียวเพื่อเติม TTL/short-token ทีหลัง
- [ ] `/no-access` เพิ่มข้อความ "สิทธิ์ถูกถอน/ระงับ" (ไม่ force logout)

## นอกขอบเขตของแผนนี้ (บันทึกไว้กันสับสน)

- Reconciliation cron (sync สำรองกัน webhook หลุด) — เพิ่มทีหลังเมื่อ Phase 1 เสถียรแล้ว ไม่ใช่ MVP
- OIDC/OAuth2 เต็มรูปแบบ — upgrade path ระยะยาว ไม่ใช่ scope hackathon
- Multi-app fan-out ที่ฉลาดกว่า (เลือกเฉพาะ app ที่ affected จริง) — ตอนนี้มีแค่ cityzen ตัวเดียว ยังไม่ต้องทำ
- ย้าย domain data ออกจาก mock — แผนแยก
- **Multi-tenant switching (ข้อควรระวัง):** ตอนนี้ `cityzen_session` ผูก 1 tenant. Liveness check เช็คเฉพาะ tenant ของ session. อนาคตถ้ามี tenant switching — revoke จาก tenant A ไม่ควรเตะออกจาก tenant B ต้องมีปุ่ม "สลับ tenant" แทน /no-access — hackathon tenant เดียว ยังไม่ต้องแก้
- **v0.1 legacy members API divergence (finding):** `GET /v0.1/tenants/[id]/members/[memberId]` ใช้ `memberships.role` (single string denormalized) + ไม่มี `status` — คนละ model กับ core v1 (`membership_roles[].roles.code` + enum `status`). **อย่าใช้ v0.1 สำหรับ identity sync** — core v1 (`/me/memberships`) คือตัวถูก. เป็น Thunder-side smell ควร reconcile แยก
