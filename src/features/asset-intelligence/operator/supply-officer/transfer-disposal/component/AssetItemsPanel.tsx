"use client"

import { FileInput, Plus, ScanLine, Trash2 } from "lucide-react"

import type { TransferAsset } from "../mock/types"
import { ConditionBadge } from "./ConditionBadge"

interface AssetItemsPanelProps {
  items: TransferAsset[]
  selectedIds: string[]
  onToggleSelected: (id: string) => void
  onToggleSelectAll: () => void
  onOpenAddAsset: () => void
  onRemoveSelected: () => void
}

export function AssetItemsPanel({
  items,
  selectedIds,
  onToggleSelected,
  onToggleSelectAll,
  onOpenAddAsset,
  onRemoveSelected,
}: AssetItemsPanelProps) {
  const totalOriginalValue = items.reduce((sum, item) => sum + item.originalValue, 0)
  const totalAssessedValue = items.reduce((sum, item) => sum + item.assessedValue, 0)
  const isAllSelected = items.length > 0 && selectedIds.length === items.length

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-gray-900">รายการครุภัณฑ์ที่ต้องจำหน่าย</h2>
          <p className="text-xs text-gray-400">เลือกครุภัณฑ์ที่ต้องการบันทึกรายการ</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onOpenAddAsset}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            เพิ่มรายการ
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <FileInput className="h-4 w-4" />
            นำเข้าจากไฟล์เอกสาร
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <ScanLine className="h-4 w-4" />
            สแกน Barcode / QR
          </button>
          <button
            type="button"
            onClick={onRemoveSelected}
            disabled={selectedIds.length === 0}
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Trash2 className="h-4 w-4" />
            ลบรายการที่เลือก
          </button>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[880px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs text-gray-400">
              <th className="w-8 py-3">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={onToggleSelectAll}
                  className="h-4 w-4 rounded border-gray-300"
                />
              </th>
              <th className="py-3 font-medium">รหัสครุภัณฑ์</th>
              <th className="py-3 font-medium">ชื่อครุภัณฑ์</th>
              <th className="py-3 font-medium">หน่วยนับ</th>
              <th className="py-3 text-right font-medium">จำนวน</th>
              <th className="py-3 text-right font-medium">มูลค่าตั้งต้น (บาท)</th>
              <th className="py-3 text-right font-medium">มูลค่าประเมิน (บาท)</th>
              <th className="py-3 font-medium">สภาพ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="py-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(item.id)}
                    onChange={() => onToggleSelected(item.id)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                </td>
                <td className="py-3 font-medium text-gray-900">{item.assetCode}</td>
                <td className="py-3">
                  <p className="text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.detail}</p>
                </td>
                <td className="py-3 text-gray-600">{item.unit}</td>
                <td className="py-3 text-right text-gray-600">{item.quantity}</td>
                <td className="py-3 text-right text-gray-600">{item.originalValue.toLocaleString("th-TH")}</td>
                <td className="py-3 text-right font-medium text-gray-900">
                  {item.assessedValue.toLocaleString("th-TH")}
                </td>
                <td className="py-3">
                  <ConditionBadge condition={item.condition} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap justify-end gap-6 border-t border-gray-100 pt-4 text-sm">
        <p className="text-gray-500">
          รวมมูลค่าตั้งต้น:{" "}
          <span className="font-semibold text-gray-900">{totalOriginalValue.toLocaleString("th-TH")} บาท</span>
        </p>
        <p className="text-gray-500">
          รวมมูลค่าประเมิน:{" "}
          <span className="font-semibold text-gray-900">{totalAssessedValue.toLocaleString("th-TH")} บาท</span>
        </p>
      </div>
    </div>
  )
}
