"use client";

import { TechnicianPMFreqSummary, TechnicianPMPlanItem, TechnicianPMPlanStats } from "@/features/asset-intelligence/operator/technician/types";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { PMPlanHeader } from "./components/PMPlanHeader";
import { PMPlanSidebar } from "./components/PMPlanSidebar";
import { PMPlanStats } from "./components/PMPlanStats";
import { PMPlanTable } from "./components/PMPlanTable";

interface PMPlanClientProps {
  stats: TechnicianPMPlanStats;
  initialPlans: TechnicianPMPlanItem[];
  freqSummary: TechnicianPMFreqSummary;
}

export function PMPlanClient({ stats, initialPlans, freqSummary }: PMPlanClientProps) {
  const [activeTab, setActiveTab] = useState("แผนบำรุงรักษาทั้งหมด");
  const [searchQuery, setSearchQuery] = useState("");
  const [assetTypeFilter, setAssetTypeFilter] = useState("ทั้งหมด");
  const [statusFilter, setStatusFilter] = useState("ทั้งหมด");
  const [priorityFilter, setPriorityFilter] = useState("ทั้งหมด"); // mockup says "ความถี่" in the toolbar but uses "ทั้งหมด"
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filtering Logic
  const filteredPlans = useMemo(() => {
    return initialPlans.filter(plan => {
      if (assetTypeFilter !== "ทั้งหมด" && !plan.assetName.includes(assetTypeFilter)) return false;
      if (statusFilter !== "ทั้งหมด" && plan.status !== statusFilter) return false;

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          plan.code.toLowerCase().includes(q) ||
          plan.name.toLowerCase().includes(q) ||
          plan.assetName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [initialPlans, searchQuery, assetTypeFilter, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredPlans.length / itemsPerPage);
  const paginatedPlans = filteredPlans.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-full flex-1 bg-slate-50 w-full p-6 pb-40">
      <PMPlanHeader />

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mt-6 mb-6 overflow-x-auto custom-scrollbar">
        {["แผนบำรุงรักษาทั้งหมด", "รออนุมัติ", "รอใช้งาน", "รอปรับปรุง", "ยกเลิก"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-[13px] font-bold border-b-2 transition-colors whitespace-nowrap -mb-[1px] ${activeTab === tab
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <PMPlanStats stats={stats} />

      {/* Main Layout (Left: Table, Right: Sidebar) */}
      <div className="flex flex-col xl:flex-row gap-6 mt-6">

        {/* Left Column */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          {/* Toolbar */}
          <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:max-w-sm shrink-0">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl leading-5 bg-slate-50/50 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-[13px] font-medium transition-colors"
                placeholder="ค้นหาแผน PM, รหัสครุภัณฑ์, ชื่อครุภัณฑ์..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-4 w-full md:w-auto overflow-x-auto flex-1">
              <div className="flex flex-col gap-1 min-w-[140px]">
                <span className="text-[11px] font-bold text-slate-500">ประเภทครุภัณฑ์</span>
                <select
                  className="border border-slate-200 rounded-xl text-[12px] font-bold text-slate-700 px-3 py-2 outline-none focus:border-blue-500 bg-white"
                  value={assetTypeFilter}
                  onChange={(e) => setAssetTypeFilter(e.target.value)}
                >
                  <option value="ทั้งหมด">ทั้งหมด</option>
                  <option value="เครื่องปรับอากาศ">เครื่องปรับอากาศ</option>
                  <option value="ลิฟต์">ลิฟต์</option>
                </select>
              </div>

              <div className="flex flex-col gap-1 min-w-[140px]">
                <span className="text-[11px] font-bold text-slate-500">สถานะ</span>
                <select
                  className="border border-slate-200 rounded-xl text-[12px] font-bold text-slate-700 px-3 py-2 outline-none focus:border-blue-500 bg-white"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="ทั้งหมด">ทั้งหมด</option>
                  <option value="ใกล้ถึงกำหนด">ใกล้ถึงกำหนด</option>
                  <option value="รอใช้งาน">รอใช้งาน</option>
                  <option value="เกินกำหนด">เกินกำหนด</option>
                </select>
              </div>

              <div className="flex flex-col gap-1 min-w-[140px]">
                <span className="text-[11px] font-bold text-slate-500">ความถี่</span>
                <select
                  className="border border-slate-200 rounded-xl text-[12px] font-bold text-slate-700 px-3 py-2 outline-none focus:border-blue-500 bg-white"
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <option value="ทั้งหมด">ทั้งหมด</option>
                  <option value="รายเดือน">รายเดือน</option>
                  <option value="ราย 3 เดือน">ราย 3 เดือน</option>
                  <option value="ราย 6 เดือน">ราย 6 เดือน</option>
                  <option value="รายปี">รายปี</option>
                </select>
              </div>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors font-bold shrink-0 self-end md:self-auto h-[38px] mt-auto">
              <SlidersHorizontal className="w-4 h-4" />
              <span className="text-[12px]">ตัวกรองเพิ่มเติม</span>
            </button>
          </div>

          <PMPlanTable plans={paginatedPlans} />

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
        <div className="w-full xl:w-[320px] shrink-0">
          <PMPlanSidebar freqSummary={freqSummary} />
        </div>
      </div>
    </div>
  );
}
