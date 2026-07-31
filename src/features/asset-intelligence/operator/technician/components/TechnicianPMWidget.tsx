"use client";

import { TechnicianPMPlan } from "@/features/asset-intelligence/operator/technician/types";
import { ArrowRight, ChevronRight } from "lucide-react";

export function TechnicianPMWidget({ pmPlan }: { pmPlan: TechnicianPMPlan[] }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full relative overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-[14px] font-bold text-slate-800">แผนบำรุงรักษา (PM)</h2>
        <button className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1">
          ดูปฏิทิน PM <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="p-2 flex flex-col gap-1 flex-1 overflow-y-auto custom-scrollbar">
        {pmPlan.map(item => (
          <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer border border-transparent hover:border-slate-100">
            <div className="w-10 flex flex-col items-center shrink-0">
              <span className="text-[14px] font-bold text-blue-600 leading-none">{item.dateStr.split(" ")[0]}</span>
              <span className="text-[9px] font-bold text-blue-400 leading-none mt-1">{item.dateStr.split(" ")[1]}</span>
            </div>

            <div className="flex-1 min-w-0 border-l-2 border-slate-100 pl-3 group-hover:border-blue-200 transition-colors">
              <p className="text-[12px] font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">{item.title}</p>
              <p className="text-[10px] text-slate-500 truncate mt-0.5">{item.subtitle}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className={`px-2 py-1 rounded-md text-[10px] font-bold whitespace-nowrap ${item.relativeColor}`}>
                {item.relativeDays}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-500 transition-colors" />
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-slate-100 text-center shrink-0 bg-slate-50/50">
        <button className="text-[12px] font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center justify-center gap-1.5 w-full">
          ดูแผน PM ทั้งหมด <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
