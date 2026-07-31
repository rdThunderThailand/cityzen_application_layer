"use client"

import { X } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/basic/Button"
import { Dropdown } from "@/components/basic/Dropdown"
import { Input } from "@/components/basic/Input"

import type { AssetCondition, TransferAsset } from "../mock/types"

interface AddAssetModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (asset: TransferAsset) => void
}

const inputClassName = "mb-0 w-full rounded-lg border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-blue-400 focus:ring-blue-400"

const conditionOptions = [
  { value: "สภาพดี", label: "สภาพดี" },
  { value: "ชำรุด", label: "ชำรุด" },
]

export function AddAssetModal({ isOpen, onClose, onAdd }: AddAssetModalProps) {
  const [assetCode, setAssetCode] = useState("")
  const [name, setName] = useState("")
  const [unit, setUnit] = useState("เครื่อง")
  const [originalValue, setOriginalValue] = useState("")
  const [assessedValue, setAssessedValue] = useState("")
  const [condition, setCondition] = useState<AssetCondition>("สภาพดี")

  if (!isOpen) return null

  const parsedOriginalValue = Number(originalValue) || 0
  const parsedAssessedValue = Number(assessedValue) || 0

  const handleClose = () => {
    setAssetCode("")
    setName("")
    setUnit("เครื่อง")
    setOriginalValue("")
    setAssessedValue("")
    setCondition("สภาพดี")
    onClose()
  }

  const handleSubmit = () => {
    if (!assetCode.trim() || !name.trim() || parsedOriginalValue <= 0) return

    onAdd({
      id: `manual-${Date.now()}`,
      assetCode: assetCode.trim(),
      name: name.trim(),
      detail: "",
      unit,
      quantity: 1,
      originalValue: parsedOriginalValue,
      assessedValue: parsedAssessedValue,
      condition,
    })
    handleClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-5 shadow-lg">
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
          <label className="flex flex-col gap-1 md:col-span-2">
            <span className="text-xs text-gray-500">รหัสครุภัณฑ์</span>
            <Input
              value={assetCode}
              onChange={(event) => setAssetCode(event.target.value)}
              className={inputClassName}
              placeholder="TMP-6705-0006"
            />
          </label>
          <label className="flex flex-col gap-1 md:col-span-2">
            <span className="text-xs text-gray-500">ชื่อครุภัณฑ์</span>
            <Input value={name} onChange={(event) => setName(event.target.value)} className={inputClassName} />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-gray-500">หน่วยนับ</span>
            <Input value={unit} onChange={(event) => setUnit(event.target.value)} className={inputClassName} />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-gray-500">สภาพ</span>
            <Dropdown
              options={conditionOptions}
              selectedValue={condition}
              onChange={(value) => setCondition(value as AssetCondition)}
              className="w-full"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-gray-500">มูลค่าตั้งต้น (บาท)</span>
            <Input
              type="number"
              min={0}
              value={originalValue}
              onChange={(event) => setOriginalValue(event.target.value)}
              className={inputClassName}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-gray-500">มูลค่าประเมิน (บาท)</span>
            <Input
              type="number"
              min={0}
              value={assessedValue}
              onChange={(event) => setAssessedValue(event.target.value)}
              className={inputClassName}
            />
          </label>
        </div>

        <div className="mt-5 flex justify-end">
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
