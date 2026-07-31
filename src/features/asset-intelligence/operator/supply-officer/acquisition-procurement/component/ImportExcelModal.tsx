"use client"

import { CheckCircle2, FileSpreadsheet, X } from "lucide-react"
import { useState } from "react"

import type { ReceivingItem } from "../mock/types"

interface ImportExcelModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: (items: ReceivingItem[]) => void
}

type ImportStage = "upload" | "matching" | "verify"

const importPreviewMock: ReceivingItem[] = [
  {
    id: "import-1",
    assetCode: "IT-6705-00305",
    name: "เครื่องสำรองไฟ UPS 1000VA",
    category: "ครุภัณฑ์คอมพิวเตอร์",
    quantity: 5,
    unitPrice: 3200,
    totalPrice: 16000,
  },
  {
    id: "import-2",
    assetCode: "IT-6705-00306",
    name: "เมาส์ไร้สาย",
    category: "ครุภัณฑ์คอมพิวเตอร์",
    quantity: 10,
    unitPrice: 350,
    totalPrice: 3500,
  },
]

export function ImportExcelModal({ isOpen, onClose, onComplete }: ImportExcelModalProps) {
  const [stage, setStage] = useState<ImportStage>("upload")

  if (!isOpen) return null

  const handleClose = () => {
    setStage("upload")
    onClose()
  }

  const handleConfirm = () => {
    onComplete(importPreviewMock)
    setStage("upload")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-xl bg-white p-5 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">นำเข้าข้อมูลจากไฟล์ Excel</h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label="ปิด"
            className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {stage === "upload" && (
          <div className="mt-5">
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-200 p-10 text-center">
              <FileSpreadsheet className="h-10 w-10 text-green-600" />
              <p className="text-sm text-gray-500">ลากไฟล์ Excel มาวางที่นี่ หรือ</p>
              <button
                type="button"
                onClick={() => setStage("matching")}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                เลือกไฟล์ Excel
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-400">รองรับไฟล์ .xlsx, .xls ขนาดไม่เกิน 10 MB</p>
          </div>
        )}

        {stage === "matching" && (
          <div className="mt-5 space-y-3">
            <div className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
              <CheckCircle2 className="h-4 w-4" />
              จับคู่ข้อมูลกับใบสั่งซื้อสำเร็จ ({importPreviewMock.length} รายการ)
            </div>
            <div className="overflow-x-auto rounded-lg border border-gray-100">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-xs text-gray-400">
                    <th className="p-2 font-medium">รหัสครุภัณฑ์</th>
                    <th className="p-2 font-medium">ชื่อครุภัณฑ์</th>
                    <th className="p-2 text-right font-medium">จำนวน</th>
                    <th className="p-2 text-right font-medium">ราคารวม (บาท)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {importPreviewMock.map((item) => (
                    <tr key={item.id}>
                      <td className="p-2 text-gray-900">{item.assetCode}</td>
                      <td className="p-2 text-gray-600">{item.name}</td>
                      <td className="p-2 text-right text-gray-600">{item.quantity}</td>
                      <td className="p-2 text-right text-gray-900">{item.totalPrice.toLocaleString("th-TH")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setStage("verify")}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                ดำเนินการต่อ
              </button>
            </div>
          </div>
        )}

        {stage === "verify" && (
          <div className="mt-5 space-y-3">
            <div className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
              <CheckCircle2 className="h-4 w-4" />
              ตรวจสอบข้อมูลเรียบร้อย พร้อมเพิ่มเข้ารายการครุภัณฑ์
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                ยืนยันและเพิ่มรายการ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
