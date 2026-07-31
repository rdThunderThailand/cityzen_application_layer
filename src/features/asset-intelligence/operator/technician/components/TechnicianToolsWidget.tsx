"use client";

import { TechnicianToolsAndSpares } from "@/features/asset-intelligence/operator/technician/types";
import { ArrowRight, FileText, Package, Tag, Wrench } from "lucide-react";

export function TechnicianToolsWidget({ data }: { data: TechnicianToolsAndSpares }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full relative overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-[14px] font-bold text-slate-800">เครื่องมือ & อะไหล่ที่ใช้บ่อย</h2>
        <button className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1">
          ดูทั้งหมด <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="p-5 grid grid-cols-4 gap-2 flex-1 items-center">
        <div className="flex flex-col items-center text-center gap-2 group cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 group-hover:scale-110 transition-transform">
            <Wrench className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-700 leading-tight">เครื่องมือของฉัน</p>
            <p className="text-[9px] text-slate-500 mt-0.5">{data.toolCount} รายการ</p>
          </div>
        </div>

        <div className="flex flex-col items-center text-center gap-2 group cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100 group-hover:scale-110 transition-transform">
            <Package className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-700 leading-tight">อะไหล่คงคลัง</p>
            <p className="text-[9px] text-slate-500 mt-0.5">{data.inventoryCount} รายการ</p>
          </div>
        </div>

        <div className="flex flex-col items-center text-center gap-2 group cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center border border-amber-100 group-hover:scale-110 transition-transform">
            <Tag className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-700 leading-tight">เบิกอะไหล่</p>
            <p className="text-[9px] text-slate-500 mt-0.5">รายการ</p>
          </div>
        </div>

        <div className="flex flex-col items-center text-center gap-2 group cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center border border-purple-100 group-hover:scale-110 transition-transform">
            <FileText className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-700 leading-tight">ประวัติการเบิก</p>
            <p className="text-[9px] text-slate-500 mt-0.5">ล่าสุด</p>
          </div>
        </div>
      </div>
    </div>
  );
}
