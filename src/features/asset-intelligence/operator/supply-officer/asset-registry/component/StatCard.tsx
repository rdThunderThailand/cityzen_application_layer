"use client"

import { Box, CheckCircle2, FileText, PackageX, Wrench, type LucideIcon } from "lucide-react"

import type { StatColorTheme, StatIconKey, StatSummary } from "../mock/types"

const iconMap: Record<StatIconKey, LucideIcon> = {
  total: Box,
  available: CheckCircle2,
  repair: Wrench,
  damaged: PackageX,
  disposed: FileText,
}

const toneClasses: Record<StatColorTheme, { iconBg: string; iconColor: string }> = {
  blue: { iconBg: "bg-blue-100", iconColor: "text-blue-600" },
  green: { iconBg: "bg-green-100", iconColor: "text-green-600" },
  orange: { iconBg: "bg-orange-100", iconColor: "text-orange-600" },
  purple: { iconBg: "bg-purple-100", iconColor: "text-purple-600" },
  red: { iconBg: "bg-red-100", iconColor: "text-red-600" },
}

interface StatCardProps {
  stat: StatSummary
}

export function StatCard({ stat }: StatCardProps) {
  const Icon = iconMap[stat.icon]
  const tone = toneClasses[stat.colorTheme]

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <span className="text-sm text-gray-500">{stat.label}</span>
        <span className={`flex h-10 w-10 items-center justify-center rounded-full ${tone.iconBg}`}>
          <Icon className={`h-5 w-5 ${tone.iconColor}`} />
        </span>
      </div>
      <p className="mt-3 text-2xl font-bold text-gray-900">
        {stat.value.toLocaleString("th-TH")}
        <span className="ml-1 text-sm font-normal text-gray-400">รายการ</span>
      </p>
      {stat.percent ? (
        <p className="mt-1 text-xs text-gray-400">{stat.percent}</p>
      ) : (
        <button type="button" className="mt-1 text-xs font-medium text-blue-600 hover:text-blue-700">
          ดูทั้งหมด →
        </button>
      )}
    </div>
  )
}
