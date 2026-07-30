"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

import { categoryChartData, categoryChartTotal } from "../mock/categoryChartData"

export function AssetCategoryChartCard() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <h2 className="text-base font-semibold text-gray-900">ครุภัณฑ์แยกตามประเภท</h2>
      <div className="relative mt-4 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryChartData}
              dataKey="value"
              nameKey="label"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              stroke="none"
            >
              {categoryChartData.map((entry) => (
                <Cell key={entry.id} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">
            {categoryChartTotal.toLocaleString("th-TH")}
          </span>
          <span className="text-xs text-gray-400">รายการ</span>
        </div>
      </div>
      <ul className="mt-4 space-y-2">
        {categoryChartData.map((entry) => (
          <li key={entry.id} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-gray-600">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
              {entry.label}
            </span>
            <span className="font-medium text-gray-900">
              {entry.value.toLocaleString("th-TH")} ({entry.percentage}%)
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
