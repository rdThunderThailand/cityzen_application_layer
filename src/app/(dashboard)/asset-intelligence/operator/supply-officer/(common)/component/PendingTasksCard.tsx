"use client"

import { ChevronRight } from "lucide-react"

import { pendingTasksData, pendingTasksTotalCount } from "../mock/pendingTasksData"

export function PendingTasksCard() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900">งานที่ต้องดำเนินการ</h2>
        <button
          type="button"
          className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          ดูทั้งหมด ({pendingTasksTotalCount})
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <ul className="mt-4 divide-y divide-gray-100">
        {pendingTasksData.map((task) => (
          <li key={task.id} className="flex items-center justify-between py-3">
            <span className="text-sm text-gray-600">{task.label}</span>
            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-700">
              {task.count.toLocaleString("th-TH")}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
