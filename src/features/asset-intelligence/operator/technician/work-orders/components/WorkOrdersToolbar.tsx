"use client";

import { Calendar, Download, LayoutGrid, LayoutList, Search } from "lucide-react";

interface WorkOrdersToolbarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  typeFilter: string;
  onTypeFilterChange: (val: string) => void;
  statusFilter: string;
  onStatusFilterChange: (val: string) => void;
  priorityFilter: string;
  onPriorityFilterChange: (val: string) => void;
  assigneeFilter: string;
  onAssigneeFilterChange: (val: string) => void;
  viewMode: "list" | "grid";
  onViewModeChange: (mode: "list" | "grid") => void;
}

export function WorkOrdersToolbar({
  searchQuery, onSearchChange,
  typeFilter, onTypeFilterChange,
  statusFilter, onStatusFilterChange,
  priorityFilter, onPriorityFilterChange,
  assigneeFilter, onAssigneeFilterChange,
  viewMode, onViewModeChange
}: WorkOrdersToolbarProps) {
  return (
    <div className="p-4 border-b border-slate-200 bg-white flex flex-col xl:flex-row gap-4 items-start xl:items-center justify-between">
      <div className="flex flex-col md:flex-row gap-4 flex-1 w-full flex-wrap">
        <div className="relative w-full md:max-w-md xl:max-w-xs shrink-0">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-[13px] font-medium transition-colors"
            placeholder="ค้นหาใบงาน, เลขที่ใบงาน, ครุภัณฑ์, สถานที่..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-2 md:pb-0 flex-1">
          <div className="flex flex-col gap-1 min-w-[120px]">
            <span className="text-[11px] font-bold text-slate-500">ประเภทงาน</span>
            <select
              className="border border-slate-200 rounded-xl text-[12px] font-bold text-slate-700 px-3 py-2 outline-none focus:border-blue-500 bg-white"
              value={typeFilter}
              onChange={(e) => onTypeFilterChange(e.target.value)}
            >
              <option value="ทั้งหมด">ทั้งหมด</option>
              <option value="แจ้งซ่อม">แจ้งซ่อม</option>
              <option value="ซ่อมด่วน">ซ่อมด่วน</option>
              <option value="บำรุงรักษา (PM)">บำรุงรักษา (PM)</option>
              <option value="ตรวจสอบ">ตรวจสอบ</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 min-w-[120px]">
            <span className="text-[11px] font-bold text-slate-500">สถานะ</span>
            <select
              className="border border-slate-200 rounded-xl text-[12px] font-bold text-slate-700 px-3 py-2 outline-none focus:border-blue-500 bg-white"
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value)}
            >
              <option value="ทั้งหมด">ทั้งหมด</option>
              <option value="รอดำเนินการ">รอดำเนินการ</option>
              <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
              <option value="รออะไหล่">รออะไหล่</option>
              <option value="รออนุมัติ">รออนุมัติ</option>
              <option value="เสร็จสิ้น">เสร็จสิ้น</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 min-w-[120px]">
            <span className="text-[11px] font-bold text-slate-500">ความสำคัญ</span>
            <select
              className="border border-slate-200 rounded-xl text-[12px] font-bold text-slate-700 px-3 py-2 outline-none focus:border-blue-500 bg-white"
              value={priorityFilter}
              onChange={(e) => onPriorityFilterChange(e.target.value)}
            >
              <option value="ทั้งหมด">ทั้งหมด</option>
              <option value="ต่ำ">ต่ำ</option>
              <option value="ปานกลาง">ปานกลาง</option>
              <option value="สูง">สูง</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 min-w-[120px]">
            <span className="text-[11px] font-bold text-slate-500">ผู้รับผิดชอบ</span>
            <select
              className="border border-slate-200 rounded-xl text-[12px] font-bold text-slate-700 px-3 py-2 outline-none focus:border-blue-500 bg-white"
              value={assigneeFilter}
              onChange={(e) => onAssigneeFilterChange(e.target.value)}
            >
              <option value="ทั้งหมด">ทั้งหมด</option>
              <option value="สมชาย ช่างเทคนิค">สมชาย ช่างเทคนิค</option>
              <option value="-">-</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 min-w-[180px]">
            <span className="text-[11px] font-bold text-slate-500">ช่วงวันที่สร้าง</span>
            <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2 bg-white flex-1">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-[12px] font-bold text-slate-700">01/05/2567 - 20/05/2567</span>
              <Calendar className="w-4 h-4 text-slate-400 ml-auto" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0 self-end xl:self-auto pb-2 xl:pb-0">
        <div className="flex items-center border border-slate-200 rounded-xl p-1 bg-white">
          <button
            onClick={() => onViewModeChange("list")}
            className={`p-1.5 rounded-lg transition-colors ${viewMode === "list" ? "bg-blue-50 text-blue-600" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"}`}
          >
            <LayoutList className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange("grid")}
            className={`p-1.5 rounded-lg transition-colors ${viewMode === "grid" ? "bg-blue-50 text-blue-600" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"}`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-white text-emerald-600 rounded-xl hover:bg-emerald-50 transition-colors border border-emerald-200 font-bold">
          <Download className="w-4 h-4" />
          <span className="text-[12px]">ส่งออก (Excel)</span>
        </button>
      </div>
    </div>
  );
}
