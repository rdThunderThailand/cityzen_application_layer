"use client"

import { CheckCircle2, FileCheck2 } from "lucide-react"

import type { ReceivingInfo, ReceivingItem, SupportingDocument } from "../mock/types"

interface ConfirmSummaryPanelProps {
  info: ReceivingInfo
  items: ReceivingItem[]
  documents: SupportingDocument[]
  isConfirmed: boolean
  onConfirm: () => void
}

export function ConfirmSummaryPanel({ info, items, documents, isConfirmed, onConfirm }: ConfirmSummaryPanelProps) {
  const totalValue = items.reduce((sum, item) => sum + item.totalPrice, 0)

  if (isConfirmed) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-gray-100 bg-white p-10 text-center shadow-sm">
        <CheckCircle2 className="h-14 w-14 text-green-600" />
        <h2 className="text-lg font-semibold text-gray-900">บันทึกการรับเข้าเรียบร้อยแล้ว</h2>
        <p className="text-sm text-gray-500">เอกสาร {info.documentNo} ถูกบันทึกเข้าสู่ระบบทะเบียนครุภัณฑ์แล้ว</p>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <h2 className="text-base font-semibold text-gray-900">ตรวจสอบและยืนยันการรับเข้า</h2>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-gray-50 p-3 text-sm">
          <p className="text-xs text-gray-400">เลขที่เอกสาร / PO</p>
          <p className="font-medium text-gray-900">
            {info.documentNo} / {info.poNumber}
          </p>
        </div>
        <div className="rounded-lg bg-gray-50 p-3 text-sm">
          <p className="text-xs text-gray-400">ผู้จัดหา / ผู้ขาย</p>
          <p className="font-medium text-gray-900">{info.vendor}</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-3 text-sm">
          <p className="text-xs text-gray-400">จำนวนรายการครุภัณฑ์</p>
          <p className="font-medium text-gray-900">{items.length} รายการ</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-3 text-sm">
          <p className="text-xs text-gray-400">มูลค่ารวม</p>
          <p className="font-medium text-gray-900">{totalValue.toLocaleString("th-TH")} บาท</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-700">
        <FileCheck2 className="h-4 w-4" />
        เอกสารประกอบแนบแล้ว {documents.length} ไฟล์
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={onConfirm}
          className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
        >
          <CheckCircle2 className="h-4 w-4" />
          ยืนยันการรับเข้า
        </button>
      </div>
    </div>
  )
}
