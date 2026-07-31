"use client"

import {
  ArrowLeftRight,
  Bell,
  ChevronRight,
  FileSignature,
  Package,
  ScanLine,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react"

import {
  pendingTasksData,
  pendingTasksTotalCount,
  type PendingTaskIcon,
  type PendingTaskTone,
} from "../mock/pendingTasksData"

const iconMap: Record<PendingTaskIcon, LucideIcon> = {
  package: Package,
  "arrow-left-right": ArrowLeftRight,
  "scan-line": ScanLine,
  "file-signature": FileSignature,
  "shield-alert": ShieldAlert,
}

const toneClasses: Record<PendingTaskTone, { iconBg: string; iconColor: string; countColor: string }> = {
  blue: { iconBg: "bg-blue-50", iconColor: "text-blue-600", countColor: "text-blue-600" },
  green: { iconBg: "bg-green-50", iconColor: "text-green-600", countColor: "text-green-600" },
  orange: { iconBg: "bg-orange-50", iconColor: "text-orange-600", countColor: "text-orange-600" },
  purple: { iconBg: "bg-purple-50", iconColor: "text-purple-600", countColor: "text-purple-600" },
  red: { iconBg: "bg-red-50", iconColor: "text-red-600", countColor: "text-red-600" },
}

export function PendingTasksCard() {
  return (
    <div className="flex h-full min-h-0 flex-col rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
      <div className="flex shrink-0 items-center justify-between">
        <h2 className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
          <Bell className="h-3.5 w-3.5 text-gray-400" />
          งานที่ต้องดำเนินการ
        </h2>
        <button
          type="button"
          className="flex items-center gap-0.5 text-[11px] font-medium text-blue-600 hover:text-blue-700"
        >
          ดูทั้งหมด ({pendingTasksTotalCount})
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>
      <ul className="mt-1 min-h-0 flex-1 divide-y divide-gray-100 overflow-hidden">
        {pendingTasksData.map((task) => {
          const Icon = iconMap[task.icon]
          const tone = toneClasses[task.tone]

          return (
            <li key={task.id} className="flex items-center gap-2 py-1.5">
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${tone.iconBg}`}>
                <Icon className={`h-3.5 w-3.5 ${tone.iconColor}`} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-gray-900">{task.label}</p>
                <p className="truncate text-[10px] text-gray-400">{task.subtitle}</p>
              </div>
              <button
                type="button"
                className={`flex shrink-0 items-center gap-0.5 text-[11px] font-semibold ${tone.countColor}`}
              >
                {task.count.toLocaleString("th-TH")} รายการ
                <ChevronRight className="h-3 w-3" />
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
