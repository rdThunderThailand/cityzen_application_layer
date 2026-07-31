export type ReceivingStatus = "รอดำเนินการ" | "กำลังดำเนินการ" | "เสร็จสิ้น"

export type WizardStepKey = "receiving-info" | "asset-items" | "documents" | "confirm"

export interface ReceivingInfo {
  documentNo: string
  receivedDate: string
  poNumber: string
  department: string
  vendor: string
  status: ReceivingStatus
  responsible: string
  contractNumber: string
  budget: number
}

export interface ReceivingItem {
  id: string
  assetCode: string
  name: string
  category: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface ProcurementPlanItem {
  id: string
  name: string
  category: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface SupportingDocument {
  id: string
  name: string
  type: string
  fileSize: string
  uploadedDate: string
}
