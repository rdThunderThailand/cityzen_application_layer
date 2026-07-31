import { ChevronRight } from "lucide-react";
import React from "react";

interface TechnicianPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  startIndex: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

export function TechnicianPagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  startIndex,
  onPageChange,
  onItemsPerPageChange,
}: TechnicianPaginationProps) {
  const safeCurrentPage = Math.min(currentPage, Math.max(1, totalPages));

  return (
    <div className="border-t border-slate-100 p-4 flex flex-col md:flex-row md:items-center justify-between mt-auto bg-white gap-4">
      <span className="text-[12px] font-medium text-slate-500 pl-2">
        แสดง {totalItems === 0 ? 0 : startIndex + 1} - {Math.min(startIndex + itemsPerPage, totalItems)} จาก {totalItems} รายการ
      </span>

      <div className="flex items-center gap-4 pr-2">
        <div className="flex items-center gap-2">
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="border border-slate-200 rounded-lg px-3 py-1.5 text-[12px] font-bold text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value={10}>10 / หน้า</option>
            <option value={20}>20 / หน้า</option>
            <option value={50}>50 / หน้า</option>
          </select>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(Math.max(1, safeCurrentPage - 1))}
            disabled={safeCurrentPage === 1}
            className="w-8 h-8 rounded-lg text-slate-400 flex items-center justify-center hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
          </button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;
            if (
              page === 1 ||
              page === totalPages ||
              (page >= safeCurrentPage - 1 && page <= safeCurrentPage + 1)
            ) {
              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`w-8 h-8 rounded-lg font-bold text-[13px] transition-colors ${
                    safeCurrentPage === page
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {page}
                </button>
              );
            } else if (page === safeCurrentPage - 2 || page === safeCurrentPage + 2) {
              return (
                <span key={page} className="w-8 h-8 flex items-center justify-center text-slate-400">
                  ...
                </span>
              );
            }
            return null;
          })}

          <button
            onClick={() => onPageChange(Math.min(totalPages, safeCurrentPage + 1))}
            disabled={safeCurrentPage === totalPages}
            className="w-8 h-8 rounded-lg text-slate-400 flex items-center justify-center hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
