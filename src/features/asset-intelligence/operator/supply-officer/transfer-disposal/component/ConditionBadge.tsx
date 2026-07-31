"use client"

import type { AssetCondition } from "../mock/types"

const conditionClasses: Record<AssetCondition, string> = {
  "สภาพดี": "bg-green-100 text-green-700",
  "ชำรุด": "bg-red-100 text-red-700",
}

interface ConditionBadgeProps {
  condition: AssetCondition
}

export function ConditionBadge({ condition }: ConditionBadgeProps) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${conditionClasses[condition]}`}>
      {condition}
    </span>
  )
}
