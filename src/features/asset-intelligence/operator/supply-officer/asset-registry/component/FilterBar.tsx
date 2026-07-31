"use client"

import { useState } from "react"
import { RotateCcw, Search, SlidersHorizontal } from "lucide-react"

export interface AssetFilterValues {
  search: string
  type: string
  status: string
  department: string
  location: string
  fiscalYear: string
}

interface FilterBarProps {
  onFilterChange: (filters: AssetFilterValues) => void
  onReset: () => void
}

const DEFAULT_FILTERS: AssetFilterValues = {
  search: "",
  type: "ทั้งหมด",
  status: "ทั้งหมด",
  department: "ทั้งหมด",
  location: "ทั้งหมด",
  fiscalYear: "ทั้งหมด",
}

const selectFieldConfig: Array<{ key: keyof Omit<AssetFilterValues, "search">; label: string }> = [
  { key: "type", label: "ประเภทครุภัณฑ์" },
  { key: "status", label: "สถานะ" },
  { key: "department", label: "หน่วยงาน" },
  { key: "location", label: "สถานที่" },
  { key: "fiscalYear", label: "ปีงบประมาณจัดซื้อ" },
]

export function FilterBar({ onFilterChange, onReset }: FilterBarProps) {
  const [filters, setFilters] = useState<AssetFilterValues>(DEFAULT_FILTERS)

  const updateFilters = (next: AssetFilterValues) => {
    setFilters(next)
    onFilterChange(next)
  }

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS)
    onReset()
  }

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-end gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={filters.search}
            onChange={(event) => updateFilters({ ...filters, search: event.target.value })}
            placeholder="ค้นหาครุภัณฑ์"
            className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
          />
        </div>

        {selectFieldConfig.map((field) => (
          <div key={field.key} className="flex flex-col gap-1">
            <span className="text-xs text-gray-500">{field.label}</span>
            <select
              value={filters[field.key]}
              onChange={(event) => updateFilters({ ...filters, [field.key]: event.target.value })}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-blue-400 focus:outline-none"
            >
              <option value="ทั้งหมด">ทั้งหมด</option>
            </select>
          </div>
        ))}

        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <SlidersHorizontal className="h-4 w-4" />
          ตัวกรองเพิ่มเติม
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <RotateCcw className="h-4 w-4" />
          รีเซ็ต
        </button>
      </div>
    </div>
  )
}
