"use client";

import { TechnicianPMFreqSummary } from "@/features/asset-intelligence/operator/technician/types";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

interface PMPlanSidebarProps {
  freqSummary: TechnicianPMFreqSummary;
}

export function PMPlanSidebar({ freqSummary }: PMPlanSidebarProps) {
  // Calendar mock data
  const daysOfWeek = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
  const calendarDays = [
    [null, null, null, 1, 2, 3, 4],
    [5, 6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24, 25],
    [26, 27, 28, 29, 30, 31, null],
  ];

  const getDayStatus = (day: number | null) => {
    if (!day) return null;
    if (day === 25) return "bg-emerald-500"; // รอใช้งาน
    if (day === 27 || day === 28) return "bg-orange-500"; // ใกล้ถึงกำหนด
    if (day === 30) return "bg-rose-500"; // เกินกำหนด
    return null;
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Calendar Widget */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <h3 className="text-[14px] font-bold text-slate-800 mb-4">ปฏิทิน PM</h3>

        <div className="flex items-center justify-between mb-4">
          <button className="p-1 hover:bg-slate-100 rounded-lg transition-colors text-slate-400">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-[13px] font-bold text-slate-800">พฤษภาคม 2567</span>
          <button className="p-1 hover:bg-slate-100 rounded-lg transition-colors text-slate-400">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {daysOfWeek.map((d, i) => (
            <div key={i} className="text-[11px] font-bold text-slate-500 py-1">{d}</div>
          ))}
        </div>

        <div className="flex flex-col gap-1">
          {calendarDays.map((week, wIdx) => (
            <div key={wIdx} className="grid grid-cols-7 gap-1 text-center">
              {week.map((day, dIdx) => {
                const statusColor = getDayStatus(day);
                return (
                  <div
                    key={dIdx}
                    className={`
                      relative flex flex-col items-center justify-center h-8 rounded-lg text-[12px] font-medium
                      ${day === 20 ? "bg-blue-600 text-white font-bold" : "text-slate-700 hover:bg-slate-50 cursor-pointer"}
                    `}
                  >
                    {day}
                    {statusColor && day !== 20 && (
                      <div className={`w-1.5 h-1.5 rounded-full absolute bottom-1 ${statusColor}`}></div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-6 text-[10px] font-bold text-slate-500 justify-center">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span>รอใช้งาน</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            <span>ใกล้ถึงกำหนด</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-rose-500"></div>
            <span>เกินกำหนด</span>
          </div>
        </div>
      </div>

      {/* Filters Panel Mockup */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[14px] font-bold text-slate-800">ตัวกรอง</h3>
          <button className="text-[12px] font-bold text-blue-600 hover:underline">ล้างค่า</button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-[12px] font-bold text-slate-600">ประเภทครุภัณฑ์</span>
            <select className="w-full border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-medium text-slate-500 outline-none focus:border-blue-500 bg-slate-50/50">
              <option>ทั้งหมด</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[12px] font-bold text-slate-600">สถานที่</span>
            <select className="w-full border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-medium text-slate-500 outline-none focus:border-blue-500 bg-slate-50/50">
              <option>ทั้งหมด</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[12px] font-bold text-slate-600">ผู้รับผิดชอบ</span>
            <select className="w-full border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-medium text-slate-500 outline-none focus:border-blue-500 bg-slate-50/50">
              <option>ทั้งหมด</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[12px] font-bold text-slate-600">ความถี่</span>
            <select className="w-full border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-medium text-slate-500 outline-none focus:border-blue-500 bg-slate-50/50">
              <option>ทั้งหมด</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-bold py-2.5 rounded-xl transition-colors shadow-sm shadow-blue-200">
              <Search className="w-4 h-4" />
              <span>ค้นหา</span>
            </button>
            <button className="w-full text-center text-[13px] font-bold text-slate-500 hover:text-slate-700 py-2 transition-colors">
              รีเซ็ตตัวกรอง
            </button>
          </div>
        </div>
      </div>

      {/* Frequency Summary Widget */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <h3 className="text-[14px] font-bold text-slate-800 mb-4">ความถี่แผน PM</h3>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-[13px]">
            <span className="font-bold text-slate-600">รายเดือน</span>
            <span className="font-medium text-slate-500">{freqSummary.monthly.count} แผน ({freqSummary.monthly.percent})</span>
          </div>
          <div className="flex items-center justify-between text-[13px]">
            <span className="font-bold text-slate-600">ราย 3 เดือน</span>
            <span className="font-medium text-slate-500">{freqSummary.quarterly.count} แผน ({freqSummary.quarterly.percent})</span>
          </div>
          <div className="flex items-center justify-between text-[13px]">
            <span className="font-bold text-slate-600">ราย 6 เดือน</span>
            <span className="font-medium text-slate-500">{freqSummary.halfYearly.count} แผน ({freqSummary.halfYearly.percent})</span>
          </div>
          <div className="flex items-center justify-between text-[13px]">
            <span className="font-bold text-slate-600">รายปี</span>
            <span className="font-medium text-slate-500">{freqSummary.yearly.count} แผน ({freqSummary.yearly.percent})</span>
          </div>
        </div>
      </div>
    </div>
  );
}
