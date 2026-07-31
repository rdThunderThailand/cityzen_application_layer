"use client";

import { TechnicianNotification } from "@/features/asset-intelligence/operator/technician/types";
import { AlertTriangle, ArrowRight, CheckCircle2, Info } from "lucide-react";

export function TechnicianNotificationsWidget({ notifications }: { notifications: TechnicianNotification[] }) {
  const getIcon = (type: string) => {
    switch (type) {
      case "danger": return <AlertTriangle className="w-4 h-4 text-rose-600" />;
      case "info": return <Info className="w-4 h-4 text-blue-600" />;
      case "success": return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      default: return <Info className="w-4 h-4 text-slate-600" />;
    }
  };

  const getBg = (type: string) => {
    switch (type) {
      case "danger": return "bg-rose-50 border-rose-100";
      case "info": return "bg-blue-50 border-blue-100";
      case "success": return "bg-emerald-50 border-emerald-100";
      default: return "bg-slate-50 border-slate-100";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-[14px] font-bold text-slate-800">การแจ้งเตือนล่าสุด</h2>
        <button className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1">
          ดูทั้งหมด <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-3 flex-1 overflow-y-auto custom-scrollbar">
        {notifications.map(item => (
          <div key={item.id} className="flex gap-3 items-start group cursor-pointer">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border mt-0.5 ${getBg(item.type)}`}>
              {getIcon(item.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-tight">
                {item.title}
              </p>
              <p className="text-[10px] text-slate-500 mt-1 leading-tight">{item.subtitle}</p>
              <p className="text-[9px] font-semibold text-slate-400 mt-1.5">{item.timeAgo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
