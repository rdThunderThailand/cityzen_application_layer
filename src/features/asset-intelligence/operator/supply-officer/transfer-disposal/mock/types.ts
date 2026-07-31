export type TransactionType = "โอนย้าย" | "จำหน่าย"

export type AssetCondition = "สภาพดี" | "ชำรุด"

export type WizardStepKey = "document-info" | "asset-items" | "documents" | "confirm"

export interface TransferDisposalInfo {
  transactionType: TransactionType
  documentNo: string
  actionDate: string
  sourceDepartment: string
  reason: string
  destinationDepartment: string
  disposalMethod: string
  responsiblePerson: string
  approver: string
}

export interface TransferAsset {
  id: string
  assetCode: string
  name: string
  detail: string
  unit: string
  quantity: number
  originalValue: number
  assessedValue: number
  condition: AssetCondition
}

export interface AvailableAsset {
  id: string
  assetCode: string
  name: string
  category: string
  originalValue: number
  assessedValue: number
}

export interface RequiredDocumentSlot {
  id: string
  label: string
  isRequired: boolean
}

export interface UploadedDocument {
  id: string
  requiredDocId: string | null
  name: string
  fileName: string
  uploadedDate: string
  fileSize: string
}
