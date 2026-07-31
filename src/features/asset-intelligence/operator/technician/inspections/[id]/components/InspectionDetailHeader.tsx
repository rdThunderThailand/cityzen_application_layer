"use client";

import { TechnicianInspectionDetail } from "@/features/asset-intelligence/operator/technician/types";
import { ArrowLeft, ChevronRight, FileText } from "lucide-react";
import Link from "next/link";

export function InspectionDetailHeader({ detail, isNavigating }: { detail: TechnicianInspectionDetail, isNavigating?: boolean }) {
  return (
    <div className="flex flex-col gap-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[13px] font-bold text-slate-500">
        <Link href="/dashboard/assets/officer/technician/inspections" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>ตรวจสอบหน้างาน</span>
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-300" />
        <span className="hover:text-blue-600 transition-colors cursor-pointer">รายละเอียดใบงาน</span>
        <ChevronRight className="w-3 h-3 text-slate-300" />
        <span className="text-slate-800">{isNavigating ? "เริ่มตรวจสอบ" : "รับงานแล้ว"}</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <h1 className="text-[28px] font-black text-[#1e293b] tracking-tight leading-none">
              {isNavigating ? "ตรวจสอบหน้างาน" : "รับงานแล้ว"}
            </h1>
            <span className={`px-3 py-1 rounded-full text-[12px] font-bold mt-1 ${isNavigating ? "bg-emerald-100 text-emerald-700" : "bg-emerald-100 text-emerald-700"}`}>
              {isNavigating ? "กำลังเดินทาง" : "รอเริ่มเดินทาง"}
            </span>
          </div>
          {!isNavigating && (
            <p className="text-[14px] font-medium text-slate-500">คุณได้รับมอบหมายงานนี้เรียบร้อยแล้ว กรุณาเริ่มเดินทางไปยังหน้างาน</p>
          )}
        </div>
        {!isNavigating && (
          <button className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 rounded-xl text-blue-600 font-bold hover:bg-slate-50 transition-colors shrink-0 bg-white shadow-sm">
            <FileText className="w-4 h-4" />
            <span className="text-[13px]">ดูรายละเอียดใบงาน</span>
          </button>
        )}
      </div>
    </div>
  );
}
