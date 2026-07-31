"use client";

import { TechnicianTaskItem } from "@/features/asset-intelligence/operator/technician/types";
import { ArrowRight, ChevronRight } from "lucide-react";

export function TechnicianTasksToday({ tasks }: { tasks: TechnicianTaskItem[] }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[500px]">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
        <h2 className="text-[15px] font-bold text-slate-800">งานของฉันวันนี้ ({tasks.length})</h2>
        <button className="text-[12px] font-bold text-blue-600 hover:underline flex items-center gap-1">
          ดูทั้งหมด <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
        <div className="flex flex-col gap-1">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer border border-transparent hover:border-slate-100">
              <div className="w-12 shrink-0 flex flex-col items-center">
                <span className={`text-[13px] font-bold ${task.isUrgent ? "text-rose-600" : "text-slate-800"}`}>
                  {task.time}
                </span>
                {task.isUrgent && (
                  <span className="text-[9px] font-bold text-rose-500 mt-0.5">เร่งด่วน</span>
                )}
              </div>

              <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-200 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={task.imgUrl} alt={task.title} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-[13px] font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                  {task.title}
                </h3>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">{task.location}</p>
                <p className="text-[9px] font-medium text-slate-400 mt-0.5">{task.assetId}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold whitespace-nowrap ${task.statusBg} ${task.statusColor}`}>
                  {task.status}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-slate-100 text-center shrink-0">
        <button className="text-[12px] font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center justify-center gap-1.5 w-full">
          ดูงานทั้งหมด <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
