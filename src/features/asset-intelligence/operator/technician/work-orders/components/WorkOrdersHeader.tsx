"use client";

import { RefreshCw, Sun } from "lucide-react";

export function WorkOrdersHeader() {
  const dateStr = "20 พฤษภาคม 2567";
  const timeStr = "09:30 น.";

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-[24px] font-bold text-slate-800">ใบงานทั้งหมด</h1>
        <p className="text-[14px] text-slate-500 font-medium mt-1">ติดตามสถานะและประวัติการดำเนินงานทั้งหมด</p>
      </div>
      <div className="flex flex-col items-end">
        <div className="flex items-center gap-1.5 text-[13px] font-bold text-slate-800">
          {dateStr} <Sun className="w-4 h-4 text-amber-500 ml-1" />
        </div>
        <div className="text-[11px] font-bold text-slate-500 mt-0.5">{timeStr}</div>
        <button className="flex items-center gap-1.5 mt-2 text-blue-600 hover:text-blue-700 text-[12px] font-bold transition-colors">
          <RefreshCw className="w-3.5 h-3.5" />
          รีเฟรช
        </button>
      </div>
    </div>
  );
}
