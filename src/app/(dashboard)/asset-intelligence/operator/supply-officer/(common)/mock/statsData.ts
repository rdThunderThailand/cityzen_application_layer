export type StatCardTone = "blue" | "green" | "orange" | "purple" | "red"
export type StatCardIcon = "file" | "check-circle" | "wrench" | "clock" | "alert-triangle"

export interface StatCardData {
  id: string
  label: string
  value: number
  unit: string
  helperText: string
  icon: StatCardIcon
  tone: StatCardTone
}

export const statsData: StatCardData[] = [
  {
    id: "total-assets",
    label: "ครุภัณฑ์ทั้งหมด",
    value: 5246,
    unit: "รายการ",
    helperText: "ทั้งหมดในระบบ",
    icon: "file",
    tone: "blue",
  },
  {
    id: "available-assets",
    label: "พร้อมใช้งาน",
    value: 4312,
    unit: "รายการ",
    helperText: "82.31% ของทั้งหมด",
    icon: "check-circle",
    tone: "green",
  },
  {
    id: "in-repair-assets",
    label: "อยู่ระหว่างซ่อม",
    value: 152,
    unit: "รายการ",
    helperText: "2.90% ของทั้งหมด",
    icon: "wrench",
    tone: "orange",
  },
  {
    id: "warranty-expiring-assets",
    label: "ใกล้หมดอายุประกัน",
    value: 86,
    unit: "รายการ",
    helperText: "ภายใน 30 วัน",
    icon: "clock",
    tone: "purple",
  },
  {
    id: "audit-overdue-assets",
    label: "ครบกำหนดตรวจนับ",
    value: 120,
    unit: "รายการ",
    helperText: "เกินกำหนดแล้ว",
    icon: "alert-triangle",
    tone: "red",
  },
]
