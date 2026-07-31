"use client"

import type { ReceivingInfo } from "../mock/types"

interface ReceivingInfoFormProps {
  info: ReceivingInfo
  totalValue: number
}

const fieldClassName =
  "w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:outline-none"

export function ReceivingInfoForm({ info, totalValue }: ReceivingInfoFormProps) {
  const remaining = info.budget - totalValue
  const remainingPercent = ((remaining / info.budget) * 100).toFixed(1)

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <h2 className="text-base font-semibold text-gray-900">ข้อมูลการรับเข้า</h2>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-xs text-gray-500">เลขที่เอกสาร</span>
          <input readOnly value={info.documentNo} className={fieldClassName} />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs text-gray-500">ผู้จัดหา / ผู้ขาย</span>
          <input readOnly value={info.vendor} className={fieldClassName} />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs text-gray-500">วันที่รับเข้า</span>
          <input readOnly value={info.receivedDate} className={fieldClassName} />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs text-gray-500">สถานะ</span>
          <input readOnly value={info.status} className={fieldClassName} />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs text-gray-500">เลขที่ PO / สัญญา</span>
          <input readOnly value={info.poNumber} className={fieldClassName} />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs text-gray-500">ผู้รับผิดชอบ</span>
          <input readOnly value={info.responsible} className={fieldClassName} />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs text-gray-500">หน่วยงาน / แผนก</span>
          <input readOnly value={info.department} className={fieldClassName} />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs text-gray-500">เลขที่ใบสั่งซื้อ</span>
          <input readOnly value={info.contractNumber} className={fieldClassName} />
        </label>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-blue-50 p-3">
          <p className="text-xs text-blue-600">งบประมาณ (บาท)</p>
          <p className="mt-1 text-lg font-bold text-blue-700">{info.budget.toLocaleString("th-TH")}</p>
        </div>
        <div className="rounded-lg bg-orange-50 p-3">
          <p className="text-xs text-orange-600">มูลค่ารวม (บาท)</p>
          <p className="mt-1 text-lg font-bold text-orange-700">{totalValue.toLocaleString("th-TH")}</p>
        </div>
        <div className="rounded-lg bg-green-50 p-3">
          <p className="text-xs text-green-600">คงเหลือ (บาท)</p>
          <p className="mt-1 text-lg font-bold text-green-700">{remaining.toLocaleString("th-TH")}</p>
          <p className="text-xs text-green-500">{remainingPercent}%</p>
        </div>
      </div>
    </div>
  )
}
