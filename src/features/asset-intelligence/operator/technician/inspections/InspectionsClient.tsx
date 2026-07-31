"use client";

import { TechnicianInspectionItem, TechnicianInspectionStats } from "@/features/asset-intelligence/operator/technician/types";
import { CalendarDays, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { InspectionsHeader } from "./components/InspectionsHeader";
import { InspectionsSidebar } from "./components/InspectionsSidebar";
import { InspectionsStats } from "./components/InspectionsStats";
import { InspectionsTable } from "./components/InspectionsTable";

interface InspectionsClientProps {
  stats: TechnicianInspectionStats;
  initialInspections: TechnicianInspectionItem[];
}

export function InspectionsClient({ stats, initialInspections }: InspectionsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ทั้งหมด");
  const [taskTypeFilter, setTaskTypeFilter] = useState("ทั้งหมด");
  const [priorityFilter, setPriorityFilter] = useState("ทั้งหมด");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedInspection, setSelectedInspection] = useState<TechnicianInspectionItem>(initialInspections[0]);

  // Filtering Logic
  const filteredInspections = useMemo(() => {
    return initialInspections.filter(item => {
      if (statusFilter !== "ทั้งหมด" && item.status !== statusFilter) return false;
      if (priorityFilter !== "ทั้งหมด" && item.priority !== priorityFilter) return false;

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          item.woNumber.toLowerCase().includes(q) ||
          item.assetName.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [initialInspections, searchQuery, statusFilter, priorityFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredInspections.length / itemsPerPage);
  const paginatedInspections = filteredInspections.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-full flex-1 bg-slate-50 w-full p-6 pb-40">
      <InspectionsHeader />

      <div className="mt-8">
        <InspectionsStats stats={stats} />
      </div>

      {/* Main Layout (Left: Table, Right: Sidebar) */}
      <div className="flex flex-col xl:flex-row gap-6 mt-6">

        {/* Left Column */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          {/* Toolbar */}
          <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row gap-4 items-center flex-wrap">
            <div className="relative w-full md:max-w-[300px] shrink-0">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl leading-5 bg-slate-50/50 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-[13px] font-medium transition-colors"
                placeholder="ค้นหาเลขที่ใบงาน, ครุภัณฑ์, สถานที่..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-4 w-full md:w-auto overflow-x-auto flex-1">
              <div className="flex flex-col gap-1 min-w-[120px]">
                <span className="text-[11px] font-bold text-slate-500">สถานะ</span>
                <select
                  className="border border-slate-200 rounded-xl text-[12px] font-bold text-slate-700 px-3 py-2 outline-none focus:border-blue-500 bg-white"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="ทั้งหมด">ทั้งหมด</option>
                  <option value="รอดำเนินการตรวจสอบ">รอดำเนินการตรวจสอบ</option>
                  <option value="กำลังตรวจสอบ">กำลังตรวจสอบ</option>
                  <option value="ตรวจสอบแล้ว">ตรวจสอบแล้ว</option>
                  <option value="พบประเด็น">พบประเด็น</option>
                  <option value="ยกเลิก">ยกเลิก</option>
                </select>
              </div>

              <div className="flex flex-col gap-1 min-w-[120px]">
                <span className="text-[11px] font-bold text-slate-500">ประเภทงาน</span>
                <select
                  className="border border-slate-200 rounded-xl text-[12px] font-bold text-slate-700 px-3 py-2 outline-none focus:border-blue-500 bg-white"
                  value={taskTypeFilter}
                  onChange={(e) => setTaskTypeFilter(e.target.value)}
                >
                  <option value="ทั้งหมด">ทั้งหมด</option>
                </select>
              </div>

              <div className="flex flex-col gap-1 min-w-[120px]">
                <span className="text-[11px] font-bold text-slate-500">ความเร่งด่วน</span>
                <select
                  className="border border-slate-200 rounded-xl text-[12px] font-bold text-slate-700 px-3 py-2 outline-none focus:border-blue-500 bg-white"
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <option value="ทั้งหมด">ทั้งหมด</option>
                  <option value="สูง">สูง</option>
                  <option value="ปานกลาง">ปานกลาง</option>
                  <option value="ต่ำ">ต่ำ</option>
                </select>
              </div>

              <div className="flex flex-col gap-1 min-w-[200px]">
                <span className="text-[11px] font-bold text-slate-500">ช่วงวันที่ตรวจสอบ</span>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarDays className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl leading-5 bg-white text-[12px] font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer"
                    value="01/05/2567 - 20/05/2567"
                    readOnly
                  />
                </div>
              </div>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors font-bold shrink-0 self-end md:self-auto h-[38px] mt-auto">
              <SlidersHorizontal className="w-4 h-4" />
              <span className="text-[12px]">ตัวกรองเพิ่มเติม</span>
            </button>
          </div>

          <InspectionsTable
            inspections={paginatedInspections}
            selectedId={selectedInspection?.id}
            onSelect={(item) => setSelectedInspection(item)}
          />

          {/* Footer Pagination */}
          <div className="p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold text-slate-600">แสดง</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-slate-200 rounded-lg text-[12px] font-bold text-slate-700 px-2 py-1 outline-none focus:border-blue-500"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span className="text-[12px] font-bold text-slate-600">รายการ</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 disabled:opacity-50 transition-colors"
              >
                &lt;
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold text-[13px] transition-colors ${currentPage === page
                      ? "bg-blue-600 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                    }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 disabled:opacity-50 transition-colors"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full xl:w-[360px] shrink-0">
          <InspectionsSidebar item={selectedInspection} />
        </div>
      </div>
    </div>
  );
}
