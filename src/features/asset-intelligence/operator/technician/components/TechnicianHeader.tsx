"use client";

import { Sun } from "lucide-react";

export function TechnicianHeader({ userName }: { userName: string }) {
  // Use mock date for design matching
  const dateStr = "20 พฤษภาคม 2567";
  const timeStr = "09:30 น.";

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-[24px] font-bold text-slate-800 flex items-center gap-2">
          สวัสดีครับ, {userName} <span className="text-2xl animate-wave origin-bottom-right">👋</span>
        </h1>
        <p className="text-[14px] text-slate-500 font-medium mt-1">นี่คืองานของคุณในวันนี้</p>
      </div>
      {/* <div className="flex flex-col items-end">
        <div className="flex items-center gap-1.5 text-[13px] font-bold text-slate-800">
          {dateStr} <Sun className="w-4 h-4 text-amber-500 ml-1" />
        </div>
        <div className="text-[11px] font-bold text-slate-500 mt-0.5">{timeStr}</div>
      </div> */}
    </div>
  );
}
