"use client"

import { useState } from "react"
import { RotateCcw, Search, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/basic/Button"
import { Dropdown } from "@/components/basic/Dropdown"
import { Input } from "@/components/basic/Input"

import type { FilterFieldConfig } from "../mock/filterOptions.mock"

export interface AssetFilterValues {
  search: string
  type: string
  status: string
  department: string
  location: string
  fiscalYear: string
}

interface FilterBarProps {
  filterFields: FilterFieldConfig[]
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

export function FilterBar({ filterFields, onFilterChange, onReset }: FilterBarProps) {
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
    <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
      <div className="flex flex-wrap items-end gap-2">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            value={filters.search}
            onChange={(event) => updateFilters({ ...filters, search: event.target.value })}
            placeholder="ค้นหาครุภัณฑ์"
            className="mb-0 w-full rounded-lg border-gray-200 py-2 pl-9 pr-3 text-sm text-gray-700 focus:border-blue-400 focus:ring-blue-400"
          />
        </div>

        {filterFields.map((field) => (
          <div key={field.key} className="flex flex-col gap-1">
            <span className="text-xs text-gray-500">{field.label}</span>
            <Dropdown
              options={field.options}
              selectedValue={filters[field.key]}
              onChange={(value) => updateFilters({ ...filters, [field.key]: String(value) })}
              className="w-44"
            />
          </div>
        ))}

        <Button className="w-auto rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          <SlidersHorizontal className="h-4 w-4" />
          ตัวกรองเพิ่มเติม
        </Button>
        <Button
          onClick={handleReset}
          className="w-auto rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <RotateCcw className="h-4 w-4" />
          รีเซ็ต
        </Button>
      </div>
    </div>
  )
}
