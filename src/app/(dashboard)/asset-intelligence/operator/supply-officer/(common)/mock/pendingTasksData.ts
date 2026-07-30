export interface PendingTaskData {
  id: string
  label: string
  count: number
}

export const pendingTasksTotalCount = 15

export const pendingTasksData: PendingTaskData[] = [
  { id: "receiving", label: "รอรับเข้า / ตรวจรับพัสดุ", count: 5 },
  { id: "transfer", label: "รอโอนย้าย", count: 3 },
  { id: "audit-due", label: "ใกล้ครบกำหนดตรวจนับ", count: 120 },
  { id: "document-approval", label: "เอกสารรอลงนาม / อนุมัติ", count: 7 },
  { id: "warranty-expiring", label: "ใกล้หมดอายุประกัน / สัญญา", count: 86 },
]
