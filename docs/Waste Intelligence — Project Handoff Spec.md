# Waste Intelligence — Project Handoff Spec

## สรุปโปรเจค (ภาพรวม)

Waste Intelligence / CityZen Organic Executive Advisor คือระบบ decision-support สำหรับผู้บริหาร (โรงแรม/องค์กร) โดยวางตัวเป็น "ที่ปรึกษาผู้บริหาร" ไม่ใช่แค่ dashboard — ชูจุดยืน 3 อย่าง: Evidence First (ข้อมูลจริง), Explainable (อธิบายได้ ไม่ใช่กล่องดำ), Impact Driven (มุ่งผลลัพธ์) ระบบรันบนแพลตฟอร์มกลาง ThunderCore (multi-tenant) และแตกเป็น 3 vertical ตาม tenant_type

## 1. ภาพรวมระบบ

ระบบที่ปรึกษาผู้บริหารด้านการจัดการขยะ/ทรัพยากร รันบนแพลตฟอร์มกลาง ThunderCore
(multi-tenant). แตกเป็น 3 vertical ตาม tenant_type:

- hospitality_waste → role manager / โรงแรม (tenant_type = company)
- disaster_ops → role ราชการ (tenant_type = municipal)
- core → เครื่องยนต์กลาง ใช้ร่วมกันทุก vertical

หลักการ: Evidence First, Explainable, Impact Driven.

## 2. หน้าจอ (Pages) และหน้าที่

Sidebar ของ role executive มี 6 หน้าหลัก + AI Assistant:

| Page          | ชื่อไทย      | หน้าที่                                                                      |
| ------------- | ------------ | ---------------------------------------------------------------------------- |
| Daily Brief   | ภาพรวมวันนี้ | KPI สรุปวัน + AI Executive Brief + priority actions + heatmap + 7-day trend  |
| Situation     | สถานการณ์    | สถานะปัจจุบันเชิงลึก, จุดที่ต้องเฝ้าระวัง, เปรียบเทียบ baseline              |
| Decision      | การตัดสินใจ  | ตัวเลือกการตัดสินใจ (decision_options) + impact forecast + AI recommendation |
| Operations    | ปฏิบัติการ   | งาน/รอบเก็บขน, อุปกรณ์, สต็อก                                                |
| Communication | การสื่อสาร   | ข้อความถึงทีม/กลุ่มเป้าหมาย + sentiment                                      |
| Outcome       | ผลลัพธ์      | KPI snapshot, performance radar, ผลเทียบเป้า (policy_goals)                  |
| AI Assistant  | -            | ผู้ช่วยถาม-ตอบเชิงบริหาร                                                     |

## 3. Database (แบ่งตาม schema/module)

### 3.1 core (ใช้ร่วมทุก vertical)

decisions, decision_options, decision_history, ai_recommendations,
kpi_snapshots, messages, communication_channels, sentiment_records,
target_groups, notifications, appointments

ความสัมพันธ์หลัก:

- decisions (decision_id) → decision_options, impact_forecasts, projects
- decisions (decision_id) → ai_recommendations
- policy_goals (policy_goal_id) → projects
- decision_history, kpi_snapshots ผูกกับ tenant

### 3.2 disaster_ops (tenant_type = municipal)

incidents, missions, resources, resource_allocations, orders, districts,
cctv_cameras, weather_readings, severity_levels, incident_categories

ความสัมพันธ์หลัก:

- districts (district_id) → incidents
- incidents (incident_id) → missions, orders ; (severity_id, category_id)
- missions (mission_id) → resource_allocations
- resources (resource_id) → resource_allocations
- lookup: severity_levels, incident_categories

### 3.3 hospitality_waste (tenant_type = company)

waste_zones, generator_points, waste_snapshots, collection_vehicles,
collection_rounds, processing_equipment, storage_rooms, food_donation_records,
organization_scores, achievements, staff_departments, message_comments,
budget_authority

### 3.4 Directory Cache (sync จาก ThunderCore แบบ async ผ่าน P4)

- user_directory_cache, tenant_directory_cache, org_directory_cache
- ตัวอย่างฟิลด์ tenant_directory_cache:
  thundercore_tenant_id (uuid, PK), tenant_type (company/municipal/school/enterprise),
  code, name, status, synced_at (datetime)
- FK ข้าม service ใช้แบบ "opaque" (thundercore_tenant_id / thundercore_org_id)

## 4. Metric / การคำนวณ (Waste Formula Matrix)

**คะแนนรวม = ฐาน × ตัวคูณแหล่งกำเนิด × ตัวคูณปริมาณ**

ฐาน (ประเภทขยะ): อินทรีย์=3, รีไซเคิล=2, ทั่วไป=1, อันตราย=5
ตัวคูณแหล่งกำเนิด: ชุมชน=1.2, ตลาดสด=1.5, โรงงาน=2.0
ตัวคูณปริมาณ/เดือน: <100 ตัน=1.0, 100–300 ตัน=1.5, >300 ตัน=2.0

ระดับความเร่งด่วน (สีกล่อง):

- ต่ำ : score < 5 (เขียว)
- ปานกลาง: 5 – 10 (เหลือง)
- สูง : 10 – 15 (ส้ม)
- วิกฤต : score > 15 (แดง)

KPI อื่นบนหน้า Daily Brief:

- Organic Generated (kg/วัน), Prediction (kg), Waste per Guest (kg),
  Carbon Saving (kgCO2), Pickup time, trend % เทียบ 7 วัน

## 5. Data Contract สำหรับ AI (input / output)

### สิ่งที่ Front-end ส่งให้ AI (context)

- tenant_id / org_id (opaque), role, tenant_type
- ช่วงเวลา (date / date range), หน้าจอที่ร้องขอ (screen id)

### สิ่งที่ AI ต้อง query จาก DB มาคำนวณ

1. waste_snapshots / generator_points → ปริมาณขยะแยกประเภท+แหล่งกำเนิด → เข้าสูตร score
2. kpi_snapshots → KPI cards (organic, per guest, carbon saving)
3. collection_rounds / collection_vehicles → pickup time, delay
4. decisions + decision_options + impact_forecasts → หน้า Decision
5. ai_recommendations → คำแนะนำ + เหตุผล (explainable)
6. policy_goals → เทียบเป้าหมายในหน้า Outcome
7. weather_readings → แสดงสภาพอากาศ

### สิ่งที่ AI ต้องส่งกลับ (response schema ตามหน้าจอ)

โครงสร้าง JSON ต่อ screen (จาก board):

Storyboard
{
"screen": "decision",
"header": {
"page_title": "DECISION",
"page_subtitle_th": "การตัดสินใจ",
"data_date": "ข้อมูล ณ วันที่ 18 กรกฎาคม 2567",
"time": "08:30 น.",
"weather_widget": { "condition": "ฝนปานกลาง", "humidity_percent": 75, "temperature_celsius": 28 },
"user": { "name_th": "ผู้ว่าราชการจังหวัดภูเก็ต", "role_en": "Provincial Commander" },
"notifications_count": 12
},
"decision_summary_banner": {
"title_th": "วิสัยทัศน์การตัดสินใจวันนี้",
"quote_th": "ตัดสินใจอย่างแม่นยำ รวดเร็ว โปร่งใส",
"note_th": "เพื่อความปลอดภัยของประชาชน การบริหารพัฒนาอย่างยั่งยืน และการพัฒนาจังหวัดอย่างยั่งยืน",
"stat_cards": [
{ "id": "pending_decisions", "label_th": "เรื่องที่รอการตัดสินใจ", "value": 6, "unit": "เรื่อง", "highlight_th": "เร่งด่วน 2 เรื่อง" },
{ "id": "expected_impact", "label_th": "คาดการณ์ผลกระทบ", "value": 512.42, "unit": "ล้านบาท", "highlight_th": "ผลบวก" },
{ "id": "citizens_affected", "label_th": "ประชาชนได้รับผลกระทบ", "value": 856250, "unit": "คน", "highlight_th": "เพิ่มขึ้น 18%" },
{ "id": "confidence", "label_th": "ความเชื่อมั่นการตัดสินใจ", "value": 88, "unit": "%", "highlight_th": "ความเชื่อมั่นสูง" }
]
},
"tabs": [
{ "id": "pending_decisions", "label_th": "เรื่องที่รอการตัดสินใจ", "count": 6, "active": true },
{ "id": "approved", "label_th": "อนุมัติแล้ว", "count": 4 },
{ "id": "awaiting_others", "label_th": "อยู่ระหว่างดำเนินการ", "count": 3 },
{ "id": "decision_table", "label_th": "ตัดตาราง", "count": 8 },
{ "id": "all", "label_th": "ทั้งหมด" }
],
"pending_decisions_list": {
"title_th": "เรื่องที่ต้องตัดสินใจ (6)",
"items": [
{
"rank": 1,
"title_th": "ขออนุมัติแผนฉุกเฉินหน่วยตะเนื่อง",
"owner": "สำนักงานป้องกันและบรรเทาสาธารณภัยจังหวัด",
"priority_tag": "เร่งด่วน",
"budget": { "value": 186.75, "unit": "ล้านบาท" },
"deadline_th": "วันนี้ 12:00 น."
},
{
"rank": 2,
"title_th": "ขออนุมัติแผนติดตั้งระบบระบายน้ำเพิ่มเติมป้องกันน้ำท่วม",
"owner": "สำนักงานโยธาธิการและผังเมืองจังหวัด",
"priority_tag": "เร่งด่วน",
"budget": { "value": 128.10, "unit": "ล้านบาท" },
"deadline_th": "ภายใน 32 ชม."
},
{
"rank": 3,
"title_th": "ขออนุมัติมาตรการลดฝุ่น PM2.5",
"owner": "สำนักงานสิ่งแวดล้อมจังหวัด",
"priority_tag": "สำคัญ",
"budget": { "value": 88.12, "unit": "ล้านบาท" },
"deadline_th": "ภายใน 15 วัน"
},
{
"rank": 4,
"title_th": "ขออนุมัติโครงการพัฒนาทักษะอาชีพประชาชน",
"owner": "สำนักงานพัฒนาฝีมือแรงงานจังหวัด",
"priority_tag": "ปกติ",
"budget": { "value": 63.20, "unit": "ล้านบาท" },
"deadline_th": "ภายใน 30 วัน"
},
{
"rank": 5,
"title_th": "ขออนุมัติงบแผนขยายสาย 5 สาย",
"owner": "แขวงทางหลวงภูเก็ต",
"priority_tag": "ปกติ",
"budget": { "value": 25.60, "unit": "ล้านบาท" },
"deadline_th": "ภายใน 45 วัน"
},
{
"rank": 6,
"title_th": "ขออนุมัติจัดซื้อครุภัณฑ์โรงพยาบาล",
"owner": "สำนักงานสาธารณสุขจังหวัด",
"priority_tag": "ปกติ",
"budget": { "value": 20.65, "unit": "ล้านบาท" },
"deadline_th": "ภายใน 18 วัน"
}
],
"actions": ["ดูเรื่องทั้งหมด"]
},
"impact_forecast": {
"title_th": "คาดการณ์ผลกระทบตัดสินใจ",
"summary_cards": [
{ "id": "economy", "label_th": "เศรษฐกิจ", "value_percent": 512.42, "unit": "ล้านบาท", "direction": "up" },
{ "id": "society", "label_th": "สังคม", "value": 856000, "unit": "คน", "direction": "up" },
{ "id": "environment", "label_th": "สิ่งแวดล้อม", "value_percent": 18, "unit": "%", "detail_th": "คุณภาพชีวิต", "direction": "up" },
{ "id": "risk", "label_th": "ความเสี่ยง", "value_percent": -32, "unit": "%", "detail_th": "ความเสียหาย", "direction": "down" }
],
"chart": {
"type": "line_chart",
"title_th": "ผลกระทบรวมรายวัน (ล้านบาท)",
"series": [
{ "label_th": "กรณีอนุมัติ", "color": "green", "end_value": 512.42 },
{ "label_th": "กรณีไม่อนุมัติ", "color": "red", "end_value": -312.18 },
{ "label_th": "กรณีปัจจุบัน", "color": "gray", "style": "dashed" }
],
"x_axis_labels": ["วันนี้", "1 วัน", "3 วัน", "7 วัน", "30 วัน"]
},
"actions": ["ดูรายละเอียด"]
},
"comparison_options_table": {
"title_th": "ข้อเสนอเปรียบเทียบ",
"columns": ["ทางเลือก", "งบประมาณ", "ผลกระทบ", "ระยะเวลาดำเนินการ", "ความเสี่ยง", "คะแนนรวม", "เลือก"],
"rows": [
{ "option_label": "A", "name_th": "แผนเร่งด่วน", "budget": { "value": 32.45, "unit": "ล้านบาท" }, "impact_th": "สูงมาก", "duration_th": "30 วัน", "risk_th": "ปานกลาง", "score": 4, "selected": true },
{ "option_label": "B", "name_th": "แผนแบ่งงวด", "budget": { "value": 18.20, "unit": "ล้านบาท" }, "impact_th": "สูง", "duration_th": "15 วัน", "risk_th": "ต่ำ", "score": 5, "selected": false },
{ "option_label": "C", "name_th": "แผนประหยัด", "budget": { "value": 9.80, "unit": "ล้านบาท" }, "impact_th": "ปานกลาง", "duration_th": "30 วัน", "risk_th": "ต่ำ", "score": 3, "selected": false }
],
"actions": ["เปรียบเทียบละเอียด"]
},
"ai_executive_assistant": {
"status": "BETA",
"analysis_intro_th": "จากการวิเคราะห์ข้อมูล ผมมอบแนะนำให้ท่านพิจารณาตัดสินใจใน 3 เรื่องเร่งด่วนก่อน เพื่อให้เกิดผลกระทบเชิงบวกสูงสุดต่อจังหวัด",
"urgent_recommendations": [
{ "rank": 1, "title_th": "แผนฉุกเฉินหน่วยหน้าเสี่ยง", "budget": { "value": 186.75, "unit": "ล้านบาท" } },
{ "rank": 2, "title_th": "ติดตั้งระบบระบายน้ำ", "budget": { "value": 128.10, "unit": "ล้านบาท" } },
{ "rank": 3, "title_th": "มาตรการลดฝุ่น PM2.5", "budget": { "value": 88.12, "unit": "ล้านบาท" } }
],
"actions": ["วิเคราะห์เพิ่มเติม"]
},
"recent_decisions_summary": {
"title_th": "สรุปการตัดสินใจล่าสุด",
"items": [
{ "status": "approved", "title_th": "โครงการปรับปรุงระบบไฟฟ้าแสงสว่าง", "budget": { "value": 12.50, "unit": "ล้านบาท" }, "timestamp_th": "17 ก.ค. 2567 14:35 น." },
{ "status": "pending", "title_th": "แผนจัดการขยะมูลฝอย", "budget": { "value": 8.75, "unit": "ล้านบาท" }, "timestamp_th": "17 ก.ค. 2567 11:20 น." },
{ "status": "rejected", "title_th": "มาตรการท่องเที่ยวเชิงนิเวศ", "budget": { "value": 5.20, "unit": "ล้านบาท" }, "timestamp_th": "16 ก.ค. 2567 16:10 น." }
],
"actions": ["ดูทั้งหมด"]
},
"urgent_action_bar": {
"title_th": "การดำเนินการด่วน",
"actions": [
{ "id": "approve", "label_th": "อนุมัติ" },
{ "id": "reject", "label_th": "ไม่อนุมัติ" },
{ "id": "request_more_info", "label_th": "ขอข้อมูลเพิ่มเติม" },
{ "id": "delegate", "label_th": "ส่งกลับหน่วยงาน" },
{ "id": "send_to_meeting", "label_th": "ส่งเข้าที่ประชุม" },
{ "id": "open_war_room", "label_th": "เปิด War Room" }
],
"cta": { "label_th": "ไปหน้า War Room", "target": "war_room" }
}
}

Daily Brief
{
"screen": "daily_brief",
"app": {
"name": "CITYZEN",
"subtitle": "EXECUTIVE COMMAND CENTER",
"version": "CityZen OS v2.3.0"
},
"header": {
"page_title": "DAILY BRIEF",
"page_subtitle_th": "สรุปภาพรวมจังหวัดภูเก็ต",
"date": "วันศุกร์ที่ 18 กรกฎาคม 2567",
"time": "08:30 น.",
"weather_widget": {
"condition": "ฝนปานกลาง",
"humidity_percent": 75,
"temperature_celsius": 28
},
"user": {
"name_th": "ผู้ว่าราชการจังหวัดภูเก็ต",
"role_en": "Provincial Commander",
"avatar": true
},
"notifications_count": 12
},
"sidebar_menu": [
{ "id": "daily_brief", "label_en": "Daily Brief", "label_th": "ภาพรวมวันนี้", "active": true },
{ "id": "situation", "label_en": "Situation", "label_th": "สถานการณ์" },
{ "id": "decision", "label_en": "Decision", "label_th": "การตัดสินใจ" },
{ "id": "war_room", "label_en": "War Room", "label_th": "ศูนย์ปฏิบัติการ" },
{ "id": "communication", "label_en": "Communication", "label_th": "การสื่อสารประชาชน" },
{ "id": "outcome", "label_en": "Outcome", "label_th": "ผลลัพธ์และบทเรียน" },
{ "id": "ai_assistant", "label_en": "AI Assistant" }
],
"sidebar_footer": ["ตั้งค่า (Settings)", "ช่วยเหลือ (Help)", "ออกจากระบบ (Logout)"],
"greeting_card": {
"greeting_th": "สวัสดีตอนเช้าครับ ผู้ว่าราชการจังหวัดภูเก็ต",
"summary_th": "วันนี้จังหวัดภูเก็ตมี 2 เหตุการณ์ที่ต้องเฝ้าระวังเป็นพิเศษ คาดว่าจะมีนักท่องเที่ยวเพิ่มขึ้น 18% จากเมื่อวาน โดยพื้นที่กะทู้และป่าตองมีความเสี่ยงสูงสุด แนะนำติดตามสถานการณ์อย่างใกล้ชิด"
},
"province_status": {
"score": 82,
"score_max": 100,
"status_label": "ปกติ (ดี)",
"gauge": true
},
"trend_vs_yesterday": [
{ "metric": "ความพร้อมรับมือ", "change_percent": 8, "direction": "up" },
{ "metric": "ความปลอดภัย", "change_percent": 3, "direction": "down" },
{ "metric": "เศรษฐกิจท่องเที่ยว", "change_percent": 12, "direction": "up" },
{ "metric": "คุณภาพชีวิต", "change_percent": 5, "direction": "up" }
],
"kpi_cards": [
{ "id": "critical_incidents", "label_th": "เหตุการณ์สำคัญ", "value": 2, "unit": "เรื่อง", "trend": "+2 เรื่อง", "severity": "alert" },
{ "id": "citizens_served", "label_th": "ประชาชนได้รับบริการ", "value": 12450, "unit": "คน", "trend_percent": 18, "direction": "up" },
{ "id": "tourists_today", "label_th": "นักท่องเที่ยววันนี้", "value": 22840, "unit": "คน", "trend_percent": 18, "direction": "up" },
{ "id": "economic_impact", "label_th": "ผลกระทบเชิงบวก (มูลค่า)", "value": 512.42, "unit": "ล้านบาท", "trend_percent": 21, "direction": "up" },
{ "id": "readiness", "label_th": "ความพร้อมรับมือ", "value": 88, "unit": "%", "status": "พร้อม", "trend_percent": 8, "direction": "up" },
{ "id": "tasks_to_follow", "label_th": "ภารกิจที่ต้องติดตาม", "value": 11, "unit": "ภารกิจ" }
],
"tabs": [
{ "id": "overview_today", "label_th": "ภาพรวมวันนี้", "active": true },
{ "id": "critical_situations", "label_th": "สถานการณ์สำคัญ" },
{ "id": "missions_operations", "label_th": "ภารกิจและการดำเนินการ" },
{ "id": "calendar_appointments", "label_th": "ปฏิทินและนัดหมาย" },
{ "id": "public_relations", "label_th": "สื่อประชาสัมพันธ์" }
],
"situation_map": {
"title_th": "แผนที่สถานการณ์สำคัญ",
"type": "choropleth_province_map",
"severity_legend": [
{ "level": "วิกฤต", "color": "red" },
{ "level": "เสี่ยงสูง", "color": "orange" },
{ "level": "เฝ้าระวัง", "color": "yellow" },
{ "level": "ปกติ", "color": "green" },
{ "level": "ไม่มีข้อมูล", "color": "gray" }
],
"districts": [
{ "name": "กะทู้", "status": "เสี่ยงสูง" },
{ "name": "ป่าตอง", "status": "เสี่ยงสูง" },
{ "name": "เมืองภูเก็ต", "status": "marker" },
{ "name": "ฉลอง", "status": null },
{ "name": "ราไวย์", "status": "ปกติ" },
{ "name": "ถลาง", "status": null }
],
"actions": ["ดูแบบเต็มจอ"]
},
"critical_events": {
"title_th": "เหตุการณ์สำคัญวันนี้",
"count": 2,
"items": [
{
"rank": 1,
"title_th": "ฝนตกหนักต่อเนื่องในพื้นที่กะทู้",
"risk_tag": "เสี่ยงสูง",
"time": "07:45 น.",
"details_th": "ปริมาณฝนสะสม 120 มม. ระดับน้ำคลองบางใหญ่เพิ่มสูงขึ้น",
"area": "กะทู้, ป่าตอง, กมลา",
"impact": { "value": 8560, "unit": "คน" }
},
{
"rank": 2,
"title_th": "นักท่องเที่ยวเพิ่มขึ้นช่วงไฮซีซั่น",
"risk_tag": "เฝ้าระวัง",
"details_th": "คาดการณ์นักท่องเที่ยวจะเพิ่มขึ้น 18%",
"area": "ทั้งจังหวัด",
"impact": { "value": 3890, "unit": "คน" }
}
],
"actions": ["ดูรายละเอียดเหตุการณ์", "ดูทั้งหมด"]
},
"follow_up_tasks": {
"title_th": "ภารกิจที่ต้องติดตาม",
"count": 11,
"items": [
{ "order": 1, "title_th": "ติดตามสถานการณ์น้ำในพื้นที่กะทู้", "owner": "ศูนย์ป้องกันฯ อบจ.ภูเก็ต", "priority": "เร่งด่วน", "time": "08:00 น." },
{ "order": 2, "title_th": "อำนวยความสะดวกการจราจรชายหาด", "owner": "สภ.กะทู้", "priority": "เร่งด่วน", "time": "09:00 น." },
{ "order": 3, "title_th": "ตรวจสอบความพร้อมเรือโดยสาร", "owner": "เจ้าท่าภูมิภาค สาขาภูเก็ต", "priority": "ปกติ", "time": "10:00 น." }
],
"actions": ["ดูภารกิจทั้งหมด", "ดูทั้งหมด"]
},
"trend_24h": {
"title_th": "แนวโน้มสำคัญ 24 ชั่วโมงข้างหน้า",
"cards": [
{ "id": "weather", "label_th": "สภาพอากาศ", "value": "ฝน 60%", "detail": "ช่วงเช้า - ค่ำ", "trend": "จากเมื่อวาน 10%", "sparkline": true },
{ "id": "tourists", "label_th": "นักท่องเที่ยว", "trend_percent": 18, "detail": "คาด 22,840 คน", "trend": "จากเมื่อวาน 18%", "sparkline": true },
{ "id": "traffic", "label_th": "จราจร", "value": "ปานกลาง", "detail": "พื้นที่เฝ้าระวัง: ป่าตอง, กะทู้", "trend": "จากเมื่อวาน 5%", "sparkline": true },
{ "id": "sea", "label_th": "ทะเล", "value": "คลื่น 1.2 - 1.8 ม.", "detail": "สถานะ: เฝ้าระวัง", "trend": "จากเมื่อวาน 10%", "sparkline": true },
{ "id": "air_quality", "label_th": "คุณภาพอากาศ (AQI)", "value": 32, "status": "ดี", "trend": "จากเมื่อวาน 8%", "sparkline": true }
]
},
"appointments_today": {
"title_th": "นัดหมายสำคัญวันนี้",
"items": [
{ "time": "09:00", "title_th": "ประชุมติดตามสถานการณ์น้ำ", "location": "ห้องประชุมศาลากลางจังหวัด" },
{ "time": "10:30", "title_th": "ประชุมคณะกรรมการท่องเที่ยว", "location": "ห้องประชุม 1 ศาลากลางจังหวัด" },
{ "time": "13:30", "title_th": "ลงพื้นที่ตรวจโครงการก่อสร้าง", "location": "อ.ตลาง จ.ภูเก็ต" }
],
"actions": ["ดูทั้งหมด"]
},
"ai_executive_assistant": {
"status": "BETA",
"greeting_th": "สวัสดีครับท่านผู้ว่าฯ ผมได้วิเคราะห์ข้อมูลล่าสุดและมีข้อเสนอแนะดังนี้",
"priority_recommendations": [
"เฝ้าระวังสถานการณ์ฝนในพื้นที่กะทู้อย่างใกล้ชิด",
"เตรียมความพร้อมระบบระบายน้ำและเจ้าหน้าที่",
"ประชุมติดตามสถานการณ์เวลา 09:00 น."
],
"ai_advice_th": "หากฝนยังตกต่อเนื่อง อาจพิจารณาเปิดศูนย์พักพิงชั่วคราวในพื้นที่เสี่ยงภายใน 2-3 ชั่วโมง",
"chat_input_placeholder": "ถามคำถามเพิ่มเติม...",
"quick_shortcuts": [
"สร้างข้อความใหม่",
"ส่งข้อความด่วน",
"แจ้งเตือนฉุกเฉิน",
"นัดหมายประชุม"
]
},
"cta": { "label_th": "ไปที่หน้า Situation", "target": "situation" },
"footer_meta": { "data_as_of": "08:30 น.", "auto_refresh": "อัปเดตทุก 5 นาที" }
}

Situation
{
"screen": "situation",
"header": {
"page_title": "SITUATION",
"page_subtitle_th": "สถานการณ์ปัจจุบัน",
"last_updated": "อัปเดตล่าสุด 08:30 น.",
"data_date": "ข้อมูล ณ วันที่ 18 กรกฎาคม 2567",
"weather_widget": { "condition": "ฝนปานกลาง", "humidity_percent": 75, "temperature_celsius": 28 },
"user": { "name_th": "ผู้ว่าราชการจังหวัดภูเก็ต", "role_en": "Provincial Commander" },
"notifications_count": 12
},
"tabs": [
{ "id": "situation_overview", "label_th": "ภาพรวมสถานการณ์", "active": true },
{ "id": "disaster", "label_th": "ภัยธรรมชาติ" },
{ "id": "accidents_public_safety", "label_th": "อุบัติเหตุและสาธารณภัย" },
{ "id": "public_health", "label_th": "สาธารณสุข" },
{ "id": "economy_society", "label_th": "เศรษฐกิจและสังคม" },
{ "id": "security", "label_th": "ความมั่นคง" },
{ "id": "environment", "label_th": "สิ่งแวดล้อม" }
],
"situation_summary": {
"title_th": "สรุปสถานการณ์สำคัญ",
"counters": [
{ "id": "critical", "label_th": "วิกฤต", "sublabel_th": "ต้องจัดการด่วน", "value": 3, "severity": "critical", "color": "red" },
{ "id": "watch", "label_th": "เฝ้าระวัง", "sublabel_th": "ใกล้เคียงติดตาม", "value": 8, "severity": "watch", "color": "orange" },
{ "id": "monitor", "label_th": "ติดตาม", "sublabel_th": "เฝ้าติดตามต่อเนื่อง", "value": 15, "severity": "monitor", "color": "yellow" },
{ "id": "normal", "label_th": "ปกติ", "sublabel_th": "สถานการณ์ปกติ", "value": 42, "severity": "normal", "color": "green" }
]
},
"heat_map": {
"title_th": "แผนที่สถานการณ์ (Heat Map)",
"type": "heat_map_province",
"severity_legend": [
{ "level": "วิกฤต", "color": "red" },
{ "level": "เฝ้าระวังสูง", "color": "orange" },
{ "level": "เฝ้าระวัง", "color": "yellow" },
{ "level": "ปกติ", "color": "green" },
{ "level": "ไม่มีข้อมูล", "color": "gray" }
],
"map_markers": ["เมืองภูเก็ต", "ถลาง", "ฉลอง (approx)"],
"actions": ["ดูแบบเต็มจอ"]
},
"critical_events_today": {
"title_th": "เหตุการณ์สำคัญวันนี้",
"count": 6,
"items": [
{
"rank": 1,
"title_th": "ฝนตกหนักต่อเนื่องในพื้นที่กะทู้",
"severity_tag": "วิกฤต",
"time": "07:45 น.",
"details_th": "ปริมาณฝนสะสม 120 มม. ระดับน้ำคลองบางใหญ่เพิ่มสูงขึ้น",
"area": "กะทู้, ป่าตอง, กมลา",
"impact": { "value": 8560, "unit": "คน" }
},
{
"rank": 2,
"title_th": "น้ำท่วมขังพื้นที่เมืองภูเก็ต",
"severity_tag": "เฝ้าระวังสูง",
"time": "08:10 น.",
"details_th": "น้ำท่วมผิวจราจรหลายจุด การจราจรติดขัด",
"area": "ตลาดใหญ่, รัษฎา",
"impact": { "value": 3890, "unit": "คน" }
},
{
"rank": 3,
"title_th": "คลื่นลมแรงบริเวณฝั่งตะวันตก",
"severity_tag": "เฝ้าระวัง",
"time": "07:30 น.",
"details_th": "คลื่นสูง 2.0 - 2.5 เมตร เรือเล็กควรงดออกจากฝั่ง",
"area": "หาดป่าตอง, หาดกะรน, หาดกมลา"
}
],
"actions": ["ดูเหตุการณ์ทั้งหมด", "ดูทั้งหมด"]
},
"trend_24h_panel": {
"title_th": "แนวโน้ม 24 ชั่วโมงข้างหน้า",
"items": [
{ "id": "heavy_rain", "label_th": "ฝนตกหนัก", "detail_th": "ช่วงบ่ายถึงค่ำ", "trend_tag": "เพิ่มขึ้น", "direction": "up" },
{ "id": "flooding", "label_th": "น้ำท่วมฉับพลัน", "detail_th": "พื้นที่ลุ่มต่ำ", "trend_tag": "ทรงตัว", "direction": "stable" },
{ "id": "strong_waves", "label_th": "คลื่นลมแรง", "detail_th": "ฝั่งตะวันตก", "trend_tag": "ทรงตัว", "direction": "stable" },
{ "id": "traffic", "label_th": "การจราจร", "detail_th": "หนาแน่นหลายเส้นทาง", "trend_tag": "เพิ่มขึ้น", "direction": "up" },
{ "id": "waterborne_disease", "label_th": "โรคติดต่อทางเดินอาหาร", "detail_th": "กลุ่มเสี่ยงและผู้สูงอายุ", "trend_tag": "ลดลง", "direction": "down" }
],
"actions": ["ดูแนวโน้มทั้งหมด"]
},
"situation_by_category": {
"title_th": "สถานการณ์รายหมวด",
"categories": [
{ "id": "disaster", "label_th": "ภัยธรรมชาติ", "events_count": 2, "breakdown": "วิกฤต 1 | เฝ้าระวัง 1" },
{ "id": "accidents_public_safety", "label_th": "อุบัติเหตุและสาธารณภัย", "events_count": 4, "breakdown": "วิกฤต 0 | เฝ้าระวัง 4" },
{ "id": "public_health", "label_th": "สาธารณสุข", "events_count": 3, "breakdown": "วิกฤต 0 | เฝ้าระวัง 3" },
{ "id": "economy_society", "label_th": "เศรษฐกิจและสังคม", "events_count": 5, "breakdown": "วิกฤต 0 | เฝ้าระวัง 5" },
{ "id": "security", "label_th": "ความมั่นคง", "events_count": 2, "breakdown": "วิกฤต 0 | เฝ้าระวัง 2" },
{ "id": "environment", "label_th": "สิ่งแวดล้อม", "events_count": 4, "breakdown": "วิกฤต 0 | เฝ้าระวัง 4" }
],
"actions": ["ดูทั้งหมด"]
},
"cctv_live": {
"title_th": "กล้อง CCTV สด (ตัวอย่าง)",
"cameras": [
{ "name_th": "แยกตลาดใหญ่", "status": "ออนไลน์", "thumbnail": true },
{ "name_th": "คลองบางใหญ่ (กะทู้)", "status": "ออนไลน์", "thumbnail": true },
{ "name_th": "หาดป่าตอง", "status": "ออนไลน์", "thumbnail": true }
]
},
"watch_areas": {
"title_th": "พื้นที่ต้องเฝ้าระวังเป็นพิเศษ",
"items": [
{ "area_th": "ชุมชนบางวัด (กะทู้)", "severity_tag": "วิกฤต" },
{ "area_th": "ชุมชนป่าตอง (กะทู้)", "severity_tag": "เฝ้าระวังสูง" },
{ "area_th": "ชุมชนรัษฎา (เมืองภูเก็ต)", "severity_tag": "เฝ้าระวัง" }
],
"actions": ["ดูทั้งหมด"]
},
"data_sources": {
"title_th": "แหล่งข้อมูลสำคัญ",
"items": [
{ "id": "cctv", "label": "CCTV", "value": 128, "unit": "ตัว" },
{ "id": "weather_stations", "label_th": "สถานีวัดน้ำ", "value": 12, "unit": "สถานี" },
{ "id": "radar", "label_th": "เรดาร์ฝน", "value": 3, "unit": "สถานี" },
{ "id": "agency_reports", "label_th": "รายงาน อปท.", "value": 15, "unit": "หน่วยงาน" }
],
"actions": ["ดูทั้งหมด"]
},
"ai_executive_assistant": {
"status": "BETA",
"analysis_intro_th": "จากการวิเคราะห์สถานการณ์ปัจจุบัน พบว่ามี 3 ประเด็นที่ควรให้ความสำคัญเป็นพิเศษ",
"key_issues": [
"ฝนตกหนักในพื้นที่กะทู้ อาจทำให้เกิดน้ำท่วมฉับพลันใน 2-3 ชั่วโมงข้างหน้า",
"ระดับน้ำคลองบางใหญ่ใกล้จุดวิกฤต แนะนำให้เตรียมเครื่องสูบน้ำเพิ่มเติม",
"การจราจรติดขัดในเขตเมือง ส่งผลกระทบต่อการเดินทางของประชาชน"
],
"actions": ["วิเคราะห์เชิงลึก"]
},
"urgent_action_bar": {
"title_th": "การดำเนินการด่วน",
"actions": [
{ "id": "issue_warning", "label_th": "ประกาศเตือนภัย" },
{ "id": "order_agencies", "label_th": "สั่งการหน่วยงาน" },
{ "id": "open_war_room", "label_th": "เปิด War Room" },
{ "id": "notify_public", "label_th": "แจ้งประชาชน" },
{ "id": "request_support", "label_th": "ขอรับการสนับสนุน" }
],
"cta": { "label_th": "ไปหน้า Decision", "target": "decision" }
}
}

Decision
{
"screen": "decision",
"header": {
"page_title": "DECISION",
"page_subtitle_th": "การตัดสินใจ",
"data_date": "ข้อมูล ณ วันที่ 18 กรกฎาคม 2567",
"time": "08:30 น.",
"weather_widget": { "condition": "ฝนปานกลาง", "humidity_percent": 75, "temperature_celsius": 28 },
"user": { "name_th": "ผู้ว่าราชการจังหวัดภูเก็ต", "role_en": "Provincial Commander" },
"notifications_count": 12
},
"decision_summary_banner": {
"title_th": "วิสัยทัศน์การตัดสินใจวันนี้",
"quote_th": "ตัดสินใจอย่างแม่นยำ รวดเร็ว โปร่งใส",
"note_th": "เพื่อความปลอดภัยของประชาชน การบริหารพัฒนาอย่างยั่งยืน และการพัฒนาจังหวัดอย่างยั่งยืน",
"stat_cards": [
{ "id": "pending_decisions", "label_th": "เรื่องที่รอการตัดสินใจ", "value": 6, "unit": "เรื่อง", "highlight_th": "เร่งด่วน 2 เรื่อง" },
{ "id": "expected_impact", "label_th": "คาดการณ์ผลกระทบ", "value": 512.42, "unit": "ล้านบาท", "highlight_th": "ผลบวก" },
{ "id": "citizens_affected", "label_th": "ประชาชนได้รับผลกระทบ", "value": 856250, "unit": "คน", "highlight_th": "เพิ่มขึ้น 18%" },
{ "id": "confidence", "label_th": "ความเชื่อมั่นการตัดสินใจ", "value": 88, "unit": "%", "highlight_th": "ความเชื่อมั่นสูง" }
]
},
"tabs": [
{ "id": "pending_decisions", "label_th": "เรื่องที่รอการตัดสินใจ", "count": 6, "active": true },
{ "id": "approved", "label_th": "อนุมัติแล้ว", "count": 4 },
{ "id": "awaiting_others", "label_th": "อยู่ระหว่างดำเนินการ", "count": 3 },
{ "id": "decision_table", "label_th": "ตัดตาราง", "count": 8 },
{ "id": "all", "label_th": "ทั้งหมด" }
],
"pending_decisions_list": {
"title_th": "เรื่องที่ต้องตัดสินใจ (6)",
"items": [
{
"rank": 1,
"title_th": "ขออนุมัติแผนฉุกเฉินหน่วยตะเนื่อง",
"owner": "สำนักงานป้องกันและบรรเทาสาธารณภัยจังหวัด",
"priority_tag": "เร่งด่วน",
"budget": { "value": 186.75, "unit": "ล้านบาท" },
"deadline_th": "วันนี้ 12:00 น."
},
{
"rank": 2,
"title_th": "ขออนุมัติแผนติดตั้งระบบระบายน้ำเพิ่มเติมป้องกันน้ำท่วม",
"owner": "สำนักงานโยธาธิการและผังเมืองจังหวัด",
"priority_tag": "เร่งด่วน",
"budget": { "value": 128.10, "unit": "ล้านบาท" },
"deadline_th": "ภายใน 32 ชม."
},
{
"rank": 3,
"title_th": "ขออนุมัติมาตรการลดฝุ่น PM2.5",
"owner": "สำนักงานสิ่งแวดล้อมจังหวัด",
"priority_tag": "สำคัญ",
"budget": { "value": 88.12, "unit": "ล้านบาท" },
"deadline_th": "ภายใน 15 วัน"
},
{
"rank": 4,
"title_th": "ขออนุมัติโครงการพัฒนาทักษะอาชีพประชาชน",
"owner": "สำนักงานพัฒนาฝีมือแรงงานจังหวัด",
"priority_tag": "ปกติ",
"budget": { "value": 63.20, "unit": "ล้านบาท" },
"deadline_th": "ภายใน 30 วัน"
},
{
"rank": 5,
"title_th": "ขออนุมัติงบแผนขยายสาย 5 สาย",
"owner": "แขวงทางหลวงภูเก็ต",
"priority_tag": "ปกติ",
"budget": { "value": 25.60, "unit": "ล้านบาท" },
"deadline_th": "ภายใน 45 วัน"
},
{
"rank": 6,
"title_th": "ขออนุมัติจัดซื้อครุภัณฑ์โรงพยาบาล",
"owner": "สำนักงานสาธารณสุขจังหวัด",
"priority_tag": "ปกติ",
"budget": { "value": 20.65, "unit": "ล้านบาท" },
"deadline_th": "ภายใน 18 วัน"
}
],
"actions": ["ดูเรื่องทั้งหมด"]
},
"impact_forecast": {
"title_th": "คาดการณ์ผลกระทบตัดสินใจ",
"summary_cards": [
{ "id": "economy", "label_th": "เศรษฐกิจ", "value_percent": 512.42, "unit": "ล้านบาท", "direction": "up" },
{ "id": "society", "label_th": "สังคม", "value": 856000, "unit": "คน", "direction": "up" },
{ "id": "environment", "label_th": "สิ่งแวดล้อม", "value_percent": 18, "unit": "%", "detail_th": "คุณภาพชีวิต", "direction": "up" },
{ "id": "risk", "label_th": "ความเสี่ยง", "value_percent": -32, "unit": "%", "detail_th": "ความเสียหาย", "direction": "down" }
],
"chart": {
"type": "line_chart",
"title_th": "ผลกระทบรวมรายวัน (ล้านบาท)",
"series": [
{ "label_th": "กรณีอนุมัติ", "color": "green", "end_value": 512.42 },
{ "label_th": "กรณีไม่อนุมัติ", "color": "red", "end_value": -312.18 },
{ "label_th": "กรณีปัจจุบัน", "color": "gray", "style": "dashed" }
],
"x_axis_labels": ["วันนี้", "1 วัน", "3 วัน", "7 วัน", "30 วัน"]
},
"actions": ["ดูรายละเอียด"]
},
"comparison_options_table": {
"title_th": "ข้อเสนอเปรียบเทียบ",
"columns": ["ทางเลือก", "งบประมาณ", "ผลกระทบ", "ระยะเวลาดำเนินการ", "ความเสี่ยง", "คะแนนรวม", "เลือก"],
"rows": [
{ "option_label": "A", "name_th": "แผนเร่งด่วน", "budget": { "value": 32.45, "unit": "ล้านบาท" }, "impact_th": "สูงมาก", "duration_th": "30 วัน", "risk_th": "ปานกลาง", "score": 4, "selected": true },
{ "option_label": "B", "name_th": "แผนแบ่งงวด", "budget": { "value": 18.20, "unit": "ล้านบาท" }, "impact_th": "สูง", "duration_th": "15 วัน", "risk_th": "ต่ำ", "score": 5, "selected": false },
{ "option_label": "C", "name_th": "แผนประหยัด", "budget": { "value": 9.80, "unit": "ล้านบาท" }, "impact_th": "ปานกลาง", "duration_th": "30 วัน", "risk_th": "ต่ำ", "score": 3, "selected": false }
],
"actions": ["เปรียบเทียบละเอียด"]
},
"ai_executive_assistant": {
"status": "BETA",
"analysis_intro_th": "จากการวิเคราะห์ข้อมูล ผมมอบแนะนำให้ท่านพิจารณาตัดสินใจใน 3 เรื่องเร่งด่วนก่อน เพื่อให้เกิดผลกระทบเชิงบวกสูงสุดต่อจังหวัด",
"urgent_recommendations": [
{ "rank": 1, "title_th": "แผนฉุกเฉินหน่วยหน้าเสี่ยง", "budget": { "value": 186.75, "unit": "ล้านบาท" } },
{ "rank": 2, "title_th": "ติดตั้งระบบระบายน้ำ", "budget": { "value": 128.10, "unit": "ล้านบาท" } },
{ "rank": 3, "title_th": "มาตรการลดฝุ่น PM2.5", "budget": { "value": 88.12, "unit": "ล้านบาท" } }
],
"actions": ["วิเคราะห์เพิ่มเติม"]
},
"recent_decisions_summary": {
"title_th": "สรุปการตัดสินใจล่าสุด",
"items": [
{ "status": "approved", "title_th": "โครงการปรับปรุงระบบไฟฟ้าแสงสว่าง", "budget": { "value": 12.50, "unit": "ล้านบาท" }, "timestamp_th": "17 ก.ค. 2567 14:35 น." },
{ "status": "pending", "title_th": "แผนจัดการขยะมูลฝอย", "budget": { "value": 8.75, "unit": "ล้านบาท" }, "timestamp_th": "17 ก.ค. 2567 11:20 น." },
{ "status": "rejected", "title_th": "มาตรการท่องเที่ยวเชิงนิเวศ", "budget": { "value": 5.20, "unit": "ล้านบาท" }, "timestamp_th": "16 ก.ค. 2567 16:10 น." }
],
"actions": ["ดูทั้งหมด"]
},
"urgent_action_bar": {
"title_th": "การดำเนินการด่วน",
"actions": [
{ "id": "approve", "label_th": "อนุมัติ" },
{ "id": "reject", "label_th": "ไม่อนุมัติ" },
{ "id": "request_more_info", "label_th": "ขอข้อมูลเพิ่มเติม" },
{ "id": "delegate", "label_th": "ส่งกลับหน่วยงาน" },
{ "id": "send_to_meeting", "label_th": "ส่งเข้าที่ประชุม" },
{ "id": "open_war_room", "label_th": "เปิด War Room" }
],
"cta": { "label_th": "ไปหน้า War Room", "target": "war_room" }
}
}

War_room
{
"screen": "war_room",
"header": {
"page_title": "WAR ROOM",
"page_subtitle_th": "ศูนย์ปฏิบัติการจังหวัดภูเก็ต",
"last_updated": "อัปเดตล่าสุด 08:30 น.",
"date": "18 กรกฎาคม 2567",
"weather_widget": { "condition": "ฝนปานกลาง", "humidity_percent": 75, "temperature_celsius": 28 },
"user": { "name_th": "ผู้ว่าราชการจังหวัดภูเก็ต", "role_en": "Provincial Commander" },
"notifications_count": 12
},
"kpi_cards": [
{ "id": "active_incidents", "label_th": "เหตุการณ์ที่กำลังดำเนิน", "value": 5, "unit": "เหตุการณ์", "trend_th": "เพิ่มขึ้น 1 เหตุการณ์" },
{ "id": "active_missions", "label_th": "ภารกิจที่กำลังดำเนินการ", "value": 24, "unit": "ภารกิจ", "trend_th": "แล้วเสร็จ 12 ภารกิจ" },
{ "id": "operating_units", "label_th": "หน่วยงานที่ปฏิบัติการ", "value": 18, "unit": "หน่วยงาน" },
{ "id": "personnel_deployed", "label_th": "เจ้าหน้าที่ปฏิบัติงาน", "value": 856, "unit": "คน", "trend_th": "ปฏิบัติงาน" },
{ "id": "vehicles_equipment", "label_th": "ยานพาหนะที่ใช้งาน", "value": 132, "unit": "คัน", "trend_th": "พร้อมใช้งาน 88%" }
],
"realtime_map": {
"title_th": "แผนที่สถานการณ์แบบเรียลไทม์",
"type": "live_incident_map",
"incident_type_legend": [
{ "type_th": "อุทกภัย", "value": 2, "color": "blue" },
{ "type_th": "อุบัติเหตุ", "value": 1, "color": "orange" },
{ "type_th": "สาธารณภัย", "value": 0, "color": "red" },
{ "type_th": "PM2.5", "value": 1, "color": "purple" },
{ "type_th": "อื่นๆ", "value": 0, "color": "gray" }
],
"map_markers": [
{ "label": "1", "location_th": "กลาง (approx)" },
{ "label": "2", "location_th": "เมืองภูเก็ต" },
{ "label": "3", "location_th": "กะทู้ (approx)" },
{ "label": "4", "location_th": "ฉลอง (approx)" }
],
"actions": ["ดูแบบเต็มจอ"]
},
"active_incidents_panel": {
"title_th": "เหตุการณ์ที่กำลังดำเนิน (5)",
"items": [
{ "rank": 1, "title_th": "น้ำท่วมขังในพื้นที่เมืองใหม่", "severity_tag": "วิกฤต", "time": "07:45 น. | เริ่มปฏิบัติการ", "impact": { "value": 8560, "unit": "คน" } },
{ "rank": 2, "title_th": "แลนด์สไลด์บนถนนสาย 4302 ป่าตอง", "severity_tag": "เฝ้าระวังสูง", "time": "08:10 น. | เป็นเวลานาน", "impact": { "value": 3890, "unit": "คน" } },
{ "rank": 3, "title_th": "ไฟป่าบริเวณเขานาคเกิด", "severity_tag": "เฝ้าระวัง", "time": "06:30 น. | ควบคุมได้ 60%", "impact": { "value": 120, "unit": "ไร่" } },
{ "rank": 4, "title_th": "PM2.5 เกินมาตรฐาน", "severity_tag": "เฝ้าระวัง", "time": "08:00 น. | ค่าเฉลี่ย 88 มคก.", "impact_th": "ประชาชนทั่วไป" },
{ "rank": 5, "title_th": "จุดเสี่ยงน้ำมันรั่ว", "severity_tag": "ปกติ", "time": "เวลา 12:00 น.", "impact": { "value": 2300, "unit": "คน" } }
],
"actions": ["ดูเหตุการณ์ทั้งหมด"]
},
"active_missions_panel": {
"title_th": "ภารกิจปฏิบัติการที่กำลังดำเนินการ",
"items": [
{ "title_th": "ช่วยเหลือผู้ประสบภัยน้ำท่วม", "progress_percent": 75, "progress_fraction": "6/8 จุด" },
{ "title_th": "เปิดเส้นทางเลี่ยงถนน", "progress_percent": 60, "progress_fraction": "3/5 จุด" },
{ "title_th": "ลดฝุ่นประชาชน", "progress_percent": 80, "progress_fraction": "4/5 จุด" },
{ "title_th": "แจกจ่ายถุงยังชีพน้ำดื่ม", "progress_percent": 90, "progress_fraction": "5/5 จุด", "status": "completed" },
{ "title_th": "ตรวจสอบโครงสร้างพื้นฐาน", "progress_percent": 40, "progress_fraction": "2/5 จุด" },
{ "title_th": "จัดตั้งศูนย์พักพิง", "progress_percent": 70, "progress_fraction": "4/6 จุด" }
],
"actions": ["ดูภารกิจทั้งหมด"]
},
"ai_executive_assistant": {
"status": "BETA",
"analysis_intro_th": "จากข้อมูลล่าสุด มี 2 เหตุการณ์ที่ต้องให้ความสนใจเป็นพิเศษ และ 3 ภารกิจที่ควรเร่งดำเนินการ",
"recommendations": [
"อนุมัติเครื่องสูบน้ำเพิ่มเติมในพื้นที่กะทู้",
"เร่งเปิดเส้นทางเลี่ยงบางป่าตอง เพื่อลดผลกระทบต่อการจราจร",
"สั่งการหน่วยงานที่เกี่ยวข้องเร่งดำเนินการศูนย์พักพิงเพิ่มเติมในพื้นที่เมือง"
],
"actions": ["ดูรายละเอียดและแนวทาง"]
},
"urgent_orders_panel": {
"title_th": "คำสั่งการเร่งด่วน",
"items": [
{ "title_th": "อนุมัติเครื่องสูบน้ำเพิ่มเติมในพื้นที่ 20 เครื่อง", "status_tag": "รออนุมัติ" },
{ "title_th": "ระดมกำลังเจ้าหน้าที่เพิ่มเติม", "status_tag": "รออนุมัติ" },
{ "title_th": "เปิดศูนย์พักพิงชั่วคราวเพิ่มเติม 2 แห่ง", "status_tag": "อนุมัติแล้ว" }
],
"actions": ["ดูทั้งหมด"]
},
"available_resources": {
"title_th": "ทรัพยากรที่พร้อมใช้งาน",
"items": [
{ "id": "personnel", "label_th": "เจ้าหน้าที่", "value": 856, "unit": "คน", "readiness_percent": 92 },
{ "id": "boats", "label_th": "เรือขนส่ง", "value": 28, "unit": "ลำ", "readiness_percent": 80 },
{ "id": "shelters", "label_th": "ศูนย์พักพิง", "value": 12, "unit": "แห่ง", "readiness_percent": 100 },
{ "id": "medical_equipment", "label_th": "เครื่องมือแพทย์", "value": 36, "unit": "ชิ้น", "readiness_percent": 87 },
{ "id": "vehicles", "label_th": "ยานพาหนะ", "value": 8, "unit": "คัน", "readiness_percent": 75 },
{ "id": "operation_vehicles", "label_th": "รถปฏิบัติการ", "value": 4, "unit": "คัน", "readiness_percent": 100 }
],
"actions": ["ดูทั้งหมด"]
},
"cctv_live": {
"title_th": "กล้อง CCTV จุดสำคัญ",
"cameras": [
{ "name_th": "สี่แยกสำคัญ (กะทู้)", "status": "ออนไลน์" },
{ "name_th": "แหล่งชุมชน (เมือง)", "status": "ออนไลน์" },
{ "name_th": "สะพานหิน", "status": "ออนไลน์" },
{ "name_th": "ป่าตอง (ชายหาด)", "status": "ออนไลน์" }
],
"actions": ["ดูทั้งหมด"]
},
"latest_updates_timeline": {
"title_th": "ความเคลื่อนไหวล่าสุด",
"items": [
{ "time": "08:25", "title_th": "ศูนย์บัญชาการ ราชการน้ำท่วมบางใหญ่ เพิ่มเจ้าหน้าที่", "area": "กะทู้, ป่าตอง, เมือง" },
{ "time": "08:15", "title_th": "เพิ่มเครื่อง สูบน้ำระบบ 120 ลบ. ไปปฏิบัติหน้าที่", "area": "อ.กะทู้" },
{ "time": "08:05", "title_th": "ทีมแพทย์ฉุกเฉินภูเก็ต เดินทางถึงจุดเกิดเหตุ", "location": "รพ.วชิระภูเก็ต" }
],
"actions": ["ดูทั้งหมด"]
},
"key_agencies_panel": {
"title_th": "หน่วยงานหลักที่ปฏิบัติการ",
"agencies": [
{ "abbr_th": "ปภ.ภูเก็ต" },
{ "abbr_th": "ทน.ภูเก็ต" },
{ "abbr_th": "ตร.ป่าตอง" },
{ "abbr_th": "สาธารณสุข" },
{ "abbr_th": "อ.ถลาง" },
{ "abbr_th": "แขวงทาง" }
],
"actions": ["ดูทั้งหมด"]
},
"urgent_action_bar": {
"title_th": "การดำเนินการด่วน",
"actions": [
{ "id": "open_new_war_room", "label_th": "เปิด War Room ย่อยเหตุการณ์" },
{ "id": "order_units", "label_th": "สั่งการหน่วยงาน" },
{ "id": "request_support", "label_th": "ขอรับการสนับสนุน" },
{ "id": "record_situation", "label_th": "บันทึกการปฏิบัติ" },
{ "id": "personnel_report", "label_th": "รายงานสถานการณ์" }
],
"cta": { "label_th": "ไปหน้า Communication", "target": "communication" }
}
}

Communication
{
"screen": "communication",
"header": {
"page_title": "COMMUNICATION",
"page_subtitle_th": "การสื่อสารประชาชน",
"sub_desc_th": "ภาพรวมการสื่อสารและการรับรู้ของประชาชน",
"weather_widget": { "condition": "เมฆบางส่วน", "humidity_percent": 62, "temperature_celsius": 28 },
"user": { "name_th": "ผู้ว่าราชการจังหวัดภูเก็ต", "role_en": "Provincial Commander" },
"notifications_count": 12
},
"kpi_cards": [
{ "id": "messages_sent_today", "label_th": "ข้อความที่ส่งวันนี้", "value": 28, "unit": "ข้อความ", "trend_percent": 27, "direction": "up" },
{ "id": "citizens_reached", "label_th": "ประชาชนที่เข้าถึง", "value": 856250, "unit": "คน", "trend_percent": 18, "direction": "up" },
{ "id": "read_rate", "label_th": "อัตราการอ่าน (Reach)", "value": 72.4, "unit": "%", "trend_percent": 6.6, "direction": "up" },
{ "id": "engagement", "label_th": "อัตราการมีส่วนร่วม (Engagement)", "value": 12.8, "unit": "%", "trend_percent": 2.3, "direction": "up" },
{ "id": "urgent_messages", "label_th": "ข้อความเร่งด่วนวันนี้", "value": 5, "unit": "ข้อความ", "trend_th": "เพิ่มขึ้น 2 ข้อความ" }
],
"channels_panel": {
"title_th": "ช่องทางการสื่อสาร",
"channels": [
{ "id": "line", "name": "LINE Official Account", "subscribers": 512680, "read_rate_percent": 78.6, "engagement_percent": 13.6, "trend": "up" },
{ "id": "facebook", "name": "Facebook Page", "subscribers": 286450, "read_rate_percent": 65.2, "engagement_percent": 10.4, "trend": "up" },
{ "id": "sms", "name": "SMS แจ้งเตือน", "subscribers": 42680, "read_rate_percent": 92.1, "engagement_percent": 4.2, "trend": "up" },
{ "id": "website", "name": "Website / Popup", "subscribers": 12840, "read_rate_percent": 48.3, "engagement_percent": 6.1, "trend": "up" },
{ "id": "loudspeaker", "name": "เสียงตามสาย / กระจายข่าว", "subscribers": 2600, "read_rate_percent": null, "engagement_percent": null }
],
"actions": ["ดูรายละเอียดช่องทาง"]
},
"recent_messages_panel": {
"title_th": "ข้อความล่าสุด",
"items": [
{ "channel": "LINE", "title_th": "แจ้งเตือนสถานการณ์น้ำท่วมพื้นที่ กะทู้", "timestamp_th": "18 ก.ค. 2567 07:45 น.", "reach": 512680 },
{ "channel": "SMS", "title_th": "ประกาศคำเตือนคลื่นลมแรง 12 หาด ในพื้นที่ป่าตอง", "timestamp_th": "18 ก.ค. 2567 07:15 น.", "reach": 286450 },
{ "channel": "Facebook", "title_th": "ประชาสัมพันธ์เส้นทางเลี่ยงจราจร", "timestamp_th": "18 ก.ค. 2567 09:00 น.", "reach": 156320 },
{ "channel": "Website", "title_th": "ประกาศแจ้งเตือนคุณภาพอากาศเกินมาตรฐาน", "timestamp_th": "17 ก.ค. 2567 16:20 น.", "reach": 98500 }
],
"actions": ["ดูข้อความทั้งหมด"]
},
"sentiment_analysis": {
"title_th": "การรับรู้ประชาชน (Sentiment)",
"gauge_percent": 78,
"gauge_label_th": "เชิงบวก",
"breakdown": [
{ "sentiment": "positive", "percent": 78 },
{ "sentiment": "neutral", "percent": 15 },
{ "sentiment": "negative", "percent": 7 }
],
"sample_comments": [
{ "sentiment": "positive", "text_th": "ขอบคุณที่แจ้งเตือนล่วงหน้า...", "source": "line_ta", "timestamp_th": "18 ก.ค. 2567 07:45 น." },
{ "sentiment": "negative", "text_th": "อยากให้แจ้งเร็วกว่านี้...", "source": "fb_page", "timestamp_th": "18 ก.ค. 2567 07:00 น." },
{ "sentiment": "neutral", "text_th": "ข้อมูลชัดเจนดี แต่อยากให้มีแผนที่ประกอบ...", "source": "sms" }
],
"actions": ["ดูรายละเอียดทั้งหมด"]
},
"communication_plan": {
"title_th": "แผนการสื่อสาร",
"date": "18 กรกฎาคม 2567",
"items": [
{ "time": "09:00", "title_th": "ประกาศสถานการณ์น้ำท่วมล่าสุด", "status_tag": "กำลังส่ง" },
{ "time": "12:00", "title_th": "เตือนเส้นทางจราจรเลี่ยง", "status_tag": "รอส่ง" },
{ "time": "15:00", "title_th": "แจ้งเตือนคลื่นลมแรง สถานการณ์ล่าสุด", "status_tag": "รอส่ง" },
{ "time": "18:00", "title_th": "ประชาสัมพันธ์แผนป้องกันน้ำท่วม", "status_tag": "รอส่ง" },
{ "time": "20:00", "title_th": "สรุปสถานการณ์ประจำวัน", "status_tag": "รอส่ง" }
],
"actions": ["สร้างข้อความใหม่", "ดูปฏิทินทั้งหมด"]
},
"reach_map": {
"title_th": "แผนที่การเข้าถึงประชาชน (Reach Map)",
"channel_filter": "LINE OA",
"legend": [
{ "range": "80% ขึ้นไป", "color": "green" },
{ "range": "60% - 80%", "color": "yellow" },
{ "range": "40% - 60%", "color": "orange" },
{ "range": "ต่ำกว่า 40%", "color": "red" }
],
"actions": ["ดูแบบเต็มจอ"]
},
"target_groups_panel": {
"title_th": "กลุ่มเป้าหมายหลัก",
"groups": [
{ "name_th": "ทั่วไป/พื้นที่เสี่ยง", "value": 512680, "unit": "คน", "reach_percent": 78 },
{ "name_th": "ผู้สูงอายุ", "value": 186450, "unit": "คน", "reach_percent": 62 },
{ "name_th": "นักท่องเที่ยว", "value": 98320, "unit": "คน", "reach_percent": 71 },
{ "name_th": "ผู้ประกอบการ", "value": 45680, "unit": "คน", "reach_percent": 55 },
{ "name_th": "นักเรียน", "value": 32120, "unit": "คน", "reach_percent": 61 }
],
"actions": ["ดูทั้งหมด"]
},
"ai_executive_assistant": {
"status": "BETA",
"analysis_intro_th": "จากการวิเคราะห์การรับรู้ของประชาชนวันนี้ พบว่ามีความเข้าใจดี",
"recommendations": [
"แนะนำส่งข้อความแจ้งเตือนซ้ำในพื้นที่กะทู้ที่การเปิดอ่านต่ำกว่า 40%",
"เพิ่มภาษาถิ่นในข้อความประชาสัมพันธ์เพื่อให้เข้าใจง่ายขึ้น 15-20%",
"กลุ่มนักท่องเที่ยวชาวต่างชาติยังเข้าถึงข้อมูลได้น้อย แนะนำเพิ่มช่องทางภาษาอังกฤษ"
],
"actions": ["ดูแผนและแนวทางแนวทาง"]
},
"quick_tools_panel": {
"title_th": "เครื่องมือสื่อสารด่วน",
"tools": [
"สร้างข้อความใหม่",
"ตั้งเวลาส่งข้อความ",
"ดูแผนที่ความครอบคลุม",
"สรุปผลการสื่อสาร",
"ตั้งค่าข้อความอัตโนมัติ"
]
},
"cta": { "label_th": "ไปหน้า Outcome", "target": "outcome" }
}

Outcome
{
"screen": "outcome",
"header": {
"page_title": "OUTCOME",
"page_subtitle_th": "ผลลัพธ์และบทเรียน",
"sub_desc_th": "วิเคราะห์ผลลัพธ์การดำเนินงานและเปรียบเทียบผลกระทบต่อประชาชน",
"weather_widget": { "condition": "ท้องฟ้าโปร่ง", "humidity_percent": 62, "temperature_celsius": 28 },
"user": { "name_th": "ผู้ว่าราชการจังหวัดภูเก็ต", "role_en": "Provincial Commander" },
"notifications_count": 12
},
"filters_bar": {
"date_range": { "label_th": "ช่วงเวลา", "value_th": "11 ก.ค. 2567 - 18 ก.ค. 2567" },
"compare_period": { "label_th": "เปรียบเทียบกับ", "value_th": "ช่วงเวลาก่อนหน้า (4 - 10 ก.ค. 2567)" },
"view_scope": { "label_th": "มิติการเปรียบเทียบ", "value_th": "ภาพรวมจังหวัด" },
"actions": ["ส่งออกรายงาน"]
},
"summary_kpi_cards": {
"title_th": "สรุปผลลัพธ์สำคัญ",
"cards": [
{ "id": "task_success_rate", "label_th": "การสำเร็จงานตามแผน", "value": 85, "unit": "%", "trend_percent": 18, "direction": "up", "vs_label_th": "จากสัปดาห์ก่อน" },
{ "id": "citizen_complaints", "label_th": "ประชาชนที่ร้องเรียนลดลง", "value": 32, "unit": "%", "trend_percent": 32, "direction": "down", "vs_label_th": "จากสัปดาห์ก่อน" },
{ "id": "avg_response_time", "label_th": "เวลาตอบสนองเฉลี่ยลดลง", "value": 28, "unit": "%", "trend_percent": 28, "direction": "down", "vs_label_th": "จากสัปดาห์ก่อน" },
{ "id": "budget_utilization", "label_th": "งบประมาณใช้ไปตามแผน", "value": 92, "unit": "%", "trend_percent": 12, "direction": "up", "vs_label_th": "จากสัปดาห์ก่อน" },
{ "id": "satisfaction_score", "label_th": "ความพึงพอใจประชาชน", "value": 4.6, "unit": "/5", "trend_value": 0.6, "direction": "up", "vs_label_th": "จากสัปดาห์ก่อน" }
]
},
"performance_radar": {
"title_th": "ผลลัพธ์ตามมิติการดำเนินงาน",
"type": "radar_chart",
"legend": [
{ "label_th": "สัปดาห์นี้", "color": "green" },
{ "label_th": "สัปดาห์ก่อน", "color": "gray" },
{ "label_th": "เป้าหมาย", "color": "dashed" }
],
"dimensions": [
{ "name_th": "การดำเนินงาน", "value_percent": 85 },
{ "name_th": "ความโปร่งใส", "value_percent": 78 },
{ "name_th": "คุณภาพชีวิต", "value_percent": 82 },
{ "name_th": "ความยั่งยืน", "value_percent": 90 },
{ "name_th": "โครงสร้างพื้นฐาน", "value_percent": 76 }
],
"actions": ["ดูรายละเอียดรายมิติ"]
},
"citizen_impact_panel": {
"title_th": "ผลกระทบต่อประชาชน (Impact)",
"metrics": [
{ "id": "citizens_served", "label_th": "ประชาชนได้รับประโยชน์", "value": 856250, "unit": "คน", "trend_percent": 18, "direction": "up" },
{ "id": "complaints_resolved", "label_th": "ลดความเดือดร้อน", "value": 5248, "unit": "เหตุการณ์", "trend_percent": 24, "direction": "down" },
{ "id": "economic_value", "label_th": "ผลกระทบทางเศรษฐกิจทางบวก", "value": 128.42, "unit": "ล้านบาท", "trend_percent": 22, "direction": "up" }
],
"trend_chart": {
"title_th": "แนวโน้มผลกระทบต่อประชาชน",
"type": "line_chart",
"series": ["ประชาชนได้รับประโยชน์ (คน)", "ลดความเดือดร้อน (เหตุการณ์)", "ผลกระทบเศรษฐกิจ (ล้านบาท)"],
"x_axis_labels": ["11 ก.ค.", "12 ก.ค.", "13 ก.ค.", "14 ก.ค.", "15 ก.ค.", "16 ก.ค.", "17 ก.ค.", "18 ก.ค."]
}
},
"goal_completion_donut": {
"title_th": "การบรรลุเป้าหมายนโยบาย",
"total": 24,
"unit_th": "การ",
"breakdown": [
{ "status_th": "สำเร็จ", "value": 21, "percent": 85, "color": "green" },
{ "status_th": "อยู่ระหว่างดำเนินการ", "value": 2, "percent": 8, "color": "blue" },
{ "status_th": "ไม่สำเร็จ", "value": 1, "percent": 4, "color": "orange" },
{ "status_th": "ยกเลิก", "value": 0, "percent": 0, "color": "gray" }
],
"actions": ["ดูรายละเอียดการดำเนินการ"]
},
"comparison_table": {
"title_th": "เปรียบเทียบผลลัพธ์รายสัปดาห์",
"columns": ["ตัวชี้วัด", "สัปดาห์นี้", "สัปดาห์ก่อน", "เปลี่ยนแปลง"],
"rows": [
{ "metric_th": "ประชาชนได้รับประโยชน์ (คน)", "this_week": 856250, "last_week": 724680, "change_percent": 18, "direction": "up" },
{ "metric_th": "ลดความเดือดร้อน (เหตุการณ์)", "this_week": 5248, "last_week": 6896, "change_percent": 24, "direction": "down" },
{ "metric_th": "ผลกระทบเศรษฐกิจ (ล้านบาท)", "this_week": 128.42, "last_week": 104.30, "change_percent": 22, "direction": "up" },
{ "metric_th": "เวลาตอบสนองเฉลี่ย (นาที)", "this_week": 32, "last_week": 44.30, "change_percent": 28, "direction": "down" },
{ "metric_th": "ความพึงพอใจประชาชน (คะแนน)", "this_week": 4.6, "last_week": 4.0, "change_percent_absolute": 0.6, "direction": "up" }
]
},
"top_projects_panel": {
"title_th": "โครงการ/มาตรการที่สร้างผลกระทบสูงสุด",
"columns": ["โครงการ/มาตรการ", "ผลกระทบ", "งบประมาณ (ล้านบาท)"],
"items": [
{ "name_th": "ระบบเตือนภัยน้ำท่วมล่วงหน้า", "impact_percent": 92, "budget": 146.25 },
{ "name_th": "ศูนย์การแพทย์ฉุกเฉินภูเก็ต", "impact_percent": 87, "budget": 128.60 },
{ "name_th": "แผนจัดการขยะชุมชนยั่งยืน", "impact_percent": 78, "budget": 98.42 },
{ "name_th": "ศูนย์พักพิงชั่วคราวอัจฉริยะ", "impact_percent": 65, "budget": 86.35 },
{ "name_th": "มาตรการลดฝุ่น PM2.5", "impact_percent": 55, "budget": 75.23 }
],
"actions": ["ดูโครงการทั้งหมด"]
},
"satisfaction_trend": {
"title_th": "แนวโน้มความพึงพอใจ (8 สัปดาห์)",
"type": "multi_line_chart",
"series": [
{ "name_th": "ความปลอดภัย", "end_value": 4.6, "trend": 0.3 },
{ "name_th": "คุณภาพชีวิต", "end_value": 4.3, "trend": null },
{ "name_th": "เศรษฐกิจ", "end_value": 4.1, "trend": null },
{ "name_th": "สิ่งแวดล้อม", "end_value": 4.4, "trend": 0.3 }
],
"x_axis_labels": ["สัปดาห์-8", "-6", "-4", "-2", "สัปดาห์นี้"],
"actions": ["ดูแนวโน้มทั้งหมด"]
},
"ai_executive_assistant": {
"status": "BETA",
"analysis_intro_th": "สรุปเปรียบเทียบผลลัพธ์สัปดาห์นี้",
"insights": [
"การจัดการเหตุน้ำท่วมเร็วขึ้น 2-3 ชั่วโมง ช่วยลดความเสียหายได้ถึง 32%",
"การบูรณาการหน่วยงานในพื้นที่ทำให้ลดเวลาตอบสนองลง 28%",
"การสื่อสารที่ชัดเจนต่อเนื่อง ส่งผลให้ความพึงพอใจเพิ่มขึ้นจาก 0.6 คะแนน"
],
"actions": ["ดูเปรียบเทียบทั้งหมด"]
},
"highlighted_outcomes_panel": {
"title_th": "ผลลัพธ์ที่โดดเด่น",
"items": [
{ "title_th": "ลดเวลาเตือนภัยล่วงหน้า", "detail_th": "จุดเสี่ยง 12 จุด ลดเวลาลง 3 ชม.", "tag_th": "ดีเยี่ยม" },
{ "title_th": "คุณภาพแหล่งท่องเที่ยว", "detail_th": "อยู่ในเกณฑ์มาตรฐาน 85%", "tag_th": "ดีเยี่ยม" },
{ "title_th": "ความพึงพอใจการบริการ", "detail_th": "ด้านสาธารณสุข เพิ่มขึ้น 0.8 คะแนน (จาก 4.2 เป็น 5.0)", "tag_th": "ดีเยี่ยม" }
],
"actions": ["ดูผลลัพธ์เด่นทั้งหมด"]
},
"action_bar": {
"title_th": "การดำเนินการต่อไป",
"actions": [
{ "id": "create_executive_summary", "label_th": "จัดทำรายงานสรุปผู้บริหาร (Executive Summary)" },
{ "id": "share_lessons_learned", "label_th": "นำเสนอบทเรียนราชการ (ประชุมถัดไป)" },
{ "id": "adjust_target_plan", "label_th": "ปรับปรุงแผนการดำเนินงาน (จากบทเรียนนี้)" },
{ "id": "set_next_period_target", "label_th": "กำหนดเป้าหมายสัปดาห์ถัดไป" },
{ "id": "track_ongoing_issues", "label_th": "ติดตามผลต่อเนื่อง (สิ่งเรื่องเดียวกัน)" }
],
"cta": { "label_th": "กลับหน้า Daily Brief", "target": "daily_brief" }
}
}

{
"screen": "organic_executive_advisor_storyboard",
"role": "manager",
"header": {
"product_name": "CITYZEN ORGANIC EXECUTIVE ADVISOR",
"title": "CityZen Organic Executive Advisor Storyboard",
"subtitle_th": "ผู้ช่วยผู้บริหารสำหรับการตัดสินใจอะไรที่ยังของโรงแรม",
"badges": ["Evidence First (ข้อมูลจริงเท่านั้น)", "Explainable (อธิบายได้ ไม่ใช่กล่องดำ)", "Impact Driven (มุ่งเน้นผลลัพธ์)"],
"user": { "name_th": "คุณสมชาย วงศ์เจริญ", "role_en": "General Manager" },
"timestamp": "08:30 น. 18 ก.ค. 2569"
},
"panels": [
{
"id": 1, "title": "Welcome", "time": "08:30",
"content_th": "สวัสดีตอนเช้า คุณสมชาย — CityZen Organic Executive Advisor พร้อมสรุปสถานการณ์ขยะอินทรีย์วันนี้",
"image": "hotel_exterior",
"cta": "เริ่มต้น Executive Briefing"
},
{
"id": 2, "title": "Organic Briefing Package", "time": "08:31",
"subtitle_th": "สรุปข้อมูลประจำวัน",
"kpi_cards": [
{ "label_th": "จุดที่ต้องเฝ้าระวัง", "value": 3, "unit": "จุด", "severity": "warning" },
{ "label_th": "เหตุการณ์ผิดปกติ", "value": 4, "unit": "เรื่อง", "severity": "alert" },
{ "label_th": "Pickup / Storage", "value": 2, "unit": "รายการ" },
{ "label_th": "แนวโน้ม", "value": "+12%", "direction": "up" }
],
"executive_summary_th": "ขยะอินทรีย์วันนี้เพิ่มขึ้น 14% สาเหตุหลักจาก Breakfast Buffet ณ Kitchen B (Main Kitchen) และ Banquet Hall",
"cta": "เข้าสู่การสรุป"
},
{
"id": 3, "title": "Executive Brief", "time": "08:32",
"headline": { "label_th": "วันนี้ปริมาณขยะรวม", "value": 524, "unit": "kg", "trend_percent": 14, "direction": "up" },
"top_causes_th": ["Breakfast Buffet", "Kitchen B (Main Kitchen)", "Banquet Hall"],
"chart": { "type": "line_chart", "title_th": "แนวโน้มขยะรายวัน" },
"metrics": [
{ "label_th": "เข้า", "value": 7.3, "unit": "ตัน" },
{ "label_th": "", "value": 460, "unit": "kg", "trend": "เพิ่มขึ้น" },
{ "label_th": "เหลือทิ้ง/วัน", "value": 64, "unit": "kg", "direction": "up" },
{ "label_th": "คาดการณ์พรุ่งนี้", "value": 580, "unit": "kg" }
],
"cta": "เปิดสมุดบันทึกเพิ่มเติม"
},
{
"id": 4, "title": "Evidence Package", "time": "08:33",
"subtitle_th": "รวบรวม 14 หลักฐาน",
"evidence_sources": [
{ "type": "QR Generator Scan", "count": 186, "unit": "items" },
{ "type": "Weight Record", "count": 214, "unit": "items" },
{ "type": "Staff Input", "count": 21, "unit": "items" },
{ "type": "Pickup Log", "count": 18, "unit": "items" },
{ "type": "Photo Evidence", "count": 8, "unit": "items" },
{ "type": "Storage Sensor", "count": 4, "unit": "items" }
],
"completeness_donut": {
"value_percent": 96, "label_th": "Evidence Completeness",
"legend": ["Data Verified", "Time Stamped", "Source Verified", "Cross Checked"]
},
"cta": "ดูรายละเอียดหลักฐาน"
},
{
"id": 5, "title": "Understanding", "time": "08:34",
"subtitle_th": "แผนภูมิความเข้าใจ (Risk Heatmap)",
"heatmap": {
"columns_th": ["Kitchen A", "Kitchen B", "Breakfast Buffet"],
"legend": [
{ "level_th": "วิกฤต", "color": "red" },
{ "level_th": "เฝ้าระวัง", "color": "orange" },
{ "level_th": "ปานกลาง", "color": "yellow" },
{ "level_th": "ปกติ", "color": "green" }
]
},
"trend_chart": { "title_th": "แนวโน้ม 7 วันย้อนหลัง (kg)", "type": "line_chart" },
"cta": "ดูรายละเอียดเพิ่มเติม"
},
{
"id": 6, "title": "Policy / SOP / Contract", "time": "08:35",
"subtitle_th": "กฎเกณฑ์ที่เกี่ยวข้อง",
"items": [
{ "type": "sop", "title_th": "SOP การแยกขยะอินทรีย์", "updated_th": "อัปเดต 1 พ.ย. 2569" },
{ "type": "schedule", "title_th": "รอบเก็บขยะ", "detail_th": "3 รอบ/วัน (10:00, 16:00 น.)" },
{ "type": "contract", "title_th": "สัญญากับผู้รับกำจัด", "vendor_th": "Green Waste Co., Ltd." },
{ "type": "policy", "title_th": "นโยบายบริจาคอาหาร", "detail_th": "Food Donation Policy" },
{ "type": "esg_goal", "title_th": "เป้าหมาย ESG", "detail_th": "ลดขยะอินทรีย์ 30% ภายในปี 2569" }
],
"cta": "ดูสัญญาทั้งหมด"
},
{
"id": 7, "title": "Options for Consideration", "time": "08:36",
"subtitle_th": "ตัวเลือกสำหรับการพิจารณา",
"options": [
{ "label": "A", "title_th": "เพิ่มรอบเก็บขยะอินทรีย์", "impact_th": "ลดลง 28%" },
{ "label": "B", "title_th": "จำกัดเวลา (Refill) Buffet", "impact_th": "ลดลง 18%" },
{ "label": "C", "title_th": "ส่งต่อร้านอาหาร (Food Donation)", "impact_th": "120 Meals" },
{ "label": "D", "title_th": "ตรวจสอบสาเหตุเพิ่มเติมที่ Kitchen B", "impact_th": "ลดลง 25%" }
],
"cta": "เปรียบเทียบทางเลือก"
},
{
"id": 8, "title": "Executive Judgment", "time": "08:37",
"subtitle_th": "การตัดสินใจของผู้บริหาร",
"judgments": [
{ "action_th": "อนุมัติเพิ่มรอบเก็บขยะ เวลา 13:00 น.", "status_th": "อนุมัติ" },
{ "action_th": "มอบหมาย Kitchen Manager ควบคุมปริมาณ", "status_th": "มอบหมาย" },
{ "action_th": "มอบหมาย Housekeeping จ่าย Steward", "status_th": "มอบหมาย" },
{ "action_th": "ระบุเหตุผล เวลา 17:00 น.", "status_th": "รอดำเนินการ" }
],
"cta": "บันทึกเหตุผลการตัดสินใจได้ที่นี่"
},
{
"id": 9, "title": "Draft Order Preview", "time": "08:38",
"subtitle_th": "ร่างคำสั่ง (ตัวอย่าง)",
"document": {
"letterhead": "HOTEL",
"ref_no": "ที่ 123 / 2569",
"items_th": [
"ให้เพิ่มรอบเก็บขยะอินทรีย์ ครบ 13:00 น.",
"ให้ Kitchen Manager ควบคุมปริมาณ Buffet Line 1",
"ให้ Housekeeping มอบหมาย Steward เวลา 17:00 น."
],
"signature": "General Manager"
},
"actions": ["ดูรายละเอียด", "อนุมัติสั่งการ"]
},
{
"id": 10, "title": "Operations Execution", "time": "08:39",
"subtitle_th": "การดำเนินงาน Real-time",
"kpi_cards": [
{ "label_th": "งานที่มอบหมาย", "value": "2 / 3" },
{ "label_th": "Data On-time", "value_percent": 98 },
{ "label_th": "Storage Level", "value_percent": 85 },
{ "label_th": "Vendor Status", "value_th": "พร้อมรับ" }
],
"progress_log": [
{ "time": "10:00", "status": "done" },
{ "time": "13:00", "status": "in_progress" },
{ "time": "16:00", "status": "done" },
{ "title_th": "ตรวจสอบ Kitchen B", "status": "done" }
],
"cta": "ติดตามแบบ Real-time"
},
{
"id": 11, "title": "Internal Communication", "time": "08:40",
"subtitle_th": "สื่อสารภายในทีมงานที่เกี่ยวข้อง",
"teams": ["Kitchen ทีมงาน", "Housekeeping ทีมงาน", "Banquet ทีมงาน", "Vendor ผู้ขาย", "Sustainability Team ทีมงาน"],
"channels": ["LINE OA", "Mobile App", "Email", "Notice Board", "Radio"],
"cta": "ดูประวัติการสื่อสาร"
},
{
"id": 12, "title": "Outcome & Prediction", "time": "08:41",
"subtitle_th": "คาดการณ์ผลลัพธ์",
"kpi_cards": [
{ "label_th": "ลดขยะ", "value_percent": 28, "direction": "down" },
{ "label_th": "ประหยัดต้นทุน", "value": 38000, "unit": "บาท" },
{ "label_th": "ลด Complaint", "value_percent": -35 },
{ "label_th": "Food Donation", "value": 120, "unit": "Meals" }
],
"expected_outcomes_th": [
"ลดปริมาณขยะอินทรีย์ลงได้จริง",
"ลดต้นทุนการจัดการขยะ",
"เพิ่มคุณภาพสิ่งแวดล้อมโดยรวม",
"สนับสนุนภาพลักษณ์ ESG ที่ยั่งยืน"
],
"cta": "ดูรายละเอียดเพิ่มเติม"
},
{
"id": 13, "title": "End of Morning Brief", "time": "08:42",
"content_th": "การสรุปข้อมูลประจำวันเสร็จสมบูรณ์ — ทุกขั้นตอนในการตัดสินใจเชิงบริหารได้ถูกบันทึกไว้อย่างครบถ้วน",
"cta": "เข้าสู่ Organic Executive Workspace"
}
],
"footer_summary": {
"title": "CityZen Organic Executive Advisor",
"tagline_th": "ผู้ช่วยผู้บริหารใช้ข้อมูลจริงและหลักฐาน เพื่อให้คำปรึกษา สนับสนุนการตัดสินใจ และสร้างผลลัพธ์ที่ยั่งยืน",
"pillars": ["ข้อมูลหลักฐาน (Evidence)", "วิเคราะห์ (Analysis)", "ให้คำแนะนำ (Advice)", "สนับสนุนการตัดสินใจ (Decision)", "ติดตามผล (Follow-up)", "รายงาน (Report)"],
"motto": "Evidence before Advice. Insight before Impact.",
"cta": "เข้าสู่ Organic Executive Workspace"
}
}

{
"screen": "manager_daily_brief_organic",
"role": "manager",
"header": {
"page_title": "DAILY BRIEF",
"page_subtitle_th": "สรุปภาพรวมองค์กร",
"date": "วันพฤหัสบดี วันที่ 18 กรกฎาคม 2567",
"time": "08:30 น.",
"weather_widget": { "condition": "เมฆบางส่วน", "humidity_percent": 75, "temperature_celsius": 28 },
"user": { "name_th": "คุณสมชาย วงศ์เจริญ", "role_en": "General Manager" },
"notifications_count": 4
},
"sidebar_menu": [
{ "id": "daily_brief", "label_en": "Daily Brief", "label_th": "ภาพรวมวันนี้", "active": true },
{ "id": "situation", "label_en": "Situation", "label_th": "สถานการณ์" },
{ "id": "decision", "label_en": "Decision", "label_th": "การตัดสินใจ" },
{ "id": "operations", "label_en": "Operations", "label_th": "ปฏิบัติงาน" },
{ "id": "communication", "label_en": "Communication", "label_th": "การสื่อสาร" },
{ "id": "outcome", "label_en": "Outcome", "label_th": "ผลลัพธ์" },
{ "id": "ai_assistant", "label_en": "AI Assistant" }
],
"sidebar_footer": ["ตั้งค่า (Settings)", "ช่วยเหลือ (Help)", "ออกจากระบบ (Logout)"],
"entity_selector": {
"site": "ABC Hotel Bangkok",
"date_picker": "วันพุธที่ 18 กรกฎาคม 2567",
"time": "08:30 น."
},
"kpi_cards": [
{ "id": "organic_generated", "label_th": "Organic Generated (วันนี้)", "value": 524, "unit": "kg", "trend_percent": 14, "direction": "up", "compare_th": "จากค่าเฉลี่ย (460 kg)" },
{ "id": "prediction", "label_th": "Prediction (พรุ่งนี้)", "value": 560, "unit": "kg", "trend_percent": 9, "direction": "up", "compare_th": "จากค่าเฉลี่ย" },
{ "id": "waste_per_guest", "label_th": "Waste per Guest (วันนี้)", "value": 0.36, "unit": "kg", "trend": 0.05, "compare_th": "จากค่าเฉลี่ย" },
{ "id": "carbon_saving", "label_th": "Carbon Saving (วันนี้)", "value": 128, "unit": "kgCO2e", "trend_percent": 18, "direction": "up", "compare_th": "จากค่าเฉลี่ย" },
{ "id": "pickup", "label_th": "Pickup (วันนี้)", "value": "14:00 น.", "detail_th": "โดย Green Waste Co." }
],
"ai_executive_brief": {
"status": "BETA",
"summary_th": "วันนี้ปริมาณ Organic Waste สูงกว่าค่าเฉลี่ย 14% สาเหตุหลักจาก Breakfast Buffet และ Banquet Hall หากแนะนำจัดการลดลง อัตราการเติมเมนูเพิ่มประมาณ 38,000 บาท แนะนำให้ปรับเวลา 13:00 และรวจสอบ Buffet Line B",
"tabs": ["Insight", "Prediction", "Recommendation"],
"illustration": "hotel_with_waste_bins_truck"
},
"priority_map": {
"title_th": "แผนที่การกระจายตัวขยะ (Heatmap)",
"type": "floor_plan_heatmap",
"rooms": ["Kitchen B", "Kitchen A", "Breakfast Buffet", "Banquet Hall", "Lobby Lounge", "Staff Canteen"],
"legend": [
{ "level_th": "วิกฤต", "color": "red" },
{ "level_th": "เฝ้าระวัง", "color": "orange" },
{ "level_th": "ปานกลาง", "color": "yellow" },
{ "level_th": "ปกติ", "color": "green" }
],
"actions": ["ดูแบบเต็มจอ"]
},
"critical_events_today": {
"title_th": "เหตุการณ์สำคัญวันนี้",
"count": 4,
"items": [
{ "rank": 1, "title_th": "Breakfast Buffet", "detail_th": "ปริมาณขยะสูงกว่าค่าเฉลี่ย", "trend_percent": 31, "severity_tag": "วิกฤต" },
{ "rank": 2, "title_th": "Kitchen B (Main Kitchen)", "detail_th": "ความหนาแน่นในถังขยะ", "value_percent": 85, "severity_tag": "เฝ้าระวัง" },
{ "rank": 3, "title_th": "Pickup Delay", "detail_th": "รอบเก็บล่าช้า", "value": "19 min", "severity_tag": "ปานกลาง" },
{ "rank": 4, "title_th": "Food Donation", "detail_th": "ส่งต่ออาหารสำเร็จ", "value": "120 Meals", "severity_tag": "ปกติ" }
],
"actions": ["ดูทั้งหมด"]
},
"trend_7days": {
"title_th": "แนวโน้มปริมาณขยะอินทรีย์",
"period": "7 Days",
"table": [
{ "label_th": "วันนี้ (18 ก.ค.)", "value": 524, "unit": "kg", "trend_percent": 14, "direction": "up" },
{ "label_th": "เมื่อวาน (17 ก.ค.)", "value": 460, "unit": "kg" },
{ "label_th": "เฉลี่ย 7 วัน", "value": 462, "unit": "kg" },
{ "label_th": "เฉลี่ย 30 วัน", "value": 445, "unit": "kg" }
],
"chart": { "type": "line_chart", "x_axis_labels": ["12 ก.ค.", "13 ก.ค.", "14 ก.ค.", "15 ก.ค.", "16 ก.ค.", "17 ก.ค.", "18 ก.ค."] }
},
"operations_summary": {
"title_th": "การดำเนินงานวันนี้",
"cards": [
{ "id": "active_generators", "label_th": "Active Generators", "value": 24, "unit": "จุด", "detail_th": "จากทั้งหมด 32 จุด" },
{ "id": "pickup_scheduled", "label_th": "Pickup Scheduled", "value": 1, "unit": "รอบ", "detail_th": "เวลา 14:00 น." },
{ "id": "staff_on_duty", "label_th": "Staff On Duty", "value": 18, "unit": "คน" },
{ "id": "incidents", "label_th": "Incidents", "value": 0, "unit": "เหตุการณ์" },
{ "id": "equipment_status", "label_th": "Equipment Status", "value_percent": 100, "status_th": "ปกติ" }
]
},
"outcome_7days": {
"title_th": "สรุปผลลัพธ์ 7 วัน",
"cards": [
{ "id": "waste_reduction", "label_th": "ลดขยะ", "value_percent": 12, "direction": "up" },
{ "id": "cost_saving", "label_th": "ประหยัดต้นทุน", "value": 18450, "unit": "บาท" },
{ "id": "carbon_saving", "label_th": "Carbon Saving", "value": 128, "unit": "kgCO2e" },
{ "id": "food_donation", "label_th": "Food Donation", "value": 520, "unit": "Meals" }
]
},
"ai_executive_assistant": {
"status": "BETA",
"priority_recommendations": [
{ "rank": 1, "title_th": "Breakfast Buffet", "detail_th": "ปริมาณขยะสูงกว่าค่าเฉลี่ย 31%" },
{ "rank": 2, "title_th": "Kitchen B (Main Kitchen)", "detail_th": "ความหนาแน่นในถังขยะ 85%" },
{ "rank": 3, "title_th": "Pickup Delay", "detail_th": "รอบเก็บล่าช้า 19 นาที" }
],
"actions": ["ดูรายละเอียดและแนวทาง"]
},
"cta": { "label_th": "ไปหน้า Situation", "target": "situation" }
}

{
"screen": "manager_situation_organic",
"role": "manager",
"header": {
"page_title": "SITUATION",
"page_subtitle_th": "สถานการณ์",
"entity_selector": "ABC Hotel Bangkok",
"date": "วันศุกร์ 18 กรกฎาคม 2567",
"time": "08:30 น.",
"weather_widget": { "condition": "เมฆบางส่วน", "humidity_percent": 75, "temperature_celsius": 28 },
"user": { "name_th": "คุณสมชาย วงศ์เจริญ", "role_en": "General Manager" },
"notifications_count": 12,
"filter_bar": { "compare_toggle": "เปรียบเทียบ", "period": "วันนี้ (18 ก.ค.)" }
},
"kpi_cards": [
{ "id": "organic_generated", "label_th": "Organic Generated (วันนี้)", "value": 524, "unit": "kg", "trend_percent": 14, "direction": "up", "compare_th": "จากเมื่อวาน (460 kg)" },
{ "id": "avg_7day", "label_th": "เฉลี่ย 7 วัน", "value": 489, "unit": "kg", "trend_percent": 9, "direction": "up", "compare_th": "จากค่าเฉลี่ย 7 วัน" },
{ "id": "waste_per_guest", "label_th": "Waste per Guest (7 วัน)", "value": 0.36, "unit": "kg", "trend": 0.05, "direction": "down", "compare_th": "จากค่าเฉลี่ย 7 วัน" },
{ "id": "top_source", "label_th": "สัดส่วนตามแหล่งกำเนิด (วันนี้)", "detail_th": "ดูรายละเอียดแหล่งที่มา" },
{ "id": "issues_to_resolve", "label_th": "ประเด็นที่ต้องแก้ไข", "value": 3, "unit": "เรื่อง", "severity": "alert", "detail_th": "ดูรายละเอียด" }
],
"tabs": [
{ "id": "overview", "label_th": "ภาพรวมสถานการณ์", "active": true },
{ "id": "source_location", "label_th": "แหล่งที่มาแยกที่" },
{ "id": "trend_forecast", "label_th": "แนวโน้มและการคาดการณ์" },
{ "id": "high_risk_areas", "label_th": "พื้นที่เสี่ยง" },
{ "id": "root_cause", "label_th": "สาเหตุหลัก" },
{ "id": "compare_time", "label_th": "เปรียบเทียบช่วงเวลา" }
],
"source_map": {
"title_th": "แผนที่แสดงแหล่งกำเนิดขยะ (โซนภายในโรงแรม)",
"view_mode": "โซนภายใน",
"type": "floor_plan_heatmap",
"legend": [
{ "level_th": "อันตราย", "color": "red" },
{ "level_th": "สูง", "color": "orange" },
{ "level_th": "ปานกลาง", "color": "yellow" },
{ "level_th": "ต่ำ", "color": "green" },
{ "level_th": "ไม่มีข้อมูล", "color": "gray" }
],
"zones": [
{ "name_th": "Breakfast Buffet", "value": 124, "unit": "kg", "trend_percent": 31, "direction": "up" },
{ "name_th": "Kitchen B", "value": 86, "unit": "kg", "trend_percent": 18, "direction": "up" },
{ "name_th": "Banquet Hall", "value": 96, "unit": "kg", "trend_percent": 12, "direction": "up" },
{ "name_th": "Lobby Lounge", "value": 24, "unit": "kg", "trend_percent": 5, "direction": "up" },
{ "name_th": "Staff Canteen", "value": 18, "unit": "kg", "trend_percent": 8, "direction": "up" }
],
"actions": ["ดูมุมมองรายพื้นที่"]
},
"source_breakdown_donut": {
"title_th": "สัดส่วนตามแหล่งกำเนิด (วันนี้)",
"total": { "value": 524, "unit": "kg" },
"segments": [
{ "label_th": "อาหารจากโรงแรม", "value": 214, "unit": "kg", "percent": 41 },
{ "label_th": "ครัว (จัดเลี้ยง)", "value": 142, "unit": "kg", "percent": 27 },
{ "label_th": "ห้องเลี้ยง", "value": 84, "unit": "kg", "percent": 16 },
{ "label_th": "ห้องพัก (Room Service)", "value": 48, "unit": "kg", "percent": 9 },
{ "label_th": "พื้นที่ทั่วไป", "value": 36, "unit": "kg", "percent": 7 }
],
"actions": ["ดูรายละเอียดที่มา"]
},
"root_cause_table": {
"title_th": "สาเหตุหลักที่ทำให้ปริมาณเพิ่มขึ้น",
"columns": ["สาเหตุ", "ผลกระทบ (kg)", "แนวโน้ม"],
"rows": [
{ "rank": 1, "cause_th": "ปริมาณเมนู Breakfast Buffet เพิ่มขึ้น", "impact_kg": 68, "trend": "up" },
{ "rank": 2, "cause_th": "รายการอาหารเลี้ยง (Buffet Line B)", "impact_kg": 42, "trend": "up" },
{ "rank": 3, "cause_th": "การเตรียมวัตถุดิบเกินความจำเป็น", "impact_kg": 24, "trend": "up" }
],
"actions": ["ดูสาเหตุเพิ่มเติม"]
},
"issues_panel": {
"title_th": "จุดเสี่ยง / ค่าเฉื่อยผิดปกติ",
"filter": "ทั้งหมด",
"items": [
{ "rank": 1, "title_th": "Breakfast Buffet", "detail_th": "ปริมาณสูงกว่าค่าเฉลี่ย 31%", "value": 124, "unit": "kg", "severity_tag": "อันตราย", "time": "วันนี้ 07:00" },
{ "rank": 2, "title_th": "Kitchen B (Main Kitchen)", "detail_th": "Storage ใกล้เต็ม 85%", "value": 86, "unit": "kg", "severity_tag": "เฝ้าระวัง", "time": "วันนี้ 07:15" },
{ "rank": 3, "title_th": "Banquet Hall", "detail_th": "ปริมาณเพิ่มขึ้นเมื่อมีงาน 3 งาน", "value": 96, "unit": "kg", "severity_tag": "ปานกลาง", "time": "วันนี้ 07:30" },
{ "rank": 4, "title_th": "Food Donation", "detail_th": "พร้อมส่งมอบ 120 Meals", "value": "120 Meals", "severity_tag": "ปกติ", "time": "วันนี้ 08:00", "detail_extra_th": "มูลค่าประมาณ 6,000 บาท" }
],
"actions": ["ดูรายการทั้งหมด"]
},
"trend_chart": {
"title_th": "แนวโน้มปริมาณขยะ",
"type": "line_chart",
"series": [
{ "label_th": "ปริมาณจริง (kg)", "style": "solid" },
{ "label_th": "เฉลี่ย 7 วัน (เส้นประ)", "style": "dashed" },
{ "label_th": "คาดการณ์ (kg)", "style": "dotted" }
],
"x_axis_labels": ["11 ก.ค.", "12 ก.ค.", "13 ก.ค.", "14 ก.ค.", "15 ก.ค.", "16 ก.ค.", "17 ก.ค.", "18 ก.ค.", "19 ก.ค.", "20 ก.ค.", "21 ก.ค.", "22 ก.ค.", "23 ก.ค.", "24 ก.ค."],
"highlighted_point": { "label_th": "วันนี้", "value": 524 }
},
"forecast_panel": {
"title_th": "คาดการณ์ล่วงหน้า",
"items": [
{ "label_th": "พรุ่งนี้ (19 ก.ค.)", "value": 560, "unit": "kg", "trend_percent": 7, "direction": "up" },
{ "label_th": "7 วันข้างหน้า (เฉลี่ย)", "value": 548, "unit": "kg", "trend_percent": 5, "direction": "up" },
{ "label_th": "30 วันข้างหน้า (เฉลี่ย)", "value": 492, "unit": "kg", "trend_percent": 2, "direction": "down" }
],
"actions": ["ดูการคาดการณ์ทั้งหมด"]
}
}

{
"screen": "manager_decision_organic",
"role": "manager",
"header": {
"page_title": "DECISION",
"page_subtitle_th": "การตัดสินใจ",
"entity_selector": "ABC Hotel Bangkok",
"date": "วันศุกร์ 18 กรกฎาคม 2567",
"time": "08:30 น.",
"weather_widget": { "condition": "เมฆบางส่วน", "humidity_percent": 75, "temperature_celsius": 28 },
"user": { "name_th": "คุณสมชาย วงศ์เจริญ", "role_en": "General Manager" },
"notifications_count": 12
},
"section_header": {
"title_th": "เรื่องที่ต้องตัดสินใจวันนี้",
"count_badge": 4,
"subtitle_th": "กรุณาพิจารณาและอนุมัติ",
"sort_dropdown": "เรียงตามความสำคัญ"
},
"kpi_cards": [
{ "id": "total_items", "label_th": "รอดำเนิน", "value": 4, "unit": "เรื่อง" },
{ "id": "urgent", "label_th": "ใกล้ครบกำหนด", "value": 1, "unit": "เรื่อง", "severity": "warning" },
{ "id": "overdue", "label_th": "เกินกำหนด", "value": 0, "unit": "เรื่อง", "severity": "alert" },
{ "id": "approved_today", "label_th": "อนุมัติแล้ววันนี้", "value": 2, "unit": "เรื่อง" },
{ "id": "budget_involved", "label_th": "มูลค่ารวมที่ต้องอนุมัติ", "value": 38000, "unit": "บาท" }
],
"decision_list": {
"items": [
{
"rank": 1,
"priority_tag": "เร่งด่วน",
"severity_icon": "red",
"title_th": "อนุมัติรอบเก็บขยะเพิ่ม (เวลา 13:00 น.)",
"detail_th": "ปริมาณขยะอินทรีย์เพิ่มขึ้น 14% แนะนำให้เพิ่มรอบเก็บเพื่อไม่ให้เกิดการสะสม",
"impact_tag": "ผลกระทบสูง",
"budget": { "value": 12000, "unit": "บาท" },
"owner": "หัวหน้าแผนกแม่บ้าน",
"deadline_th": "วันนี้ 10:00 น.",
"actions": ["อนุมัติ", "ตรวจสอบเพิ่มเติม", "ไม่อนุมัติ"]
},
{
"rank": 2,
"priority_tag": "สำคัญ",
"severity_icon": "orange",
"title_th": "อนุมัติจัดซื้อถังขยะแยกรีไซเคิลเพิ่ม 10 ใบ",
"detail_th": "สำหรับ Restaurant และ Banquet Hall",
"impact_tag": "ผลกระทบกลาง",
"budget": { "value": 18000, "unit": "บาท" },
"owner": "วิศวกร",
"deadline_th": "พรุ่งนี้ 12:00 น.",
"actions": ["อนุมัติ", "ตรวจสอบเพิ่มเติม", "ไม่อนุมัติ"]
},
{
"rank": 3,
"priority_tag": "สำคัญ",
"severity_icon": "orange",
"title_th": "อนุมัติงบประมาณ Food Donation สัปดาห์นี้",
"detail_th": "ส่งต่ออาหารส่วนเกินให้มูลนิธิ 120 Meals",
"impact_tag": "ผลกระทบกลาง",
"budget": { "value": 6000, "unit": "บาท" },
"owner": "ฝ่ายจัดซื้อ",
"deadline_th": "วันนี้ 14:00 น.",
"actions": ["อนุมัติ", "ตรวจสอบเพิ่มเติม", "ไม่อนุมัติ"]
},
{
"rank": 4,
"priority_tag": "ปกติ",
"severity_icon": "blue",
"title_th": "อนุมัติแผนอบรมความสะอาดถังขยะ",
"detail_th": "แผนอบรมพนักงานทุกวันจันทร์",
"impact_tag": "ผลกระทบต่ำ",
"budget": { "value": 2000, "unit": "บาท" },
"owner": "หัวหน้าแผนบุคคล",
"deadline_th": "พรุ่งนี้ 09:00 น.",
"actions": ["อนุมัติ", "ตรวจสอบเพิ่มเติม", "ไม่อนุมัติ"]
}
],
"actions": ["ดูเรื่องที่ต้องตัดสินใจทั้งหมด"]
},
"ai_executive_assistant": {
"status": "BETA",
"subtitle_th": "สรุปสำหรับการตัดสินใจ",
"recommendation_th": "คำแนะนำของ AI: หากอนุมัติรอบเก็บเพิ่ม 13:00 น. คาดว่าปริมาณขยะจะลดลง 28% และลดต้นทุนการจัดการได้ในระยะยาว ใช้งบประมาณ 38,000 บาท คาดคืนทุนใน 1 เดือน",
"supporting_data_th": [
{ "icon": "chart", "text_th": "ปริมาณขยะเพิ่มขึ้นต่อเนื่อง 3 วัน", "action": "ดูข้อมูล" },
{ "icon": "check", "text_th": "ต้นทุนกำจัดขยะสูงขึ้น 12%", "action": "ดูรายละเอียด" },
{ "icon": "warning", "text_th": "ข้อร้องเรียนกลิ่นเพิ่มขึ้น 2 ครั้ง", "action": "ดูรายละเอียด" }
]
},
"urgent_action_panel": {
"title_th": "การดำเนินการด่วน",
"actions": [
{ "id": "create_urgent_approval", "label_th": "สร้างการอนุมัติด่วน" },
{ "id": "delegate", "label_th": "มอบหมายงาน" },
{ "id": "approval_settings", "label_th": "ตั้งค่าการอนุมัติ" },
{ "id": "approval_history", "label_th": "ประวัติการอนุมัติ" }
]
},
"recent_decisions": {
"title_th": "การตัดสินใจล่าสุด",
"columns": ["เรื่อง", "สถานะ", "ผู้อนุมัติ", "เวลา"],
"rows": [
{ "title_th": "อนุมัติ Food Donation สัปดาห์ที่แล้ว", "status_th": "อนุมัติแล้ว", "approver_th": "คุณสมชาย วงศ์เจริญ", "timestamp_th": "17 ก.ค. 67, 09:15" },
{ "title_th": "อนุมัติจัดซื้อถังขยะรีไซเคิลเพิ่ม 5 ใบ", "status_th": "อนุมัติแล้ว", "approver_th": "คุณสมชาย วงศ์เจริญ", "timestamp_th": "16 ก.ค. 67, 14:20" }
],
"actions": ["ดูทั้งหมด"]
},
"budget_authority_panel": {
"title_th": "วงเงินที่สามารถอนุมัติได้",
"remaining": { "value": 152000, "unit": "บาท" },
"total": { "value": 200000, "unit": "บาท" },
"used_percent": 76,
"gauge": true,
"actions": ["ดูรายละเอียด"]
}
}

{
"screen": "manager_operations_organic",
"role": "manager",
"header": {
"page_title": "OPERATIONS",
"page_subtitle_th": "ปฏิบัติการ",
"entity_selector": "ABC Hotel Bangkok",
"date": "วันศุกร์ 18 กรกฎาคม 2567",
"time": "08:30 น.",
"weather_widget": { "condition": "เมฆบางส่วน", "humidity_percent": 75, "temperature_celsius": 28 },
"user": { "name_th": "คุณสมชาย วงศ์เจริญ", "role_en": "General Manager" },
"notifications_count": 12
},
"kpi_cards": [
{ "id": "organic_generated", "label_th": "Organic Generated (วันนี้)", "value": 524, "unit": "kg", "trend_percent": 14, "direction": "up", "compare_th": "จากเมื่อวาน (460 kg)" },
{ "id": "pickup_scheduled", "label_th": "Pickup Scheduled (วันนี้)", "value": "14:00 น.", "detail_th": "1 รอบ โดย Green Waste Co., Ltd." },
{ "id": "generator_active", "label_th": "Generator Active", "value": 24, "unit": "จุด", "detail_th": "จากทั้งหมด 28 จุด" },
{ "id": "staff_on_duty", "label_th": "Staff on Duty", "value": 18, "unit": "คน", "detail_th": "จากทั้งหมด 22 คน" },
{ "id": "storage_utilization", "label_th": "Storage Utilization", "value_percent": 72, "status_th": "ปกติ" },
{ "id": "incidents", "label_th": "Incidents", "value": 0, "unit": "เหตุการณ์" }
],
"tabs": [
{ "id": "overview", "label_th": "ภาพรวมปฏิบัติการ", "active": true },
{ "id": "generator", "label_th": "Generator" },
{ "id": "pickup_collection", "label_th": "Pickup & Collection" },
{ "id": "processing_storage", "label_th": "Processing & Storage" },
{ "id": "fleet_equipment", "label_th": "Fleet & Equipment" },
{ "id": "staff", "label_th": "Staff" },
{ "id": "vendor", "label_th": "Vendor" }
],
"realtime_map": {
"title_th": "แผนที่การปฏิบัติการ (Real-time)",
"type": "site_map_realtime",
"legend": [
{ "status_th": "ปกติ", "color": "green" },
{ "status_th": "รอดำเนิน", "color": "orange" },
{ "status_th": "กำลังดำเนิน", "color": "blue" },
{ "status_th": "เสร็จสิ้น", "color": "gray" }
],
"markers_with_counts": [2, 3, 5, 1, 4],
"actions": ["ดูแบบเต็มจอ", "ทั้งหมด (filter dropdown)"]
},
"pickup_flow": {
"title_th": "การเก็บขยะวันนี้",
"steps": [
{ "label_th": "วางถัง", "status": "done" },
{ "label_th": "กำหนดตำแหน่งเก็บ", "status": "done" },
{ "label_th": "เตรียมนำ", "status": "in_progress" },
{ "label_th": "จบสิ้น", "status": "pending" }
],
"capacity_bar": { "label_th": "ความจุพร้อมนำเก็บ", "value_percent": 68 },
"stats": [
{ "label_th": "ปริมาณที่จะเก็บ", "value": 356, "unit": "kg" },
{ "label_th": "คงเหลือ", "value": 168, "unit": "kg" },
{ "label_th": "รอบถัดไป", "value": "14:00 น." },
{ "label_th": "ผู้ให้บริการ", "value_th": "Green Waste Co., Ltd." }
]
},
"generator_status_panel": {
"title_th": "สถานะจุดกำเนิดขยะ (Generator)",
"items": [
{ "name_th": "Breakfast Buffet", "value": 124, "unit": "kg", "trend_percent": 31, "direction": "up", "color": "green" },
{ "name_th": "Kitchen B (Main Kitchen)", "value": 86, "unit": "kg", "trend_percent": 18, "direction": "up", "color": "orange" },
{ "name_th": "Banquet Hall", "value": 96, "unit": "kg", "trend_percent": 12, "direction": "up", "color": "blue" },
{ "name_th": "Lobby Lounge", "value": 24, "unit": "kg", "trend_percent": 5, "direction": "down", "color": "green" },
{ "name_th": "Staff Canteen", "value": 18, "unit": "kg", "trend_percent": 8, "direction": "down", "color": "green" }
],
"actions": ["ดูรายละเอียดเพิ่มเติม"]
},
"collection_rounds_table": {
"title_th": "รถเก็บขยะ & รอบการเก็บ",
"columns": ["รถเก็บขยะ", "ทะเบียน", "สถานะ", "รอบ", "ความจุ", "ตำแหน่งล่าสุด"],
"rows": [
{ "vehicle_th": "คันที่ 1", "plate": "1234", "status_th": "กำลังเก็บ", "round": "รอบที่ 1", "capacity_percent": 75, "location_time": "10:45 น." },
{ "vehicle_th": "คันที่ 2", "plate": "5678", "status_th": "กำลังเก็บ", "round": "รอบที่ 1", "capacity_percent": 60, "location_time": "11:20 น." },
{ "vehicle_th": "คันที่ 3", "plate": "9012", "status_th": "รอเริ่มงาน", "round": "รอบที่ 1", "capacity_percent": 0, "location_time": "14:00 น." },
{ "vehicle_th": "คันที่ 4", "plate": "3456", "status_th": "เสร็จสิ้น", "round": "รอบที่ 1", "capacity_percent": 100, "location_time": "เสร็จแล้ว" }
],
"actions": ["ดูรายละเอียดการเก็บทั้งหมด"]
},
"processing_section": {
"title_th": "การประมวลผล & การจัดเก็บ",
"panels": [
{ "id": "food_waste_machine", "title_th": "เครื่องย่อยเศษอาหาร", "value": 312, "unit": "kg", "detail_th": "กำลังดำเนินการ", "capacity_percent": 65 },
{ "id": "composter", "title_th": "เครื่อง Composter", "value": 420, "unit": "kg", "detail_th": "ปริมาณเต็ม", "capacity_percent": 70 },
{ "id": "waste_treatment", "title_th": "การจัดการขยะ", "value": 1240, "unit": "kg", "detail_th": "สัปดาห์นี้" },
{ "id": "storage_room", "title_th": "พื้นที่จัดเก็บ", "value_percent": 72, "detail_th": "ความจุรวม 2,000 kg" }
],
"actions": ["ดูรายละเอียดทั้งหมด"]
},
"staff_on_duty_panel": {
"title_th": "สถานะเจ้าหน้าที่",
"counts": [
{ "label_th": "ปฏิบัติงาน", "value": 18 },
{ "label_th": "ระหว่างรอ", "value": 2 },
{ "label_th": "พัก", "value": 1 },
{ "label_th": "ไม่มา", "value": 1 }
],
"shifts": [
{ "shift_th": "เช้า (06:00 - 14:00)", "count": 12 },
{ "shift_th": "บ่าย (14:00 - 22:00)", "count": 10 }
],
"actions": ["ดูทั้งหมด"]
},
"equipment_status_panel": {
"title_th": "สถานะอุปกรณ์",
"items": [
{ "name_th": "เครื่องย่อยเศษอาหาร", "status_th": "ปกติ" },
{ "name_th": "เครื่องชั่ง", "status_th": "ปกติ" },
{ "name_th": "เครื่องพิมพ์ QR", "status_th": "ปกติ" },
{ "name_th": "รถเข็นขยะ", "detail_th": "15 / 16", "status_th": "ปกติ" },
{ "name_th": "ถัง", "detail_th": "120 / 120", "status_th": "ปกติ" }
],
"actions": ["ดูทั้งหมด"]
},
"storage_room_status_panel": {
"title_th": "สถานะพื้นที่จัดเก็บ",
"rooms": [
{ "name_th": "Cold Storage", "detail_th": "อุณหภูมิ 4°C", "value_percent": 60 },
{ "name_th": "Dry Storage", "value_percent": 45 },
{ "name_th": "Organic Bin", "value_percent": 85 },
{ "name_th": "Recycling Area", "value_percent": 30 }
],
"actions": ["ดูรายละเอียดเพิ่มเติม"]
},
"cta": { "label_th": "ไปหน้า Operations รายละเอียด", "target": "operations_detail" }
}

{
"screen": "manager_communication_organic",
"role": "manager",
"header": {
"page_title": "COMMUNICATION",
"page_subtitle_th": "การสื่อสาร",
"entity_selector": "ABC Hotel Bangkok",
"date": "วันศุกร์ 18 กรกฎาคม 2567",
"time": "08:30 น.",
"weather_widget": { "condition": "เมฆบางส่วน", "humidity_percent": 75, "temperature_celsius": 28 },
"user": { "name_th": "คุณสมชาย วงศ์เจริญ", "role_en": "General Manager" },
"notifications_count": 12,
"actions": ["สร้างการสื่อสารใหม่"]
},
"kpi_cards": [
{ "id": "messages_today", "label_th": "ข้อความที่ส่งวันนี้", "value": 5, "unit": "ข้อความ", "detail_th": "จาก 3 กลุ่มเป้าหมาย" },
{ "id": "recipients", "label_th": "ผู้รับสารรวม", "value": 256, "unit": "คน", "trend_percent": 8, "direction": "up", "compare_th": "จากเมื่อวาน" },
{ "id": "read_count", "label_th": "เปิดอ่านแล้ว", "value": 178, "unit": "คน", "detail_percent": 69 },
{ "id": "engagement", "label_th": "การมีส่วนร่วม", "value": 82, "unit": "คน", "detail_percent": 32, "compare_th": "จากยอดเปิด" },
{ "id": "satisfaction", "label_th": "ความพึงพอใจ", "value": "4.6 / 5" },
{ "id": "urgent_pending", "label_th": "การแจ้งเตือนสำคัญ", "value": 2, "unit": "ข้อความ", "severity": "alert", "detail_th": "ยังไม่อ่าน" }
],
"tabs": [
{ "id": "recent_messages", "label_th": "ข้อความล่าสุด", "active": true },
{ "id": "message_schedule", "label_th": "กำหนดการข้อความ" },
{ "id": "target_groups", "label_th": "กลุ่มเป้าหมาย" },
{ "id": "comment_summary", "label_th": "เกมเพลตข้อความ" }
],
"recent_messages_list": {
"items": [
{ "title_th": "แจ้งเพิ่มรอบเก็บ Organic Waste", "priority_tag": "สำคัญ", "detail_th": "เรียน ผู้จัดการแผนกครัว และแม่บ้าน", "timestamp_th": "วันนี้ 08:00 น.", "read_percent": 83, "read_count": "24 คน" },
{ "title_th": "ขอความร่วมมือลดขยะอาหาร (Food Waste)", "timestamp_th": "เมื่อวาน 16:30 น.", "read_percent": 78, "read_count": "18 คน" },
{ "title_th": "สรุปผลการจัดการประจำสัปดาห์", "timestamp_th": "17 ก.ค. 2567, 10:15 น.", "read_percent": 83, "read_count": "12 คน" },
{ "title_th": "แจ้งเปลี่ยนเวลาการเก็บขยะวันนี้", "timestamp_th": "17 ก.ค. 2567, 07:45 น.", "read_percent": 92, "read_count": "24 คน" },
{ "title_th": "ขอบคุณทีมงานที่ช่วยลดขยะได้ดีขึ้น", "timestamp_th": "17 ก.ค. 2567, 18:00 น.", "read_percent": 89, "read_count": "28 คน" }
],
"actions": ["ดูเพิ่มเติม"]
},
"message_detail_panel": {
"title_th": "แจ้งเพิ่มรอบเก็บ Organic Waste",
"priority_tag": "สำคัญ",
"recipients_th": "เรียน ผู้จัดการแผนกครัว และแม่บ้าน",
"body_th": "เนื่องจากปริมาณ Organic Waste วันนี้เพิ่มขึ้น 14% เพื่อป้องกันการสะสมจึงเพิ่มรอบเก็บเวลา 13:00 น. เพื่อให้การจัดการมีประสิทธิภาพและลดความเสี่ยงด้านกลิ่นและสุขอนามัย",
"info_cards": [
{ "label_th": "รอบเก็บถัดไป", "value": "13:00 น." },
{ "label_th": "บริษัทเก็บ", "value_th": "Green Waste Co., Ltd." },
{ "label_th": "ประเภทขยะ", "value_th": "Organic Waste เท่านั้น" }
],
"sender_th": "ส่งโดย คุณสมชาย วงศ์เจริญ (General Manager)",
"sent_at_th": "18 กรกฎาคม 2567, 08:00 น.",
"stats": [
{ "label_th": "ผู้รับสาร", "value": 24, "unit": "คน" },
{ "label_th": "เปิดอ่านแล้ว", "value": 20, "unit": "คน", "percent": 83 },
{ "label_th": "การตอบรับ", "value": 12, "unit": "คน", "percent": 50 },
{ "label_th": "ความพึงพอใจ", "value": "4.6 / 5", "stars": 4.6 }
]
},
"target_groups_panel": {
"title_th": "กลุ่มเป้าหมาย",
"count": 3,
"groups": [
{ "name_th": "แผนกครัว (Kitchen)", "value": 8, "unit": "คน", "reach_percent": 100 },
{ "name_th": "แม่บ้าน (Housekeeping)", "value": 10, "unit": "คน", "reach_percent": 80 },
{ "name_th": "ผู้จัดการแผนก (Department Manager)", "value": 6, "unit": "คน", "reach_percent": 67 }
],
"actions": ["ดูรายละเอียดกลุ่มเป้าหมาย"]
},
"channels_panel": {
"title_th": "ช่องทางการสื่อสาร",
"channels": [
{ "name": "LINE OA (Broadcast)", "value": 18, "unit": "คน", "percent": 75 },
{ "name": "แอปพนักงาน (CityZen App)", "value": 16, "unit": "คน", "percent": 67 },
{ "name": "อีเมล (Email)", "value": 12, "unit": "คน", "percent": 50 },
{ "name": "ประกาศหน้าบอร์ด", "value": 10, "unit": "คน", "percent": 42 }
],
"actions": ["ดูประสิทธิภาพช่องทาง"]
},
"engagement_thread": {
"title_th": "การมีส่วนร่วม (ความคิดเห็น / คำตอบ)",
"count_th": "12 ความคิดเห็น",
"comments": [
{ "name_th": "Somchai K. (หัวหน้าแผนกครัว)", "text_th": "รับทราบครับ จะเตรียมพร้อมให้แล้วเสร็จเวลา 13:00 น.", "timestamp_th": "18 ก.ค. 2567, 08:12 น.", "likes": 3 },
{ "name_th": "Nattaya P. (แม่บ้าน)", "text_th": "เข้าใจแล้วค่ะ ขอบคุณค่ะ", "timestamp_th": "18 ก.ค. 2567, 08:15 น.", "likes": 2 }
]
},
"ai_summary_panel": {
"title_th": "สรุป AI",
"summary_th": "พนักงานส่วนใหญ่ให้ความร่วมมือดี แนะนำวงขยายทีมงานขยายที่ Buffet Line B และติดตามผลอีกครั้งเวลา 13:00 น. ใน 3 วันข้างหน้า",
"illustration": "hotel_with_waste_bins_truck"
}
}

{
"screen": "manager_outcome_organic",
"role": "manager",
"header": {
"page_title": "OUTCOME",
"page_subtitle_th": "ผลลัพธ์",
"entity_selector": "ABC Hotel Bangkok",
"date_range": "1 - 18 กรกฎาคม 2567",
"time": "08:30 น.",
"weather_widget": { "condition": "เมฆบางส่วน", "humidity_percent": 75, "temperature_celsius": 28 },
"user": { "name_th": "คุณสมชาย วงศ์เจริญ", "role_en": "General Manager" },
"notifications_count": 12,
"actions": ["ส่งออกรายงาน"]
},
"section_title_th": "สรุปผลลัพธ์ (1 - 18 ก.ค. 67)",
"kpi_cards": [
{ "id": "total_organic_waste", "label_th": "ปริมาณ Organic Waste", "value": 9256, "unit": "kg", "trend_percent": 12, "direction": "down", "compare_th": "จากช่วง 1 - 18 มิ.ย. 67" },
{ "id": "carbon_saving", "label_th": "Carbon Saving", "value": 2314, "unit": "kgCO2e", "trend_percent": 18, "direction": "up", "compare_th": "จากช่วง 1 - 18 มิ.ย. 67" },
{ "id": "cost_avoided", "label_th": "ต้นทุนการจัดการ", "value": 186540, "unit": "บาท", "trend_percent": 15, "direction": "down", "compare_th": "จากช่วง 1 - 18 มิ.ย. 67" },
{ "id": "food_donation", "label_th": "Food Donation", "value": 1243, "unit": "Meals", "trend_percent": 22, "direction": "up", "compare_th": "จากช่วง 1 - 18 มิ.ย. 67" },
{ "id": "organization_score", "label_th": "Organization Score", "value": 92, "unit": "/100", "grade_th": "ระดับ A", "trend_th": "เพิ่มขึ้น 6 คะแนน" }
],
"tabs": [
{ "id": "overview", "label_th": "ภาพรวม", "active": true },
{ "id": "trend", "label_th": "แนวโน้ม" },
{ "id": "compare", "label_th": "เปรียบเทียบ" },
{ "id": "performance", "label_th": "ประสิทธิภาพ" },
{ "id": "environment", "label_th": "สิ่งแวดล้อม" },
{ "id": "society", "label_th": "สังคม" },
{ "id": "economy", "label_th": "เศรษฐกิจ" }
],
"trend_chart": {
"title_th": "แนวโน้มปริมาณ Organic Waste",
"type": "line_chart",
"series": [
{ "label_th": "ช่วงนี้ (1 - 18 ก.ค. 67)", "style": "solid" },
{ "label_th": "ช่วงก่อน (1 - 18 มิ.ย. 67)", "style": "dashed" }
],
"annotations": [
{ "label_th": "เฉลี่ย 514 kg", "direction": "up_12_percent" },
{ "label_th": "เฉลี่ย 584 kg" }
],
"x_axis_labels": ["1 ก.ค.", "3 ก.ค.", "5 ก.ค.", "7 ก.ค.", "9 ก.ค.", "11 ก.ค.", "13 ก.ค.", "15 ก.ค.", "17 ก.ค.", "18 ก.ค."],
"insight_th": "แนวโน้มลดลงต่อเนื่อง โดยเฉพาะหลังปรับเวลาเก็บขยะเป็น 13:00 น.",
"actions": ["ดูเพิ่มเติม"]
},
"source_breakdown_donut": {
"title_th": "สัดส่วนการจัดการ Organic Waste",
"total": { "value": 9256, "unit": "kg" },
"segments": [
{ "label_th": "รีไซเคิล / ทำปุ๋ย", "value": 5560, "unit": "kg", "percent": 60 },
{ "label_th": "บริจาคอาหาร", "value": 1243, "unit": "kg", "percent": 13 },
{ "label_th": "อาหารสัตว์", "value": 1389, "unit": "kg", "percent": 15 },
{ "label_th": "ฝังกลบ", "value": 1064, "unit": "kg", "percent": 12 }
],
"actions": ["ดูรายละเอียด"]
},
"operational_performance_panel": {
"title_th": "ประสิทธิภาพการดำเนินงาน",
"columns": ["ตัวชี้วัด", "ผลลัพธ์", "เปรียบเทียบช่วงก่อน"],
"rows": [
{ "metric_th": "Waste per Guest", "value": "0.36 kg", "trend_percent": 0.05, "direction": "down" },
{ "metric_th": "การแยกขยะถูกต้อง", "value_percent": 94, "trend_percent": 8, "direction": "up" },
{ "metric_th": "Storage Utilization", "value_percent": 72, "trend_percent": 6, "direction": "up" },
{ "metric_th": "Pickup On-time", "value_percent": 98, "trend_percent": 5, "direction": "up" },
{ "metric_th": "Food Donation Rate", "value_percent": 13.4, "trend_percent": 2.4, "direction": "up" }
],
"actions": ["ดูรายละเอียด"]
},
"environment_impact_panel": {
"title_th": "ผลลัพธ์ด้านสิ่งแวดล้อม",
"metrics": [
{ "id": "carbon_saving", "label_th": "Carbon Saving", "value": 2314, "unit": "kgCO2e", "trend_percent": 18, "direction": "up" },
{ "id": "trees_equivalent", "label_th": "เทียบเท่าปลูกต้นไม้", "value": 165, "unit": "ต้น" },
{ "id": "water_saved", "label_th": "น้ำประหยัดได้", "value": 185120, "unit": "ลิตร", "detail_th": "ใน 18 วัน" },
{ "id": "energy_saved", "label_th": "พลังงานที่ประหยัดได้", "value": 2845, "unit": "kWh", "trend_percent": 11, "direction": "up" }
],
"actions": ["ดูรายละเอียดด้านสิ่งแวดล้อม"]
},
"social_impact_panel": {
"title_th": "ผลลัพธ์ด้านสังคม (Social Impact)",
"metrics": [
{ "id": "meals_donated", "label_th": "อาหารที่บริจาค", "value": 1243, "unit": "Meals", "trend_percent": 22, "direction": "up" },
{ "id": "beneficiaries", "label_th": "ผู้ได้รับประโยชน์", "value": 3729, "unit": "คน", "detail_th": "มูลค่าประมาณ 62,150 บาท" }
],
"actions": ["ดูรายละเอียดสังคม"]
},
"economic_impact_panel": {
"title_th": "ผลลัพธ์ด้านเศรษฐกิจ",
"metrics": [
{ "id": "cost_avoided", "label_th": "ต้นทุนการจัดการ", "value": 186540, "unit": "บาท", "trend_percent": 15, "direction": "down", "detail_th": "การจัดการที่มีประสิทธิภาพ" },
{ "id": "additional_revenue", "label_th": "ประหยัดเพิ่ม", "value": 32860, "unit": "บาท", "detail_th": "การควบคุมค่าใช้จ่ายที่เกี่ยวข้อง" },
{ "id": "roi", "label_th": "ROI จากโครงการ", "value_percent": 186, "detail_th": "ผลตอบแทนจากการลงทุน" }
],
"actions": ["ดูรายละเอียดเศรษฐกิจ"]
},
"achievements_panel": {
"title_th": "ไฮไลต์ความสำเร็จ",
"items": [
{ "icon": "trophy", "title_th": "ลดปริมาณขยะได้ 12%", "detail_th": "งานประจำเดือนที่ดีขึ้นที่สุดและการลดของเสียของทุก" },
{ "icon": "medal", "title_th": "บริจาคอาหารเพิ่มขึ้น 22%", "detail_th": "สนับสนุนชุมชนที่เพิ่มขึ้นทั้งด้านประสิทธิภาพ" },
{ "icon": "leaf", "title_th": "ลดคาร์บอน 2,314 kgCO2e", "detail_th": "เทียบเท่าปลูกต้นไม้ 165 ต้น ช่วยลดโลกร้อน" },
{ "icon": "star", "title_th": "คะแนนองค์กรเพิ่มขึ้น 6 คะแนน", "detail_th": "สะท้อนการดำเนินงานที่มีคุณภาพในทุกมิติ" }
],
"goal_card": {
"title_th": "เป้าหมายปีนี้",
"detail_th": "ลดปริมาณ Organic Waste เพิ่มขึ้น 15% ภายในสิ้นปี 2567",
"actions": ["ดูแผน"]
}
}
}
