export type PendingTaskIcon = "package" | "arrow-left-right" | "scan-line" | "file-signature" | "shield-alert"

export type PendingTaskTone = "blue" | "green" | "orange" | "purple" | "red"

export interface PendingTaskData {
  id: string
  label: string
  subtitle: string
  count: number
  icon: PendingTaskIcon
  tone: PendingTaskTone
}

export const pendingTasksTotalCount = 15

export const pendingTasksData: PendingTaskData[] = [
  {
    id: "receiving",
    label: "รอรับเข้า / ตรวจรับพัสดุ",
    subtitle: "ตรวจรับพัสดุที่ต้องยืนยัน",
    count: 5,
    icon: "package",
    tone: "blue",
  },
  {
    id: "transfer",
    label: "รอโอนย้าย",
    subtitle: "คำขอโอนย้ายครุภัณฑ์",
    count: 3,
    icon: "arrow-left-right",
    tone: "green",
  },
  {
    id: "audit-due",
    label: "ใกล้ครบกำหนดตรวจนับ",
    subtitle: "ครุภัณฑ์ที่ต้องตรวจนับ",
    count: 120,
    icon: "scan-line",
    tone: "orange",
  },
  {
    id: "document-approval",
    label: "เอกสารรอลงนาม / อนุมัติ",
    subtitle: "เอกสารรอดำเนินการ",
    count: 7,
    icon: "file-signature",
    tone: "purple",
  },
  {
    id: "warranty-expiring",
    label: "ใกล้หมดอายุประกัน / สัญญา",
    subtitle: "ต้องดำเนินการต่ออายุ",
    count: 86,
    icon: "shield-alert",
    tone: "red",
  },
]
