"use client"

import { useMemo, useState } from "react"
import { Box, CheckCircle2, Download, FileText, PackageX, Plus, Upload, Wrench, type LucideIcon } from "lucide-react"

import { Button } from "@/components/basic/Button"
import { CardMetric } from "@/components/dashboard/CardMetric"

import { AssetTable, type AssetSortColumn, type AssetSortDirection } from "./component/AssetTable"
import { FilterBar, type AssetFilterValues } from "./component/FilterBar"
import { Pagination } from "./component/Pagination"
import { assetsMock, currentPageMock, pageSizeMock, totalItemsMock, totalPagesMock } from "./mock/assets.mock"
import { filterFieldsMock } from "./mock/filterOptions.mock"
import { statsMock } from "./mock/stats.mock"
import type { StatColorTheme, StatIconKey } from "./mock/types"

const statIconMap: Record<StatIconKey, LucideIcon> = {
  total: Box,
  available: CheckCircle2,
  repair: Wrench,
  damaged: PackageX,
  disposed: FileText,
}

const statToneClassNames: Record<StatColorTheme, string> = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  orange: "bg-orange-100 text-orange-600",
  purple: "bg-purple-100 text-purple-600",
  red: "bg-red-100 text-red-600",
}

export default function AssetRegistryClient() {
  const [filters, setFilters] = useState<AssetFilterValues | null>(null)
  const [sortColumn, setSortColumn] = useState<AssetSortColumn | null>(null)
  const [sortDirection, setSortDirection] = useState<AssetSortDirection>("asc")
  const [currentPage, setCurrentPage] = useState(currentPageMock)

  const handleSort = (column: AssetSortColumn) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const handleResetFilters = () => {
    setFilters(null)
  }

  const visibleAssets = useMemo(() => {
    let result = assetsMock

    if (filters?.search) {
      const keyword = filters.search.trim().toLowerCase()
      result = result.filter(
        (asset) => asset.name.toLowerCase().includes(keyword) || asset.id.toLowerCase().includes(keyword),
      )
    }

    if (sortColumn) {
      const direction = sortDirection === "asc" ? 1 : -1
      result = [...result].sort((a, b) => {
        if (sortColumn === "value") {
          return (a.value - b.value) * direction
        }
        return a[sortColumn].localeCompare(b[sortColumn]) * direction
      })
    }

    return result
  }, [filters, sortColumn, sortDirection])

  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden bg-white p-4">
      <div className="flex shrink-0 items-center justify-between gap-2">
        <p className="text-sm text-gray-500">แสดงข้อมูลครุภัณฑ์ทั้งหมดในระบบ</p>
        <div className="flex items-center gap-2">
          <Button className="w-auto rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Upload className="h-4 w-4" />
            นำเข้าข้อมูล
          </Button>
          <Button className="w-auto rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download className="h-4 w-4" />
            ส่งออกข้อมูล
          </Button>
          <Button className="w-auto rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            เพิ่มครุภัณฑ์
          </Button>
        </div>
      </div>

      <div className="grid shrink-0 grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">
        {statsMock.map((stat) => (
          <CardMetric
            key={stat.key}
            title={stat.label}
            value={stat.value}
            unit="รายการ"
            subtitle={stat.percent}
            action={
              !stat.percent ? (
                <button type="button" className="text-xs font-medium text-blue-600 hover:text-blue-700">
                  ดูทั้งหมด →
                </button>
              ) : undefined
            }
            icon={statIconMap[stat.icon]}
            classNameForIcon={statToneClassNames[stat.colorTheme]}
            className="max-h-180 gap-2 p-5"
          />
        ))}
      </div>

      <div className="shrink-0">
        <FilterBar filterFields={filterFieldsMock} onFilterChange={setFilters} onReset={handleResetFilters} />
      </div>

      <div className="min-h-0 flex-1">
        <AssetTable
          assets={visibleAssets}
          totalItems={totalItemsMock}
          pageSize={pageSizeMock}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
      </div>

      <div className="shrink-0">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPagesMock}
          pageSize={pageSizeMock}
          totalItems={totalItemsMock}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  )
}
