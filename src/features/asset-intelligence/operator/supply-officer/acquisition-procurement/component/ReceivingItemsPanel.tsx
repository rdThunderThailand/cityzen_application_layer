"use client"

import { FileSpreadsheet, ListChecks, Pencil, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/basic/Button"

import type { ReceivingItem } from "../mock/types"

interface ReceivingItemsPanelProps {
  items: ReceivingItem[]
  onOpenImportExcel: () => void
  onOpenAddItem: () => void
  onOpenSelectFromPlan: () => void
  onRemoveItem: (id: string) => void
}

export function ReceivingItemsPanel({
  items,
  onOpenImportExcel,
  onOpenAddItem,
  onOpenSelectFromPlan,
  onRemoveItem,
}: ReceivingItemsPanelProps) {
  const totalValue = items.reduce((sum, item) => sum + item.totalPrice, 0)

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-gray-900">รายการครุภัณฑ์</h2>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            onClick={onOpenImportExcel}
            className="w-auto rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <FileSpreadsheet className="h-4 w-4" />
            นำเข้าจาก Excel
          </Button>
          <Button
            onClick={onOpenSelectFromPlan}
            className="w-auto rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <ListChecks className="h-4 w-4" />
            เลือกจากแผนจัดซื้อ
          </Button>
          <Button
            onClick={onOpenAddItem}
            className="w-auto rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            เพิ่มรายการ
          </Button>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs text-gray-400">
              <th className="py-3 font-medium">รหัสครุภัณฑ์</th>
              <th className="py-3 font-medium">ชื่อครุภัณฑ์</th>
              <th className="py-3 font-medium">ประเภทครุภัณฑ์</th>
              <th className="py-3 text-right font-medium">จำนวน</th>
              <th className="py-3 text-right font-medium">ราคาต่อหน่วย (บาท)</th>
              <th className="py-3 text-right font-medium">ราคารวม (บาท)</th>
              <th className="py-3 text-right font-medium">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="py-3 font-medium text-gray-900">{item.assetCode}</td>
                <td className="py-3 text-gray-600">{item.name}</td>
                <td className="py-3 text-gray-600">{item.category}</td>
                <td className="py-3 text-right text-gray-600">{item.quantity.toLocaleString("th-TH")}</td>
                <td className="py-3 text-right text-gray-600">
                  {item.unitPrice.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
                </td>
                <td className="py-3 text-right font-medium text-gray-900">
                  {item.totalPrice.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
                </td>
                <td className="py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      aria-label="แก้ไข"
                      className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      aria-label="ลบ"
                      className="rounded-full p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end border-t border-gray-100 pt-4">
        <p className="text-sm font-semibold text-gray-900">
          รวมทั้งสิ้น (บาท): {totalValue.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
        </p>
      </div>
    </div>
  )
}
