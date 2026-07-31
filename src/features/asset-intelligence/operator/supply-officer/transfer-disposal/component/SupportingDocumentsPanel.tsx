"use client"

import { CheckCircle2, Circle, Download, Plus, Trash2, Upload } from "lucide-react"

import type { RequiredDocumentSlot, UploadedDocument } from "../mock/types"

interface SupportingDocumentsPanelProps {
  requiredSlots: RequiredDocumentSlot[]
  uploadedDocuments: UploadedDocument[]
  onUpload: (slotId: string) => void
  onRemove: (documentId: string) => void
}

export function SupportingDocumentsPanel({
  requiredSlots,
  uploadedDocuments,
  onUpload,
  onRemove,
}: SupportingDocumentsPanelProps) {
  const findDocument = (slotId: string) => uploadedDocuments.find((doc) => doc.requiredDocId === slotId)

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <h2 className="text-base font-semibold text-gray-900">เอกสารประกอบ</h2>
      <p className="mt-1 text-xs text-gray-400">แนบเอกสารที่เกี่ยวข้องกับการโอนย้ายหรือจำหน่ายครุภัณฑ์</p>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-500">
        <span>อัปโหลดไฟล์เอกสาร PDF, JPG, PNG ขนาดไม่เกิน 20 MB ต่อไฟล์</span>
        <button
          type="button"
          onClick={() => onUpload(requiredSlots.find((slot) => !findDocument(slot.id))?.id ?? "")}
          className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
        >
          <Plus className="h-3.5 w-3.5" />
          เพิ่มเอกสาร
        </button>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs text-gray-400">
              <th className="w-8 py-3" />
              <th className="py-3 font-medium">ประเภทเอกสาร</th>
              <th className="py-3 font-medium">ไฟล์แนบ</th>
              <th className="py-3 font-medium">วันที่อัปโหลด</th>
              <th className="py-3 font-medium">ขนาดไฟล์</th>
              <th className="py-3 text-right font-medium">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {requiredSlots.map((slot) => {
              const document = findDocument(slot.id)

              return (
                <tr key={slot.id}>
                  <td className="py-3">
                    {document ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <Circle className="h-4 w-4 text-gray-300" />
                    )}
                  </td>
                  <td className="py-3 text-gray-900">
                    {slot.label}
                    {slot.isRequired && <span className="text-red-500">*</span>}
                  </td>
                  <td className="py-3 text-gray-600">{document?.fileName ?? "-"}</td>
                  <td className="py-3 text-gray-600">{document?.uploadedDate ?? "-"}</td>
                  <td className="py-3 text-gray-600">{document?.fileSize ?? "-"}</td>
                  <td className="py-3">
                    <div className="flex items-center justify-end gap-1">
                      {document ? (
                        <>
                          <button
                            type="button"
                            aria-label="ดาวน์โหลด"
                            className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onRemove(document.id)}
                            aria-label="ลบ"
                            className="rounded-full p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onUpload(slot.id)}
                          aria-label="อัปโหลด"
                          className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                        >
                          <Upload className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-5 border-t border-gray-100 pt-4">
        <p className="text-sm font-semibold text-gray-900">เอกสารที่ต้องแนบ</p>
        <ul className="mt-2 space-y-2">
          {requiredSlots.map((slot) => {
            const document = findDocument(slot.id)

            return (
              <li key={slot.id} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-gray-600">
                  {document ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <Circle className="h-4 w-4 text-gray-300" />
                  )}
                  {slot.label}
                  {slot.isRequired && <span className="text-red-500">*</span>}
                </span>
                <span className={document ? "text-xs text-green-600" : "text-xs text-blue-600"}>
                  {document ? "อัปโหลดแล้ว" : "อัปโหลด +"}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
