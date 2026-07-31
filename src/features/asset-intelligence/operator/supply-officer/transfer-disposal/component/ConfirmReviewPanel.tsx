"use client"

import { CheckCircle2, Coins, TrendingDown, Wallet } from "lucide-react"

import type { TransferAsset, TransferDisposalInfo, UploadedDocument } from "../mock/types"
import { ConditionBadge } from "./ConditionBadge"

interface ConfirmReviewPanelProps {
  info: TransferDisposalInfo
  items: TransferAsset[]
  uploadedDocuments: UploadedDocument[]
  isConfirmed: boolean
  onConfirm: () => void
}

export function ConfirmReviewPanel({ info, items, uploadedDocuments, isConfirmed, onConfirm }: ConfirmReviewPanelProps) {
  const isDisposal = info.transactionType === "จำหน่าย"
  const totalOriginalValue = items.reduce((sum, item) => sum + item.originalValue, 0)
  const totalAssessedValue = items.reduce((sum, item) => sum + item.assessedValue, 0)
  const depreciationValue = totalOriginalValue - totalAssessedValue

  if (isConfirmed) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-gray-100 bg-white p-10 text-center shadow-sm">
        <CheckCircle2 className="h-14 w-14 text-green-600" />
        <h2 className="text-lg font-semibold text-gray-900">
          บันทึกข้อมูล{info.transactionType}เรียบร้อยแล้ว
        </h2>
        <p className="text-sm text-gray-500">เอกสาร {info.documentNo} ถูกบันทึกเข้าสู่ระบบทะเบียนครุภัณฑ์แล้ว</p>
      </div>
    )
  }

  return (
    <div className="space-y-5 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-base font-semibold text-gray-900">1. ข้อมูลเอกสาร</h2>
        <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-gray-50 p-3 text-sm">
            <p className="text-xs text-gray-400">เลขที่เอกสาร</p>
            <p className="font-medium text-gray-900">{info.documentNo}</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-3 text-sm">
            <p className="text-xs text-gray-400">{isDisposal ? "วิธีจำหน่าย" : "หน่วยงานปลายทาง"}</p>
            <p className="font-medium text-gray-900">
              {isDisposal ? info.disposalMethod : info.destinationDepartment}
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-3 text-sm">
            <p className="text-xs text-gray-400">วันที่ดำเนินการ</p>
            <p className="font-medium text-gray-900">{info.actionDate}</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-3 text-sm">
            <p className="text-xs text-gray-400">หน่วยงานต้นทาง</p>
            <p className="font-medium text-gray-900">{info.sourceDepartment}</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-3 text-sm sm:col-span-2">
            <p className="text-xs text-gray-400">เหตุผล</p>
            <p className="font-medium text-gray-900">{info.reason}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-5">
        <h2 className="text-base font-semibold text-gray-900">
          2. รายการครุภัณฑ์ที่ต้อง{info.transactionType} (รวม {items.length} รายการ)
        </h2>
        <div className="mt-2 overflow-x-auto rounded-lg border border-gray-100">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs text-gray-400">
                <th className="p-2 font-medium">รหัสครุภัณฑ์</th>
                <th className="p-2 font-medium">ชื่อครุภัณฑ์</th>
                <th className="p-2 font-medium">หน่วยนับ</th>
                <th className="p-2 text-right font-medium">มูลค่าตั้งต้น (บาท)</th>
                <th className="p-2 text-right font-medium">มูลค่าประเมิน (บาท)</th>
                <th className="p-2 font-medium">สภาพ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="p-2 font-medium text-gray-900">{item.assetCode}</td>
                  <td className="p-2 text-gray-600">{item.name}</td>
                  <td className="p-2 text-gray-600">{item.unit}</td>
                  <td className="p-2 text-right text-gray-600">{item.originalValue.toLocaleString("th-TH")}</td>
                  <td className="p-2 text-right text-gray-900">{item.assessedValue.toLocaleString("th-TH")}</td>
                  <td className="p-2">
                    <ConditionBadge condition={item.condition} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-right text-sm font-semibold text-gray-900">
          รวมมูลค่าประเมิน: {totalAssessedValue.toLocaleString("th-TH")} บาท
        </p>
      </div>

      <div className="border-t border-gray-100 pt-5">
        <h2 className="text-base font-semibold text-gray-900">
          3. เอกสารประกอบ (รวม {uploadedDocuments.length} รายการ)
        </h2>
        <div className="mt-2 overflow-x-auto rounded-lg border border-gray-100">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs text-gray-400">
                <th className="p-2 font-medium">ชื่อเอกสาร</th>
                <th className="p-2 font-medium">ไฟล์</th>
                <th className="p-2 font-medium">วันที่อัปโหลด</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {uploadedDocuments.map((doc) => (
                <tr key={doc.id}>
                  <td className="p-2 text-gray-900">{doc.name}</td>
                  <td className="p-2 text-gray-600">{doc.fileName}</td>
                  <td className="p-2 text-gray-600">{doc.uploadedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-2 flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
          <CheckCircle2 className="h-4 w-4" />
          ข้อมูลพร้อมบันทึก - การตรวจสอบข้อมูลครบถ้วนพร้อมสำหรับบันทึก
        </div>
      </div>

      <div className="border-t border-gray-100 pt-5">
        <h2 className="text-base font-semibold text-gray-900">4. สรุปผล</h2>
        <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
            <Wallet className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-xs text-gray-400">มูลค่าตั้งต้นรวม</p>
              <p className="text-sm font-semibold text-gray-900">
                {totalOriginalValue.toLocaleString("th-TH")} บาท
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
            <Coins className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-xs text-gray-400">มูลค่าประเมินรวม</p>
              <p className="text-sm font-semibold text-gray-900">
                {totalAssessedValue.toLocaleString("th-TH")} บาท
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
            <TrendingDown className="h-5 w-5 text-orange-600" />
            <div>
              <p className="text-xs text-gray-400">ผลต่างมูลค่า (ค่าเสื่อม)</p>
              <p className="text-sm font-semibold text-gray-900">{depreciationValue.toLocaleString("th-TH")} บาท</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end border-t border-gray-100 pt-5">
        <button
          type="button"
          onClick={onConfirm}
          className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
        >
          <CheckCircle2 className="h-4 w-4" />
          บันทึกข้อมูล{info.transactionType}
        </button>
      </div>
    </div>
  )
}
