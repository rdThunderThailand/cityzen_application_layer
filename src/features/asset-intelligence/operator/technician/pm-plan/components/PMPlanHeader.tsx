"use client";

import { Plus, Upload } from "lucide-react";

export function PMPlanHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">แผนบำรุงรักษา (PM)</h1>
        <p className="text-[13px] font-medium text-slate-500 mt-1">วางแผนและติดตามการบำรุงรักษาเชิงป้องกันของครุภัณฑ์</p>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 border-2 border-blue-100 rounded-xl text-blue-600 font-bold hover:bg-blue-50 transition-colors">
          <Upload className="w-4 h-4" />
          <span className="text-[13px]">นำเข้าแผน PM</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">
          <Plus className="w-4 h-4" />
          <span className="text-[13px]">สร้างแผน PM ใหม่</span>
        </button>
      </div>
    </div>
  );
}
