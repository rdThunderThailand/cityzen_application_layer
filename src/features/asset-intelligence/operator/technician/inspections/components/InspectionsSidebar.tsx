"use client";

import { TechnicianInspectionItem } from "@/features/asset-intelligence/operator/technician/types";
import { ArrowRight, Check, Edit3, Image as ImageIcon, Play } from "lucide-react";
import Link from "next/link";

interface InspectionsSidebarProps {
  item: TechnicianInspectionItem | undefined;
}

export function InspectionsSidebar({ item }: InspectionsSidebarProps) {
  if (!item) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 xl:p-12 shadow-sm text-center text-slate-500 h-full flex items-center justify-center">
        เลือกรายการเพื่อดูรายละเอียด
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden h-full">
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-[14px] font-bold text-slate-800">รายละเอียดใบงาน</h3>
        <button className="text-[11px] font-bold text-blue-600 flex items-center gap-1 hover:underline">
          ดูทั้งหมด <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="p-5 flex-1 overflow-y-auto custom-scrollbar">
        {/* WO & Status */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span className="text-[14px] font-black text-slate-800">{item.woNumber}</span>
          <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-bold ${item.statusBg} ${item.statusColor}`}>
            {item.status}
          </span>
        </div>

        {/* Asset */}
        <div className="flex items-center gap-3 mb-6 bg-slate-50 p-3 rounded-xl border border-slate-100">
          <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shrink-0 border border-slate-200 shadow-sm">
            <ImageIcon className="w-6 h-6 text-slate-400" />
          </div>
          <div>
            <p className="text-[13px] font-bold text-slate-800">{item.assetName}</p>
            <p className="text-[11px] font-medium text-slate-500 mt-0.5">{item.assetLocation}</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="flex flex-col gap-4 mb-6">
          <div>
            <p className="text-[11px] font-bold text-slate-500 mb-1">สถานที่</p>
            <p className="text-[13px] font-medium text-slate-800">{item.location}</p>
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-500 mb-1">ผู้แจ้ง</p>
            <p className="text-[13px] font-medium text-slate-800">{item.reporterName} ({item.reporterDept})</p>
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-500 mb-1">วันที่แจ้ง</p>
            <p className="text-[13px] font-medium text-slate-800">{item.woDate}</p>
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-500 mb-1">ความเร่งด่วน</p>
            <p className={`text-[13px] font-bold ${item.priorityColor}`}>{item.priority}</p>
          </div>
        </div>

        <button className="w-full py-2.5 rounded-xl border border-slate-200 text-[13px] font-bold text-slate-700 hover:bg-slate-50 transition-colors mb-6 text-center shadow-sm">
          ดูรายละเอียดใบงาน
        </button>

        <hr className="border-slate-100 mb-6" />

        {/* Timeline */}
        <div className="mb-6">
          <h4 className="text-[13px] font-bold text-slate-800 mb-5">ขั้นตอนการตรวจสอบ</h4>

          <div className="relative pl-[14px]">
            {/* Connecting line */}
            <div className="absolute top-[12px] bottom-[20px] left-[19px] w-[2px] bg-slate-100"></div>

            <div className="flex flex-col gap-5 relative z-10">
              {/* Step 1: Done */}
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 border-2 border-white ring-1 ring-emerald-500 z-10 mt-0.5">
                  <span className="text-[10px] font-bold text-emerald-700">1</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-[12px] font-bold text-emerald-700">เดินทางไปหน้างาน</p>
                    <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <p className="text-[11px] font-medium text-slate-500 mt-0.5">{item.appointmentDate} 09:20 น.</p>
                </div>
              </div>

              {/* Step 2: Current */}
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center shrink-0 border-2 border-white ring-1 ring-blue-600 z-10 mt-0.5">
                  <span className="text-[10px] font-bold text-white">2</span>
                </div>
                <div className="flex-1">
                  <p className="text-[12px] font-bold text-blue-700">ตรวจสอบตามรายการ</p>
                  <p className="text-[11px] font-medium text-blue-500 mt-0.5">รอการดำเนินการ</p>
                </div>
              </div>

              {/* Step 3: Upcoming */}
              <div className="flex items-start gap-4 opacity-50">
                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border-2 border-white ring-1 ring-slate-200 z-10 mt-0.5">
                  <span className="text-[10px] font-bold text-slate-500">3</span>
                </div>
                <div className="flex-1">
                  <p className="text-[12px] font-bold text-slate-700">บันทึกผลการตรวจสอบ</p>
                  <p className="text-[11px] font-medium text-slate-500 mt-0.5">รอการดำเนินการ</p>
                </div>
              </div>

              {/* Step 4: Upcoming */}
              <div className="flex items-start gap-4 opacity-50">
                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border-2 border-white ring-1 ring-slate-200 z-10 mt-0.5">
                  <span className="text-[10px] font-bold text-slate-500">4</span>
                </div>
                <div className="flex-1">
                  <p className="text-[12px] font-bold text-slate-700">ปิดงาน</p>
                  <p className="text-[11px] font-medium text-slate-500 mt-0.5">รอการดำเนินการ</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="mb-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-[12px] font-bold text-slate-800">หมายเหตุ</h4>
            <button className="text-blue-600 hover:text-blue-700 transition-colors">
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[12px] font-medium text-slate-500">-</p>
        </div>
      </div>

      {/* Footer Action */}
      <div className="p-4 border-t border-slate-100 bg-white">
        <Link
          href={`/dashboard/assets/officer/technician/inspections/${item.id}`}
          className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[13px] font-bold transition-colors shadow-sm shadow-blue-200"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>เริ่มตรวจสอบ</span>
        </Link>
      </div>
    </div>
  );
}
