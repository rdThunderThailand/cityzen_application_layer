"use client";

import { ArrowRight, Megaphone } from "lucide-react";

export function TechnicianAnnouncementsWidget() {
  const announcements = [
    { id: "a1", title: "แจ้งปรับแผน PM ระบบแอร์ อาคารสำนักงาน", date: "18 พ.ค. 2567", subtitle: "ตั้งแต่วันที่ 20 - 24 พฤษภาคม 2567" },
    { id: "a2", title: "อบรมความปลอดภัยในการทำงานบนที่สูง", date: "16 พ.ค. 2567", subtitle: "วันที่ 25 พฤษภาคม 2567 เวลา 09:00 น." },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full relative overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-[14px] font-bold text-slate-800">ประกาศ / ข่าวสาร</h2>
        <button className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1">
          ดูทั้งหมด <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-4 flex-1">
        {announcements.map(item => (
          <div key={item.id} className="flex gap-3 items-start group cursor-pointer">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Megaphone className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0 flex items-center justify-between">
              <div className="min-w-0 flex-1 pr-2">
                <p className="text-[12px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-tight truncate">
                  {item.title}
                </p>
                <p className="text-[10px] text-slate-500 mt-1 leading-tight truncate">{item.subtitle}</p>
              </div>
              <span className="text-[9px] font-medium text-slate-400 shrink-0">{item.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
