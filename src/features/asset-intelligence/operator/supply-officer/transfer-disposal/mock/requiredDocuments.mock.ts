import type { RequiredDocumentSlot } from "./types"

export const requiredDocumentSlotsMock: RequiredDocumentSlot[] = [
  { id: "memo", label: "บันทึกข้อความอนุมัติจำหน่าย", isRequired: true },
  { id: "inspection", label: "รายงานผลการตรวจสอบครุภัณฑ์", isRequired: true },
  { id: "meeting", label: "รายงานการประชุม / มติอนุมัติ", isRequired: true },
  { id: "committee", label: "คำสั่งแต่งตั้งคณะกรรมการ", isRequired: false },
  { id: "photo", label: "ภาพถ่ายครุภัณฑ์ (ก่อนจำหน่าย)", isRequired: true },
  { id: "other", label: "เอกสารอื่นๆ (ถ้ามี)", isRequired: false },
]
