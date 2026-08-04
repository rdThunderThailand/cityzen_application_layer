"use client";

import { TechnicianPMFreqSummary, TechnicianPMPlanItem, TechnicianPMPlanStats } from "@/features/asset-intelligence/operator/technician/types";
import { useState, useMemo } from "react";
import { TechnicianPageLayout } from "../components/shared/TechnicianPageLayout";
import { TechnicianFilterBar } from "../components/shared/TechnicianFilterBar";
import { TechnicianPagination } from "../components/shared/TechnicianPagination";
import { Plus, Upload, SlidersHorizontal } from "lucide-react";
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
    <TechnicianPageLayout
      title="แผนบำรุงรักษา (PM)"
      description="วางแผนและติดตามการบำรุงรักษาเชิงป้องกันของครุภัณฑ์"
      headerActions={
        <>
          <button className="flex items-center gap-2 px-4 py-2 border-2 border-blue-100 rounded-[12px] text-blue-600 font-bold hover:bg-blue-50 transition-colors bg-white">
            <Upload className="w-4 h-4" />
            <span className="text-[14px]">นำเข้าแผน PM</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-[12px] font-bold hover:bg-blue-700 transition-colors shadow-md shadow-blue-200">
            <Plus className="w-4 h-4" />
            <span className="text-[14px]">สร้างแผน PM ใหม่</span>
          </button>
        </>
      }
    >

      {/* Main Layout (Left: Tabs + Stats + Table, Right: Sidebar) */}
      <div className="flex flex-col xl:flex-row gap-6">

        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          {/* Tabs */}
          <div className="flex border-b border-slate-200 hide-scrollbar">
            {["แผนบำรุงรักษาทั้งหมด", "รออนุมัติ", "รอใช้งาน", "รอปรับปรุง", "ยกเลิก"].map(tab => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
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

          <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            {/* Toolbar */}
            <TechnicianFilterBar
              searchQuery={searchQuery}
              onSearchChange={(val) => {
                setSearchQuery(val);
                setCurrentPage(1);
              }}
              searchPlaceholder="ค้นหาแผน PM, รหัสครุภัณฑ์, ชื่อครุภัณฑ์..."
              filters={[
                {
                  label: "ประเภทครุภัณฑ์",
                  value: assetTypeFilter,
                  options: ["ทั้งหมด", "เครื่องปรับอากาศ", "ลิฟต์"],
                  onChange: (val) => {
                    setAssetTypeFilter(val);
                    setCurrentPage(1);
                  },
                  minWidth: "140px"
                },
                {
                  label: "สถานะ",
                  value: statusFilter,
                  options: ["ทั้งหมด", "ใกล้ถึงกำหนด", "รอใช้งาน", "เกินกำหนด"],
                  onChange: (val) => {
                    setStatusFilter(val);
                    setCurrentPage(1);
                  },
                  minWidth: "140px"
                },
                {
                  label: "ความถี่",
                  value: priorityFilter,
                  options: ["ทั้งหมด", "รายเดือน", "ราย 3 เดือน", "ราย 6 เดือน", "รายปี"],
                  onChange: (val) => {
                    setPriorityFilter(val);
                    setCurrentPage(1);
                  },
                  minWidth: "140px"
                }
              ]}
              onClearFilters={() => {
                setSearchQuery("");
                setAssetTypeFilter("ทั้งหมด");
                setStatusFilter("ทั้งหมด");
                setPriorityFilter("ทั้งหมด");
                setCurrentPage(1);
              }}
              extraActions={
                <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors font-bold shrink-0">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span className="text-[13px]">ตัวกรองเพิ่มเติม</span>
                </button>
              }
            />

            <PMPlanTable plans={paginatedPlans} />

            {/* Footer Pagination */}
            <TechnicianPagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              totalItems={filteredPlans.length}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={(num) => {
                setItemsPerPage(num);
                setCurrentPage(1);
              }}
              startIndex={(currentPage - 1) * itemsPerPage}
            />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full xl:w-[320px] shrink-0">
          <PMPlanSidebar freqSummary={freqSummary} />
        </div>
      </div>
    </TechnicianPageLayout>
  );
}
