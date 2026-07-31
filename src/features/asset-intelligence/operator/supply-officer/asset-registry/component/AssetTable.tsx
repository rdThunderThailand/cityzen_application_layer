"use client"

import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Archive,
  Box,
  Camera,
  Car,
  LayoutGrid,
  List,
  Monitor,
  Snowflake,
  SprayCan,
  Wrench,
  type LucideIcon,
} from "lucide-react"

import { Dropdown } from "@/components/basic/Dropdown"

import type { Asset, AssetIconKey } from "../mock/types"
import { ActionMenu } from "./ActionMenu"
import { StatusBadge } from "./StatusBadge"

export type AssetSortColumn = "id" | "purchaseDate" | "value" | "status"
export type AssetSortDirection = "asc" | "desc"

interface AssetTableProps {
  assets: Asset[]
  totalItems: number
  pageSize: number
  sortColumn: AssetSortColumn | null
  sortDirection: AssetSortDirection
  onSort: (column: AssetSortColumn) => void
}

const assetIconMap: Record<AssetIconKey, LucideIcon> = {
  box: Box,
  car: Car,
  ac: Snowflake,
  computer: Monitor,
  cabinet: Archive,
  mower: Wrench,
  sprayer: SprayCan,
  camera: Camera,
}

export function AssetTable({
  assets,
  totalItems,
  pageSize,
  sortColumn,
  sortDirection,
  onSort,
}: AssetTableProps) {
  const renderSortIcon = (column: AssetSortColumn) => {
    if (sortColumn !== column) return <ArrowUpDown className="h-3.5 w-3.5 text-gray-300" />
    return sortDirection === "asc" ? (
      <ArrowUp className="h-3.5 w-3.5 text-gray-500" />
    ) : (
      <ArrowDown className="h-3.5 w-3.5 text-gray-500" />
    )
  }

  const renderSortableHeader = (label: string, column: AssetSortColumn, alignRight = false) => (
    <th className={`py-2 font-medium ${alignRight ? "text-right" : ""}`}>
      <button
        type="button"
        onClick={() => onSort(column)}
        className={`flex items-center gap-1 hover:text-gray-600 ${alignRight ? "ml-auto" : ""}`}
      >
        {label}
        {renderSortIcon(column)}
      </button>
    </th>
  )

  return (
    <div className="flex h-full min-h-0 flex-col rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 pb-2">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>แสดง</span>
          <Dropdown
            options={[{ value: pageSize, label: String(pageSize) }]}
            selectedValue={pageSize}
            className="w-20"
          />
          <span>รายการ</span>
          <span className="ml-2">ทั้งหมด {totalItems.toLocaleString("th-TH")} รายการ</span>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" aria-label="มุมมองรายการ" className="rounded-lg bg-gray-100 p-1.5 text-gray-600">
            <List className="h-4 w-4" />
          </button>
          <button type="button" aria-label="มุมมองตาราง" className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100">
            <LayoutGrid className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-auto">
        <table className="w-full min-w-[960px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs text-gray-400">
              <th className="w-8 py-2">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
              </th>
              {renderSortableHeader("รหัสครุภัณฑ์", "id")}
              <th className="py-2 font-medium">ชื่อครุภัณฑ์</th>
              <th className="py-2 font-medium">ประเภทครุภัณฑ์</th>
              <th className="py-2 font-medium">หน่วยงาน</th>
              <th className="py-2 font-medium">สถานที่</th>
              {renderSortableHeader("วันที่จัดซื้อ", "purchaseDate")}
              {renderSortableHeader("มูลค่า (บาท)", "value", true)}
              {renderSortableHeader("สถานะ", "status")}
              <th className="py-2 text-right font-medium">การดำเนินการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {assets.map((asset) => {
              const AssetIcon = assetIconMap[asset.icon]

              return (
                <tr key={asset.id}>
                  <td className="py-2">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                  </td>
                  <td className="py-2 font-medium text-gray-900">{asset.id}</td>
                  <td className="py-2">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                        <AssetIcon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">{asset.name}</p>
                        <p className="text-xs text-gray-400">{asset.detail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 text-gray-600">{asset.type}</td>
                  <td className="py-2 text-gray-600">{asset.department}</td>
                  <td className="py-2 text-gray-600">{asset.location}</td>
                  <td className="py-2 text-gray-600">{asset.purchaseDate}</td>
                  <td className="py-2 text-right text-gray-900">
                    {asset.value.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-2">
                    <StatusBadge status={asset.status} />
                  </td>
                  <td className="py-2">
                    <ActionMenu />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
