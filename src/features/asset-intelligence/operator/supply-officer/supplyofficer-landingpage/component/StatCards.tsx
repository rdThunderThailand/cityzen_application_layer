"use client"

import { AlertTriangle, CheckCircle2, Clock, FileText, Wrench, type LucideIcon } from "lucide-react"

import { statsData, type StatCardIcon, type StatCardTone } from "../mock/statsData"

const iconMap: Record<StatCardIcon, LucideIcon> = {
  file: FileText,
  "check-circle": CheckCircle2,
  wrench: Wrench,
  clock: Clock,
  "alert-triangle": AlertTriangle,
}

const toneClasses: Record<StatCardTone, { iconBg: string; iconColor: string }> = {
  blue: { iconBg: "bg-blue-50", iconColor: "text-blue-600" },
  green: { iconBg: "bg-green-50", iconColor: "text-green-600" },
  orange: { iconBg: "bg-orange-50", iconColor: "text-orange-600" },
  purple: { iconBg: "bg-purple-50", iconColor: "text-purple-600" },
  red: { iconBg: "bg-red-50", iconColor: "text-red-600" },
}

export function StatCards() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
      {statsData.map((stat) => {
        const Icon = iconMap[stat.icon]
        const tone = toneClasses[stat.tone]

        return (
          <div key={stat.id} className="flex flex-col rounded-xl border border-gray-100 bg-white p-4 pl-4  shadow-sm">
            <div className="flex items-center gap-2">
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${tone.iconBg}`}>
                <Icon className={`h-5 w-5 ${tone.iconColor}`} />
              </span>
              <span className="truncate text-xs text-gray-500">{stat.label}</span>
            </div>
            <p className="mt-1.5 text-xl font-bold text-gray-900">
              {stat.value.toLocaleString("th-TH")}
              <span className="ml-1 text-xs font-normal text-gray-400">{stat.unit}</span>
            </p>
            <p className="truncate text-[11px] text-gray-400">{stat.helperText}</p>
          </div>
        )
      })}
    </div>
  )
}
