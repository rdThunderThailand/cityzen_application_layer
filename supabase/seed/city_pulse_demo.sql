-- Demo seed for Executive Daily Brief KPI row (tenant 00000000-…-000000000000
-- "Executive Demo Tenant"). Applied directly via Supabase MCP; captured here for history.
-- Not idempotent (plain inserts, no ON CONFLICT) — re-running will duplicate rows.

insert into disaster_ops.districts (id, thundercore_tenant_id, name, risk_status)
values
  ('a0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000', 'กะทู้', 'high'),
  ('a0000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000000', 'ป่าตอง', 'high');

insert into disaster_ops.severity_levels (id, name, color, rank)
values
  ('b0000000-0000-0000-0000-000000000001', 'สูง', 'rose', 1),
  ('b0000000-0000-0000-0000-000000000002', 'ปานกลาง', 'orange', 2);

insert into disaster_ops.incident_categories (id, name)
values
  ('c0000000-0000-0000-0000-000000000001', 'น้ำท่วม'),
  ('c0000000-0000-0000-0000-000000000002', 'ไฟไหม้');

insert into disaster_ops.incidents (id, district_id, severity_id, category_id, title, description, status, impact_count, impact_unit)
values
  ('d0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'น้ำท่วมฉับพลัน อ.กะทู้', 'ฝนตกหนักต่อเนื่อง น้ำท่วมถนนสายหลัก', 'active', 15420, 'คน'),
  ('d0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000002', 'ไฟไหม้ร้านค้า ป่าตอง', 'เพลิงไหม้อาคารพาณิชย์ 2 คูหา', 'active', 9230, 'คน');

insert into disaster_ops.resources (id, type, name, quantity, readiness_percent)
values
  ('e0000000-0000-0000-0000-000000000001', 'vehicle', 'รถดับเพลิง', 6, 85),
  ('e0000000-0000-0000-0000-000000000002', 'shelter', 'ศูนย์พักพิงชั่วคราว', 4, 92),
  ('e0000000-0000-0000-0000-000000000003', 'personnel', 'ทีมกู้ภัยเทศบาล', 20, 90);

insert into disaster_ops.missions (id, incident_id, title, progress_percent, status)
select gen_random_uuid(), 'd0000000-0000-0000-0000-000000000001'::uuid, title, progress, 'in_progress'
from (values
  ('อพยพประชาชนพื้นที่เสี่ยง', 60),
  ('สูบน้ำระบายพื้นที่น้ำท่วม', 40),
  ('แจกจ่ายถุงยังชีพ', 75),
  ('ตรวจสอบความมั่นคงถนน', 30),
  ('ตั้งจุดพักพิงชั่วคราว', 50),
  ('ประสานหน่วยแพทย์ฉุกเฉิน', 80)
) as t(title, progress)
union all
select gen_random_uuid(), 'd0000000-0000-0000-0000-000000000002'::uuid, title, progress, 'in_progress'
from (values
  ('ควบคุมเพลิงจุดที่เหลือ', 90),
  ('ตรวจสอบโครงสร้างอาคาร', 20),
  ('เคลียร์พื้นที่รอบจุดเกิดเหตุ', 65),
  ('ประเมินความเสียหาย', 35),
  ('แจ้งเตือนร้านค้าใกล้เคียง', 100)
) as t(title, progress);

insert into core.kpi_snapshots (thundercore_tenant_id, module, metric_name, value, unit, trend_percent, direction)
values
  ('00000000-0000-0000-0000-000000000000', 'city_pulse', 'นักท่องเที่ยววันนี้', 22840, 'คน', 17, 'up'),
  ('00000000-0000-0000-0000-000000000000', 'city_pulse', 'ผลกระทบเชิงบวก', 532.4, 'ล้านบาท', 10.2, 'up');
