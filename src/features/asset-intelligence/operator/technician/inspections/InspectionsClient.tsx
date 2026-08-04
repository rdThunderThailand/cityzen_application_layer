"use client";

import { TechnicianInspectionItem, TechnicianInspectionStats } from "@/features/asset-intelligence/operator/technician/types";
import { CalendarDays, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { TechnicianPageLayout } from "../components/shared/TechnicianPageLayout";
import { TechnicianFilterBar } from "../components/shared/TechnicianFilterBar";
import { TechnicianPagination } from "../components/shared/TechnicianPagination";
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
    <TechnicianPageLayout
      title="ตรวจสอบหน้างาน"
      description="ตรวจสอบสถานะการดำเนินงานและติดตามความคืบหน้า"
    >

      {/* Main Layout (Left: Stats + Table, Right: Sidebar) */}
      <div className="flex flex-col xl:flex-row gap-6 ">

        {/* Left Column */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          <InspectionsStats stats={stats} />

          <div className="bg-white rounded-[16px] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            {/* Toolbar */}
            <TechnicianFilterBar
              searchQuery={searchQuery}
              onSearchChange={(val) => {
                setSearchQuery(val);
                setCurrentPage(1);
              }}
              searchPlaceholder="ค้นหาเลขที่ใบงาน, ครุภัณฑ์, สถานที่..."
              filters={[
                {
                  label: "สถานะ",
                  value: statusFilter,
                  options: ["ทั้งหมด", "รอดำเนินการตรวจสอบ", "กำลังตรวจสอบ", "ตรวจสอบแล้ว", "พบประเด็น", "ยกเลิก"],
                  onChange: (val) => {
                    setStatusFilter(val);
                    setCurrentPage(1);
                  },
                  minWidth: "120px"
                },
                {
                  label: "ประเภทงาน",
                  value: taskTypeFilter,
                  options: ["ทั้งหมด"],
                  onChange: (val) => {
                    setTaskTypeFilter(val);
                    setCurrentPage(1);
                  },
                  minWidth: "120px"
                },
                {
                  label: "ความเร่งด่วน",
                  value: priorityFilter,
                  options: ["ทั้งหมด", "สูง", "ปานกลาง", "ต่ำ"],
                  onChange: (val) => {
                    setPriorityFilter(val);
                    setCurrentPage(1);
                  },
                  minWidth: "120px"
                }
              ]}
              onClearFilters={() => {
                setSearchQuery("");
                setStatusFilter("ทั้งหมด");
                setTaskTypeFilter("ทั้งหมด");
                setPriorityFilter("ทั้งหมด");
                setCurrentPage(1);
              }}
              extraActions={
                <>
                  <div className="flex flex-col gap-1 min-w-[200px]">
                    <span className="text-[11px] font-bold text-slate-500">ช่วงวันที่ตรวจสอบ</span>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CalendarDays className="h-4 w-4 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg leading-5 bg-white text-[12px] font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer"
                        value="01/05/2567 - 20/05/2567"
                        readOnly
                      />
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors font-bold shrink-0 mt-[18px]">
                    <SlidersHorizontal className="w-4 h-4" />
                    <span className="text-[13px]">ตัวกรองเพิ่มเติม</span>
                  </button>
                </>
              }
            />

            <InspectionsTable
              inspections={paginatedInspections}
              selectedId={selectedInspection?.id}
              onSelect={(item) => setSelectedInspection(item)}
            />

            {/* Footer Pagination */}
            <TechnicianPagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              totalItems={filteredInspections.length}
              startIndex={(currentPage - 1) * itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={(num) => {
                setItemsPerPage(num);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full xl:w-[300px] shrink-0">
          <InspectionsSidebar item={selectedInspection} />
        </div>
      </div>
    </TechnicianPageLayout>
  );
}
