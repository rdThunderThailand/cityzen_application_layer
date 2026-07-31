"use client"

import { Button } from "@/components/basic/Button"
import { Input } from "@/components/basic/Input"

import type { AvailableAsset, TransactionType, TransferDisposalInfo } from "../mock/types"

interface DocumentInfoFormProps {
  info: TransferDisposalInfo
  onChangeTransactionType: (type: TransactionType) => void
  availableAssets: AvailableAsset[]
  selectedAssetIds: string[]
  onToggleAsset: (id: string) => void
  totalAssessedValue: number
}

const fieldClassName =
  "mb-0 w-full rounded-lg border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:border-gray-200 focus:ring-0"

export function DocumentInfoForm({
  info,
  onChangeTransactionType,
  availableAssets,
  selectedAssetIds,
  onToggleAsset,
  totalAssessedValue,
}: DocumentInfoFormProps) {
  const isDisposal = info.transactionType === "จำหน่าย"

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <h2 className="text-base font-semibold text-gray-900">ข้อมูลรายการโอนย้าย / จำหน่าย</h2>

      <div className="mt-4">
        <span className="text-xs text-gray-500">ประเภทรายการ *</span>
        <div className="mt-1 inline-flex rounded-lg border border-gray-200 p-1">
          {(["โอนย้าย", "จำหน่าย"] as TransactionType[]).map((type) => (
            <Button
              key={type}
              onClick={() => onChangeTransactionType(type)}
              className={`w-auto rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                info.transactionType === type
                  ? "bg-blue-600 text-white"
                  : "bg-transparent text-gray-500 hover:bg-gray-50"
              }`}
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-xs text-gray-500">เลขที่เอกสาร</span>
          <Input readOnly value={info.documentNo} className={fieldClassName} />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs text-gray-500">{isDisposal ? "วิธีจำหน่าย *" : "หน่วยงานปลายทาง *"}</span>
          <Input
            readOnly
            value={isDisposal ? info.disposalMethod : info.destinationDepartment}
            className={fieldClassName}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs text-gray-500">วันที่ดำเนินการ</span>
          <Input readOnly value={info.actionDate} className={fieldClassName} />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs text-gray-500">ผู้รับผิดชอบ</span>
          <Input readOnly value={info.responsiblePerson} className={fieldClassName} />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs text-gray-500">หน่วยงานต้นทาง</span>
          <Input readOnly value={info.sourceDepartment} className={fieldClassName} />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs text-gray-500">ผู้อนุมัติ</span>
          <Input readOnly value={info.approver} className={fieldClassName} />
        </label>
        <label className="flex flex-col gap-1 md:col-span-2">
          <span className="text-xs text-gray-500">เหตุผล</span>
          <Input readOnly value={info.reason} className={fieldClassName} />
        </label>
      </div>

      <div className="mt-5 rounded-lg bg-blue-50 p-3">
        <p className="text-xs text-blue-600">มูลค่ารวมประเมิน (บาท)</p>
        <p className="mt-1 text-lg font-bold text-blue-700">
          {totalAssessedValue.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
        </p>
      </div>

      <div className="mt-5">
        <h3 className="text-sm font-semibold text-gray-900">
          รายการครุภัณฑ์นำเข้า (เลือกจาก {availableAssets.length} รายการล่าสุด)
        </h3>
        <div className="mt-2 overflow-x-auto rounded-lg border border-gray-100">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs text-gray-400">
                <th className="w-8 p-2" />
                <th className="p-2 font-medium">รหัสครุภัณฑ์</th>
                <th className="p-2 font-medium">ชื่อครุภัณฑ์</th>
                <th className="p-2 font-medium">หมวดหมู่</th>
                <th className="p-2 text-right font-medium">มูลค่าตั้งต้น (บาท)</th>
                <th className="p-2 text-right font-medium">มูลค่าประเมิน (บาท)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {availableAssets.map((asset) => (
                <tr key={asset.id}>
                  <td className="p-2">
                    <input
                      type="checkbox"
                      checked={selectedAssetIds.includes(asset.id)}
                      onChange={() => onToggleAsset(asset.id)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </td>
                  <td className="p-2 font-medium text-gray-900">{asset.assetCode}</td>
                  <td className="p-2 text-gray-600">{asset.name}</td>
                  <td className="p-2 text-gray-600">{asset.category}</td>
                  <td className="p-2 text-right text-gray-600">{asset.originalValue.toLocaleString("th-TH")}</td>
                  <td className="p-2 text-right text-gray-900">{asset.assessedValue.toLocaleString("th-TH")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
