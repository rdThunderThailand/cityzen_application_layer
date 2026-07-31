"use client"

import { useMemo, useState } from "react"

import { AssetTable, type AssetSortColumn, type AssetSortDirection } from "./component/AssetTable"
import { FilterBar, type AssetFilterValues } from "./component/FilterBar"
import { Pagination } from "./component/Pagination"
import { StatCard } from "./component/StatCard"
import { assetsMock, currentPageMock, pageSizeMock, totalItemsMock, totalPagesMock } from "./mock/assets.mock"
import { statsMock } from "./mock/stats.mock"

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
    <main className="min-h-screen bg-gray-50 p-6">
      <div>
        <p className="mt-1 text-sm text-gray-500">แสดงข้อมูลครุภัณฑ์ทั้งหมดในระบบ</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {statsMock.map((stat) => (
          <StatCard key={stat.key} stat={stat} />
        ))}
      </div>

      <div className="mt-6">
        <FilterBar onFilterChange={setFilters} onReset={handleResetFilters} />
      </div>

      <div className="mt-6">
        <AssetTable
          assets={visibleAssets}
          totalItems={totalItemsMock}
          pageSize={pageSizeMock}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
      </div>

      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPagesMock}
          pageSize={pageSizeMock}
          totalItems={totalItemsMock}
          onPageChange={setCurrentPage}
        />
      </div>
    </main>
  )
}
