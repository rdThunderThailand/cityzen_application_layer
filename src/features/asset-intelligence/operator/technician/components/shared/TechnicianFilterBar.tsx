import { ChevronDown, Filter, RefreshCw, Search } from "lucide-react";
import React from "react";

export interface FilterOption {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
  minWidth?: string;
  prefixIcon?: React.ReactNode;
}

interface TechnicianFilterBarProps {
  searchQuery?: string;
  searchPlaceholder?: string;
  onSearchChange?: (val: string) => void;
  filters?: FilterOption[];
  onClearFilters?: () => void;
  extraActions?: React.ReactNode;
  /** "split" (default): criteria row + separate utility row with a "ตัวกรอง" button. "single": everything incl. "ล้างตัวกรอง" on one row, no "ตัวกรอง" button. */
  layout?: "split" | "single";
}

export function TechnicianFilterBar({
  searchQuery,
  searchPlaceholder = "ค้นหา...",
  onSearchChange,
  filters = [],
  onClearFilters,
  extraActions,
  layout = "split",
}: TechnicianFilterBarProps) {
  const criteriaFields = (
    <>
      {onSearchChange && (
        <div className="relative w-full lg:w-[320px] shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[13px] font-medium text-slate-700 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      )}

      {filters.map((filter, idx) => (
        <div key={idx} className="flex flex-col gap-1 shrink-0">
          <span className="text-[10px] font-bold text-slate-400 ml-1">{filter.label}</span>
          <div className="relative">
            {filter.prefixIcon && (
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                {filter.prefixIcon}
              </div>
            )}
            <select
              value={filter.value}
              onChange={(e) => filter.onChange(e.target.value)}
              className={`appearance-none bg-white border border-slate-200 text-[13px] font-bold text-slate-600 rounded-lg ${filter.prefixIcon ? 'pl-9' : 'pl-4'} pr-10 py-2 focus:outline-none focus:border-blue-500 cursor-pointer`}
              style={{ minWidth: filter.minWidth || "140px" }}
            >
              {filter.options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      ))}

      {extraActions}
    </>
  );

  if (layout === "single") {
    return (
      <div className="p-4 border-b border-slate-100 flex flex-col lg:flex-row lg:items-end gap-4 flex-wrap bg-white">
        {criteriaFields}

        {onClearFilters && (
          <button
            onClick={onClearFilters}
            className="px-4 py-2 text-[12px] font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 h-9.5 lg:ml-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" /> ล้างตัวกรอง
          </button>
        )}
      </div>
    );
  }

  const hasCriteriaRow = Boolean(onSearchChange || filters.length > 0 || extraActions);
  const hasUtilityRow = Boolean(filters.length > 0 || extraActions || onClearFilters);

  return (
    <div className="p-4 border-b border-slate-100 flex flex-col gap-3 bg-white">
      {hasCriteriaRow && (
        <div className="flex flex-col lg:flex-row lg:items-end gap-4 flex-wrap">
          {criteriaFields}
        </div>
      )}

      {hasUtilityRow && (
        <div className="flex items-center justify-between gap-3">
          {(filters.length > 0 || extraActions) ? (
            <button className="px-4 py-2 rounded-lg border border-blue-200 bg-white text-blue-600 font-bold text-[13px] flex items-center gap-2 hover:bg-blue-50 transition-colors h-9.5">
              <Filter className="w-4 h-4" /> ตัวกรอง
            </button>
          ) : <span />}

          {onClearFilters && (
            <button
              onClick={onClearFilters}
              className="px-4 py-2 text-[12px] font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 h-9.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> ล้างตัวกรอง
            </button>
          )}
        </div>
      )}
    </div>
  );
}
