"use client"

import { Upload, X } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/basic/Button"
import { Dropdown } from "@/components/basic/Dropdown"
import { Input } from "@/components/basic/Input"

import type { ReceivingItem } from "../mock/types"

interface AddItemModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (item: ReceivingItem) => void
}

const inputClassName = "mb-0 w-full rounded-lg border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-blue-400 focus:ring-blue-400"

const categoryOptions = [
  { value: "ครุภัณฑ์สำนักงาน", label: "ครุภัณฑ์สำนักงาน" },
  { value: "ครุภัณฑ์คอมพิวเตอร์", label: "ครุภัณฑ์คอมพิวเตอร์" },
  { value: "ครุภัณฑ์ไฟฟ้า", label: "ครุภัณฑ์ไฟฟ้า" },
  { value: "ยานพาหนะ", label: "ยานพาหนะ" },
]

export function AddItemModal({ isOpen, onClose, onAdd }: AddItemModalProps) {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("ครุภัณฑ์สำนักงาน")
  const [quantity, setQuantity] = useState("1")
  const [unitPrice, setUnitPrice] = useState("")

  if (!isOpen) return null

  const parsedQuantity = Number(quantity) || 0
  const parsedUnitPrice = Number(unitPrice) || 0
  const totalPrice = parsedQuantity * parsedUnitPrice

  const handleClose = () => {
    setName("")
    setCategory("ครุภัณฑ์สำนักงาน")
    setQuantity("1")
    setUnitPrice("")
    onClose()
  }

  const handleSubmit = () => {
    if (!name.trim() || parsedQuantity <= 0 || parsedUnitPrice <= 0) return

    onAdd({
      id: `manual-${Date.now()}`,
      assetCode: `MA-${Date.now().toString().slice(-8)}`,
      name: name.trim(),
      category,
      quantity: parsedQuantity,
      unitPrice: parsedUnitPrice,
      totalPrice,
    })
    handleClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-xl bg-white p-5 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">เพิ่มรายการครุภัณฑ์</h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label="ปิด"
            className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-1">
            <span className="text-xs text-gray-500">ชื่อครุภัณฑ์</span>
            <Input value={name} onChange={(event) => setName(event.target.value)} className={inputClassName} />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-gray-500">หมวดหมู่ / ประเภท</span>
            <Dropdown
              options={categoryOptions}
              selectedValue={category}
              onChange={(value) => setCategory(String(value))}
              className="w-full"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-gray-500">ยี่ห้อ / รุ่น</span>
            <Input className={inputClassName} placeholder="เช่น Lenovo AIO 3" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-gray-500">เลขที่ PO / สัญญา</span>
            <Input className={inputClassName} placeholder="PO-6705-0021" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-gray-500">จำนวน</span>
            <Input
              type="number"
              min={1}
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              className={inputClassName}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-gray-500">หน่วยนับ</span>
            <Input className={inputClassName} placeholder="ชิ้น / เครื่อง" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-gray-500">ราคาต่อหน่วย (บาท)</span>
            <Input
              type="number"
              min={0}
              value={unitPrice}
              onChange={(event) => setUnitPrice(event.target.value)}
              className={inputClassName}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-gray-500">ปีงบประมาณ</span>
            <Input className={inputClassName} placeholder="2567" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-gray-500">กลุ่มงาน</span>
            <Input className={inputClassName} placeholder="สำนักปลัดเทศบาล" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-gray-500">สถานที่จัดเก็บ</span>
            <Input className={inputClassName} placeholder="คลังพัสดุ อาคาร A" />
          </label>
        </div>

        <div className="mt-4">
          <span className="text-xs text-gray-500">รูปภาพครุภัณฑ์</span>
          <button
            type="button"
            className="mt-1 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-200 py-4 text-sm text-gray-500 hover:bg-gray-50"
          >
            <Upload className="h-4 w-4" />
            อัปโหลดรูปภาพ (PNG, JPG)
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
          <p className="text-sm text-gray-500">
            ราคารวม: <span className="font-semibold text-gray-900">{totalPrice.toLocaleString("th-TH")} บาท</span>
          </p>
          <Button
            onClick={handleSubmit}
            className="w-auto rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            เพิ่มรายการ
          </Button>
        </div>
      </div>
    </div>
  )
}
