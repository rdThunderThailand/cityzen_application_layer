import { STATUS_LABELS, InspectionOrder } from "./types";

export function buildInspectionOrderSeed(id?: string): InspectionOrder {
  const woNumber = id || "WO-6705-00123";

  return {
    id: woNumber,
    woNumber,
    status: "accepted",

    assetName: "เครื่องปรับอากาศ แบบแขวน",
    assetLocation: "อาคารสำนักงาน ชั้น 2",
    location: "อาคารสำนักงาน ชั้น 2 ห้อง 201",
    addressLine: "ถ.แสนสุข ต.แสนสุข อ.เมืองชลบุรี จ.ชลบุรี 20130",

    reporterName: "น.ส. กานต์พิชชา",
    reporterDept: "กองคลัง",
    reporterPhone: "081-234-5678",

    woDate: "20 พ.ค. 2567 09:15 น.",
    dueDate: "20 พ.ค. 2567 17:00 น.",
    priority: "สูง",
    priorityColor: "text-rose-600",

    assignerName: "น.ส. วราภรณ์ จันทร์ศรี (หัวหน้างาน)",
    assignerDept: "กองช่าง เทศบาลเมืองแสนสุข",
    taskType: "ซ่อมบำรุง",
    notes: "ลูกค้าแจ้งว่าแอร์ไม่เย็น มีเสียงดัง และน้ำหยดจากตัวเครื่อง กรุณาตรวจเช็คระบบการทำงานและแก้ไขให้แล้วเสร็จตามกำหนด ขอบคุณค่ะ",
    notesDate: "20 พ.ค. 2567 09:15 น.",

    technician: { name: "สมชาย ช่างเทคนิค", role: "เจ้าหน้าที่ช่าง", phone: "081-234-5678" },
    approver: { name: "นางสาวจิราภรณ์ วงศ์สุวรรณ", role: "หัวหน้าฝ่ายอาคารสถานที่", phone: "02-123-4567 ต่อ 210" },

    siteCoordinates: [100.9248, 13.2818],
    route: [
      [100.9365, 13.2798],
      [100.9340, 13.2795],
      [100.9320, 13.2790],
      [100.9300, 13.2800],
      [100.9280, 13.2805],
      [100.9260, 13.2810],
      [100.9248, 13.2818],
    ],
    distanceKm: 12.4,
    travelMinutes: 15,
    departedAt: "20 พ.ค. 2567 09:20 น.",
    arrivedAt: "20 พ.ค. 2567 09:35 น.",

    checklist: [
      { id: "1", label: "ระบบไฟฟ้า / การจ่ายไฟ", result: "normal" },
      { id: "2", label: "ความผิดปกติของเสียง", result: "issue" },
      { id: "3", label: "ความเย็น", result: "normal" },
      { id: "4", label: "การระบายน้ำ", result: "issue" },
      { id: "5", label: "รีโมท / การควบคุม", result: "pending" },
    ],

    measurements: [
      { id: "1", name: "แรงดันไฟฟ้า (V)", normalRange: "220 ± 10%", measuredValue: "221", result: "normal" },
      { id: "2", name: "กระแสไฟฟ้า (A)", normalRange: "-", measuredValue: "4.2", result: "normal" },
      { id: "3", name: "อุณหภูมิห้อง (°C)", normalRange: "24 - 26", measuredValue: "30.2", result: "high" },
      { id: "4", name: "อุณหภูมิลมคอยล์ (°C)", normalRange: "10 - 15", measuredValue: "18.7", result: "high" },
      { id: "5", name: "แรงดันน้ำยา (PSI)", normalRange: "120 - 150", measuredValue: "98", result: "low" },
    ],

    evidence: [
      { id: "ev-1", url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=300&auto=format&fit=crop", title: "ก่อนดำเนินการ - คอยล์ร้อน", capturedAt: "20 พ.ค. 2567 09:41", step: "arrived", kind: "photo", grayscale: true },
      { id: "ev-2", url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=300&auto=format&fit=crop", title: "ก่อนดำเนินการ - คอยล์เย็น", capturedAt: "20 พ.ค. 2567 09:41", step: "arrived", kind: "photo", grayscale: true },
      { id: "ev-3", url: "https://images.unsplash.com/photo-1581092921461-7031e4bf0e5e?q=80&w=300&auto=format&fit=crop", title: "ป้ายสเปคเครื่อง", capturedAt: "20 พ.ค. 2567 09:42", step: "arrived", kind: "photo" },
      { id: "ev-4", url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=300&auto=format&fit=crop", title: "วัดอุณหภูมิก่อนดำเนินการ", capturedAt: "20 พ.ค. 2567 09:42", step: "arrived", kind: "photo" },
      { id: "ev-5", url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=300&auto=format&fit=crop", title: "ตรวจสอบการทำงาน", capturedAt: "20 พ.ค. 2567 09:50", step: "in_progress", kind: "photo" },
      { id: "ev-6", url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=300&auto=format&fit=crop", title: "วัดอุณหภูมิหลังดำเนินการ", capturedAt: "20 พ.ค. 2567 10:28", step: "in_progress", kind: "photo" },
      { id: "ev-7", url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=300&auto=format&fit=crop", title: "ตรวจสอบระบบไฟฟ้า", capturedAt: "20 พ.ค. 2567 10:10", step: "in_progress", kind: "photo" },
      { id: "ev-8", url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=300&auto=format&fit=crop", title: "สภาพหน้างานหลังดำเนินการ", capturedAt: "20 พ.ค. 2567 10:29", step: "in_progress", kind: "photo" },
      { id: "ev-9", url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=300&auto=format&fit=crop", title: "หลังดำเนินการ - คอยล์ร้อน", capturedAt: "20 พ.ค. 2567 10:15", step: "in_progress", kind: "photo" },
      { id: "ev-10", url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=300&auto=format&fit=crop", title: "หลังดำเนินการ - คอยล์เย็น", capturedAt: "20 พ.ค. 2567 10:15", step: "in_progress", kind: "photo" },
      { id: "ev-11", url: "", title: "รายงานการตรวจสอบและบำรุงรักษา.pdf", capturedAt: "20 พ.ค. 2567 10:30", step: "summary", kind: "file" },
      { id: "ev-12", url: "", title: "ใบเสนอราคาอะไหล่ (ถ้ามี).pdf", capturedAt: "20 พ.ค. 2567 10:31", step: "summary", kind: "file" },
    ],

    parts: [
      { id: "1", code: "FIL-001", name: "แผ่นกรองอากาศ", description: "ขนาด 24x32 นิ้ว สำหรับแอร์แขวน", unit: "ชิ้น", qty: 1, unitPrice: 250.0 },
      { id: "2", code: "CLN-200", name: "น้ำยาล้างคอยล์", description: "ชนิดไม่กัดกร่อน ขนาด 1 ลิตร", unit: "ลิตร", qty: 0.5, unitPrice: 180.0 },
      { id: "3", code: "CAP-25UF-450V", name: "คาปาซิเตอร์คอมเพรสเซอร์", description: "25uF 450V", unit: "ชิ้น", qty: 1, unitPrice: 350.0 },
      { id: "4", code: "TAPE-AL-50", name: "เทปอลูมิเนียม", description: "ขนาด 2 นิ้ว x 5 เมตร", unit: "ม้วน", qty: 1, unitPrice: 120.0 },
    ],

    costs: [
      { id: "1", type: "ค่าบริการล้างทำความสะอาด", description: "ค่าล้างคอยล์ร้อน - คอยล์เย็น", provider: "บจก. คลีนแอร์ เซอร์วิส", amount: 300.0, documentName: "ใบเสร็จ.pdf", documentType: "pdf" },
      { id: "2", type: "ค่าขนส่ง / เดินทางพิเศษ", description: "ค่าขนส่งน้ำยาแอร์ส่วน", provider: "Flash Express", amount: 120.0, documentName: "ใบเสร็จ.pdf", documentType: "pdf" },
      { id: "3", type: "ค่าธรรมเนียมจอดรถ", description: "ค่าจอดรถอาคารจอด B", provider: "อาคารจอดรถ", amount: 60.0, documentName: "รูปภาพ.jpg", documentType: "image" },
    ],

    documents: [
      { id: "1", fileType: "pdf", name: "รายงานการตรวจสอบและบำรุงรักษา.pdf", subtitle: "รายงานผลการตรวจสอบระบบ", category: "รายงาน", uploadedBy: "สมชาย ช่างเทคนิค", uploadedAt: "20 พ.ค. 2567 10:30 น.", sizeLabel: "1.2 MB" },
      { id: "2", fileType: "xls", name: "ตารางบันทึกการวัดค่า.xlsx", subtitle: "ผลการวัดอุณหภูมิ และกระแสไฟฟ้า", category: "ข้อมูลการวัด", uploadedBy: "สมชาย ช่างเทคนิค", uploadedAt: "20 พ.ค. 2567 10:29 น.", sizeLabel: "28 KB" },
      { id: "3", fileType: "pdf", name: "ใบเสนอราคาอะไหล่.pdf", subtitle: "ใบเสนอราคาจากผู้จำหน่าย", category: "เอกสารอ้างอิง", uploadedBy: "สมชาย ช่างเทคนิค", uploadedAt: "20 พ.ค. 2567 10:25 น.", sizeLabel: "0.8 MB" },
      { id: "4", fileType: "jpg", name: "แผนผังจุดติดตั้ง.jpg", subtitle: "ตำแหน่งติดตั้งเครื่องปรับอากาศ", category: "แผนผัง / แบบแปลน", uploadedBy: "สมชาย ช่างเทคนิค", uploadedAt: "20 พ.ค. 2567 10:20 น.", sizeLabel: "1.5 MB" },
      { id: "5", fileType: "zip", name: "เอกสารเพิ่มเติม.zip", subtitle: "รวมเอกสารเพิ่มเติม", category: "อื่นๆ", uploadedBy: "สมชาย ช่างเทคนิค", uploadedAt: "20 พ.ค. 2567 10:15 น.", sizeLabel: "5.6 MB" },
    ],

    timeline: [
      { status: "accepted", label: STATUS_LABELS.accepted, at: "20 พ.ค. 2567 09:15 น.", actorName: "นายสมชาย ช่างเทคนิค" },
      { status: "traveling", label: STATUS_LABELS.traveling, at: "20 พ.ค. 2567 09:20 น.", detail: "ช่างเทคนิคกำลังเดินทางไปหน้างาน" },
      { status: "arrived", label: STATUS_LABELS.arrived, at: "20 พ.ค. 2567 09:35 น.", detail: "ช่างเทคนิคถึงหน้างาน" },
      { status: "in_progress", label: STATUS_LABELS.in_progress, at: "20 พ.ค. 2567 09:40 น.", detail: "เริ่มดำเนินการซ่อมแซม" },
      { status: "summary", label: STATUS_LABELS.summary, at: "20 พ.ค. 2567 10:30 น.", detail: "สรุปผลและแนบหลักฐานเรียบร้อย" },
      { status: "submitted", label: STATUS_LABELS.submitted, at: "20 พ.ค. 2567 10:35 น.", actorName: "นายสมชาย ช่างเทคนิค" },
      { status: "pending_approval", label: STATUS_LABELS.pending_approval, at: "20 พ.ค. 2567 10:35 น.", detail: "รอการตรวจรับจากหัวหน้างาน" },
      { status: "closed", label: STATUS_LABELS.closed, at: "20 พ.ค. 2567 14:25 น.", actorName: "นางสาวจิราภรณ์ วงศ์สุวรรณ" },
    ],

    rootCause: "คอยล์ร้อนสกปรก / อุดตัน",
    resolution: "ล้างคอยล์ร้อน / ทำความสะอาดชุดกรองอากาศ",
    resultMetrics: [
      { label: "อุณหภูมิห้อง (°C)", value: "24.6" },
      { label: "แรงดันไฟฟ้า (V)", value: "219" },
      { label: "กระแสไฟฟ้า (A)", value: "4.0" },
      { label: "ความเย็น (°C)", value: "11.2" },
    ],
    startedAt: "09:40 น.",
    completedAt: "10:30 น.",
    approvalNote: "-",
    approvedAt: "20 พ.ค. 2567 14:20 น.",
  };
}

export async function getInspectionOrder(id?: string): Promise<InspectionOrder | null> {
  return buildInspectionOrderSeed(id);
}
