"use client"

import { Eye, MoreHorizontal, Pencil } from "lucide-react"

interface ActionMenuProps {
  onView?: () => void
  onEdit?: () => void
}

export function ActionMenu({ onView, onEdit }: ActionMenuProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      <button
        type="button"
        onClick={onView}
        aria-label="ดูรายละเอียด"
        className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
      >
        <Eye className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={onEdit}
        aria-label="แก้ไข"
        className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
      >
        <Pencil className="h-4 w-4" />
      </button>
      <button
        type="button"
        aria-label="เพิ่มเติม"
        className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
    </div>
  )
}
