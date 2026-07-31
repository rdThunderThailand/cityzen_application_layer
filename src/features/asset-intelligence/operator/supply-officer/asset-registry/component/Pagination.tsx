"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  pageSize: number
  totalItems: number
  onPageChange: (page: number) => void
}

const MAX_VISIBLE_PAGES = 3

export function Pagination({ currentPage, totalPages, pageSize, totalItems, onPageChange }: PaginationProps) {
  const start = (currentPage - 1) * pageSize + 1
  const end = Math.min(currentPage * pageSize, totalItems)
  const visiblePages = Array.from({ length: Math.min(MAX_VISIBLE_PAGES, totalPages) }, (_, index) => index + 1)
  const showTrailingEllipsis = totalPages > MAX_VISIBLE_PAGES

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-gray-500">
      <span>
        แสดง {start.toLocaleString("th-TH")} - {end.toLocaleString("th-TH")} จาก{" "}
        {totalItems.toLocaleString("th-TH")} รายการ
      </span>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          aria-label="หน้าก่อนหน้า"
          className="rounded-lg border border-gray-200 p-1.5 text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {visiblePages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`h-8 w-8 rounded-lg text-sm font-medium ${
              page === currentPage ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        ))}

        {showTrailingEllipsis && (
          <>
            <span className="px-1 text-gray-400">...</span>
            <button
              type="button"
              onClick={() => onPageChange(totalPages)}
              className={`h-8 w-8 rounded-lg text-sm font-medium ${
                totalPages === currentPage ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          aria-label="หน้าถัดไป"
          className="rounded-lg border border-gray-200 p-1.5 text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
