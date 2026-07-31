"use client"

import { Download, Eye, FileText, Image as ImageIcon, Upload } from "lucide-react"

import type { SupportingDocument } from "../mock/types"

interface SupportingDocumentsPanelProps {
  documents: SupportingDocument[]
  onUpload: () => void
}

export function SupportingDocumentsPanel({ documents, onUpload }: SupportingDocumentsPanelProps) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <h2 className="text-base font-semibold text-gray-900">เอกสารประกอบ</h2>
      <p className="mt-1 text-xs text-gray-400">รองรับไฟล์ PDF, JPG, PNG</p>

      <button
        type="button"
        onClick={onUpload}
        className="mt-4 flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 p-8 text-center hover:bg-gray-50"
      >
        <Upload className="h-8 w-8 text-gray-400" />
        <span className="text-sm text-gray-500">ลากไฟล์มาวางที่นี่ หรือ</span>
        <span className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">เลือกไฟล์</span>
      </button>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs text-gray-400">
              <th className="py-3 font-medium">ชื่อเอกสาร</th>
              <th className="py-3 font-medium">ประเภท</th>
              <th className="py-3 font-medium">ขนาดไฟล์</th>
              <th className="py-3 font-medium">วันที่อัปโหลด</th>
              <th className="py-3 text-right font-medium">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {documents.map((doc) => {
              const DocIcon = doc.type === "PDF" ? FileText : ImageIcon

              return (
                <tr key={doc.id}>
                  <td className="py-3">
                    <div className="flex items-center gap-2 text-gray-900">
                      <DocIcon className="h-4 w-4 text-gray-400" />
                      {doc.name}
                    </div>
                  </td>
                  <td className="py-3 text-gray-600">{doc.type}</td>
                  <td className="py-3 text-gray-600">{doc.fileSize}</td>
                  <td className="py-3 text-gray-600">{doc.uploadedDate}</td>
                  <td className="py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        aria-label="ดูเอกสาร"
                        className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        aria-label="ดาวน์โหลด"
                        className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
