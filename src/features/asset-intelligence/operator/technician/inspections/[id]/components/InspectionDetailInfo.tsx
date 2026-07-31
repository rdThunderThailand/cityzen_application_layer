"use client";

import { TechnicianInspectionDetail } from "@/features/asset-intelligence/operator/technician/types";
import { Info, Phone } from "lucide-react";

export function InspectionDetailInfo({ detail }: { detail: TechnicianInspectionDetail }) {
  return (
    <div className="h-full flex flex-col">
      <h3 className="text-[15px] font-black text-slate-800 mb-8">ข้อมูลการรับงาน</h3>

      <div className="flex flex-col gap-8 flex-1 mt-4">
        <div className="grid grid-cols-[180px_1fr] items-start gap-2">
          <span className="text-[13px] font-bold text-slate-500 pt-0.5">วันที่รับงาน</span>
          <span className="text-[13px] font-bold text-slate-800">{detail.woDate}</span>
        </div>

        <div className="grid grid-cols-[180px_1fr] items-start gap-2">
          <span className="text-[13px] font-bold text-slate-500 pt-0.5">ผู้มอบหมายงาน</span>
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-bold text-slate-800">{detail.assignerName}</span>
            <button className="text-blue-600 hover:text-blue-700 transition-colors">
              <Phone className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-[180px_1fr] items-start gap-2">
          <span className="text-[13px] font-bold text-slate-500 pt-0.5">หน่วยงาน</span>
          <span className="text-[13px] font-bold text-slate-800">{detail.assignerDept}</span>
        </div>

        <div className="grid grid-cols-[180px_1fr] items-start gap-2">
          <span className="text-[13px] font-bold text-slate-500 pt-0.5">ประเภทงาน</span>
          <span className="text-[13px] font-bold text-slate-800">{detail.taskType}</span>
        </div>

        <div className="grid grid-cols-[180px_1fr] items-center gap-2">
          <span className="text-[13px] font-bold text-slate-500">ความเร่งด่วน</span>
          <span className="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-[12px] font-bold w-fit">
            {detail.priority}
          </span>
        </div>

        <div className="grid grid-cols-[180px_1fr] items-center gap-2">
          <div className="flex flex-col gap-1.5">
            <span className="text-[13px] font-bold text-slate-500">เวลาที่ต้องแล้วเสร็จ</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[13px] font-bold text-slate-500">(SLA)</span>
              <Info className="w-3.5 h-3.5 text-slate-400 cursor-pointer" />
            </div>
          </div>
          <span className="text-[13px] font-bold text-slate-800">ภายใน {detail.dueDate}</span>
        </div>
      </div>

      <div className="mt-8 bg-[#F0F5FF] border border-blue-100 rounded-[12px] p-4 flex items-start gap-3">
        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center shrink-0 mt-0.5 shadow-sm shadow-blue-200">
          <Info className="w-3.5 h-3.5 text-white" />
        </div>
        <p className="text-[13px] font-bold text-blue-900 leading-relaxed flex-1 pt-0.5">
          กรุณาเริ่มเดินทางไปยังหน้างานโดยเร็ว ระบบจะติดตามตำแหน่งและแจ้งสถานะให้ผู้แจ้งทราบ
        </p>
        <button className="text-blue-400 hover:text-blue-600 transition-colors mt-0.5">
          <Info className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
