import type { UploadedDocument } from "./types"

export const uploadedDocumentsMock: UploadedDocument[] = [
  {
    id: "1",
    requiredDocId: "memo",
    name: "บันทึกข้อความอนุมัติจำหน่าย",
    fileName: "Memo_Dispose_6705-00013.pdf",
    uploadedDate: "20 พ.ค. 2567",
    fileSize: "1.25 MB",
  },
  {
    id: "2",
    requiredDocId: "inspection",
    name: "รายงานผลการตรวจสอบครุภัณฑ์",
    fileName: "Inspection_6705-00013.pdf",
    uploadedDate: "20 พ.ค. 2567",
    fileSize: "1.10 MB",
  },
  {
    id: "3",
    requiredDocId: "meeting",
    name: "รายงานการประชุม / มติอนุมัติ",
    fileName: "Meeting_Approve_6705-00013.pdf",
    uploadedDate: "21 พ.ค. 2567",
    fileSize: "1.80 MB",
  },
  {
    id: "4",
    requiredDocId: "committee",
    name: "คำสั่งแต่งตั้งคณะกรรมการ",
    fileName: "Committee_6705-00013.pdf",
    uploadedDate: "19 พ.ค. 2567",
    fileSize: "0.95 MB",
  },
  {
    id: "5",
    requiredDocId: "photo",
    name: "ภาพถ่ายครุภัณฑ์ (ก่อนจำหน่าย)",
    fileName: "Photo_Before_6705-00013.jpg",
    uploadedDate: "19 พ.ค. 2567",
    fileSize: "2.40 MB",
  },
]
