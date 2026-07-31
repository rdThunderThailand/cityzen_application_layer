"use client";

import { TechnicianMaintenanceOverview } from "@/features/asset-intelligence/operator/technician/types";
import { ArrowRight, ChevronDown } from "lucide-react";

export function TechnicianMaintenanceChart({ overview }: { overview: TechnicianMaintenanceOverview }) {
  // Simple CSS conic-gradient to mock the donut chart
  const bgColors = overview.items.map(i => {
    if (i.color.includes("emerald")) return "#10b981";
    if (i.color.includes("blue")) return "#3b82f6";
    if (i.color.includes("amber")) return "#f59e0b";
    if (i.color.includes("rose")) return "#f43f5e";
    return "#cbd5e1";
  });
  
  // Calculate stops for conic-gradient
  const stops = overview.items.reduce((acc, item, idx) => {
    const percentFloat = parseFloat(item.percent);
    const start = acc.currentStart;
    const end = acc.currentStart + percentFloat;
    return {
      currentStart: end,
      result: [...acc.result, `${bgColors[idx]} ${start}% ${end}%`]
    };
  }, { currentStart: 0, result: [] as string[] }).result.join(", ");

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[500px]">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
        <h2 className="text-[15px] font-bold text-slate-800">ภาพรวมงานบำรุงรักษา</h2>
        <div className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
          <span className="text-[11px] font-bold text-slate-600">สัปดาห์นี้</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>
      
      <div className="flex-1 flex flex-col p-8 xl:p-12 items-center justify-center">
        <div className="flex items-center gap-8 w-full max-w-[400px]">
          {/* Donut Chart */}
          <div className="relative w-40 h-40 shrink-0">
            <div 
              className="absolute inset-0 rounded-full" 
              style={{ background: `conic-gradient(${stops})` }}
            />
            {/* Inner White Circle to make it a donut */}
            <div className="absolute inset-[15%] bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
              <span className="text-[11px] font-bold text-slate-500">ทั้งหมด</span>
              <span className="text-3xl font-black text-slate-800 leading-none mt-1">{overview.total}</span>
              <span className="text-[10px] text-slate-500 mt-0.5">รายการ</span>
            </div>
          </div>
          
          {/* Legend */}
          <div className="flex-1 flex flex-col gap-3">
            {overview.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                  <span className="text-[12px] font-semibold text-slate-700">{item.label}</span>
                </div>
                <div className="flex items-center gap-2 text-right">
                  <span className="text-[13px] font-bold text-slate-800">{item.count}</span>
                  <span className="text-[10px] font-medium text-slate-400 w-10">({item.percent})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-slate-100 text-center shrink-0">
        <button className="text-[12px] font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center justify-center gap-1.5 w-full">
          ดูรายงานสรุป <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
