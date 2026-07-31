"use client"

import type { AssetStatus } from "../mock/types"

const statusClasses: Record<AssetStatus, string> = {
  "ใช้งานอยู่": "bg-green-100 text-green-700",
  "รอซ่อมบำรุง": "bg-orange-100 text-orange-700",
  "ชำรุด": "bg-red-100 text-red-700",
  "จำหน่ายแล้ว": "bg-gray-100 text-gray-600",
}

interface StatusBadgeProps {
  status: AssetStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusClasses[status]}`}>
      {status}
    </span>
  )
}
