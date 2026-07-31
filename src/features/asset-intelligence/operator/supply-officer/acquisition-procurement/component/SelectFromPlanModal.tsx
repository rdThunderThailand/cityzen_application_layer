"use client"

import { X } from "lucide-react"
import { useState } from "react"

import { procurementPlanMock } from "../mock/procurementPlan.mock"
import type { ReceivingItem } from "../mock/types"

interface SelectFromPlanModalProps {
  isOpen: boolean
  onClose: () => void
  onAddItems: (items: ReceivingItem[]) => void
}

export function SelectFromPlanModal({ isOpen, onClose, onAddItems }: SelectFromPlanModalProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  if (!isOpen) return null

  const toggleSelected = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const selectedItems = procurementPlanMock.filter((item) => selectedIds.includes(item.id))
  const selectedTotal = selectedItems.reduce((sum, item) => sum + item.totalPrice, 0)

  const handleClose = () => {
    setSelectedIds([])
    onClose()
  }

  const handleConfirm = () => {
    onAddItems(
      selectedItems.map((item) => ({
        id: `plan-${item.id}-${Date.now()}`,
        assetCode: `PL-${item.id.toUpperCase()}`,
        name: item.name,
        category: item.category,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
      })),
    )
    handleClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-xl bg-white p-5 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">เลือกครุภัณฑ์จากแผนจัดซื้อ</h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label="ปิด"
            className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-1 text-xs text-gray-400">แผนจัดซื้อประจำปีงบประมาณ 2567</p>

        <div className="mt-4 overflow-x-auto rounded-lg border border-gray-100">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs text-gray-400">
                <th className="w-8 p-2" />
                <th className="p-2 font-medium">รายการ</th>
                <th className="p-2 font-medium">ประเภท</th>
                <th className="p-2 text-right font-medium">จำนวน</th>
                <th className="p-2 text-right font-medium">ราคาต่อหน่วย</th>
                <th className="p-2 text-right font-medium">ราคารวม</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {procurementPlanMock.map((item) => (
                <tr key={item.id}>
                  <td className="p-2">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item.id)}
                      onChange={() => toggleSelected(item.id)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </td>
                  <td className="p-2 text-gray-900">{item.name}</td>
                  <td className="p-2 text-gray-600">{item.category}</td>
                  <td className="p-2 text-right text-gray-600">{item.quantity}</td>
                  <td className="p-2 text-right text-gray-600">{item.unitPrice.toLocaleString("th-TH")}</td>
                  <td className="p-2 text-right text-gray-900">{item.totalPrice.toLocaleString("th-TH")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
          <p className="text-sm text-gray-500">
            เลือกแล้ว {selectedItems.length} รายการ ·{" "}
            <span className="font-semibold text-gray-900">{selectedTotal.toLocaleString("th-TH")} บาท</span>
          </p>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={selectedItems.length === 0}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            เพิ่มรายการที่เลือก
          </button>
        </div>
      </div>
    </div>
  )
}
